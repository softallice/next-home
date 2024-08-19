import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { i18n } from '../i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    // Create a mutable copy of the locales array
    const locales: string[] = [...i18n.locales];

    // Use the locale from the cookies if it exists
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    console.log('cookieLocale : ', cookieLocale)
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale;
    }

    // Otherwise, use negotiator and intl-localematcher to get the best locale
    return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (
        [
            '/manifest.json',
            '/favicon.ico',
        ].includes(pathname)
    ) return;

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next).*)'],
};
