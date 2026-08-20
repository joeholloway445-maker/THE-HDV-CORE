'use client'
import { useKnollStore } from '@/lib/knoll/store'
import { getAgent, getChildNode, AGENTS } from '@/lib/knoll/agents'

export function InspectorPanel() {
  const selectedNodeId = useKnollStore(s => s.selectedNodeId)
  const inspectorOpen = useKnollStore(s => s.inspectorOpen)
  const closeInspector = useKnollStore(s => s.closeInspector)

  if (!inspectorOpen || !selectedNodeId) return null

  const agent = getAgent(selectedNodeId)
  const child = !agent ? getChildNode(selectedNodeId) : null

  if (!agent && !child) return null

  return (
    <aside className="w-80 h-full bg-black/95 border-l border-gray-800 flex flex-col overflow-hidden flex-shrink-0">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Inspector</span>
        <button
          onClick={closeInspector}
          className="text-gray-700 hover:text-white transition-colors text-base leading-none"
        >
          ✕
        </button>
      </div>

      {agent && (
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <div>
            <div
              className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1"
              style={{ color: agent.primaryColor }}
            >
              {agent.agentClass} · {agent.status}
            </div>
            <div className="text-xl font-bold text-white">{agent.name}</div>
            <div className="text-sm text-gray-400 mt-1.5 leading-relaxed">{agent.description}</div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-2">Capabilities</div>
            <div className="flex flex-wrap gap-1.5">
              {agent.capabilities.map(c => (
                <span
                  key={c}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-900 border border-gray-800 text-gray-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-2">
              Tools ({agent.tools.length})
            </div>
            <div className="space-y-1.5">
              {agent.tools.map(t => (
                <div key={t.id} className="px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-800">
                  <div className="text-xs font-semibold text-white">{t.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{t.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-2">
              Child Nodes ({agent.children.length})
            </div>
            <div className="space-y-1">
              {agent.children.map(c => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/40 border border-gray-800"
                >
                  <div
                    className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: agent.primaryColor }}
                  />
                  <span className="text-xs text-gray-300 flex-1">{c.name}</span>
                  <span className="text-[10px] text-gray-600 font-mono">{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {child && (() => {
        const parentAgent = AGENTS.find(a => a.id === child.parentId)
        const color = parentAgent?.primaryColor ?? '#6b7280'
        return (
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            <div>
              <div
                className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1"
                style={{ color }}
              >
                {child.role} · {child.status}
              </div>
              <div className="text-xl font-bold text-white">{child.name}</div>
              <div className="text-sm text-gray-400 mt-1.5 leading-relaxed">{child.description}</div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">Memory Type</div>
              <span className="text-xs font-mono" style={{ color }}>{child.memoryType}</span>
            </div>

            <div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-2">Capabilities</div>
              <div className="flex flex-wrap gap-1.5">
                {child.capabilities.map(c => (
                  <span
                    key={c}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-900 border border-gray-800 text-gray-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-2">
                Tools ({child.tools.length})
              </div>
              <div className="space-y-1.5">
                {child.tools.map(t => (
                  <div key={t.id} className="px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-800">
                    <div className="text-xs font-semibold text-white">{t.name}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{t.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {parentAgent && (
              <div>
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">Parent Agent</div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs text-gray-300">{parentAgent.name}</span>
                </div>
              </div>
            )}
          </div>
        )
      })()}
    </aside>
  )
}
