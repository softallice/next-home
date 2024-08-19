'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface LanguageContextProps {
  lang: string;
  changeLanguage: (newLang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children, initialLang }: { children: ReactNode; initialLang: string }) => {
  const [lang, setLang] = useState(initialLang);
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLang: string) => {
    setLang(newLang);
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
