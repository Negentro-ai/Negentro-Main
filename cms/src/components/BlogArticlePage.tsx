import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { getSupabase } from "@/lib/supabase"
import { featuredArticles, latestInsights, BlogArticle } from "@/data/blogArticles"
import NewBlogArticleTemplate, {
	BlogArticleTemplateData,
} from "./NewBlogArticleTemplate"

export interface BlogArticlePageProps {
	articleId?: string
	previewArticle?: any
	onNavigate?: (route: string) => void
}

function getStaticArticle(idOrSlug?: string): BlogArticle | undefined {
	if (!idOrSlug) return undefined
	const all = [...featuredArticles, ...latestInsights]
	return all.find((a) => a.id === idOrSlug)
}

function parseArticleBlocks(record: any): Partial<BlogArticleTemplateData> {
	if (!record) return {}
	let parsed: any = {}
	if (record.content?.blocks?.[0]?.content) {
		try {
			parsed = JSON.parse(record.content.blocks[0].content)
		} catch (e) {
			console.error("Failed to parse record.content.blocks[0].content", e)
		}
	} else if (record.blocks?.[0]?.content) {
		try {
			parsed = JSON.parse(record.blocks[0].content)
		} catch (e) {
			console.error("Failed to parse record.blocks[0].content", e)
		}
	} else if (Array.isArray(record.content) && record.content[0]?.content) {
		try {
			parsed = JSON.parse(record.content[0].content)
		} catch (e) {
			console.error("Failed to parse record.content[0].content", e)
		}
	}
	return parsed
}

export const BlogArticlePage = ({
	articleId,
	previewArticle,
	onNavigate,
}: BlogArticlePageProps) => {
	const defaultArticle = getStaticArticle(articleId || previewArticle?.slug || previewArticle?.id)

	const buildArticleData = (raw: any): BlogArticleTemplateData => {
		const parsed = parseArticleBlocks(raw)
		return {
			id: raw?.id || articleId || defaultArticle?.id,
			slug: raw?.slug || articleId || defaultArticle?.id,
			title: raw?.title || parsed.title || defaultArticle?.title,
			summary: raw?.summary || parsed.summary || defaultArticle?.description,
			category: raw?.category || parsed.category || defaultArticle?.category,
			author: raw?.author || parsed.author || "Negentro Team",
			date:
				parsed.date ||
				raw?.date ||
				(raw?.created_at
					? new Date(raw.created_at).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric",
						})
					: defaultArticle?.date),
			created_at: raw?.created_at,
			readTime:
				parsed.readTime ||
				raw?.readTime ||
				defaultArticle?.readTime ||
				"6 min read",
			image: raw?.image || parsed.image || defaultArticle?.image,
			...parsed,
			// Allow direct preview overrides if previewArticle provided specific fields
			...(raw?.s1_title ? raw : {}),
		}
	}

	const [article, setArticle] = useState<BlogArticleTemplateData | null>(() => {
		if (previewArticle) {
			return buildArticleData(previewArticle)
		}
		if (defaultArticle) {
			return {
				id: defaultArticle.id,
				slug: defaultArticle.id,
				title: defaultArticle.title,
				summary: defaultArticle.description,
				category: defaultArticle.category,
				author: "Negentro Team",
				date: defaultArticle.date,
				readTime: defaultArticle.readTime,
				image: defaultArticle.image,
			}
		}
		return null
	})

	const [loading, setLoading] = useState<boolean>(!previewArticle && !article)

	useEffect(() => {
		if (previewArticle) {
			setArticle(buildArticleData(previewArticle))
			setLoading(false)
			return
		}

		if (!articleId) {
			setLoading(false)
			return
		}

		const fetchCmsArticle = async () => {
			try {
				const client = await getSupabase()
				if (!client) {
					setLoading(false)
					return
				}

				const { data, error } = await client
					.from("cms_records")
					.select("*")
					.eq("kind", "articles")
					.eq("slug", articleId)
					.maybeSingle()

				if (error) {
					console.error("Error fetching article from CMS:", error)
				}

				if (data) {
					setArticle(buildArticleData(data))
				} else if (defaultArticle) {
					setArticle({
						id: defaultArticle.id,
						slug: defaultArticle.id,
						title: defaultArticle.title,
						summary: defaultArticle.description,
						category: defaultArticle.category,
						author: "Negentro Team",
						date: defaultArticle.date,
						readTime: defaultArticle.readTime,
						image: defaultArticle.image,
					})
				}
			} catch (err) {
				console.error("Error fetching CMS article data:", err)
			} finally {
				setLoading(false)
			}
		}

		fetchCmsArticle()
	}, [articleId, previewArticle])

	if (loading && !article) {
		return (
			<div className="flex items-center justify-center min-h-[50vh] bg-white">
				<div className="w-8 h-8 rounded-full border-2 border-[#765DFB] border-t-transparent animate-spin" />
			</div>
		)
	}

	if (!article) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#FAFAFB]">
				<div className="text-center py-20 px-4">
					<AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-4" />
					<h1 className="text-2xl font-bold text-[#0b0f17]">Article not found</h1>
					<p className="mt-2 text-sm text-zinc-500">
						The requested article could not be loaded from CMS or archives.
					</p>
					<button
						onClick={() => onNavigate?.("blog")}
						className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#765dfb] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6b52e8] transition-colors cursor-pointer"
					>
						Back to Insights
					</button>
				</div>
			</div>
		)
	}

	return <NewBlogArticleTemplate data={article} onNavigate={onNavigate} />
}

export default BlogArticlePage
