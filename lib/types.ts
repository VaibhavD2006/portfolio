export type CellState = 'idle' | 'running' | 'done'
export type CellType = 'code' | 'bash' | 'markdown'

export interface ExperienceEntry {
  org: string
  role: string
  dates: string
  location: string
  bullets: string[]
}

export interface Publication {
  title: string
  subtitle: string
  venue: string
  year: string
  coAuthor: string
  coAuthorOrg: string
  description: string
  url?: string
  tags: string[]
}

export interface ProjectEntry {
  title: string
  org: string
  category: string[]
  status: 'Shipped' | 'Published' | 'Ongoing' | 'Research'
  summary: string
  stack: string[]
  metrics: { label: string; value: string }[]
  hardPart: string
  url?: string
  urlLabel?: string
  github?: string
}
