import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { i18n } from '../i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// 요청에서 로케일을 가져오는 함수입니다.
function getLocale(request: NextRequest): string | undefined {
    // 요청 헤더를 받아 negotiator에서 사용할 수 있는 형식으로 변환합니다.
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // Negotiator를 사용하여 요청된 언어 목록을 가져옵니다.
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    // locales 배열의 복사본을 만듭니다.
    const locales: string[] = [...i18n.locales];

    // 쿠키에 로케일 정보가 있으면 이를 사용합니다.
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale;
    }

    // 쿠키에 로케일이 없으면, negotiator와 intl-localematcher를 사용해 최적의 로케일을 선택합니다.
    return matchLocale(languages, locales, i18n.defaultLocale);
}

// 요청을 처리하는 미들웨어 함수입니다.
export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // 특정 경로는 로케일 검사를 제외합니다.
    if (
        [
            '/manifest.json',
            '/favicon.ico',
        ].includes(pathname)
    ) return;

    // 경로에 로케일 정보가 누락된 경우를 확인합니다.
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // 로케일 정보가 누락된 경우, 최적의 로케일을 찾아 리디렉션합니다.
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }

    // 로케일 정보가 있는 경우, 다음 단계로 요청을 넘깁니다.
    return NextResponse.next();
}

// 이 미들웨어가 적용될 경로를 설정합니다.
export const config = {
    matcher: ['/((?!_next).*)'],
};
