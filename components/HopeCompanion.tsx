'use client'

import { useState } from 'react'
import type { HopeMessage } from '@/types/game'

export default function HopeCompanion() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<HopeMessage[]>([
    {
      role: 'hope',
      content: "Hello. I'm HOPE — your constant companion across every realm. Ask me anything.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)

  async function send() {
    const text = input.trim()
    if (!text || thinking) return

    setMessages((m) => [...m, { role: 'player', content: text, timestamp: new Date() }])
    setInput('')
    setThinking(true)

    // HOPE AI integration point — wire to Claude API in a future sprint
    await new Promise((r) => setTimeout(r, 800))
    setMessages((m) => [
      ...m,
      {
        role: 'hope',
        content: "I'm processing your request. My full intelligence will be online soon.",
        timestamp: new Date(),
      },
    ])
    setThinking(false)
  }

  return (
    <>
      {/* Floating HOPE button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-purple-700 border-2 border-purple-400 flex items-center justify-center text-white text-xl shadow-lg shadow-purple-900/60 hover:bg-purple-600 transition-colors"
        title="HOPE Companion"
      >
        ✦
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-xl border border-purple-700 bg-[#0f0f1a]/95 backdrop-blur-md flex flex-col shadow-2xl shadow-purple-950/60 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-purple-900">
            <span className="text-purple-400 text-lg">✦</span>
            <span className="font-mono text-sm text-purple-300 tracking-widest">HOPE</span>
            <span className="ml-auto text-xs text-purple-600 font-mono">AUTHORITY LAYER</span>
          </div>

          {/* Messages */}
          <div className="flex-1 max-h-72 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'player' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-xs font-mono leading-relaxed ${
                    msg.role === 'hope'
                      ? 'bg-purple-950 border border-purple-800 text-purple-200'
                      : 'bg-indigo-950 border border-indigo-700 text-indigo-200'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="bg-purple-950 border border-purple-800 rounded-lg px-3 py-2 text-xs font-mono text-purple-400 animate-pulse">
                  HOPE is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex border-t border-purple-900 p-2 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask HOPE..."
              className="flex-1 bg-transparent text-xs font-mono text-purple-200 placeholder-purple-700 outline-none px-2"
            />
            <button
              onClick={send}
              disabled={thinking}
              className="text-xs font-mono text-purple-400 hover:text-purple-200 transition-colors disabled:opacity-40 px-2"
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </>
  )
}
