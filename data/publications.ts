import type { Publication } from '@/lib/types'

export const publications: Publication[] = [
  {
    title: 'LUMIN',
    subtitle: 'Agentic LLM Multimodal NASA PDS Query System',
    venue: 'ICMLA',
    year: '2025',
    coAuthor: 'Dr. Emily Dunkel',
    coAuthorOrg: 'NASA Jet Propulsion Laboratory',
    description:
      'Hybrid RAG workflow over MSL (Mars Science Laboratory) archives using BM25 + dense embeddings. Enables planetary scientists to query decades of Mars rover data through a natural language interface. Achieved 80%+ PDS3 filter prediction accuracy across 10,000+ indexed mission records.',
    url: 'https://ieeexplore.ieee.org/document/11471464',
    tags: ['RAG', 'LLM', 'NASA', 'Multimodal', 'BM25', 'PineconeDB'],
  },
]
