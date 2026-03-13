import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BLOCKED_COUNTRIES = new Set([
  'IN', 'PK',
  // Africa (all 54 countries)
  'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CV', 'CM', 'CF', 'TD',
  'KM', 'CG', 'CD', 'CI', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET',
  'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS', 'LR', 'LY', 'MG',
  'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW',
  'ST', 'SN', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 'TG', 'TN',
  'UG', 'ZM', 'ZW',
])

export function middleware(request: NextRequest) {
  const country = request.geo?.country ?? ''

  if (BLOCKED_COUNTRIES.has(country)) {
    return new NextResponse(null, { status: 403 })
  }

  return NextResponse.next()
}
