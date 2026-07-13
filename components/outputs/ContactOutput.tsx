'use client'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const lines = [
  { prefix: '$ ', text: 'echo "=== Contact Vaibhav ==="', type: 'cmd' },
  { prefix: '',   text: '=== Contact Vaibhav ===',         type: 'out' },
  { prefix: '$ ', text: 'cat contact.txt',                 type: 'cmd' },
  { prefix: '',   text: '',                                 type: 'blank' },
  { prefix: '',   text: 'Email    : vrdandala@ncsu.edu',   type: 'out' },
  { prefix: '',   text: 'GitHub   : github.com/VaibhavD2006',  type: 'out' },
  { prefix: '',   text: 'LinkedIn : linkedin.com/in/vaibhav-dandala', type: 'out' },
  { prefix: '',   text: 'Phone    : (984) 244-8318',       type: 'out' },
  { prefix: '',   text: '',                                 type: 'blank' },
  { prefix: '$ ', text: '▋',                               type: 'cursor' },
]

interface RenderedLine {
  prefix: string
  text: string
  type: string
  done: boolean
}

export function ContactOutput() {
  const [rendered, setRendered] = useState<RenderedLine[]>([])
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setRendered(lines.map((l) => ({ ...l, done: true })))
      return
    }

    let cancelled = false
    const full: RenderedLine[] = []

    async function run() {
      for (const line of lines) {
        if (cancelled) return
        if (line.type === 'blank' || line.type === 'cursor') {
          full.push({ ...line, done: true })
          setRendered([...full])
          await delay(80)
          continue
        }

        // Type out each character
        let typed = ''
        full.push({ ...line, text: '', done: false })
        const idx = full.length - 1
        for (const char of line.prefix + line.text) {
          if (cancelled) return
          typed += char
          full[idx] = { ...line, text: typed.slice(line.prefix.length), done: false }
          setRendered([...full])
          await delay(line.type === 'cmd' ? 28 : 12)
        }
        full[idx] = { ...line, done: true }
        setRendered([...full])
        await delay(line.type === 'cmd' ? 120 : 40)
      }
    }

    run()
    return () => { cancelled = true }
  }, [reduced])

  return (
    <div
      className="rounded font-mono text-[12.5px] leading-[1.8] p-4 overflow-x-auto"
      style={{
        background: 'var(--nb-toolbar)',
        border: '1px solid var(--nb-border)',
        color: 'var(--nb-green)',
      }}
    >
      {rendered.map((line, i) => (
        <div key={i}>
          {line.type === 'blank' ? (
            <span>&nbsp;</span>
          ) : line.type === 'cursor' ? (
            <span style={{ color: 'var(--nb-accent)' }}>
              {line.prefix}
              <span className="animate-pulse">▋</span>
            </span>
          ) : line.type === 'cmd' ? (
            <span>
              <span style={{ color: 'var(--nb-accent)' }}>{line.prefix}</span>
              <span style={{ color: 'var(--nb-text)' }}>{line.text}</span>
            </span>
          ) : (
            <span>
              {line.text.includes(':') ? (
                <>
                  <span style={{ color: 'var(--nb-muted)' }}>{line.text.split(':')[0]}:</span>
                  <span style={{ color: 'var(--nb-green)' }}>{line.text.slice(line.text.indexOf(':') + 1)}</span>
                </>
              ) : (
                <span style={{ color: 'var(--nb-yellow)' }}>{line.text}</span>
              )}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
