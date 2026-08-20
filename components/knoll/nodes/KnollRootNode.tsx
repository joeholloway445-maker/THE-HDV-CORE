'use client'
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { KnollFlowNodeData } from '@/lib/knoll/types'
import { useKnollStore } from '@/lib/knoll/store'

type KnollRootNodeType = Node<KnollFlowNodeData, 'knollRoot'>

export function KnollRootNode({ data, id }: NodeProps<KnollRootNodeType>) {
  const setSelectedNode = useKnollStore(s => s.setSelectedNode)
  const color = data.primaryColor as string

  return (
    <div
      onClick={() => setSelectedNode(id)}
      style={{ borderColor: color, boxShadow: `0 0 40px ${color}50` }}
      className="cursor-pointer rounded-2xl border-2 bg-black/95 px-8 py-5 min-w-[220px] text-center"
    >
      <div className="text-[10px] font-mono uppercase tracking-[0.25em] mb-1" style={{ color }}>
        Security Root
      </div>
      <div className="text-3xl font-black text-white tracking-tight">{data.label as string}</div>
      <div className="text-xs text-gray-500 mt-1 max-w-[180px] mx-auto italic">{data.tagline as string}</div>
      <div className="mt-3 flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color }}>
          {data.status as string}
        </span>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  )
}
