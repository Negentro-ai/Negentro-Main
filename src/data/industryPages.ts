export interface IndustryFact {
	label: string
	value: string
}

export interface IndustryContentItem {
	title: string
	description: string
}

export interface IndustryFaq {
	question: string
	answer: string
}

export interface IndustryPageData {
	slug: string
	name: string
	heroTitle: string
	heroDescription: string
	facts: IndustryFact[]
	contextTitle: string
	contextDescription: string
	contextImage?: string
	contextImageAlt: string
	introTitle: string
	introParagraphs: string[]
	capabilitiesTitle: string
	capabilities: IndustryContentItem[]
	infrastructureTitle: string
	problems: IndustryContentItem[]
	flowSteps: string[]
	architectureTitle: string
	architectureImage?: string
	memoryTitle: string
	memoryDescription: string
	memorySteps: string[]
	getStartedTitle: string
	getStartedDescription: string
	faqs: IndustryFaq[]
	finalCtaTitle: string
	finalCtaDescription: string
}

interface IndustrySeed {
	slug: string
	name: string
	heroTitle: string
	heroDescription: string
	facts: IndustryFact[]
	capabilities: IndustryContentItem[]
}

const createIndustryPage = (seed: IndustrySeed): IndustryPageData => ({
	...seed,
	contextTitle: "Every interaction adds useful context.",
	contextDescription: `PiyApi remembers the details that matter across ${seed.name.toLowerCase()} workflows, so each new interaction can build on what came before.`,
	contextImageAlt: `Persistent memory context for ${seed.name.toLowerCase()}`,
	introTitle: `${seed.name} needs memory.`,
	introParagraphs: [
		seed.heroDescription,
		`Give every user an isolated memory that evolves over time, while shared ${seed.name.toLowerCase()} knowledge stays available for retrieval when it is needed.`,
	],
	capabilitiesTitle: "Four building blocks, one memory layer.",
	infrastructureTitle: `The infrastructure underneath ${seed.name.toLowerCase()}.`,
	problems: [
		{
			title: "Context that persists",
			description: `Carry relevant ${seed.name.toLowerCase()} context from one interaction into the next.`,
		},
		{
			title: "Isolation at scale",
			description:
				"Keep each user's memory separate while shared knowledge remains available to retrieve.",
		},
		{
			title: "Knowledge you can search",
			description: `Retrieve useful information from long-running ${seed.name.toLowerCase()} workflows by meaning.`,
		},
		{
			title: "Responses grounded in context",
			description:
				"Bring the right memory and knowledge into the next AI response.",
		},
	],
	flowSteps: ["SESSION", "CONTEXT", "MEMORY", "NEXT SESSION"],
	architectureTitle: "The infrastructure underneath.",
	memoryTitle: "Context that deepens with every interaction.",
	memoryDescription: `As a ${seed.name.toLowerCase()} product learns, PiyApi can use preferences, recurring context and interaction history to make the next response more relevant.`,
	memorySteps: [
		"First interaction",
		"Known preferences",
		"Recurring context",
		"Interaction history",
		"More relevant next response",
	],
	getStartedTitle: `Give every ${seed.name.toLowerCase()} user a memory that grows with them.`,
	getStartedDescription: `Build ${seed.name.toLowerCase()} systems that remember context, retrieve knowledge and make every interaction more useful.`,
	faqs: [
		{
			question: `How does memory help ${seed.name.toLowerCase()} products?`,
			answer:
				"PiyApi stores useful context across sessions so an AI system can retrieve relevant history instead of starting from scratch.",
		},
		{
			question: "How is each user's memory kept separate?",
			answer:
				"Memory can be scoped to the individual user, while shared knowledge is retrieved separately when needed.",
		},
		{
			question: `Can PiyApi search ${seed.name.toLowerCase()} knowledge?`,
			answer:
				"Yes. Relevant information can be retrieved from connected documents and other knowledge sources by meaning.",
		},
		{
			question: "Does memory update as interactions continue?",
			answer:
				"New interactions can add context that is available to future sessions.",
		},
		{
			question: "Is PiyApi a finished end-user product?",
			answer:
				"PiyApi is memory infrastructure for developers to integrate into their AI products and workflows.",
		},
	],
	finalCtaTitle: `Give your ${seed.name.toLowerCase()} AI a memory that grows with every interaction.`,
	finalCtaDescription:
		"Build with persistent context, reliable retrieval and memory designed for production AI.",
})

export const industryPages: IndustryPageData[] = [
	{
		slug: "education",
		name: "Education & EdTech",
		heroTitle: "AI infrastructure for learning systems.",
		heroDescription:
			"Build tutoring copilots, course search and adaptive learning products on persistent, per-student memory, infrastructure that lets every session build on the last.",
		facts: [
			{ label: "BASE", value: "Isolated per-student memory" },
			{ label: "MEMORY", value: "Context that grows across sessions" },
			{ label: "EXTRACT", value: "Lectures become searchable knowledge" },
			{ label: "DEEP SEARCH", value: "Course material searchable by meaning" },
		],
		contextTitle: "Every session adds useful context.",
		contextDescription:
			"PiyApi remembers what matters across sessions, so a learning copilot can respond with a deeper understanding of each learner.",
		contextImage: "https://oxnycpedzdquflzvqujl.supabase.co/storage/v1/object/public/media/migrated-1791203367460-education-learner-context.webp",
		contextImageAlt:
			"Learner context and persistent memory across tutoring sessions",
		introTitle: "Personalised learning needs memory.",
		introParagraphs: [
			"A tutor cannot adapt to a learner it cannot remember. PiyApi keeps track of what a student has learned, where they struggle, and what matters to them across sessions.",
			"Give every learner an isolated memory that evolves over time, while shared course knowledge stays available for retrieval when it is needed.",
		],
		capabilitiesTitle: "Four building blocks, one memory layer.",
		capabilities: [
			{
				title: "Tutoring copilots",
				description:
					"Remember progress, strengths, gaps and preferences so each session starts with context.",
			},
			{
				title: "Lecture & course search",
				description:
					"Make recordings searchable by meaning and help learners jump straight to the right moment.",
			},
			{
				title: "Queryable course libraries",
				description:
					"Let learners and agents ask questions across textbooks, notes, transcripts and course material.",
			},
			{
				title: "Adaptive learning platforms",
				description:
					"Personalise at scale with persistent memory isolated to each learner.",
			},
		],
		infrastructureTitle: "The infrastructure underneath adaptive learning.",
		problems: [
			{
				title: "Personalisation that persists",
				description:
					"A useful tutor remembers what each learner knows, struggles with and prefers, then uses that context in the next session.",
			},
			{
				title: "Isolation at learner scale",
				description:
					"Each student's memory stays separate by design, giving multi-tenant learning platforms a reliable foundation.",
			},
			{
				title: "Lectures you can actually search",
				description:
					"Transcribe audio and video, then retrieve the relevant moment by meaning instead of hunting through recordings.",
			},
			{
				title: "Course knowledge that answers back",
				description:
					"Retrieve relevant passages across textbooks, notes and transcripts even when the learner's wording does not match the source.",
			},
		],
		flowSteps: ["SESSION", "CONTEXT", "MEMORY", "NEXT SESSION"],
		architectureTitle: "The infrastructure underneath.",
		architectureImage: "https://oxnycpedzdquflzvqujl.supabase.co/storage/v1/object/public/media/migrated-1791203368163-education-memory-architecture.webp",
		memoryTitle: "Personalisation that deepens with every session.",
		memoryDescription:
			"A learning platform becomes more useful as it learns. With PiyApi, the first session creates context; later sessions can use strengths, recurring difficulties and learning history to make the next interaction more relevant.",
		memorySteps: [
			"First session",
			"Known strengths",
			"Learning gaps",
			"Learning history",
			"Personalised next session",
		],
		getStartedTitle: "Give every learner a memory that grows with them.",
		getStartedDescription:
			"Build tutoring and learning systems that remember context, retrieve knowledge and personalise every interaction.",
		faqs: [
			{
				question: "How does a tutor know what a student has already learned?",
				answer:
					"PiyApi stores memory scoped to the learner, so each session can retrieve what was previously learned, what remains difficult and what should be revisited.",
			},
			{
				question: "How are different students kept separate?",
				answer:
					"Each learner's memory is isolated by scope, while shared course material can be retrieved independently when a session needs it.",
			},
			{
				question: "Can PiyApi transcribe and search lectures?",
				answer:
					"Course recordings can be transcribed and indexed so a copilot can retrieve the relevant passage or moment by meaning.",
			},
			{
				question: "Does learner memory change as the student improves?",
				answer:
					"Yes. New sessions can add progress, preferences and changing learning needs to the learner's persistent context.",
			},
			{
				question:
					"Can shared course material stay separate from private learner memory?",
				answer:
					"Yes. Shared knowledge and private learner memory can be stored and retrieved as distinct context sources.",
			},
			{
				question: "Is PiyApi a finished learning product?",
				answer:
					"PiyApi is memory infrastructure developers integrate into their own tutoring copilots and learning products.",
			},
		],
		finalCtaTitle: "Give every learner a memory that grows with them.",
		finalCtaDescription:
			"Build learning systems that remember context, retrieve knowledge and personalise every interaction.",
	},
	createIndustryPage({
		slug: "publishing",
		name: "E commerce & retail",
		heroTitle: "AI infrastructure for publishing systems.",
		heroDescription:
			"Build editorial copilots and reader experiences on persistent context, searchable archives and memory that carries across every interaction.",
		facts: [
			{ label: "BASE", value: "Context scoped to each reader" },
			{ label: "MEMORY", value: "Preferences across reading sessions" },
			{ label: "EXTRACT", value: "Articles become reusable knowledge" },
			{ label: "DEEP SEARCH", value: "Archives searchable by meaning" },
		],
		capabilities: [
			{
				title: "Editorial copilots",
				description:
					"Keep research, drafts and editorial decisions available across long-running assignments.",
			},
			{
				title: "Reader experiences",
				description:
					"Use reading history and preferences to make recommendations more relevant.",
			},
			{
				title: "Searchable archives",
				description:
					"Retrieve useful passages across articles, editions and reference material.",
			},
			{
				title: "Knowledge products",
				description:
					"Turn trusted publications into a source AI products can search and cite.",
			},
		],
	}),
	createIndustryPage({
		slug: "media",
		name: "Media & Entertainment",
		heroTitle: "AI infrastructure for media experiences.",
		heroDescription:
			"Build media copilots and discovery products that remember preferences, understand archives and make every viewing or listening session more useful.",
		facts: [
			{ label: "BASE", value: "Context scoped to each audience" },
			{ label: "MEMORY", value: "Preferences across sessions" },
			{ label: "EXTRACT", value: "Audio and video become searchable" },
			{ label: "DEEP SEARCH", value: "Find moments by meaning" },
		],
		capabilities: [
			{
				title: "Media discovery",
				description:
					"Remember interests and surface relevant stories, episodes and clips.",
			},
			{
				title: "Audio and video search",
				description:
					"Find the right moment in recordings without scrubbing through a timeline.",
			},
			{
				title: "Production copilots",
				description:
					"Carry briefs, research and editorial context across production workflows.",
			},
			{
				title: "Archive intelligence",
				description:
					"Make years of published media available to retrieval systems.",
			},
		],
	}),
	createIndustryPage({
		slug: "recruiting",
		name: "HR & Recruiting",
		heroTitle: "AI infrastructure for recruiting teams.",
		heroDescription:
			"Build recruiting copilots that preserve candidate context, retrieve role knowledge and support more consistent interactions from first contact onward.",
		facts: [
			{ label: "BASE", value: "Context scoped to each candidate" },
			{ label: "MEMORY", value: "History across hiring stages" },
			{ label: "EXTRACT", value: "Profiles become searchable knowledge" },
			{ label: "DEEP SEARCH", value: "Find relevant experience by meaning" },
		],
		capabilities: [
			{
				title: "Candidate copilots",
				description:
					"Carry candidate preferences and conversation history across each hiring stage.",
			},
			{
				title: "Role matching",
				description:
					"Retrieve relevant skills and experience from profiles and role requirements.",
			},
			{
				title: "Recruiter workflows",
				description:
					"Keep interview notes, decisions and next steps in shared workflow context.",
			},
			{
				title: "Talent knowledge",
				description:
					"Search across candidate and role information with natural language.",
			},
		],
	}),
	createIndustryPage({
		slug: "accounting",
		name: "Finance & Accounting",
		heroTitle: "AI infrastructure for accounting workflows.",
		heroDescription:
			"Build finance copilots that retain client context, retrieve relevant records and keep ongoing accounting workflows grounded in their history.",
		facts: [
			{ label: "BASE", value: "Context scoped to each client" },
			{ label: "MEMORY", value: "History across reporting periods" },
			{ label: "EXTRACT", value: "Records become reusable context" },
			{ label: "DEEP SEARCH", value: "Documents searchable by meaning" },
		],
		capabilities: [
			{
				title: "Finance copilots",
				description:
					"Retain client-specific context across recurring close and reporting workflows.",
			},
			{
				title: "Document retrieval",
				description:
					"Find the relevant detail across invoices, statements and supporting records.",
			},
			{
				title: "Audit preparation",
				description:
					"Keep evidence and decisions accessible throughout an engagement.",
			},
			{
				title: "Client operations",
				description:
					"Carry preferences and open items into the next client interaction.",
			},
		],
	}),
	createIndustryPage({
		slug: "consulting",
		name: "Consulting & Enterprise",
		heroTitle: "AI infrastructure for consulting teams.",
		heroDescription:
			"Build consulting copilots that carry project context forward, retrieve institutional knowledge and make every client interaction start informed.",
		facts: [
			{ label: "BASE", value: "Context scoped to each engagement" },
			{ label: "MEMORY", value: "Decisions across project stages" },
			{ label: "EXTRACT", value: "Research becomes reusable knowledge" },
			{ label: "DEEP SEARCH", value: "Expertise searchable by meaning" },
		],
		capabilities: [
			{
				title: "Engagement copilots",
				description:
					"Keep goals, decisions and workstream context available across an engagement.",
			},
			{
				title: "Institutional knowledge",
				description:
					"Find relevant prior work without relying on who remembers where it lives.",
			},
			{
				title: "Research synthesis",
				description:
					"Retrieve useful findings across reports, interviews and source material.",
			},
			{
				title: "Client continuity",
				description:
					"Carry the details that matter from one client conversation to the next.",
			},
		],
	}),
	createIndustryPage({
		slug: "ai-startups",
		name: "Legal & Compliance",
		heroTitle: "AI infrastructure for products that learn.",
		heroDescription:
			"Give AI products a persistent memory layer that preserves user context, retrieves knowledge and makes each new interaction more useful.",
		facts: [
			{ label: "BASE", value: "User-scoped persistent memory" },
			{ label: "MEMORY", value: "Context across product sessions" },
			{ label: "EXTRACT", value: "Interactions become reusable signals" },
			{ label: "DEEP SEARCH", value: "Product knowledge by meaning" },
		],
		capabilities: [
			{
				title: "Personal AI products",
				description:
					"Remember preferences and goals across sessions without rebuilding context.",
			},
			{
				title: "Agent workflows",
				description:
					"Keep durable state available across agents, steps and long-running tasks.",
			},
			{
				title: "Product knowledge",
				description:
					"Ground responses in documentation and trusted product information.",
			},
			{
				title: "Customer copilots",
				description:
					"Give each user continuity as their work and needs evolve.",
			},
		],
	}),
	createIndustryPage({
		slug: "dev-tools",
		name: "SaaS & Dev Tools",
		heroTitle: "AI infrastructure for developer tools.",
		heroDescription:
			"Build coding copilots that keep project decisions, conventions and task context available across repositories and sessions.",
		facts: [
			{ label: "BASE", value: "Context scoped to each project" },
			{ label: "MEMORY", value: "Decisions across coding sessions" },
			{ label: "EXTRACT", value: "Codebase knowledge made reusable" },
			{ label: "DEEP SEARCH", value: "Find implementation context" },
		],
		capabilities: [
			{
				title: "Coding agents",
				description:
					"Carry task context, decisions and project patterns between sessions.",
			},
			{
				title: "Repository understanding",
				description:
					"Retrieve relevant implementation details from large codebases.",
			},
			{
				title: "Team conventions",
				description:
					"Keep project-specific standards available to every assistant.",
			},
			{
				title: "Long-running tasks",
				description:
					"Preserve progress across tools, agents and multi-step workflows.",
			},
		],
	}),
	createIndustryPage({
		slug: "healthcare",
		name: "Healthcare & Medical",
		heroTitle: "AI infrastructure for healthcare workflows.",
		heroDescription:
			"Build healthcare AI systems that can retrieve relevant workflow context and preserve continuity while respecting scoped information boundaries.",
		facts: [
			{ label: "BASE", value: "Context scoped to each workflow" },
			{ label: "MEMORY", value: "Continuity across interactions" },
			{ label: "EXTRACT", value: "Records become searchable context" },
			{ label: "DEEP SEARCH", value: "Relevant information by meaning" },
		],
		capabilities: [
			{
				title: "Care navigation",
				description:
					"Keep relevant preferences and prior workflow context available.",
			},
			{
				title: "Clinical knowledge search",
				description:
					"Retrieve relevant information from approved reference material.",
			},
			{
				title: "Operations copilots",
				description:
					"Carry process context across scheduling and support workflows.",
			},
			{
				title: "Scoped memory",
				description:
					"Separate user or case context from shared organizational knowledge.",
			},
		],
	}),
	createIndustryPage({
		slug: "fintech",
		name: "Customer Support",
		heroTitle: "AI infrastructure for financial products.",
		heroDescription:
			"Build financial copilots that remember user goals, retrieve product knowledge and carry relevant context across ongoing workflows.",
		facts: [
			{ label: "BASE", value: "Context scoped to each user" },
			{ label: "MEMORY", value: "Goals across product sessions" },
			{ label: "EXTRACT", value: "Activity becomes useful context" },
			{ label: "DEEP SEARCH", value: "Product knowledge by meaning" },
		],
		capabilities: [
			{
				title: "Personal finance copilots",
				description:
					"Carry user goals and preferences across financial planning sessions.",
			},
			{
				title: "Product support",
				description:
					"Ground answers in current product documentation and policy.",
			},
			{
				title: "Workflow continuity",
				description:
					"Keep open tasks and prior decisions available to the next interaction.",
			},
			{
				title: "Knowledge retrieval",
				description:
					"Search structured guidance and documents with natural language.",
			},
		],
	}),
]

export const getIndustryPage = (slug: string): IndustryPageData | undefined =>
	industryPages.find((industry) => industry.slug === slug)
