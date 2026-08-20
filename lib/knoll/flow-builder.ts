import type { Node, Edge } from '@xyflow/react'
import { MarkerType } from '@xyflow/react'
import { AGENTS } from './agents'
import type { KnollFlowNodeData, ViewMode } from './types'

const AGENT_POS: Record<string, { x: number; y: number }> = {
  knoll:  { x: 750,  y: 20  },
  hope:   { x: 100,  y: 480 },
  apex:   { x: 1400, y: 480 },
  dream:  { x: -650, y: 480 },
  vision: { x: 2050, y: 480 },
}

const KNOLL_CHILD_POS: Record<string, { x: number; y: number }> = {
  'knoll-vault-keeper':        { x: 90,   y: 260 },
  'knoll-auth-guard':          { x: 285,  y: 260 },
  'knoll-session-validator':   { x: 480,  y: 260 },
  'knoll-permission-matrix':   { x: 675,  y: 260 },
  'knoll-threat-detector':     { x: 870,  y: 260 },
  'knoll-audit-trail':         { x: 1065, y: 260 },
  'knoll-access-log':          { x: 1260, y: 260 },
}

const HOPE_CHILD_POS: Record<string, { x: number; y: number }> = {
  'hope-intent-parser':        { x: -130, y: 730 },
  'hope-persona-manager':      { x: 70,   y: 730 },
  'hope-ui-renderer':          { x: 270,  y: 730 },
  'hope-conversation-buffer':  { x: 470,  y: 730 },
  'hope-context-weaver':       { x: -130, y: 880 },
  'hope-emotion-engine':       { x: 70,   y: 880 },
  'hope-narrative-voice':      { x: 270,  y: 880 },
}

const APEX_CHILD_POS: Record<string, { x: number; y: number }> = {
  'apex-task-router':          { x: 1250, y: 730 },
  'apex-agent-spawner':        { x: 1450, y: 730 },
  'apex-tool-registry':        { x: 1650, y: 730 },
  'apex-memory-core':          { x: 1850, y: 730 },
  'apex-security-gate':        { x: 1250, y: 880 },
  'apex-api-bridge':           { x: 1450, y: 880 },
  'apex-resource-allocator':   { x: 1650, y: 880 },
}

const DREAM_CHILD_POS: Record<string, { x: number; y: number }> = {
  'dream-world-builder':       { x: -1050, y: 730 },
  'dream-scene-composer':      { x: -850,  y: 730 },
  'dream-entity-generator':    { x: -650,  y: 730 },
  'dream-physics-simulator':   { x: -450,  y: 730 },
  'dream-chaos-seed':          { x: -1050, y: 880 },
  'dream-narrative-forge':     { x: -850,  y: 880 },
  'dream-asset-synthesizer':   { x: -650,  y: 880 },
}

const VISION_CHILD_POS: Record<string, { x: number; y: number }> = {
  'vision-task-executor':      { x: 1950, y: 730 },
  'vision-payment-processor':  { x: 2150, y: 730 },
  'vision-automation-runner':  { x: 2350, y: 730 },
  'vision-webhook-manager':    { x: 2550, y: 730 },
  'vision-scheduler-daemon':   { x: 1950, y: 880 },
  'vision-output-streamer':    { x: 2150, y: 880 },
  'vision-audit-logger':       { x: 2350, y: 880 },
}

const ALL_CHILD_POS = {
  ...KNOLL_CHILD_POS,
  ...HOPE_CHILD_POS,
  ...APEX_CHILD_POS,
  ...DREAM_CHILD_POS,
  ...VISION_CHILD_POS,
}

function agentToNode(agent: typeof AGENTS[0]): Node<KnollFlowNodeData> {
  return {
    id: agent.id,
    type: agent.class === 'root' ? 'knollRoot' : 'agent',
    position: AGENT_POS[agent.id],
    data: {
      agentId: agent.id,
      label: agent.name,
      class: agent.class,
      status: agent.status,
      primaryColor: agent.primaryColor,
      glowColor: agent.glowColor,
      borderColor: agent.borderColor,
      role: agent.role,
      tagline: agent.tagline,
      childCount: agent.children.length,
      toolCount: agent.tools.length,
    },
  }
}

function childToNode(child: typeof AGENTS[0]['children'][0], agent: typeof AGENTS[0]): Node<KnollFlowNodeData> {
  return {
    id: child.id,
    type: 'childNode',
    position: ALL_CHILD_POS[child.id] ?? { x: 0, y: 0 },
    data: {
      agentId: child.id,
      label: child.name,
      class: 'child',
      status: child.status,
      primaryColor: agent.primaryColor,
      glowColor: agent.glowColor,
      borderColor: agent.borderColor,
      role: child.role,
      tagline: child.description.slice(0, 60) + '…',
      childCount: 0,
      toolCount: child.tools.length,
    },
  }
}

function makeEdge(source: string, target: string, color: string, animated = true, dashed = false): Edge {
  return {
    id: `${source}->${target}`,
    source,
    target,
    animated,
    style: {
      stroke: color,
      strokeWidth: dashed ? 1.5 : 2,
      strokeDasharray: dashed ? '6 4' : undefined,
    },
    markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
  }
}

export function buildNodes(viewMode: ViewMode): Node<KnollFlowNodeData>[] {
  const nodes: Node<KnollFlowNodeData>[] = AGENTS.map(agentToNode)

  if (viewMode === 'overview') return nodes

  for (const agent of AGENTS) {
    for (const child of agent.children) {
      nodes.push(childToNode(child, agent))
    }
  }

  return nodes
}

export function buildEdges(viewMode: ViewMode): Edge[] {
  const edges: Edge[] = [
    makeEdge('knoll', 'hope',   '#8b5cf6'),
    makeEdge('knoll', 'apex',   '#06b6d4'),
    makeEdge('knoll', 'dream',  '#d946ef', true, true),
    makeEdge('knoll', 'vision', '#f59e0b', true, true),
    makeEdge('hope',  'apex',   '#a78bfa'),
    makeEdge('apex',  'dream',  '#d946ef', true, true),
    makeEdge('apex',  'vision', '#f59e0b', true, true),
  ]

  if (viewMode === 'overview') return edges

  for (const agent of AGENTS) {
    for (const child of agent.children) {
      edges.push(makeEdge(agent.id, child.id, agent.primaryColor, false))
    }
  }

  return edges
}
