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
          { id: 'dast1', name: 'Flux API', type: 'api', description: 'Image generation via Flux', status: 'enabled', callCount: 341 },
          { id: 'dast2', name: 'Code Gen LLM', type: 'llm', description: 'Code synthesis model', status: 'enabled', callCount: 891 },
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
