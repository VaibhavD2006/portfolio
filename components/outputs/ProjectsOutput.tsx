'use client'
import { useState } from 'react'
import { ChevronDown, ChevronRight, ExternalLink, Zap } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { projects } from '@/data/projects'

const statusColors: Record<string, { bg: string; fg: string }> = {
  Shipped:   { bg: 'var(--nb-green-dim)', fg: 'var(--nb-green)' },
  Published: { bg: 'var(--nb-run-bg)',    fg: 'var(--nb-accent)' },
  Ongoing:   { bg: 'var(--nb-selected-bg)', fg: 'var(--nb-yellow)' },
  Research:  { bg: 'var(--nb-selected-bg)', fg: 'var(--nb-purple)' },
}

export function ProjectsOutput() {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <div className="space-y-2">
      {projects.map((project, i) => {
        const colors = statusColors[project.status]
        const isOpen = open === i

        return (
          <div
            key={i}
            className="rounded-lg overflow-hidden"
            style={{ border: `1px solid ${isOpen ? 'var(--nb-accent)' : 'var(--nb-border)'}` }}
          >
            {/* Header */}
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start gap-2 px-3 sm:px-4 py-3 text-left transition-colors"
              style={{
                background: isOpen ? 'var(--nb-selected-bg)' : 'transparent',
                borderLeft: isOpen ? '3px solid var(--nb-accent)' : '3px solid transparent',
              }}
            >
              <span className="mt-0.5 shrink-0">
                {isOpen
                  ? <ChevronDown size={13} style={{ color: 'var(--nb-accent)' }} />
                  : <ChevronRight size={13} style={{ color: 'var(--nb-muted)' }} />
                }
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-[13px] font-semibold" style={{ color: 'var(--nb-text)' }}>
                    {project.title}
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--nb-muted)' }}>
                    {project.org}
                  </span>
                </div>

                {/* Category tags — below title on mobile */}
                <div className="flex flex-wrap gap-1 mt-1 sm:hidden">
                  {project.category.map((c) => (
                    <span
                      key={c}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                      style={{
                        background: 'var(--nb-selected-bg)',
                        color: 'var(--nb-muted)',
                        border: '1px solid var(--nb-border)',
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Category tags — inline on desktop */}
                <div className="hidden sm:flex gap-1">
                  {project.category.map((c) => (
                    <span
                      key={c}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                      style={{
                        background: 'var(--nb-selected-bg)',
                        color: 'var(--nb-muted)',
                        border: '1px solid var(--nb-border)',
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap"
                  style={{ background: colors.bg, color: colors.fg }}
                >
                  {project.status}
                </span>

                {project.url && project.url !== '#' && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="transition-opacity hover:opacity-70 flex items-center gap-1 text-[11px]"
                    style={{ color: 'var(--nb-accent)' }}
                    aria-label={`Open ${project.urlLabel}`}
                  >
                    <ExternalLink size={11} />
                    <span className="hidden sm:inline">{project.urlLabel}</span>
                  </a>
                )}
              </div>
            </button>

            {/* Expanded body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduced ? {} : { height: 0, opacity: 0 }}
                  animate={reduced ? {} : { height: 'auto', opacity: 1 }}
                  exit={reduced ? {} : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    className="px-4 sm:px-6 py-4 space-y-4"
                    style={{ borderTop: '1px solid var(--nb-border)' }}
                  >
                    <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--nb-text)' }}>
                      {project.summary}
                    </p>

                    {/* Metrics — 1 col mobile, 3 col sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-lg p-3"
                          style={{
                            background: 'var(--nb-green-dim)',
                            border: '1px solid var(--nb-border)',
                          }}
                        >
                          <div className="text-[13px] font-bold" style={{ color: 'var(--nb-green)' }}>
                            {m.value}
                          </div>
                          <div className="text-[10px] mt-0.5" style={{ color: 'var(--nb-muted)' }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Hard part */}
                    <div
                      className="rounded p-3"
                      style={{
                        background: 'var(--nb-selected-bg)',
                        border: '1px solid var(--nb-border)',
                        borderLeft: '3px solid var(--nb-yellow)',
                      }}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--nb-yellow)' }}>
                        <Zap size={10} />
                        What was technically hard
                      </div>
                      <p className="text-[12px] leading-relaxed" style={{ color: 'var(--nb-text)' }}>
                        {project.hardPart}
                      </p>
                    </div>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded font-mono text-[10px]"
                          style={{
                            background: 'var(--nb-cell-bg)',
                            color: 'var(--nb-muted)',
                            border: '1px solid var(--nb-border)',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
