'use client';
import { i18n } from '../../../i18n-config';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguageStore } from '@/store/useLanguageStore';
import { useEffect } from 'react';

interface LanguageSwitcherProps {
  initialLocale: string;
}

export default function LanguageSwitcher({ initialLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale, setLocale } = useLanguageStore();

  // 초기 언어 설정
  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale, setLocale]);

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale !== locale) {
      setLocale(newLocale);
      const newPathname = `/${newLocale}${pathname.replace(/^\/(ko|en)/, '')}`;
      router.push(newPathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''));
    }
  };

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>{locale.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {i18n.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {loc.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
