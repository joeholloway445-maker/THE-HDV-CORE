'use client'
import { KnollTopBar } from './KnollTopBar'
import { KnollSidebar } from './KnollSidebar'
import { KnollCanvas } from './KnollCanvas'
import { InspectorPanel } from './InspectorPanel'
import { ActivityFeed } from './ActivityFeed'

export function KnollDashboard() {
  return (
    <div className="h-full w-full flex flex-col bg-black">
      <KnollTopBar />
      <div className="flex-1 flex overflow-hidden">
        <KnollSidebar />
        <div className="flex-1 flex overflow-hidden">
          <KnollCanvas />
          <InspectorPanel />
        </div>
      </div>
      <ActivityFeed />
    </div>
  )
}
