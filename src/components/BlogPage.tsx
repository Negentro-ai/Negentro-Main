import { useState, useEffect } from "react"
import { getSupabase } from "@/lib/supabase"
import type { FormEvent } from "react"
import { ArrowRight, Search } from "lucide-react"
import {
	blogCategories,
	type BlogArticle,
	type BlogCategory,
} from "@/data/blogArticles"
import { submitWaitlistEmail } from "@/lib/supabase"

type NewsletterStatus =
	| "idle"
	| "submitting"
	| "success"
	| "duplicate"
	| "error"

const ArticleMeta = ({ article }: { article: BlogArticle }) => (
	<p className="text-[11px] uppercase tracking-[0.08em] text-[#a9a5ba]">
		{article.date} <span className="px-1">·</span> {article.readTime}
	</p>
)

const FeaturedArticle = ({
	article,
	compact = false,
	onNavigate,
}: {
	article: BlogArticle
	compact?: boolean
	onNavigate?: (route: string) => void
}) => (
	<article
		className={`overflow-hidden rounded-[10px] border border-[#d1d0e4] bg-white ${compact ? "flex flex-col" : "grid grid-cols-1 lg:grid-cols-[minmax(280px,1.1fr)_minmax(260px,0.8fr)]"}`}
	>
		<div
			className={`${compact ? "h-55" : "min-h-70 lg:min-h-105"} relative overflow-hidden bg-[#f9f8ff]`}
		>
			<img
				src={article.image}
				alt={`${article.title} illustration`}
				width={compact ? 474 : 426}
				height={compact ? 220 : 420}
				loading="eager"
				decoding="async"
				className="h-full w-full object-cover"
			/>
		</div>
		<div
			className={`flex flex-col ${compact ? "min-h-65 p-6 sm:p-7" : "justify-center p-6 sm:p-8 lg:p-9"}`}
		>
			<p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#765dfb]">
				{compact ? article.category : `INSIGHTS / ${article.category}`}
			</p>
			<h2
				className={`${compact ? "mt-3 text-[22px]" : "mt-4 text-[28px] sm:text-[34px]"} font-bold leading-[1.12] text-[#0e0b1a]`}
			>
				{article.title}
			</h2>
			<p
				className={`${compact ? "mt-3 text-[14px]" : "mt-4 text-base"} leading-[1.55] text-[#7c7792]`}
			>
				{article.description}
			</p>
			<div className="mt-auto pt-7">
				<ArticleMeta article={article} />
				<button
					type="button"
					onClick={() => onNavigate?.(`blog-article:${article.id}`)}
					className="mt-3 text-sm font-medium text-[#765dfb] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
				>
					Read article <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
				</button>
			</div>
		</div>
	</article>
)

const InsightCard = ({ article }: { article: BlogArticle }) => (
	<article className="group overflow-hidden rounded-[10px] border border-[#d1d0e4] bg-white transition-shadow hover:shadow-[0_10px_30px_rgba(14,11,26,0.08)]">
		<div className="relative h-45 overflow-hidden border-b border-[#d1d0e4] bg-[#f9f8ff]">
			<img
				src={article.image}
				alt={`${article.title} illustration`}
				width={411}
				height={180}
				loading="lazy"
				decoding="async"
				className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
			/>
		</div>
		<div className="flex min-h-49 flex-col p-5">
			<p className="text-[10px] uppercase tracking-[0.08em] text-[#a9a5ba]">
				{article.category}
			</p>
			<h3 className="mt-2 text-[18px] font-bold leading-[1.22] text-[#0e0b1a]">
				{article.title}
			</h3>
			<p className="mt-2 text-[13px] leading-normal text-[#7c7792]">
				{article.description}
			</p>
			<div className="mt-auto pt-5">
				<ArticleMeta article={article} />
			</div>
		</div>
	</article>
)

export const BlogPage = ({
	onNavigate,
}: {
	onNavigate?: (route: string) => void
}) => {
	const [activeCategory, setActiveCategory] = useState<BlogCategory>("All")
	const [searchQuery, setSearchQuery] = useState("")
	const [newsletterEmail, setNewsletterEmail] = useState("")
	const [newsletterStatus, setNewsletterStatus] =
		useState<NewsletterStatus>("idle")
	const [newsletterMessage, setNewsletterMessage] = useState("")
	const [articles, setArticles] = useState<BlogArticle[]>([])
	const [topArticles, setTopArticles] = useState<BlogArticle[]>([])

	useEffect(() => {
		const loadArticles = async () => {
			const client = await getSupabase()
			if (!client) return
			const { data, error } = await client
				.from("cms_records")
				.select("*")
				.eq("kind", "articles")
				.eq("status", "Published")
				.order("created_at", { ascending: false })
			if (!error && data && data.length > 0) {
				const mapped: BlogArticle[] = data.map((d: any) => ({
					id: d.slug,
					title: d.title,
					category: d.category as Exclude<BlogCategory, "All">,
					description: d.summary || "",
					image:
						d.image ||
						"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
					date: new Intl.DateTimeFormat("en", {
						month: "short",
						day: "numeric",
						year: "numeric",
					}).format(new Date(d.created_at)),
					readTime: "5 min read",
				}))
				if (mapped.length >= 2) {
					setTopArticles(mapped.slice(0, 2))
					setArticles(mapped.slice(2))
				} else {
					setTopArticles([])
					setArticles(mapped)
				}
			}
		}
		loadArticles()
	}, [])

	const normalizedSearch = searchQuery.trim().toLowerCase()
	const visibleArticles = articles.filter((article) => {
		const matchesCategory =
			activeCategory === "All" || article.category === activeCategory
		const matchesSearch =
			!normalizedSearch ||
			`${article.title} ${article.description} ${article.category}`
				.toLowerCase()
				.includes(normalizedSearch)
		return matchesCategory && matchesSearch
	})

	const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (newsletterStatus === "submitting") return

		setNewsletterStatus("submitting")
		setNewsletterMessage("")
		try {
			const result = await submitWaitlistEmail(newsletterEmail)
			if (!result.success) {
				setNewsletterStatus("error")
				setNewsletterMessage(result.message)
				return
			}

			setNewsletterStatus(result.isDuplicate ? "duplicate" : "success")
			setNewsletterMessage(
				result.isDuplicate
					? "You're already subscribed."
					: "Thanks for subscribing.",
			)
			setNewsletterEmail("")
		} catch {
			setNewsletterStatus("error")
			setNewsletterMessage(
				"We couldn't save your subscription. Please try again.",
			)
		} finally {
			setNewsletterStatus((current) =>
				current === "submitting" ? "idle" : current,
			)
		}
	}

	return (
		<div className="min-h-screen w-full bg-white font-sans text-[#0e0b1a] antialiased">
			<section className="px-5 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-18 lg:px-10">
				<div className="mx-auto max-w-7xl">
					<p className="text-center text-[11px] font-medium uppercase tracking-[0.25em] text-[#765dfb] sm:text-[13px]">
						Negentro / Insights
					</p>
					<h1 className="mx-auto mt-8 max-w-245 text-center text-[42px] font-bold leading-[1.04] tracking-tight sm:text-[58px] lg:text-[72px]">
						Ideas, research and systems behind persistent intelligence.
					</h1>
					<p className="mx-auto mt-5 max-w-160 text-center text-[16px] leading-[1.55] text-[#7c7792] sm:text-[19px]">
						Explore engineering insights, research, product updates and
						practical ideas for building AI systems that remember.
					</p>
					<div className="mx-auto mt-8 aspect-1098/366 w-full max-w-274.5 overflow-hidden rounded-[10px] bg-[#f9f8ff]">
						<img
							src="/assets/blog/hero-isometric.png"
							alt="An isometric view of connected persistent-memory systems"
							width={1098}
							height={366}
							loading="eager"
							decoding="async"
							className="h-full w-full object-cover"
						/>
					</div>
				</div>
			</section>

			<section className="page-gutter border-b border-[#d1d0e4]">
				<div className="mx-auto flex max-w-7xl flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6">
						{blogCategories.map((category, index) => (
							<div key={category} className="flex items-center gap-4 sm:gap-6">
								{index > 0 && (
									<span
										className="hidden h-4 w-px bg-[#d1d0e4] sm:block"
										aria-hidden="true"
									/>
								)}
								<button
									type="button"
									onClick={() => setActiveCategory(category)}
									aria-pressed={activeCategory === category}
									className={`border-b-2 pb-2 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors sm:text-[13px] ${activeCategory === category ? "border-[#765dfb] text-[#765dfb]" : "border-transparent text-[#7c7792] hover:text-[#0e0b1a]"}`}
								>
									{category}
								</button>
							</div>
						))}
					</div>
					<label className="flex h-10 w-full items-center gap-2 rounded-md border border-[#d1d0e4] px-3 text-[#a9a5ba] lg:w-55">
						<Search className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
						<input
							type="search"
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.target.value)}
							placeholder="Search articles..."
							aria-label="Search articles"
							className="min-w-0 flex-1 bg-transparent text-[13px] text-[#0e0b1a] outline-none placeholder:text-[#a9a5ba]"
						/>
					</label>
				</div>
			</section>

			<section className="page-gutter py-10 sm:py-14">
				<div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(340px,1fr)]">
					{topArticles[0] && (
						<FeaturedArticle article={topArticles[0]} onNavigate={onNavigate} />
					)}
					{topArticles[1] && (
						<FeaturedArticle
							article={topArticles[1]}
							compact
							onNavigate={onNavigate}
						/>
					)}
				</div>
			</section>

			<section className="page-gutter pb-14 pt-2 sm:pb-16">
				<div className="mx-auto max-w-7xl">
					<h2 className="text-[26px] font-bold leading-tight text-[#0e0b1a] uppercase">
						LATEST INSIGHTS
					</h2>
					<div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{visibleArticles.map((article) => (
							<InsightCard key={article.id} article={article} />
						))}
					</div>
					{visibleArticles.length === 0 && (
						<p className="border-y border-[#d1d0e4] py-12 text-center text-sm text-[#7c7792]">
							No insights match those filters.
						</p>
					)}
					{visibleArticles.length > 0 && (
						<div className="mt-12 flex justify-center">
							<button type="button" className="rounded-[40px] border border-[#d1d0e4] px-6 py-2.5 text-[13px] font-medium text-[#7c7792] transition-colors hover:border-[#765dfb] hover:text-[#765dfb]">
								Load more
							</button>
						</div>
					)}
				</div>
			</section>

			<section className="page-gutter bg-black py-20 text-white sm:py-24">
				<div className="mx-auto flex max-w-175 flex-col items-center text-center">
					<h2 className="text-[34px] font-bold leading-tight sm:text-[48px]">
						Stay close to the context.
					</h2>
					<p className="mt-4 max-w-140 text-[15px] leading-[1.55] text-white/60 sm:text-[18px]">
						New research, engineering ideas and product updates from the team
						building persistent intelligence.
					</p>
					<form
						onSubmit={handleNewsletterSubmit}
						className="mt-8 flex w-full max-w-115 flex-col gap-3 sm:flex-row"
					>
						<input
							name="email"
							type="email"
							required
							value={newsletterEmail}
							onChange={(event) => {
								setNewsletterEmail(event.target.value)
								if (newsletterStatus !== "submitting") {
									setNewsletterStatus("idle")
									setNewsletterMessage("")
								}
							}}
							placeholder="Enter your email"
							aria-label="Email address for insights"
							className="h-11 min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#765dfb] disabled:opacity-60"
							disabled={newsletterStatus === "submitting"}
						/>
						<button
							type="submit"
							disabled={newsletterStatus === "submitting"}
							className="h-11 shrink-0 rounded-lg bg-[#765dfb] px-6 text-sm font-medium text-white transition-colors hover:bg-[#6349e0] disabled:cursor-wait disabled:opacity-60"
						>
							{newsletterStatus === "submitting"
								? "Subscribing..."
								: "Subscribe"}{" "}
							<ArrowRight className="ml-1 inline h-3.5 w-3.5" />
						</button>
					</form>
					{newsletterMessage && (
						<p
							role="status"
							aria-live="polite"
							className={`mt-3 text-sm ${newsletterStatus === "error" ? "text-red-300" : "text-white/70"}`}
						>
							{newsletterMessage}
						</p>
					)}
				</div>
			</section>
		</div>
	)
}
