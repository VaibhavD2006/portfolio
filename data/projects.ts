import type { ProjectEntry } from '@/lib/types'

export const projects: ProjectEntry[] = [
  {
    title: 'KeyMail',
    org: 'key-mail.co',
    category: ['SaaS', 'Agents'],
    status: 'Shipped',
    summary:
      'AI-native CRM and marketing automation platform for realtors. Agentic inbox, campaign sequences, and LinkedIn/X marketing. Built Key Moments — a pg_cron-scheduled milestone engine that invokes Claude with pgvector RAG to generate personalized drafts, with approval-gated agentic writes and immutable per-event audit traces.',
    stack: ['Next.js', 'React', 'Supabase', 'PostgreSQL', 'pgvector', 'Gemini', 'Claude', 'Gmail API', 'LinkedIn API', 'X API', 'Chrome MV3'],
    metrics: [
      { label: 'Active realtors', value: '100+' },
      { label: 'MLS partnership', value: 'Doorify' },
      { label: 'Agentic writes', value: 'Approval-gated + audit-traced' },
    ],
    hardPart:
      'Building approval-gated agentic writes with immutable audit traces at the per-event level — ensuring every Claude-generated draft was traceable, reversible, and safe for real client communication.',
    url: 'https://key-mail.co',
    urlLabel: 'key-mail.co',
  },
  {
    title: 'NASA / LUMIN',
    org: 'NASA Jet Propulsion Laboratory',
    category: ['RAG', 'Research'],
    status: 'Published',
    summary:
      'Agentic LLM multimodal query system over NASA\'s Planetary Data System (PDS) archives. Enables natural language queries over 10,000+ Mars Science Laboratory mission records. Co-authored with JPL Lead Data Scientist Dr. Emily Dunkel; published at ICMLA 2025.',
    stack: ['Python', 'PineconeDB', 'BM25', 'Dense Embeddings', 'FastAPI', 'LangChain'],
    metrics: [
      { label: 'PDS3 filter accuracy', value: '80%+' },
      { label: 'MSL records indexed', value: '10,000+' },
      { label: 'Publication venue', value: 'ICMLA 2025' },
    ],
    hardPart:
      'Building hybrid BM25 + dense retrieval that actually improves over either sparse or dense alone on unstructured PDS3 archive data, which mixes structured metadata with freeform mission notes across decades of records.',
    url: 'https://ieeexplore.ieee.org/document/11471464',
    urlLabel: 'Paper',
  },
  {
    title: 'CaseForge AI',
    org: 'NC State Consulting Clubs',
    category: ['SaaS', 'AI'],
    status: 'Currently Building',
    summary:
      'AI-powered consulting case interview prep platform. Provides adaptive mock interviews with 7-dimension scoring and readiness dashboard for candidates targeting MBB/T2 firms like McKinsey, BCG, Bain.',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Google Gemini', 'Ollama', 'PostgreSQL', 'Drizzle ORM', 'Inngest'],
    metrics: [
      { label: 'Features', value: 'AI Interviewer + 7-D Scorecard' },
      { label: 'Target Users', value: 'NC State Consulting Club' },
    ],
    hardPart:
      'Building the 7-stage async evaluation pipeline with Inngest for comprehensive case interview scoring across structure, hypothesis, numerics, synthesis, and communication.',
    url: '#',
    urlLabel: 'See below',
  },
]
