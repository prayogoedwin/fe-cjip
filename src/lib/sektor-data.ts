export const SEKTOR_TABS = [
  { id: 'manufaktur', label: 'Manufaktur', filter: 'Manufaktur', icon: '🏭' },
  { id: 'pariwisata', label: 'Pariwisata', filter: 'Pariwisata', icon: '🏖️' },
  { id: 'infrastruktur', label: 'Infrastruktur', filter: 'Infrastruktur', icon: '🏗️' },
  { id: 'pertanian', label: 'Pertanian', filter: 'Pertanian', icon: '🌾' },
  { id: 'properti', label: 'Properti', filter: 'Properti', icon: '🏢' },
  { id: 'energi', label: 'Energi', filter: 'Energi', icon: '⚡' },
] as const

export type SektorTabId = (typeof SEKTOR_TABS)[number]['id']
