# RevPhlo — HubSpot Call Transcript Integration
**Owner: Ben Crabb | Last updated: March 2026**

---

## Overview

RevPhlo currently ingests call transcripts from **Fathom** (webhook-based). This doc covers adding **HubSpot** as a second transcript source so RevPhlo clients using HubSpot get the same AI post-call notes and attribution — no Fathom required.

The output is identical to the Fathom flow: structured call record + full transcript → AI post-call note generation + RevPhlo dashboard.

---

## How the Existing Fathom Flow Works (Reference)

The n8n workflow `Fathom → Orchestration (Supabase + Pinecone)` is the reference implementation:

1. **Fathom webhook fires** on call complete (POST)
2. **Parse call** — extract rep name, prospect, date, client, transcript, recording URL
3. **Upsert call row → Supabase** (`calls` table)
4. **Chunk transcript** (~500 tokens per chunk)
5. **Get OpenAI embedding** per chunk (`text-embedding-3-small`)
6. **Upsert vector → Pinecone** with metadata
7. **Insert chunk row → Supabase** (`call_chunks` table)
8. **Update `chunk_count`** on the call row

**For HubSpot:** Replace steps 1–2 with a **scheduled poll** against the HubSpot API. Steps 3–8 are identical — clone the workflow and swap the input.

---

## RevPhlo Data Layer

### Supabase
- **URL:** `https://cgordhxpxxbqjsfxhyql.supabase.co`
- **Tables:** `calls` + `call_chunks`
- **Auth:** Service role key (already in n8n — reference the Fathom workflow)

### Pinecone
- **Host:** `charlie-bldo5js.svc.aped-4627-b74a.pinecone.io`
- **Index:** `charlie`
- **Namespaces:** One per RevPhlo client (e.g. `budgetdog`, `munera`)

### n8n
- **Instance:** `https://systemizedsales.app.n8n.cloud`
- Clone `Fathom → Orchestration (Supabase + Pinecone)` as the starting point

---

## Supabase Schema

```sql
CREATE TABLE calls (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fathom_id          VARCHAR(255) UNIQUE,         -- use HubSpot engagement_id as dedup key
  title              VARCHAR(500),
  client_name        VARCHAR(100) NOT NULL,        -- RevPhlo client slug
  namespace          VARCHAR(100) NOT NULL,        -- Pinecone namespace slug
  rep_name           VARCHAR(255),
  prospect_name      VARCHAR(255),
  call_date          TIMESTAMP WITH TIME ZONE,
  duration_seconds   INTEGER,
  recording_url      TEXT,
  transcript         TEXT,
  summary            TEXT,
  chunk_count        INTEGER DEFAULT 0,
  processed_at       TIMESTAMP WITH TIME ZONE,
  created_at         TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE call_chunks (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  call_id           UUID NOT NULL REFERENCES calls(id) ON DELETE CASCADE,
  chunk_id          VARCHAR(300) NOT NULL UNIQUE,  -- {engagement_id}_chunk_{N}
  chunk_index       INTEGER NOT NULL,
  content           TEXT NOT NULL,
  speaker           VARCHAR(255),
  token_estimate    INTEGER,
  embedding_stored  BOOLEAN DEFAULT FALSE,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## HubSpot API

### Auth

```
Authorization: Bearer {HUBSPOT_PRIVATE_APP_TOKEN}
```

Required scopes: `crm.objects.calls.read`, `conversations.read`, `crm.objects.contacts.read`, `crm.objects.owners.read`

Generate at: HubSpot → Settings → Integrations → Private Apps

---

### 1. Poll for completed calls

```http
POST https://api.hubapi.com/crm/v3/objects/calls/search
{
  "filterGroups": [{
    "filters": [
      { "propertyName": "hs_call_status", "operator": "EQ", "value": "COMPLETED" },
      { "propertyName": "hs_timestamp", "operator": "GTE", "value": "{last_poll_unix_ms}" }
    ]
  }],
  "properties": ["hs_call_title","hs_call_body","hs_call_duration","hs_call_recording_url","hs_timestamp","hubspot_owner_id"],
  "limit": 100
}
```

Store `last_poll_unix_ms` in n8n static data or a Supabase config row. Update after each successful run.

---

### 2. Get transcript text (try in order)

**Option A — `hs_call_body` (try first)**
Many calling integrations (Aircall, JustCall, etc.) write the transcript directly into the call body:
```http
GET https://api.hubapi.com/crm/v3/objects/calls/{engagement_id}?properties=hs_call_body
```

**Option B — Conversation Intelligence (Sales/Service Hub Enterprise)**
```http
# Get conversation ID
GET https://api.hubapi.com/crm/v3/objects/calls/{engagement_id}/associations/conversations

# Fetch transcript
GET https://api.hubapi.com/conversations/v3/conversations/{conversation_id}/transcripts
```
Returns: `[{ "actorId", "text", "startTime", "endTime" }]`

**Option C — Recordings & Transcripts API**
```http
GET https://api.hubapi.com/extensions/calls/v1/transcriptions/{recordingId}
```
Note: `hs_call_recording_url` deprecated for transcription as of Sept 30, 2024.

> **Start with Option A.** Works for most third-party calling tools without Enterprise. Build Option B as fallback for CI-enabled clients.

---

### 3. Get rep name
```http
GET https://api.hubapi.com/crm/v3/owners/{hubspot_owner_id}
```

### 4. Get prospect name
```http
GET https://api.hubapi.com/crm/v3/objects/calls/{engagement_id}/associations/contacts
GET https://api.hubapi.com/crm/v3/objects/contacts/{contact_id}?properties=firstname,lastname
```

---

## n8n Workflow Architecture

```
[Schedule Trigger] every 6 hours
  ↓
[Code] load last_poll_timestamp
  ↓
[HTTP] POST /crm/v3/objects/calls/search
  ↓
[Loop over calls]
  ↓
  [HTTP] SELECT from Supabase — check if engagement_id already exists (dedup)
  ↓ skip if exists
  [HTTP] GET hs_call_body / transcript
  [HTTP] GET owner name
  [HTTP] GET associated contact
  [Code] Parse + normalize to calls schema
  [HTTP] Upsert call → Supabase
  ↓
  [Code] Chunk transcript ~500 tokens
  ↓
  [Loop chunks]
    ├─ [HTTP] OpenAI embedding
    ├─ [HTTP] Upsert → Pinecone
    └─ [HTTP] Insert chunk → Supabase
  ↓
  [HTTP] PATCH chunk_count on call row
  ↓
[Code] save new last_poll_timestamp
```

---

## Client / Namespace Mapping

Each RevPhlo client provides their HubSpot Private App Token at onboarding. Store:
```
{ client_name, namespace, hubspot_token, hubspot_portal_id }
```
in a RevPhlo config table in Supabase. The workflow looks up `namespace` by matching the token/portal ID.

---

## Dedup

Store HubSpot engagement ID in `calls.fathom_id`:
```sql
SELECT id FROM calls WHERE fathom_id = '{engagement_id}'
```
Exists → skip. Not exists → insert.

---

## Open Questions

1. **Where is the transcript?** Test against a real HubSpot account — is it in `hs_call_body` or does the client have CI (Enterprise)?
2. **One HubSpot account per RevPhlo client**, or one shared account? (affects token/namespace mapping)
3. **n8n or dedicated RevPhlo backend** for the polling job?

---

## API Docs

- Calls API: https://developers.hubspot.com/docs/api-reference/crm-calls-v3/guide
- Conversations: https://developers.hubspot.com/docs/api/conversations/conversations
- Recordings & Transcripts: https://developers.hubspot.com/changelog/new-recording-transcripts-api-replaces-hs_call_recording_url-for-call-engagements
- Private Apps: https://developers.hubspot.com/docs/api/private-apps
- CRM Owners: https://developers.hubspot.com/docs/api/crm/owners
