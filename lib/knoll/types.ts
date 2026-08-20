export type AgentClass = 'root' | 'persistent' | 'ephemeral' | 'child'
export type AgentStatus = 'active' | 'idle' | 'spawning' | 'terminated' | 'error'
export type ViewMode = 'overview' | 'expanded' | 'full'
export type SidebarSection = 'agents' | 'personas' | 'tools' | 'documents' | 'goals' | 'plans' | 'repos'

export interface ToolDef {
  id: string
  name: string
  type: 'api' | 'function' | 'memory' | 'llm' | 'io' | 'security' | 'payment' | 'webhook'
  description: string
  status: 'enabled' | 'disabled' | 'error'
  callCount: number
}

export interface ChildNodeDef {
  id: string
  parentId: string
  name: string
  role: string
  description: string
  status: AgentStatus
  capabilities: string[]
  tools: ToolDef[]
  memoryType: 'short' | 'long' | 'none'
}

export interface AgentDef {
  id: string
  name: string
  class: AgentClass
  role: string
  tagline: string
  description: string
  primaryColor: string
  glowColor: string
  borderColor: string
  status: AgentStatus
  uptime: string
  version: string
  children: ChildNodeDef[]
  tools: ToolDef[]
  capabilities: string[]
  connectedTo: string[]
}

export interface KnollFlowNodeData extends Record<string, unknown> {
  agentId: string
  label: string
  class: AgentClass
  status: AgentStatus
  primaryColor: string
  glowColor: string
  borderColor: string
  role: string
  tagline: string
  childCount: number
  toolCount: number
}

export interface ActivityEntry {
  id: string
  timestamp: string
  agentId: string
  agentName: string
  action: string
  target: string
  status: 'success' | 'error' | 'pending' | 'blocked'
  latencyMs: number
}

export interface PersonaDef {
  id: string
  name: string
  agentId: string
  traits: string[]
  voiceStyle: string
  contextRules: string[]
  active: boolean
}

export interface GoalDef {
  id: string
  title: string
  description: string
  status: 'active' | 'achieved' | 'blocked' | 'abandoned'
  priority: 'critical' | 'high' | 'medium' | 'low'
  agentIds: string[]
  progress: number
}

export interface PlanDef {
  id: string
  title: string
  description: string
  status: 'active' | 'completed' | 'paused' | 'cancelled'
  agentIds: string[]
  progress: number
  steps: { id: string; title: string; done: boolean; agentId?: string }[]
}

export interface DocumentDef {
  id: string
  title: string
  type: 'spec' | 'guide' | 'schema' | 'log' | 'artifact' | 'note'
  agentIds: string[]
  summary: string
  updatedAt: string
}

export interface RepoDef {
  id: string
  name: string
  url: string
  primaryAgent: string
  status: 'active' | 'archived' | 'consolidating'
  description: string
}
