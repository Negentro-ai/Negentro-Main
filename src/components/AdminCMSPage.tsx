import { useState, useEffect } from "react"
import {
	ArrowLeft,
	ArrowUpRight,
	Check,
	ChevronDown,
	Clock3,
	FileText,
	Image,
	LayoutDashboard,
	MoreHorizontal,
	PanelsTopLeft,
	Plus,
	Search,
	Settings,
} from "lucide-react"
import { blogCategories, featuredArticles, latestInsights } from "@/data/blogArticles"
import { industryPages } from "@/data/industryPages"
import { getSupabase } from "@/lib/supabase"

type ContentKind = "articles" | "industries"
type ContentStatus = "Published" | "Draft"

export type CMSBlockType = "hero" | "text" | "image" | "list" | "faq" | "code" | "quote"

export interface CMSBlock {
	id: string
	type: CMSBlockType
	title?: string
	description?: string
	content?: string
	imageUrl?: string
	items?: { title: string; description?: string; value?: string }[]
}

interface CMSRecord {
	id: string
	kind: ContentKind
	title: string
	slug: string
	category: string
	summary: string
	status: ContentStatus
	updated: string
	image?: string
	blocks?: CMSBlock[]
}

const initialRecords: CMSRecord[] = [
	...featuredArticles.map((article) => ({
		id: article.id,
		kind: "articles" as const,
		title: article.title,
		slug: article.id,
		category: article.category,
		summary: article.description,
		status: "Published" as const,
		updated: article.date,
		image: article.image,
	})),
	...latestInsights.map((article) => ({
		id: article.id,
		kind: "articles" as const,
		title: article.title,
		slug: article.id,
		category: article.category,
		summary: article.description,
		status: "Published" as const,
		updated: article.date,
		image: article.image,
	})),
	...industryPages.map((industry) => ({
		id: industry.slug,
		kind: "industries" as const,
		title: industry.name,
		slug: industry.slug,
		category: "Industry",
		summary: industry.heroDescription,
		status: "Published" as const,
		updated: "Sep 27, 2026",
	})),
]

const formatDate = () =>
	new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date())

export const AdminCMSPage = () => {
	const [records, setRecords] = useState(initialRecords)
	const [activeKind, setActiveKind] = useState<ContentKind>("articles")
	const [selectedId, setSelectedId] = useState(initialRecords[0].id)
	const [searchQuery, setSearchQuery] = useState("")
	const [statusFilter, setStatusFilter] = useState<"All" | ContentStatus>("All")
	const [saveMessage, setSaveMessage] = useState("")

	useEffect(() => {
		const loadData = async () => {
			try {
				const client = await getSupabase()
				if (client) {
					const { data, error } = await client.from("cms_records").select("*").order("updated_at", { ascending: false })
					if (!error && data && data.length > 0) {
						// Map db records to CMSRecord format
						const mappedRecords = data.map((d: any) => ({
							id: d.slug, // Use slug as ID for compatibility
							kind: d.kind,
							title: d.title,
							slug: d.slug,
							category: d.category,
							summary: d.summary || "",
							status: d.status,
							updated: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(d.updated_at)),
							image: d.image,
							blocks: d.content?.blocks || [],
						}))
						setRecords(mappedRecords)
						setSelectedId(mappedRecords[0]?.id || "")
					}
				}
			} catch (e) {
				console.error("Failed to load CMS data from Supabase:", e)
			}
		}
		loadData()
	}, [])

	const activeRecords = records.filter((record) => record.kind === activeKind)
	const visibleRecords = activeRecords.filter((record) => {
		const search = searchQuery.trim().toLowerCase()
		const matchesSearch = !search || `${record.title} ${record.slug} ${record.category}`.toLowerCase().includes(search)
		return matchesSearch && (statusFilter === "All" || record.status === statusFilter)
	})
	const selectedRecord = records.find((record) => record.id === selectedId && record.kind === activeKind)
	const publishedCount = activeRecords.filter((record) => record.status === "Published").length
	const draftCount = activeRecords.filter((record) => record.status === "Draft").length

	const updateSelected = (changes: Partial<CMSRecord>) => {
		if (!selectedRecord) return
		setRecords((current) => current.map((record) =>
			record.id === selectedRecord.id ? { ...record, ...changes } : record,
		))
		setSaveMessage("")
	}

	const changeKind = (kind: ContentKind) => {
		setActiveKind(kind)
		setStatusFilter("All")
		setSearchQuery("")
		setSelectedId(records.find((record) => record.kind === kind)?.id ?? "")
		setSaveMessage("")
	}

	const createArticle = () => {
		const id = `untitled-${Date.now()}`
		const article: CMSRecord = {
			id,
			kind: "articles",
			title: "Untitled article",
			slug: id,
			category: "Research",
			summary: "",
			status: "Draft",
			updated: formatDate(),
			blocks: [],
		}
		setRecords((current) => [article, ...current])
		setActiveKind("articles")
		setStatusFilter("All")
		setSearchQuery("")
		setSelectedId(id)
		setSaveMessage("New draft created in this preview")
	}

	const saveSelected = async (status: ContentStatus) => {
		if (!selectedRecord) return
		
		const updatedRecord = { ...selectedRecord, status, updated: formatDate() }
		
		// Optimistic UI update
		setRecords((current) => current.map((record) =>
			record.id === selectedRecord.id ? updatedRecord : record,
		))
		
		setSaveMessage("Saving to database...")
		
		try {
			const client = await getSupabase()
			if (client) {
				// Upsert to Supabase
				const { error } = await client.from("cms_records").upsert({
					kind: updatedRecord.kind,
					title: updatedRecord.title,
					slug: updatedRecord.slug,
					category: updatedRecord.category,
					summary: updatedRecord.summary,
					status: updatedRecord.status,
					image: updatedRecord.image,
					content: { blocks: updatedRecord.blocks || [] },
					updated_at: new Date().toISOString()
				}, { onConflict: 'slug' })
				
				if (error) {
					console.error("Error saving to Supabase:", error)
					setSaveMessage("Failed to save to database. UI updated locally.")
					return
				}
			}
		} catch (e) {
			console.error("Supabase exception:", e)
		}
		
		setSaveMessage(status === "Published" ? "Published successfully" : "Draft saved successfully")
	}

	return (
		<div className="min-h-screen bg-[#f6f6f8] font-sans text-[#17171b] antialiased lg:flex">
			<aside className="hidden w-58 shrink-0 flex-col border-r border-[#e8e7ed] bg-white lg:flex">
				<div className="flex h-18 items-center gap-3 border-b border-[#eeedf2] px-5">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#765dfb] text-sm font-bold text-white">N</div>
					<div>
						<p className="text-[13px] font-semibold">Negentro</p>
						<p className="text-[10px] text-[#92909d]">CONTENT STUDIO</p>
					</div>
				</div>
				<div className="border-b border-[#eeedf2] px-4 py-4">
					<p className="px-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#a19fab]">Workspace</p>
					<div className="mt-3 flex items-center justify-between rounded-[7px] border border-[#e8e7ed] px-3 py-2.5">
						<div>
							<p className="text-xs font-medium">Negentro Website</p>
							<p className="mt-0.5 text-[10px] text-[#9693a0]">Content team</p>
						</div>
						<ChevronDown className="h-3.5 w-3.5 text-[#8b8896]" />
					</div>
				</div>
				<nav className="flex-1 space-y-1 px-3 py-5" aria-label="Content Studio">
					<p className="px-2 pb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#a19fab]">Manage</p>
					<button type="button" className="flex w-full items-center gap-3 rounded-[7px] bg-[#f0edff] px-3 py-2.5 text-left text-xs font-medium text-[#5e47d6]">
						<LayoutDashboard className="h-4 w-4" /> Overview
					</button>
					<button type="button" onClick={() => changeKind("articles")} className={`flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left text-xs transition-colors ${activeKind === "articles" ? "bg-[#f0edff] font-medium text-[#5e47d6]" : "text-[#686673] hover:bg-[#f6f5f8]"}`}>
						<FileText className="h-4 w-4" /> Blog articles
					</button>
					<button type="button" onClick={() => changeKind("industries")} className={`flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left text-xs transition-colors ${activeKind === "industries" ? "bg-[#f0edff] font-medium text-[#5e47d6]" : "text-[#686673] hover:bg-[#f6f5f8]"}`}>
						<PanelsTopLeft className="h-4 w-4" /> Industry pages
					</button>
					<button type="button" className="flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left text-xs text-[#686673] transition-colors hover:bg-[#f6f5f8]">
						<Image className="h-4 w-4" /> Media library
					</button>
				</nav>
				<div className="border-t border-[#eeedf2] p-3">
					<button type="button" className="flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left text-xs text-[#686673] transition-colors hover:bg-[#f6f5f8]">
						<Settings className="h-4 w-4" /> Settings
					</button>
					<a href="/" className="mt-1 flex items-center gap-3 rounded-[7px] px-3 py-2.5 text-xs text-[#686673] transition-colors hover:bg-[#f6f5f8]">
						<ArrowLeft className="h-4 w-4" /> View website
					</a>
				</div>
			</aside>

			<div className="min-w-0 flex-1">
				<header className="flex h-16 items-center justify-between border-b border-[#e8e7ed] bg-white px-5 sm:px-7">
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#765dfb] text-sm font-bold text-white lg:hidden">N</div>
						<p className="text-xs text-[#8f8c99]">Content Studio <span className="px-1.5">/</span> <span className="text-[#33323a]">Content</span></p>
					</div>
					<div className="flex items-center gap-3">
						<span className="hidden text-[10px] font-medium uppercase tracking-[0.08em] text-[#8e8b98] sm:inline">Preview workspace</span>
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ece9f4] text-[11px] font-semibold text-[#5c4db2]">NT</div>
					</div>
				</header>

				<main className="mx-auto max-w-[1600px] p-5 sm:p-7 xl:p-9">
					<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
						<div>
							<p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#765dfb]">Publishing</p>
							<h1 className="mt-2 text-[26px] font-semibold tracking-[-0.02em]">Content</h1>
							<p className="mt-1 text-[13px] text-[#777581]">Manage articles and industry pages for the Negentro website.</p>
						</div>
						<button type="button" onClick={createArticle} className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-[7px] bg-[#765dfb] px-4 text-xs font-medium text-white transition-colors hover:bg-[#644de0] sm:self-auto">
							<Plus className="h-4 w-4" /> New article
						</button>
					</div>

					<div className="mt-7 grid gap-3 sm:grid-cols-3">
						{[
											{ label: "Total content", value: activeRecords.length },
							{ label: "Published", value: publishedCount },
							{ label: "Drafts", value: draftCount },
						].map((metric) => (
							<div key={metric.label} className="border-y border-[#e5e3e9] py-3 sm:border-y-0 sm:border-l sm:pl-5 first:sm:border-l-0 first:sm:pl-0">
												<p className="text-[10px] uppercase tracking-widest text-[#8d8a96]">{metric.label}</p>
								<p className="mt-1 text-[22px] font-semibold">{metric.value}</p>
							</div>
						))}
					</div>

					<div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#dedce4]">
						<div className="flex gap-5">
							{(["articles", "industries"] as const).map((kind) => (
								<button key={kind} type="button" onClick={() => changeKind(kind)} className={`border-b-2 px-1 pb-3 text-xs font-medium capitalize transition-colors ${activeKind === kind ? "border-[#765dfb] text-[#5e47d6]" : "border-transparent text-[#777581] hover:text-[#24232a]"}`}>
									{kind === "articles" ? "Blog articles" : "Industry pages"}
								</button>
							))}
						</div>
						<p className="pb-3 text-[10px] text-[#9996a1]">CONTENT LIST</p>
					</div>

					<div className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
						<section className="min-w-0 flex flex-col">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<label className="flex h-9 min-w-0 items-center gap-2 rounded-md border border-[#dedce4] bg-white px-3 text-[#92909b] sm:max-w-[320px] sm:flex-1">
									<Search className="h-3.5 w-3.5 shrink-0" />
									<input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search content" className="w-full bg-transparent text-xs text-[#28272e] outline-none placeholder:text-[#aaa8b1]" />
								</label>
								<div className="flex items-center gap-2">
									<span className="text-[10px] uppercase tracking-[0.08em] text-[#9996a1]">Status</span>
									<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "All" | ContentStatus)} className="h-9 rounded-md border border-[#dedce4] bg-white px-3 text-xs text-[#44434a] outline-none focus:border-[#765dfb]">
										<option value="All">All statuses</option>
										<option value="Published">Published</option>
										<option value="Draft">Draft</option>
									</select>
								</div>
							</div>

							<div className="mt-3 overflow-hidden rounded-lg border border-[#e6e4eb] bg-white">
								<div className="hidden grid-cols-[minmax(0,1fr)_110px_130px_105px] gap-3 border-b border-[#eeedf2] bg-[#fbfafc] px-4 py-3 text-[9px] font-medium uppercase tracking-widest text-[#9a97a2] sm:grid">
									<span>Title</span><span>Type</span><span>Updated</span><span>Status</span>
								</div>
								{visibleRecords.map((record) => (
									<button key={record.id} type="button" onClick={() => { setSelectedId(record.id); setSaveMessage("") }} className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[#f0eff3] px-4 py-3 text-left transition-colors last:border-b-0 sm:grid-cols-[minmax(0,1fr)_110px_130px_105px] ${selectedRecord?.id === record.id ? "bg-[#f8f6ff]" : "hover:bg-[#fbfafc]"}`}>
										<span className="flex min-w-0 items-center gap-3">
												<span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#eeedf2] bg-[#f5f3f9]">
												{record.image ? <img src={record.image} alt="" className="h-full w-full object-cover" /> : <PanelsTopLeft className="h-4 w-4 text-[#9189bd]" />}
											</span>
											<span className="min-w-0">
												<span className="block truncate text-xs font-medium text-[#28272e]">{record.title}</span>
												<span className="mt-1 block truncate text-[10px] text-[#9a97a2]">/{record.slug}</span>
											</span>
										</span>
										<span className="hidden text-[11px] text-[#777581] sm:block">{record.kind === "articles" ? record.category : "Industry"}</span>
										<span className="hidden text-[11px] text-[#777581] sm:block">{record.updated}</span>
										<span className={`justify-self-end rounded-full px-2.5 py-1 text-[9px] font-medium ${record.status === "Published" ? "bg-[#e8f4ec] text-[#327048]" : "bg-[#fff3dc] text-[#9a6712]"}`}>{record.status}</span>
									</button>
								))}
								{visibleRecords.length === 0 && <p className="px-4 py-10 text-center text-xs text-[#898691]">No content matches these filters.</p>}
							</div>
						</section>

						<aside className="rounded-lg border border-[#e6e4eb] bg-white p-5">
							{selectedRecord ? (
								<>
									<div className="flex items-start justify-between gap-3 border-b border-[#eeedf2] pb-4">
										<div>
										<p className="text-[9px] font-medium uppercase tracking-widest text-[#765dfb]">{selectedRecord.kind === "articles" ? "Article details" : "Industry page details"}</p>
											<h2 className="mt-1 text-sm font-semibold">Edit content</h2>
										</div>
										<MoreHorizontal className="h-4 w-4 text-[#898691]" />
									</div>
									<div className="mt-4 space-y-4">
										<label className="block">
											<span className="text-[10px] font-medium text-[#777581]">Title</span>
											<input value={selectedRecord.title} onChange={(event) => updateSelected({ title: event.target.value })} className="mt-1.5 h-9 w-full rounded-md border border-[#dedce4] px-3 text-xs outline-none focus:border-[#765dfb]" />
										</label>
										<label className="block">
											<span className="text-[10px] font-medium text-[#777581]">URL slug</span>
											<div className="mt-1.5 flex h-9 items-center rounded-md border border-[#dedce4] px-3 focus-within:border-[#765dfb]">
												<span className="mr-1 text-[10px] text-[#a4a1ac]">/</span>
												<input value={selectedRecord.slug} onChange={(event) => updateSelected({ slug: event.target.value })} className="min-w-0 flex-1 text-xs outline-none" />
											</div>
										</label>
										<label className="block">
											<span className="text-[10px] font-medium text-[#777581]">{selectedRecord.kind === "articles" ? "Category" : "Page type"}</span>
											<select value={selectedRecord.category} onChange={(event) => updateSelected({ category: event.target.value })} className="mt-1.5 h-9 w-full rounded-md border border-[#dedce4] bg-white px-3 text-xs outline-none focus:border-[#765dfb]">
												{(selectedRecord.kind === "articles" ? blogCategories.filter((category) => category !== "All") : ["Industry"]).map((category) => <option key={category} value={category}>{category}</option>)}
											</select>
										</label>
										<label className="block">
											<span className="text-[10px] font-medium text-[#777581]">Summary</span>
											<textarea value={selectedRecord.summary} onChange={(event) => updateSelected({ summary: event.target.value })} rows={3} className="mt-1.5 w-full resize-y rounded-md border border-[#dedce4] px-3 py-2 text-xs leading-relaxed outline-none focus:border-[#765dfb]" />
										</label>
									</div>

									{/* Blocks Editor */}
									<div className="mt-6 border-t border-[#eeedf2] pt-6">
										<div className="flex items-center justify-between mb-4">
											<h3 className="text-xs font-semibold text-[#28272e]">Page Sections (Blocks)</h3>
											<div className="relative group">
												<button className="flex h-6 items-center gap-1 rounded bg-[#f5f3f9] px-2 text-[10px] font-medium text-[#5e47d6] hover:bg-[#ece9f4]">
													<Plus className="h-3 w-3" /> Add section
												</button>
												<div className="absolute right-0 top-full mt-1 hidden w-32 flex-col rounded-md border border-[#dedce4] bg-white p-1 shadow-lg group-hover:flex z-10">
													{(["hero", "text", "image", "list", "faq", "code", "quote"] as const).map((type) => (
														<button key={type} onClick={() => updateSelected({ blocks: [...(selectedRecord.blocks || []), { id: Date.now().toString(), type, items: [] }] })} className="px-2 py-1.5 text-left text-[10px] capitalize hover:bg-[#f6f5f8] rounded">
															{type} block
														</button>
													))}
												</div>
											</div>
										</div>
										<div className="flex flex-col gap-4">
											{selectedRecord.blocks?.map((block, index) => (
												<div key={block.id} className="rounded-md border border-[#e6e4eb] bg-[#fbfafc] p-3">
													<div className="flex items-center justify-between mb-3 border-b border-[#eeedf2] pb-2">
														<span className="text-[10px] font-bold uppercase tracking-wider text-[#765dfb]">{block.type}</span>
														<button onClick={() => updateSelected({ blocks: selectedRecord.blocks?.filter((_, i) => i !== index) })} className="text-[10px] text-red-500 hover:underline">Remove</button>
													</div>
													
													<div className="space-y-3">
														{(block.type === "hero" || block.type === "list" || block.type === "image") && (
															<input placeholder="Section Title" value={block.title || ""} onChange={(e) => { const newB = [...(selectedRecord.blocks || [])]; newB[index].title = e.target.value; updateSelected({ blocks: newB }) }} className="w-full rounded border border-[#dedce4] px-2 py-1.5 text-[11px] outline-none" />
														)}
														{(block.type === "text" || block.type === "quote" || block.type === "code" || block.type === "hero") && (
															<textarea placeholder={block.type === "code" ? "Paste code here..." : "Content / Description"} value={block.content || ""} onChange={(e) => { const newB = [...(selectedRecord.blocks || [])]; newB[index].content = e.target.value; updateSelected({ blocks: newB }) }} rows={3} className="w-full resize-y rounded border border-[#dedce4] px-2 py-1.5 text-[11px] outline-none" />
														)}
														{(block.type === "image" || block.type === "hero") && (
															<input placeholder="Image URL" value={block.imageUrl || ""} onChange={(e) => { const newB = [...(selectedRecord.blocks || [])]; newB[index].imageUrl = e.target.value; updateSelected({ blocks: newB }) }} className="w-full rounded border border-[#dedce4] px-2 py-1.5 text-[11px] outline-none" />
														)}
														{(block.type === "list" || block.type === "faq") && (
															<div className="space-y-2 border-t border-[#eeedf2] pt-2">
																<p className="text-[10px] font-medium text-[#777581]">Items</p>
																{block.items?.map((item, iIndex) => (
																	<div key={iIndex} className="flex gap-2">
																		<input placeholder="Title/Question" value={item.title} onChange={(e) => { const newB = [...(selectedRecord.blocks || [])]; newB[index].items![iIndex].title = e.target.value; updateSelected({ blocks: newB }) }} className="flex-1 rounded border border-[#dedce4] px-2 py-1 text-[10px] outline-none" />
																		<input placeholder="Description/Answer" value={item.description || ""} onChange={(e) => { const newB = [...(selectedRecord.blocks || [])]; newB[index].items![iIndex].description = e.target.value; updateSelected({ blocks: newB }) }} className="flex-1 rounded border border-[#dedce4] px-2 py-1 text-[10px] outline-none" />
																		<button onClick={() => { const newB = [...(selectedRecord.blocks || [])]; newB[index].items = newB[index].items?.filter((_, idx) => idx !== iIndex); updateSelected({ blocks: newB }) }} className="text-[10px] text-red-500">X</button>
																	</div>
																))}
																<button onClick={() => { const newB = [...(selectedRecord.blocks || [])]; newB[index].items = [...(newB[index].items || []), { title: "" }]; updateSelected({ blocks: newB }) }} className="text-[10px] font-medium text-[#5e47d6] hover:underline">+ Add item</button>
															</div>
														)}
													</div>
												</div>
											))}
											{(!selectedRecord.blocks || selectedRecord.blocks.length === 0) && (
												<p className="text-[11px] text-[#9996a1] text-center py-4 border border-dashed border-[#dedce4] rounded-md">No content sections added yet. Use the block builder to add text, images, or lists.</p>
											)}
										</div>
									</div>

									<div className="mt-6 flex flex-col gap-2 border-t border-[#eeedf2] pt-4">
										<button type="button" onClick={() => saveSelected("Published")} className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#765dfb] text-xs font-medium text-white transition-colors hover:bg-[#644de0]">
											<Check className="h-3.5 w-3.5" /> Publish
										</button>
										<button type="button" onClick={() => saveSelected("Draft")} className="h-9 rounded-md border border-[#dedce4] text-xs font-medium text-[#4c4a54] transition-colors hover:bg-[#faf9fc]">Save as draft</button>
										<button type="button" className="inline-flex h-8 items-center justify-center gap-2 text-[10px] text-[#898691] hover:text-[#5e47d6]"><ArrowUpRight className="h-3 w-3" /> Preview</button>
										{saveMessage && <p role="status" className="text-center text-[10px] text-[#5e47d6]">{saveMessage}</p>}
									</div>
								</>
							) : (
								<div className="flex min-h-65 flex-col items-center justify-center text-center">
									<Clock3 className="h-5 w-5 text-[#aaa7b2]" />
									<p className="mt-3 text-xs font-medium">Select an item to edit</p>
									<p className="mt-1 max-w-52.5 text-[10px] leading-relaxed text-[#898691]">Choose an article or industry page from the list.</p>
								</div>
							)}
						</aside>
					</div>
				</main>
			</div>
		</div>
	)
}