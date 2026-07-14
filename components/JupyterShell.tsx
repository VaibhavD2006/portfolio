'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { MenuBar } from './MenuBar'
import { NotebookToolbar } from './NotebookToolbar'
import { FileBrowser } from './FileBrowser'
import { NotebookCell } from './NotebookCell'
import { ProfileOutput } from './outputs/ProfileOutput'
import { ExperienceOutput } from './outputs/ExperienceOutput'
import { PublicationOutput } from './outputs/PublicationOutput'
import { ProjectsOutput } from './outputs/ProjectsOutput'
import { ContactOutput } from './outputs/ContactOutput'
import { LearningOutput } from './outputs/LearningOutput'
import type { CellState } from '@/lib/types'

// ─── Portfolio Notebook ───
const PORTFOLIO_CELLS = [
  `from vaibhav import MLEngineer

vaibhav = MLEngineer(
    name="Vaibhav R. Dandala",
    university="NC State University",
    degree="B.S. EE + CPE (Dual)",
    gpa=3.80,
    focus=["Agentic LLM/RAG", "Building End-To-End Tools", "Computer Vision"],
)
vaibhav.display()`,

  `vaibhav.experience.timeline(verbose=True)`,

  `vaibhav.publications.all()`,

  `vaibhav.projects.head(3)`,

  `%%bash
echo "=== Contact Vaibhav ==="
cat contact.txt`,
]

const PORTFOLIO_OUTPUTS = [
  <ProfileOutput key="profile" />,
  <ExperienceOutput key="experience" />,
  <PublicationOutput key="publication" />,
  <ProjectsOutput key="projects" />,
  <ContactOutput key="contact" />,
]

const PORTFOLIO_TYPES: Array<'code' | 'bash'> = ['code', 'code', 'code', 'code', 'bash']

// ─── Learning Journal Notebook ───
const LEARNING_CELLS = [
  `# Learning Journal

# Papers & Techniques I'm Exploring

papers = [
    "MedSAM3 for Medical Segmentation",
    "Fine-tuning Image Detection Models",
    "Hybrid RAG (BM25 + Dense)"
]
papers

# Currently Building

## Quant Finance
quant = [
    "VIX Prediction Bot - $500 P&L (live)",
    "Backtesting infrastructure for SEC filings using web scrapers",
    "Options flow + RSI mean reversion strategies",
    "Monte Carlo simulations for risk analysis"
]
quant

## CaseForge AI - AI-powered consulting case interview prep
caseforge = {
    "project": "CaseForge AI",
    "purpose": "AI-powered consulting case interview prep for NC State consulting clubs",
    "features": [
        "AI Interviewer - Adaptive mock interviews mirroring real case styles",
        "7-Dimension Scorecard - Structure, hypothesis quality, numerics, synthesis, communication",
        "Readiness Dashboard - Progress tracking toward offer-ready",
        "Drill Library - 100+ case scenarios across industries",
        "Goals Tracking - Prep milestones",
        "Session History & Analytics - Full history with charts and trends"
    ],
    "tech_stack": {
        "framework": "Next.js 16 (App Router)",
        "language": "TypeScript / React 19",
        "styling": "Tailwind CSS v4 + Shadcn UI",
        "ai": "Google Gemini + Ollama (local)",
        "db": "PostgreSQL via Drizzle ORM",
        "auth": "Auth.js v5 (Google OAuth)",
        "jobs": "Inngest (7-stage evaluation pipeline)",
        "charts": "Recharts"
    }
}
caseforge`,

  `# Challenges & Experiments
challenges = {
    "MedSAM": "Prompt engineering for CT vs MRI vs ultrasound - optimal prompts vary by modality",
    "Detection": "Fine-tuning for oncology/defense domains with limited annotated data",
    "RAG": "Re-ranking BM25 + dense scores on comparable scales",
    "Quant": "Integrating real-time options flow with RSI for mean reversion signals",
    "CaseForge": "Building async evaluation pipeline with Inngest for 7-dimension scoring"
}
challenges`,
]

const LEARNING_OUTPUTS = [
  <div className="font-mono text-[12px]" style={{ color: 'var(--nb-text)' }}>
    <div className="mb-2">In [1]:</div>
    <div className="ml-2">
      <div className="mb-1"><span className="text-[var(--nb-green)]">["MedSAM3 for Medical Segmentation",</span> <span className="text-[var(--nb-purple)]">"Fine-tuning Image Detection Models",</span> <span className="text-[var(--nb-accent)]">"Hybrid RAG (BM25 + Dense)"]</span></div>
    </div>
  </div>,
  <div className="font-mono text-[12px] space-y-1" style={{ color: 'var(--nb-text)' }}>
    <div>In [2]:</div>
    <div className="ml-2 space-y-1">
      <div>• MedSAM3 for Medical Segmentation - foundation model for medical images</div>
      <div>• Fine-tuning Image Detection Models - Oncology + US Defense applications</div>
      <div>• Hybrid RAG (BM25 + Dense) - combining sparse and dense retrieval</div>
    </div>
  </div>,
  <div className="font-mono text-[12px] space-y-1" style={{ color: 'var(--nb-text)' }}>
    <div>In [3]:</div>
    <div className="ml-2 space-y-1">
      <div className="mb-2">=== Currently Building ===</div>
      <div className="mb-2">--- Quant Finance ---</div>
      <div>• VIX Prediction Bot - $500 P&L (live)</div>
      <div>• Backtesting infrastructure for SEC filings using web scrapers</div>
      <div>• Options flow + RSI mean reversion strategies</div>
      <div>• Monte Carlo simulations for risk analysis</div>
      <div className="mt-2 mb-2">--- CaseForge AI ---</div>
      <div>• AI-powered consulting case interview prep</div>
      <div>• 7-Dimension Scorecard (Structure, Hypothesis, Numerics, Synthesis, Communication)</div>
      <div>• Readiness Dashboard with Bronze → Platinum tier progression</div>
      <div>• 100+ case scenarios across industries</div>
      <div className="mt-2">Tech: Next.js 16, TypeScript, Tailwind, Gemini + Ollama, PostgreSQL, Inngest</div>
    </div>
  </div>,
  <div className="font-mono text-[12px] space-y-1" style={{ color: 'var(--nb-green)' }}>
    <div>In [5]:</div>
    <div className="ml-2 space-y-1">
      <div>• MedSAM: Prompt engineering for CT vs MRI vs ultrasound</div>
      <div>• Detection: Fine-tuning for oncology/defense domains</div>
      <div>• RAG: Re-ranking BM25 + dense scores on comparable scales</div>
      <div>• Quant: Integrating options flow with RSI for mean reversion</div>
      <div>• CaseForge: Building async 7-stage Inngest evaluation pipeline</div>
    </div>
  </div>,
  <LearningOutput key="learning" />,
]

const LEARNING_TYPES: Array<'code' | 'bash'> = ['code', 'code', 'code', 'code']

// ─── Config ───
const EXECUTION_DELAY = 400
const STAGGER_DELAY = 350

export function JupyterShell() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'learning'>('portfolio')
  const [states, setStates] = useState<CellState[]>([])
  const [running, setRunning] = useState(false)
  const [hasRun, setHasRun] = useState<{ portfolio: boolean; learning: boolean }>({ portfolio: false, learning: false })

  // Memoize the current notebook's content
  const currentCells = useMemo(() => activeTab === 'portfolio' ? PORTFOLIO_CELLS : LEARNING_CELLS, [activeTab])
  const currentOutputs = useMemo(() => activeTab === 'portfolio' ? PORTFOLIO_OUTPUTS : LEARNING_OUTPUTS, [activeTab])
  const currentTypes = useMemo(() => activeTab === 'portfolio' ? PORTFOLIO_TYPES : LEARNING_TYPES, [activeTab])
  const notebookName = activeTab === 'portfolio' ? 'VaibhavLabs.ipynb' : 'learning.ipynb'
  const cellCount = currentCells.length

  const runCell = useCallback((i: number) => {
    setStates((prev) => {
      const next = [...prev]
      next[i] = 'running'
      return next
    })
    setTimeout(() => {
      setStates((prev) => {
        const next = [...prev]
        next[i] = 'done'
        return next
      })
    }, EXECUTION_DELAY)
  }, [])

  const runAll = useCallback(async () => {
    if (running) return
    // Reset states for new notebook
    setStates(currentCells.map(() => 'idle'))
    setRunning(true)

    for (let i = 0; i < currentCells.length; i++) {
      await delay(i === 0 ? 300 : STAGGER_DELAY)
      setStates((prev) => {
        const next = [...prev]
        next[i] = 'running'
        return next
      })
      await delay(EXECUTION_DELAY)
      setStates((prev) => {
        const next = [...prev]
        next[i] = 'done'
        return next
      })
    }

    setRunning(false)
  }, [running, currentCells.length])

  // Initialize states when tab changes
  useEffect(() => {
    setStates(currentCells.map(() => 'idle'))
  }, [currentCells])

  // Auto-run on tab mount (only once per tab)
  useEffect(() => {
    if (!hasRun[activeTab]) {
      const t = setTimeout(() => {
        runAll()
        setHasRun((prev) => ({ ...prev, [activeTab]: true }))
      }, 800)
      return () => clearTimeout(t)
    }
  }, [activeTab, hasRun, runAll])

  const kernelBusy = running || states.some((s) => s === 'running')

  return (
    <div
      className="flex flex-col h-dvh"
      style={{ background: 'var(--nb-bg)' }}
    >
      {/* Menu bar with software name */}
      <MenuBar kernelBusy={kernelBusy} activeTab={activeTab} onTabChange={setActiveTab} />

      <NotebookToolbar onRunAll={runAll} running={running} />

      {/* Body: sidebar + notebook */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <FileBrowser activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Notebook scroll area */}
        <div className="flex-1 overflow-y-auto">
          {/* Notebook title */}
          <div
            className="px-3 sm:px-6 pt-4 pb-2 text-[12px] sm:text-[13px] flex items-center gap-2 flex-wrap"
            style={{ color: 'var(--nb-muted)' }}
          >
            <span className="font-mono">{notebookName}</span>
            <span className="hidden sm:inline">—</span>
            <span className="hidden sm:inline">Last checkpoint: just now</span>
          </div>

          {/* Cells */}
          <div className="pb-20 sm:pb-16">
            {states.length > 0 && currentCells.map((code, i) => (
              <div key={i} className="border-b" style={{ borderColor: 'var(--nb-border-subtle)' }}>
                <NotebookCell
                  index={i + 1}
                  state={states[i]}
                  code={code}
                  type={currentTypes[i]}
                  onRun={() => runCell(i)}
                  output={currentOutputs[i]}
                />
              </div>
            ))}

            {/* Cell count hint */}
            <div className="px-3 sm:px-6 pt-4 text-[11px] text-[var(--nb-muted)] select-none">
              {cellCount} cells in {activeTab === 'portfolio' ? 'Portfolio' : 'Learning Journal'}
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-3 py-1 text-[11px] shrink-0 border-t select-none"
        style={{
          background: 'var(--nb-toolbar)',
          borderColor: 'var(--nb-border)',
          color: 'var(--nb-muted)',
        }}
      >
        <span className="font-mono">{notebookName}</span>
        <div className="flex items-center gap-3 sm:gap-4">
          <span>{cellCount} cells</span>
          <span className="hidden sm:inline">Python 3.11.9</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span
            className="font-semibold"
            style={{ color: kernelBusy ? 'var(--nb-kernel-busy)' : 'var(--nb-kernel-idle)' }}
          >
            {kernelBusy ? '● Busy' : '● Idle'}
          </span>
        </div>
      </div>
    </div>
  )
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}