'use client'
import { useState } from 'react'
import { useKnollStore } from '@/lib/knoll/store'
import { AGENTS } from '@/lib/knoll/agents'
import { PERSONAS, GOALS, PLANS, DOCUMENTS, REPOS } from '@/lib/knoll/content'

type SectionKey = 'agents' | 'goals' | 'personas' | 'plans' | 'documents' | 'repos'

function SectionHeader({
  title, count, open, onToggle,
}: {
  title: string; count: number; open: boolean; onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-900/50 transition-colors"
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">{title}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-mono text-gray-700">{count}</span>
        <span className="text-[10px] text-gray-700">{open ? '▲' : '▼'}</span>
      </div>
    </button>
  )
}

const priorityColor: Record<string, string> = {
  critical: '#ef4444', high: '#f59e0b', medium: '#06b6d4', low: '#6b7280',
}

const repoStatusColor: Record<string, string> = {
  active: '#22c55e', consolidating: '#f59e0b', archived: '#4b5563',
}

export function KnollSidebar() {
  const sidebarOpen = useKnollStore(s => s.sidebarOpen)
  const [open, setOpen] = useState<Record<SectionKey, boolean>>({
    agents: true, goals: true, personas: false, plans: false, documents: false, repos: false,
  })

  if (!sidebarOpen) return null

  const toggle = (k: SectionKey) => setOpen(prev => ({ ...prev, [k]: !prev[k] }))

  return (
    <aside className="w-60 h-full bg-black/95 border-r border-gray-800 flex flex-col overflow-hidden flex-shrink-0">
      <div className="px-4 py-2.5 border-b border-gray-800">
        <span className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">System Map</span>
      </div>

      <div className="flex-1 overflow-y-auto">

        <SectionHeader title="Agents" count={AGENTS.length} open={open.agents} onToggle={() => toggle('agents')} />
        {open.agents && (
          <div className="pb-2">
            {AGENTS.map(a => (
              <div key={a.id} className="flex items-start gap-2.5 px-4 py-2 hover:bg-gray-900/40 cursor-pointer">
                <div className="h-2 w-2 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: a.primaryColor }} />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white">{a.name}</div>
                  <div className="text-[10px] text-gray-600 truncate">{a.class} · {a.children.length} nodes</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-900" />

        <SectionHeader title="Goals" count={GOALS.length} open={open.goals} onToggle={() => toggle('goals')} />
        {open.goals && (
          <div className="pb-2">
            {GOALS.map(g => (
              <div key={g.id} className="px-4 py-2 hover:bg-gray-900/40 cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white line-clamp-1 flex-1 mr-1">{g.title}</span>
                  <span className="text-[10px] font-mono text-gray-500 flex-shrink-0">{g.progress}%</span>
                </div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${g.progress}%`, backgroundColor: priorityColor[g.priority] ?? '#06b6d4' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-900" />

        <SectionHeader title="Personas" count={PERSONAS.length} open={open.personas} onToggle={() => toggle('personas')} />
        {open.personas && (
          <div className="pb-2">
            {PERSONAS.map(p => (
              <div key={p.id} className="px-4 py-2 hover:bg-gray-900/40 cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full flex-shrink-0 ${p.active ? 'bg-green-500' : 'bg-gray-700'}`} />
                  <span className="text-xs text-white">{p.name}</span>
                </div>
                <div className="text-[10px] text-gray-600 mt-0.5 ml-4">{p.agentId} · {p.voiceStyle}</div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-900" />

        <SectionHeader title="Plans" count={PLANS.length} open={open.plans} onToggle={() => toggle('plans')} />
        {open.plans && (
          <div className="pb-2">
            {PLANS.map(p => (
              <div key={p.id} className="px-4 py-2 hover:bg-gray-900/40 cursor-pointer">
                <div className="text-xs text-white">{p.title}</div>
                <div className="text-[10px] text-gray-600 mt-0.5">{p.steps.length} steps · {p.status}</div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-900" />

        <SectionHeader title="Documents" count={DOCUMENTS.length} open={open.documents} onToggle={() => toggle('documents')} />
        {open.documents && (
          <div className="pb-2">
            {DOCUMENTS.map(d => (
              <div key={d.id} className="px-4 py-2 hover:bg-gray-900/40 cursor-pointer">
                <div className="text-xs text-white line-clamp-1">{d.title}</div>
                <div className="text-[10px] text-gray-600 mt-0.5">{d.type} · {d.updatedAt}</div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-900" />

        <SectionHeader title="Repos" count={REPOS.length} open={open.repos} onToggle={() => toggle('repos')} />
        {open.repos && (
          <div className="pb-2">
            {REPOS.map(r => (
              <div key={r.id} className="px-4 py-2 hover:bg-gray-900/40 cursor-pointer">
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: repoStatusColor[r.status] ?? '#6b7280' }}
                  />
                  <span className="text-xs text-white truncate">{r.name}</span>
                </div>
                <div className="text-[10px] text-gray-600 mt-0.5 ml-3">{r.status}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </aside>
  )
}
