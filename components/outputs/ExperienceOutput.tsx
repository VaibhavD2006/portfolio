'use client'
import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { experience } from '@/data/experience'

export function ExperienceOutput() {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <div className="space-y-1.5">
      {experience.map((entry, i) => (
        <div
          key={i}
          className="rounded overflow-hidden"
          style={{ border: '1px solid var(--nb-border)' }}
        >
          {/* Header row */}
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start gap-2 px-3 sm:px-4 py-3 text-left transition-colors"
            style={{
              background: open === i ? 'var(--nb-selected-bg)' : 'transparent',
              borderLeft: open === i ? '3px solid var(--nb-accent)' : '3px solid transparent',
            }}
          >
            <span className="mt-0.5 shrink-0">
              {open === i
                ? <ChevronDown size={13} style={{ color: 'var(--nb-accent)' }} />
                : <ChevronRight size={13} style={{ color: 'var(--nb-muted)' }} />
              }
            </span>

            {/* Main info — stacks on mobile */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-[13px] font-semibold leading-snug" style={{ color: 'var(--nb-text)' }}>
                  {entry.org}
                </span>
                <span className="text-[11px]" style={{ color: 'var(--nb-accent)' }}>
                  {entry.role}
                </span>
              </div>
              {/* Date always visible below on mobile, inline on sm+ */}
              <div className="flex flex-wrap items-center gap-x-2 mt-0.5 text-[10px] sm:text-[11px] font-mono" style={{ color: 'var(--nb-muted)' }}>
                <span>{entry.dates}</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">{entry.location}</span>
              </div>
            </div>
          </button>

          {/* Expandable bullets */}
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={reduced ? {} : { height: 0, opacity: 0 }}
                animate={reduced ? {} : { height: 'auto', opacity: 1 }}
                exit={reduced ? {} : { height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{ overflow: 'hidden' }}
              >
                <ul
                  className="px-5 sm:px-8 py-3 space-y-2"
                  style={{ borderTop: '1px solid var(--nb-border)' }}
                >
                  {entry.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-2 text-[12px] sm:text-[12.5px] leading-relaxed" style={{ color: 'var(--nb-text)' }}>
                      <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: 'var(--nb-accent)' }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
