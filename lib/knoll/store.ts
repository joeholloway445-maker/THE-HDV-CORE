'use client'

import { create } from 'zustand'
import type { ViewMode, SidebarSection, ActivityEntry } from './types'

const MOCK_ACTIVITY: ActivityEntry[] = [
  { id: 'a1', timestamp: new Date(Date.now() - 2000).toISOString(), agentId: 'knoll', agentName: 'KNOLL', action: 'JWT validated', target: 'session:usr_8821', status: 'success', latencyMs: 4 },
  { id: 'a2', timestamp: new Date(Date.now() - 8000).toISOString(), agentId: 'hope', agentName: 'HOPE', action: 'Intent parsed', target: 'task:navigate_to_builder', status: 'success', latencyMs: 312 },
  { id: 'a3', timestamp: new Date(Date.now() - 15000).toISOString(), agentId: 'apex', agentName: 'APEX', action: 'Route resolved', target: 'agent:hope', status: 'success', latencyMs: 18 },
  { id: 'a4', timestamp: new Date(Date.now() - 31000).toISOString(), agentId: 'knoll', agentName: 'KNOLL', action: 'Permission granted', target: 'resource:profile', status: 'success', latencyMs: 6 },
  { id: 'a5', timestamp: new Date(Date.now() - 62000).toISOString(), agentId: 'apex', agentName: 'APEX', action: 'Token budget check', target: 'budget:daily_llm', status: 'success', latencyMs: 2 },
  { id: 'a6', timestamp: new Date(Date.now() - 120000).toISOString(), agentId: 'knoll', agentName: 'KNOLL', action: 'Threat scan', target: 'request:ip_104.21.x', status: 'success', latencyMs: 11 },
  { id: 'a7', timestamp: new Date(Date.now() - 180000).toISOString(), agentId: 'vision', agentName: 'VISION', action: 'Spawn requested', target: 'task:webhook_dispatch', status: 'pending', latencyMs: 0 },
  { id: 'a8', timestamp: new Date(Date.now() - 240000).toISOString(), agentId: 'dream', agentName: 'DREAM', action: 'Spawn requested', target: 'task:world_gen_seed_4421', status: 'success', latencyMs: 1840 },
  { id: 'a9', timestamp: new Date(Date.now() - 300000).toISOString(), agentId: 'knoll', agentName: 'KNOLL', action: 'Session expired', target: 'session:usr_7190', status: 'success', latencyMs: 3 },
  { id: 'a10', timestamp: new Date(Date.now() - 420000).toISOString(), agentId: 'apex', agentName: 'APEX', action: 'API rate limit hit', target: 'api:anthropic', status: 'error', latencyMs: 0 },
]

interface KnollStore {
  viewMode: ViewMode
  selectedNodeId: string | null
  activeSidebarSection: SidebarSection
  sidebarOpen: boolean
  inspectorOpen: boolean
  activityLog: ActivityEntry[]
  setViewMode: (mode: ViewMode) => void
  setSelectedNode: (id: string | null) => void
  setActiveSidebarSection: (section: SidebarSection) => void
  toggleSidebar: () => void
  closeInspector: () => void
  addActivity: (entry: ActivityEntry) => void
}

export const useKnollStore = create<KnollStore>((set) => ({
  viewMode: 'overview',
  selectedNodeId: null,
  activeSidebarSection: 'agents',
  sidebarOpen: true,
  inspectorOpen: false,
  activityLog: MOCK_ACTIVITY,

  setViewMode: (mode) => set({ viewMode: mode }),
  setSelectedNode: (id) => set({ selectedNodeId: id, inspectorOpen: id !== null }),
  setActiveSidebarSection: (section) => set({ activeSidebarSection: section }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  closeInspector: () => set({ selectedNodeId: null, inspectorOpen: false }),
  addActivity: (entry) => set((s) => ({ activityLog: [entry, ...s.activityLog].slice(0, 100) })),
}))
