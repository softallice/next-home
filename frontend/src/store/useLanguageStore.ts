// store/useLanguageStore.ts
import { create } from 'zustand';

interface LanguageState {
  locale: string;
  setLocale: (locale: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  locale: 'ko', // 기본 언어
  setLocale: (locale) => set({ locale }),
}));
