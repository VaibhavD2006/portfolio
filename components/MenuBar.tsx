'use client'
import { KernelIndicator } from './KernelIndicator'
import { ThemeToggle } from './ThemeToggle'

const menuItems = ['File', 'Edit', 'View', 'Run', 'Kernel', 'Help']

interface MenuBarProps {
  kernelBusy: boolean
}

export function MenuBar({ kernelBusy }: MenuBarProps) {
  return (
    <div
      className="flex items-center h-9 px-3 gap-1 border-b select-none shrink-0"
      style={{
        background: 'var(--nb-menu)',
        borderColor: 'var(--nb-border)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-1.5 mr-3">
        <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold"
          style={{ background: 'var(--nb-accent)', color: 'var(--nb-toolbar)' }}>
          J
        </div>
        <span className="hidden sm:inline text-[12px] font-medium text-[var(--nb-text)]">
          JupyterLab
        </span>
      </div>

      {/* Menu items — hidden on mobile */}
      <div className="hidden md:flex items-center gap-0.5">
        {menuItems.map((item) => (
          <button
            key={item}
            className="px-2 py-1 text-[12px] text-[var(--nb-muted)] hover:text-[var(--nb-text)] hover:bg-[var(--nb-border)] rounded transition-colors"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Right side: kernel + theme toggle */}
      <div className="flex items-center gap-2">
        <KernelIndicator busy={kernelBusy} />
        <ThemeToggle />
      </div>
    </div>
  )
}
