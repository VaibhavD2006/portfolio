'use client'
import { Play } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CellGutter } from './CellGutter'
import { CodeInput } from './CodeInput'
import type { CellState } from '@/lib/types'

interface NotebookCellProps {
  index: number
  state: CellState
  code: string
  type?: 'code' | 'bash'
  onRun: () => void
  output: React.ReactNode
}

export function NotebookCell({ index, state, code, type = 'code', onRun, output }: NotebookCellProps) {
  const reduced = useReducedMotion()
  const isRunning = state === 'running'
  const isDone = state === 'done'

  return (
    <div
      className="flex gap-0 group relative"
      style={{
        borderLeft: isDone || isRunning
          ? '3px solid var(--nb-accent)'
          : '3px solid transparent',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Gutter */}
      <CellGutter state={state} index={index} />

      {/* Cell body */}
      <div className="flex-1 min-w-0 py-2 pr-2 sm:pr-4">
        {/* Input */}
        <div className="relative">
          <CodeInput code={code} type={type} />

          {/* Run button — always visible on touch, hover-only on desktop */}
          {state !== 'running' && (
            <button
              onClick={onRun}
              title="Run cell"
              className="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity w-6 h-6 flex items-center justify-center rounded"
              style={{
                background: 'var(--nb-run-bg)',
                color: 'var(--nb-accent)',
                border: '1px solid var(--nb-accent)',
              }}
              aria-label="Run cell"
            >
              <Play size={10} className="fill-current" />
            </button>
          )}
        </div>

        {/* Output area */}
        <AnimatePresence initial={false}>
          {isDone && (
            <motion.div
              initial={reduced ? {} : { height: 0, opacity: 0 }}
              animate={reduced ? {} : { height: 'auto', opacity: 1 }}
              exit={reduced ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div
                className="p-3 sm:p-4"
                style={{
                  background: 'var(--nb-output-bg)',
                  border: '1px solid var(--nb-border)',
                  borderTop: 'none',
                  borderRadius: '0 0 4px 4px',
                }}
              >
                {output}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Running shimmer bar */}
        <AnimatePresence>
          {isRunning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-1 h-0.5 rounded-full overflow-hidden"
              style={{ background: 'var(--nb-border)', width: '60%' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--nb-accent)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
