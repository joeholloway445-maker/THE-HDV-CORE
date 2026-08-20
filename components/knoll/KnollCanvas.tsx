'use client'
import { useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  type NodeTypes,
} from '@xyflow/react'
import { KnollRootNode } from './nodes/KnollRootNode'
import { AgentNode } from './nodes/AgentNode'
import { ChildNode } from './nodes/ChildNode'
import { buildNodes, buildEdges } from '@/lib/knoll/flow-builder'
import { useKnollStore } from '@/lib/knoll/store'

const nodeTypes: NodeTypes = {
  knollRoot: KnollRootNode,
  agent: AgentNode,
  childNode: ChildNode,
}

export function KnollCanvas() {
  const viewMode = useKnollStore(s => s.viewMode)
  const [nodes, setNodes, onNodesChange] = useNodesState(buildNodes(viewMode))
  const [edges, setEdges, onEdgesChange] = useEdgesState(buildEdges(viewMode))

  useEffect(() => {
    setNodes(buildNodes(viewMode))
    setEdges(buildEdges(viewMode))
  }, [viewMode, setNodes, setEdges])

  return (
    <div className="flex-1 h-full bg-[#050508]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.05}
        maxZoom={2}
        defaultEdgeOptions={{ style: { strokeWidth: 1.5 }, animated: false }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} color="#1a1a2e" gap={28} size={1} />
        <Controls />
        <MiniMap
          style={{ background: '#0a0a10', border: '1px solid #1f2937' }}
          nodeColor={(n) => {
            const d = n.data as Record<string, unknown>
            return (d.primaryColor as string) ?? '#374151'
          }}
          maskColor="rgba(0,0,0,0.65)"
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  )
}
