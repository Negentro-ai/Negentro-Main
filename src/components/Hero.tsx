import { useState } from 'react'
import type React from 'react'
import {
  Sparkles,
  Terminal,
  Check,
  ArrowRight,
  Database,
  Search,
  History,
  GitFork,
  ArrowUpRight,
} from 'lucide-react'
import { WaitPage } from './WaitPage'

export interface HeroProps {
  activeTab: string
  onOpenConsole: () => void
}

interface MemoryItem {
  id: string
  content: string
  validTime: string
  txTime: string
  vectorScore: number
  bm25Score: number
  hybrid?: number
}

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem_01',
    content: 'User expressed preference for concise Rust & Python async architectures over Node.js.',
    validTime: '2026-04-12T10:00:00Z',
    txTime: '2026-04-12T10:00:15Z',
    vectorScore: 0.942,
    bm25Score: 0.810,
  },
  {
    id: 'mem_02',
    content: 'Project X uses strict memory bounds with PostgreSQL pgvector + Qdrant fallback index.',
    validTime: '2026-05-18T14:30:00Z',
    txTime: '2026-05-18T14:30:08Z',
    vectorScore: 0.887,
    bm25Score: 0.745,
  },
  {
    id: 'mem_03',
    content: 'Production cluster credentials rotated under KMS root key arn:aws:kms:us-east-1:99812.',
    validTime: '2026-07-01T09:15:00Z',
    txTime: '2026-07-01T09:15:02Z',
    vectorScore: 0.781,
    bm25Score: 0.920,
  },
  {
    id: 'mem_04',
    content: 'Agent speculative fork #14 rejected due to budget threshold constraint violation.',
    validTime: '2026-08-10T16:45:00Z',
    txTime: '2026-08-10T16:45:10Z',
    vectorScore: 0.825,
    bm25Score: 0.690,
  },
]

export const Hero: React.FC<HeroProps> = ({
  activeTab,
  onOpenConsole,
}) => {
  const [alpha, setAlpha] = useState<number>(0.65)
  const [copied, setCopied] = useState<boolean>(false)
  const [interactiveTab, setInteractiveTab] = useState<'hybrid' | 'bitemporal' | 'branching' | 'context'>('hybrid')
  const [selectedMem, setSelectedMem] = useState<MemoryItem>(INITIAL_MEMORIES[0])

  const installCmd = 'npm i @piyapi/sdk'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Scored items based on alpha
  const scoredItems = INITIAL_MEMORIES.map((m) => {
    const hybrid = Number((alpha * m.vectorScore + (1 - alpha) * m.bm25Score).toFixed(3))
    return { ...m, hybrid }
  }).sort((a, b) => b.hybrid - a.hybrid)

  return (
    <div className={`w-full flex-1 flex flex-col justify-center items-center ${activeTab === 'overview' ? 'px-6 sm:px-8 py-10 sm:py-16' : 'px-4 py-4 min-h-[calc(100vh-76px)]'}`}>
      {/* 1. OVERVIEW TAB (Default Landing Page) */}
      {activeTab === 'overview' && (
        <div className="w-full max-w-5xl mx-auto text-center space-y-10 animate-fade-in">
          {/* Subtle Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/80 text-xs text-neutral-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
            <span className="font-semibold text-neutral-900">PiyAPI 2.4</span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-600">Bitemporal Cognitive Memory Engine</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.04em] text-neutral-950 max-w-4xl mx-auto leading-[1.08]">
            Cognitive memory fabric for autonomous AI
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto font-normal leading-relaxed">
            Persistent, long-term bitemporal memory, multi-signal hybrid search, and knowledge graph reasoning for intelligent agents and enterprise applications.
          </p>

          {/* Action CTAs & Install Command */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onOpenConsole}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#18181b] hover:bg-black text-white text-sm font-medium px-6 py-3 rounded-full transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-neutral-300" />
              <span>Launch Live Playground</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>

            {/* Quick Install Pill */}
            <div className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 font-mono text-xs shadow-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-neutral-600" />
                <span>{installCmd}</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="text-[11px] font-sans font-semibold text-neutral-700">Copy</span>}
              </button>
            </div>
          </div>

          {/* Interactive Bitemporal Memory Engine Sandbox */}
          <div className="w-full mt-12 pt-4">
            <div className="bg-white border border-neutral-200/90 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden text-left transition-all">
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-neutral-50/80 border-b border-neutral-200/80 gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  </div>
                  <span className="text-xs font-mono text-neutral-500 ml-2">piyapi-engine://sandbox/v2</span>
                </div>

                {/* Sub-tabs inside Engine */}
                <div className="flex items-center gap-1 bg-neutral-200/60 p-1 rounded-lg text-xs font-medium">
                  <button
                    onClick={() => setInteractiveTab('hybrid')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      interactiveTab === 'hybrid' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Hybrid Ranker (α)
                  </button>
                  <button
                    onClick={() => setInteractiveTab('bitemporal')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      interactiveTab === 'bitemporal' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Bitemporal Timeline
                  </button>
                  <button
                    onClick={() => setInteractiveTab('branching')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      interactiveTab === 'branching' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Speculative Branch
                  </button>
                  <button
                    onClick={() => setInteractiveTab('context')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      interactiveTab === 'context' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Agent Graph
                  </button>
                </div>
              </div>

              {/* Tab 1: Live Alpha Slider & Hybrid Search */}
              {interactiveTab === 'hybrid' && (
                <div className="p-6 space-y-6">
                  {/* Slider Control */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-neutral-700" />
                        <span className="text-xs font-semibold uppercase font-mono tracking-wider text-neutral-800">
                          Multi-Signal Blending Ratio (α = {alpha.toFixed(2)})
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Dynamically tune balance between Dense Semantic Vectors (α=1.0) and Sparse BM25 Keyword Search (α=0.0).
                      </p>
                    </div>

                    <div className="w-full sm:w-64 flex items-center gap-3">
                      <span className="text-[11px] font-mono text-neutral-500">BM25</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={alpha}
                        onChange={(e) => setAlpha(parseFloat(e.target.value))}
                        className="w-full accent-neutral-900 cursor-pointer"
                      />
                      <span className="text-[11px] font-mono text-neutral-900 font-semibold">Vector</span>
                    </div>
                  </div>

                  {/* Scored List */}
                  <div className="space-y-2.5">
                    {scoredItems.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedMem(item)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          selectedMem.id === item.id
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`text-xs font-mono font-bold w-6 text-center ${selectedMem.id === item.id ? 'text-neutral-400' : 'text-neutral-400'}`}>
                            #{idx + 1}
                          </span>
                          <p className="text-xs sm:text-sm font-medium truncate">{item.content}</p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className={`text-xs font-mono font-semibold ${selectedMem.id === item.id ? 'text-emerald-400' : 'text-emerald-700'}`}>
                              Score: {item.hybrid}
                            </span>
                            <div className="text-[10px] text-neutral-400 font-mono">
                              vec: {item.vectorScore} • bm25: {item.bm25Score}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Bitemporal Timeline View */}
              {interactiveTab === 'bitemporal' && (
                <div className="p-6 space-y-4">
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                      <History className="w-4 h-4 text-neutral-700" />
                      <span>Two-Dimensional Time Coordinates (Valid Time vs. Transaction Time)</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      PiyAPI records both when an event actually occurred in reality (Valid Time) and when the system learned of it (Transaction Time). This prevents time-travel hallucination and enables exact historical agent rollbacks.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                      <span className="text-[11px] font-mono font-semibold uppercase text-neutral-500">Selected Node</span>
                      <p className="text-xs font-medium text-neutral-900">{selectedMem.content}</p>
                      <div className="pt-2 border-t border-neutral-100 space-y-1 font-mono text-[11px] text-neutral-600">
                        <div><span className="text-neutral-400">valid_time:</span> {selectedMem.validTime}</div>
                        <div><span className="text-neutral-400">tx_time:</span> {selectedMem.txTime}</div>
                        <div><span className="text-neutral-400">state:</span> COMMITTED</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                      <span className="text-[11px] font-mono font-semibold uppercase text-neutral-500">Query As-Of Time</span>
                      <p className="text-xs text-neutral-600">Travel to any past system snapshot without altering current memory graph.</p>
                      <button
                        onClick={onOpenConsole}
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>Open As-Of Simulator</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Speculative Branching */}
              {interactiveTab === 'branching' && (
                <div className="p-6 space-y-4">
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                      <GitFork className="w-4 h-4 text-neutral-700" />
                      <span>Zero-Cost Memory Branching & Speculative Execution</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Fork an autonomous agent memory workspace into an ephemeral sandbox, execute hypothetical multi-turn tool steps, and either merge or discard based on utility evaluation.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-neutral-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-semibold text-neutral-900">Branch: main → speculative/agent_hypo_04</span>
                      <p className="text-xs text-neutral-500">Isolation guarantee: 0 side-effects on primary production knowledge store.</p>
                    </div>
                    <button
                      onClick={onOpenConsole}
                      className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
                    >
                      Fork Branch in Sandbox
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 4: Agent Graph */}
              {interactiveTab === 'context' && (
                <div className="p-6 space-y-4">
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                      <Database className="w-4 h-4 text-neutral-700" />
                      <span>Unified Graph Entities & Vector Embeddings</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Hybrid relational triples connected to high-dimensional embedding vectors for sub-second retrieval across deep agent sessions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-white border border-neutral-200 rounded-xl text-center">
                      <span className="text-2xl font-bold text-neutral-900">329k</span>
                      <p className="text-[11px] text-neutral-500 mt-0.5">Lines of Rust Core</p>
                    </div>
                    <div className="p-3.5 bg-white border border-neutral-200 rounded-xl text-center">
                      <span className="text-2xl font-bold text-neutral-900">&lt;12ms</span>
                      <p className="text-[11px] text-neutral-500 mt-0.5">p99 Hybrid Lookup</p>
                    </div>
                    <div className="p-3.5 bg-white border border-neutral-200 rounded-xl text-center">
                      <span className="text-2xl font-bold text-neutral-900">100%</span>
                      <p className="text-[11px] text-neutral-500 mt-0.5">Deterministic Replay</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. RESEARCH, PRICING, INITIATIVES, AND RESOURCES TABS -> WAIT PAGE */}
      {(activeTab === 'research' ||
        activeTab === 'pricing' ||
        activeTab === 'initiatives' ||
        activeTab === 'resources') && (
        <WaitPage pageName={activeTab} />
      )}
    </div>
  )
}
