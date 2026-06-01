'use client'

import { useEffect, useRef } from 'react'

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let game: import('phaser').Game | null = null

    // Dynamic import keeps Phaser out of the SSR bundle
    import('phaser').then((Phaser) => {
      import('@/lib/game/PhaserGame').then(({ createGameConfig }) => {
        if (!containerRef.current) return
        game = new Phaser.Game(createGameConfig(containerRef.current))
      })
    })

    return () => {
      game?.destroy(true)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ minHeight: '100vh' }}
    />
  )
}
