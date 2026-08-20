'use client'
import { useKnollStore } from '@/lib/knoll/store'

const statusColor: Record<string, string> = {
  success: '#4ade80',
  error: '#f87171',
  pending: '#60a5fa',
  blocked: '#fbbf24',
}

export function ActivityFeed() {
  const activityLog = useKnollStore(s => s.activityLog)
  const recent = activityLog.slice(0, 6)

  return (
    <div className="h-28 bg-black/95 border-t border-gray-800 flex flex-col flex-shrink-0">
      <div className="px-4 py-1 border-b border-gray-900 flex items-center gap-2 flex-shrink-0">
        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Activity Stream</span>
        <span className="ml-auto text-[10px] font-mono text-gray-700">{activityLog.length} events</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {recent.map(entry => (
          <div key={entry.id} className="flex items-baseline gap-3 px-4 py-0.5 hover:bg-gray-900/30">
            <span className="text-[10px] font-mono text-gray-700 flex-shrink-0 tabular-nums">
              {new Date(entry.timestamp).toLocaleTimeString('en-US', {
                hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
              })}
            </span>
            <span
              className="text-[10px] font-mono font-semibold flex-shrink-0 uppercase w-14 truncate"
              style={{ color: statusColor[entry.status] ?? '#9ca3af' }}
            >
              {entry.agentName}
            </span>
            <span className="text-[10px] text-gray-400 leading-relaxed truncate">
              {entry.action}{entry.target ? ` → ${entry.target}` : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
