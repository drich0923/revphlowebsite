import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BLOCKED_COUNTRIES = new Set(['IN', 'PK'])

export function middleware(request: NextRequest) {
  const country = request.geo?.country ?? ''

  if (BLOCKED_COUNTRIES.has(country)) {
    return new NextResponse(null, { status: 403 })
  }

  return NextResponse.next()
}
