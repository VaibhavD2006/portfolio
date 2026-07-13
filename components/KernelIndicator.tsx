'use client'
import { motion } from 'framer-motion'

interface KernelIndicatorProps {
  busy: boolean
}

export function KernelIndicator({ busy }: KernelIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-[var(--nb-muted)] select-none">
      <span className="hidden sm:inline">Python 3</span>
      <span className="hidden sm:inline text-[var(--nb-border)]">|</span>
      <div className="flex items-center gap-1">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: busy ? 'var(--nb-kernel-busy)' : 'var(--nb-kernel-idle)' }}
          animate={busy ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
          transition={busy ? { repeat: Infinity, duration: 1, ease: 'easeInOut' } : {}}
        />
        <span style={{ color: busy ? 'var(--nb-kernel-busy)' : 'var(--nb-kernel-idle)' }}>
          {busy ? 'Busy' : 'Idle'}
        </span>
      </div>
    </div>
  )
}
