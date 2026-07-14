'use client'
import { KernelIndicator } from './KernelIndicator'
import { ThemeToggle } from './ThemeToggle'

interface MenuBarProps {
  kernelBusy: boolean
  activeTab: 'portfolio' | 'learning'
  onTabChange: (tab: 'portfolio' | 'learning') => void
}

export function MenuBar({ kernelBusy, activeTab, onTabChange }: MenuBarProps) {
  return (
    <div
      className="flex items-center h-9 px-3 gap-2 border-b select-none shrink-0"
      style={{
        background: 'var(--nb-menu)',
        borderColor: 'var(--nb-border)',
      }}
    >
      {/* Software name - top left */}
      <button
        className="font-bold text-[13px] text-[var(--nb-text)] hover:text-[var(--nb-accent)] transition-colors"
        style={{ fontFamily: 'var(--font-jetbrains-mono), var(--font-sf-mono), monospace' }}
      >
        VaibhavLabs
      </button>

      {/* Menu items — hidden on mobile */}
      <div className="hidden md:flex items-center gap-0.5">
        {['File', 'Edit', 'View', 'Run', 'Kernel', 'Help'].map((item) => (
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