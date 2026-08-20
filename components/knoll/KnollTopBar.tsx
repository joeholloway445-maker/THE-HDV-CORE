'use client'
import { useKnollStore } from '@/lib/knoll/store'
import { AGENTS } from '@/lib/knoll/agents'
import type { ViewMode } from '@/lib/knoll/types'

const VIEW_MODES: ViewMode[] = ['overview', 'expanded', 'full']

export function KnollTopBar() {
  const viewMode = useKnollStore(s => s.viewMode)
  const setViewMode = useKnollStore(s => s.setViewMode)
  const toggleSidebar = useKnollStore(s => s.toggleSidebar)
  const sidebarOpen = useKnollStore(s => s.sidebarOpen)

  const activeCount = AGENTS.filter(a => a.status === 'active').length
  const totalCount = AGENTS.length

  return (
    <header className="h-11 bg-black/95 border-b border-gray-800 flex items-center px-4 gap-4 flex-shrink-0">
      <button
        onClick={toggleSidebar}
        className="text-gray-600 hover:text-gray-300 transition-colors text-sm w-5 flex-shrink-0"
        title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        ☰
      </button>

      <div className="flex items-center gap-1.5 font-mono text-xs">
        <span className="text-gray-700">HDV</span>
        <span className="text-gray-700">/</span>
        <span className="text-red-400 font-bold tracking-widest">KNOLL</span>
      </div>

      <div className="flex items-center gap-3 ml-1">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider">Security Layer</span>
        </div>
        <span className="text-[10px] font-mono text-gray-700">
          {activeCount}/{totalCount} online
        </span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1 bg-gray-950 border border-gray-800 rounded-lg p-0.5">
        {VIEW_MODES.map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all ${
              viewMode === mode
                ? 'bg-red-950 text-red-400 border border-red-900/60'
                : 'text-gray-600 hover:text-gray-400'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="text-[10px] font-mono text-gray-700 tabular-nums">
        {new Date().toLocaleTimeString('en-US', { hour12: false })}
      </div>
    </header>
  )
}
