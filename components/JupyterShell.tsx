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
  // ── Section 1: Papers ──
  `Papers & Techniques I'm Exploring`,

  `papers = {
    "MedSAM3": "Foundation model for medical image segmentation (Meta AI, 2024)",
    "Image Detection": "Fine-tuning detection models for Oncology + US Defense",
    "Hybrid RAG": "BM25 sparse + dense embeddings with re-ranking",
}
papers`,

  // ── Section 2: Currently Building ──
  `Currently Building`,

  `# Quant Finance
quant = {
    "VIX Prediction Bot": "$500 P&L realized (not paper trade)",
    "Other strategies": [
        "Post Earnings Drift Announcement via SEC filing web scrapers",
        "Options flow + RSI mean reversion across sectors",
        "Monte Carlo simulations for risk analysis",
    ],
    "stack": {
        "runtime":    "Python 3.x",
        "data":       "DuckDB + Polars + PyArrow + yfinance + EDGAR",
        "signals_ml": "scikit-learn + hmmlearn + statsmodels + cvxpy",
        "serving":    "FastAPI + uvicorn",
        "tracking":   "MLflow",
    },
}
quant`,

  `# CaseForge AI
caseforge = {
    "description": "AI-powered consulting case interview prep SaaS",
    "target": "NC State consulting clubs — McKinsey, BCG, Bain, T2 firms",
    "features": [
        "AI Interviewer — adaptive mock interviews with pressure testing",
        "7-Dimension Scorecard — structure, hypothesis, numerics, synthesis, comms",
        "Readiness Dashboard — Bronze → Silver → Gold → Platinum tier progression",
        "Drill Library — 100+ cases across retail, healthcare, M&A, operations",
        "Session History & Analytics — charts and dimension trends over time",
    ],
    "stack": {
        "framework": "Next.js 16 + TypeScript + React 19",
        "styling":   "Tailwind CSS v4 + Shadcn UI + Framer Motion",
        "ai":        "Google Gemini + Ollama (local inference)",
        "db":        "PostgreSQL + Drizzle ORM",
        "auth":      "Auth.js v5 — Google OAuth",
        "jobs":      "Inngest — 7-stage async eval pipeline",
    },
}
caseforge`,
]

const LEARNING_OUTPUTS: React.ReactNode[] = [
  // markdown header — no output
  null,

  // papers output
  <div key="papers-out" className="font-mono text-[12px] space-y-1" style={{ color: 'var(--nb-text)' }}>
    <div className="space-y-1">
      <div><span className="text-[var(--nb-green)]">"MedSAM3"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"Foundation model for medical image segmentation (Meta AI, 2024)"</span></div>
      <div><span className="text-[var(--nb-green)]">"Image Detection"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"Fine-tuning detection models for Oncology + US Defense"</span></div>
      <div><span className="text-[var(--nb-green)]">"Hybrid RAG"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"BM25 sparse + dense embeddings with re-ranking"</span></div>
    </div>
  </div>,

  // markdown header — no output
  null,

  // quant output
  <div key="quant-out" className="font-mono text-[12px] space-y-1" style={{ color: 'var(--nb-text)' }}>
    <div><span className="text-[var(--nb-green)]">"VIX Prediction Bot"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"$500 P&L realized (not paper trade)"</span></div>
    <div className="mt-2"><span className="text-[var(--nb-green)]">"Other strategies"</span><span className="text-[var(--nb-muted)]">: [</span></div>
    <div className="ml-4"><span className="text-[var(--nb-yellow)]">"Post Earnings Drift Announcement via SEC filing web scrapers"</span><span className="text-[var(--nb-muted)]">,</span></div>
    <div className="ml-4"><span className="text-[var(--nb-yellow)]">"Options flow + RSI mean reversion across sectors"</span><span className="text-[var(--nb-muted)]">,</span></div>
    <div className="ml-4"><span className="text-[var(--nb-yellow)]">"Monte Carlo simulations for risk analysis"</span><span className="text-[var(--nb-muted)]">,</span></div>
    <div><span className="text-[var(--nb-muted)]">]</span></div>
    <div className="mt-2"><span className="text-[var(--nb-green)]">"stack"</span><span className="text-[var(--nb-muted)]">: {"{"}</span></div>
    <div className="ml-4"><span className="text-[var(--nb-green)]">"runtime"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"Python 3.x"</span></div>
    <div className="ml-4"><span className="text-[var(--nb-green)]">"data"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"DuckDB + Polars + PyArrow + yfinance + EDGAR"</span></div>
    <div className="ml-4"><span className="text-[var(--nb-green)]">"signals_ml"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"scikit-learn + hmmlearn + statsmodels + cvxpy"</span></div>
    <div className="ml-4"><span className="text-[var(--nb-green)]">"serving"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"FastAPI + uvicorn"</span></div>
    <div className="ml-4"><span className="text-[var(--nb-green)]">"tracking"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"MLflow"</span></div>
    <div><span className="text-[var(--nb-muted)]">{"}"}</span></div>
  </div>,

  // caseforge output
  <div key="caseforge-out" className="font-mono text-[12px] space-y-1" style={{ color: 'var(--nb-text)' }}>
    <div><span className="text-[var(--nb-green)]">"description"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"AI-powered consulting case interview prep SaaS"</span></div>
    <div><span className="text-[var(--nb-green)]">"target"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"NC State consulting clubs — McKinsey, BCG, Bain, T2 firms"</span></div>
    <div className="mt-2"><span className="text-[var(--nb-green)]">"features"</span><span className="text-[var(--nb-muted)]">: [</span></div>
    <div className="ml-4"><span className="text-[var(--nb-yellow)]">"AI Interviewer — adaptive mock interviews with pressure testing"</span><span className="text-[var(--nb-muted)]">,</span></div>
    <div className="ml-4"><span className="text-[var(--nb-yellow)]">"7-Dimension Scorecard — structure, hypothesis, numerics, synthesis, comms"</span><span className="text-[var(--nb-muted)]">,</span></div>
    <div className="ml-4"><span className="text-[var(--nb-yellow)]">"Readiness Dashboard — Bronze → Silver → Gold → Platinum tier"</span><span className="text-[var(--nb-muted)]">,</span></div>
    <div className="ml-4"><span className="text-[var(--nb-yellow)]">"Drill Library — 100+ cases across retail, healthcare, M&A, ops"</span><span className="text-[var(--nb-muted)]">,</span></div>
    <div className="ml-4"><span className="text-[var(--nb-yellow)]">"Session History & Analytics — charts and dimension trends"</span><span className="text-[var(--nb-muted)]">,</span></div>
    <div><span className="text-[var(--nb-muted)]">]</span></div>
    <div className="mt-2"><span className="text-[var(--nb-green)]">"stack"</span><span className="text-[var(--nb-muted)]">: {"{"}</span></div>
    <div className="ml-4"><span className="text-[var(--nb-green)]">"framework"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"Next.js 16 + TypeScript + React 19"</span></div>
    <div className="ml-4"><span className="text-[var(--nb-green)]">"ai"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"Google Gemini + Ollama (local inference)"</span></div>
    <div className="ml-4"><span className="text-[var(--nb-green)]">"db"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"PostgreSQL + Drizzle ORM"</span></div>
    <div className="ml-4"><span className="text-[var(--nb-green)]">"jobs"</span><span className="text-[var(--nb-muted)]">: </span><span className="text-[var(--nb-yellow)]">"Inngest — 7-stage async eval pipeline"</span></div>
    <div><span className="text-[var(--nb-muted)]">{"}"}</span></div>
  </div>,
]

const LEARNING_TYPES: Array<'code' | 'bash' | 'markdown'> = ['markdown', 'code', 'markdown', 'code', 'code']

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
            {states.length > 0 && (() => {
              let codeIndex = 0
              return currentCells.map((code, i) => {
                const type = currentTypes[i]
                if (type !== 'markdown') codeIndex++
                return (
                  <div key={i} className="border-b" style={{ borderColor: 'var(--nb-border-subtle)' }}>
                    <NotebookCell
                      index={codeIndex}
                      state={states[i]}
                      code={code}
                      type={type}
                      onRun={() => runCell(i)}
                      output={currentOutputs[i]}
                    />
                  </div>
                )
              })
            })()}

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