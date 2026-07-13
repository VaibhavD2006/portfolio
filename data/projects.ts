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
    url: '#',
    urlLabel: 'ICMLA \'25',
  },
  {
    title: 'UNC Radiation Oncology',
    org: 'UNC Department of Radiation Oncology',
    category: ['Vision', 'Research'],
    status: 'Ongoing',
    summary:
      'CNN pipeline for vertebrae segmentation and lesion detection on clinical CT scans. Combines MedSAM3 for 3D segmentation with YOLOv8 for detection. Trained on 65,000+ CT images across active clinical trials, reducing radiologist data prep time by 35%.',
    stack: ['PyTorch', 'MedSAM3', 'YOLOv8', 'Python', 'DICOM pipelines', 'NumPy', 'OpenCV'],
    metrics: [
      { label: 'Segmentation accuracy', value: '93%' },
      { label: 'CT images trained on', value: '65,000+' },
      { label: 'Radiologist prep time reduction', value: '35%' },
    ],
    hardPart:
      'Getting MedSAM3 to generalize across CT scans from different scanners and clinical protocols without re-training from scratch — required careful DICOM normalization and augmentation strategies specific to clinical imaging variability.',
  },
]
