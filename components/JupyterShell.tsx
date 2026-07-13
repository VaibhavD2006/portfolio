'use client'
import { useState, useEffect, useCallback } from 'react'
import { MenuBar } from './MenuBar'
import { NotebookToolbar } from './NotebookToolbar'
import { FileBrowser } from './FileBrowser'
import { NotebookCell } from './NotebookCell'
import { ProfileOutput } from './outputs/ProfileOutput'
import { ExperienceOutput } from './outputs/ExperienceOutput'
import { PublicationOutput } from './outputs/PublicationOutput'
import { ProjectsOutput } from './outputs/ProjectsOutput'
import { ContactOutput } from './outputs/ContactOutput'
import type { CellState } from '@/lib/types'

const CELL_CODE = [
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

const CELL_OUTPUTS = [
  <ProfileOutput key="profile" />,
  <ExperienceOutput key="experience" />,
  <PublicationOutput key="publication" />,
  <ProjectsOutput key="projects" />,
  <ContactOutput key="contact" />,
]

const CELL_TYPES: Array<'code' | 'bash'> = ['code', 'code', 'code', 'code', 'bash']

const EXECUTION_DELAY = 400  // ms per cell "thinking" time
const STAGGER_DELAY  = 350  // ms between cells starting

export function JupyterShell() {
  const [states, setStates] = useState<CellState[]>(CELL_CODE.map(() => 'idle'))
  const [running, setRunning] = useState(false)

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
    // Reset all
    setStates(CELL_CODE.map(() => 'idle'))
    setRunning(true)

    for (let i = 0; i < CELL_CODE.length; i++) {
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
  }, [running])

  // Auto-run on mount
  useEffect(() => {
    const t = setTimeout(() => runAll(), 800)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const kernelBusy = running || states.some((s) => s === 'running')

  return (
    <div
      className="flex flex-col h-dvh"
      style={{ background: 'var(--nb-bg)' }}
    >
      <MenuBar kernelBusy={kernelBusy} />
      <NotebookToolbar onRunAll={runAll} running={running} />

      {/* Body: sidebar + notebook */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <FileBrowser />

        {/* Notebook scroll area */}
        <div className="flex-1 overflow-y-auto">
          {/* Notebook title */}
          <div
            className="px-3 sm:px-6 pt-4 pb-2 text-[12px] sm:text-[13px] flex items-center gap-2 flex-wrap"
            style={{ color: 'var(--nb-muted)' }}
          >
            <span className="font-mono">vaibhav_dandala.ipynb</span>
            <span className="hidden sm:inline">—</span>
            <span className="hidden sm:inline">Last checkpoint: just now</span>
          </div>

          {/* Cells */}
          <div className="pb-20 sm:pb-16">
            {CELL_CODE.map((code, i) => (
              <div key={i} className="border-b" style={{ borderColor: 'var(--nb-border-subtle)' }}>
                <NotebookCell
                  index={i + 1}
                  state={states[i]}
                  code={code}
                  type={CELL_TYPES[i]}
                  onRun={() => runCell(i)}
                  output={CELL_OUTPUTS[i]}
                />
              </div>
            ))}

            {/* Trailing empty space / add cell hint */}
            <div className="px-6 pt-4 text-[11px] text-[var(--nb-muted)] select-none">
              Click [Run All] in the toolbar to replay the notebook.
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
        <span>vaibhav_dandala.ipynb</span>
        <div className="flex items-center gap-4">
          <span>{CELL_CODE.length} cells</span>
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
