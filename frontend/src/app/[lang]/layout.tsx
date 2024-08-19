import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "@/lib/api-helpers";
import { fetchAPI } from "@/lib/fetch-api";

import { i18n } from "../../../i18n-config";
import Footer from "../../components/custom/Footer";
import Navbar from "../../components/header/Navbar";
import { FALLBACK_SEO } from "@/lib/constants";

import { Noto_Sans_KR } from "next/font/google";

import SmoothScrolling from "@/components/custom/gsap/SmoothScrolling";
import ScrollToTop from "@/components/custom/scroll/ScrollToTop";

// import { LanguageProvider } from "@/components/language/LanguageProvider";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error("The Strapi API Token 환경 변수가 설정되지 않았습니다.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.links.subLinks",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const meta = await getGlobal(params.lang);
  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
}) {
  const global = await getGlobal(params.lang);
  if (!global.data) return null;

  const { navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(navbar.navbarLogo.logoImg.data?.attributes.url);
  const footerLogoUrl = getStrapiMedia(footer.footerLogo.logoImg.data?.attributes.url);

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={notoSansKr.className} suppressHydrationWarning>
        <SmoothScrolling>
          <Navbar
            links={navbar.links}
            logoUrl={navbarLogoUrl}
            logoText={navbar.navbarLogo.logoText}
          >
            {/* 서버에서 가져온 초기 언어 정보를 클라이언트 컴포넌트로 전달 */}
            <LanguageSwitcher initialLocale={params.lang} />
          </Navbar>

          <main className="min-h-screen dark:bg-black dark:text-gray-100">
            {children}
          </main>

          <ScrollToTop />

          <Footer
            logoUrl={footerLogoUrl}
            logoText={footer.footerLogo.logoText}
            menuLinks={footer.menuLinks}
            categoryLinks={footer.categories.data}
            legalLinks={footer.legalLinks}
            socialLinks={footer.socialLinks}
          />
        </SmoothScrolling>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
