'use client'
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { KnollFlowNodeData } from '@/lib/knoll/types'
import { useKnollStore } from '@/lib/knoll/store'

type ChildNodeType = Node<KnollFlowNodeData, 'childNode'>

const statusDot: Record<string, string> = {
  active: '#22c55e',
  idle: '#eab308',
  error: '#ef4444',
  processing: '#3b82f6',
}

export function ChildNode({ data, id }: NodeProps<ChildNodeType>) {
  const setSelectedNode = useKnollStore(s => s.setSelectedNode)
  const color = data.primaryColor as string

  return (
    <div
      onClick={() => setSelectedNode(id)}
      style={{ borderColor: `${color}50` }}
      className="cursor-pointer rounded-lg border bg-black/85 px-3 py-2 min-w-[140px] text-center hover:brightness-125 transition-all"
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div className="text-[11px] font-semibold text-white truncate">{data.label as string}</div>
      <div className="text-[10px] mt-0.5 truncate" style={{ color: `${color}90` }}>
        {data.role as string}
      </div>
      <div className="mt-1.5 flex items-center justify-center gap-1">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: statusDot[data.status as string] ?? '#6b7280' }}
        />
        <span className="text-[9px] font-mono text-gray-600">{data.status as string}</span>
      </div>
    </div>
  )
}
