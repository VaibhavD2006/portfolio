import type { ExperienceEntry } from '@/lib/types'

export const experience: ExperienceEntry[] = [
  {
    org: 'UNC Department of Radiation Oncology',
    role: 'Lead Machine Learning Engineer',
    dates: 'Apr 2025 – Present',
    location: 'Chapel Hill, NC',
    bullets: [
      'Achieved 93% accuracy on vertebrae segmentation and lesion detection by co-developing a CNN pipeline combining MedSAM3 for segmentation and YOLOv8 for detection, trained on 65,000+ CT images.',
      'Reduced radiologist data prep time by 35% across active clinical trials by building segmentation and preprocessing pipelines, directly accelerating oncology research throughput.',
    ],
  },
  {
    org: 'NASA Jet Propulsion Laboratory',
    role: 'AI/ML Researcher',
    dates: 'Jun 2025 – Feb 2026',
    location: 'Remote',
    bullets: [
      'Built RAG pipeline using PineconeDB with hybrid BM25 + dense embeddings; 80%+ PDS3 filter prediction accuracy across MSL archives.',
      'Processed and indexed 10,000+ MSL mission records across structured and unstructured PDS3 archives, enabling planetary scientists to query decades of Mars rover data through a natural language interface for the first time.',
    ],
  },
  {
    org: 'DARPA',
    role: 'ML Engineer Intern',
    dates: 'Apr 2025 – Jul 2025',
    location: 'Remote',
    bullets: [
      'Deployed real-time edge ML on IoT for pose estimation and object detection in military zones; built synthetic data + quantization pipeline for battlefield hardware evaluation.',
      'Engineered annotation workflows across 3,500+ synthetic and real-world battlefield frames, directly improving model reliability for soldier-deployed edge hardware under strict compute constraints.',
    ],
  },
  {
    org: 'HavenSmart LLC',
    role: 'AI Developer & Team Lead',
    dates: 'Apr 2024 – Jun 2024',
    location: 'Remote',
    bullets: [
      'Deployed internal RAG chatbot (LangChain, PineconeDB, Docker) handling 5,000+ monthly employee queries on deployment processes and workflows.',
      'Eliminated 60% of manual onboarding overhead for engineering hires by replacing live CI/CD and architecture walkthroughs with a vector-search pipeline over internal NetApp docs.',
    ],
  },
]
