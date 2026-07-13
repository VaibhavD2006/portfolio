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
    title: 'Edge ML Quantization',
    org: 'DoD Deployment',
    category: ['Edge', 'Optimization'],
    status: 'Shipped',
    summary:
      'Investigating post-training quantization for ARM Cortex-A53 edge devices. 8-bit quantization gives 4x speedup with <2% accuracy drop. Dynamic quantization works better than static for our CNN architecture.',
    stack: ['TensorRT', 'INT8 Quantization', 'ARM CPU', 'ONNX'],
    metrics: [
      { label: 'Speedup', value: '4.2x' },
      { label: 'Accuracy Drop', value: '<2%' },
    ],
    hardPart: "Ensuring quantization-aware training doesn't overfit to synthetic data - real-world deployment revealed edge cases synthetic data missed.",
  },
]

export const learningQuestions = [
  { label: 'What papers are you reading?', targetSection: '0' },
  { label: 'What techniques are you exploring?', targetSection: '1' },
  { label: 'What challenges are you stuck on?', targetSection: '2' },
]