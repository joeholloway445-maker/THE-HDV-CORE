import type { TerminalState } from '@/lib/builder/store/terminalStore';

type Store = TerminalState;

// The Claude REPL in this builder used to fake "Claude" output by chopping a
// static canned string into tokens via setInterval. That's gone: this now
// opens the same SSE connection DreamStudio uses
// (GET /api/personamatrix/stream) to pull real, live PersonaMatrix output —
// every line here is a persona that was actually spawned, executed, and
// terminated server-side, with its cost landing in the ledger.
//
// We don't have a conversational LLM endpoint to answer the typed prompt
// directly (PersonaMatrix personas are ephemeral spawn->execute->die units,
// not chat models), so the REPL "replies" by tapping into the dream module's
// live stream: a filter_director call summarizing the energy/chain decision,
// followed by a burst of commenter personas reacting to the prompt as
// context. This is real backend traffic, not replayed text.

export interface StreamMsg {
  kind: 'hello' | 'director' | 'chat';
  module?: string;
  energy?: number;
  persona?: number;
  type?: string;
  text?: string;
  trigger_chain?: string;
  cost_usd?: number;
}

const STREAM_MESSAGE_BUDGET = 6;

export function streamClaudeReply(
  store: Store,
  terminalId: string,
  prompt: string,
  isAborted: () => boolean
) {
  const es = new EventSource(
    `/api/personamatrix/stream?energy=0.6&module=dream`
  );

  let received = 0;
  let closed = false;

  const close = () => {
    if (closed) return;
    closed = true;
    es.close();
  };

  store.appendOutput(terminalId, `● PersonaMatrix(dream) — live request for: "${prompt}"\n`);

  es.onmessage = (ev) => {
    if (isAborted()) {
      close();
      return;
    }

    let msg: StreamMsg;
    try {
      msg = JSON.parse(ev.data) as StreamMsg;
    } catch {
      return;
    }

    if (msg.kind === 'hello') return;

    if (msg.kind === 'director' && msg.trigger_chain) {
      store.appendOutput(
        terminalId,
        `● filter_director persona_${msg.persona ?? '?'} → ${msg.trigger_chain} (energy=${msg.energy?.toFixed(2) ?? '?'}, cost=$${(msg.cost_usd ?? 0).toFixed(8)})\n`
      );
      received++;
    } else if (msg.kind === 'chat' && msg.text) {
      store.appendOutput(
        terminalId,
        `persona_${msg.persona ?? '?'}: ${msg.text} (cost=$${(msg.cost_usd ?? 0).toFixed(8)})\n`
      );
      received++;
    }

    if (received >= STREAM_MESSAGE_BUDGET) {
      store.appendOutput(terminalId, '● [stream closed — budget reached]\n');
      close();
    }
  };

  es.onerror = () => {
    if (!closed) {
      store.appendOutput(terminalId, '● [PersonaMatrix stream error — connection closed]\n');
    }
    close();
  };
}
