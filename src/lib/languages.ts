export const LANGUAGES = [
  {
    code: 'id',
    displayCode: 'ID',
    label: 'Indonesia',
    flag: 'https://purecatamphetamine.github.io/country-flag-icons/3x2/ID.svg',
  },
  {
    code: 'en',
    displayCode: 'EN',
    label: 'English',
    flag: 'https://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg',
  },
  {
    code: 'zh-CN',
    displayCode: 'CN',
    label: '中文',
    flag: 'https://purecatamphetamine.github.io/country-flag-icons/3x2/CN.svg',
  },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

export function getLanguageByCode(code: string) {
  return LANGUAGES.find((lang) => lang.code === code) ?? LANGUAGES[0]
}
