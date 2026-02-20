import { ko } from './ko';
import { en } from './en';

export const languages = { ko, en } as const;
export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'ko';

export function useTranslations(locale: Locale) {
  return languages[locale] ?? languages[defaultLocale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  if (first in languages) return first as Locale;
  return defaultLocale;
}

export function getLocalePath(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`;
}

export function getAlternateLocales(current: Locale): Locale[] {
  return (Object.keys(languages) as Locale[]).filter((l) => l !== current);
}
