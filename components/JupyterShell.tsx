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
    focus=["Agentic LLM/RAG", "Edge ML", "Computer Vision"],
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

papers = ["MedSAM3 for Medical Segmentation", "Hybrid RAG (BM25 + Dense)", "Edge ML Quantization"]
papers`,

  `%%bash
echo "=== Current Reading ==="
echo "1. MedSAM3 Paper (Meta AI, 2024)"
echo "2. Hybrid RAG Survey (2024)"
echo "3. Edge ML Quantization Guide (DoD)"`,

  `# Challenges & Experiments
challenges = {"MedSAM": "Prompt engineering for CT vs MRI", "RAG": "Re-ranking BM25 + dense scores", "Edge": "INT8 quantization on ARM Cortex-A53"}
challenges`,
]

const LEARNING_OUTPUTS = [
  <div className="font-mono text-[12px]" style={{ color: 'var(--nb-text)' }}>
    <div className="mb-2">In [1]:</div>
    <div className="ml-2">
      <div className="mb-1"><span className="text-[var(--nb-green)]">["MedSAM3 for Medical Segmentation",</span> <span className="text-[var(--nb-purple)]">"Hybrid RAG (BM25 + Dense)",</span> <span className="text-[var(--nb-accent)]">"Edge ML Quantization Guide (DoD)"]</span></div>
    </div>
  </div>,
  <div className="font-mono text-[12px] space-y-0.5" style={{ color: 'var(--nb-green)' }}>
    <div>In [2]:</div>
    <div className="ml-2 space-y-0.5">
      <div>1. MedSAM3 Paper (Meta AI, 2024)</div>
      <div>2. Hybrid RAG Survey (2024)</div>
      <div>3. Edge ML Quantization Guide (DoD)</div>
    </div>
  </div>,
  <LearningOutput key="learning" />,
]

const LEARNING_TYPES: Array<'code' | 'bash'> = ['code', 'bash', 'code']

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