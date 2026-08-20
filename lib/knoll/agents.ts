import type { AgentDef } from './types'

export const AGENTS: AgentDef[] = [
  {
    id: 'knoll',
    name: 'KNOLL',
    class: 'root',
    role: 'Security Layer / Access Authority',
    tagline: 'Nothing passes without clearance.',
    description: 'KNOLL is the root security layer of the HDV system. Every request, session, and action is validated through KNOLL before reaching any persistent or ephemeral agent. KNOLL maintains the permission matrix, threat model, and audit trail for the entire network.',
    primaryColor: '#ef4444',
    glowColor: 'rgba(239,68,68,0.35)',
    borderColor: '#7f1d1d',
    status: 'active',
    uptime: '99.99%',
    version: '1.0.0',
    capabilities: ['Authentication','Authorization','Audit Logging','Threat Detection','Secret Management','Session Management','Permission Matrix'],
    connectedTo: ['hope','apex','dream','vision'],
    tools: [
      { id: 'knoll-t1', name: 'JWT Validator', type: 'security', description: 'Validates JWT tokens for all incoming requests', status: 'enabled', callCount: 14832 },
      { id: 'knoll-t2', name: 'Supabase Auth', type: 'api', description: 'Supabase authentication integration', status: 'enabled', callCount: 8901 },
      { id: 'knoll-t3', name: 'RLS Policy Engine', type: 'security', description: 'Row-level security enforcement', status: 'enabled', callCount: 22104 },
      { id: 'knoll-t4', name: 'AES-256 Vault', type: 'security', description: 'Secret encryption/decryption', status: 'enabled', callCount: 4302 },
    ],
    children: [
      {
        id: 'knoll-auth-guard', parentId: 'knoll', name: 'AuthGuard', role: 'Request Authenticator',
        description: 'First checkpoint for all requests. Validates identity, checks token freshness, and gates unauthenticated traffic.',
        status: 'active', memoryType: 'short',
        capabilities: ['Token validation','OAuth flow','API key verification','Rate limiting'],
        tools: [
          { id: 'ag-t1', name: 'Token Inspector', type: 'security', description: 'Decode and validate JWT/session tokens', status: 'enabled', callCount: 12900 },
          { id: 'ag-t2', name: 'OAuth Bridge', type: 'api', description: 'OAuth 2.0 provider integrations', status: 'enabled', callCount: 3201 },
        ],
      },
      {
        id: 'knoll-session-validator', parentId: 'knoll', name: 'SessionValidator', role: 'Session Lifecycle Manager',
        description: 'Tracks all active sessions, enforces timeouts, manages concurrent session limits, and invalidates compromised sessions.',
        status: 'active', memoryType: 'short',
        capabilities: ['Session tracking','Timeout enforcement','Concurrent session limit','Session invalidation'],
        tools: [
          { id: 'sv-t1', name: 'Session Store', type: 'memory', description: 'Redis-backed session storage', status: 'enabled', callCount: 8810 },
        ],
      },
      {
        id: 'knoll-permission-matrix', parentId: 'knoll', name: 'PermissionMatrix', role: 'Role-Based Access Controller',
        description: 'Evaluates permission grants across all agents and resources. Implements RBAC with dynamic rule evaluation and inheritance chains.',
        status: 'active', memoryType: 'long',
        capabilities: ['RBAC','Permission inheritance','Dynamic policy evaluation','Resource scoping'],
        tools: [
          { id: 'pm-t1', name: 'Policy Evaluator', type: 'security', description: 'Evaluates access policies in real time', status: 'enabled', callCount: 19040 },
          { id: 'pm-t2', name: 'Role Resolver', type: 'function', description: 'Resolves role hierarchies and inheritance', status: 'enabled', callCount: 7321 },
        ],
      },
      {
        id: 'knoll-threat-detector', parentId: 'knoll', name: 'ThreatDetector', role: 'Anomaly & Threat Monitor',
        description: 'Monitors traffic patterns, behavioral anomalies, and known attack vectors. Triggers alerts and auto-blocks on suspicious activity.',
        status: 'active', memoryType: 'long',
        capabilities: ['Anomaly detection','Rate abuse detection','Geo-blocking','Auto-block','Alerting'],
        tools: [
          { id: 'td-t1', name: 'Pattern Analyzer', type: 'security', description: 'Behavioral pattern analysis', status: 'enabled', callCount: 5504 },
          { id: 'td-t2', name: 'Alert Dispatcher', type: 'webhook', description: 'Sends security alerts to configured endpoints', status: 'enabled', callCount: 23 },
        ],
      },
      {
        id: 'knoll-audit-trail', parentId: 'knoll', name: 'AuditTrail', role: 'Immutable Action Recorder',
        description: 'Creates tamper-evident logs of every action taken by every agent. Records who, what, when, where, and outcome for full traceability.',
        status: 'active', memoryType: 'long',
        capabilities: ['Immutable logging','Action tagging','Outcome recording','Log export','Tamper detection'],
        tools: [
          { id: 'at-t1', name: 'Log Writer', type: 'io', description: 'Writes structured audit events', status: 'enabled', callCount: 44210 },
          { id: 'at-t2', name: 'Log Verifier', type: 'security', description: 'Verifies log integrity with checksums', status: 'enabled', callCount: 1200 },
        ],
      },
      {
        id: 'knoll-access-log', parentId: 'knoll', name: 'AccessLog', role: 'Real-Time Access Monitor',
        description: 'Live feed of all access events across the system. Provides the dashboard with real-time visibility into who and what is touching resources.',
        status: 'active', memoryType: 'short',
        capabilities: ['Real-time streaming','Access event aggregation','Dashboard feed','Alert integration'],
        tools: [
          { id: 'al-t1', name: 'Event Stream', type: 'io', description: 'Supabase real-time event stream', status: 'enabled', callCount: 98032 },
        ],
      },
      {
        id: 'knoll-vault-keeper', parentId: 'knoll', name: 'VaultKeeper', role: 'Secrets & Credential Manager',
        description: 'Manages all API keys, secrets, and credentials across the system. Implements secret rotation, scoped access, and zero-exposure secret injection.',
        status: 'active', memoryType: 'long',
        capabilities: ['Secret storage','Key rotation','Scoped injection','Zero-exposure delivery','Audit access'],
        tools: [
          { id: 'vk-t1', name: 'AES-256 Vault', type: 'security', description: 'Encrypted secret store', status: 'enabled', callCount: 4302 },
          { id: 'vk-t2', name: 'Rotation Scheduler', type: 'function', description: 'Automated secret rotation', status: 'enabled', callCount: 48 },
        ],
      },
      {
        id: 'knoll-supabase-rls', parentId: 'knoll', name: 'SupabaseRLS', role: 'Row-Level Security Enforcer',
        description: 'Enforces Supabase RLS policies across all 9 tables. Owner-only access via auth.uid() checks ensure no cross-user data leakage in the HDV system.',
        status: 'active', memoryType: 'long',
        capabilities: ['RLS policy enforcement','Owner-only access','auth.uid() gating','Table-level policies','Realtime RLS'],
        tools: [
          { id: 'srls-t1', name: 'Supabase Client', type: 'api', description: 'Supabase JS client with RLS', status: 'enabled', callCount: 22104 },
          { id: 'srls-t2', name: 'Policy Inspector', type: 'security', description: 'Validates RLS policies at runtime', status: 'enabled', callCount: 5502 },
        ],
      },
      {
        id: 'knoll-freeze-gate', parentId: 'knoll', name: 'FreezeGate', role: 'KNOLL Hard-Stop Controller',
        description: 'Implements the KNOLL freeze mechanism from hdv_foundation. When triggered, KNOLL can hard-stop all agent activity, lock sessions, and enter audit-only mode.',
        status: 'active', memoryType: 'long',
        capabilities: ['Hard stop','Session lock','Audit-only mode','Emergency freeze','Freeze log'],
        tools: [
          { id: 'fg-t1', name: 'Freeze Trigger', type: 'security', description: 'Atomic freeze signal broadcaster', status: 'enabled', callCount: 3 },
          { id: 'fg-t2', name: 'State Snapshot', type: 'memory', description: 'System state capture at freeze point', status: 'enabled', callCount: 3 },
        ],
      },
      {
        id: 'knoll-redis-cache', parentId: 'knoll', name: 'RedisCache', role: 'Session & Rate-Limit Cache',
        description: 'Redis-backed caching layer for session tokens, rate-limit counters, and ephemeral security state. Zero-TTL invalidation on suspicious activity.',
        status: 'active', memoryType: 'short',
        capabilities: ['Session caching','Rate-limit counters','Token blacklist','TTL management','Pub/Sub alerts'],
        tools: [
          { id: 'rc-t1', name: 'Redis Client', type: 'memory', description: 'Redis connection pool', status: 'enabled', callCount: 44021 },
        ],
      },
      {
        id: 'knoll-legal-gates', parentId: 'knoll', name: 'LegalGates', role: 'Compliance & Legal Enforcer',
        description: 'Enforces legal constraints before any creator payout, identity verification, or data export. Blocks actions that violate compliance rules.',
        status: 'active', memoryType: 'long',
        capabilities: ['Compliance check','GDPR gating','Creator eligibility','Export controls','Jurisdiction rules'],
        tools: [
          { id: 'lg-t1', name: 'Compliance Engine', type: 'security', description: 'Rule-based legal compliance checker', status: 'enabled', callCount: 2201 },
        ],
      },
      {
        id: 'knoll-tenancy-manager', parentId: 'knoll', name: 'TenancyManager', role: 'Multi-Tenant Access Isolator',
        description: 'Manages tenant isolation, BYOK key scoping, and subscription tier enforcement from hdv_foundation tenancy layer.',
        status: 'active', memoryType: 'long',
        capabilities: ['Tenant isolation','BYOK scoping','Tier enforcement','Tenant provisioning','Cross-tenant barrier'],
        tools: [
          { id: 'tm-t1', name: 'Tenant Registry', type: 'memory', description: 'Prisma-backed tenant store', status: 'enabled', callCount: 1804 },
          { id: 'tm-t2', name: 'BYOK Validator', type: 'security', description: 'Validates bring-your-own-key credentials', status: 'enabled', callCount: 890 },
        ],
      },
      {
        id: 'knoll-gvisor-sandbox', parentId: 'knoll', name: 'gVisorSandbox', role: 'Secure Execution Sandbox',
        description: 'gVisor-based container sandbox for Vision execution. Isolates all code runs, file I/O, and network calls from the host system.',
        status: 'active', memoryType: 'none',
        capabilities: ['Container isolation','Syscall interception','Network sandbox','File I/O control','gVisor runsc'],
        tools: [
          { id: 'gv-t1', name: 'gVisor Runtime', type: 'security', description: 'gVisor runsc container runtime', status: 'enabled', callCount: 312 },
        ],
      },
      {
        id: 'knoll-observability', parentId: 'knoll', name: 'Observability', role: 'System Health & Metrics Layer',
        description: 'Aggregates health metrics, latency traces, and error rates across all agents. Powers the KNOLL dashboard and alerts on degraded subsystems.',
        status: 'active', memoryType: 'short',
        capabilities: ['Health metrics','Latency tracing','Error rate tracking','Agent health checks','Alert routing'],
        tools: [
          { id: 'ob-t1', name: 'Metrics Collector', type: 'io', description: 'Structured metrics aggregation', status: 'enabled', callCount: 88041 },
          { id: 'ob-t2', name: 'Trace Exporter', type: 'io', description: 'Distributed trace export', status: 'enabled', callCount: 22010 },
        ],
      },
      {
        id: 'knoll-prisma-guard', parentId: 'knoll', name: 'PrismaGuard', role: 'Database Query Interceptor',
        description: 'Intercepts all Prisma ORM queries for audit logging, injection detection, and query budget enforcement before hitting PostgreSQL.',
        status: 'active', memoryType: 'short',
        capabilities: ['Query interception','SQL injection detection','Query budgeting','Prisma middleware','Audit log bridge'],
        tools: [
          { id: 'pg-t1', name: 'Prisma Middleware', type: 'security', description: 'Prisma query middleware chain', status: 'enabled', callCount: 33201 },
        ],
      },
    ],
  },

  {
    id: 'hope',
    name: 'HOPE',
    class: 'persistent',
    role: 'Face / Frontend / Intent Interpreter',
    tagline: 'Your companion at every surface.',
    description: 'HOPE is the persistent, user-facing layer of the HDV system. It interprets user intent, maintains conversational context, selects the appropriate persona and voice, and renders all frontend interactions. HOPE never sleeps — it travels with the user across all modes and sessions.',
    primaryColor: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.35)',
    borderColor: '#4c1d95',
    status: 'active',
    uptime: '99.98%',
    version: '2.4.1',
    capabilities: ['Intent parsing','Persona management','Context stitching','UI composition','Sentiment modeling','Voice selection','Memory surfacing'],
    connectedTo: ['knoll','apex'],
    tools: [
      { id: 'hope-t1', name: 'Claude API', type: 'llm', description: 'Anthropic Claude for intent parsing and generation', status: 'enabled', callCount: 32041 },
      { id: 'hope-t2', name: 'Supabase Client', type: 'api', description: 'Database queries for user data', status: 'enabled', callCount: 12080 },
      { id: 'hope-t3', name: 'Zustand Store', type: 'memory', description: 'Client-side state management', status: 'enabled', callCount: 201330 },
      { id: 'hope-t4', name: 'PostHog', type: 'api', description: 'Behavioral analytics', status: 'enabled', callCount: 44021 },
    ],
    children: [
      {
        id: 'hope-intent-parser', parentId: 'hope', name: 'IntentParser', role: 'NLP Intent Extractor',
        description: 'Analyzes raw user input and extracts structured intent: action, target, modifiers, emotional context, and urgency. Routes parsed intent to APEX for task assignment.',
        status: 'active', memoryType: 'short',
        capabilities: ['NLP analysis','Intent classification','Entity extraction','Urgency scoring','Ambiguity resolution'],
        tools: [
          { id: 'ip-t1', name: 'Claude Sonnet 5', type: 'llm', description: 'Primary intent parsing model', status: 'enabled', callCount: 18030 },
          { id: 'ip-t2', name: 'Intent Classifier', type: 'function', description: 'Rule-based intent classification layer', status: 'enabled', callCount: 18030 },
        ],
      },
      {
        id: 'hope-persona-manager', parentId: 'hope', name: 'PersonaManager', role: 'Active Persona Controller',
        description: 'Selects, activates, and manages the active persona for each conversation. Handles persona switching, trait loading, and voice style configuration.',
        status: 'active', memoryType: 'long',
        capabilities: ['Persona selection','Trait injection','Voice style loading','Persona blending','Context-aware switching'],
        tools: [
          { id: 'pem-t1', name: 'Persona Store', type: 'memory', description: 'Supabase-backed persona definitions', status: 'enabled', callCount: 4201 },
        ],
      },
      {
        id: 'hope-ui-renderer', parentId: 'hope', name: 'UIRenderer', role: 'Frontend Response Composer',
        description: 'Transforms structured agent output into user-facing UI: messages, cards, flows, modals, animations. Adapts rendering to the current game mode and context.',
        status: 'active', memoryType: 'none',
        capabilities: ['Response formatting','Component selection','Animation control','Mode-aware rendering','Markdown processing'],
        tools: [
          { id: 'ur-t1', name: 'React Renderer', type: 'io', description: 'Next.js/React rendering layer', status: 'enabled', callCount: 89020 },
          { id: 'ur-t2', name: 'Markdown Parser', type: 'function', description: 'Parses and renders Markdown responses', status: 'enabled', callCount: 21030 },
        ],
      },
      {
        id: 'hope-conversation-buffer', parentId: 'hope', name: 'ConversationBuffer', role: 'Short-Term Conversation Memory',
        description: 'Maintains the active conversation window: recent messages, context fragments, and turn metadata. Ensures coherent multi-turn interactions.',
        status: 'active', memoryType: 'short',
        capabilities: ['Turn tracking','Context windowing','Message indexing','Token budgeting','Conversation reset'],
        tools: [
          { id: 'cb-t1', name: 'Sliding Window Buffer', type: 'memory', description: 'In-memory sliding window for conversation turns', status: 'enabled', callCount: 44010 },
        ],
      },
      {
        id: 'hope-context-weaver', parentId: 'hope', name: 'ContextWeaver', role: 'Long-Context Stitcher',
        description: 'Retrieves relevant long-term memories, user history, and world state to inject into the LLM context. Ranks fragments by relevance using embedding similarity.',
        status: 'active', memoryType: 'long',
        capabilities: ['Embedding retrieval','Relevance ranking','Context injection','Memory surfacing','World state lookup'],
        tools: [
          { id: 'cw-t1', name: 'pgvector Search', type: 'memory', description: 'Supabase pgvector similarity search', status: 'enabled', callCount: 9810 },
          { id: 'cw-t2', name: 'Context Ranker', type: 'function', description: 'Relevance scoring for context fragments', status: 'enabled', callCount: 9810 },
        ],
      },
      {
        id: 'hope-emotion-engine', parentId: 'hope', name: 'EmotionEngine', role: 'Sentiment & Tone Modeler',
        description: "Analyzes and tracks emotional tone across the conversation. Adjusts HOPE's response warmth, pacing, and vocabulary based on detected user emotional state.",
        status: 'active', memoryType: 'short',
        capabilities: ['Sentiment detection','Emotion tracking','Tone adjustment','Empathy modeling','Escalation detection'],
        tools: [
          { id: 'ee-t1', name: 'Sentiment Classifier', type: 'function', description: 'Real-time sentiment analysis', status: 'enabled', callCount: 18030 },
        ],
      },
      {
        id: 'hope-narrative-voice', parentId: 'hope', name: 'NarrativeVoice', role: 'Response Style & Voice Selector',
        description: 'Selects the appropriate narrative voice, style guide, and vocabulary for each response. Ensures HOPE sounds consistent across all surfaces.',
        status: 'active', memoryType: 'none',
        capabilities: ['Style selection','Vocabulary control','Consistency enforcement','Multi-mode voice','Tone calibration'],
        tools: [
          { id: 'nv-t1', name: 'Style Templates', type: 'function', description: 'Voice and style template engine', status: 'enabled', callCount: 32041 },
        ],
      },
      {
        id: 'hope-anthropic-client', parentId: 'hope', name: 'AnthropicClient', role: 'Claude SDK Integration',
        description: 'Direct integration with the Anthropic SDK (@anthropic-ai/sdk). Manages streaming, tool use, system prompts, and context window for all Claude model calls.',
        status: 'active', memoryType: 'short',
        capabilities: ['Streaming responses','Tool use','System prompt injection','Context management','Model switching'],
        tools: [
          { id: 'ac-t1', name: '@anthropic-ai/sdk', type: 'llm', description: 'Anthropic official Node SDK', status: 'enabled', callCount: 32041 },
          { id: 'ac-t2', name: 'Stream Handler', type: 'function', description: 'Server-sent event stream processing', status: 'enabled', callCount: 32041 },
        ],
      },
      {
        id: 'hope-livekit-client', parentId: 'hope', name: 'LiveKitClient', role: 'WebRTC Voice & Video Layer',
        description: 'LiveKit WebRTC integration for real-time voice, video, and data channels. Powers voice interaction with HOPE and multiplayer session presence.',
        status: 'active', memoryType: 'short',
        capabilities: ['WebRTC audio','Video streams','Data channels','Room management','Participant presence'],
        tools: [
          { id: 'lk-t1', name: 'livekit-client', type: 'api', description: 'LiveKit JS client SDK', status: 'enabled', callCount: 8901 },
          { id: 'lk-t2', name: '@livekit/components-react', type: 'api', description: 'LiveKit React UI components', status: 'enabled', callCount: 4201 },
        ],
      },
      {
        id: 'hope-posthog-analytics', parentId: 'hope', name: 'PostHogAnalytics', role: 'Behavioral Analytics Tracker',
        description: 'PostHog integration for capturing user behavior, session replays, feature flag evaluations, and funnel analysis across the HDV frontend.',
        status: 'active', memoryType: 'none',
        capabilities: ['Event capture','Session replay','Feature flags','Funnel analysis','Cohort tracking'],
        tools: [
          { id: 'ph-t1', name: 'posthog-js', type: 'api', description: 'PostHog browser analytics SDK', status: 'enabled', callCount: 44021 },
        ],
      },
      {
        id: 'hope-matrix-client', parentId: 'hope', name: 'MatrixClient', role: 'Decentralized Messaging Layer',
        description: 'Matrix protocol integration (matrix-js-sdk) for decentralized, persistent messaging across all HDV sessions and users.',
        status: 'active', memoryType: 'long',
        capabilities: ['Room management','E2E encryption','Event sync','User presence','Message history'],
        tools: [
          { id: 'mx-t1', name: 'matrix-js-sdk', type: 'api', description: 'Matrix JS SDK v41', status: 'enabled', callCount: 12041 },
        ],
      },
      {
        id: 'hope-nakama-client', parentId: 'hope', name: 'NakamaClient', role: 'Game Server & Social Layer',
        description: 'Nakama game server client (@heroiclabs/nakama-js) for matchmaking, leaderboards, real-time multiplayer, and social graph features.',
        status: 'active', memoryType: 'short',
        capabilities: ['Matchmaking','Leaderboards','Real-time multiplayer','Social graph','Wallet & inventory'],
        tools: [
          { id: 'nk-t1', name: '@heroiclabs/nakama-js', type: 'api', description: 'Nakama JS client SDK v2.8', status: 'enabled', callCount: 7802 },
        ],
      },
      {
        id: 'hope-monaco-editor', parentId: 'hope', name: 'MonacoEditor', role: 'In-App Code Editor',
        description: 'Monaco Editor integration for live code editing, syntax highlighting, and AI-assisted completions inside the HDV UI.',
        status: 'active', memoryType: 'none',
        capabilities: ['Syntax highlighting','Code completion','Multi-language','Diff view','Theme support'],
        tools: [
          { id: 'me-t1', name: '@monaco-editor/react', type: 'api', description: 'Monaco React integration', status: 'enabled', callCount: 3201 },
          { id: 'me-t2', name: 'monaco-editor', type: 'api', description: 'Monaco core editor bundle', status: 'enabled', callCount: 3201 },
        ],
      },
      {
        id: 'hope-companion-memory', parentId: 'hope', name: 'CompanionMemory', role: 'Companion Persistent Memory',
        description: 'Stores and retrieves companion memory fragments, conversation history, and user preferences across sessions from hdv_foundation companion layer.',
        status: 'active', memoryType: 'long',
        capabilities: ['Memory persistence','Fragment retrieval','Preference tracking','Cross-session continuity','Memory pruning'],
        tools: [
          { id: 'cm-t1', name: 'Memory Store', type: 'memory', description: 'Prisma-backed companion memory', status: 'enabled', callCount: 14210 },
          { id: 'cm-t2', name: 'IndexedDB Cache', type: 'memory', description: 'idb local cache for offline access', status: 'enabled', callCount: 8901 },
        ],
      },
      {
        id: 'hope-portrait-engine', parentId: 'hope', name: 'PortraitEngine', role: 'AI Companion Portrait Renderer',
        description: 'Renders dynamic AI companion portraits using image providers (Google AI Studio / Colab tunnel). Updates portraits based on companion emotional state and scene context.',
        status: 'active', memoryType: 'short',
        capabilities: ['Portrait generation','Emotion expression','Scene-aware updates','Provider routing','Image caching'],
        tools: [
          { id: 'pe-t1', name: 'Image Provider Factory', type: 'api', description: 'Multi-provider image generation router', status: 'enabled', callCount: 2041 },
          { id: 'pe-t2', name: 'Portrait Cache', type: 'memory', description: 'LRU portrait image cache', status: 'enabled', callCount: 8904 },
        ],
      },
    ],
  },

  {
    id: 'apex',
    name: 'APEX',
    class: 'persistent',
    role: 'Router / Orchestrator / Backend Organizer',
    tagline: 'Every task finds its way through APEX.',
    description: 'APEX is the persistent orchestration layer. It receives parsed intent from HOPE, routes tasks to the correct agents or tools, manages the spawning and lifecycle of ephemeral agents (DREAM and VISION), and maintains the global resource and memory architecture.',
    primaryColor: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.35)',
    borderColor: '#164e63',
    status: 'active',
    uptime: '99.95%',
    version: '3.1.0',
    capabilities: ['Task routing','Agent spawning','Tool registry','Memory orchestration','API management','Resource allocation','Security gating'],
    connectedTo: ['knoll','hope','dream','vision'],
    tools: [
      { id: 'apex-t1', name: 'Task Queue', type: 'function', description: 'Priority-ordered task queue', status: 'enabled', callCount: 28401 },
      { id: 'apex-t2', name: 'Agent SDK', type: 'api', description: 'Claude Agent SDK for spawning subagents', status: 'enabled', callCount: 1203 },
      { id: 'apex-t3', name: 'pgvector', type: 'memory', description: 'Vector memory store', status: 'enabled', callCount: 14020 },
      { id: 'apex-t4', name: 'Anthropic API', type: 'llm', description: 'Direct Claude API access for orchestration decisions', status: 'enabled', callCount: 8901 },
    ],
    children: [
      {
        id: 'apex-task-router', parentId: 'apex', name: 'TaskRouter', role: 'Intent-to-Task Dispatcher',
        description: 'Receives structured intent from HOPE and routes it to the correct agent, tool, or workflow. Implements priority scoring and load balancing.',
        status: 'active', memoryType: 'short',
        capabilities: ['Intent routing','Priority scoring','Load balancing','Fallback handling','Route logging'],
        tools: [
          { id: 'tr-t1', name: 'Route Table', type: 'function', description: 'Dynamic routing table with priority weights', status: 'enabled', callCount: 28401 },
        ],
      },
      {
        id: 'apex-agent-spawner', parentId: 'apex', name: 'AgentSpawner', role: 'Ephemeral Agent Lifecycle Manager',
        description: 'Creates, monitors, and terminates DREAM and VISION instances on demand. Manages concurrency limits, resource budgets, and spawn cooldowns.',
        status: 'active', memoryType: 'short',
        capabilities: ['Agent spawning','Lifecycle management','Concurrency control','Resource budgeting','Error recovery'],
        tools: [
          { id: 'asp-t1', name: 'Claude Agent SDK', type: 'api', description: 'Anthropic Agent SDK', status: 'enabled', callCount: 1203 },
          { id: 'asp-t2', name: 'Spawn Monitor', type: 'function', description: 'Tracks active agent instances', status: 'enabled', callCount: 4820 },
        ],
      },
      {
        id: 'apex-tool-registry', parentId: 'apex', name: 'ToolRegistry', role: 'Global Tool Catalog',
        description: 'Maintains the master catalog of all available tools across the system. Handles tool discovery, capability matching, versioning, and deprecation.',
        status: 'active', memoryType: 'long',
        capabilities: ['Tool discovery','Capability matching','Version management','Deprecation tracking','Schema validation'],
        tools: [
          { id: 'trl-t1', name: 'Tool Catalog DB', type: 'memory', description: 'Supabase-backed tool definitions', status: 'enabled', callCount: 3201 },
        ],
      },
      {
        id: 'apex-memory-core', parentId: 'apex', name: 'MemoryCore', role: 'Vector & Relational Memory Orchestrator',
        description: 'Orchestrates all memory operations across the system: short-term buffers, long-term vector stores, episodic memories, and structured relational data.',
        status: 'active', memoryType: 'long',
        capabilities: ['Vector write/read','Episodic memory','Semantic search','Memory consolidation','Forgetting curves'],
        tools: [
          { id: 'mc-t1', name: 'pgvector', type: 'memory', description: 'Supabase pgvector operations', status: 'enabled', callCount: 14020 },
          { id: 'mc-t2', name: 'Memory Consolidator', type: 'function', description: 'Merges and prunes memory fragments', status: 'enabled', callCount: 890 },
        ],
      },
      {
        id: 'apex-security-gate', parentId: 'apex', name: 'SecurityGate', role: 'KNOLL Interface',
        description: "APEX's dedicated interface to KNOLL. All outbound actions from APEX pass through SecurityGate for authorization before execution.",
        status: 'active', memoryType: 'none',
        capabilities: ['Permission pre-check','Action signing','Audit event dispatch','Rejection handling'],
        tools: [
          { id: 'sg-t1', name: 'KNOLL Client', type: 'security', description: 'Internal KNOLL authorization API', status: 'enabled', callCount: 28401 },
        ],
      },
      {
        id: 'apex-api-bridge', parentId: 'apex', name: 'APIBridge', role: 'External API Manager',
        description: 'Manages all outbound connections to external APIs: authentication, rate limiting, retry logic, response normalization, and circuit breaking.',
        status: 'active', memoryType: 'short',
        capabilities: ['API authentication','Rate limiting','Retry logic','Response normalization','Circuit breaking'],
        tools: [
          { id: 'ab-t1', name: 'HTTP Client', type: 'api', description: 'Authenticated HTTP client with retry', status: 'enabled', callCount: 14200 },
          { id: 'ab-t2', name: 'Circuit Breaker', type: 'function', description: 'Automatic circuit breaker for failing APIs', status: 'enabled', callCount: 12 },
        ],
      },
      {
        id: 'apex-resource-allocator', parentId: 'apex', name: 'ResourceAllocator', role: 'Token & Compute Budget Manager',
        description: 'Tracks and enforces token budgets, compute quotas, and API rate limits across all agents. Implements fair-use policies and emergency throttling.',
        status: 'active', memoryType: 'long',
        capabilities: ['Token tracking','Budget enforcement','Quota management','Throttling','Usage reporting'],
        tools: [
          { id: 'ra-t1', name: 'Budget Tracker', type: 'function', description: 'Real-time resource usage tracking', status: 'enabled', callCount: 8901 },
          { id: 'ra-t2', name: 'Usage Reporter', type: 'io', description: 'Generates usage reports and alerts', status: 'enabled', callCount: 430 },
        ],
      },
      {
        id: 'apex-mistral-nodes', parentId: 'apex', name: 'MistralNodes', role: 'Mistral Inference Cluster',
        description: 'Mistral-apex-nodes integration: self-hosted Mistral 7B inference cluster for fast, private routing decisions and structured JSON extraction without external API calls.',
        status: 'active', memoryType: 'short',
        capabilities: ['Mistral 7B inference','JSON mode','Structured extraction','Offline routing','Batch inference'],
        tools: [
          { id: 'mn-t1', name: 'mistral_inference', type: 'llm', description: 'Mistral Python inference engine', status: 'enabled', callCount: 12041 },
          { id: 'mn-t2', name: 'mistral_common', type: 'function', description: 'Mistral tokenizer and prompt format', status: 'enabled', callCount: 12041 },
        ],
      },
      {
        id: 'apex-mcp-server', parentId: 'apex', name: 'MCPServer', role: 'Model Context Protocol Hub',
        description: 'MCP server implementation (@modelcontextprotocol/sdk) exposing HDV tools and resources to any MCP-compatible client or Claude integration.',
        status: 'active', memoryType: 'short',
        capabilities: ['Tool exposure','Resource serving','Prompt templates','MCP protocol','Claude integration'],
        tools: [
          { id: 'mcp-t1', name: '@modelcontextprotocol/sdk', type: 'api', description: 'MCP TypeScript SDK', status: 'enabled', callCount: 4201 },
        ],
      },
      {
        id: 'apex-kafka-queue', parentId: 'apex', name: 'KafkaQueue', role: 'Distributed Task Queue',
        description: 'Kafka-backed task queue (kafkajs) for reliable, ordered task delivery across APEX workers. Supports in-memory stub mode for offline-first development.',
        status: 'active', memoryType: 'short',
        capabilities: ['Topic publishing','Consumer groups','Offset management','Dead-letter queue','In-memory stub'],
        tools: [
          { id: 'kq-t1', name: 'kafkajs', type: 'api', description: 'Kafka JS client', status: 'enabled', callCount: 8901 },
          { id: 'kq-t2', name: 'InMemoryKafkaStub', type: 'function', description: 'Offline-first Kafka stub for dev', status: 'enabled', callCount: 22104 },
        ],
      },
      {
        id: 'apex-model-router', parentId: 'apex', name: 'ModelRouter', role: 'LLM Tenancy & Model Selector',
        description: 'Routes LLM requests to the correct model based on tenant tier, BYOK config, and model catalog from hdv_foundation. Supports OpenAI, Groq, Together AI, and local models.',
        status: 'active', memoryType: 'short',
        capabilities: ['Tenant-aware routing','Model selection','BYOK passthrough','Cost optimization','Fallback chains'],
        tools: [
          { id: 'mr-t1', name: 'Model Catalog', type: 'function', description: 'config/models.json registry', status: 'enabled', callCount: 14210 },
          { id: 'mr-t2', name: 'Tenancy Router', type: 'function', description: 'Tenant subscription tier resolver', status: 'enabled', callCount: 14210 },
        ],
      },
      {
        id: 'apex-node-matrix', parentId: 'apex', name: 'NodeMatrix', role: '20,480-Node Topology Manager',
        description: 'Manages the 20,480-node agent topology from hdv-orchestrator. Tracks node leases, specializations, persona assignments, and math engine pipelines.',
        status: 'active', memoryType: 'long',
        capabilities: ['Node leasing','Specialization','Pipeline management','Persona assignment','Math engine routing'],
        tools: [
          { id: 'nm-t1', name: 'Node Lease Manager', type: 'function', description: 'Distributed node lease and lifecycle', status: 'enabled', callCount: 20480 },
          { id: 'nm-t2', name: 'Matrix Controller', type: 'function', description: 'Topology coordination layer', status: 'enabled', callCount: 4820 },
        ],
      },
      {
        id: 'apex-prisma-client', parentId: 'apex', name: 'PrismaClient', role: 'ORM Database Layer',
        description: 'Prisma ORM client for all structured database operations. Connects to PostgreSQL for tenant records, billing, market listings, and persistent agent state.',
        status: 'active', memoryType: 'long',
        capabilities: ['CRUD operations','Migrations','Schema validation','Transaction support','Connection pooling'],
        tools: [
          { id: 'prc-t1', name: '@prisma/client', type: 'api', description: 'Prisma generated type-safe client', status: 'enabled', callCount: 33201 },
          { id: 'prc-t2', name: 'PostgreSQL', type: 'memory', description: 'Postgres database backend', status: 'enabled', callCount: 33201 },
        ],
      },
      {
        id: 'apex-fastify-gateway', parentId: 'apex', name: 'FastifyGateway', role: 'HTTP API Gateway',
        description: 'Fastify-based HTTP gateway (hdv_foundation gateway/) handling /v1 routes for all public and internal API calls with JWT auth and rate limiting.',
        status: 'active', memoryType: 'none',
        capabilities: ['HTTP routing','JWT middleware','Rate limiting','CORS','Request validation'],
        tools: [
          { id: 'fg2-t1', name: 'Fastify', type: 'api', description: 'Fastify v5 HTTP framework', status: 'enabled', callCount: 44021 },
          { id: 'fg2-t2', name: 'Express', type: 'api', description: 'Express v4 (hdv-orchestrator)', status: 'enabled', callCount: 8901 },
        ],
      },
      {
        id: 'apex-byok-router', parentId: 'apex', name: 'BYOKRouter', role: 'Bring-Your-Own-Key Passthrough',
        description: 'Routes LLM calls for BYOK tenants directly to their own API endpoints and keys without HDV platform keys ever being involved.',
        status: 'active', memoryType: 'short',
        capabilities: ['Key passthrough','Endpoint forwarding','BYOK validation','Usage attribution','Isolation guarantee'],
        tools: [
          { id: 'bk-t1', name: 'BYOK Proxy', type: 'api', description: 'Transparent key injection proxy', status: 'enabled', callCount: 890 },
        ],
      },
    ],
  },

  {
    id: 'dream',
    name: 'DREAM',
    class: 'ephemeral',
    role: 'Creation / Simulation / Entropy',
    tagline: 'Chaos made purposeful.',
    description: 'DREAM is an ephemeral agent spawned by APEX when creation, simulation, or generative tasks are required. DREAM thrives in high-entropy, open-ended problem spaces — building worlds, simulating scenarios, generating assets, and forging narratives. Each DREAM instance is temporary but leaves persistent artifacts.',
    primaryColor: '#d946ef',
    glowColor: 'rgba(217,70,239,0.35)',
    borderColor: '#701a75',
    status: 'idle',
    uptime: 'ephemeral',
    version: '1.8.3',
    capabilities: ['World generation','Scene composition','Entity creation','Physics simulation','Entropy injection','Narrative generation','Asset synthesis'],
    connectedTo: ['apex'],
    tools: [
      { id: 'dream-t1', name: 'Claude Opus 5', type: 'llm', description: 'High-capability model for creative generation', status: 'enabled', callCount: 2341 },
      { id: 'dream-t2', name: 'Phaser Engine', type: 'api', description: 'Game physics and scene engine', status: 'enabled', callCount: 891 },
      { id: 'dream-t3', name: 'Three.js', type: 'api', description: '3D scene and entity rendering', status: 'enabled', callCount: 401 },
    ],
    children: [
      {
        id: 'dream-world-builder', parentId: 'dream', name: 'WorldBuilder', role: 'Procedural World Generator',
        description: 'Generates complete world definitions: geography, biomes, faction structures, history, and rules. Outputs structured world data consumed by the game engine.',
        status: 'idle', memoryType: 'long',
        capabilities: ['Procedural generation','Biome modeling','Faction design','History synthesis','World rule definition'],
        tools: [
          { id: 'wb-t1', name: 'World Gen LLM', type: 'llm', description: 'Claude for structured world generation', status: 'enabled', callCount: 203 },
          { id: 'wb-t2', name: 'World Schema', type: 'function', description: 'JSON schema validator for world definitions', status: 'enabled', callCount: 203 },
        ],
      },
      {
        id: 'dream-scene-composer', parentId: 'dream', name: 'SceneComposer', role: 'Scene & Environment Compositor',
        description: 'Assembles individual scenes from world data: lighting, props, atmosphere, ambient sound triggers, and interactive element placement.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Scene assembly','Lighting design','Prop placement','Atmosphere modeling','Interactive element design'],
        tools: [
          { id: 'sc-t1', name: 'Three.js Scene', type: 'api', description: '3D scene composition', status: 'enabled', callCount: 401 },
        ],
      },
      {
        id: 'dream-entity-generator', parentId: 'dream', name: 'EntityGenerator', role: 'Character, NPC & Object Creator',
        description: 'Generates fully-realized entities: player characters, NPCs, enemies, items, and interactive objects. Each entity gets stats, behavior trees, and dialogue seeds.',
        status: 'idle', memoryType: 'long',
        capabilities: ['Character generation','NPC behavior trees','Item creation','Stat balancing','Dialogue seeding'],
        tools: [
          { id: 'eg-t1', name: 'Entity Schema', type: 'function', description: 'Structured entity definition validator', status: 'enabled', callCount: 1204 },
          { id: 'eg-t2', name: 'Behavior Tree Builder', type: 'function', description: 'NPC behavior tree generator', status: 'enabled', callCount: 891 },
        ],
      },
      {
        id: 'dream-physics-simulator', parentId: 'dream', name: 'PhysicsSimulator', role: 'Rules & Physics Engine',
        description: 'Defines and simulates the physical and logical rules of a given world or scenario. Handles collision, gravity variants, magic systems, and economic models.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Physics definition','Rule simulation','Collision modeling','Magic system design','Economic simulation'],
        tools: [
          { id: 'ps-t1', name: 'Phaser Physics', type: 'api', description: 'Phaser 4 physics engine', status: 'enabled', callCount: 891 },
        ],
      },
      {
        id: 'dream-chaos-seed', parentId: 'dream', name: 'ChaosSeed', role: 'Entropy & Randomness Injector',
        description: 'Injects controlled randomness into generative processes. Ensures no two sessions, worlds, or encounters feel identical. Manages seed persistence for reproducibility.',
        status: 'idle', memoryType: 'none',
        capabilities: ['Seeded randomness','Entropy injection','Seed persistence','Chaos event triggers','Variance calibration'],
        tools: [
          { id: 'cs-t1', name: 'Seed Manager', type: 'function', description: 'Cryptographic seed generation and storage', status: 'enabled', callCount: 2341 },
        ],
      },
      {
        id: 'dream-narrative-forge', parentId: 'dream', name: 'NarrativeForge', role: 'Story Arc & Quest Generator',
        description: 'Generates complete story arcs, quests, dialogue trees, and narrative events. Connects character motivations to world events and player choices.',
        status: 'idle', memoryType: 'long',
        capabilities: ['Story arc generation','Quest design','Dialogue trees','Narrative event chaining','Player choice modeling'],
        tools: [
          { id: 'nf-t1', name: 'Narrative LLM', type: 'llm', description: 'High-context story generation model', status: 'enabled', callCount: 1203 },
          { id: 'nf-t2', name: 'Story Graph', type: 'function', description: 'Directed graph for narrative branching', status: 'enabled', callCount: 1203 },
        ],
      },
      {
        id: 'dream-asset-synthesizer', parentId: 'dream', name: 'AssetSynthesizer', role: 'Generative Asset Producer',
        description: 'Produces images, audio descriptions, code snippets, and structured data assets on demand. Coordinates with external generation APIs and caches results.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Image generation','Audio description','Code generation','Asset caching','Format normalization'],
        tools: [
          { id: 'dast1', name: 'Image Factory', type: 'api', description: 'Multi-provider image generation factory', status: 'enabled', callCount: 341 },
          { id: 'dast2', name: 'Code Gen LLM', type: 'llm', description: 'Code synthesis model', status: 'enabled', callCount: 891 },
        ],
      },
      {
        id: 'dream-google-ai-studio', parentId: 'dream', name: 'GoogleAIStudio', role: 'Gemini Image Generator',
        description: 'Google AI Studio integration (providers/google_ai_studio_image.ts) for Gemini-powered image generation. Used for companion portraits, scene images, and asset thumbnails.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Gemini image gen','Prompt-to-image','Style transfer','High-resolution output','Batch generation'],
        tools: [
          { id: 'gas-t1', name: 'Google AI Studio API', type: 'llm', description: 'Gemini image generation endpoint', status: 'enabled', callCount: 891 },
        ],
      },
      {
        id: 'dream-colab-image', parentId: 'dream', name: 'ColabImageTunnel', role: 'Google Colab Image Pipeline',
        description: 'Google Colab tunnel provider (providers/colab_tunnel_image.ts) for GPU-accelerated image generation. Routes diffusion model requests through Colab notebook tunnels.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Diffusion models','GPU acceleration','Colab tunnel','Stable Diffusion','Image upscaling'],
        tools: [
          { id: 'cit-t1', name: 'Colab Tunnel HTTP', type: 'api', description: 'Colab notebook HTTP tunnel client', status: 'enabled', callCount: 512 },
        ],
      },
      {
        id: 'dream-colab-video', parentId: 'dream', name: 'ColabVideoTunnel', role: 'Google Colab Video Pipeline',
        description: 'Google Colab video tunnel provider (providers/colab_tunnel_video.ts) for AI video generation and scene animation via notebook GPU tunnels.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Video generation','Scene animation','Text-to-video','Frame interpolation','Colab GPU'],
        tools: [
          { id: 'cvt-t1', name: 'Colab Video API', type: 'api', description: 'Colab notebook video generation tunnel', status: 'enabled', callCount: 201 },
        ],
      },
      {
        id: 'dream-kokoro-tts', parentId: 'dream', name: 'KokoroTTS', role: 'Text-to-Speech Voice Engine',
        description: 'Kokoro TTS provider (providers/kokoro_tunnel_tts.ts) for high-quality, low-latency voice synthesis. Delivers companion voice lines and narration via Colab tunnel.',
        status: 'idle', memoryType: 'none',
        capabilities: ['Voice synthesis','Multiple voices','Emotion inflection','Streaming audio','SSML support'],
        tools: [
          { id: 'kt-t1', name: 'Kokoro TTS API', type: 'api', description: 'Kokoro TTS via Colab tunnel', status: 'enabled', callCount: 1402 },
        ],
      },
      {
        id: 'dream-ollama-local', parentId: 'dream', name: 'OllamaLocal', role: 'Local LLM Runner',
        description: 'Ollama local model server for offline-first LLM inference. Runs TinyLlama, Phi-2, and Mistral 7B locally without any cloud dependency.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Offline inference','Model management','OpenAI-compatible API','Low latency','Privacy-first'],
        tools: [
          { id: 'ol-t1', name: 'Ollama API', type: 'llm', description: 'Ollama local model serving endpoint', status: 'enabled', callCount: 4201 },
          { id: 'ol-t2', name: 'TinyLlama 1.1B', type: 'llm', description: 'Lightweight local model', status: 'enabled', callCount: 2100 },
        ],
      },
      {
        id: 'dream-vllm-server', parentId: 'dream', name: 'vLLMServer', role: 'High-Throughput Inference Engine',
        description: 'vLLM server for high-throughput LLM inference with PagedAttention. Hosts Llama 3 and Mistral on Hostinger for the HDV platform subscription tier.',
        status: 'idle', memoryType: 'short',
        capabilities: ['PagedAttention','Continuous batching','OpenAI-compatible','Llama 3 serving','Multi-GPU'],
        tools: [
          { id: 'vl-t2', name: 'vLLM API', type: 'llm', description: 'vLLM OpenAI-compatible endpoint', status: 'enabled', callCount: 3301 },
          { id: 'vl-t3', name: 'Llama 3 70B', type: 'llm', description: 'Llama 3 70B Instruct on Hostinger', status: 'enabled', callCount: 1201 },
        ],
      },
      {
        id: 'dream-phaser-engine', parentId: 'dream', name: 'PhaserEngine', role: 'Game Physics & Scene Engine',
        description: 'Phaser 4 game engine integration for 2D game logic, physics simulation, sprite rendering, and interactive scene management within DREAM sessions.',
        status: 'idle', memoryType: 'short',
        capabilities: ['2D physics','Sprite rendering','Input handling','Audio management','Scene transitions'],
        tools: [
          { id: 'phe-t1', name: 'phaser v4', type: 'api', description: 'Phaser 4.1 game framework', status: 'enabled', callCount: 891 },
        ],
      },
      {
        id: 'dream-threejs-3d', parentId: 'dream', name: 'ThreeJS3D', role: '3D Scene & Entity Renderer',
        description: 'Three.js 3D rendering layer for world visualization, entity positioning, camera management, and real-time 3D scene updates within DREAM instances.',
        status: 'idle', memoryType: 'short',
        capabilities: ['3D rendering','Camera control','Lighting','Entity positioning','WebGL shaders'],
        tools: [
          { id: 'tj-t1', name: 'three v0.184', type: 'api', description: 'Three.js 3D rendering library', status: 'enabled', callCount: 401 },
        ],
      },
    ],
  },

  {
    id: 'vision',
    name: 'VISION',
    class: 'ephemeral',
    role: 'Execution / Automation / Payments',
    tagline: 'What is decided, VISION delivers.',
    description: 'VISION is an ephemeral agent spawned when real-world execution is required: running automations, processing payments, managing webhooks, executing scheduled tasks, and streaming results to users. Every VISION action is authorized by KNOLL and logged in the AuditTrail.',
    primaryColor: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.35)',
    borderColor: '#78350f',
    status: 'idle',
    uptime: 'ephemeral',
    version: '2.0.4',
    capabilities: ['Task execution','Payment processing','Workflow automation','Webhook management','Scheduled execution','Output streaming','Execution auditing'],
    connectedTo: ['apex'],
    tools: [
      { id: 'vision-t1', name: 'Stripe API', type: 'payment', description: 'Payment processing via Stripe', status: 'enabled', callCount: 312 },
      { id: 'vision-t2', name: 'Zapier MCP', type: 'webhook', description: 'Outbound webhook dispatch via Zapier', status: 'enabled', callCount: 891 },
      { id: 'vision-t3', name: 'Cron Daemon', type: 'function', description: 'Scheduled task execution', status: 'enabled', callCount: 2041 },
    ],
    children: [
      {
        id: 'vision-task-executor', parentId: 'vision', name: 'TaskExecutor', role: 'Step-by-Step Task Runner',
        description: 'Executes multi-step tasks sequentially or in parallel. Handles state management between steps, rollback on failure, and progress reporting.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Sequential execution','Parallel execution','State management','Rollback','Progress reporting'],
        tools: [
          { id: 'te-t1', name: 'Task State Machine', type: 'function', description: 'Finite state machine for task execution', status: 'enabled', callCount: 1204 },
        ],
      },
      {
        id: 'vision-payment-processor', parentId: 'vision', name: 'PaymentProcessor', role: 'Payment Rail Manager',
        description: 'Handles all payment operations: charges, refunds, subscriptions, and transfers. Validates all transactions through KNOLL before execution.',
        status: 'idle', memoryType: 'long',
        capabilities: ['Charge processing','Refund handling','Subscription management','Transfer execution','Receipt generation'],
        tools: [
          { id: 'pp-t1', name: 'Stripe SDK', type: 'payment', description: 'Stripe payment processing', status: 'enabled', callCount: 312 },
          { id: 'pp-t2', name: 'Receipt Generator', type: 'function', description: 'Structured receipt generation', status: 'enabled', callCount: 312 },
        ],
      },
      {
        id: 'vision-automation-runner', parentId: 'vision', name: 'AutomationRunner', role: 'Workflow Automation Engine',
        description: 'Runs complex multi-system workflows: data pipelines, cross-platform actions, conditional branching, and error recovery.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Workflow execution','Data pipeline','Conditional branching','Error recovery','Cross-platform actions'],
        tools: [
          { id: 'ar-t1', name: 'Workflow Engine', type: 'function', description: 'DAG-based workflow execution', status: 'enabled', callCount: 891 },
          { id: 'ar-t2', name: 'Zapier MCP', type: 'api', description: 'Zapier integration for automation', status: 'enabled', callCount: 203 },
        ],
      },
      {
        id: 'vision-webhook-manager', parentId: 'vision', name: 'WebhookManager', role: 'Inbound & Outbound Webhook Controller',
        description: 'Manages all webhook subscriptions and dispatches. Validates inbound payloads, routes to handlers, and queues outbound delivery with retry logic.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Webhook registration','Payload validation','Inbound routing','Outbound dispatch','Retry queue'],
        tools: [
          { id: 'wm-t1', name: 'Webhook Router', type: 'webhook', description: 'Inbound webhook routing', status: 'enabled', callCount: 891 },
          { id: 'wm-t2', name: 'Retry Queue', type: 'function', description: 'Exponential backoff retry queue', status: 'enabled', callCount: 41 },
        ],
      },
      {
        id: 'vision-scheduler-daemon', parentId: 'vision', name: 'SchedulerDaemon', role: 'Cron & Scheduled Task Manager',
        description: 'Manages all time-based tasks: cron jobs, delayed executions, recurring automations, and reminder dispatches. Persists schedules across VISION instance restarts.',
        status: 'idle', memoryType: 'long',
        capabilities: ['Cron management','Delayed execution','Recurring automations','Reminder dispatch','Schedule persistence'],
        tools: [
          { id: 'sd-t1', name: 'Cron Parser', type: 'function', description: 'Cron expression parser and scheduler', status: 'enabled', callCount: 2041 },
          { id: 'sd-t2', name: 'Schedule Store', type: 'memory', description: 'Persisted schedule definitions', status: 'enabled', callCount: 890 },
        ],
      },
      {
        id: 'vision-output-streamer', parentId: 'vision', name: 'OutputStreamer', role: 'Real-Time Result Streamer',
        description: 'Streams execution progress and results back to HOPE and the frontend in real time. Implements Server-Sent Events and Supabase Realtime for live updates.',
        status: 'idle', memoryType: 'none',
        capabilities: ['SSE streaming','Realtime updates','Progress batching','Error streaming','Completion signaling'],
        tools: [
          { id: 'os-t1', name: 'Supabase Realtime', type: 'io', description: 'Supabase realtime subscriptions', status: 'enabled', callCount: 9210 },
          { id: 'os-t2', name: 'SSE Handler', type: 'io', description: 'Server-Sent Events implementation', status: 'enabled', callCount: 4301 },
        ],
      },
      {
        id: 'vision-audit-logger', parentId: 'vision', name: 'AuditLogger', role: 'Execution Audit Trail',
        description: "Records every action VISION takes: what was executed, by whose authorization, with what parameters, and what the outcome was. Reports directly to KNOLL's AuditTrail.",
        status: 'idle', memoryType: 'long',
        capabilities: ['Action recording','Authorization logging','Outcome tracking','KNOLL reporting','Compliance export'],
        tools: [
          { id: 'vl-t1', name: 'Audit Event Emitter', type: 'security', description: 'Structured audit event emission', status: 'enabled', callCount: 44210 },
        ],
      },
      {
        id: 'vision-stripe-connect', parentId: 'vision', name: 'StripeConnect', role: 'Marketplace Payment Platform',
        description: 'Stripe Connect integration for the HDV creator marketplace. Manages connected accounts, platform fees, and marketplace payouts for creators.',
        status: 'idle', memoryType: 'long',
        capabilities: ['Connected accounts','Platform fees','Express payouts','Account onboarding','Transfer splits'],
        tools: [
          { id: 'sc2-t1', name: 'Stripe Connect API', type: 'payment', description: 'Stripe Connect for marketplace', status: 'enabled', callCount: 201 },
          { id: 'sc2-t2', name: 'Stripe Webhook', type: 'webhook', description: 'Stripe webhook event processor', status: 'enabled', callCount: 892 },
        ],
      },
      {
        id: 'vision-stripe-identity', parentId: 'vision', name: 'StripeIdentity', role: 'Creator Identity Verification',
        description: 'Stripe Identity integration (creator/payout_stripe_live.ts) for KYC verification of creator accounts before enabling real payouts.',
        status: 'idle', memoryType: 'long',
        capabilities: ['KYC verification','ID document check','Liveness detection','Verification session','Compliance record'],
        tools: [
          { id: 'si-t1', name: 'Stripe Identity API', type: 'api', description: 'Stripe Identity verification session', status: 'enabled', callCount: 89 },
        ],
      },
      {
        id: 'vision-creator-market', parentId: 'vision', name: 'CreatorMarket', role: 'Creator Payout & Marketplace',
        description: 'Full creator marketplace from hdv_foundation: listing management, payout eligibility, market store operations, and creator webhook dispatching.',
        status: 'idle', memoryType: 'long',
        capabilities: ['Creator listings','Payout eligibility','Market store','Creator webhooks','Revenue tracking'],
        tools: [
          { id: 'crm-t1', name: 'Payout Factory', type: 'payment', description: 'Creator payout provider factory', status: 'enabled', callCount: 134 },
          { id: 'crm-t2', name: 'Market Store', type: 'memory', description: 'Prisma-backed market listings', status: 'enabled', callCount: 2201 },
        ],
      },
      {
        id: 'vision-livekit-server', parentId: 'vision', name: 'LiveKitServer', role: 'WebRTC Room Controller',
        description: 'Server-side LiveKit room management: creating rooms, issuing access tokens, managing participant permissions, and recording sessions.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Room creation','Token issuance','Participant control','Recording','Egress management'],
        tools: [
          { id: 'lks-t1', name: 'LiveKit Server API', type: 'api', description: 'LiveKit server-side room management', status: 'enabled', callCount: 1204 },
        ],
      },
      {
        id: 'vision-nakama-server', parentId: 'vision', name: 'NakamaServer', role: 'Game Server Controller',
        description: 'Nakama game server management: match creation, runtime hook execution, wallet transactions, and leaderboard updates on the Nakama backend.',
        status: 'idle', memoryType: 'short',
        capabilities: ['Match creation','Runtime hooks','Wallet ops','Leaderboards','Storage write'],
        tools: [
          { id: 'nks-t1', name: 'Nakama Server API', type: 'api', description: 'Nakama server-side admin API', status: 'enabled', callCount: 3201 },
        ],
      },
      {
        id: 'vision-billing-meter', parentId: 'vision', name: 'BillingMeter', role: 'Usage Metering & Allowance',
        description: 'Billing meter from hdv_foundation: tracks APEX parameter usage per tenant, enforces plan allowances, and triggers Stripe checkout for overages.',
        status: 'idle', memoryType: 'long',
        capabilities: ['Usage metering','Plan allowances','Overage detection','Checkout trigger','Cost attribution'],
        tools: [
          { id: 'bm-t1', name: 'Billing Meter', type: 'payment', description: 'Parameter usage metering engine', status: 'enabled', callCount: 28401 },
          { id: 'bm-t2', name: 'Pricing Config', type: 'function', description: 'config/pricing.json tier table', status: 'enabled', callCount: 14210 },
        ],
      },
      {
        id: 'vision-sea-scyte-api', parentId: 'vision', name: 'SeaScyteAPI', role: 'Sea-Scyte Commerce API',
        description: 'Sea-Scyte Fastify API backend (apps/api): JWT-authenticated REST endpoints for the Sea-Scyte commerce platform with PostgreSQL and Stripe.',
        status: 'idle', memoryType: 'short',
        capabilities: ['REST API','JWT auth','PostgreSQL','Stripe integration','CORS handling'],
        tools: [
          { id: 'ssa-t1', name: 'Fastify (Sea-Scyte)', type: 'api', description: 'Sea-Scyte Fastify v5 API', status: 'enabled', callCount: 8901 },
          { id: 'ssa-t2', name: 'pg (PostgreSQL)', type: 'memory', description: 'Direct PostgreSQL client for Sea-Scyte', status: 'enabled', callCount: 14210 },
        ],
      },
      {
        id: 'vision-resource-monitor', parentId: 'vision', name: 'ResourceMonitor', role: 'Execution Resource Tracker',
        description: 'Vision resource monitor (vision/resource_monitor.ts) tracks CPU, memory, and I/O usage during task execution. Enforces sandbox resource limits.',
        status: 'idle', memoryType: 'short',
        capabilities: ['CPU tracking','Memory limits','I/O monitoring','Quota enforcement','Limit alerts'],
        tools: [
          { id: 'rm-t1', name: 'Resource Monitor', type: 'function', description: 'Process resource usage tracker', status: 'enabled', callCount: 4820 },
        ],
      },
    ],
  },
]

export function getAgent(id: string): AgentDef | undefined {
  return AGENTS.find(a => a.id === id)
}

export function getChildNode(id: string) {
  for (const agent of AGENTS) {
    const child = agent.children.find(c => c.id === id)
    if (child) return { child, agent }
  }
  return undefined
}
