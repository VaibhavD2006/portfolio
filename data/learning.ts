import type { ProjectEntry } from '@/lib/types'

export const learningItems: ProjectEntry[] = [
  {
    title: 'MedSAM3 Papers',
    org: 'Meta AI / Stanford',
    category: ['Vision', 'Research'],
    status: 'Research',
    summary:
      'Exploring MedSAM3 for medical image segmentation. The paper introduces a foundation model for medical images that generalizes across modalities. Key insight: promptable segmentation beats fixed-architecture detectors for diverse clinical data.',
    stack: ['PyTorch', 'Segment Anything', 'Medical Imaging', 'DICOM'],
    metrics: [
      { label: 'Generalization', value: 'Across 5 modalities' },
      { label: 'Paper', value: 'MedSAM 2024' },
    ],
    hardPart: 'Understanding how prompt positioning affects segmentation quality in CT vs MRI vs ultrasound - the model is promptable but the optimal prompts vary by modality.',
  },
  {
    title: 'Fine-tuning Image Detection Models',
    org: 'Oncology & US Defense',
    category: ['Computer Vision', 'Segmentation'],
    status: 'Ongoing',
    summary:
      'Currently fine-tuning current image detection models for oncology and US defense applications. Working on creating segmentation and fine grain image detection models for detecting anomalies and anomalies in medical imaging and defense sector imagery.',
    stack: ['PyTorch', 'YOLOv8', 'SAM (Segment Anything)', 'Medical Imaging', 'Defense Imagery'],
    metrics: [
      { label: 'Applications', value: 'Oncology, US Defense' },
      { label: 'Model Type', value: 'Detection + Segmentation' },
    ],
    hardPart: 'Balancing accuracy between medical imaging (CT/MRI) and defense sector imagery (satellite, aerial, surveillance) which have vastly different data characteristics and annotation requirements.',
  },
  {
    title: 'Hybrid RAG (BM25 + Dense)',
    org: 'Research Notes',
    category: ['RAG', 'LLM'],
    status: 'Research',
    summary:
      'Studying how sparse (BM25) and dense embeddings complement each other. BM25 excels at keyword matching in structured docs; dense captures semantic similarity. Combining them requires careful re-ranking to avoid double-counting.',
    stack: ['PineconeDB', 'BM25', 'Vector Search', 'Embeddings'],
    metrics: [
      { label: 'Recall Gain', value: '~15% over dense alone' },
      { label: 'Query Types', value: 'Hybrid queries' },
    ],
    hardPart: 'Designing the re-ranking function so BM25 scores and dense similarity scores are on comparable scales without biasing one over the other.',
  },
  {
    title: 'Quant Finance: VIX Prediction Bot',
    org: 'Personal Projects',
    category: ['Quant Finance', 'ML'],
    status: 'Ongoing',
    summary:
      'Building automated backtesting and Monte Carlo simulation systems. Currently working on a prediction bot that forecasts VIX and uses mean reversion strategies for trading. Recent success: $500 profit realized (not paper trade).',
    stack: ['Python', 'Backtesting', 'Monte Carlo', 'RSI', 'Options Flow', 'Web Scrapers', 'SEC Filings'],
    metrics: [
      { label: 'P&L', value: '$500 realized' },
      { label: 'Strategy', value: 'Mean reversion on VIX' },
    ],
    hardPart: 'Integrating real-time options flow data with RSI indicators to calculate mean reversion signals across various sectors while maintaining robust backtesting infrastructure.',
  },
  {
    title: 'CaseForge AI',
    org: 'NC State Consulting Clubs',
    category: ['SaaS', 'AI', 'Product'],
    status: 'Ongoing',
    summary:
      'AI-powered consulting case interview prep platform. Provides adaptive mock interviews with 7-dimension scoring and readiness dashboard for candidates targeting MBB/T2 firms.',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Google Gemini', 'Ollama', 'PostgreSQL', 'Drizzle ORM', 'Inngest', 'Recharts'],
    metrics: [
      { label: 'Features', value: 'AI Interviewer + 7-D Scorecard' },
      { label: 'Target Users', value: 'NC State Consulting Club' },
    ],
    hardPart: 'Building the 7-stage async evaluation pipeline with Inngest for comprehensive case interview scoring across structure, hypothesis, numerics, synthesis, and communication.',
  },
]

export const learningQuestions = [
  { label: 'What papers are you reading?', targetSection: '0' },
  { label: 'What techniques are you exploring?', targetSection: '1' },
  { label: 'What challenges are you stuck on?', targetSection: '2' },
]