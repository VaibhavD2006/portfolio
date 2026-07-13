'use client'
import { motion } from 'framer-motion'
import type { CellState } from '@/lib/types'

interface CellGutterProps {
  state: CellState
  index: number
}

export function CellGutter({ state, index }: CellGutterProps) {
  return (
    <div
      className="shrink-0 w-10 sm:w-14 flex flex-col items-end pt-3 pr-1 sm:pr-2 text-[10px] sm:text-[11px] font-mono select-none"
      style={{ color: 'var(--nb-gutter)' }}
    >
      {state === 'running' ? (
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
        >
          [*]:
        </motion.span>
      ) : state === 'done' ? (
        <span>[{index}]:</span>
      ) : (
        <span>[ ]:</span>
      )}
    </div>
  )
}
