'use client'
import { FileText, BookOpen, ChevronRight } from 'lucide-react'

interface FileBrowserProps {
  activeTab: 'portfolio' | 'learning'
}

export function FileBrowser({ activeTab }: FileBrowserProps) {
  const files = [
    {
      name: 'VaibhavLabs.ipynb',
      type: 'notebook' as const,
      icon: FileText,
      active: activeTab === 'portfolio',
    },
    {
      name: 'learning.ipynb',
      type: 'notebook' as const,
      icon: BookOpen,
      active: activeTab === 'learning',
    },
  ]

  return (
    <div
      className="hidden md:flex flex-col w-48 shrink-0"
      style={{
        background: 'var(--nb-sidebar)',
        borderRight: '1px solid var(--nb-border)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium text-[var(--nb-muted)] uppercase tracking-wider border-b"
        style={{ borderColor: 'var(--nb-border)' }}
      >
        Files
      </div>

      {/* Tree */}
      <div className="px-2 py-2 space-y-0.5">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
            style={{
              background: file.active ? 'var(--nb-selected-bg)' : 'transparent',
              color: file.active ? 'var(--nb-accent)' : 'var(--nb-muted)',
            }}
          >
            <ChevronRight size={10} />
            <file.icon size={12} />
            <span className="text-[12px] truncate">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}