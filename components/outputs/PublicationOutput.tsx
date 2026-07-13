import { FileText, ExternalLink, Users } from 'lucide-react'
import { publications } from '@/data/publications'

export function PublicationOutput() {
  return (
    <div className="space-y-3">
      {publications.map((pub, i) => (
        <div
          key={i}
          className="rounded-lg p-4"
          style={{
            background: 'var(--nb-cell-bg)',
            border: '1px solid var(--nb-border)',
            borderLeft: '3px solid var(--nb-accent)',
          }}
        >
          {/* Header */}
          <div className="flex items-start gap-3">
            <div
              className="shrink-0 w-8 h-8 rounded flex items-center justify-center mt-0.5"
              style={{ background: 'var(--nb-green-dim)', color: 'var(--nb-green)' }}
            >
              <FileText size={14} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[15px] font-bold" style={{ color: 'var(--nb-text)' }}>
                  {pub.title}
                </h3>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                  style={{ background: 'var(--nb-accent)', color: 'var(--nb-toolbar)' }}
                >
                  {pub.venue} {pub.year}
                </span>
              </div>
              <p className="text-[12px] mt-0.5" style={{ color: 'var(--nb-accent)' }}>
                {pub.subtitle}
              </p>
            </div>
          </div>

          {/* Co-author */}
          <div className="flex items-center gap-1.5 mt-3 text-[11.5px]" style={{ color: 'var(--nb-muted)' }}>
            <Users size={11} />
            <span>Co-authored with <strong style={{ color: 'var(--nb-text)' }}>{pub.coAuthor}</strong> · {pub.coAuthorOrg}</span>
          </div>

          {/* Description */}
          <p className="mt-3 text-[12.5px] leading-relaxed" style={{ color: 'var(--nb-text)' }}>
            {pub.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {pub.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono"
                style={{
                  background: 'var(--nb-selected-bg)',
                  color: 'var(--nb-muted)',
                  border: '1px solid var(--nb-border)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link */}
          {pub.url && pub.url !== '#' && (
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-medium transition-opacity hover:opacity-70"
              style={{ color: 'var(--nb-accent)' }}
            >
              <ExternalLink size={11} />
              View Paper
            </a>
          )}
          {(!pub.url || pub.url === '#') && (
            <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] italic" style={{ color: 'var(--nb-muted)' }}>
              Paper link coming soon
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
