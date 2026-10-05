export const blogCategories = [
	"All",
	"Engineering",
	"Product",
	"Company",
	"Sales",
] as const

export type BlogCategory = (typeof blogCategories)[number]

export interface BlogArticle {
	id: string
	title: string
	description: string
	category: Exclude<BlogCategory, "All">
	date: string
	readTime: string
	image: string
}

export const featuredArticles: BlogArticle[] = [
	{
		id: "building-ai-systems-that-remember",
		title: "Building AI systems that remember beyond the prompt",
		description:
			"How persistent context changes the way agents retrieve knowledge, maintain state and reason across interactions.",
		category: "Engineering",
		date: "Sep 25, 2026",
		readTime: "8 min read",
		image: "https://oxnycpedzdquflzvqujl.supabase.co/storage/v1/object/public/media/migrated-1791203369412-featured-agent-memory.webp",
	},
	{
		id: "persistent-context-reliable-ai",
		title: "Why persistent context matters for reliable AI",
		description:
			"Memory, retrieval and contextual continuity are the foundation of trustworthy autonomous systems.",
		category: "Engineering",
		date: "Sep 18, 2026",
		readTime: "6 min read",
		image: "/assets/blog/featured-reliable-ai.png",
	},
]

export const latestInsights: BlogArticle[] = [
	{
		id: "designing-memory-stateful-agents",
		title: "Designing memory systems for stateful AI agents",
		description:
			"A practical framework for structuring long-lived agent memory.",
		category: "Engineering",
		date: "Sep 12, 2026",
		readTime: "7 min read",
		image: "https://oxnycpedzdquflzvqujl.supabase.co/storage/v1/object/public/media/migrated-1791203377935-article-stateful-agents.webp",
	},
	{
		id: "retrieval-when-context-persists",
		title: "How retrieval changes when context persists",
		description:
			"Rethinking retrieval strategies for continuous knowledge access.",
		category: "Engineering",
		date: "Sep 8, 2026",
		readTime: "5 min read",
		image: "https://oxnycpedzdquflzvqujl.supabase.co/storage/v1/object/public/media/migrated-1791203375969-article-persistent-retrieval.webp",
	},
	{
		id: "reliable-knowledge-layers",
		title: "Building reliable knowledge layers for AI applications",
		description:
			"Architecture patterns for durable, accurate knowledge layers.",
		category: "Product",
		date: "Sep 3, 2026",
		readTime: "6 min read",
		image: "https://oxnycpedzdquflzvqujl.supabase.co/storage/v1/object/public/media/migrated-1791203370379-article-knowledge-layers.webp",
	},
	{
		id: "rag-pipelines-persistent-context",
		title: "From RAG pipelines to persistent context",
		description: "A guide to evolving retrieval pipelines into memory systems.",
		category: "Engineering",
		date: "Aug 28, 2026",
		readTime: "9 min read",
		image: "https://oxnycpedzdquflzvqujl.supabase.co/storage/v1/object/public/media/migrated-1791203373403-article-rag-to-memory.webp",
	},
	{
		id: "agent-memory-needs-structure",
		title: "Why agent memory needs structure, not just storage",
		description:
			"Structured memory outperforms flat storage for reasoning tasks.",
		category: "Engineering",
		date: "Aug 22, 2026",
		readTime: "7 min read",
		image: "https://oxnycpedzdquflzvqujl.supabase.co/storage/v1/object/public/media/migrated-1791203371585-article-structured-memory.webp",
	},
	{
		id: "multi-tenant-memory-production-ai",
		title: "Multi-tenant memory for production AI",
		description: "Isolating and scaling memory across many customers safely.",
		category: "Engineering",
		date: "Aug 15, 2026",
		readTime: "6 min read",
		image: "https://oxnycpedzdquflzvqujl.supabase.co/storage/v1/object/public/media/migrated-1791203374251-article-multitenant.webp",
	},
	{
		id: "context-windows-are-not-memory",
		title: "Context windows are not memory",
		description: "Understanding the gap between token limits and true recall.",
		category: "Product",
		date: "Aug 9, 2026",
		readTime: "5 min read",
		image: "https://oxnycpedzdquflzvqujl.supabase.co/storage/v1/object/public/media/migrated-1791203375068-article-context-windows.webp",
	},
	{
		id: "engineering-ai-systems-learn-across-sessions",
		title: "Engineering AI systems that learn across sessions",
		description:
			"Lessons from building continuity into large-scale AI systems.",
		category: "Company",
		date: "Aug 1, 2026",
		readTime: "8 min read",
		image: "https://oxnycpedzdquflzvqujl.supabase.co/storage/v1/object/public/media/migrated-1791203372435-article-learning-systems.webp",
	},
]
