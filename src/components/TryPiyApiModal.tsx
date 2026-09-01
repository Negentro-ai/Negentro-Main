import { useState } from "react"
import type React from "react"
import {
	X,
	Sparkles,
	Terminal,
	Search,
	Plus,
	Clock,
	CheckCircle2,
	Code2,
	Sliders,
} from "lucide-react"

export interface TryPiyApiModalProps {
	isOpen: boolean
	onClose: () => void
}

export const TryPiyApiModal: React.FC<TryPiyApiModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [activeTab, setActiveTab] = useState<"search" | "store" | "bitemporal">(
		"search",
	)
	const [query, setQuery] = useState(
		"user prefer typescript and functional components",
	)
	const [alpha, setAlpha] = useState(0.7)
	const [newContent, setNewContent] = useState("")
	const [isProcessing, setIsProcessing] = useState(false)

	if (!isOpen) return null

	const handleAddMemory = (e: React.FormEvent) => {
		e.preventDefault()
		if (!newContent.trim()) return
		setIsProcessing(true)
		setTimeout(() => {
			setIsProcessing(false)
			setNewContent("")
			setActiveTab("search")
		}, 400)
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-sm animate-fade-in">
			<div className="w-full max-w-3xl rounded-3xl bg-white border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
				{/* Top Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/80">
					<div className="flex items-center gap-2">
						<div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
							<Terminal className="w-4 h-4" />
						</div>
						<div>
							<h3 className="text-sm font-semibold text-neutral-900">
								PiyAPI Live Console
							</h3>
							<p className="text-[11px] text-neutral-500 font-mono">
								cluster: us-east-1 • latency: 11ms
							</p>
						</div>
					</div>

					<button
						onClick={onClose}
						className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors cursor-pointer"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Tab Selection */}
				<div className="flex border-b border-neutral-200 px-6 bg-neutral-50/50 text-xs font-medium text-neutral-600 gap-6">
					<button
						onClick={() => setActiveTab("search")}
						className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-all ${
							activeTab === "search"
								? "border-neutral-900 text-neutral-950 font-semibold"
								: "border-transparent hover:text-neutral-900"
						}`}
					>
						<Search className="w-3.5 h-3.5" />
						Hybrid Retrieval
					</button>
					<button
						onClick={() => setActiveTab("store")}
						className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-all ${
							activeTab === "store"
								? "border-neutral-900 text-neutral-950 font-semibold"
								: "border-transparent hover:text-neutral-900"
						}`}
					>
						<Plus className="w-3.5 h-3.5" />
						Store Memory
					</button>
					<button
						onClick={() => setActiveTab("bitemporal")}
						className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-all ${
							activeTab === "bitemporal"
								? "border-neutral-900 text-neutral-950 font-semibold"
								: "border-transparent hover:text-neutral-900"
						}`}
					>
						<Clock className="w-3.5 h-3.5" />
						Time Travel (valid_at)
					</button>
				</div>

				{/* Modal Body */}
				<div className="p-6 overflow-y-auto space-y-5">
					{activeTab === "search" && (
						<div className="space-y-4">
							<div>
								<label
									htmlFor="modal-memory-query"
									className="block text-xs font-semibold text-neutral-700 mb-1.5"
								>
									Natural Language Memory Query
								</label>
								<div className="relative">
									<Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
									<input
										id="modal-memory-query"
										type="text"
										value={query}
										onChange={(e) => setQuery(e.target.value)}
										placeholder="Search memories..."
										className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-400"
									/>
								</div>
							</div>

							{/* Alpha slider */}
							<div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
								<div className="flex justify-between text-xs font-medium text-neutral-700">
									<span className="flex items-center gap-1">
										<Sliders className="w-3.5 h-3.5 text-neutral-600" />
										Alpha Blending Parameter
									</span>
									<span className="font-mono text-neutral-900 font-semibold">
										{alpha}
									</span>
								</div>
								<input
									type="range"
									min="0"
									max="1"
									step="0.05"
									value={alpha}
									onChange={(e) => setAlpha(Number.parseFloat(e.target.value))}
									className="w-full accent-neutral-900 cursor-pointer h-1.5 bg-neutral-200 rounded-lg"
								/>
								<div className="flex justify-between text-[10px] text-neutral-500 font-mono">
									<span>BM25 Keywords (0.0)</span>
									<span>Dense Vector (1.0)</span>
								</div>
							</div>

							{/* Real-time Response Output */}
							<div className="space-y-1.5">
								<div className="flex items-center gap-1 text-xs font-semibold text-neutral-700">
									<Code2 className="w-3.5 h-3.5 text-neutral-600" />
									<span>REST API Output Payload</span>
								</div>
								<pre className="p-4 rounded-xl bg-neutral-950 text-emerald-400 text-xs font-mono overflow-x-auto">
									{JSON.stringify(
										{
											status: "success",
											operator: "hybrid_retrieve",
											namespace: "agent_user_491",
											query: query,
											alpha: alpha,
											matches: [
												{
													id: "mem_8912",
													content:
														"User prefers dark mode and concise TypeScript responses with functional components.",
													scores: {
														vector: 0.94,
														bm25: 0.88,
														hybrid: Number(
															(alpha * 0.94 + (1 - alpha) * 0.88).toFixed(3),
														),
													},
													bitemporal: {
														valid_at: "2026-08-10T14:30:00Z",
														system_at: "2026-08-10T14:30:02Z",
													},
												},
											],
										},
										null,
										2,
									)}
								</pre>
							</div>
						</div>
					)}

					{activeTab === "store" && (
						<form onSubmit={handleAddMemory} className="space-y-4">
							<div>
								<label
									htmlFor="modal-memory-payload"
									className="block text-xs font-semibold text-neutral-700 mb-1.5"
								>
									Memory Payload Content
								</label>
								<textarea
									id="modal-memory-payload"
									rows={3}
									value={newContent}
									onChange={(e) => setNewContent(e.target.value)}
									placeholder="Enter context or preferences to remember..."
									className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-400"
								/>
							</div>

							<button
								type="submit"
								disabled={!newContent.trim() || isProcessing}
								className="w-full py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
							>
								{isProcessing ? (
									<>
										<Sparkles className="w-3.5 h-3.5 animate-spin" />
										Generating Bitemporal Node Embeddings...
									</>
								) : (
									<>
										<Plus className="w-3.5 h-3.5" />
										Commit to Cognitive Graph
									</>
								)}
							</button>
						</form>
					)}

					{activeTab === "bitemporal" && (
						<div className="space-y-3 text-xs text-neutral-700">
							<div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
								<h4 className="font-semibold text-neutral-900 flex items-center gap-1.5">
									<Clock className="w-4 h-4" />
									Time Travel Query Simulator
								</h4>
								<p className="text-neutral-600 leading-relaxed text-xs">
									Query the memory state as it was on any historical timestamp
									without destructive overwrites.
								</p>
								<div className="mt-3 p-3 rounded-lg bg-neutral-950 text-emerald-400 font-mono text-[11px]">
									<code>
										client.query_at(query="system auth config",
										as_of="2026-08-01T00:00:00Z")
									</code>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
					<div className="flex items-center gap-1.5">
						<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
						<span>PiyAPI Engine Connected</span>
					</div>
					<button
						onClick={onClose}
						className="text-neutral-700 font-medium hover:text-neutral-950 cursor-pointer"
					>
						Close Sandbox
					</button>
				</div>
			</div>
		</div>
	)
}
