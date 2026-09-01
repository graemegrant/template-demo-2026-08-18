import { NextResponse, type NextRequest } from 'next/server';

/**
 * Production host derived from NEXT_PUBLIC_SITE_URL. Only set when the env
 * var is configured explicitly — the hotel.config.ts fallback is not used
 * here, so an un-configured deployment keeps its default indexable behaviour.
 */
const PROD_HOST = (() => {
  try {
    return process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host
      : '';
  } catch {
    return '';
  }
})();

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const host = req.headers.get('host') ?? '';

  // Keep preview deployments and the raw *.vercel.app alias out of search
  // indexes once the real production domain is known. No-op until
  // NEXT_PUBLIC_SITE_URL is set.
  if (PROD_HOST && host !== PROD_HOST) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.(?:ico|png|svg|txt|xml|webmanifest)$).*)'],
};
