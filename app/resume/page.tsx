import { FileText, ExternalLink, MapPin, Calendar } from 'lucide-react'
import { experience } from '@/data/experience'
import { publications } from '@/data/publications'
import { projects } from '@/data/projects'
import Link from 'next/link'

export const metadata = {
  title: 'Resume — Vaibhav R. Dandala',
}

export default function ResumePage() {
  return (
    <div
      className="min-h-dvh py-8 sm:py-12 px-4 sm:px-6"
      style={{ background: 'var(--nb-bg)', color: 'var(--nb-text)' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] mb-8 transition-opacity hover:opacity-70"
          style={{ color: 'var(--nb-accent)' }}
        >
          ← Back to notebook
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--nb-text)' }}>
            Vaibhav R. Dandala
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--nb-accent)' }}>
            ML Engineer · AI Researcher · Research Engineer
          </p>
          <div className="flex flex-wrap gap-3 mt-3 text-[12px]" style={{ color: 'var(--nb-muted)' }}>
            <span>vrdandala@ncsu.edu</span>
            <span>·</span>
            <span>(984) 244-8318</span>
            <span>·</span>
            <a href="https://github.com/VaibhavD2006" className="hover:underline" style={{ color: 'var(--nb-accent)' }}>github.com/VaibhavD2006</a>
            <span>·</span>
            <a href="https://linkedin.com/in/vaibhav-dandala" className="hover:underline" style={{ color: 'var(--nb-accent)' }}>linkedin.com/in/vaibhav-dandala</a>
          </div>
        </div>

        {/* Education */}
        <Section title="Education">
          <div className="rounded-lg p-4" style={{ border: '1px solid var(--nb-border)', background: 'var(--nb-cell-bg)' }}>
            <div className="flex justify-between flex-wrap gap-2">
              <div>
                <p className="font-semibold text-[13px]" style={{ color: 'var(--nb-text)' }}>North Carolina State University</p>
                <p className="text-[12px] mt-0.5" style={{ color: 'var(--nb-muted)' }}>B.S. Electrical Engineering & Computer Engineering (Dual Degree)</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--nb-muted)' }}>Concentrations: Machine Learning & AI · Computer Systems Software</p>
              </div>
              <div className="text-right text-[11px]" style={{ color: 'var(--nb-muted)' }}>
                <p>Raleigh, NC</p>
                <p>Expected Dec 2028</p>
                <p className="font-semibold mt-1" style={{ color: 'var(--nb-green)' }}>GPA: 3.80</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <div className="space-y-4">
            {experience.map((entry, i) => (
              <div key={i} className="rounded-lg p-4" style={{ border: '1px solid var(--nb-border)', background: 'var(--nb-cell-bg)' }}>
                <div className="flex justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-[13px]" style={{ color: 'var(--nb-text)' }}>{entry.org}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: 'var(--nb-accent)' }}>{entry.role}</p>
                  </div>
                  <div className="text-right text-[11px]" style={{ color: 'var(--nb-muted)' }}>
                    <p className="flex items-center gap-1 justify-end"><MapPin size={10} />{entry.location}</p>
                    <p className="flex items-center gap-1 justify-end mt-0.5"><Calendar size={10} />{entry.dates}</p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {entry.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-[12px] leading-relaxed" style={{ color: 'var(--nb-text)' }}>
                      <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: 'var(--nb-accent)' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Publications */}
        <Section title="Publications">
          {publications.map((pub, i) => (
            <div key={i} className="rounded-lg p-4" style={{ border: '1px solid var(--nb-border)', background: 'var(--nb-cell-bg)', borderLeft: '3px solid var(--nb-accent)' }}>
              <p className="font-bold text-[13px]" style={{ color: 'var(--nb-text)' }}>{pub.title} — {pub.subtitle}</p>
              <p className="text-[11px] mt-1" style={{ color: 'var(--nb-muted)' }}>
                {pub.venue} {pub.year} · Co-authored with {pub.coAuthor}, {pub.coAuthorOrg}
              </p>
            </div>
          ))}
        </Section>

        {/* Projects */}
        <Section title="Projects">
          <div className="space-y-4">
            {projects.map((p, i) => (
              <div key={i} className="rounded-lg p-4" style={{ border: '1px solid var(--nb-border)', background: 'var(--nb-cell-bg)' }}>
                <div className="flex justify-between flex-wrap gap-2">
                  <p className="font-semibold text-[13px]" style={{ color: 'var(--nb-text)' }}>
                    {p.title}
                    {p.url && p.url !== '#' && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center gap-0.5 text-[11px]" style={{ color: 'var(--nb-accent)' }}>
                        <ExternalLink size={10} />{p.urlLabel}
                      </a>
                    )}
                  </p>
                  <span className="text-[11px]" style={{ color: 'var(--nb-muted)' }}>{p.category.join(' · ')}</span>
                </div>
                <p className="text-[12px] mt-2 leading-relaxed" style={{ color: 'var(--nb-text)' }}>{p.summary}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.stack.slice(0, 6).map((s) => (
                    <span key={s} className="px-1.5 py-0.5 rounded font-mono text-[10px]" style={{ background: 'var(--nb-selected-bg)', color: 'var(--nb-muted)', border: '1px solid var(--nb-border)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills & Tools">
          <div className="rounded-lg p-4 space-y-3" style={{ border: '1px solid var(--nb-border)', background: 'var(--nb-cell-bg)' }}>
            {[
              { label: 'ML/AI', items: ['PyTorch', 'CNNs', 'YOLOv8', 'MedSAM3', 'Computer Vision', 'MCP', 'Quantization', 'Model Fine-tuning'] },
              { label: 'LLM & RAG', items: ['LangChain', 'Agentic Self-Loop Orchestration', 'Hybrid BM25 + Dense Retrieval', 'OpenAI', 'Gemini', 'PineconeDB', 'pgvector'] },
              { label: 'Systems & Dev', items: ['Python', 'JavaScript', 'FastAPI', 'Next.js', 'Docker', 'AWS', 'Supabase', 'MongoDB', 'PostgreSQL', 'Git', 'CI/CD'] },
            ].map(({ label, items }) => (
              <div key={label}>
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--nb-muted)' }}>{label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span key={item} className="px-2 py-0.5 rounded font-mono text-[11px]" style={{ background: 'var(--nb-selected-bg)', color: 'var(--nb-text)', border: '1px solid var(--nb-border)' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Download */}
        <div className="mt-6 flex gap-3">
          <a
            href="/VaibhavMLResumeOfficial.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-opacity hover:opacity-80"
            style={{ background: 'var(--nb-accent)', color: 'var(--nb-toolbar)' }}
          >
            <FileText size={13} />
            Download PDF
          </a>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-opacity hover:opacity-80"
            style={{ border: '1px solid var(--nb-border)', color: 'var(--nb-text)' }}
          >
            ← Notebook
          </Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--nb-muted)' }}>
          {title}
        </h2>
        <div className="flex-1 h-px" style={{ background: 'var(--nb-border)' }} />
      </div>
      {children}
    </div>
  )
}
