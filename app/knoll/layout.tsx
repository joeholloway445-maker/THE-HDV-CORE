import type { Metadata } from 'next'
import '@xyflow/react/dist/style.css'

export const metadata: Metadata = {
  title: 'KNOLL — HDV Security Layer',
  description: 'Private backend security dashboard',
  robots: { index: false, follow: false },
}

export default function KnollLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {children}
    </div>
  )
}
