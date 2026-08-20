'use client'
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { KnollFlowNodeData } from '@/lib/knoll/types'
import { useKnollStore } from '@/lib/knoll/store'

type AgentNodeType = Node<KnollFlowNodeData, 'agent'>

const statusColor: Record<string, string> = {
  active: '#22c55e',
  idle: '#eab308',
  spawning: '#3b82f6',
  terminated: '#6b7280',
  error: '#ef4444',
}

export function AgentNode({ data, id }: NodeProps<AgentNodeType>) {
  const setSelectedNode = useKnollStore(s => s.setSelectedNode)
  const color = data.primaryColor as string
  const status = data.status as string
  const agentClass = data.class as string
  const toolCount = (data.toolCount as number) ?? 0
  const childCount = (data.childCount as number) ?? 0

  return (
    <div
      onClick={() => setSelectedNode(id)}
      style={{ borderColor: color, boxShadow: `0 0 24px ${color}35` }}
      className="cursor-pointer rounded-xl border-2 bg-black/90 px-5 py-4 min-w-[190px] text-center hover:brightness-110 transition-all"
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color }}>
        {agentClass}
      </div>
      <div className="text-2xl font-bold text-white">{data.label as string}</div>
      <div className="text-[11px] text-gray-400 mt-1 max-w-[170px] mx-auto line-clamp-2 leading-relaxed italic">
        {data.tagline as string}
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-gray-600">
        <span>{toolCount} tools</span>
        <div className="flex items-center gap-1">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: statusColor[status] ?? '#6b7280',
              boxShadow: `0 0 5px ${statusColor[status] ?? '#6b7280'}`,
            }}
          />
          <span style={{ color: statusColor[status] ?? '#6b7280' }}>{status}</span>
        </div>
        <span>{childCount} nodes</span>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  )
}
