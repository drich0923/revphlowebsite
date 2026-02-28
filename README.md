# RevPhlo Website

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## API routes

- `GET /api/health` - health check
- `POST /api/book-demo` - validates and forwards demo lead payload

Example payload:

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "company": "Acme",
  "notes": "Interested in attribution + rep leaderboard"
}
```

If you set `DEMO_WEBHOOK_URL`, submissions are forwarded server-side.
