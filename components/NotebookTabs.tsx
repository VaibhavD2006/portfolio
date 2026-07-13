'use client'
import { FileText, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  icon: React.ElementType
}

const tabs: Tab[] = [
  { id: 'portfolio', label: 'VaibhavLabs', icon: FileText },
  { id: 'learning', label: 'Learning', icon: BookOpen },
]

interface NotebookTabsProps {
  activeTab: 'portfolio' | 'learning'
  onTabChange: (tab: 'portfolio' | 'learning') => void
}

export function NotebookTabs({ activeTab, onTabChange }: NotebookTabsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as 'portfolio' | 'learning')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1 rounded transition-colors',
              'text-[11px] font-medium'
            )}
            style={{
              background: isActive ? 'var(--nb-accent)' : 'transparent',
              color: isActive ? 'var(--nb-toolbar)' : 'var(--nb-muted)',
              border: '1px solid var(--nb-border)',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={11} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}