'use client'
import { FileCode, ChevronRight, Folder } from 'lucide-react'

export function FileBrowser() {
  return (
    <div
      className="hidden md:flex flex-col w-48 shrink-0 border-r text-[12px] select-none"
      style={{
        background: 'var(--nb-sidebar)',
        borderColor: 'var(--nb-border)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-1 px-3 py-2 font-medium text-[11px] uppercase tracking-wider border-b"
        style={{ color: 'var(--nb-muted)', borderColor: 'var(--nb-border)' }}
      >
        File Browser
      </div>

      {/* Tree */}
      <div className="px-2 py-2 space-y-0.5">
        <div className="flex items-center gap-1 px-1 py-0.5 text-[var(--nb-muted)]">
          <ChevronRight size={11} />
          <Folder size={12} />
          <span>/home/vaibhav</span>
        </div>

        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer"
          style={{ background: 'var(--nb-selected-bg)', color: 'var(--nb-accent)' }}
        >
          <FileCode size={12} />
          <span className="truncate">vaibhav_dandala.ipynb</span>
        </div>
      </div>

      {/* Status bar */}
      <div
        className="mt-auto px-3 py-1.5 border-t text-[10px]"
        style={{ color: 'var(--nb-muted)', borderColor: 'var(--nb-border)' }}
      >
        1 item selected
      </div>
    </div>
  )
}
