'use client'
import { Play, Square, Plus, Scissors, Copy, ChevronDown, RotateCcw } from 'lucide-react'
import { useMemo } from 'react'

interface NotebookToolbarProps {
  onRunAll: () => void
  running: boolean
  hasRun: boolean
}

export function NotebookToolbar({ onRunAll, running, hasRun }: NotebookToolbarProps) {
  // Gradient animation for the "not run" state
  const gradientStyle = hasRun
    ? undefined
    : {
        background: 'linear-gradient(90deg, var(--nb-accent), var(--nb-cyan), var(--nb-accent))',
        backgroundSize: '200% 100%',
        animation: 'gradientShift 2s linear infinite',
      }

  return (
    <>
      <div
        className="flex items-center h-10 px-2 gap-1 border-b shrink-0"
        style={{
          background: 'var(--nb-toolbar)',
          borderColor: 'var(--nb-border)',
        }}
      >
        {/* Icon buttons group 1 - desktop */}
        <div className="hidden sm:flex items-center gap-1">
          <ToolbarIcon title="Save" onClick={() => {}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
          </ToolbarIcon>

          <div className="w-px h-5 mx-1" style={{ background: 'var(--nb-border)' }} />

          <ToolbarIcon title="Add cell below" onClick={() => {}}>
            <Plus size={14} />
          </ToolbarIcon>
          <ToolbarIcon title="Cut cell" onClick={() => {}}>
            <Scissors size={14} />
          </ToolbarIcon>
          <ToolbarIcon title="Copy cell" onClick={() => {}}>
            <Copy size={14} />
          </ToolbarIcon>

          <div className="w-px h-5 mx-1" style={{ background: 'var(--nb-border)' }} />
        </div>

        {/* Run All button */}
        <button
          onClick={onRunAll}
          disabled={running}
          title={running ? 'Running…' : 'Run All Cells'}
          className="flex items-center gap-1.5 px-3 py-1 rounded text-[12px] font-medium transition-all disabled:opacity-60"
          style={{
            background: hasRun ? 'var(--nb-run-bg)' : gradientStyle?.background ?? 'var(--nb-run-bg)',
            color: running ? 'var(--nb-muted)' : 'var(--nb-accent)',
            border: `1px solid ${running ? 'var(--nb-border)' : 'var(--nb-accent)'}`,
            ...gradientStyle,
          }}
        >
          {running ? (
            <>
              <Square size={11} />
              <span>Running…</span>
            </>
          ) : (
            <>
              <Play size={11} className="fill-current" />
              <span>Run All</span>
            </>
          )}
        </button>

        <ToolbarIcon title="Restart kernel and run all" onClick={onRunAll}>
          <RotateCcw size={13} />
        </ToolbarIcon>

        {/* Cell type dropdown */}
        <div className="hidden sm:flex items-center gap-1 ml-1">
          <div className="w-px h-5 mx-1" style={{ background: 'var(--nb-border)' }} />
          <button
            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-colors"
            style={{ color: 'var(--nb-muted)', border: '1px solid var(--nb-border)' }}
          >
            Code <ChevronDown size={11} />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0%; }
          100% { background-position: 200%; }
        }
      `}</style>
    </>
  )
}

function ToolbarIcon({ children, title, onClick }: { children: React.ReactNode; title: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-7 h-7 flex items-center justify-center rounded transition-colors hover:bg-[var(--nb-border)] text-[var(--nb-muted)] hover:text-[var(--nb-text)]"
      aria-label={title}
    >
      {children}
    </button>
  )
}