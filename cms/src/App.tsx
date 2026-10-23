import { useState, useEffect, useRef } from "react"
import type React from "react"
import {
	ArrowLeft,
	ArrowUpRight,
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Clock3,
	Command,
	Database,
	ExternalLink,
	FileText,
	Globe,
	LayoutDashboard,
	LogOut,
	MoreHorizontal,
	PanelsTopLeft,
	Plus,
	Search,
	ShieldCheck,
	Sparkles,
	Users,
	Settings,
	UploadCloud,
	Loader2,
} from "lucide-react"
import { blogCategories } from "@/data/blogArticles"
import { industryPages } from "@/data/industryPages"
import { BlogArticlePage } from "./components/BlogArticlePage"
import { IndustryPage } from "./components/IndustryPage"
import { getSupabase } from "@/lib/supabase"

type ContentKind = "dashboard" | "articles" | "industries" | "team"
type ContentStatus = "Published" | "Draft"

export type CMSBlockType =
	| "hero"
	| "text"
	| "image"
	| "list"
	| "faq"
	| "code"
	| "quote"

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
	tags?: string
	author?: string
	featured?: boolean
	publishDate?: string
	metaTitle?: string
	focusKeyword?: string
}

export type UserRole = "Super Admin" | "Admin" | "Editor" | "Viewer"

export interface TeamMember {
	id: string
	email: string
	name?: string
	role: UserRole
	status: "Active" | "Pending"
	joinedAt?: string
}

const initialTeam: TeamMember[] = [
	{
		id: "1",
		email: "admin@negentro.com",
		name: "Alice Founder",
		role: "Super Admin",
		status: "Active",
		joinedAt: "Jan 10, 2026",
	},
	{
		id: "2",
		email: "marketing@negentro.com",
		name: "Bob Marketer",
		role: "Admin",
		status: "Active",
		joinedAt: "Mar 15, 2026",
	},
	{
		id: "3",
		email: "writer@negentro.com",
		name: "Charlie Writer",
		role: "Editor",
		status: "Active",
		joinedAt: "Aug 02, 2026",
	},
]

const formatDate = () =>
	new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date())

// Image Upload Component
const convertToWebp = async (file: File): Promise<Blob> => {
	return new Promise((resolve, reject) => {
		const img = new window.Image()
		img.src = URL.createObjectURL(file)
		img.onload = () => {
			const canvas = document.createElement("canvas")
			canvas.width = img.width
			canvas.height = img.height
			const ctx = canvas.getContext("2d")
			if (!ctx) return reject(new Error("Canvas ctx failed"))
			ctx.drawImage(img, 0, 0)
			canvas.toBlob(
				(blob) => {
					if (blob) resolve(blob)
					else reject(new Error("Blob conversion failed"))
				},
				"image/webp",
				0.8,
			)
		}
		img.onerror = (e) => reject(e)
	})
}

const ImageUploadInput = ({
	value,
	onChange,
	placeholder,
}: {
	value: string
	onChange: (v: string) => void
	placeholder?: string
}) => {
	const [isUploading, setIsUploading] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		setIsUploading(true)
		try {
			// Convert PNG/JPEG to WebP
			let uploadBlob: Blob = file
			if (file.type === "image/png" || file.type === "image/jpeg") {
				uploadBlob = await convertToWebp(file)
			}

			// Generate unique filename
			const ext =
				uploadBlob.type === "image/webp" ? "webp" : file.name.split(".").pop()
			const filename = `cms-upload-${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

			// Upload to Supabase Storage
			const client = await getSupabase()
			if (!client) throw new Error("Supabase is not configured.")

			const { data, error } = await client.storage
				.from("media")
				.upload(filename, uploadBlob, {
					contentType: uploadBlob.type,
					upsert: true,
				})

			if (error) throw error

			const { data: urlData } = client.storage
				.from("media")
				.getPublicUrl(data.path)
			onChange(urlData.publicUrl)
		} catch (error: any) {
			console.error("Image upload failed:", error)
			alert(
				"Upload failed: " +
					error.message +
					"\n(Please ensure the 'media' storage bucket exists in your Supabase dashboard and has public policies)",
			)
		} finally {
			setIsUploading(false)
			if (fileInputRef.current) fileInputRef.current.value = ""
		}
	}

	const handleDelete = async () => {
		if (!value) return

		// Optional: Extract filename if it's a Supabase storage URL
		// URL format: .../storage/v1/object/public/media/filename.webp
		try {
			setIsUploading(true)
			if (value.includes("/storage/v1/object/public/media/")) {
				const parts = value.split("/storage/v1/object/public/media/")
				if (parts.length === 2) {
					const filename = parts[1]
					const client = await getSupabase()
					if (client) {
						await client.storage.from("media").remove([filename])
					}
				}
			}
		} catch (error) {
			console.error("Failed to delete from storage:", error)
		} finally {
			setIsUploading(false)
			onChange("")
		}
	}

	return (
		<div className="flex gap-2 w-full mt-2">
			<input
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="min-w-0 flex-1 rounded-md border border-[#E7E3F5] px-3.5 py-2 text-[14px] outline-none focus:border-[#765DFB] bg-transparent"
			/>
			<input
				type="file"
				accept="image/png, image/jpeg, image/webp"
				ref={fileInputRef}
				onChange={handleUpload}
				className="hidden"
			/>
			{value && (
				<button
					type="button"
					onClick={handleDelete}
					disabled={isUploading}
					className="flex shrink-0 items-center justify-center rounded-md border border-red-200 bg-red-50 px-3 text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
					title="Delete Image"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M3 6h18" />
						<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
						<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
					</svg>
				</button>
			)}
			<button
				type="button"
				onClick={() => fileInputRef.current?.click()}
				disabled={isUploading}
				className="flex shrink-0 items-center gap-2 rounded-md border border-[#E7E3F5] bg-zinc-100 bg-[#F9F8FF]/80 px-4 text-[13px] font-medium text-[#444759] transition-colors hover:bg-zinc-200 disabled:opacity-50"
			>
				{isUploading ? (
					<Loader2 className="h-4 w-4 animate-spin" />
				) : (
					<UploadCloud className="h-4 w-4" />
				)}
				{isUploading ? "Uploading..." : "Upload"}
			</button>
		</div>
	)
}

const ArticlesListView = ({
	records,
	searchQuery,
	setSearchQuery,
	statusFilter,
	setStatusFilter,
	onEdit,
	onCreate,
}: {
	records: CMSRecord[]
	searchQuery: string
	setSearchQuery: (q: string) => void
	statusFilter: string
	setStatusFilter: (s: any) => void
	onEdit: (id: string) => void
	onCreate: () => void
}) => {
	const [selectedRecords, setSelectedRecords] = useState<string[]>([])
	const [categoryFilter, setCategoryFilter] = useState("All")
	const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

	const categories = Array.from(
		new Set(records.map((r) => r.category).filter(Boolean)),
	)

	const displayedRecords = records
		.filter((r) => categoryFilter === "All" || r.category === categoryFilter)
		.sort((a, b) => {
			const timeA = new Date(a.updated).getTime() || 0
			const timeB = new Date(b.updated).getTime() || 0
			return sortOrder === "newest" ? timeB - timeA : timeA - timeB
		})

	const toggleSelectAll = () => {
		if (selectedRecords.length === displayedRecords.length) setSelectedRecords([])
		else setSelectedRecords(displayedRecords.map((r) => r.id))
	}

	const toggleSelect = (id: string, e: React.MouseEvent) => {
		e.stopPropagation()
		if (selectedRecords.includes(id))
			setSelectedRecords(selectedRecords.filter((rId) => rId !== id))
		else setSelectedRecords([...selectedRecords, id])
	}

	return (
		<div className="w-full max-w-[1400px] mx-auto space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-[#00050E]">
						Articles
					</h1>
					<p className="text-sm text-[#444759] mt-1">
						Manage all your blog posts and articles.
					</p>
				</div>
				<button
					type="button"
					onClick={onCreate}
					className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#1d4ed8] px-4 text-[14px] font-medium text-white transition-all hover:bg-blue-700 cursor-pointer"
				>
					<Plus className="h-4 w-4" /> Create Article
				</button>
			</div>

			{/* Filters Bar */}
			<div className="flex flex-col sm:flex-row sm:items-center gap-3">
				<div className="relative flex-1 max-w-md">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
					<input
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search by title..."
						className="w-full h-10 pl-9 pr-4 rounded-md border border-[#E7E3F5] bg-white/85 backdrop-blur-md text-sm text-[#00050E] outline-none focus:border-blue-500"
					/>
				</div>
				<div className="flex items-center gap-3">
					<select
						value={categoryFilter}
						onChange={(e) => setCategoryFilter(e.target.value)}
						className="h-10 rounded-md border border-[#E7E3F5] bg-white/85 backdrop-blur-md px-3 py-2 text-sm text-[#444759] outline-none w-40"
					>
						<option value="All">All Categories</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="h-10 rounded-md border border-[#E7E3F5] bg-white/85 backdrop-blur-md px-3 py-2 text-sm text-[#444759] outline-none w-36"
					>
						<option value="All">All Status</option>
						<option value="Published">Published</option>
						<option value="Draft">Draft</option>
					</select>
					<select
						value={sortOrder}
						onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
						className="h-10 rounded-md border border-[#E7E3F5] bg-white/85 backdrop-blur-md px-3 py-2 text-sm text-[#444759] outline-none w-32"
					>
						<option value="newest">Newest</option>
						<option value="oldest">Oldest</option>
					</select>
				</div>
			</div>

			{/* Bulk Actions & Pagination */}
			<div className="flex items-center justify-between py-2">
				<div className="flex items-center gap-4">
					<button
						onClick={toggleSelectAll}
						className={`w-4 h-4 rounded border ${selectedRecords.length === displayedRecords.length && displayedRecords.length > 0 ? "bg-blue-600 border-blue-600" : "border-zinc-300 "} flex items-center justify-center`}
					>
						{selectedRecords.length === displayedRecords.length &&
							displayedRecords.length > 0 && <Check className="h-3 w-3 text-white" />}
					</button>
					<span className="text-xs text-[#6b6e80]">
						{selectedRecords.length > 0 ? `${selectedRecords.length} selected` : "Select all"}
					</span>
				</div>
				<div className="flex items-center gap-4 text-sm text-[#444759]">
					<span>
						Showing 1-{displayedRecords.length} of {displayedRecords.length}
					</span>
				</div>
			</div>

			{/* Table */}
			<div className="bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-sm whitespace-nowrap">
						<thead className="bg-zinc-50/50 bg-[#F9F8FF]/80/30 text-[#444759] border-b border-[#E7E3F5]">
							<tr>
								<th className="px-5 py-4 w-12" />
								<th className="px-5 py-4 font-medium">Title</th>
								<th className="px-5 py-4 font-medium">Author</th>
								<th className="px-5 py-4 font-medium">Category</th>
								<th className="px-5 py-4 font-medium">Tags</th>
								<th className="px-5 py-4 font-medium">Status</th>
								<th className="px-5 py-4 font-medium">Updated</th>
								<th className="px-5 py-4 w-12" />
							</tr>
						</thead>
						<tbody className="divide-y divide-[#E7E3F5]">
							{displayedRecords.map((record) => (
								<tr
									key={record.id}
									onClick={() => onEdit(record.id)}
									className="hover:bg-[#F9F8FF]/80 transition-colors cursor-pointer group"
								>
									<td className="px-5 py-4">
										<button
											onClick={(e) => toggleSelect(record.id, e)}
											className={`w-4 h-4 rounded border ${selectedRecords.includes(record.id) ? "bg-blue-600 border-blue-600" : "border-zinc-300 "} flex items-center justify-center`}
										>
											{selectedRecords.includes(record.id) && (
												<Check className="h-3 w-3 text-white" />
											)}
										</button>
									</td>
									<td className="px-5 py-4">
										<div className="flex items-center gap-3">
											<div className="h-10 w-12 rounded bg-zinc-200 bg-[#F9F8FF]/80 overflow-hidden shrink-0">
												{record.image ? (
													<img
														src={record.image}
														className="w-full h-full object-cover"
														alt=""
													/>
												) : (
													<div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-purple-500/20" />
												)}
											</div>
											<div className="max-w-[320px]">
												<p className="font-medium text-[#00050E] truncate group-hover:text-blue-600 transition-colors">
													{record.title}
												</p>
												<p className="text-xs text-[#6b6e80] mt-0.5 truncate">
													{record.summary || "No summary available..."}
												</p>
											</div>
										</div>
									</td>
									<td className="px-5 py-4">
										<div className="flex items-center gap-2">
											<div className="h-6 w-6 rounded-full bg-[#765DFB]/10 text-[#765DFB] flex items-center justify-center text-xs font-bold">
												{(record.author || "N").charAt(0).toUpperCase()}
											</div>
											<span className="text-[#444759]">
												{record.author || "Negentro Team"}
											</span>
										</div>
									</td>
									<td className="px-5 py-4 text-[#444759]">
										{record.category || "—"}
									</td>
									<td className="px-5 py-4">
										{record.tags ? (
											<div className="flex flex-wrap gap-1.5 max-w-[160px]">
												{record.tags
													.split(",")
													.map((t) => t.trim())
													.filter(Boolean)
													.slice(0, 2)
													.map((tag, idx) => (
														<span
															key={idx}
															className="px-2 py-0.5 rounded bg-[#765DFB]/10 text-[#765DFB] text-xs font-medium"
														>
															{tag}
														</span>
													))}
											</div>
										) : (
											<span className="text-xs text-zinc-400">—</span>
										)}
									</td>
									<td className="px-5 py-4">
										<span
											className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${record.status === "Published" ? "bg-emerald-100 text-emerald-700 " : "bg-amber-100 text-amber-700 "}`}
										>
											{record.status}
										</span>
									</td>
									<td className="px-5 py-4 text-[#444759] text-xs">
										{record.updated}
									</td>
									<td className="px-5 py-4">
										<button className="text-zinc-400 hover:text-zinc-600 ">
											<MoreHorizontal className="h-4 w-4" />
										</button>
									</td>
								</tr>
							))}
							{displayedRecords.length === 0 && (
								<tr>
									<td
										colSpan={8}
										className="px-5 py-12 text-center text-zinc-500"
									>
										No articles found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

const DashboardView = ({
	records,
	session,
	userRole,
	onCreateArticle,
	onCreateIndustry,
	onChangeKind,
	onSelectArticle,
	onRefreshData,
	isSyncing,
}: {
	records: CMSRecord[]
	session?: any
	userRole?: string
	onCreateArticle: () => void
	onCreateIndustry: () => void
	onChangeKind: (kind: string) => void
	onSelectArticle: (id: string, kind: ContentKind) => void
	onRefreshData: () => Promise<void>
	isSyncing: boolean
}) => {
	const articles = records.filter((r) => r.kind === "articles")
	const published = articles.filter((r) => r.status === "Published")
	const drafts = articles.filter((r) => r.status === "Draft")
	const industries = records.filter((r) => r.kind === "industries")

	const getGreeting = () => {
		const hour = new Date().getHours()
		if (hour >= 5 && hour < 12) return "Good morning"
		if (hour >= 12 && hour < 17) return "Good afternoon"
		if (hour >= 17 && hour < 22) return "Good evening"
		return "Good evening"
	}

	const rawName =
		session?.user?.user_metadata?.full_name ||
		session?.user?.user_metadata?.name ||
		(session?.user?.email ? session.user.email.split("@")[0] : "Admin")

	const displayName = rawName
		? rawName
				.replace(/[._-]/g, " ")
				.split(" ")
				.filter(Boolean)
				.map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
				.join(" ")
		: "Admin"

	const greeting = getGreeting()

	const categoryCounts = articles.reduce(
		(acc, r) => {
			if (r.category) acc[r.category] = (acc[r.category] || 0) + 1
			return acc
		},
		{} as Record<string, number>,
	)
	const topCategories = Object.entries(categoryCounts)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 4)
		.map(([name, count], i) => {
			const colors = [
				"bg-blue-500",
				"bg-emerald-500",
				"bg-amber-500",
				"bg-violet-500",
			]
			return {
				name,
				count,
				percent: Math.round((count / (articles.length || 1)) * 100),
				color: colors[i % colors.length],
			}
		})

	const recentActivity = records.slice(0, 5).map((r) => ({
		user: r.author || "Admin",
		action: r.status === "Published" ? "published" : "updated draft",
		target: r.title,
		time: r.updated,
		id: r.id,
		kind: r.kind,
	}))

	return (
		<div className="max-w-7xl mx-auto space-y-6">
			{/* Header with Real Database Sync Button */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-[#00050E]">
						{greeting}, {displayName}! 👋
					</h1>
					<p className="text-sm text-[#444759] mt-1">
						{records.length > 0
							? `Here's what's currently stored in your Supabase database • ${records.length} total (${published.length} published, ${drafts.length} drafts).`
							: "Here's what's currently stored in your Supabase database."}
					</p>
				</div>
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={onRefreshData}
						disabled={isSyncing}
						className="inline-flex items-center gap-2 rounded-xl border border-[#E7E3F5] bg-white px-3.5 py-2 text-xs font-semibold text-[#555268] shadow-xs hover:border-[#765DFB]/40 hover:text-[#765DFB] active:scale-95 transition-all cursor-pointer disabled:opacity-60"
					>
						<Database className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin text-[#765DFB]" : ""}`} />
						<span>{isSyncing ? "Syncing..." : "Sync Database"}</span>
					</button>
					<button
						type="button"
						onClick={onCreateArticle}
						className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#765DFB] to-[#4846AC] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[#765DFB]/25 hover:shadow-lg hover:shadow-[#765DFB]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
					>
						<Plus className="h-3.5 w-3.5" />
						<span>New article</span>
					</button>
				</div>
			</div>

			{/* Real Database Stats Row */}
			<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{[
					{
						label: "Total Articles",
						value: articles.length,
						badge: "Database",
						color: "text-[#765DFB]",
						bg: "bg-[#765DFB]/10",
						icon: <FileText className="h-5 w-5" />,
						desc: `${Object.keys(categoryCounts).length} Categories`,
					},
					{
						label: "Published",
						value: published.length,
						badge: "Live",
						color: "text-emerald-600",
						bg: "bg-emerald-100",
						icon: <Check className="h-5 w-5" />,
						desc: "Active on live website",
					},
					{
						label: "Drafts",
						value: drafts.length,
						badge: "Draft",
						color: "text-amber-600",
						bg: "bg-amber-100",
						icon: <Clock3 className="h-5 w-5" />,
						desc: drafts.length > 0 ? "Pending review" : "All content live",
					},
					{
						label: "Industry Pages",
						value: industries.length,
						badge: "Live",
						color: "text-blue-600",
						bg: "bg-blue-100",
						icon: <PanelsTopLeft className="h-5 w-5" />,
						desc: "Production landing pages",
					},
				].map((stat, i) => (
					<div
						key={i}
						className="bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] p-5 shadow-xs"
					>
						<div className="flex items-center gap-4">
							<div
								className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color} shadow-xs`}
							>
								{stat.icon}
							</div>
							<div>
								<p className="text-xs font-semibold uppercase tracking-wider text-[#787588]">
									{stat.label}
								</p>
								<p className="text-2xl font-bold text-[#00050E] mt-0.5">
									{stat.value}
								</p>
							</div>
						</div>
						<div className="mt-3.5 flex items-center justify-between border-t border-[#E7E3F5]/60 pt-2.5 text-xs">
							<span className="text-[#555268]">{stat.desc}</span>
							<span className="font-semibold text-[#765DFB] bg-[#765DFB]/10 px-2 py-0.5 rounded-full text-[10px]">
								{stat.badge}
							</span>
						</div>
					</div>
				))}
			</div>

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Recent Articles Table (Spans 2 columns) */}
				<div className="lg:col-span-2 bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] shadow-sm overflow-hidden flex flex-col">
					<div className="flex items-center justify-between p-5 border-b border-[#E7E3F5]">
						<h2 className="font-semibold text-[#00050E]">
							Recent Articles
						</h2>
						<button
							onClick={() => onChangeKind("articles")}
							className="text-sm font-medium text-[#765DFB] hover:text-[#765DFB] transition-colors"
						>
							View all →
						</button>
					</div>
					<div className="overflow-x-auto flex-1">
						<table className="w-full text-left text-sm whitespace-nowrap">
							<thead className="bg-zinc-50 bg-[#F9F8FF]/80/50 text-[#444759] border-b border-[#E7E3F5]">
								<tr>
									<th className="px-5 py-3 font-medium">Title</th>
									<th className="px-5 py-3 font-medium">Status</th>
									<th className="px-5 py-3 font-medium text-right">Updated</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-[#E7E3F5]">
								{articles.slice(0, 5).map((article) => (
									<tr
										key={article.id}
										className="hover:bg-[#F9F8FF]/80 transition-colors"
									>
										<td className="px-5 py-4">
											<div className="flex items-center gap-3">
												<div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#765DFB]/15 via-[#6850EB]/10 to-[#ECCDF5]/30 border border-[#765DFB]/20 flex items-center justify-center text-[#765DFB] shadow-xs shrink-0">
													<FileText className="h-4 w-4" />
												</div>
												<div className="truncate max-w-[200px] sm:max-w-[300px]">
													<p
														className="font-semibold text-[#00050E] truncate hover:text-[#765DFB] cursor-pointer transition-colors"
														onClick={() => {
															onChangeKind("articles")
														}}
													>
														{article.title}
													</p>
													<p className="text-xs text-[#787588] mt-0.5 truncate flex items-center gap-1.5">
														<span className="font-mono text-[#765DFB]">/{article.slug}</span>
														{article.category && <span>• {article.category}</span>}
													</p>
												</div>
											</div>
										</td>
										<td className="px-5 py-4">
											<span
												className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${article.status === "Published" ? "bg-emerald-100 text-emerald-700 " : "bg-amber-100 text-amber-700 "}`}
											>
												{article.status}
											</span>
										</td>
										<td className="px-5 py-4 text-right text-[#444759] text-xs">
											{article.updated}
										</td>
									</tr>
								))}
								{articles.length === 0 && (
									<tr>
										<td
											colSpan={3}
											className="px-5 py-8 text-center text-[#444759]"
										>
											No articles found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Right Column */}
				<div className="space-y-6">
					{/* Drafts & Scheduled */}
					<div className="bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] shadow-sm p-5">
						<h2 className="font-semibold text-[#00050E] mb-4">
							Drafts & Scheduled
						</h2>
						<div className="space-y-4">
							{drafts.slice(0, 3).map((draft) => (
								<div key={draft.id} className="flex gap-3">
									<div className="h-8 w-8 rounded bg-amber-100 flex items-center justify-center shrink-0">
										<FileText className="h-4 w-4 text-amber-600 " />
									</div>
									<div className="min-w-0">
										<p className="text-sm font-medium text-[#00050E] truncate">
											{draft.title}
										</p>
										<p className="text-xs text-[#444759] mt-0.5">
											Updated {draft.updated}
										</p>
									</div>
								</div>
							))}
							{drafts.length === 0 && (
								<p className="text-sm text-[#444759]">
									No drafts right now.
								</p>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Quick Actions - 100% Real Handlers */}
				<div className="bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] shadow-sm p-5">
					<h2 className="font-semibold text-[#00050E] mb-4">
						Quick Actions
					</h2>
					<div className="grid grid-cols-2 gap-3">
						<button
							type="button"
							onClick={onCreateArticle}
							className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#E7E3F5] hover:bg-[#F9F8FF] hover:border-[#765DFB]/30 hover:shadow-xs transition-all gap-2 group cursor-pointer"
						>
							<div className="h-10 w-10 rounded-xl bg-[#765DFB]/10 text-[#765DFB] flex items-center justify-center group-hover:scale-110 transition-transform">
								<FileText className="h-5 w-5" />
							</div>
							<span className="text-xs font-semibold text-[#00050E]">
								New Article
							</span>
						</button>
						<button
							type="button"
							onClick={onCreateIndustry}
							className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#E7E3F5] hover:bg-[#F9F8FF] hover:border-[#765DFB]/30 hover:shadow-xs transition-all gap-2 group cursor-pointer"
						>
							<div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
								<PanelsTopLeft className="h-5 w-5" />
							</div>
							<span className="text-xs font-semibold text-[#00050E]">
								New Industry
							</span>
						</button>
						<button
							type="button"
							onClick={() => onChangeKind("team")}
							className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#E7E3F5] hover:bg-[#F9F8FF] hover:border-[#765DFB]/30 hover:shadow-xs transition-all gap-2 group cursor-pointer"
						>
							<div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
								<Users className="h-5 w-5" />
							</div>
							<span className="text-xs font-semibold text-[#00050E]">
								Manage Team
							</span>
						</button>
						<button
							type="button"
							onClick={() => window.open("/", "_blank")}
							className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#E7E3F5] hover:bg-[#F9F8FF] hover:border-[#765DFB]/30 hover:shadow-xs transition-all gap-2 group cursor-pointer"
						>
							<div className="h-10 w-10 rounded-xl bg-violet-100 text-[#765DFB] flex items-center justify-center group-hover:scale-110 transition-transform">
								<ExternalLink className="h-5 w-5" />
							</div>
							<span className="text-xs font-semibold text-[#00050E]">
								Live Site ↗
							</span>
						</button>
					</div>
				</div>

				{/* Top Categories */}
				<div className="bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] shadow-sm p-5">
					<div className="flex items-center justify-between mb-4">
						<h2 className="font-semibold text-[#00050E]">
							Top Categories
						</h2>
						<button
							onClick={() => onChangeKind("articles")}
							className="text-xs font-medium text-[#765DFB]"
						>
							View all
						</button>
					</div>
					<div className="space-y-4">
						{topCategories.length > 0 ? (
							topCategories.map((cat) => (
								<div key={cat.name} className="flex items-center gap-3">
									<div className="w-24 text-sm font-medium text-[#444759] truncate">
										{cat.name}
									</div>
									<div className="flex-1 h-2 bg-zinc-100 bg-[#F9F8FF]/80 rounded-full overflow-hidden">
										<div
											className={`h-full ${cat.color} rounded-full`}
											style={{ width: `${cat.percent}%` }}
										/>
									</div>
									<div className="w-8 text-right text-xs font-medium text-[#444759]">
										{cat.count}
									</div>
								</div>
							))
						) : (
							<p className="text-sm text-[#444759]">
								No categories found.
							</p>
						)}
					</div>
				</div>

				{/* Recent Comments (Mocked as Activity) */}
				<div className="bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] shadow-sm p-5">
					<div className="flex items-center justify-between mb-4">
						<h2 className="font-semibold text-[#00050E]">
							Recent Activity
						</h2>
						<button
							onClick={() => onChangeKind("articles")}
							className="text-xs font-medium text-[#765DFB]"
						>
							View all
						</button>
					</div>
					<div className="space-y-4">
						{recentActivity.length > 0 ? (
							recentActivity.map((item, i) => (
								<div key={i} className="flex gap-3">
									<div className="h-8 w-8 rounded-full bg-zinc-100 bg-[#F9F8FF]/80 flex items-center justify-center shrink-0">
										<Users className="h-4 w-4 text-[#444759]" />
									</div>
									<div className="text-sm min-w-0">
										<p className="text-[#00050E] truncate">
											<span className="font-medium">{item.user}</span>{" "}
											{item.action}{" "}
											<span className="font-medium">{item.target}</span>
										</p>
										<p className="text-xs text-[#444759] mt-0.5">
											{item.time}
										</p>
									</div>
								</div>
							))
						) : (
							<p className="text-sm text-[#444759]">
								No recent activity.
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export const AdminCMSPage = () => {
	const [records, setRecords] = useState<CMSRecord[]>([])
	const [activeKind, setActiveKind] = useState<ContentKind>("dashboard")
	const [selectedId, setSelectedId] = useState<string>("")
	const [searchQuery, setSearchQuery] = useState("")
	const [statusFilter, setStatusFilter] = useState<"All" | ContentStatus>("All")
	const [saveMessage, setSaveMessage] = useState("")
	const [isEditingMode, setIsEditingMode] = useState(false)
	const [previewMode] = useState<"edit" | "split">("edit")
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("negentro_cms_sidebar_collapsed") === "true"
		}
		return false
	})
	const toggleSidebar = () => {
		setIsSidebarCollapsed((prev) => {
			const next = !prev
			if (typeof window !== "undefined") {
				localStorage.setItem("negentro_cms_sidebar_collapsed", String(next))
			}
			return next
		})
	}
	// const [isDarkMode, setIsDarkMode] = useState(false)
	const [session, setSession] = useState<any>(null)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [authError, setAuthError] = useState("")
	const [authMode, setAuthMode] = useState<"login" | "magic_link">("login")
	const [isLoggingIn, setIsLoggingIn] = useState(false)
	const [userRole, setUserRole] = useState<string>("Viewer")
	const [teamMembers, setTeamMembers] = useState<any[]>([])
	const [invitations, setInvitations] = useState<any[]>([])
	const [inviteEmail, setInviteEmail] = useState("")
	const [inviteRole, setInviteRole] = useState("Editor")
	const [isSubmittingInvite, setIsSubmittingInvite] = useState(false)
	const [inviteMessage, setInviteMessage] = useState<{
		type: "success" | "error"
		text: string
	} | null>(null)

	useEffect(() => {
		const resolveUserRole = async (client: any, user: any) => {
			if (!user) {
				setUserRole("Viewer")
				return
			}
			try {
				const { data: roleData } = await client
					.from("user_roles")
					.select("role")
					.eq("user_id", user.id)
					.maybeSingle()

				if (roleData?.role) {
					setUserRole(roleData.role)
					return
				}

				// If not found in user_roles, check if invited in team_invitations
				if (user.email) {
					const { data: invite } = await client
						.from("team_invitations")
						.select("role")
						.eq("email", user.email.toLowerCase().trim())
						.maybeSingle()

					const assignedRole = invite?.role || "Viewer"
					setUserRole(assignedRole)

					// Provision into user_roles
					await client.from("user_roles").upsert(
						{ user_id: user.id, role: assignedRole },
						{ onConflict: "user_id" },
					)
					// Mark invitation accepted
					await client
						.from("team_invitations")
						.update({ status: "Accepted" })
						.eq("email", user.email.toLowerCase().trim())
				} else {
					setUserRole("Viewer")
				}
			} catch (e) {
				console.error("Error resolving user role:", e)
				setUserRole("Viewer")
			}
		}

		const initAuth = async () => {
			const client = await getSupabase()
			if (!client) return
			const {
				data: { session },
			} = await client.auth.getSession()
			setSession(session)
			if (session) {
				await resolveUserRole(client, session.user)
			}

			client.auth.onAuthStateChange(async (_event, session) => {
				setSession(session)
				if (session) {
					await resolveUserRole(client, session.user)
				} else {
					setUserRole("Viewer")
				}
			})
		}
		initAuth()
	}, [])

	const [isSyncing, setIsSyncing] = useState(false)
	const [dbConnected, setDbConnected] = useState(true)

	const loadData = async () => {
		setIsSyncing(true)
		try {
			const client = await getSupabase()
			if (client) {
				const { data, error } = await client
					.from("cms_records")
					.select("*")
					.order("updated_at", { ascending: false })
				if (!error && data) {
					setDbConnected(true)
					const mappedRecords = data.map((d: any) => ({
						id: d.slug,
						kind: d.kind,
						title: d.title,
						slug: d.slug,
						category: d.category,
						summary: d.summary || "",
						status: d.status,
						author: d.author || "Negentro Team",
						tags: d.tags || "",
						featured: d.featured || false,
						publishDate: d.publish_date || "",
						updated: new Intl.DateTimeFormat("en", {
							month: "short",
							day: "numeric",
							year: "numeric",
						}).format(new Date(d.updated_at || d.created_at || Date.now())),
						image: d.image,
						blocks: d.content?.blocks || [],
					}))
					setRecords(mappedRecords)
					if (mappedRecords.length > 0 && !selectedId) {
						setSelectedId(mappedRecords[0].id)
					}
				} else if (error) {
					console.error("Supabase load error:", error)
					setDbConnected(false)
				}
			}
		} catch (e) {
			console.error("Failed to load CMS data from Supabase:", e)
			setDbConnected(false)
		} finally {
			setIsSyncing(false)
		}
	}

	useEffect(() => {
		loadData()
	}, [])

	const activeRecords = records.filter((record) => record.kind === activeKind)
	const visibleRecords = activeRecords.filter((record) => {
		const search = searchQuery.trim().toLowerCase()
		const matchesSearch =
			!search ||
			`${record.title} ${record.slug} ${record.category}`
				.toLowerCase()
				.includes(search)
		return (
			matchesSearch &&
			(statusFilter === "All" || record.status === statusFilter)
		)
	})
	const selectedRecord = records.find(
		(record) => record.id === selectedId && record.kind === activeKind,
	)
	const publishedCount = activeRecords.filter(
		(record) => record.status === "Published",
	).length
	const draftCount = activeRecords.filter(
		(record) => record.status === "Draft",
	).length

	const updateSelected = (changes: Partial<CMSRecord>) => {
		if (!selectedRecord) return
		setRecords((current) =>
			current.map((record) =>
				record.id === selectedRecord.id ? { ...record, ...changes } : record,
			),
		)
		setSaveMessage("")
	}

	const loadTeamData = async () => {
		const client = await getSupabase()
		if (!client) return
		const { data: users } = await client
			.from("user_roles")
			.select("*")
			.order("created_at", { ascending: false })
		if (users) setTeamMembers(users)
		const { data: invites } = await client
			.from("team_invitations")
			.select("*")
			.order("created_at", { ascending: false })
		if (invites) setInvitations(invites)
	}
	useEffect(() => {
		if (activeKind === "team" && userRole === "Super Admin") {
			loadTeamData()
		}
	}, [activeKind, userRole])

	const handleInvite = async (e: React.FormEvent) => {
		e.preventDefault()
		const targetEmail = inviteEmail.trim().toLowerCase()
		if (!targetEmail) return
		setIsSubmittingInvite(true)
		setInviteMessage(null)

		const client = await getSupabase()
		if (!client) {
			setIsSubmittingInvite(false)
			setInviteMessage({
				type: "error",
				text: "Database connection not available",
			})
			return
		}

		try {
			// 1. Record/upsert invitation into team_invitations table
			const { error: inviteErr } = await client
				.from("team_invitations")
				.upsert(
					{
						email: targetEmail,
						role: inviteRole,
						status: "Pending",
						created_at: new Date().toISOString(),
					},
					{ onConflict: "email" },
				)

			if (inviteErr) {
				console.warn("Could not save to team_invitations:", inviteErr)
			}

			// 2. Trigger Supabase OTP/Magic Link invitation
			// When Resend Custom SMTP is configured, this sends via Resend with no rate limits!
			const redirectTo =
				window.location.hostname === "localhost"
					? `${window.location.origin}/`
					: `${window.location.origin}/`

			const { error: otpError } = await client.auth.signInWithOtp({
				email: targetEmail,
				options: {
					emailRedirectTo: redirectTo,
					data: {
						role: inviteRole,
						invited: true,
					},
				},
			})

			if (otpError) {
				console.warn("Supabase auth OTP note:", otpError)
				// Try Edge Function fallback if deployed
				const { error: fnError } = await client.functions.invoke("invite-user", {
					body: {
						email: targetEmail,
						role: inviteRole,
						redirectTo,
					},
				})

				if (fnError && otpError.message.toLowerCase().includes("rate limit")) {
					setInviteMessage({
						type: "error",
						text: `Supabase rate limit exceeded. Please enable Resend Custom SMTP in Supabase Settings (Project Settings -> Auth -> SMTP Settings) to unlock unlimited email sends.`,
					})
					return
				}
			}

			setInviteEmail("")
			setInviteMessage({
				type: "success",
				text: `Invitation and verification link sent to ${targetEmail} as ${inviteRole}!`,
			})
			loadTeamData()
		} catch (err: any) {
			console.error("Invite error:", err)
			setInviteMessage({
				type: "error",
				text: err.message || "Failed to send invitation",
			})
		} finally {
			setIsSubmittingInvite(false)
		}
	}

	const changeKind = (kind: any) => {
		setActiveKind(kind)
		setStatusFilter("All")
		setSearchQuery("")
		setSelectedId(records.find((record) => record.kind === kind)?.id ?? "")
		setSaveMessage("")
		setIsEditingMode(false)
	}

	const createArticle = () => {
		const id = `untitled-${Date.now()}`
		const kind = activeKind === "industries" ? "industries" : "articles"
		const article: CMSRecord = {
			id,
			kind,
			title: kind === "industries" ? "Untitled Industry" : "Untitled article",
			slug: id,
			category: "Research",
			summary: "",
			status: "Draft",
			updated: formatDate(),
			blocks: [],
		}
		setRecords((current) => [article, ...current])
		setStatusFilter("All")
		setSearchQuery("")
		setSelectedId(id)
		setSaveMessage("New draft created")
		setIsEditingMode(true)
	}

	const createIndustry = () => {
		const id = `untitled-industry-${Date.now()}`
		const article: CMSRecord = {
			id,
			kind: "industries",
			title: "Untitled Industry",
			slug: id,
			category: "Enterprise",
			summary: "",
			status: "Draft",
			updated: formatDate(),
			blocks: [],
		}
		setActiveKind("industries")
		setRecords((current) => [article, ...current])
		setStatusFilter("All")
		setSearchQuery("")
		setSelectedId(id)
		setSaveMessage("New industry draft created")
		setIsEditingMode(true)
	}

	const selectRecordAndEdit = (id: string, kind: ContentKind) => {
		setActiveKind(kind)
		setSelectedId(id)
		setIsEditingMode(true)
	}

	const saveSelected = async (status: ContentStatus) => {
		if (!selectedRecord) return

		const updatedRecord = { ...selectedRecord, status, updated: formatDate() }

		// Optimistic UI update
		setRecords((current) =>
			current.map((record) =>
				record.id === selectedRecord.id ? updatedRecord : record,
			),
		)

		setSaveMessage("Saving to database...")

		const client = await getSupabase()
		if (!client) {
			setSaveMessage("Database unavailable")
			return
		}

		try {
			const client = await getSupabase()
			if (client) {
				// Upsert to Supabase
				const { error } = await client.from("cms_records").upsert(
					{
						kind: updatedRecord.kind,
						title: updatedRecord.title,
						slug: updatedRecord.slug,
						category: updatedRecord.category,
						summary: updatedRecord.summary,
						status: updatedRecord.status,
						image: updatedRecord.image,
						content: { blocks: updatedRecord.blocks || [] },
						updated_at: new Date().toISOString(),
					},
					{ onConflict: "slug" },
				)

				if (error) {
					console.error("Error saving to Supabase:", error)
					setSaveMessage("Failed to save to database. UI updated locally.")
					return
				}
			}
		} catch (e) {
			console.error("Supabase exception:", e)
		}

		setSaveMessage(
			status === "Published"
				? "Published successfully"
				: "Draft saved successfully",
		)
	}

	const deleteSelected = async () => {
		if (!selectedRecord) return
		if (
			!window.confirm(
				"Are you sure you want to delete this record? This action cannot be undone.",
			)
		)
			return

		setSaveMessage("Deleting from database...")

		try {
			const client = await getSupabase()
			if (client) {
				const { error } = await client
					.from("cms_records")
					.delete()
					.eq("slug", selectedRecord.slug)
				if (error) {
					console.error("Error deleting from Supabase:", error)
					setSaveMessage("Failed to delete from database.")
					return
				}
			}
		} catch (e) {
			console.error("Supabase delete exception:", e)
		}

		// Remove from local state
		setRecords((current) =>
			current.filter((record) => record.id !== selectedRecord.id),
		)
		setIsEditingMode(false)
		setSaveMessage("")
	}

	const handleAuth = async (e: React.FormEvent) => {
		e.preventDefault()
		setAuthError("")
		setIsLoggingIn(true)
		try {
			const client = await getSupabase()
			if (!client) {
				setAuthError("Supabase credentials missing. Check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are present.")
				return
			}

			if (authMode === "login") {
				const { error } = await client.auth.signInWithPassword({
					email: email.trim(),
					password,
				})
				if (error) setAuthError(error.message)
			} else {
				const { error } = await client.auth.signInWithOtp({
					email: email.trim(),
					options: {
						emailRedirectTo: window.location.origin,
					},
				})
				if (error) setAuthError(error.message)
				else setAuthError("Success! Check your email for a secure login link.")
			}
		} catch (err: any) {
			setAuthError(err.message || "Authentication failed.")
		} finally {
			setIsLoggingIn(false)
		}
	}

	if (!session) {
		return (
			<div className="relative min-h-screen font-sans flex items-center justify-center antialiased bg-[#F9F8FF] text-[#00050E] p-4 overflow-hidden selection:bg-[#765DFB] selection:text-white">
				{/* Background ambient lighting */}
				<div className="pointer-events-none fixed -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#ECCDF5]/40 blur-[130px]" />
				<div className="pointer-events-none fixed -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#765DFB]/15 blur-[150px]" />

				<div className="relative w-full max-w-sm rounded-2xl border border-[#E7E3F5] bg-white/85 backdrop-blur-2xl p-8 shadow-[0_20px_50px_rgba(118,93,251,0.08)]">
					<div className="flex h-11 w-11 mb-5 items-center justify-center rounded-xl bg-gradient-to-tr from-[#765DFB] to-[#4846AC] text-[16px] font-bold text-white shadow-md shadow-[#765DFB]/25">
						N
					</div>
					<h2 className="mb-1.5 text-2xl font-bold tracking-tight text-[#00050E]">
						{authMode === "login" ? "Admin Login" : "Email Login"}
					</h2>
					<p className="mb-6 text-[14px] text-[#444759]">
						Access the Negentro Content Management Studio.
					</p>

					<form onSubmit={handleAuth} className="space-y-4">
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email address"
							required
							className="h-11 w-full rounded-xl border border-[#E7E3F5] bg-white/90 px-3.5 text-[14px] text-[#00050E] placeholder-[#908DA3] outline-none focus:border-[#765DFB] focus:ring-4 focus:ring-[#765DFB]/10 transition-all"
						/>
						{authMode === "login" && (
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								required
								className="h-11 w-full rounded-xl border border-[#E7E3F5] bg-white/90 px-3.5 text-[14px] text-[#00050E] placeholder-[#908DA3] outline-none focus:border-[#765DFB] focus:ring-4 focus:ring-[#765DFB]/10 transition-all"
							/>
						)}

						{authError && (
							<p className="text-[13px] text-red-500 font-medium bg-red-50 p-2.5 rounded-lg border border-red-100">{authError}</p>
						)}

						<button
							type="submit"
							disabled={isLoggingIn}
							className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#765DFB] to-[#4846AC] text-[14px] font-semibold text-white shadow-md shadow-[#765DFB]/25 hover:shadow-lg hover:shadow-[#765DFB]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{isLoggingIn ? (
								<span className="flex items-center gap-2">
									<Loader2 className="h-4 w-4 animate-spin" />
									Signing in...
								</span>
							) : authMode === "login" ? (
								"Sign In"
							) : (
								"Send Login Link"
							)}
						</button>
					</form>

					<div className="mt-4 flex flex-col gap-2">
						<button
							type="button"
							onClick={() => {
								setAuthMode((m) => (m === "login" ? "magic_link" : "login"))
								setAuthError("")
							}}
							className="w-full text-center text-[13px] text-[#444759] hover:text-[#765DFB] transition-colors cursor-pointer"
						>
							{authMode === "login"
								? "Forgot password or have an invite? Use Email Link"
								: "Already have a password? Sign in"}
						</button>

						{import.meta.env.DEV && (
							<div className="mt-3 pt-3 border-t border-[#E7E3F5]/80 text-center">
								<button
									type="button"
									onClick={() => {
										setSession({
											user: {
												id: "local-dev-admin",
												email: "admin@negentro.tech",
											},
										})
										setUserRole("Super Admin")
									}}
									className="text-xs font-semibold text-[#765DFB] hover:underline cursor-pointer bg-[#765DFB]/10 hover:bg-[#765DFB]/15 px-3 py-1.5 rounded-lg border border-[#765DFB]/20 transition-all"
								>
									⚡ Local Dev: Enter as Demo Admin
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="relative h-screen bg-[#F9F8FF] font-sans text-[#00050E] antialiased flex overflow-hidden selection:bg-[#765DFB] selection:text-white">
			{/* Ambient Branding Glass Glows */}
			<div className="pointer-events-none fixed -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#ECCDF5]/30 blur-[130px] -z-10" />
			<div className="pointer-events-none fixed -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#765DFB]/10 blur-[150px] -z-10" />
			<div className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 h-[350px] w-[500px] rounded-full bg-[#ECCDF5]/20 blur-[120px] -z-10" />

			<aside
				className={`hidden shrink-0 flex-col border-r border-[#E7E3F5] bg-gradient-to-b from-white/95 via-[#FBFAFF]/90 to-white/95 backdrop-blur-2xl lg:flex h-screen z-30 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[4px_0_24px_-4px_rgba(118,93,251,0.07)] ${
					isSidebarCollapsed ? "w-20" : "w-[270px]"
				}`}
			>
				{/* 3D Floating Toggle Pill on Border */}
				<button
					type="button"
					onClick={toggleSidebar}
					title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
					aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
					className="group absolute -right-3.5 top-6 z-40 flex h-7 w-7 items-center justify-center rounded-full bg-white border border-[#E7E3F5] text-[#555268] shadow-[0_4px_14px_rgba(118,93,251,0.2),0_1px_3px_rgba(0,0,0,0.08),inset_0_1.5px_0_rgba(255,255,255,1)] hover:scale-110 hover:border-[#765DFB]/40 hover:text-[#765DFB] active:scale-95 active:shadow-xs transition-all duration-200 cursor-pointer"
				>
					{isSidebarCollapsed ? (
						<ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
					) : (
						<ChevronLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
					)}
				</button>

				{/* Sidebar Header with 3D Extruded Logo */}
				<div
					className={`flex h-18 shrink-0 items-center border-b border-[#E7E3F5]/80 transition-all duration-300 ${
						isSidebarCollapsed ? "justify-center px-2" : "px-5"
					}`}
				>
					<div
						onClick={toggleSidebar}
						className={`flex items-center gap-3 min-w-0 cursor-pointer select-none group/logo ${
							isSidebarCollapsed ? "justify-center" : ""
						}`}
						title={isSidebarCollapsed ? "Click to expand" : undefined}
					>
						{/* 3D Extruded Beveled Logo Badge */}
						<div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#765DFB] via-[#6850EB] to-[#4846AC] text-[16px] font-black text-white shadow-[0_8px_20px_-3px_rgba(118,93,251,0.45),inset_0_1.5px_1px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.28)] border-t border-white/50 transform transition-all duration-300 group-hover/logo:-translate-y-0.5 group-hover/logo:scale-105 group-hover/logo:rotate-2">
							N
							<div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
						</div>

						{!isSidebarCollapsed && (
							<div className="min-w-0 animate-in fade-in duration-200">
								<p className="text-[15px] font-bold tracking-tight text-[#00050E] truncate">
									Negentro
								</p>
								<div className="flex items-center gap-1.5">
									<p className="text-[10px] font-bold tracking-[0.16em] text-[#765DFB] uppercase">
										Content Studio
									</p>
									<span className="rounded bg-[#765DFB]/10 px-1 py-0.2 text-[9px] font-bold text-[#765DFB] border border-[#765DFB]/20">
										v2.4
									</span>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* 3D Workspace Card */}
				<div
					className={`border-b border-[#E7E3F5]/80 py-3.5 shrink-0 transition-all duration-300 ${
						isSidebarCollapsed ? "px-2.5 flex justify-center" : "px-4"
					}`}
				>
					{!isSidebarCollapsed ? (
						<div>
							<div className="flex items-center justify-between px-1">
								<p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#787588]">
									Workspace
								</p>
								<span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
									<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
									Live
								</span>
							</div>
							<div className="group mt-2 flex items-center justify-between rounded-xl border border-[#E7E3F5] bg-gradient-to-b from-white via-white to-[#F9F8FF] px-3.5 py-2.5 shadow-[0_3px_10px_rgba(118,93,251,0.05),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_1px_rgba(118,93,251,0.03)] hover:shadow-[0_6px_18px_rgba(118,93,251,0.12),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer">
								<div className="flex items-center gap-2.5 min-w-0">
									<div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F1EEFE] border border-[#765DFB]/20 text-[#765DFB] shadow-[0_2px_4px_rgba(118,93,251,0.1)]">
										<Globe className="h-3.5 w-3.5" />
									</div>
									<div className="min-w-0">
										<p className="text-[13px] font-semibold text-[#00050E] truncate">
											Negentro Website
										</p>
										<p className="text-[11px] text-[#787588] truncate">
											negentro.tech (Main)
										</p>
									</div>
								</div>
								<ChevronDown className="h-3.5 w-3.5 text-[#787588] transition-transform duration-200 group-hover:translate-y-0.5" />
							</div>

							{/* Quick Search Jump Input */}
							<div className="mt-2.5 relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#787588]" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Quick search content..."
									className="w-full pl-8 pr-11 py-1.5 text-[12px] bg-white/70 hover:bg-white focus:bg-white rounded-lg border border-[#E7E3F5] focus:border-[#765DFB]/50 focus:outline-none focus:ring-2 focus:ring-[#765DFB]/10 transition-all placeholder:text-[#9b98a8]"
								/>
								<div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
									<kbd className="text-[9px] font-semibold text-[#8b879c] bg-[#F3F0FA] border border-[#E2DEEE] rounded px-1 py-0.2">
										⌘K
									</kbd>
								</div>
							</div>
						</div>
					) : (
						<div className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#E7E3F5] bg-gradient-to-b from-white via-white to-[#F9F8FF] shadow-[0_3px_8px_rgba(118,93,251,0.06),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_6px_16px_rgba(118,93,251,0.14)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer">
							<div className="relative">
								<Globe className="h-4 w-4 text-[#765DFB]" />
								<span className="absolute -top-1 -right-1 flex h-2 w-2">
									<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_#10B981]"></span>
								</span>
							</div>

							{/* 3D Floating Tooltip */}
							<div className="pointer-events-none absolute left-full ml-3 hidden items-center group-hover:flex z-50">
								<div className="relative rounded-lg bg-[#00050E] px-3 py-1.5 text-[12px] font-medium text-white shadow-[0_8px_20px_rgba(0,0,0,0.25)] whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
									Negentro Website (negentro.tech)
									<div className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#00050E]" />
								</div>
							</div>
						</div>
					)}
				</div>

				{/* 3D Navigation Links */}
				<nav
					className={`flex-1 overflow-y-auto overflow-x-hidden space-y-4 py-3 transition-all duration-300 ${
						isSidebarCollapsed ? "px-2" : "px-3"
					}`}
					aria-label="Content Studio"
				>
					{/* Section 1: Publishing */}
					<div>
						{!isSidebarCollapsed && (
							<p className="px-2 pb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#787588]">
								Publishing & Content
							</p>
						)}

						<div className="space-y-1">
							{[
								{
									kind: "dashboard",
									label: "Dashboard",
									icon: LayoutDashboard,
									badge: "Overview",
								},
								{
									kind: "articles",
									label: "Blog articles",
									icon: FileText,
									badge: `${records.filter((r) => r.kind === "articles").length || 10}`,
								},
								{
									kind: "industries",
									label: "Industry pages",
									icon: PanelsTopLeft,
									badge: `${records.filter((r) => r.kind === "industries").length || Object.keys(industryPages || {}).length || 6}`,
								},
							].map((item) => {
								const isActive = activeKind === item.kind
								const Icon = item.icon

								if (isSidebarCollapsed) {
									return (
										<div key={item.kind} className="relative group flex justify-center">
											<button
												type="button"
												onClick={() => changeKind(item.kind as ContentKind)}
												className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ease-out cursor-pointer ${
													isActive
														? "bg-gradient-to-b from-white via-[#F6F3FF] to-[#ECE7FE] text-[#765DFB] border border-[#765DFB]/35 shadow-[0_6px_16px_-2px_rgba(118,93,251,0.28),inset_0_1.5px_0_rgba(255,255,255,1),inset_0_-1px_1px_rgba(118,93,251,0.15)] -translate-y-0.5 scale-105"
														: "text-[#555268] hover:bg-white hover:text-[#00050E] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(118,93,251,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] active:translate-y-0"
												}`}
											>
												{isActive && (
													<div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-[#765DFB] shadow-[0_0_6px_#765DFB]" />
												)}
												<Icon
													className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
														isActive
															? "text-[#765DFB] drop-shadow-[0_2px_4px_rgba(118,93,251,0.45)]"
															: "text-[#787588]"
													}`}
												/>
											</button>

											{/* 3D Floating Tooltip */}
											<div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden items-center group-hover:flex z-50">
												<div className="relative rounded-lg bg-[#00050E] px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.28)] whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
													{item.label} ({item.badge})
													<div className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#00050E]" />
												</div>
											</div>
										</div>
									)
								}

								return (
									<button
										key={item.kind}
										type="button"
										onClick={() => changeKind(item.kind as ContentKind)}
										className={`group relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[13.5px] transition-all duration-200 ease-out cursor-pointer ${
											isActive
												? "bg-gradient-to-r from-white via-[#F6F3FF] to-[#ECE7FE] font-bold text-[#765DFB] border border-[#765DFB]/30 shadow-[0_6px_16px_-2px_rgba(118,93,251,0.22),0_2px_4px_rgba(0,0,0,0.03),inset_0_1.5px_0_rgba(255,255,255,1),inset_0_-1px_1px_rgba(118,93,251,0.12)] -translate-y-0.5 scale-[1.01]"
												: "text-[#555268] hover:bg-white hover:text-[#00050E] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(118,93,251,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] active:translate-y-0"
										}`}
									>
										<div className="flex items-center gap-3 min-w-0">
											{isActive && (
												<div className="absolute left-1.5 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-gradient-to-b from-[#765DFB] to-[#4846AC] shadow-[0_0_8px_#765DFB]" />
											)}
											<Icon
												className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
													isActive
														? "text-[#765DFB] drop-shadow-[0_2px_4px_rgba(118,93,251,0.4)] ml-1"
														: "text-[#787588]"
												}`}
											/>
											<span className="truncate">{item.label}</span>
										</div>

										<span
											className={`text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
												isActive
													? "bg-[#765DFB]/15 text-[#765DFB]"
													: "bg-zinc-100 text-[#787588] group-hover:bg-[#F1EEFE] group-hover:text-[#765DFB]"
											}`}
										>
											{item.badge}
										</span>
									</button>
								)
							})}
						</div>
					</div>

					{/* Section 2: Team & Platform Settings */}
					<div>
						{!isSidebarCollapsed && (
							<p className="px-2 pb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#787588]">
								Platform & Access
							</p>
						)}

						<div className="space-y-1">
							{[
								{
									kind: "team",
									label: "Team & Access",
									icon: Users,
									badge: userRole,
								},
							].map((item) => {
								const isActive = activeKind === item.kind
								const Icon = item.icon

								if (isSidebarCollapsed) {
									return (
										<div key={item.kind} className="relative group flex justify-center">
											<button
												type="button"
												onClick={() => changeKind(item.kind as ContentKind)}
												className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ease-out cursor-pointer ${
													isActive
														? "bg-gradient-to-b from-white via-[#F6F3FF] to-[#ECE7FE] text-[#765DFB] border border-[#765DFB]/35 shadow-[0_6px_16px_-2px_rgba(118,93,251,0.28),inset_0_1.5px_0_rgba(255,255,255,1),inset_0_-1px_1px_rgba(118,93,251,0.15)] -translate-y-0.5 scale-105"
														: "text-[#555268] hover:bg-white hover:text-[#00050E] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(118,93,251,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] active:translate-y-0"
												}`}
											>
												{isActive && (
													<div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-[#765DFB] shadow-[0_0_6px_#765DFB]" />
												)}
												<Icon
													className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
														isActive
															? "text-[#765DFB] drop-shadow-[0_2px_4px_rgba(118,93,251,0.45)]"
															: "text-[#787588]"
													}`}
												/>
											</button>

											{/* 3D Floating Tooltip */}
											<div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden items-center group-hover:flex z-50">
												<div className="relative rounded-lg bg-[#00050E] px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.28)] whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
													{item.label} ({item.badge})
													<div className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#00050E]" />
												</div>
											</div>
										</div>
									)
								}

								return (
									<button
										key={item.kind}
										type="button"
										onClick={() => changeKind(item.kind as ContentKind)}
										className={`group relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[13.5px] transition-all duration-200 ease-out cursor-pointer ${
											isActive
												? "bg-gradient-to-r from-white via-[#F6F3FF] to-[#ECE7FE] font-bold text-[#765DFB] border border-[#765DFB]/30 shadow-[0_6px_16px_-2px_rgba(118,93,251,0.22),0_2px_4px_rgba(0,0,0,0.03),inset_0_1.5px_0_rgba(255,255,255,1),inset_0_-1px_1px_rgba(118,93,251,0.12)] -translate-y-0.5 scale-[1.01]"
												: "text-[#555268] hover:bg-white hover:text-[#00050E] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(118,93,251,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] active:translate-y-0"
										}`}
									>
										<div className="flex items-center gap-3 min-w-0">
											{isActive && (
												<div className="absolute left-1.5 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-gradient-to-b from-[#765DFB] to-[#4846AC] shadow-[0_0_8px_#765DFB]" />
											)}
											<Icon
												className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
													isActive
														? "text-[#765DFB] drop-shadow-[0_2px_4px_rgba(118,93,251,0.4)] ml-1"
														: "text-[#787588]"
												}`}
											/>
											<span className="truncate">{item.label}</span>
										</div>

										<span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#765DFB]/10 text-[#765DFB] border border-[#765DFB]/20">
											{item.badge}
										</span>
									</button>
								)
							})}

							{/* Real Functional Database Sync Button */}
							{!isSidebarCollapsed ? (
								<div className="pt-1.5">
									<button
										type="button"
										onClick={loadData}
										disabled={isSyncing}
										className="w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[12.5px] font-semibold text-[#555268] hover:bg-white hover:text-[#765DFB] border border-[#E7E3F5]/80 hover:border-[#765DFB]/30 hover:shadow-xs transition-all cursor-pointer disabled:opacity-60 group"
									>
										<div className="flex items-center gap-2.5">
											<Database className={`h-4 w-4 ${isSyncing ? "text-[#765DFB] animate-spin" : "text-[#787588] group-hover:text-[#765DFB]"}`} />
											<span>{isSyncing ? "Syncing..." : "Sync Database"}</span>
										</div>
										<div className="flex items-center gap-1.5">
											<span className="text-[10.5px] font-mono text-[#787588]">
												{records.length} records
											</span>
											<span className={`h-2 w-2 rounded-full ${dbConnected ? "bg-emerald-500 shadow-[0_0_6px_#10B981]" : "bg-amber-500"}`}></span>
										</div>
									</button>
								</div>
							) : (
								<div className="relative group flex justify-center py-1">
									<button
										type="button"
										onClick={loadData}
										disabled={isSyncing}
										className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-white to-[#F9F8FF] border border-[#E7E3F5] text-[#765DFB] shadow-xs hover:border-[#765DFB]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
									>
										<Database className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
									</button>
									<div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden items-center group-hover:flex z-50">
										<div className="relative rounded-lg bg-[#00050E] px-3 py-1.5 text-[12px] font-semibold text-white shadow-xl whitespace-nowrap">
											Sync Database ({records.length} synced)
											<div className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#00050E]" />
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</nav>

				{/* 3D Footer - User Profile & Live Website */}
				<div className="shrink-0 border-t border-[#E7E3F5]/80 bg-white/60 p-3 space-y-2">
					{!isSidebarCollapsed ? (
						<>
							{/* User Profile Card */}
							<div className="flex items-center justify-between rounded-xl border border-[#E7E3F5] bg-gradient-to-b from-white to-[#F9F8FF] p-2.5 shadow-[0_2px_8px_rgba(118,93,251,0.04),inset_0_1px_0_rgba(255,255,255,1)]">
								<div className="flex items-center gap-2.5 min-w-0">
									<div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#765DFB] to-[#4846AC] text-[12px] font-bold text-white shadow-sm shadow-[#765DFB]/30">
										NT
										<span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-white"></span>
									</div>
									<div className="min-w-0">
										<p className="text-[12px] font-bold text-[#00050E] truncate">
											{session?.user?.email ? session.user.email.split("@")[0] : "Admin Account"}
										</p>
										<p className="text-[10px] text-[#787588] truncate flex items-center gap-1">
											<span className="font-semibold text-[#765DFB]">
												{userRole}
											</span>
											<span>•</span>
											<span className="text-emerald-600 font-medium">Online</span>
										</p>
									</div>
								</div>

								<button
									type="button"
									onClick={async () => {
										const client = await getSupabase()
										await client?.auth.signOut()
										setSession(null)
									}}
									title="Sign out"
									className="flex h-7 w-7 items-center justify-center rounded-lg text-[#787588] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
								>
									<LogOut className="h-3.5 w-3.5" />
								</button>
							</div>

							{/* View Live Website Card */}
							<a
								href="/"
								className="group flex items-center justify-between rounded-xl border border-[#E7E3F5] bg-white px-3.5 py-2 text-[12px] font-semibold text-[#555268] shadow-xs hover:border-[#765DFB]/30 hover:text-[#765DFB] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(118,93,251,0.1)] active:translate-y-0 transition-all duration-200"
							>
								<span className="flex items-center gap-2">
									<ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
									<span>View live website</span>
								</span>
								<ArrowUpRight className="h-3 w-3 text-zinc-400 group-hover:text-[#765DFB] transition-colors" />
							</a>
						</>
					) : (
						<div className="flex flex-col items-center gap-2">
							<div className="relative group">
								<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#765DFB] to-[#4846AC] text-[12px] font-bold text-white shadow-xs cursor-pointer">
									NT
								</div>
								<div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden items-center group-hover:flex z-50">
									<div className="relative rounded-lg bg-[#00050E] px-3 py-1.5 text-[12px] font-semibold text-white shadow-xl whitespace-nowrap">
										{session?.user?.email || "Admin Account"} ({userRole})
										<div className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#00050E]" />
									</div>
								</div>
							</div>

							<div className="relative group">
								<button
									type="button"
									onClick={async () => {
										const client = await getSupabase()
										await client?.auth.signOut()
										setSession(null)
									}}
									className="flex h-8 w-8 items-center justify-center rounded-lg text-[#787588] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
								>
									<LogOut className="h-4 w-4" />
								</button>
								<div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden items-center group-hover:flex z-50">
									<div className="relative rounded-lg bg-[#00050E] px-3 py-1.5 text-[12px] font-semibold text-white shadow-xl whitespace-nowrap">
										Sign out
										<div className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#00050E]" />
									</div>
								</div>
							</div>

							<div className="relative group">
								<a
									href="/"
									className="flex h-8 w-8 items-center justify-center rounded-lg text-[#787588] hover:bg-[#F9F8FF] hover:text-[#765DFB] transition-colors"
								>
									<ArrowLeft className="h-4 w-4" />
								</a>
								<div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden items-center group-hover:flex z-50">
									<div className="relative rounded-lg bg-[#00050E] px-3 py-1.5 text-[12px] font-semibold text-white shadow-xl whitespace-nowrap">
										View live website
										<div className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#00050E]" />
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</aside>

			<div className="min-w-0 flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden">
				<header className="flex h-16 shrink-0 items-center justify-between border-b border-[#E7E3F5] bg-white/80 backdrop-blur-xl px-5 sm:px-7 sticky top-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#765DFB] to-[#4846AC] text-[14px] font-bold text-white lg:hidden shadow-md shadow-[#765DFB]/25">
							N
						</div>
						<p className="text-[13px] text-[#787588]">
							Content Studio <span className="px-1.5 text-zinc-300">/</span>{" "}
							<span className="font-semibold text-[#00050E]">
								{activeKind === "dashboard"
									? "Dashboard"
									: activeKind === "articles"
									? "Blog Articles"
									: activeKind === "industries"
									? "Industry Pages"
									: "Team & Access"}
							</span>
						</p>
					</div>
					<div className="flex items-center gap-3">
						<span className="hidden text-[12px] font-semibold uppercase tracking-[0.12em] text-[#787588] sm:inline">
							Preview workspace
						</span>
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-[#F6F3FF] to-[#ECE7FE] text-[13px] font-bold text-[#765DFB] border border-[#765DFB]/20 shadow-[0_2px_6px_rgba(118,93,251,0.1),inset_0_1px_0_rgba(255,255,255,1)]">
							NT
						</div>
					</div>
				</header>

				<main
					className={`mx-auto w-full ${previewMode === "split" ? "max-w-none grid grid-cols-1 lg:grid-cols-2 p-0 h-[calc(100vh-64px)] overflow-hidden" : "max-w-[1600px] p-5 sm:p-7 xl:p-9"}`}
				>
					<div
						className={`${previewMode === "split" ? "overflow-y-auto p-5 sm:p-7 border-r border-[#E7E3F5]" : ""}`}
					>
						{!isEditingMode && (activeKind === "articles" || activeKind === "industries") && (
							<>
								{activeKind !== "articles" && (
									<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end mb-6">
										<div>
											<p className="text-[14px] sm:text-[14px] font-medium uppercase tracking-[0.14em] text-[#765DFB]">
												Publishing
											</p>
											<h1 className="mt-2 text-[26px] font-semibold tracking-[-0.02em]">
												Content
											</h1>
											<p className="mt-1 text-[14px] text-[#444759]">
												Manage articles and industry pages for the Negentro
												website.
											</p>
										</div>
										<div className="flex items-center gap-3 self-start sm:self-auto">
											<button
												type="button"
												onClick={createArticle}
												className="inline-flex h-10 items-center justify-center gap-2 rounded-[7px] bg-gradient-to-r from-[#765DFB] to-[#4846AC] px-4 text-[14px] font-semibold text-white shadow-md shadow-[#765DFB]/20 hover:shadow-lg hover:shadow-[#765DFB]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
											>
												<Plus className="h-4 w-4" />{" "}
												{activeKind === "industries"
													? "New Industry Page"
													: "New article"}
											</button>
										</div>
									</div>
								)}

								<div className="mt-7 grid gap-3 sm:grid-cols-3">
									{[
										{ label: "Total content", value: activeRecords.length },
										{ label: "Published", value: publishedCount },
										{ label: "Drafts", value: draftCount },
									].map((metric) => (
										<div
											key={metric.label}
											className="border-y border-[#E7E3F5] py-3 sm:border-y-0 sm:border-l sm:pl-5 first:sm:border-l-0 first:sm:pl-0"
										>
											<p className="text-[14px] sm:text-[14px] uppercase tracking-widest text-[#444759]">
												{metric.label}
											</p>
											<p className="mt-1 text-[22px] font-semibold">
												{metric.value}
											</p>
										</div>
									))}
								</div>

								<div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E3F5]">
									<div className="flex gap-5">
										{(["articles", "industries"] as const).map((kind) => (
											<button
												key={kind}
												type="button"
												onClick={() => changeKind(kind)}
												className={`border-b-2 px-1 pb-3 text-[14px] font-medium capitalize transition-all duration-300 ease-out ${activeKind === kind ? "border-[#765DFB] text-[#765DFB]" : "border-transparent text-[#444759] hover:text-[#24232a] text-[#00050E]"}`}
											>
												{kind === "articles"
													? "Blog articles"
													: "Industry pages"}
											</button>
										))}
									</div>
									<p className="pb-3 text-[14px] sm:text-[14px] text-[#444759]">
										CONTENT LIST
									</p>
								</div>
							</>
						)}

						{activeKind === "dashboard" ? (
							<div className="pb-12">
								<DashboardView
									records={records}
									session={session}
									userRole={userRole}
									onCreateArticle={createArticle}
									onCreateIndustry={createIndustry}
									onChangeKind={changeKind}
									onSelectArticle={selectRecordAndEdit}
									onRefreshData={loadData}
									isSyncing={isSyncing}
								/>
							</div>
						) : activeKind === "team" ? (
							<div className="mt-5 max-w-5xl">
								{userRole !== "Super Admin" && userRole !== "Admin" ? (
									<div className="p-8 text-center text-[14px] text-[#444759] border border-[#E7E3F5] rounded-xl bg-white/85 backdrop-blur-md">
										Only Super Admins and Admins can manage the team. <br />
										<span className="text-xs text-red-500 font-mono mt-2 block">
											(Debug: Your current role is "{userRole}")
										</span>
										<span className="text-xs text-red-500 font-mono mt-1 block">
											(Debug ID: {session?.user?.id})
										</span>
									</div>
								) : (
									<>
										<div className="mb-8 rounded-xl border border-[#E7E3F5] bg-white/85 backdrop-blur-md p-6 shadow-lg shadow-zinc-200/40 ">
											<div className="mb-5 flex items-center gap-3">
												<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#765DFB]/10 text-[#765DFB]">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="20"
														height="20"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<rect width="20" height="16" x="2" y="4" rx="2" />
														<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
													</svg>
												</div>
												<div>
													<h2 className="text-[14px] font-semibold text-[#00050E]">
														Invite Team Member
													</h2>
													<p className="mt-0.5 text-[14px] text-[#444759]">
														Send an email invitation to give them access to the
														CMS.
													</p>
												</div>
											</div>
											<form
												onSubmit={handleInvite}
												className="flex flex-col gap-4 sm:flex-row sm:items-end"
											>
												<label className="flex-1 block">
													<span className="mb-1.5 block text-[14px] font-medium text-[#444759]">
														Email address
													</span>
													<input
														type="email"
														required
														value={inviteEmail}
														onChange={(e) => setInviteEmail(e.target.value)}
														placeholder="colleague@negentro.com"
														className="h-10 w-full rounded-md border border-[#E7E3F5] bg-transparent px-3 text-[14px] outline-none focus:border-[#765DFB]"
													/>
												</label>
												<label className="w-full sm:w-48 block">
													<span className="mb-1.5 block text-[14px] font-medium text-[#444759]">
														Role
													</span>
													<select
														value={inviteRole}
														onChange={(e) => setInviteRole(e.target.value)}
														className="h-10 w-full rounded-md border border-[#E7E3F5] bg-white/85 backdrop-blur-md px-3 text-[14px] outline-none focus:border-[#765DFB]"
													>
														<option
															className="bg-white text-zinc-900 bg-white/85 backdrop-blur-md text-[#00050E]"
															value="Admin"
														>
															Admin
														</option>
														<option
															className="bg-white text-zinc-900 bg-white/85 backdrop-blur-md text-[#00050E]"
															value="Editor"
														>
															Editor
														</option>
														<option
															className="bg-white text-zinc-900 bg-white/85 backdrop-blur-md text-[#00050E]"
															value="Viewer"
														>
															Viewer
														</option>
													</select>
												</label>
												<button
													type="submit"
													disabled={isSubmittingInvite}
													className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#765DFB] to-[#4846AC] px-5 text-[14px] font-semibold text-white shadow-md shadow-[#765DFB]/20 hover:shadow-lg hover:shadow-[#765DFB]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
												>
													{isSubmittingInvite ? (
														<>
															<Loader2 className="h-4 w-4 animate-spin" />
															<span>Sending Invite...</span>
														</>
													) : (
														<span>Send Invite</span>
													)}
												</button>
											</form>
											{inviteMessage && (
												<div
													className={`mt-4 p-3 rounded-lg text-xs font-medium border ${
														inviteMessage.type === "success"
															? "bg-emerald-50 text-emerald-800 border-emerald-200"
															: "bg-red-50 text-red-700 border-red-200"
													}`}
												>
													{inviteMessage.text}
												</div>
											)}
										</div>

										{invitations.length > 0 && (
											<div className="mb-8 rounded-xl border border-[#E7E3F5] bg-white/85 backdrop-blur-md overflow-hidden">
												<div className="flex items-center gap-2 border-b border-[#E7E3F5] bg-zinc-100/50 bg-white/85 backdrop-blur-md/50 px-6 py-4">
													<h3 className="text-[14px] font-bold uppercase tracking-widest text-[#444759]">
														Pending Invitations
													</h3>
												</div>
												<div className="divide-y divide-[#E7E3F5]">
													{invitations.map((invite) => (
														<div
															key={invite.id}
															className="flex items-center justify-between p-6"
														>
															<div className="flex items-center gap-4">
																<div>
																	<p className="text-[14px] font-semibold text-[#00050E]">
																		{invite.email}
																	</p>
																</div>
															</div>
															<div className="flex items-center gap-6">
																<div className="w-32">
																	<p className="text-[13px] text-[#444759]">
																		Role
																	</p>
																	<p className="text-[14px] font-medium text-[#444759]">
																		{invite.role}
																	</p>
																</div>
																<div className="w-24">
																	<p className="text-[13px] text-[#444759]">
																		Status
																	</p>
																	<span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-[12px] font-medium text-yellow-700 ">
																		Pending
																	</span>
																</div>
															</div>
														</div>
													))}
												</div>
											</div>
										)}

										<div className="rounded-xl border border-[#E7E3F5] bg-white/85 backdrop-blur-md overflow-hidden">
											<div className="flex items-center gap-2 border-b border-[#E7E3F5] bg-zinc-100/50 bg-white/85 backdrop-blur-md/50 px-6 py-4">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="text-[#765DFB]"
												>
													<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
												</svg>
												<h3 className="text-[14px] font-bold uppercase tracking-widest text-[#765DFB]">
													Active Team Members
												</h3>
											</div>
											<div className="divide-y divide-[#E7E3F5]/80">
												{teamMembers.map((member) => (
													<div
														key={member.id}
														className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 transition-all duration-300 ease-out hover:bg-[#F9F8FF]/80"
													>
														<div className="flex items-center gap-4">
															<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#765DFB]/10 text-[14px] font-semibold text-[#765DFB]">
																{member.email.charAt(0).toUpperCase()}
															</div>
															<div>
																<p className="text-[14px] font-semibold text-[#00050E]">
																	{member.email}
																	{member.role === "Super Admin" && (
																		<span className="ml-2 rounded bg-[#765DFB]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#765DFB]">
																			SUPER ADMIN
																		</span>
																	)}
																</p>
															</div>
														</div>

														<div className="flex items-center gap-6">
															<div className="w-32">
																<p className="text-[13px] text-[#444759]">
																	Role
																</p>
																<p className="text-[14px] font-medium text-[#444759]">
																	{member.role}
																</p>
															</div>
															<div className="w-24">
																<p className="text-[13px] text-[#444759]">
																	Joined
																</p>
																<p className="text-[14px] font-medium text-[#444759]">
																	{new Date(
																		member.created_at,
																	).toLocaleDateString(undefined, {
																		month: "short",
																		day: "numeric",
																	})}
																</p>
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
									</>
								)}
							</div>
						) : !isEditingMode ? (
							activeKind === "articles" ? (
								<ArticlesListView
									records={visibleRecords}
									searchQuery={searchQuery}
									setSearchQuery={setSearchQuery}
									statusFilter={statusFilter}
									setStatusFilter={setStatusFilter}
									onEdit={(id) => {
										setSelectedId(id)
										setSaveMessage("")
										setIsEditingMode(true)
									}}
									onCreate={createArticle}
								/>
							) : (
								<section className="min-w-0 flex flex-col">
									<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
										<label className="flex h-9 min-w-0 items-center gap-2 rounded-md border border-[#E7E3F5] bg-white/85 backdrop-blur-md px-3 text-[#92909b] sm:max-w-[320px] sm:flex-1">
											<Search className="h-3.5 w-3.5 shrink-0" />
											<input
												value={searchQuery}
												onChange={(event) => setSearchQuery(event.target.value)}
												placeholder="Search content"
												className="w-full bg-transparent text-[14px] text-[#00050E] outline-none placeholder:text-zinc-400"
											/>
										</label>
										<div className="flex items-center gap-2">
											<span className="text-[14px] sm:text-[14px] uppercase tracking-[0.08em] text-[#444759]">
												Status
											</span>
											<select
												value={statusFilter}
												onChange={(event) =>
													setStatusFilter(
														event.target.value as "All" | ContentStatus,
													)
												}
												className="h-9 rounded-md border border-[#E7E3F5] bg-white/85 backdrop-blur-md px-3 text-[14px] text-[#444759] outline-none focus:border-[#765DFB]"
											>
												<option
													className="bg-white text-zinc-900 bg-white/85 backdrop-blur-md text-[#00050E]"
													value="All"
												>
													All statuses
												</option>
												<option
													className="bg-white text-zinc-900 bg-white/85 backdrop-blur-md text-[#00050E]"
													value="Published"
												>
													Published
												</option>
												<option
													className="bg-white text-zinc-900 bg-white/85 backdrop-blur-md text-[#00050E]"
													value="Draft"
												>
													Draft
												</option>
											</select>
										</div>
									</div>

									<div className="mt-3 overflow-hidden rounded-lg border border-[#E7E3F5] bg-white/85 backdrop-blur-md">
										<div className="hidden grid-cols-[minmax(0,1fr)_110px_130px_105px] gap-3 border-b border-[#E7E3F5] bg-zinc-100/50 bg-white/85 backdrop-blur-md/50 px-4 py-3 text-[9px] font-medium uppercase tracking-widest text-[#6b6e80] sm:grid">
											<span>Title</span>
											<span>Type</span>
											<span>Updated</span>
											<span>Status</span>
										</div>
										{visibleRecords.map((record) => (
											<button
												key={record.id}
												type="button"
												onClick={() => {
													setSelectedId(record.id)
													setSaveMessage("")
													setIsEditingMode(true)
												}}
												className={`grid w-full grid-cols hover:-translate-y-[1px] hover:shadow-md (0,1fr)_auto] items-center gap-3 border-b border-zinc-100 border-[#E7E3F5]/60 px-5 py-4 text-left transition-all duration-300 ease-out last:border-b-0 sm:grid-cols-[minmax(0,1fr)_110px_130px_105px] ${selectedRecord?.id === record.id ? "bg-violet-50 " : "hover:bg-zinc-100/50 bg-white/85 backdrop-blur-md/50 hover:bg-[#F9F8FF] "}`}
											>
												<span className="flex min-w-0 items-center gap-3">
													<span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#E7E3F5] bg-zinc-100 bg-[#F9F8FF]/80">
														{record.image ? (
															<img
																src={record.image}
																alt=""
																className="h-full w-full object-cover"
															/>
														) : (
															<PanelsTopLeft className="h-4 w-4 text-[#9189bd]" />
														)}
													</span>
													<span className="min-w-0">
														<span className="block truncate text-[14px] font-medium text-[#00050E]">
															{record.title}
														</span>
														<span className="mt-1 block truncate text-[14px] sm:text-[14px] text-[#6b6e80]">
															/{record.slug}
														</span>
													</span>
												</span>
												<span className="hidden text-[14px] text-[#444759] sm:block">
													{record.kind === "articles"
														? record.category
														: "Industry"}
												</span>
												<span className="hidden text-[14px] text-[#444759] sm:block">
													{record.updated}
												</span>
												<span
													className={`justify-self-end rounded-full px-2.5 py-1 text-[9px] font-medium ${record.status === "Published" ? "bg-[#e8f4ec] text-[#327048]" : "bg-[#fff3dc] text-[#9a6712]"}`}
												>
													{record.status}
												</span>
											</button>
										))}
										{visibleRecords.length === 0 && (
											<p className="px-4 py-10 text-center text-[14px] text-[#444759]">
												No content matches these filters.
											</p>
										)}
									</div>
								</section>
							)
						) : (
							<section className="mx-auto w-full max-w-[1400px] flex flex-col lg:flex-row gap-6">
								{selectedRecord && (
									<>
										{/* Left Main Column */}
										<div className="flex-1 min-w-0 flex flex-col gap-6">
											{/* Header */}
											<div>
												<button
													onClick={() => setIsEditingMode(false)}
													className="mb-4 flex items-center gap-2 text-[14px] font-medium text-[#444759] hover:text-zinc-900 transition-colors"
												>
													<ArrowLeft className="h-4 w-4" /> Back to{" "}
													{selectedRecord.kind === "articles"
														? "Articles"
														: "Pages"}
												</button>
												<div className="flex items-start justify-between">
													<div>
														<h2 className="text-2xl font-bold text-[#00050E]">
															{selectedRecord.id.startsWith("untitled")
																? "Create New Article"
																: "Edit Article"}
														</h2>
														<p className="text-sm text-[#444759] mt-1">
															Write something amazing. Your next article could
															be the one.
														</p>
													</div>
													<div className="flex items-center gap-2">
														<button className="flex items-center gap-2 h-10 px-4 rounded-md border border-zinc-200 border-[#E7E3F5] bg-white/85 backdrop-blur-md text-sm font-medium text-[#444759] hover:bg-zinc-50 hover:bg-[#F9F8FF] transition-colors">
															<ArrowUpRight className="h-4 w-4" /> Preview
														</button>
														<button
															onClick={() => saveSelected("Published")}
															className="flex items-center gap-2 h-10 px-4 rounded-md bg-[#1d4ed8] text-sm font-medium text-white hover:bg-blue-700 transition-colors"
														>
															Publish <ChevronDown className="h-4 w-4 ml-1" />
														</button>
													</div>
												</div>
											</div>

											{/* Main Form Fields */}
											<div className="bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] shadow-sm p-6 space-y-6">
												{/* Title */}
												<div>
													<label className="block text-sm font-medium text-[#00050E] mb-2">
														Title <span className="text-red-500">*</span>
													</label>
													<input
														value={selectedRecord.title}
														onChange={(e) =>
															updateSelected({ title: e.target.value })
														}
														placeholder="Enter article title..."
														className="w-full h-11 px-4 rounded-md border border-[#E7E3F5] bg-transparent text-sm outline-none focus:border-blue-500 text-[#00050E]"
													/>
													<p className="text-right text-xs text-[#444759] mt-1">
														0/100
													</p>
												</div>

												{/* Cover Image */}
												<div>
													<label className="block text-sm font-medium text-[#00050E] mb-2">
														Cover Image
													</label>
													<div className="mt-2">
														<ImageUploadInput
															placeholder="Featured Image URL (or upload PNG)"
															value={selectedRecord.image || ""}
															onChange={(v) => updateSelected({ image: v })}
														/>
													</div>
												</div>

												{/* Categories, Tags, Author */}
												<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
													<div>
														<label className="block text-sm font-medium text-[#00050E] mb-2">
															Category <span className="text-red-500">*</span>
														</label>
														<select
															value={selectedRecord.category}
															onChange={(e) =>
																updateSelected({ category: e.target.value })
															}
															className="w-full h-11 px-4 rounded-md border border-[#E7E3F5] bg-transparent text-sm outline-none focus:border-blue-500 text-[#00050E]"
														>
															{(selectedRecord.kind === "articles"
																? blogCategories.filter((c) => c !== "All")
																: ["Industry"]
															).map((c) => (
																<option
																	className="bg-white text-zinc-900 bg-white/85 backdrop-blur-md text-[#00050E]"
																	key={c}
																	value={c}
																>
																	{c}
																</option>
															))}
														</select>
													</div>
													<div>
														<label className="block text-sm font-medium text-[#00050E] mb-2">
															Tags
														</label>
														<input
															value={selectedRecord.tags || ""}
															onChange={(e) =>
																updateSelected({ tags: e.target.value })
															}
															placeholder="Add tags (comma separated)..."
															className="w-full h-11 px-4 rounded-md border border-[#E7E3F5] bg-transparent text-sm outline-none focus:border-blue-500 text-[#00050E]"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-[#00050E] mb-2">
															Author
														</label>
														<select
															value={selectedRecord.author || ""}
															onChange={(e) =>
																updateSelected({ author: e.target.value })
															}
															className="w-full h-11 px-4 rounded-md border border-[#E7E3F5] bg-transparent text-sm outline-none focus:border-blue-500 text-[#00050E]"
														>
															<option value="">Select Author...</option>
															{initialTeam.map((m) => (
																<option key={m.id} value={m.name || m.email}>
																	{m.name || m.email}
																</option>
															))}
														</select>
													</div>
												</div>

												{/* Content Area with rich text toolbar */}
												<div>
													<label className="block text-sm font-medium text-[#00050E] mb-2">
														Content <span className="text-red-500">*</span>
													</label>
													<div className="border border-[#E7E3F5] rounded-md overflow-hidden">
														{/* CMS Editor block */}
														<div className="p-4 bg-zinc-50/30 ">
															{selectedRecord.kind === "industries" ? (
																<IndustryPageEditor
																	record={selectedRecord}
																	onUpdate={updateSelected}
																/>
															) : (
																<ArticleFixedEditor
																	record={selectedRecord}
																	onUpdate={updateSelected}
																/>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Right Sidebar Column */}
										<div className="w-full lg:w-[320px] xl:w-[360px] flex flex-col gap-6 shrink-0">
											{/* Publishing Settings */}
											<div className="bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] shadow-sm p-5">
												<h3 className="text-sm font-bold text-[#00050E] mb-4">
													Publishing Settings
												</h3>

												<div className="mb-5">
													<label className="block text-xs font-medium text-[#444759] mb-2">
														Status
													</label>
													<div className="flex gap-2">
														{["Draft", "Published", "Scheduled"].map(
															(status) => (
																<button
																	key={status}
																	onClick={() =>
																		saveSelected(status as ContentStatus)
																	}
																	className={`px-3 py-1.5 rounded-full text-xs font-medium ${selectedRecord.status === status ? "ring-2 ring-offset-1 ring-blue-500 " : ""} ${status === "Draft" ? "bg-orange-100 text-orange-700 " : status === "Published" ? "bg-emerald-100 text-emerald-700 " : "bg-purple-100 text-purple-700 "}`}
																>
																	{status}
																</button>
															),
														)}
													</div>
												</div>

												<div className="mb-5">
													<label className="block text-xs font-medium text-[#444759] mb-2">
														Publish Date
													</label>
													<div className="flex items-center h-10 px-3 rounded-md border border-zinc-200 border-[#E7E3F5] bg-transparent text-sm">
														<Clock3 className="h-4 w-4 text-zinc-400 mr-2" />
														<span className="text-[#444759]">
															{new Date().toLocaleString(undefined, {
																month: "short",
																day: "numeric",
																year: "numeric",
																hour: "numeric",
																minute: "2-digit",
															})}
														</span>
														<ChevronDown className="h-4 w-4 text-zinc-400 ml-auto" />
													</div>
												</div>

												<div>
													<label className="block text-xs font-medium text-[#444759] mb-2">
														Featured
													</label>
													<div className="flex items-center gap-3">
														<div className="relative inline-block w-10 mr-2 align-middle select-none">
															<input
																type="checkbox"
																name="toggle"
																id="featured-toggle"
																checked={selectedRecord.featured || false}
																onChange={(e) =>
																	updateSelected({ featured: e.target.checked })
																}
																className="checked:bg-blue-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-zinc-300 bg-[#F9F8FF]/80"
															/>
															<label
																htmlFor="featured-toggle"
																className="block overflow-hidden h-6 rounded-full bg-zinc-300 cursor-pointer"
															/>
														</div>
														<span className="text-xs text-[#444759]">
															Show this article on homepage
														</span>
													</div>
												</div>
											</div>

											{/* SEO Settings */}
											<div className="bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] shadow-sm p-5">
												<h3 className="text-sm font-bold text-[#00050E] mb-4">
													SEO Settings
												</h3>

												<div className="mb-4">
													<label className="block text-xs font-medium text-[#444759] mb-1.5">
														Meta Title
													</label>
													<input
														value={selectedRecord.metaTitle || ""}
														onChange={(e) =>
															updateSelected({ metaTitle: e.target.value })
														}
														placeholder="Enter meta title..."
														className="w-full h-9 px-3 rounded-md border border-zinc-200 border-[#E7E3F5] bg-transparent text-xs outline-none focus:border-blue-500 text-[#00050E]"
													/>
													<p className="text-right text-[10px] text-zinc-500 mt-1">
														0/60
													</p>
												</div>
												<div className="mb-4">
													<label className="block text-xs font-medium text-[#444759] mb-1.5">
														Meta Description
													</label>
													<textarea
														value={selectedRecord.summary}
														onChange={(e) =>
															updateSelected({ summary: e.target.value })
														}
														placeholder="Enter meta description..."
														rows={3}
														className="w-full p-3 rounded-md border border-zinc-200 border-[#E7E3F5] bg-transparent text-xs outline-none focus:border-blue-500 text-[#00050E] resize-none"
													/>
													<p className="text-right text-[10px] text-zinc-500 mt-1">
														{selectedRecord.summary?.length || 0}/160
													</p>
												</div>
												<div>
													<label className="block text-xs font-medium text-[#444759] mb-1.5">
														Focus Keyword *
													</label>
													<div className="relative">
														<input
															value={selectedRecord.focusKeyword || ""}
															onChange={(e) =>
																updateSelected({ focusKeyword: e.target.value })
															}
															placeholder="e.g. web development"
															className="w-full h-9 pl-3 pr-8 rounded-md border border-zinc-200 border-[#E7E3F5] bg-transparent text-xs outline-none focus:border-blue-500 text-[#00050E]"
														/>
														<Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-400" />
													</div>
												</div>
											</div>

											{/* Permalink */}
											<div className="bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] shadow-sm p-5">
												<h3 className="text-sm font-bold text-[#00050E] mb-4">
													Permalink (URL Slug)
												</h3>
												<div className="flex h-9 rounded-md border border-zinc-200 border-[#E7E3F5] focus-within:border-blue-500 overflow-hidden">
													<div className="h-full px-3 flex items-center bg-zinc-50 bg-[#F9F8FF]/80/50 border-r border-zinc-200 border-[#E7E3F5] text-[#444759] text-xs">
														/
													</div>
													<input
														value={selectedRecord.slug}
														onChange={(e) =>
															updateSelected({ slug: e.target.value })
														}
														placeholder="article-url-slug"
														className="flex-1 h-full px-3 bg-transparent text-xs outline-none text-[#00050E] min-w-0"
													/>
												</div>
											</div>

											{/* Quick Actions */}
											<div className="bg-white/85 backdrop-blur-md rounded-xl border border-[#E7E3F5] shadow-sm p-5">
												<h3 className="text-sm font-bold text-[#00050E] mb-4">
													Quick Actions
												</h3>
												<div className="flex gap-3">
													<button
														onClick={() => saveSelected("Draft")}
														className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md border border-zinc-200 border-[#E7E3F5] text-sm font-medium hover:bg-zinc-50 hover:bg-[#F9F8FF] transition-colors text-[#444759]"
													>
														<FileText className="h-4 w-4 text-blue-600 " />{" "}
														Save Draft
													</button>
													<button
														onClick={() => saveSelected("Published")}
														className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-[#1d4ed8] text-sm font-medium text-white hover:bg-blue-700 transition-colors"
													>
														<svg
															width="16"
															height="16"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
														>
															<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
														</svg>{" "}
														Publish
													</button>
												</div>
												{saveMessage && (
													<p className="mt-3 text-center text-xs font-medium text-emerald-600 ">
														{saveMessage}
													</p>
												)}
											</div>
											<button
												type="button"
												onClick={deleteSelected}
												className="w-full text-center h-10 rounded-md border border-red-200 text-sm font-medium hover:bg-red-50 transition-colors text-red-600 "
											>
												Delete Article
											</button>
										</div>
									</>
								)}
							</section>
						)}
					</div>
					{previewMode === "split" && selectedRecord && (
						<div className="hidden lg:block overflow-y-auto bg-[#FAFAFB]">
							<div className="pointer-events-none origin-top-left scale-[0.8] w-[125%]">
								{selectedRecord.kind === "articles" ? (
									<BlogArticlePage
										previewArticle={{
											id: selectedRecord.slug,
											slug: selectedRecord.slug,
											title: selectedRecord.title,
											category: selectedRecord.category,
											summary: selectedRecord.summary,
											author: selectedRecord.author,
											image: selectedRecord.image,
											created_at: new Date().toISOString(),
											content: { blocks: selectedRecord.blocks || [] },
										}}
									/>
								) : (() => {
									let industryContent: any = {}
									try {
										if (selectedRecord.blocks?.[0]?.content) {
											industryContent = JSON.parse(selectedRecord.blocks[0].content)
										}
									} catch (e) {
										/* ignore */
									}
									return (
										<IndustryPage
											previewIndustry={{
												slug: selectedRecord.slug,
												name: selectedRecord.title,
												...industryContent,
											}}
											onNavigate={() => {}}
										/>
									)
								})()}
							</div>
						</div>
					)}
				</main>
			</div>
		</div>
	)
}

const ArticleFixedEditor = ({
	record,
	onUpdate,
}: {
	record: CMSRecord
	onUpdate: (c: Partial<CMSRecord>) => void
}) => {
	function getEditorData(): any {
		if (record.blocks?.[0]?.content) {
			try {
				return JSON.parse(record.blocks[0].content)
			} catch {
				return {}
			}
		}
		return {}
	}
	const data = getEditorData()
	const updateField = (key: string, value: any) => {
		const newData = { ...data, [key]: value }
		onUpdate({
			blocks: [
				{
					id: record.blocks?.[0]?.id || "block-1",
					type: "text",
					content: JSON.stringify(newData),
				},
			],
		})
	}

	return (
		<div className="mt-8 border-t border-[#E7E3F5] pt-8 space-y-2">
			<div className="mb-5">
				<h3 className="text-[14px] font-semibold text-[#00050E]">
					Blog Article Content (Fixed Template)
				</h3>
				<p className="mt-1 text-sm text-[#444759]">
					Fill out all sections. This content will be mapped to the S1-S6 layout
					on the frontend.
				</p>
			</div>

			<SectionDivider
				number="01"
				label="Section 1: Introduction"
				defaultOpen={true}
			>
				<FieldInput
					label="Section 1 Title"
					value={data.s1_title || ""}
					onChange={(v) => updateField("s1_title", v)}
					placeholder="Why context disappears"
				/>
				<FieldTextarea
					label="Paragraph 1"
					value={data.s1_p1 || ""}
					onChange={(v) => updateField("s1_p1", v)}
				/>
				<FieldTextarea
					label="Paragraph 2 (Optional)"
					value={data.s1_p2 || ""}
					onChange={(v) => updateField("s1_p2", v)}
				/>
			</SectionDivider>

			<SectionDivider number="02" label="Section 2: Core Concept">
				<FieldInput
					label="Section 2 Title"
					value={data.s2_title || ""}
					onChange={(v) => updateField("s2_title", v)}
				/>
				<FieldTextarea
					label="Paragraph 1"
					value={data.s2_p1 || ""}
					onChange={(v) => updateField("s2_p1", v)}
				/>
				<FieldInput
					label="Key Idea Quote"
					value={data.s2_keyIdeaQuote || ""}
					onChange={(v) => updateField("s2_keyIdeaQuote", v)}
					placeholder="Context becomes useful when it persists..."
				/>

				<div className="pt-2">
					<p className="text-[14px] font-medium text-[#444759] mb-2">
						Bullet Points
					</p>
					<div className="space-y-3">
						{(data.s2_bullets || ["", "", ""]).map(
							(bullet: string, i: number) => (
								<div key={i} className="flex gap-2">
									<input
										value={bullet}
										onChange={(e) => {
											const newB = [...(data.s2_bullets || ["", "", ""])]
											newB[i] = e.target.value
											updateField("s2_bullets", newB)
										}}
										className="flex-1 h-9 rounded-md border border-[#E7E3F5] px-3 text-[14px] outline-none focus:border-[#765DFB]"
										placeholder={`Bullet point ${i + 1}`}
									/>
								</div>
							),
						)}
					</div>
				</div>
			</SectionDivider>

			<SectionDivider number="03" label="Section 3: Deep Dive">
				<FieldInput
					label="Section 3 Title"
					value={data.s3_title || ""}
					onChange={(v) => updateField("s3_title", v)}
				/>
				<FieldTextarea
					label="Paragraph 1"
					value={data.s3_p1 || ""}
					onChange={(v) => updateField("s3_p1", v)}
				/>
				<div className="pt-2">
					<p className="text-[14px] font-medium text-[#444759] mb-2">
						Bullet Points
					</p>
					<div className="space-y-3">
						{(data.s3_bullets || ["", "", ""]).map(
							(bullet: string, i: number) => (
								<div key={i} className="flex gap-2">
									<input
										value={bullet}
										onChange={(e) => {
											const newB = [...(data.s3_bullets || ["", "", ""])]
											newB[i] = e.target.value
											updateField("s3_bullets", newB)
										}}
										className="flex-1 h-9 rounded-md border border-[#E7E3F5] px-3 text-[14px] outline-none focus:border-[#765DFB]"
										placeholder={`Bullet point ${i + 1}`}
									/>
								</div>
							),
						)}
					</div>
				</div>
				<div className="pt-2">
					<label className="block text-sm font-medium text-[#444759] mb-2">
						Section Image (Optional)
					</label>
					<ImageUploadInput
						placeholder="Image URL (or upload PNG)"
						value={data.s3_image || ""}
						onChange={(v) => updateField("s3_image", v)}
					/>
				</div>
			</SectionDivider>

			<SectionDivider number="04" label="Section 4: Technical Details">
				<FieldInput
					label="Section 4 Title"
					value={data.s4_title || ""}
					onChange={(v) => updateField("s4_title", v)}
				/>
				<FieldTextarea
					label="Paragraph 1"
					value={data.s4_p1 || ""}
					onChange={(v) => updateField("s4_p1", v)}
				/>
				<FieldTextarea
					label="Code Snippet"
					value={data.s4_code || ""}
					onChange={(v) => updateField("s4_code", v)}
					rows={5}
					placeholder="const memory = await ..."
				/>
				<FieldTextarea
					label="Closing Quote (Optional)"
					value={data.s4_quote || ""}
					onChange={(v) => updateField("s4_quote", v)}
					rows={2}
					placeholder="The systems that feature PiyApi won't be apps you turn to for everything..."
				/>
			</SectionDivider>

			<SectionDivider number="05" label="Section 5: Implementation">
				<FieldInput
					label="Section 5 Title"
					value={data.s5_title || ""}
					onChange={(v) => updateField("s5_title", v)}
				/>
				<FieldTextarea
					label="Paragraph 1"
					value={data.s5_p1 || ""}
					onChange={(v) => updateField("s5_p1", v)}
				/>
				<div className="pt-2">
					<p className="text-[14px] font-medium text-[#444759] mb-2">
						Comparison Table (3 rows)
					</p>
					<div className="space-y-3">
						{(
							data.s5_table || [
								{ left: "", right: "" },
								{ left: "", right: "" },
								{ left: "", right: "" },
							]
						).map((row: any, i: number) => (
							<div key={i} className="flex gap-2">
								<input
									value={row.left}
									onChange={(e) => {
										const newT = [
											...(data.s5_table || [
												{ left: "", right: "" },
												{ left: "", right: "" },
												{ left: "", right: "" },
											]),
										]
										newT[i].left = e.target.value
										updateField("s5_table", newT)
									}}
									placeholder="Without Memory"
									className="flex-1 h-9 rounded-md border border-[#E7E3F5] px-3 text-[14px] outline-none focus:border-[#765DFB]"
								/>
								<input
									value={row.right}
									onChange={(e) => {
										const newT = [
											...(data.s5_table || [
												{ left: "", right: "" },
												{ left: "", right: "" },
												{ left: "", right: "" },
											]),
										]
										newT[i].right = e.target.value
										updateField("s5_table", newT)
									}}
									placeholder="With Memory"
									className="flex-1 h-9 rounded-md border border-[#E7E3F5] px-3 text-[14px] outline-none focus:border-[#765DFB]"
								/>
							</div>
						))}
					</div>
				</div>
			</SectionDivider>

			<SectionDivider number="06" label="Section 6: Conclusion">
				<FieldInput
					label="Section 6 Title"
					value={data.s6_title || ""}
					onChange={(v) => updateField("s6_title", v)}
				/>
				<FieldTextarea
					label="Paragraph 1"
					value={data.s6_p1 || ""}
					onChange={(v) => updateField("s6_p1", v)}
				/>
			</SectionDivider>
		</div>
	)
}

/* ── Industry Page Section-by-Section Editor ── */

const SectionDivider = ({
	number,
	label,
	defaultOpen = false,
	children,
}: {
	number: string
	label: string
	defaultOpen?: boolean
	children: React.ReactNode
}) => {
	const [open, setOpen] = useState(defaultOpen)
	return (
		<div className="border-t border-[#E7E3F5]">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex w-full items-center justify-between py-4 text-left transition-all duration-300 ease-out hover:bg-[#faf9fc] rounded-md px-2 -mx-2"
			>
				<span className="flex items-center gap-3">
					<span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#765DFB]/10 text-[14px] sm:text-[14px] font-bold text-[#765DFB]">
						{number}
					</span>
					<span className="text-[14px] font-semibold text-[#00050E]">
						{label}
					</span>
				</span>
				<ChevronDown
					className={`h-4 w-4 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
				/>
			</button>
			{open && <div className="space-y-5 pb-6 px-1">{children}</div>}
		</div>
	)
}

const FieldInput = ({
	label,
	value,
	onChange,
	placeholder,
}: {
	label: string
	value: string
	onChange: (v: string) => void
	placeholder?: string
}) => (
	<label className="block">
		<span className="text-[14px] font-medium text-[#444759]">
			{label}
		</span>
		<input
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className="mt-2 h-10 w-full rounded-md border border-[#E7E3F5] px-3.5 text-[14px] outline-none focus:border-[#765DFB]"
		/>
	</label>
)

const FieldTextarea = ({
	label,
	value,
	onChange,
	rows = 3,
	placeholder,
}: {
	label: string
	value: string
	onChange: (v: string) => void
	rows?: number
	placeholder?: string
}) => (
	<label className="block">
		<span className="text-[14px] font-medium text-[#444759]">
			{label}
		</span>
		<textarea
			value={value}
			onChange={(e) => onChange(e.target.value)}
			rows={rows}
			placeholder={placeholder}
			className="mt-2 w-full resize-y rounded-md border border-[#E7E3F5] px-3.5 py-2.5 text-[14px] leading-relaxed outline-none focus:border-[#765DFB]"
		/>
	</label>
)

interface IndustryEditorData {
	templateVersion?: "v1" | "v2"
	heroTitle?: string
	heroDescription?: string
	heroLede?: string
	facts?: { label: string; value: string }[]

	// New Template v2 (Education format)
	sessionHeading?: string
	sessionSub?: string
	sessionSteps?: {
		title: string
		note: string
		adds: { k: string; v: string }[]
		reply: string
	}[]
	whyHeading?: string
	whyParagraphs?: string[]
	blocksHeading?: string
	blocks?: { title: string; text: string; icon?: string }[]
	infraHeading?: string
	infraList?: { title: string; description: string }[]
	architecture?: {
		inputs?: { title: string; subtitle: string }[]
		core?: { eyebrow: string; title: string; ops: string }
		engine?: { title: string; text: string }[]
		loop?: string[]
	}
	faqHeading?: string

	// Legacy Template v1 fields
	contextTitle?: string
	contextDescription?: string
	contextImage?: string
	introTitle?: string
	introParagraphLeft?: string
	introParagraphRight?: string
	capabilitiesTitle?: string
	capabilities?: { title: string; description: string }[]
	infrastructureTitle?: string
	problems?: { title: string; description: string }[]
	flowSteps?: string[]
	architectureTitle?: string
	architectureImage?: string
	memoryTitle?: string
	memoryDescription?: string
	memorySteps?: string[]
	getStartedTitle?: string
	getStartedDescription?: string
	faqs?: { question: string; answer: string }[]
	finalCtaTitle?: string
	finalCtaDescription?: string
}

const IndustryPageEditor = ({
	record,
	onUpdate,
}: {
	record: CMSRecord
	onUpdate: (c: Partial<CMSRecord>) => void
}) => {
	// Find the matching industry data to pre-populate
	const industry = industryPages.find((ip) => ip.slug === record.slug)

	// Use blocks[0] as a JSON store for structured industry data, or populate from existing industry data
	function getEditorData(): IndustryEditorData {
		const raw = record.blocks?.[0]
		if (raw?.type === "hero" && raw.content) {
			try {
				const parsed = JSON.parse(raw.content)
				return {
					...parsed,
					templateVersion:
						parsed.templateVersion ||
						(record.slug === "education" ? "v2" : "v1"),
				}
			} catch (e) {
				/* ignore */
			}
		}
		// Pre-populate from existing industry data
		if (industry) {
			return {
				heroTitle: industry.heroTitle,
				heroDescription: industry.heroDescription,
				heroLede: industry.heroLede || industry.heroDescription,
				facts: [...industry.facts],
				sessionHeading: industry.sessionHeading || "Every session adds useful context.",
				sessionSub: industry.sessionSub || "PiyAPI remembers what matters across sessions...",
				sessionSteps: industry.sessionSteps
					? JSON.parse(JSON.stringify(industry.sessionSteps))
					: undefined,
				whyHeading: industry.whyHeading || `${industry.name} needs memory.`,
				whyParagraphs: industry.whyParagraphs
					? [...industry.whyParagraphs]
					: [],
				blocksHeading: industry.blocksHeading || "Four building blocks, one memory layer.",
				blocks: industry.blocks
					? JSON.parse(JSON.stringify(industry.blocks))
					: undefined,
				infraHeading: industry.infraHeading || `The infrastructure underneath ${industry.name.toLowerCase()}.`,
				infraList: industry.infraList
					? JSON.parse(JSON.stringify(industry.infraList))
					: undefined,
				architecture: industry.architecture
					? JSON.parse(JSON.stringify(industry.architecture))
					: undefined,
				faqHeading: industry.faqHeading || "Frequently asked questions.",
				faqs: industry.faqs.map((f) => ({ ...f })),
				finalCtaTitle: industry.finalCtaTitle,
				finalCtaDescription: industry.finalCtaDescription,
			}
		}
		return {}
	}

	const [data, setData] = useState<IndustryEditorData>(getEditorData)

	const persist = (updated: IndustryEditorData) => {
		setData(updated)
		onUpdate({
			blocks: [
				{ id: "industry-data", type: "hero", content: JSON.stringify(updated) },
			],
		})
	}

	const updateField = <K extends keyof IndustryEditorData>(
		key: K,
		value: IndustryEditorData[K],
	) => {
		persist({ ...data, [key]: value })
	}

	const updateFactField = (
		index: number,
		field: "label" | "value",
		value: string,
	) => {
		const facts = [
			...(data.facts || [
				{ label: "", value: "" },
				{ label: "", value: "" },
				{ label: "", value: "" },
				{ label: "", value: "" },
			]),
		]
		facts[index] = { ...facts[index], [field]: value }
		persist({ ...data, facts })
	}

	// Unified Template Handlers

	const ensureSessionSteps =
		data.sessionSteps && data.sessionSteps.length > 0
			? data.sessionSteps
			: [
					{
						title: "First session",
						note: "The first session creates context.",
						adds: [
							{ k: "Interest", v: "Primary focus" },
							{ k: "Goal", v: "Core objective" },
						],
						reply: "Starting with foundational context...",
					},
					{
						title: "Known strengths",
						note: "Recognizing established capabilities.",
						adds: [{ k: "Strength", v: "Key strengths" }],
						reply: "Building upon prior strengths...",
					},
					{
						title: "Learning gaps",
						note: "Storing recurring difficulties.",
						adds: [{ k: "Difficulty", v: "Identified edge case" }],
						reply: "Adapting to bypass bottlenecks...",
					},
					{
						title: "Interaction history",
						note: "Timeline of prior events.",
						adds: [
							{ k: "Progress", v: "Milestone reached" },
							{ k: "Behaviour", v: "Interaction habit" },
						],
						reply: "Continuing from milestone...",
					},
					{
						title: "Personalised next session",
						note: "Next interaction starts primed with context.",
						adds: [{ k: "Preference", v: "Tailored output format" }],
						reply: "Here is your personalised result with prior context.",
					},
				]

	const updateSessionStep = (
		stepIndex: number,
		field: "title" | "note" | "reply",
		value: string,
	) => {
		const steps = [...ensureSessionSteps]
		steps[stepIndex] = { ...steps[stepIndex], [field]: value }
		persist({ ...data, sessionSteps: steps })
	}

	const updateSessionSignal = (
		stepIndex: number,
		signalIndex: number,
		field: "k" | "v",
		value: string,
	) => {
		const steps = [...ensureSessionSteps]
		const step = { ...steps[stepIndex] }
		const adds = [...step.adds]
		adds[signalIndex] = { ...adds[signalIndex], [field]: value }
		step.adds = adds
		steps[stepIndex] = step
		persist({ ...data, sessionSteps: steps })
	}

	const addSessionSignal = (stepIndex: number) => {
		const steps = [...ensureSessionSteps]
		const step = { ...steps[stepIndex] }
		step.adds = [...step.adds, { k: "Key", v: "Value" }]
		steps[stepIndex] = step
		persist({ ...data, sessionSteps: steps })
	}

	const removeSessionSignal = (stepIndex: number, signalIndex: number) => {
		const steps = [...ensureSessionSteps]
		const step = { ...steps[stepIndex] }
		step.adds = step.adds.filter((_, i) => i !== signalIndex)
		steps[stepIndex] = step
		persist({ ...data, sessionSteps: steps })
	}

	const ensureBlocks =
		data.blocks && data.blocks.length > 0
			? data.blocks
			: [
					{
						title: "Workflow copilots",
						text: "Remember progress, patterns and preferences so each session starts with context.",
						icon: "M12 4a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V8a4 4 0 0 1 4-4ZM5 20c1-3.5 3.7-5.5 7-5.5s6 2 7 5.5",
					},
					{
						title: "Deep semantic search",
						text: "Make recordings and documents searchable by meaning to jump straight to the right moment.",
						icon: "M4 6.5h16v11H4zM10 9.5v5l4.5-2.5L10 9.5Z",
					},
					{
						title: "Queryable knowledge libraries",
						text: "Let users and agents ask questions across transcripts, notes and reference materials.",
						icon: "M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 0 4 21.5ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 1 1.5 1.5Z",
					},
					{
						title: "Adaptive platforms",
						text: "Personalise at scale with persistent memory isolated to each user.",
						icon: "M4 18 9 12l4 3 7-9M15 6h5v5",
					},
				]

	const updateBlock = (
		index: number,
		field: "title" | "text" | "icon",
		value: string,
	) => {
		const blocks = [...ensureBlocks]
		blocks[index] = { ...blocks[index], [field]: value }
		persist({ ...data, blocks })
	}

	const ensureInfraList =
		data.infraList && data.infraList.length > 0
			? data.infraList
			: (data.problems || []).map((p) => ({
					title: p.title,
					description: p.description,
				}))

	const updateInfraItem = (
		index: number,
		field: "title" | "description",
		value: string,
	) => {
		const list = [...ensureInfraList]
		list[index] = { ...list[index], [field]: value }
		persist({ ...data, infraList: list, problems: list })
	}

	const ensureEngine =
		data.architecture?.engine && data.architecture.engine.length > 0
			? data.architecture.engine
			: [
					{
						title: "Extract",
						text: "Transform interaction into reusable knowledge",
					},
					{ title: "Search", text: "Retrieve relevant context" },
					{
						title: "Knowledge",
						text: "Domain material and persistent signals",
					},
					{
						title: "Retrieval system",
						text: "Semantic retrieval and relevant results",
					},
				]

	const updateEngineItem = (
		index: number,
		field: "title" | "text",
		value: string,
	) => {
		const engine = [...ensureEngine]
		engine[index] = { ...engine[index], [field]: value }
		persist({
			...data,
			architecture: { ...(data.architecture || {}), engine },
		})
	}



	const updateFaq = (
		index: number,
		field: "question" | "answer",
		value: string,
	) => {
		const faqs = [...(data.faqs || [])]
		faqs[index] = { ...faqs[index], [field]: value }
		persist({ ...data, faqs })
	}

	const addFaq = () => {
		persist({
			...data,
			faqs: [...(data.faqs || []), { question: "", answer: "" }],
		})
	}

	const removeFaq = (index: number) => {
		persist({ ...data, faqs: (data.faqs || []).filter((_, i) => i !== index) })
	}

	const ensureFacts = data.facts || [
		{ label: "", value: "" },
		{ label: "", value: "" },
		{ label: "", value: "" },
		{ label: "", value: "" },
	]

	const ensureFaqs = data.faqs || []

	return (
		<div className="mt-8 border-t border-[#E7E3F5] pt-6">

			<SectionDivider number="01" label="Hero Section" defaultOpen>
				<FieldInput
					label="Hero Title"
					value={data.heroTitle || ""}
					onChange={(v) => updateField("heroTitle", v)}
					placeholder="AI infrastructure for learning systems."
				/>
				<FieldTextarea
					label="Hero Description / Lede"
					value={data.heroLede || data.heroDescription || ""}
					onChange={(v) => {
						updateField("heroLede", v)
						updateField("heroDescription", v)
					}}
					placeholder="Build tutoring copilots, course search and adaptive learning products..."
				/>

				<div className="mt-4">
					<p className="text-[14px] font-medium text-[#444759] mb-3">
						Feature Facts (4 items)
					</p>
					<div className="grid gap-3 sm:grid-cols-2">
						{ensureFacts.map((fact, i) => (
							<div
								key={i}
								className="flex flex-col gap-2 rounded-md border border-[#E7E3F5] bg-zinc-100/50 bg-white/85 backdrop-blur-md/50 p-3"
							>
								<span className="text-[14px] font-bold text-[#8c8c99]">
									Fact 0{i + 1}
								</span>
								<input
									value={fact.label}
									onChange={(e) => updateFactField(i, "label", e.target.value)}
									placeholder="Label (e.g. Base)"
									className="h-9 rounded-md border border-[#E7E3F5] px-3 text-[14px] outline-none focus:border-[#765DFB]"
								/>
								<input
									value={fact.value}
									onChange={(e) => updateFactField(i, "value", e.target.value)}
									placeholder="Value (e.g. Isolated per-student memory)"
									className="h-9 rounded-md border border-[#E7E3F5] px-3 text-[14px] outline-none focus:border-[#765DFB]"
								/>
							</div>
						))}
					</div>
				</div>
			</SectionDivider>

			<SectionDivider
				number="02"
				label="Interactive Session Memory"
				defaultOpen
			>
						<FieldInput
							label="Section Heading"
							value={
								data.sessionHeading ||
								data.contextTitle ||
								"Every session adds useful context."
							}
							onChange={(v) => updateField("sessionHeading", v)}
							placeholder="Every session adds useful context."
						/>
						<FieldTextarea
							label="Section Subtitle"
							value={
								data.sessionSub ||
								data.contextDescription ||
								"PiyAPI remembers what matters across sessions..."
							}
							onChange={(v) => updateField("sessionSub", v)}
						/>

						<div className="mt-6 space-y-4">
							<p className="text-[14px] font-bold text-zinc-800 ">
								Interactive Session Steps (5 steps)
							</p>
							{ensureSessionSteps.map((s, stepIdx) => (
								<div
									key={stepIdx}
									className="rounded-xl border border-[#E7E3F5] bg-white/85 backdrop-blur-md/60 p-4 space-y-3"
								>
									<div className="flex items-center justify-between border-b border-zinc-100 border-[#E7E3F5] pb-2">
										<span className="text-xs font-bold text-[#765DFB]">
											Step 0{stepIdx + 1}
										</span>
									</div>
									<div className="grid gap-3 sm:grid-cols-2">
										<div>
											<label className="block text-xs font-medium text-[#444759] mb-1">
												Step Title
											</label>
											<input
												value={s.title}
												onChange={(e) =>
													updateSessionStep(stepIdx, "title", e.target.value)
												}
												className="w-full h-9 rounded-md border border-[#E7E3F5] px-3 text-xs outline-none focus:border-violet-600"
												placeholder="e.g. First session"
											/>
										</div>
										<div>
											<label className="block text-xs font-medium text-[#444759] mb-1">
												Note / Subtext
											</label>
											<input
												value={s.note}
												onChange={(e) =>
													updateSessionStep(stepIdx, "note", e.target.value)
												}
												className="w-full h-9 rounded-md border border-[#E7E3F5] px-3 text-xs outline-none focus:border-violet-600"
												placeholder="e.g. The first session creates context."
											/>
										</div>
									</div>

									<div>
										<label className="block text-xs font-medium text-[#444759] mb-1">
											Copilot Next Reply
										</label>
										<textarea
											value={s.reply}
											onChange={(e) =>
												updateSessionStep(stepIdx, "reply", e.target.value)
											}
											rows={2}
											className="w-full rounded-md border border-[#E7E3F5] p-2.5 text-xs outline-none focus:border-violet-600"
											placeholder="Copilot reply text..."
										/>
									</div>

									<div>
										<div className="flex items-center justify-between mb-2">
											<span className="text-xs font-medium text-[#444759]">
												Memory Signals Added ({s.adds.length})
											</span>
											<button
												type="button"
												onClick={() => addSessionSignal(stepIdx)}
												className="text-xs text-[#765DFB] font-medium hover:underline"
											>
												+ Add Signal
											</button>
										</div>
										<div className="space-y-2">
											{s.adds.map((sig, sigIdx) => (
												<div key={sigIdx} className="flex items-center gap-2">
													<input
														value={sig.k}
														onChange={(e) =>
															updateSessionSignal(
																stepIdx,
																sigIdx,
																"k",
																e.target.value,
															)
														}
														placeholder="Key (e.g. Interest)"
														className="w-1/3 h-8 rounded border border-[#E7E3F5] px-2.5 text-xs outline-none focus:border-violet-600"
													/>
													<input
														value={sig.v}
														onChange={(e) =>
															updateSessionSignal(
																stepIdx,
																sigIdx,
																"v",
																e.target.value,
															)
														}
														placeholder="Value (e.g. Physics)"
														className="flex-1 h-8 rounded border border-[#E7E3F5] px-2.5 text-xs outline-none focus:border-violet-600"
													/>
													<button
														type="button"
														onClick={() =>
															removeSessionSignal(stepIdx, sigIdx)
														}
														className="text-xs text-red-500 hover:text-red-700 px-2 py-1"
													>
														×
													</button>
												</div>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</SectionDivider>

					<SectionDivider number="03" label="Why Needs Memory">
						<FieldInput
							label="Section Heading"
							value={
								data.whyHeading ||
								data.introTitle ||
								"Personalised learning needs memory."
							}
							onChange={(v) => updateField("whyHeading", v)}
						/>
						<div className="grid gap-4 sm:grid-cols-2">
							<FieldTextarea
								label="Paragraph 1"
								value={
									data.whyParagraphs?.[0] ||
									data.introParagraphLeft ||
									""
								}
								onChange={(v) => {
									const p = [...(data.whyParagraphs || ["", ""])]
									p[0] = v
									persist({
										...data,
										whyParagraphs: p,
										introParagraphLeft: v,
									})
								}}
								rows={4}
							/>
							<FieldTextarea
								label="Paragraph 2"
								value={
									data.whyParagraphs?.[1] ||
									data.introParagraphRight ||
									""
								}
								onChange={(v) => {
									const p = [...(data.whyParagraphs || ["", ""])]
									p[1] = v
									persist({
										...data,
										whyParagraphs: p,
										introParagraphRight: v,
									})
								}}
								rows={4}
							/>
						</div>
					</SectionDivider>

					<SectionDivider number="04" label="Four Building Blocks">
						<FieldInput
							label="Section Heading"
							value={
								data.blocksHeading ||
								"Four building blocks, one memory layer."
							}
							onChange={(v) => updateField("blocksHeading", v)}
						/>
						<div className="grid gap-3 sm:grid-cols-2 mt-4">
							{ensureBlocks.map((b, i) => (
								<div
									key={i}
									className="rounded-lg border border-[#E7E3F5] p-3.5 space-y-2 bg-zinc-50/50 bg-white/85 backdrop-blur-md/50"
								>
									<span className="text-xs font-bold text-[#765DFB]">
										Block 0{i + 1}
									</span>
									<input
										value={b.title}
										onChange={(e) =>
											updateBlock(i, "title", e.target.value)
										}
										placeholder="Title"
										className="w-full h-8 rounded border border-[#E7E3F5] px-3 text-xs"
									/>
									<textarea
										value={b.text}
										onChange={(e) => updateBlock(i, "text", e.target.value)}
										placeholder="Description"
										rows={2}
										className="w-full rounded border border-[#E7E3F5] p-2 text-xs"
									/>
									<div>
										<label className="text-[10px] text-zinc-500 block mb-1">
											Icon SVG Path (optional)
										</label>
										<input
											value={b.icon || ""}
											onChange={(e) =>
												updateBlock(i, "icon", e.target.value)
											}
											placeholder="SVG Path (d='...')"
											className="w-full h-7 rounded border border-zinc-200 border-[#E7E3F5] px-2 font-mono text-[11px]"
										/>
									</div>
								</div>
							))}
						</div>
					</SectionDivider>

					<SectionDivider number="05" label="Infrastructure & Architecture">
						<FieldInput
							label="Section Heading"
							value={
								data.infraHeading ||
								"The infrastructure underneath adaptive learning."
							}
							onChange={(v) => updateField("infraHeading", v)}
						/>
						<div className="mt-4">
							<p className="text-xs font-bold text-[#444759] mb-2">
								Infrastructure Feature Cards (4 items)
							</p>
							<div className="grid gap-3 sm:grid-cols-2">
								{ensureInfraList.map((item, i) => (
									<div
										key={i}
										className="rounded-lg border border-[#E7E3F5] p-3 space-y-2 bg-zinc-50/50 bg-white/85 backdrop-blur-md/50"
									>
										<span className="text-xs font-bold text-[#765DFB]">
											Feature 0{i + 1}
										</span>
										<input
											value={item.title}
											onChange={(e) =>
												updateInfraItem(i, "title", e.target.value)
											}
											placeholder="Title"
											className="w-full h-8 rounded border border-[#E7E3F5] px-3 text-xs"
										/>
										<textarea
											value={item.description}
											onChange={(e) =>
												updateInfraItem(i, "description", e.target.value)
											}
											placeholder="Description"
											rows={2}
											className="w-full rounded border border-[#E7E3F5] p-2 text-xs"
										/>
									</div>
								))}
							</div>
						</div>

						<div className="mt-6">
							<p className="text-xs font-bold text-[#444759] mb-2">
								Architecture Engine Outputs (4 blocks)
							</p>
							<div className="grid gap-3 sm:grid-cols-2">
								{ensureEngine.map((item, i) => (
									<div
										key={i}
										className="rounded-lg border border-[#E7E3F5] p-3 space-y-1.5 bg-zinc-50/50 bg-white/85 backdrop-blur-md/50"
									>
										<input
											value={item.title}
											onChange={(e) =>
												updateEngineItem(i, "title", e.target.value)
											}
											placeholder="Output Title"
											className="w-full h-8 rounded border border-[#E7E3F5] px-3 text-xs font-semibold"
										/>
										<input
											value={item.text}
											onChange={(e) =>
												updateEngineItem(i, "text", e.target.value)
											}
											placeholder="Output Description"
											className="w-full h-8 rounded border border-[#E7E3F5] px-3 text-xs"
										/>
									</div>
								))}
							</div>
						</div>
					</SectionDivider>

			<SectionDivider number="07" label="Frequently Asked Questions">
				<div className="space-y-4">
					<FieldInput
						label="Section Heading"
						value={
							data.faqHeading ||
							"Frequently asked questions."
						}
						onChange={(v) => updateField("faqHeading", v)}
						placeholder="Frequently asked about memory."
					/>
					{ensureFaqs.map((faq, i) => (
						<div
							key={i}
							className="rounded-lg border border-[#E7E3F5] bg-zinc-100/50 bg-white/85 backdrop-blur-md/50 p-4 space-y-3"
						>
							<div className="flex items-center justify-between">
								<span className="text-[14px] font-bold text-[#765DFB]">
									FAQ {i + 1}
								</span>
								<button
									onClick={() => removeFaq(i)}
									className="text-[14px] font-medium text-red-500 hover:text-red-600 transition-all duration-300 ease-out"
								>
									Remove
								</button>
							</div>
							<input
								value={faq.question}
								onChange={(e) => updateFaq(i, "question", e.target.value)}
								placeholder="Question"
								className="w-full h-10 rounded-md border border-[#E7E3F5] px-3.5 text-[14px] outline-none focus:border-[#765DFB]"
							/>
							<textarea
								value={faq.answer}
								onChange={(e) => updateFaq(i, "answer", e.target.value)}
								placeholder="Answer"
								rows={3}
								className="w-full resize-y rounded-md border border-[#E7E3F5] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#765DFB]"
							/>
						</div>
					))}
					<button
						onClick={addFaq}
						className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-zinc-100 bg-[#F9F8FF]/80 px-4 text-[14px] font-semibold text-[#765DFB] border-l-2 border-violet-600 hover:bg-zinc-200 bg-[#F9F8FF]/80 transition-all duration-300 ease-out"
					>
						<Plus className="h-3.5 w-3.5" /> Add FAQ
					</button>
				</div>
			</SectionDivider>

			<SectionDivider number="08" label="Footer Call to Action">
				<FieldInput
					label="CTA Title"
					value={data.finalCtaTitle || data.getStartedTitle || ""}
					onChange={(v) => {
						updateField("finalCtaTitle", v)
						updateField("getStartedTitle", v)
					}}
					placeholder="Give every user a memory..."
				/>
				<FieldTextarea
					label="CTA Description"
					value={
						data.finalCtaDescription || data.getStartedDescription || ""
					}
					onChange={(v) => {
						updateField("finalCtaDescription", v)
						updateField("getStartedDescription", v)
					}}
				/>
			</SectionDivider>
		</div>
	)
}

export default AdminCMSPage;
