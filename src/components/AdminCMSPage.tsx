import { useState, useEffect, useRef } from "react"
import type React from "react"
import {
	ArrowLeft,
	ArrowUpRight,
	Check,
	ChevronDown,
	Clock3,
	FileText,
	LayoutDashboard,
	MoreHorizontal,
	PanelsTopLeft,
	Plus,
	Search,
	Users,
	Settings,
	UploadCloud,
	Loader2,
} from "lucide-react"
import { blogCategories } from "@/data/blogArticles"
import { industryPages } from "@/data/industryPages"
import { BlogArticlePage } from "./BlogArticlePage"
import { IndustryPage } from "./IndustryPage"
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
				className="min-w-0 flex-1 rounded-md border border-zinc-300 dark:border-zinc-700 px-3.5 py-2 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500 bg-transparent"
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
					className="flex shrink-0 items-center justify-center rounded-md border border-red-200 bg-red-50 px-3 text-red-600 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 disabled:opacity-50"
					title="Delete Image"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
				</button>
			)}
			<button
				type="button"
				onClick={() => fileInputRef.current?.click()}
				disabled={isUploading}
				className="flex shrink-0 items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 text-[13px] font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50"
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

	const toggleSelectAll = () => {
		if (selectedRecords.length === records.length) setSelectedRecords([])
		else setSelectedRecords(records.map((r) => r.id))
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
					<h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
						Articles
					</h1>
					<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
						Manage all your blog posts and articles.
					</p>
				</div>
				<button
					type="button"
					onClick={onCreate}
					className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#1d4ed8] px-4 text-[14px] font-medium text-white transition-all hover:bg-blue-700"
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
						className="w-full h-10 pl-9 pr-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151a23] text-sm text-zinc-900 dark:text-white outline-none focus:border-blue-500"
					/>
				</div>
				<div className="flex items-center gap-3">
					<select className="h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151a23] px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 outline-none w-36">
						<option>All Categories</option>
					</select>
					<select className="h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151a23] px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 outline-none w-36">
						<option>All Authors</option>
					</select>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151a23] px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 outline-none w-36"
					>
						<option value="All">All Status</option>
						<option value="Published">Published</option>
						<option value="Draft">Draft</option>
					</select>
					<select className="h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151a23] px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 outline-none w-32">
						<option>Newest</option>
						<option>Oldest</option>
					</select>
					<button className="h-10 w-10 flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151a23] text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800">
						<Settings className="h-4 w-4" />
					</button>
				</div>
			</div>

			{/* Bulk Actions & Pagination */}
			<div className="flex items-center justify-between py-2">
				<div className="flex items-center gap-4">
					<button
						onClick={toggleSelectAll}
						className={`w-4 h-4 rounded border ${selectedRecords.length === records.length && records.length > 0 ? "bg-blue-600 border-blue-600" : "border-zinc-300 dark:border-zinc-600"} flex items-center justify-center`}
					>
						{selectedRecords.length === records.length &&
							records.length > 0 && <Check className="h-3 w-3 text-white" />}
					</button>
					<div className="relative">
						<select className="h-9 appearance-none pl-3 pr-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151a23] text-sm text-zinc-700 dark:text-zinc-300 font-medium outline-none">
							<option>Bulk Actions</option>
						</select>
						<ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
					</div>
				</div>
				<div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
					<span>
						Showing 1-{Math.min(10, records.length)} of {records.length}
					</span>
					<div className="flex items-center gap-1">
						<button className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
							<ArrowLeft className="h-4 w-4" />
						</button>
						<button className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
							<ArrowUpRight
								className="h-4 w-4 rotate-45"
								style={{ transform: "rotate(45deg)" }}
							/>
						</button>{" "}
						{/* Using a close approximation for right arrow */}
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-sm whitespace-nowrap">
						<thead className="bg-zinc-50/50 dark:bg-zinc-800/30 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800/80">
							<tr>
								<th className="px-5 py-4 w-12" />
								<th className="px-5 py-4 font-medium">Title</th>
								<th className="px-5 py-4 font-medium">Author</th>
								<th className="px-5 py-4 font-medium">Category</th>
								<th className="px-5 py-4 font-medium">Tags</th>
								<th className="px-5 py-4 font-medium">Status</th>
								<th className="px-5 py-4 font-medium">Views</th>
								<th className="px-5 py-4 font-medium">Updated</th>
								<th className="px-5 py-4 w-12" />
							</tr>
						</thead>
						<tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
							{records.map((record) => (
								<tr
									key={record.id}
									onClick={() => onEdit(record.id)}
									className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer group"
								>
									<td className="px-5 py-4">
										<button
											onClick={(e) => toggleSelect(record.id, e)}
											className={`w-4 h-4 rounded border ${selectedRecords.includes(record.id) ? "bg-blue-600 border-blue-600" : "border-zinc-300 dark:border-zinc-600"} flex items-center justify-center`}
										>
											{selectedRecords.includes(record.id) && (
												<Check className="h-3 w-3 text-white" />
											)}
										</button>
									</td>
									<td className="px-5 py-4">
										<div className="flex items-center gap-3">
											<div className="h-10 w-12 rounded bg-zinc-200 dark:bg-zinc-800 overflow-hidden shrink-0">
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
											<div className="max-w-[280px]">
												<p className="font-medium text-zinc-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
													{record.title}
												</p>
												<p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
													{record.summary || "No summary available..."}
												</p>
											</div>
										</div>
									</td>
									<td className="px-5 py-4">
										<div className="flex items-center gap-2">
											<div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
												A
											</div>
											<span className="text-zinc-700 dark:text-zinc-300">
												Admin
											</span>
										</div>
									</td>
									<td className="px-5 py-4 text-zinc-700 dark:text-zinc-300">
										{record.category}
									</td>
									<td className="px-5 py-4">
										<div className="flex gap-1.5">
											<span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium">
												Web Dev
											</span>
											<span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-medium">
												+1
											</span>
										</div>
									</td>
									<td className="px-5 py-4">
										<span
											className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${record.status === "Published" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"}`}
										>
											{record.status}
										</span>
									</td>
									<td className="px-5 py-4 text-zinc-700 dark:text-zinc-300">
										1.2K
									</td>
									<td className="px-5 py-4 text-zinc-500 dark:text-zinc-400 text-xs">
										{record.updated}
									</td>
									<td className="px-5 py-4">
										<button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
											<MoreHorizontal className="h-4 w-4" />
										</button>
									</td>
								</tr>
							))}
							{records.length === 0 && (
								<tr>
									<td
										colSpan={9}
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
	onCreateArticle,
	onChangeKind,
}: {
	records: CMSRecord[]
	onCreateArticle: () => void
	onChangeKind: (kind: string) => void
}) => {
	const articles = records.filter((r) => r.kind === "articles")
	const published = articles.filter((r) => r.status === "Published")
	const drafts = articles.filter((r) => r.status === "Draft")

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
	}))

	return (
		<div className="max-w-7xl mx-auto space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
						Good morning, Admin! 👋
					</h1>
					<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
						Here's what's happening with your content today.
					</p>
				</div>
			</div>

			{/* Stats Row */}
			<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
				{[
					{
						label: "Total Articles",
						value: articles.length,
						trend: "Current",
						color: "text-blue-500",
						bg: "bg-blue-100 dark:bg-blue-500/20",
						icon: <FileText className="h-5 w-5" />,
					},
					{
						label: "Published",
						value: published.length,
						trend: "Live",
						color: "text-green-500",
						bg: "bg-green-100 dark:bg-green-500/20",
						icon: <Check className="h-5 w-5" />,
					},
					{
						label: "Drafts",
						value: drafts.length,
						trend: "Pending",
						color: "text-amber-500",
						bg: "bg-amber-100 dark:bg-amber-500/20",
						icon: <FileText className="h-5 w-5" />,
					},
				].map((stat, i) => (
					<div
						key={i}
						className="bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 p-5 shadow-sm"
					>
						<div className="flex items-center gap-4">
							<div
								className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}
							>
								{stat.icon}
							</div>
							<div>
								<p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
									{stat.label}
								</p>
								<p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
									{stat.value}
								</p>
							</div>
						</div>
						<div className="mt-4 flex items-center text-sm">
							<span className="font-medium text-emerald-600 dark:text-emerald-400">
								{stat.trend}
							</span>
							<span className="text-zinc-500 dark:text-zinc-400 ml-2">
								vs. last 30 days
							</span>
						</div>
					</div>
				))}
			</div>

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Recent Articles Table (Spans 2 columns) */}
				<div className="lg:col-span-2 bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm overflow-hidden flex flex-col">
					<div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800/80">
						<h2 className="font-semibold text-zinc-900 dark:text-white">
							Recent Articles
						</h2>
						<button
							onClick={() => onChangeKind("articles")}
							className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors"
						>
							View all →
						</button>
					</div>
					<div className="overflow-x-auto flex-1">
						<table className="w-full text-left text-sm whitespace-nowrap">
							<thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800/80">
								<tr>
									<th className="px-5 py-3 font-medium">Title</th>
									<th className="px-5 py-3 font-medium">Status</th>
									<th className="px-5 py-3 font-medium text-right">Updated</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
								{articles.slice(0, 5).map((article) => (
									<tr
										key={article.id}
										className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
									>
										<td className="px-5 py-4">
											<div className="flex items-center gap-3">
												<div className="h-10 w-10 rounded bg-zinc-200 dark:bg-zinc-800 overflow-hidden shrink-0">
													<div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-purple-500/20" />
												</div>
												<div className="truncate max-w-[200px] sm:max-w-[300px]">
													<p className="font-medium text-zinc-900 dark:text-white truncate">
														{article.title}
													</p>
													<p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
														{article.slug}
													</p>
												</div>
											</div>
										</td>
										<td className="px-5 py-4">
											<span
												className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${article.status === "Published" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"}`}
											>
												{article.status}
											</span>
										</td>
										<td className="px-5 py-4 text-right text-zinc-500 dark:text-zinc-400 text-xs">
											{article.updated}
										</td>
									</tr>
								))}
								{articles.length === 0 && (
									<tr>
										<td
											colSpan={3}
											className="px-5 py-8 text-center text-zinc-500 dark:text-zinc-400"
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
					<div className="bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm p-5">
						<h2 className="font-semibold text-zinc-900 dark:text-white mb-4">
							Drafts & Scheduled
						</h2>
						<div className="space-y-4">
							{drafts.slice(0, 3).map((draft) => (
								<div key={draft.id} className="flex gap-3">
									<div className="h-8 w-8 rounded bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
										<FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
									</div>
									<div className="min-w-0">
										<p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
											{draft.title}
										</p>
										<p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
											Updated {draft.updated}
										</p>
									</div>
								</div>
							))}
							{drafts.length === 0 && (
								<p className="text-sm text-zinc-500 dark:text-zinc-400">
									No drafts right now.
								</p>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Quick Actions */}
				<div className="bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm p-5">
					<h2 className="font-semibold text-zinc-900 dark:text-white mb-4">
						Quick Actions
					</h2>
					<div className="grid grid-cols-2 gap-3">
						<button
							onClick={onCreateArticle}
							className="flex flex-col items-center justify-center p-4 rounded-lg border border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors gap-2 group"
						>
							<div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
								<FileText className="h-5 w-5" />
							</div>
							<span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
								New Article
							</span>
						</button>
						<button
							onClick={() => alert("Media Manager coming soon!")}
							className="flex flex-col items-center justify-center p-4 rounded-lg border border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors gap-2 group"
						>
							<div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
								<UploadCloud className="h-5 w-5" />
							</div>
							<span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
								Upload Media
							</span>
						</button>
						<button
							onClick={() => alert("Category Manager coming soon!")}
							className="flex flex-col items-center justify-center p-4 rounded-lg border border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors gap-2 group"
						>
							<div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
								<PanelsTopLeft className="h-5 w-5" />
							</div>
							<span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
								Categories
							</span>
						</button>
						<button
							onClick={() => onChangeKind("team")}
							className="flex flex-col items-center justify-center p-4 rounded-lg border border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors gap-2 group"
						>
							<div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
								<Settings className="h-5 w-5" />
							</div>
							<span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
								Settings
							</span>
						</button>
					</div>
				</div>

				{/* Top Categories */}
				<div className="bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm p-5">
					<div className="flex items-center justify-between mb-4">
						<h2 className="font-semibold text-zinc-900 dark:text-white">
							Top Categories
						</h2>
						<button
							onClick={() => onChangeKind("articles")}
							className="text-xs font-medium text-violet-600 dark:text-violet-400"
						>
							View all
						</button>
					</div>
					<div className="space-y-4">
						{topCategories.length > 0 ? (
							topCategories.map((cat) => (
								<div key={cat.name} className="flex items-center gap-3">
									<div className="w-24 text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">
										{cat.name}
									</div>
									<div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
										<div
											className={`h-full ${cat.color} rounded-full`}
											style={{ width: `${cat.percent}%` }}
										/>
									</div>
									<div className="w-8 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400">
										{cat.count}
									</div>
								</div>
							))
						) : (
							<p className="text-sm text-zinc-500 dark:text-zinc-400">
								No categories found.
							</p>
						)}
					</div>
				</div>

				{/* Recent Comments (Mocked as Activity) */}
				<div className="bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm p-5">
					<div className="flex items-center justify-between mb-4">
						<h2 className="font-semibold text-zinc-900 dark:text-white">
							Recent Activity
						</h2>
						<button
							onClick={() => onChangeKind("articles")}
							className="text-xs font-medium text-violet-600 dark:text-violet-400"
						>
							View all
						</button>
					</div>
					<div className="space-y-4">
						{recentActivity.length > 0 ? (
							recentActivity.map((item, i) => (
								<div key={i} className="flex gap-3">
									<div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
										<Users className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
									</div>
									<div className="text-sm min-w-0">
										<p className="text-zinc-900 dark:text-white truncate">
											<span className="font-medium">{item.user}</span>{" "}
											{item.action}{" "}
											<span className="font-medium">{item.target}</span>
										</p>
										<p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
											{item.time}
										</p>
									</div>
								</div>
							))
						) : (
							<p className="text-sm text-zinc-500 dark:text-zinc-400">
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
	// const [isDarkMode, setIsDarkMode] = useState(false)
	const [session, setSession] = useState<any>(null)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [authError, setAuthError] = useState("")
	const [authMode, setAuthMode] = useState<"login" | "accept_invite">("login")
	const [userRole, setUserRole] = useState<string>("Viewer")
	const [teamMembers, setTeamMembers] = useState<any[]>([])
	const [invitations, setInvitations] = useState<any[]>([])
	const [inviteEmail, setInviteEmail] = useState("")
	const [inviteRole, setInviteRole] = useState("Editor")

	useEffect(() => {
		const initAuth = async () => {
			const client = await getSupabase()
			if (!client) return
			const {
				data: { session },
			} = await client.auth.getSession()
			setSession(session)
			if (session) {
				const { data: roleData, error } = await client
					.from("user_roles")
					.select("role")
					.eq("user_id", session.user.id)
					.single()
				console.log("Initial Role Fetch:", roleData, error)
				if (roleData) setUserRole(roleData.role)
			}

			client.auth.onAuthStateChange(async (_event, session) => {
				setSession(session)
				if (session) {
					const { data: roleData, error } = await client
						.from("user_roles")
						.select("role")
						.eq("user_id", session.user.id)
						.single()
					console.log("Auth State Change Role Fetch:", roleData, error)
					if (roleData) setUserRole(roleData.role)
				} else {
					setUserRole("Viewer")
				}
			})
		}
		initAuth()
	}, [])

	useEffect(() => {
		const loadData = async () => {
			try {
				const client = await getSupabase()
				if (client) {
					const { data, error } = await client
						.from("cms_records")
						.select("*")
						.order("updated_at", { ascending: false })
					if (!error && data) {
						// Map db records to CMSRecord format
						const mappedRecords = data.map((d: any) => ({
							id: d.slug, // Use slug as ID for compatibility
							kind: d.kind,
							title: d.title,
							slug: d.slug,
							category: d.category,
							summary: d.summary || "",
							status: d.status,
							updated: new Intl.DateTimeFormat("en", {
								month: "short",
								day: "numeric",
								year: "numeric",
							}).format(new Date(d.updated_at)),
							image: d.image,
							blocks: d.content?.blocks || [],
						}))
						setRecords(mappedRecords)
						if (mappedRecords.length > 0) {
							setSelectedId(mappedRecords[0].id)
						}
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
		const client = await getSupabase()
		if (!client) return

		// 1. Save record in database for UI history AND for any Postgres triggers that rely on it!
		const { error } = await client
			.from("team_invitations")
			.upsert({
				email: inviteEmail,
				role: inviteRole,
				invited_by: session.user.id,
			}, { onConflict: 'email' })
			
		if (error) {
			alert("Failed to save invitation to database: " + error.message)
			return
		}
		
		// 2. Send actual email via Edge Function
		const { data: edgeData, error: fnError } = await client.functions.invoke("invite-user", {
			body: { 
				email: inviteEmail, 
				role: inviteRole,
				redirectTo: window.location.origin + "/admin"
			}
		})
		
		if (fnError || (edgeData && edgeData.success === false)) {
			const errorMsg = edgeData?.error || fnError?.message || "Unknown error";
			alert("Invitation saved, but failed to send email: " + errorMsg)
			return
		}

		setInviteEmail("")
		setSaveMessage("Invitation email sent successfully!")
		loadTeamData()
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
		setSaveMessage("New draft created in this preview")
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
		const client = await getSupabase()
		if (!client) return

		if (authMode === "login") {
			const { error } = await client.auth.signInWithPassword({
				email,
				password,
			})
			if (error) setAuthError(error.message)
		} else {
			const { error } = await client.auth.signUp({ email, password })
			if (error) setAuthError(error.message)
			else setAuthError("Success! Check your email to confirm your account.")
		}
	}

	if (!session) {
		return (
			<div className="min-h-screen font-sans flex items-center justify-center antialiased bg-zinc-50 text-zinc-900 dark:text-zinc-100 dark:bg-zinc-950 dark:text-[#eae9ec]">
				<div className="w-full max-w-sm rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-8 shadow-lg shadow-zinc-200/40 dark:shadow-none">
					<div className="flex h-10 w-10 mb-4 items-center justify-center rounded-lg bg-violet-600 text-[14px] font-bold text-white">
						N
					</div>
					<h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">
						{authMode === "login" ? "Admin Login" : "Accept Invitation"}
					</h2>
					<p className="mb-6 text-[14px] text-zinc-500 dark:text-zinc-400">
						Access the Negentro Content Management System.
					</p>

					<form onSubmit={handleAuth} className="space-y-4">
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email address"
							required
							className="h-11 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3.5 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
						/>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							required
							className="h-11 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3.5 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
						/>

						{authError && (
							<p className="text-[13px] text-red-500">{authError}</p>
						)}

						<button
							type="submit"
							className="mt-2 flex h-11 w-full items-center justify-center rounded-md bg-violet-600 text-[14px] font-semibold text-white transition-all hover:bg-violet-700"
						>
							{authMode === "login" ? "Sign In" : "Set Password & Join"}
						</button>
					</form>

					<button
						onClick={() => {
							setAuthMode((m) => (m === "login" ? "accept_invite" : "login"))
							setAuthError("")
						}}
						className="mt-6 w-full text-center text-[13px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
					>
						{authMode === "login"
							? "Have an invite? Accept here"
							: "Already have an account? Sign in"}
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:text-zinc-100 dark:bg-zinc-950 dark:text-[#eae9ec] antialiased lg:flex">
			<aside className="hidden w-58 shrink-0 flex-col border-r border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 lg:flex sticky top-0 h-screen shadow-xl shadow-zinc-200/40 dark:shadow-none z-20">
				<div className="flex h-18 items-center gap-3 border-b border-zinc-200 dark:border-zinc-800/80 px-5">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-[14px] font-bold text-white">
						N
					</div>
					<div>
						<p className="text-[14px] font-semibold text-zinc-900 dark:text-white">
							Negentro
						</p>
						<p className="text-[14px] sm:text-[14px] text-zinc-400">
							CONTENT STUDIO
						</p>
					</div>
				</div>
				<div className="border-b border-zinc-200 dark:border-zinc-800/80 px-4 py-4">
					<p className="px-2 text-[14px] sm:text-[14px] font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
						Workspace
					</p>
					<div className="mt-3 flex items-center justify-between rounded-[7px] border border-zinc-200 dark:border-zinc-800/80 px-3 py-2.5">
						<div>
							<p className="text-[14px] font-medium">Negentro Website</p>
							<p className="mt-0.5 text-[14px] sm:text-[14px] text-zinc-500">
								Content team
							</p>
						</div>
						<ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
					</div>
				</div>
				<nav className="flex-1 space-y-1 px-3 py-5" aria-label="Content Studio">
					<p className="px-2 pb-2 text-[14px] sm:text-[14px] font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
						Manage
					</p>
					<button
						type="button"
						onClick={() => changeKind("dashboard")}
						className={`flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left text-[14px] transition-all duration-300 ease-out ${activeKind === "dashboard" ? "bg-violet-100 dark:bg-violet-500/20 font-semibold text-violet-700 dark:text-violet-300 border-l-2 border-violet-600 dark:text-violet-400" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
					>
						<LayoutDashboard className="h-4 w-4" /> Dashboard
					</button>
					<button
						type="button"
						onClick={() => changeKind("articles")}
						className={`flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left text-[14px] transition-all duration-300 ease-out ${activeKind === "articles" ? "bg-violet-100 dark:bg-violet-500/20 font-semibold text-violet-700 dark:text-violet-300 border-l-2 border-violet-600 dark:text-violet-400" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
					>
						<FileText className="h-4 w-4" /> Blog articles
					</button>
					<button
						type="button"
						onClick={() => changeKind("industries")}
						className={`flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left text-[14px] transition-all duration-300 ease-out ${activeKind === "industries" ? "bg-violet-100 dark:bg-violet-500/20 font-semibold text-violet-700 dark:text-violet-300 border-l-2 border-violet-600 dark:text-violet-400" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
					>
						<PanelsTopLeft className="h-4 w-4" /> Industry pages
					</button>
					<button
						type="button"
						onClick={() => changeKind("team")}
						className={`flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left text-[14px] transition-all duration-300 ease-out ${activeKind === "team" ? "bg-violet-100 dark:bg-violet-500/20 font-semibold text-violet-700 dark:text-violet-300 border-l-2 border-violet-600 dark:text-violet-400" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
					>
						<Users className="h-4 w-4" /> Team & Access
					</button>
					<p className="mt-8 px-2 pb-2 text-[14px] sm:text-[14px] font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
						Settings
					</p>
					<button
						type="button"
						onClick={async () => {
							const client = await getSupabase()
							await client?.auth.signOut()
							setSession(null)
						}}
						className="flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left text-[14px] transition-all duration-300 ease-out text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
							<polyline points="16 17 21 12 16 7" />
							<line x1="21" y1="12" x2="9" y2="12" />
						</svg>
						Sign out
					</button>
				</nav>
				<div className="border-t border-zinc-200 dark:border-zinc-800/80 p-3">
					<a
						href="/"
						className="mt-1 flex items-center gap-3 rounded-[7px] px-3 py-2.5 text-[14px] text-zinc-600 dark:text-zinc-400 transition-all duration-300 ease-out hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						<ArrowLeft className="h-4 w-4" /> View website
					</a>
				</div>
			</aside>

			<div className="min-w-0 flex-1">
				<header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 px-5 sm:px-7 sticky top-0 z-10 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800/80">
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-[14px] font-bold text-white lg:hidden">
							N
						</div>
						<p className="text-[14px] text-[#8f8c99]">
							Content Studio <span className="px-1.5">/</span>{" "}
							<span className="text-zinc-900 dark:text-white">Content</span>
						</p>
					</div>
					<div className="flex items-center gap-3">
						<span className="hidden text-[14px] sm:text-[14px] font-medium uppercase tracking-[0.08em] text-[#8e8b98] sm:inline">
							Preview workspace
						</span>
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-[14px] font-semibold text-[#5c4db2]">
							NT
						</div>
					</div>
				</header>

				<main
					className={`mx-auto ${previewMode === "split" ? "w-full max-w-none grid grid-cols-1 lg:grid-cols-2 p-0 h-[calc(100vh-64px)] overflow-hidden" : "max-w-[1600px] p-5 sm:p-7 xl:p-9"}`}
				>
					<div
						className={`${previewMode === "split" ? "overflow-y-auto p-5 sm:p-7 border-r border-zinc-200 dark:border-zinc-800" : ""}`}
					>
						{!isEditingMode && (
							<>
								{activeKind !== "articles" && (
									<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end mb-6">
										<div>
											<p className="text-[14px] sm:text-[14px] font-medium uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">
												Publishing
											</p>
											<h1 className="mt-2 text-[26px] font-semibold tracking-[-0.02em]">
												Content
											</h1>
											<p className="mt-1 text-[14px] text-zinc-500 dark:text-zinc-400">
												Manage articles and industry pages for the Negentro
												website.
											</p>
										</div>
										<button
											type="button"
											onClick={createArticle}
											className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-[7px] bg-violet-600 px-4 text-[14px] font-medium text-white transition-all duration-300 ease-out hover:bg-violet-700 sm:self-auto"
										>
											<Plus className="h-4 w-4" />{" "}
											{activeKind === "industries"
												? "New Industry Page"
												: "New article"}
										</button>
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
											className="border-y border-zinc-200 dark:border-zinc-800/80 py-3 sm:border-y-0 sm:border-l sm:pl-5 first:sm:border-l-0 first:sm:pl-0"
										>
											<p className="text-[14px] sm:text-[14px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
												{metric.label}
											</p>
											<p className="mt-1 text-[22px] font-semibold">
												{metric.value}
											</p>
										</div>
									))}
								</div>

								<div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-300 dark:border-zinc-700">
									<div className="flex gap-5">
										{(["articles", "industries"] as const).map((kind) => (
											<button
												key={kind}
												type="button"
												onClick={() => changeKind(kind)}
												className={`border-b-2 px-1 pb-3 text-[14px] font-medium capitalize transition-all duration-300 ease-out ${activeKind === kind ? "border-violet-600 dark:border-violet-500 text-violet-700 dark:text-violet-400" : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-[#24232a] dark:hover:text-white dark:text-white"}`}
											>
												{kind === "articles"
													? "Blog articles"
													: "Industry pages"}
											</button>
										))}
									</div>
									<p className="pb-3 text-[14px] sm:text-[14px] text-zinc-500 dark:text-zinc-400">
										CONTENT LIST
									</p>
								</div>
							</>
						)}

						{activeKind === "dashboard" ? (
							<div className="mt-8 px-4 sm:px-8 pb-12">
								<DashboardView
									records={records}
									onCreateArticle={createArticle}
									onChangeKind={changeKind}
								/>
							</div>
						) : activeKind === "team" ? (
							<div className="mt-5 max-w-5xl">
								{userRole !== "Super Admin" && userRole !== "Admin" ? (
									<div className="p-8 text-center text-[14px] text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/80 rounded-xl bg-white dark:bg-zinc-900">
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
										<div className="mb-8 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 shadow-lg shadow-zinc-200/40 dark:shadow-none">
											<div className="mb-5 flex items-center gap-3">
												<div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400">
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
													<h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
														Invite Team Member
													</h2>
													<p className="mt-0.5 text-[14px] text-zinc-500 dark:text-zinc-400">
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
													<span className="mb-1.5 block text-[14px] font-medium text-zinc-700 dark:text-zinc-300">
														Email address
													</span>
													<input
														type="email"
														required
														value={inviteEmail}
														onChange={(e) => setInviteEmail(e.target.value)}
														placeholder="colleague@negentro.com"
														className="h-10 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
													/>
												</label>
												<label className="w-full sm:w-48 block">
													<span className="mb-1.5 block text-[14px] font-medium text-zinc-700 dark:text-zinc-300">
														Role
													</span>
													<select
														value={inviteRole}
														onChange={(e) => setInviteRole(e.target.value)}
														className="h-10 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
													>
														<option
															className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
															value="Admin"
														>
															Admin
														</option>
														<option
															className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
															value="Editor"
														>
															Editor
														</option>
														<option
															className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
															value="Viewer"
														>
															Viewer
														</option>
													</select>
												</label>
												<button
													type="submit"
													className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-violet-600 px-5 text-[14px] font-medium text-white transition-all duration-300 ease-out hover:bg-violet-700 whitespace-nowrap"
												>
													Send Invite
												</button>
											</form>
											{saveMessage === "Invitation sent!" && (
												<p className="mt-3 text-[13px] font-medium text-[#327048]">
													{saveMessage}
												</p>
											)}
										</div>

										{invitations.length > 0 && (
											<div className="mb-8 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 overflow-hidden">
												<div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/50 px-6 py-4">
													<h3 className="text-[14px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
														Pending Invitations
													</h3>
												</div>
												<div className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
													{invitations.map((invite) => (
														<div
															key={invite.id}
															className="flex items-center justify-between p-6"
														>
															<div className="flex items-center gap-4">
																<div>
																	<p className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
																		{invite.email}
																	</p>
																</div>
															</div>
															<div className="flex items-center gap-6">
																<div className="w-32">
																	<p className="text-[13px] text-zinc-500 dark:text-zinc-400">
																		Role
																	</p>
																	<p className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300">
																		{invite.role}
																	</p>
																</div>
																<div className="w-24">
																	<p className="text-[13px] text-zinc-500 dark:text-zinc-400">
																		Status
																	</p>
																	<span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-500/20 px-2 py-0.5 text-[12px] font-medium text-yellow-700 dark:text-yellow-400">
																		Pending
																	</span>
																</div>
															</div>
														</div>
													))}
												</div>
											</div>
										)}

										<div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 overflow-hidden">
											<div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/50 px-6 py-4">
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
													className="text-violet-600 dark:text-violet-400"
												>
													<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
												</svg>
												<h3 className="text-[14px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
													Active Team Members
												</h3>
											</div>
											<div className="divide-y divide-[#eeedf2] dark:divide-[#2a2931]">
												{teamMembers.map((member) => (
													<div
														key={member.id}
														className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 transition-all duration-300 ease-out hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
													>
														<div className="flex items-center gap-4">
															<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/20 text-[14px] font-semibold text-violet-700 dark:text-violet-400">
																{member.email.charAt(0).toUpperCase()}
															</div>
															<div>
																<p className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
																	{member.email}
																	{member.role === "Super Admin" && (
																		<span className="ml-2 rounded bg-violet-100 dark:bg-violet-500/20 px-1.5 py-0.5 text-[9px] font-bold text-violet-600 dark:text-violet-400">
																			SUPER ADMIN
																		</span>
																	)}
																</p>
															</div>
														</div>

														<div className="flex items-center gap-6">
															<div className="w-32">
																<p className="text-[13px] text-zinc-500 dark:text-zinc-400">
																	Role
																</p>
																<p className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300">
																	{member.role}
																</p>
															</div>
															<div className="w-24">
																<p className="text-[13px] text-zinc-500 dark:text-zinc-400">
																	Joined
																</p>
																<p className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300">
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
										<label className="flex h-9 min-w-0 items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-[#92909b] sm:max-w-[320px] sm:flex-1">
											<Search className="h-3.5 w-3.5 shrink-0" />
											<input
												value={searchQuery}
												onChange={(event) => setSearchQuery(event.target.value)}
												placeholder="Search content"
												className="w-full bg-transparent text-[14px] text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400"
											/>
										</label>
										<div className="flex items-center gap-2">
											<span className="text-[14px] sm:text-[14px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
												Status
											</span>
											<select
												value={statusFilter}
												onChange={(event) =>
													setStatusFilter(
														event.target.value as "All" | ContentStatus,
													)
												}
												className="h-9 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-[14px] text-zinc-700 dark:text-zinc-300 outline-none focus:border-violet-600 dark:border-violet-500"
											>
												<option
													className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
													value="All"
												>
													All statuses
												</option>
												<option
													className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
													value="Published"
												>
													Published
												</option>
												<option
													className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
													value="Draft"
												>
													Draft
												</option>
											</select>
										</div>
									</div>

									<div className="mt-3 overflow-hidden rounded-lg border border-[#e6e4eb] bg-white dark:bg-zinc-900">
										<div className="hidden grid-cols-[minmax(0,1fr)_110px_130px_105px] gap-3 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/50 px-4 py-3 text-[9px] font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500 sm:grid">
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
												className={`grid w-full grid-cols hover:-translate-y-[1px] hover:shadow-md dark:hover:shadow-none-[minmax(0,1fr)_auto] items-center gap-3 border-b border-zinc-100 dark:border-zinc-800/50 px-5 py-4 text-left transition-all duration-300 ease-out last:border-b-0 sm:grid-cols-[minmax(0,1fr)_110px_130px_105px] ${selectedRecord?.id === record.id ? "bg-violet-50 dark:bg-violet-500/10" : "hover:bg-zinc-100/50 dark:bg-zinc-900/50 dark:hover:bg-[#1a1920] dark:bg-[#151419]"}`}
											>
												<span className="flex min-w-0 items-center gap-3">
													<span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-800">
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
														<span className="block truncate text-[14px] font-medium text-zinc-900 dark:text-white">
															{record.title}
														</span>
														<span className="mt-1 block truncate text-[14px] sm:text-[14px] text-zinc-400 dark:text-zinc-500">
															/{record.slug}
														</span>
													</span>
												</span>
												<span className="hidden text-[14px] text-zinc-500 dark:text-zinc-400 sm:block">
													{record.kind === "articles"
														? record.category
														: "Industry"}
												</span>
												<span className="hidden text-[14px] text-zinc-500 dark:text-zinc-400 sm:block">
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
											<p className="px-4 py-10 text-center text-[14px] text-zinc-500 dark:text-zinc-400">
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
													className="mb-4 flex items-center gap-2 text-[14px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
												>
													<ArrowLeft className="h-4 w-4" /> Back to{" "}
													{selectedRecord.kind === "articles"
														? "Articles"
														: "Pages"}
												</button>
												<div className="flex items-start justify-between">
													<div>
														<h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
															{selectedRecord.id.startsWith("untitled")
																? "Create New Article"
																: "Edit Article"}
														</h2>
														<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
															Write something amazing. Your next article could
															be the one.
														</p>
													</div>
													<div className="flex items-center gap-2">
														<button className="flex items-center gap-2 h-10 px-4 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
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
											<div className="bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm p-6 space-y-6">
												{/* Title */}
												<div>
													<label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
														Title <span className="text-red-500">*</span>
													</label>
													<input
														value={selectedRecord.title}
														onChange={(e) =>
															updateSelected({ title: e.target.value })
														}
														placeholder="Enter article title..."
														className="w-full h-11 px-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm outline-none focus:border-blue-500 text-zinc-900 dark:text-white"
													/>
													<p className="text-right text-xs text-zinc-500 dark:text-zinc-400 mt-1">
														0/100
													</p>
												</div>

												{/* Cover Image */}
												<div>
													<label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
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
														<label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
															Category <span className="text-red-500">*</span>
														</label>
														<select
															value={selectedRecord.category}
															onChange={(e) =>
																updateSelected({ category: e.target.value })
															}
															className="w-full h-11 px-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm outline-none focus:border-blue-500 text-zinc-900 dark:text-white"
														>
															{(selectedRecord.kind === "articles"
																? blogCategories.filter((c) => c !== "All")
																: ["Industry"]
															).map((c) => (
																<option
																	className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
																	key={c}
																	value={c}
																>
																	{c}
																</option>
															))}
														</select>
													</div>
													<div>
														<label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
															Tags
														</label>
														<input
															value={selectedRecord.tags || ""}
															onChange={(e) =>
																updateSelected({ tags: e.target.value })
															}
															placeholder="Add tags (comma separated)..."
															className="w-full h-11 px-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm outline-none focus:border-blue-500 text-zinc-900 dark:text-white"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
															Author
														</label>
														<select
															value={selectedRecord.author || ""}
															onChange={(e) =>
																updateSelected({ author: e.target.value })
															}
															className="w-full h-11 px-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm outline-none focus:border-blue-500 text-zinc-900 dark:text-white"
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
													<label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
														Content <span className="text-red-500">*</span>
													</label>
													<div className="border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden">
														{/* CMS Editor block */}
														<div className="p-4 bg-zinc-50/30 dark:bg-[#11161d]">
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
											<div className="bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm p-5">
												<h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
													Publishing Settings
												</h3>

												<div className="mb-5">
													<label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
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
																	className={`px-3 py-1.5 rounded-full text-xs font-medium ${selectedRecord.status === status ? "ring-2 ring-offset-1 ring-blue-500 dark:ring-offset-[#151a23]" : ""} ${status === "Draft" ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400" : status === "Published" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400"}`}
																>
																	{status}
																</button>
															),
														)}
													</div>
												</div>

												<div className="mb-5">
													<label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
														Publish Date
													</label>
													<div className="flex items-center h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm">
														<Clock3 className="h-4 w-4 text-zinc-400 mr-2" />
														<span className="text-zinc-700 dark:text-zinc-300">
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
													<label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
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
																className="checked:bg-blue-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800"
															/>
															<label
																htmlFor="featured-toggle"
																className="block overflow-hidden h-6 rounded-full bg-zinc-300 dark:bg-zinc-700 cursor-pointer"
															/>
														</div>
														<span className="text-xs text-zinc-600 dark:text-zinc-400">
															Show this article on homepage
														</span>
													</div>
												</div>
											</div>

											{/* SEO Settings */}
											<div className="bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm p-5">
												<h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
													SEO Settings
												</h3>

												<div className="mb-4">
													<label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
														Meta Title
													</label>
													<input
														value={selectedRecord.metaTitle || ""}
														onChange={(e) =>
															updateSelected({ metaTitle: e.target.value })
														}
														placeholder="Enter meta title..."
														className="w-full h-9 px-3 rounded-md border border-zinc-200 dark:border-zinc-700 bg-transparent text-xs outline-none focus:border-blue-500 text-zinc-900 dark:text-white"
													/>
													<p className="text-right text-[10px] text-zinc-500 mt-1">
														0/60
													</p>
												</div>
												<div className="mb-4">
													<label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
														Meta Description
													</label>
													<textarea
														value={selectedRecord.summary}
														onChange={(e) =>
															updateSelected({ summary: e.target.value })
														}
														placeholder="Enter meta description..."
														rows={3}
														className="w-full p-3 rounded-md border border-zinc-200 dark:border-zinc-700 bg-transparent text-xs outline-none focus:border-blue-500 text-zinc-900 dark:text-white resize-none"
													/>
													<p className="text-right text-[10px] text-zinc-500 mt-1">
														{selectedRecord.summary?.length || 0}/160
													</p>
												</div>
												<div>
													<label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
														Focus Keyword *
													</label>
													<div className="relative">
														<input
															value={selectedRecord.focusKeyword || ""}
															onChange={(e) =>
																updateSelected({ focusKeyword: e.target.value })
															}
															placeholder="e.g. web development"
															className="w-full h-9 pl-3 pr-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-transparent text-xs outline-none focus:border-blue-500 text-zinc-900 dark:text-white"
														/>
														<Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-400" />
													</div>
												</div>
											</div>

											{/* Permalink */}
											<div className="bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm p-5">
												<h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
													Permalink (URL Slug)
												</h3>
												<div className="flex h-9 rounded-md border border-zinc-200 dark:border-zinc-700 focus-within:border-blue-500 overflow-hidden">
													<div className="h-full px-3 flex items-center bg-zinc-50 dark:bg-zinc-800/50 border-r border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-xs">
														/
													</div>
													<input
														value={selectedRecord.slug}
														onChange={(e) =>
															updateSelected({ slug: e.target.value })
														}
														placeholder="article-url-slug"
														className="flex-1 h-full px-3 bg-transparent text-xs outline-none text-zinc-900 dark:text-white min-w-0"
													/>
												</div>
											</div>

											{/* Quick Actions */}
											<div className="bg-white dark:bg-[#151a23] rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm p-5">
												<h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
													Quick Actions
												</h3>
												<div className="flex gap-3">
													<button
														onClick={() => saveSelected("Draft")}
														className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
													>
														<FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />{" "}
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
													<p className="mt-3 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
														{saveMessage}
													</p>
												)}
											</div>
											<button
												type="button"
												onClick={deleteSelected}
												className="w-full text-center h-10 rounded-md border border-red-200 dark:border-red-900/30 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-red-600 dark:text-red-400"
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
											title: selectedRecord.title,
											category: selectedRecord.category,
											summary: selectedRecord.summary,
											created_at: new Date().toISOString(),
											content: { blocks: selectedRecord.blocks || [] },
										}}
									/>
								) : (
									<IndustryPage
										previewIndustry={{
											slug: selectedRecord.slug,
											name: selectedRecord.title,
											icon: "Building2",
											...(selectedRecord.blocks?.[0]?.content
												? JSON.parse(selectedRecord.blocks[0].content)
												: {}),
										}}
										onNavigate={() => {}}
									/>
								)}
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
		<div className="mt-8 border-t border-zinc-200 dark:border-zinc-800/80 pt-8 space-y-2">
			<div className="mb-5">
				<h3 className="text-[14px] font-semibold text-zinc-900 dark:text-white">
					Blog Article Content (Fixed Template)
				</h3>
				<p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
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
					<p className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300 mb-2">
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
										className="flex-1 h-9 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
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
					<p className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300 mb-2">
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
										className="flex-1 h-9 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
										placeholder={`Bullet point ${i + 1}`}
									/>
								</div>
							),
						)}
					</div>
				</div>
				<div className="pt-2">
					<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
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
					<p className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300 mb-2">
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
									className="flex-1 h-9 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
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
									className="flex-1 h-9 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
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
		<div className="border-t border-zinc-200 dark:border-zinc-800/80">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex w-full items-center justify-between py-4 text-left transition-all duration-300 ease-out hover:bg-[#faf9fc] rounded-md px-2 -mx-2"
			>
				<span className="flex items-center gap-3">
					<span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-100 dark:bg-violet-500/20 text-[14px] sm:text-[14px] font-bold text-violet-700 dark:text-violet-400">
						{number}
					</span>
					<span className="text-[14px] font-semibold text-zinc-900 dark:text-white">
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
		<span className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300">
			{label}
		</span>
		<input
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className="mt-2 h-10 w-full rounded-md border border-zinc-300 dark:border-zinc-700 px-3.5 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
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
		<span className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300">
			{label}
		</span>
		<textarea
			value={value}
			onChange={(e) => onChange(e.target.value)}
			rows={rows}
			placeholder={placeholder}
			className="mt-2 w-full resize-y rounded-md border border-zinc-300 dark:border-zinc-700 px-3.5 py-2.5 text-[14px] leading-relaxed outline-none focus:border-violet-600 dark:border-violet-500"
		/>
	</label>
)

interface IndustryEditorData {
	heroTitle?: string
	heroDescription?: string
	facts?: { label: string; value: string }[]
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
				return JSON.parse(raw.content)
			} catch (e) {
				/* ignore */
			}
		}
		// Pre-populate from existing industry data
		if (industry) {
			return {
				heroTitle: industry.heroTitle,
				heroDescription: industry.heroDescription,
				facts: [...industry.facts],
				contextTitle: industry.contextTitle,
				contextDescription: industry.contextDescription,
				contextImage: industry.contextImage || "",
				introTitle: industry.introTitle,
				introParagraphLeft: industry.introParagraphs[0] || "",
				introParagraphRight: industry.introParagraphs[1] || "",
				capabilitiesTitle: industry.capabilitiesTitle,
				capabilities: [...industry.capabilities],
				infrastructureTitle: industry.infrastructureTitle,
				problems: [...industry.problems],
				flowSteps: [...industry.flowSteps],
				architectureTitle: industry.architectureTitle,
				architectureImage: industry.architectureImage || "",
				memoryTitle: industry.memoryTitle,
				memoryDescription: industry.memoryDescription,
				memorySteps: [...industry.memorySteps],
				getStartedTitle: industry.getStartedTitle,
				getStartedDescription: industry.getStartedDescription,
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
		// Store as a single hero block with JSON content
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

	const updateCapability = (
		index: number,
		field: "title" | "description",
		value: string,
	) => {
		const caps = [...(data.capabilities || [])]
		caps[index] = { ...caps[index], [field]: value }
		persist({ ...data, capabilities: caps })
	}

	const updateProblem = (
		index: number,
		field: "title" | "description",
		value: string,
	) => {
		const probs = [...(data.problems || [])]
		probs[index] = { ...probs[index], [field]: value }
		persist({ ...data, problems: probs })
	}

	const updateFlowStep = (index: number, value: string) => {
		const steps = [...(data.flowSteps || [])]
		steps[index] = value
		persist({ ...data, flowSteps: steps })
	}

	const updateMemoryStep = (index: number, value: string) => {
		const steps = [...(data.memorySteps || [])]
		steps[index] = value
		persist({ ...data, memorySteps: steps })
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
	const ensureCaps = data.capabilities || [
		{ title: "", description: "" },
		{ title: "", description: "" },
		{ title: "", description: "" },
		{ title: "", description: "" },
	]
	const ensureProblems = data.problems || [
		{ title: "", description: "" },
		{ title: "", description: "" },
		{ title: "", description: "" },
		{ title: "", description: "" },
	]
	const ensureFlowSteps = data.flowSteps || ["", "", "", ""]
	const ensureMemorySteps = data.memorySteps || ["", "", "", "", ""]
	const ensureFaqs = data.faqs || []

	return (
		<div className="mt-8 border-t border-zinc-200 dark:border-zinc-800/80 pt-6">
			<p className="text-[14px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-4">
				Industry Page Sections
			</p>

			<SectionDivider number="01" label="Hero Section" defaultOpen>
				<FieldInput
					label="Hero Title"
					value={data.heroTitle || ""}
					onChange={(v) => updateField("heroTitle", v)}
					placeholder="AI infrastructure for healthcare."
				/>
				<FieldTextarea
					label="Hero Description"
					value={data.heroDescription || ""}
					onChange={(v) => updateField("heroDescription", v)}
					placeholder="Build intelligent triage copilots..."
				/>

				<div className="mt-4">
					<p className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300 mb-3">
						Feature Facts (4 items)
					</p>
					<div className="grid gap-3 sm:grid-cols-2">
						{ensureFacts.map((fact, i) => (
							<div
								key={i}
								className="flex flex-col gap-2 rounded-md border border-[#e6e4eb] bg-zinc-100/50 dark:bg-zinc-900/50 p-3"
							>
								<span className="text-[14px] sm:text-[14px] font-bold text-[#8c8c99]">
									Fact 0{i + 1}
								</span>
								<input
									value={fact.label}
									onChange={(e) => updateFactField(i, "label", e.target.value)}
									placeholder="Label (e.g. Models)"
									className="h-9 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
								/>
								<input
									value={fact.value}
									onChange={(e) => updateFactField(i, "value", e.target.value)}
									placeholder="Value (e.g. 5+)"
									className="h-9 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
								/>
							</div>
						))}
					</div>
				</div>
			</SectionDivider>

			<SectionDivider number="02" label="Context Introduction">
				<FieldInput
					label="Section Title"
					value={data.contextTitle || ""}
					onChange={(v) => updateField("contextTitle", v)}
					placeholder="Every visit adds context."
				/>
				<FieldTextarea
					label="Description"
					value={data.contextDescription || ""}
					onChange={(v) => updateField("contextDescription", v)}
				/>
				<div className="pt-2">
					<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
						Context Image URL (optional)
					</label>
					<ImageUploadInput
						placeholder="/assets/use-cases/..."
						value={data.contextImage || ""}
						onChange={(v) => updateField("contextImage", v)}
					/>
				</div>
			</SectionDivider>

			<SectionDivider number="03" label="Why [Industry] Needs Memory">
				<FieldInput
					label="Section Title"
					value={data.introTitle || ""}
					onChange={(v) => updateField("introTitle", v)}
					placeholder="Triage and care only work if the system remembers."
				/>
				<div className="grid gap-4 sm:grid-cols-2">
					<FieldTextarea
						label="Left Paragraph"
						value={data.introParagraphLeft || ""}
						onChange={(v) => updateField("introParagraphLeft", v)}
						rows={5}
					/>
					<FieldTextarea
						label="Right Paragraph"
						value={data.introParagraphRight || ""}
						onChange={(v) => updateField("introParagraphRight", v)}
						rows={5}
					/>
				</div>
			</SectionDivider>

			<SectionDivider number="04" label="What You Can Build">
				<FieldInput
					label="Section Title"
					value={data.capabilitiesTitle || ""}
					onChange={(v) => updateField("capabilitiesTitle", v)}
					placeholder="Four shapes, one infrastructure."
				/>
				<div className="mt-4">
					<p className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300 mb-3">
						Capabilities (4 items)
					</p>
					<div className="grid gap-3 sm:grid-cols-2">
						{ensureCaps.map((cap, i) => (
							<div
								key={i}
								className="flex flex-col gap-2 rounded-md border border-[#e6e4eb] bg-zinc-100/50 dark:bg-zinc-900/50 p-3.5"
							>
								<span className="text-[14px] sm:text-[14px] font-bold text-violet-600 dark:text-violet-400">
									Capability 0{i + 1}
								</span>
								<input
									value={cap.title}
									onChange={(e) => updateCapability(i, "title", e.target.value)}
									placeholder="Title"
									className="h-9 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
								/>
								<textarea
									value={cap.description}
									onChange={(e) =>
										updateCapability(i, "description", e.target.value)
									}
									placeholder="Description"
									rows={3}
									className="w-full resize-y rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
								/>
							</div>
						))}
					</div>
				</div>
			</SectionDivider>

			<SectionDivider number="05" label="Product Architecture">
				<FieldInput
					label="Section Title"
					value={data.infrastructureTitle || ""}
					onChange={(v) => updateField("infrastructureTitle", v)}
					placeholder="Healthcare problems, solved."
				/>

				<div className="mt-6 grid gap-8 sm:grid-cols-2">
					<div>
						<p className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300 mb-3">
							Problems (Left Panel - 4 items)
						</p>
						<div className="space-y-3">
							{ensureProblems.map((prob, i) => (
								<div
									key={i}
									className="flex flex-col gap-2 rounded-md border border-[#e6e4eb] bg-zinc-100/50 dark:bg-zinc-900/50 p-3.5"
								>
									<span className="text-[14px] sm:text-[14px] font-bold text-violet-600 dark:text-violet-400">
										Problem 0{i + 1}
									</span>
									<input
										value={prob.title}
										onChange={(e) => updateProblem(i, "title", e.target.value)}
										placeholder="Title"
										className="h-9 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
									/>
									<textarea
										value={prob.description}
										onChange={(e) =>
											updateProblem(i, "description", e.target.value)
										}
										placeholder="Description"
										rows={2}
										className="w-full resize-y rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
									/>
								</div>
							))}
						</div>
					</div>
					<div>
						<p className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300 mb-3">
							Flow Steps (Right Panel - 4 items)
						</p>
						<div className="space-y-3">
							{ensureFlowSteps.map((step, i) => (
								<div
									key={i}
									className="flex flex-col gap-1.5 rounded-md border border-[#e6e4eb] bg-zinc-100/50 dark:bg-zinc-900/50 p-3.5"
								>
									<span className="text-[14px] sm:text-[14px] font-bold text-[#8c8c99]">
										Step 0{i + 1}
									</span>
									<textarea
										value={step}
										onChange={(e) => updateFlowStep(i, e.target.value)}
										placeholder={`Describe step ${i + 1}...`}
										rows={3}
										className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</SectionDivider>

			<SectionDivider number="06" label="Architecture Diagram">
				<FieldInput
					label="Section Title"
					value={data.architectureTitle || ""}
					onChange={(v) => updateField("architectureTitle", v)}
					placeholder="The infrastructure underneath."
				/>
				<div className="pt-2">
					<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
						Architecture Image URL (optional)
					</label>
					<ImageUploadInput
						placeholder="/assets/use-cases/..."
						value={data.architectureImage || ""}
						onChange={(v) => updateField("architectureImage", v)}
					/>
				</div>
			</SectionDivider>

			<SectionDivider number="07" label="Persistent Memory">
				<FieldInput
					label="Section Title"
					value={data.memoryTitle || ""}
					onChange={(v) => updateField("memoryTitle", v)}
					placeholder="Care that deepens per patient."
				/>
				<FieldTextarea
					label="Description"
					value={data.memoryDescription || ""}
					onChange={(v) => updateField("memoryDescription", v)}
					rows={4}
				/>
				<div className="mt-4">
					<p className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300 mb-3">
						Memory Steps (5 items)
					</p>
					<div className="space-y-3">
						{ensureMemorySteps.map((step, i) => (
							<div
								key={i}
								className="flex items-center gap-3 rounded-md border border-[#e6e4eb] bg-zinc-100/50 dark:bg-zinc-900/50 px-3 py-2"
							>
								<span className="flex shrink-0 h-6 w-6 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/20 text-[14px] sm:text-[14px] font-bold text-violet-700 dark:text-violet-400">
									0{i + 1}
								</span>
								<input
									value={step}
									onChange={(e) => updateMemoryStep(i, e.target.value)}
									placeholder={`Memory feature ${i + 1}`}
									className="flex-1 h-9 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
								/>
							</div>
						))}
					</div>
				</div>
			</SectionDivider>

			<SectionDivider number="08" label="Get Started">
				<FieldInput
					label="Section Title"
					value={data.getStartedTitle || ""}
					onChange={(v) => updateField("getStartedTitle", v)}
					placeholder="Start with the use case that fits."
				/>
				<FieldTextarea
					label="Description"
					value={data.getStartedDescription || ""}
					onChange={(v) => updateField("getStartedDescription", v)}
				/>
			</SectionDivider>

			<SectionDivider number="09" label="FAQs">
				<div className="space-y-4">
					{ensureFaqs.map((faq, i) => (
						<div
							key={i}
							className="rounded-lg border border-[#e6e4eb] bg-zinc-100/50 dark:bg-zinc-900/50 p-4 space-y-3"
						>
							<div className="flex items-center justify-between">
								<span className="text-[14px] font-bold text-violet-600 dark:text-violet-400">
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
								className="w-full h-10 rounded-md border border-zinc-300 dark:border-zinc-700 px-3.5 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
							/>
							<textarea
								value={faq.answer}
								onChange={(e) => updateFaq(i, "answer", e.target.value)}
								placeholder="Answer"
								rows={3}
								className="w-full resize-y rounded-md border border-zinc-300 dark:border-zinc-700 px-3.5 py-2.5 text-[14px] outline-none focus:border-violet-600 dark:border-violet-500"
							/>
						</div>
					))}
					<button
						onClick={addFaq}
						className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-zinc-100 dark:bg-zinc-800 px-4 text-[14px] font-semibold text-violet-700 dark:text-violet-300 border-l-2 border-violet-600 dark:text-violet-400 hover:bg-zinc-200 dark:bg-zinc-800 transition-all duration-300 ease-out"
					>
						<Plus className="h-3.5 w-3.5" /> Add FAQ
					</button>
				</div>
			</SectionDivider>

			<SectionDivider number="10" label="Footer CTA">
				<FieldInput
					label="CTA Title"
					value={data.finalCtaTitle || ""}
					onChange={(v) => updateField("finalCtaTitle", v)}
					placeholder="Give every patient a memory..."
				/>
				<FieldTextarea
					label="CTA Description"
					value={data.finalCtaDescription || ""}
					onChange={(v) => updateField("finalCtaDescription", v)}
				/>
			</SectionDivider>
		</div>
	)
}
