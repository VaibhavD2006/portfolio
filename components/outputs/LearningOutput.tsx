'use client'
import { useState } from 'react'
import { ChevronDown, ChevronRight, BookOpen, Lightbulb, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { learningItems, learningQuestions } from '@/data/learning'

export function LearningOutput() {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <div className="space-y-3">
      {/* Header with question chips */}
      <div className="mb-2">
        <p className="text-[11px] mb-2" style={{ color: 'var(--nb-muted)' }}>Try asking:</p>
        <div className="flex flex-wrap gap-1.5">
          {learningQuestions.map((q) => (
            <button
              key={q.label}
              onClick={() => {
                const section = parseInt(q.targetSection)
                const target = document.getElementById(`learning-section-${section}`)
                if (target) target.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-2 py-0.5 rounded text-[10px] font-medium transition-opacity hover:opacity-70"
              style={{
                background: 'var(--nb-selected-bg)',
                color: 'var(--nb-accent)',
                border: '1px solid var(--nb-border)',
              }}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Learning items as accordion */}
      <div id="learning-section-0">
        {learningItems.map((item, i) => {
          const isOpen = open === i

          return (
            <div
              key={i}
              className="rounded-lg"
              style={{ border: '1px solid var(--nb-border)' }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start gap-2 px-3 sm:px-4 py-3 text-left transition-colors"
                style={{
                  background: isOpen ? 'var(--nb-selected-bg)' : 'transparent',
                }}
              >
                <span className="mt-0.5 shrink-0">
                  {isOpen
                    ? <ChevronDown size={13} style={{ color: 'var(--nb-accent)' }} />
                    : <ChevronRight size={13} style={{ color: 'var(--nb-muted)' }} />
                  }
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <BookOpen size={13} style={{ color: 'var(--nb-accent)' }} />
                    <span className="text-[13px] font-semibold" style={{ color: 'var(--nb-text)' }}>
                      {item.title}
                    </span>
                    <span className="text-[11px]" style={{ color: 'var(--nb-muted)' }}>
                      {item.org}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px]" style={{ color: 'var(--nb-muted)' }}>
                    {item.category.join(' · ')}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{
                      background: i % 2 === 0 ? 'var(--nb-green-dim)' : 'var(--nb-selected-bg)',
                      color: i % 2 === 0 ? 'var(--nb-green)' : 'var(--nb-text)',
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </button>

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
                      id={`learning-section-${i + 1}`}
                      className="px-4 sm:px-6 py-4 space-y-3"
                      style={{ borderTop: '1px solid var(--nb-border)' }}
                    >
                      <p className="text-[12px] leading-relaxed" style={{ color: 'var(--nb-text)' }}>
                        {item.summary}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="rounded p-3"
                            style={{
                              background: 'var(--nb-selected-bg)',
                              border: '1px solid var(--nb-border)',
                            }}
                          >
                            <div className="text-[13px] font-bold" style={{ color: 'var(--nb-text)' }}>
                              {m.value}
                            </div>
                            <div className="text-[10px] mt-0.5" style={{ color: 'var(--nb-muted)' }}>
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div
                        className="rounded p-3"
                        style={{
                          background: 'var(--nb-selected-bg)',
                          border: '1px solid var(--nb-border)',
                          borderLeft: '3px solid var(--nb-purple)',
                        }}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] mb-1.5" style={{ color: 'var(--nb-purple)' }}>
                          <Lightbulb size={10} />
                          <span>Current challenge</span>
                        </div>
                        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--nb-text)' }}>
                          {item.hardPart}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {item.stack.map((s) => (
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
    </div>
  )
}