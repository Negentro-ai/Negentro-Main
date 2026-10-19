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

export interface SessionFactAdd {
	k: string
	v: string
}

export interface SessionStep {
	title: string
	note: string
	adds: SessionFactAdd[]
	reply: string
}

export interface BuildingBlockItem {
	title: string
	text: string
	icon?: string
}

export interface ArchitectureData {
	inputs?: { title: string; subtitle: string }[]
	core?: { eyebrow: string; title: string; ops: string }
	engine?: { title: string; text: string }[]
	loop?: string[]
}

export interface IndustryPageData {
	slug: string
	name: string
	heroTitle: string
	heroDescription: string
	heroLede?: string
	facts: IndustryFact[]

	// Unified Template fields
	templateVersion?: "v2"
	sessionHeading?: string
	sessionSub?: string
	sessionSteps?: SessionStep[]
	whyHeading?: string
	whyParagraphs?: string[]
	blocksHeading?: string
	blocks?: BuildingBlockItem[]
	infraHeading?: string
	infraList?: IndustryContentItem[]
	architecture?: ArchitectureData
	faqHeading?: string
	faqs: IndustryFaq[]
	finalCtaTitle: string
	finalCtaDescription: string

	// Compatibility aliases
	contextTitle?: string
	contextDescription?: string
	introTitle?: string
	introParagraphs?: string[]
	capabilitiesTitle?: string
	capabilities?: IndustryContentItem[]
	infrastructureTitle?: string
	problems?: IndustryContentItem[]
	flowSteps?: string[]
	architectureTitle?: string
	memoryTitle?: string
	memoryDescription?: string
	memorySteps?: string[]
	getStartedTitle?: string
	getStartedDescription?: string
}

export const industryPages: IndustryPageData[] = [
	// 1. Education & EdTech
	{
		slug: "education",
		name: "Education & EdTech",
		templateVersion: "v2",
		heroTitle: "AI infrastructure for learning systems.",
		heroDescription:
			"Build tutoring copilots, course search and adaptive learning products on persistent, per-student memory: infrastructure that lets every session build on the last.",
		heroLede:
			"Build tutoring copilots, course search and adaptive learning products on persistent, per-student memory: infrastructure that lets every session build on the last.",
		facts: [
			{ label: "Base", value: "Isolated per-student memory" },
			{ label: "Memory", value: "Context that grows across sessions" },
			{ label: "Extract", value: "Lectures become searchable knowledge" },
			{ label: "Deep search", value: "Course material searchable by meaning" },
		],
		sessionHeading: "Every session adds useful context.",
		sessionSub:
			"PiyAPI remembers what matters across sessions, so a learning copilot can respond with a deeper understanding of each learner.",
		sessionSteps: [
			{
				title: "First session",
				note: "The first session creates context.",
				adds: [
					{ k: "Interest", v: "Physics applications" },
					{ k: "Goal", v: "Calculus fundamentals" },
				],
				reply: "Let's start with limits, using motion examples from physics.",
			},
			{
				title: "Known strengths",
				note: "What the learner already handles well is kept.",
				adds: [{ k: "Strength", v: "Derivatives of polynomials" }],
				reply: "You're solid on derivatives, so we'll move faster through that part.",
			},
			{
				title: "Learning gaps",
				note: "Recurring difficulties are noticed and stored.",
				adds: [{ k: "Difficulty", v: "Struggles with substitution" }],
				reply: "Substitution tripped you up twice. Let's slow down on that step.",
			},
			{
				title: "Learning history",
				note: "Progress and habits build a timeline.",
				adds: [
					{ k: "Progress", v: "Module 04 complete" },
					{ k: "Behaviour", v: "Works late evenings" },
				],
				reply: "Module 04 is done. Ready for Chapter 05, integration by parts?",
			},
			{
				title: "Personalised next session",
				note: "The next interaction starts with all of it.",
				adds: [{ k: "Preference", v: "Prefers visual explanations" }],
				reply:
					"Here's integration by parts as a diagram, with a physics example to start.",
			},
		],
		whyHeading: "Personalised learning needs memory.",
		whyParagraphs: [
			"A tutor cannot adapt to a learner it cannot remember. PiyAPI keeps track of what a student has learned, where they struggle, and what matters to them across sessions.",
			"Give every learner an isolated memory that evolves over time, while shared course knowledge stays available for retrieval when it is needed.",
		],
		blocksHeading: "Four building blocks, one memory layer.",
		blocks: [
			{
				title: "Tutoring copilots",
				text: "Remember progress, strengths, gaps and preferences so each session starts with context.",
				icon: "M12 4a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V8a4 4 0 0 1 4-4ZM5 20c1-3.5 3.7-5.5 7-5.5s6 2 7 5.5",
			},
			{
				title: "Lecture & course search",
				text: "Make recordings searchable by meaning and help learners jump straight to the right moment.",
				icon: "M4 6.5h16v11H4zM10 9.5v5l4.5-2.5L10 9.5Z",
			},
			{
				title: "Queryable course libraries",
				text: "Let learners and agents ask questions across textbooks, notes, transcripts and course material.",
				icon: "M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 0 4 21.5ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 1 1.5 1.5Z",
			},
			{
				title: "Adaptive learning platforms",
				text: "Personalise at scale with persistent memory isolated to each learner.",
				icon: "M4 18 9 12l4 3 7-9M15 6h5v5",
			},
		],
		infraHeading: "The infrastructure underneath adaptive learning.",
		infraList: [
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
		architecture: {
			inputs: [
				{ title: "Student", subtitle: "Learner identity" },
				{ title: "Session", subtitle: "Current interaction" },
			],
			core: {
				eyebrow: "Context engine",
				title: "Persistent Memory",
				ops: "Store, retrieve, recall",
			},
			engine: [
				{ title: "Extract", text: "Transform interaction into reusable knowledge" },
				{ title: "Search", text: "Retrieve relevant context" },
				{ title: "Knowledge", text: "Course material and learner signals" },
				{ title: "Retrieval system", text: "Semantic retrieval and relevant results" },
			],
			loop: ["Session", "Context", "Memory", "Next session"],
		},
		faqHeading: "Frequently asked about learner memory.",
		faqs: [
			{
				question: "How does a tutor know what a student has already learned?",
				answer:
					"PiyAPI stores memory scoped to the learner, so each session can retrieve what was previously learned, what remains difficult and what should be revisited.",
			},
			{
				question: "How are different students kept separate?",
				answer:
					"Each learner gets an isolated memory. One student's history is never retrieved for another, which keeps multi-tenant platforms safe by design.",
			},
			{
				question: "Can PiyAPI transcribe and search lectures?",
				answer:
					"Yes. Course recordings can be transcribed and indexed so a copilot can retrieve the relevant passage or moment by meaning.",
			},
			{
				question: "Does learner memory change as the student improves?",
				answer:
					"Yes. New sessions can add progress, preferences and changing learning needs to the learner's persistent context.",
			},
			{
				question: "Can shared course material stay separate from private learner memory?",
				answer:
					"Yes. Shared knowledge and private learner memory can be stored and retrieved as distinct context sources.",
			},
			{
				question: "Is PiyAPI a finished learning product?",
				answer:
					"PiyAPI is memory infrastructure developers integrate into their own tutoring copilots and learning products.",
			},
		],
		finalCtaTitle: "Give every learner a memory that grows with them.",
		finalCtaDescription:
			"Build learning systems that remember context, retrieve knowledge and personalise every interaction.",
	},

	// 2. E-commerce & Retail (publishing)
	{
		slug: "publishing",
		name: "E-commerce & Retail",
		templateVersion: "v2",
		heroTitle: "AI infrastructure for commerce systems.",
		heroDescription:
			"Build shopping copilots, catalog search and recommendation engines on persistent context, customer history and memory that carries across every interaction.",
		heroLede:
			"Build shopping copilots, catalog search and recommendation engines on persistent context, customer history and memory that carries across every interaction.",
		facts: [
			{ label: "Base", value: "Context scoped to each shopper" },
			{ label: "Memory", value: "Preferences across shopping sessions" },
			{ label: "Extract", value: "Catalogs become searchable knowledge" },
			{ label: "Deep search", value: "Inventory searchable by meaning" },
		],
		sessionHeading: "Every interaction adds useful shopping context.",
		sessionSub:
			"PiyAPI remembers preferences, style choices and past purchases, so a shopping assistant never asks the customer to repeat their needs.",
		sessionSteps: [
			{
				title: "First interaction",
				note: "The shopper expresses intent and constraints.",
				adds: [
					{ k: "Interest", v: "Minimalist desk setup" },
					{ k: "Budget", v: "Under $500" },
				],
				reply: "I'll curate modern, ergonomic desk setups under $500.",
			},
			{
				title: "Known preferences",
				note: "Material and sizing choices are captured.",
				adds: [
					{ k: "Dimensions", v: "48-inch compact width" },
					{ k: "Finish", v: "Solid oak & matte black" },
				],
				reply: "Focusing on 48-inch compact desks in solid oak and black steel.",
			},
			{
				title: "Quality objections",
				note: "Dislikes and past friction are preserved.",
				adds: [{ k: "Avoids", v: "Veneer / particle board" }],
				reply: "Filtered out veneer and composite surfaces in favor of solid hardwoods.",
			},
			{
				title: "Order timeline",
				note: "Purchases and deliveries build context.",
				adds: [
					{ k: "Purchased", v: "Oak desk riser" },
					{ k: "Delivery", v: "Arrives Thursday" },
				],
				reply: "Your oak riser arrives Thursday. Let's find an ergonomic task lamp to match.",
			},
			{
				title: "Personalised next visit",
				note: "Future sessions resume with full taste profile.",
				adds: [{ k: "Lighting", v: "Prefers warm 2700K ambient" }],
				reply: "Here are three warm ambient lamps designed to pair with your oak desk.",
			},
		],
		whyHeading: "Modern commerce needs customer memory.",
		whyParagraphs: [
			"A shopping copilot cannot recommend what a customer truly wants if it resets on every page reload. PiyAPI preserves style preferences, past objections, and sizing constraints across sessions.",
			"Keep each buyer's context isolated and secure while making vast product catalogs, reviews, and inventory data instantly searchable by meaning.",
		],
		blocksHeading: "Four building blocks, one memory layer.",
		blocks: [
			{
				title: "Shopping copilots",
				text: "Keep taste, sizing and prior purchases available so every shopping session starts informed.",
				icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
			},
			{
				title: "Catalog search by intent",
				text: "Let shoppers describe what they want in natural language and find exact matches across SKUs.",
				icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
			},
			{
				title: "Review & specification search",
				text: "Ground answers in verified product specifications, sizing guides and real customer feedback.",
				icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
			},
			{
				title: "Dynamic recommendation engines",
				text: "Surface relevant cross-sells and accessories grounded in actual customer purchase history.",
				icon: "M13 10V3L4 14h7v7l9-11h-7z",
			},
		],
		infraHeading: "The infrastructure underneath retail AI.",
		infraList: [
			{
				title: "Cart and taste context that persists",
				description:
					"Carry shopping intent, sizing parameters and brand preferences seamlessly across web, app and email interactions.",
			},
			{
				title: "Buyer isolation at enterprise scale",
				description:
					"Each customer's payment history and personal recommendations stay strictly private to their identity.",
			},
			{
				title: "Catalogs you can actually search",
				description:
					"Query millions of variants, attributes and compatibility charts by natural semantic intent.",
			},
			{
				title: "Real-time inventory grounding",
				description:
					"Retrieve live stock levels, delivery estimates and regional availability right inside the conversation.",
			},
		],
		architecture: {
			inputs: [
				{ title: "Shopper", subtitle: "Customer profile & history" },
				{ title: "Session", subtitle: "Active cart & browsing" },
			],
			core: {
				eyebrow: "Context engine",
				title: "Persistent Memory",
				ops: "Store, retrieve, recall",
			},
			engine: [
				{ title: "Extract", text: "Transform browsing signals into taste profiles" },
				{ title: "Search", text: "Retrieve relevant SKUs and specs" },
				{ title: "Knowledge", text: "Catalogs, policies and reviews" },
				{ title: "Retrieval system", text: "Vector retrieval and real-time stock sync" },
			],
			loop: ["Browsing", "Context", "Memory", "Next purchase"],
		},
		faqHeading: "Frequently asked about commerce memory.",
		faqs: [
			{
				question: "How does persistent memory improve conversion?",
				answer:
					"When shoppers don't have to repeat sizing, preferences, or budget constraints across sessions, conversion friction drops and recommendations are much more accurate.",
			},
			{
				question: "How are different customers' carts and data isolated?",
				answer:
					"Every shopper's memory is isolated by authenticated user scope. One customer never sees signals or history from another.",
			},
			{
				question: "Can PiyAPI index millions of dynamic SKUs?",
				answer:
					"Yes. PiyAPI connects to catalog databases, indexing product attributes and specifications so copilots can search by meaning.",
			},
			{
				question: "Does memory update as the customer buys products?",
				answer:
					"Yes. Real-time webhooks record completed purchases, returns, and reviews into the customer's persistent profile.",
			},
			{
				question: "Can product catalogs stay separate from private buyer data?",
				answer:
					"Yes. Shared product catalogs and private customer memory are stored in distinct scopes and combined only during active retrieval.",
			},
			{
				question: "Is PiyAPI an off-the-shelf storefront?",
				answer:
					"PiyAPI is memory and retrieval infrastructure for developers to power shopping copilots on Shopify, custom headless stacks, and mobile apps.",
			},
		],
		finalCtaTitle: "Give every shopper a concierge that remembers what they love.",
		finalCtaDescription:
			"Build commerce systems that remember context, search catalogs with precision and personalise every purchase.",
	},

	// 3. Media & Entertainment
	{
		slug: "media",
		name: "Media & Entertainment",
		templateVersion: "v2",
		heroTitle: "AI infrastructure for media experiences.",
		heroDescription:
			"Build media copilots and discovery products that remember preferences, understand archives and make every viewing or listening session more useful.",
		heroLede:
			"Build media copilots and discovery products that remember preferences, understand archives and make every viewing or listening session more useful.",
		facts: [
			{ label: "Base", value: "Context scoped to each audience" },
			{ label: "Memory", value: "Preferences across sessions" },
			{ label: "Extract", value: "Audio and video become searchable" },
			{ label: "Deep search", value: "Find moments by meaning" },
		],
		sessionHeading: "Every session deepens audience understanding.",
		sessionSub:
			"PiyAPI tracks viewing habits, preferred creators, and narrative tastes to deliver copilots that know what to play next.",
		sessionSteps: [
			{
				title: "First discovery",
				note: "Audience intent and initial tastes are logged.",
				adds: [
					{ k: "Genre", v: "Investigative documentary" },
					{ k: "Duration", v: "Under 45 minutes" },
				],
				reply: "I've queued up award-winning short investigative features.",
			},
			{
				title: "Pacing preferences",
				note: "Narrative preferences and engagement depth are captured.",
				adds: [
					{ k: "Tone", v: "Journalistic & analytical" },
					{ k: "Avoids", v: "Sensational reenactments" },
				],
				reply: "Focusing on archival and analytical journalism with direct sources.",
			},
			{
				title: "Viewing habits",
				note: "Device and time patterns inform suggestions.",
				adds: [
					{ k: "Pattern", v: "Late evenings on tablet" },
					{ k: "Audio", v: "Subtitles enabled" },
				],
				reply: "Optimized for quiet tablet viewing with full English transcripts.",
			},
			{
				title: "Watch timeline",
				note: "Completed titles and bookmarked scenes build history.",
				adds: [
					{ k: "Completed", v: "The Deep Web Archive" },
					{ k: "Saved", v: "Interview scene at 34:12" },
				],
				reply: "Saved your bookmark at 34:12. Ready for the director's commentary?",
			},
			{
				title: "Curated return session",
				note: "Resumes with high-confidence recommendations.",
				adds: [{ k: "Creator", v: "Follows filmmaker Laura Poitras" }],
				reply: "Laura Poitras just released a new investigative short. Here's a 2-minute teaser.",
			},
		],
		whyHeading: "Next-generation media needs memory.",
		whyParagraphs: [
			"Static recommendation algorithms struggle because they look only at raw click events rather than understanding why a viewer loved a story. PiyAPI captures context, nuances, and specific scenes that resonated.",
			"Enable producers to search decades of raw footage and transcripts by semantic concept, while audience members receive conversational discovery that evolves with their interests.",
		],
		blocksHeading: "Four building blocks, one memory layer.",
		blocks: [
			{
				title: "Media discovery & copilots",
				text: "Remember tastes, favourite creators and topics so every session delivers personalized suggestions.",
				icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
			},
			{
				title: "Audio & video search",
				text: "Find the exact timestamp in hours of recorded media by meaning without manual scrubbing.",
				icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
			},
			{
				title: "Production copilots",
				text: "Keep pitch briefs, research notes and script revisions connected throughout long production cycles.",
				icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
			},
			{
				title: "Archive intelligence",
				text: "Index historical libraries and turn legacy broadcasts into searchable, reusable media assets.",
				icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
			},
		],
		infraHeading: "The infrastructure underneath media platforms.",
		infraList: [
			{
				title: "Context that persists across streams",
				description:
					"Audiences move between smart TVs, mobile apps and web browsers with uninterrupted context and progress.",
			},
			{
				title: "Tenant isolation across subscriber accounts",
				description:
					"Each viewer profile enjoys separate memory, recommendations and watchlists within family and enterprise accounts.",
			},
			{
				title: "Multimodal audio and video search",
				description:
					"Automatic transcription and embedding align spoken words and scene summaries with semantic query search.",
			},
			{
				title: "Production knowledge that answers back",
				description:
					"Writers and editors query script lore, character bios and scene continuity in real time.",
			},
		],
		architecture: {
			inputs: [
				{ title: "Audience", subtitle: "Viewer profile & tastes" },
				{ title: "Session", subtitle: "Active playback & stream" },
			],
			core: {
				eyebrow: "Context engine",
				title: "Persistent Memory",
				ops: "Store, retrieve, recall",
			},
			engine: [
				{ title: "Extract", text: "Transcribe audio and log key timestamp markers" },
				{ title: "Search", text: "Retrieve scenes by semantic query" },
				{ title: "Knowledge", text: "Scripts, archives and creator catalogs" },
				{ title: "Retrieval system", text: "Multimodal embeddings and vector retrieval" },
			],
			loop: ["Playback", "Context", "Memory", "Next recommendation"],
		},
		faqHeading: "Frequently asked about media memory.",
		faqs: [
			{
				question: "How does speech-to-text integrate with timestamp retrieval?",
				answer:
					"PiyAPI transcribes video and audio assets into timecoded segments, allowing semantic queries to return the exact second where a topic was discussed.",
			},
			{
				question: "Can multiple family profiles keep separate watch memory?",
				answer:
					"Yes. Memory is scoped by individual profile tokens, ensuring each family member has completely isolated recommendations.",
			},
			{
				question: "Can we search raw unedited footage during production?",
				answer:
					"Yes. Production crews upload unedited rushes, and PiyAPI generates searchable metadata and transcripts accessible to editors.",
			},
			{
				question: "Does audience memory adjust when tastes change?",
				answer:
					"Yes. As viewers explore new genres, older weights decay gracefully in favor of recent engagement patterns.",
			},
			{
				question: "Is audio and video data stored securely?",
				answer:
					"All media assets and vectors are encrypted at rest and in transit, with full access controls.",
			},
			{
				question: "What formats can PiyAPI process?",
				answer:
					"PiyAPI supports standard video (MP4, WebM), audio (MP3, WAV, AAC), and text transcript formats (SRT, VTT, JSON).",
			},
		],
		finalCtaTitle: "Give your media platform a memory that never forgets a story.",
		finalCtaDescription:
			"Build streaming and discovery copilots that remember preferences, index archives and engage audiences deeply.",
	},

	// 4. HR & Recruiting
	{
		slug: "recruiting",
		name: "HR & Recruiting",
		templateVersion: "v2",
		heroTitle: "AI infrastructure for recruiting teams.",
		heroDescription:
			"Build recruiting copilots that preserve candidate context, retrieve role knowledge and support more consistent interactions from first contact onward.",
		heroLede:
			"Build recruiting copilots that preserve candidate context, retrieve role knowledge and support more consistent interactions from first contact onward.",
		facts: [
			{ label: "Base", value: "Context scoped to each candidate" },
			{ label: "Memory", value: "History across hiring stages" },
			{ label: "Extract", value: "Profiles become searchable knowledge" },
			{ label: "Deep search", value: "Find relevant experience by meaning" },
		],
		sessionHeading: "Every interview adds structured candidate context.",
		sessionSub:
			"PiyAPI connects recruiter phone screens, hiring manager scorecards, and candidate preferences into a single continuous memory stream.",
		sessionSteps: [
			{
				title: "Candidate intake",
				note: "Core background, career aspirations, and salary bounds are recorded.",
				adds: [
					{ k: "Target role", v: "Staff Infrastructure Engineer" },
					{ k: "Location", v: "Remote (CET / EST overlap)" },
				],
				reply: "Matched to our Distributed Systems team. Scheduling initial recruiter sync.",
			},
			{
				title: "Technical background",
				note: "Detailed stack experience and project scale are extracted.",
				adds: [
					{ k: "Core stack", v: "Go, Kubernetes, Raft consensus" },
					{ k: "Scale", v: "100k+ rps production clusters" },
				],
				reply: "Candidate has 6 years deep Go experience at high throughput. Moving to system design.",
			},
			{
				title: "Hiring constraints",
				note: "Notice periods, equity expectations, and visa status are noted.",
				adds: [
					{ k: "Compensation", v: "$210k base + equity" },
					{ k: "Notice period", v: "30 days" },
				],
				reply: "Within target compensation band. No visa sponsorship required.",
			},
			{
				title: "Interview feedback",
				note: "Interviewer scorecards and rubric scores are linked.",
				adds: [
					{ k: "System design", v: "Strong hire (4/4 on consensus)" },
					{ k: "Team fit", v: "Collaborative, proven mentor" },
				],
				reply: "Candidate received unanimous Strong Hire signals across 4 interview panels.",
			},
			{
				title: "Personalised offer debrief",
				note: "Offer letter generated with customized selling points.",
				adds: [{ k: "Key motivator", v: "High autonomy & open-source work" }],
				reply: "Generated tailored offer letter highlighting our open-source commitment and team autonomy.",
			},
		],
		whyHeading: "Consistent hiring requires candidate memory.",
		whyParagraphs: [
			"When interview notes and recruiter debriefs live scattered across spreadsheets, emails, and ATS tools, candidates are asked the same questions three times and top talent slips away.",
			"PiyAPI gives hiring teams a unified memory layer that tracks every candidate's journey from first outreach to signed offer, while protecting candidate privacy with strict access controls.",
		],
		blocksHeading: "Four building blocks, one memory layer.",
		blocks: [
			{
				title: "Candidate copilots",
				text: "Carry candidate goals and discussion history forward so each panelist starts fully briefed.",
				icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
			},
			{
				title: "Semantic talent matching",
				text: "Search resumes and past candidates by conceptual skill mastery rather than blunt keyword matching.",
				icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
			},
			{
				title: "Recruiter workflows",
				text: "Keep interview scorecards, salary constraints and debrief conclusions synchronized.",
				icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
			},
			{
				title: "Internal talent mobility",
				text: "Match existing team members to internal openings based on demonstrated competencies and goals.",
				icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
			},
		],
		infraHeading: "The infrastructure underneath modern recruiting.",
		infraList: [
			{
				title: "Continuity across multiple interview rounds",
				description:
					"Never repeat a question. Interviewers see past answers and can probe deeper into real technical strengths.",
			},
			{
				title: "Confidential candidate isolation",
				description:
					"Sensitive salary data, background checks and private evaluations remain strictly permissioned.",
			},
			{
				title: "Talent databases you can actually query",
				description:
					"Search 50,000 past applicants with natural questions like 'Who built distributed storage systems in Rust?'.",
			},
			{
				title: "Job requirement grounding",
				description:
					"Copilots compare resumes directly against engineering rubrics to ensure bias-free evaluations.",
			},
		],
		architecture: {
			inputs: [
				{ title: "Candidate", subtitle: "Profile, resume & scorecard" },
				{ title: "Role", subtitle: "Requirements & hiring rubric" },
			],
			core: {
				eyebrow: "Context engine",
				title: "Persistent Memory",
				ops: "Store, retrieve, recall",
			},
			engine: [
				{ title: "Extract", text: "Parse resumes and interview feedback into signals" },
				{ title: "Search", text: "Semantic candidate-to-role matching" },
				{ title: "Knowledge", text: "Job descriptions and company compensation bands" },
				{ title: "Retrieval system", text: "Vector retrieval and structured scorecard scoring" },
			],
			loop: ["Screening", "Interview", "Evaluation", "Offer closing"],
		},
		faqHeading: "Frequently asked about recruiting memory.",
		faqs: [
			{
				question: "How does semantic matching differ from keyword search?",
				answer:
					"Keyword search misses candidates who use different synonyms or descriptions. Semantic search understands that 'wrote distributed consensus algorithms' matches 'Raft/Paxos experience'.",
			},
			{
				question: "Is candidate information kept confidential?",
				answer:
					"Yes. All candidate profiles are isolated by secure tenant boundaries, with role-based access control protecting compensation and personal details.",
			},
			{
				question: "Can PiyAPI connect to ATS platforms like Greenhouse or Lever?",
				answer:
					"Yes. PiyAPI ingests candidate data, scorecards, and resumes via webhooks and REST APIs from all major ATS platforms.",
			},
			{
				question: "Does memory persist across different hiring cycles?",
				answer:
					"Yes. If a great candidate was runner-up six months ago, their notes and skills remain easily retrievable for new relevant openings.",
			},
			{
				question: "Can hiring teams search internal candidate notes?",
				answer:
					"Yes. Panelists and recruiters can query internal debrief notes and transcripts using natural language.",
			},
			{
				question: "Does PiyAPI enforce compliance with hiring guidelines?",
				answer:
					"PiyAPI helps enforce structured interview scorecards, reducing bias by evaluating candidates against objective rubric context.",
			},
		],
		finalCtaTitle: "Give your hiring teams a copilot that remembers every great candidate.",
		finalCtaDescription:
			"Build recruiting systems that preserve context, match talent with precision and personalize every interaction.",
	},

	// 5. Finance & Accounting
	{
		slug: "accounting",
		name: "Finance & Accounting",
		templateVersion: "v2",
		heroTitle: "AI infrastructure for accounting workflows.",
		heroDescription:
			"Build finance copilots that retain client context, retrieve relevant records and keep ongoing accounting workflows grounded in their history.",
		heroLede:
			"Build finance copilots that retain client context, retrieve relevant records and keep ongoing accounting workflows grounded in their history.",
		facts: [
			{ label: "Base", value: "Context scoped to each client" },
			{ label: "Memory", value: "History across reporting periods" },
			{ label: "Extract", value: "Records become reusable context" },
			{ label: "Deep search", value: "Documents searchable by meaning" },
		],
		sessionHeading: "Every reconciliation cycle adds grounded financial context.",
		sessionSub:
			"PiyAPI preserves accounting policies, vendor classification rules, and past audit trails across consecutive fiscal periods.",
		sessionSteps: [
			{
				title: "Client onboarding",
				note: "Tax residency, chart of accounts, and entity structure are established.",
				adds: [
					{ k: "Entity", v: "Delaware C-Corp, Multi-state" },
					{ k: "Fiscal year", v: "Calendar year (Dec 31 close)" },
				],
				reply: "Established chart of accounts with multi-state nexus tracking.",
			},
			{
				title: "Revenue policy",
				note: "Revenue recognition rules and contract schedules are codified.",
				adds: [
					{ k: "Policy", v: "ASC 606 ratable recognition" },
					{ k: "Billing cycle", v: "Annual upfront SaaS contracts" },
				],
				reply: "Configured ratable deferred revenue amortization across 12-month periods.",
			},
			{
				title: "Vendor exceptions",
				note: "Recurring classification exceptions are memorized.",
				adds: [{ k: "Exception", v: "AWS infrastructure classified under COGS" }],
				reply: "Automated routing of cloud infrastructure invoices to direct COGS.",
			},
			{
				title: "Month-end close",
				note: "Reconciled ledger accounts and variance summaries are saved.",
				adds: [
					{ k: "Q3 close", v: "All bank reconciliations completed" },
					{ k: "Variance", v: "Sales commissions within 2% of budget" },
				],
				reply: "Q3 financial packet generated and verified against bank statements.",
			},
			{
				title: "Audit preparation",
				note: "Audit evidence and sample schedules are compiled effortlessly.",
				adds: [{ k: "Audit status", v: "External review ready with full documentation" }],
				reply: "Compiled full sample testing pack with supporting invoices and signed agreements.",
			},
		],
		whyHeading: "Financial precision demands institutional memory.",
		whyParagraphs: [
			"Accounting teams lose days of productivity every audit season tracking down why a specific transaction was booked a certain way twelve months ago. When context is lost, compliance risks escalate.",
			"PiyAPI gives CPAs and enterprise finance teams persistent context that bridges ERPs, spreadsheets, and invoices into an immutable, searchable memory layer.",
		],
		blocksHeading: "Four building blocks, one memory layer.",
		blocks: [
			{
				title: "Finance & close copilots",
				text: "Retain client-specific accounting treatments across recurring month-end and year-end closes.",
				icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
			},
			{
				title: "Ledger & invoice search",
				text: "Instantly retrieve supporting invoices, receipts and vendor agreements by natural inquiry.",
				icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
			},
			{
				title: "Audit trail synthesis",
				text: "Maintain a complete timeline of accounting decisions and evidence across fiscal years.",
				icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
			},
			{
				title: "Tax & compliance grounding",
				text: "Verify treatment against current tax codes, transfer pricing rules and regulatory frameworks.",
				icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
			},
		],
		infraHeading: "The infrastructure underneath financial AI.",
		infraList: [
			{
				title: "Accounting context that spans reporting periods",
				description:
					"Prior quarter decisions, tax elections and depreciation schedules remain accessible to the copilot.",
			},
			{
				title: "Strict client and entity isolation",
				description:
					"Each client's financial statements, bank accounts and tax documents are isolated by dedicated encryption keys.",
			},
			{
				title: "Ledgers and receipts you can search by meaning",
				description:
					"Find the $4,200 wire transfer from Munich by asking 'Show the German consulting invoice from May'.",
			},
			{
				title: "Continuous audit grounding",
				description:
					"Every AI-generated journal entry links directly to its source document for immediate audit verification.",
			},
		],
		architecture: {
			inputs: [
				{ title: "Entity", subtitle: "Chart of accounts & policies" },
				{ title: "Ledger", subtitle: "Bank feeds & transactions" },
			],
			core: {
				eyebrow: "Context engine",
				title: "Persistent Memory",
				ops: "Store, retrieve, recall",
			},
			engine: [
				{ title: "Extract", text: "Parse receipts, invoices and statements into structured signals" },
				{ title: "Search", text: "Retrieve historical transactions by vendor or intent" },
				{ title: "Knowledge", text: "ASC/IFRS rules and company accounting policies" },
				{ title: "Retrieval system", text: "Grounded ledger retrieval and audit trail verification" },
			],
			loop: ["Ingestion", "Reconciliation", "Variance check", "Reporting"],
		},
		faqHeading: "Frequently asked about financial memory.",
		faqs: [
			{
				question: "How does PiyAPI ensure financial data confidentiality?",
				answer:
					"Financial memory is encrypted with tenant-specific keys, maintaining complete data isolation compliant with SOC2 and financial security standards.",
			},
			{
				question: "Can PiyAPI search PDF invoices and scanned receipts?",
				answer:
					"Yes. OCR and document parsers extract text, line items, and totals into searchable embeddings.",
			},
			{
				question: "Does memory help with recurring month-end reconciliations?",
				answer:
					"Yes. When a unique vendor treatment is categorized once, PiyAPI recalls the reasoning in future close periods.",
			},
			{
				question: "Can external auditors use the retrieval system?",
				answer:
					"Yes. Auditor read-only tokens can be granted to inspect the paper trail and source evidence for specific fiscal accounts.",
			},
			{
				question: "Does PiyAPI integrate with QuickBooks, NetSuite, and Xero?",
				answer:
					"Yes. Standard webhooks and connectors sync transaction data and charts of accounts automatically.",
			},
			{
				question: "Is PiyAPI a full ERP replacement?",
				answer:
					"No. PiyAPI provides the memory and semantic intelligence layer that sits alongside your existing accounting ERP.",
			},
		],
		finalCtaTitle: "Give your finance team an audit-ready memory layer.",
		finalCtaDescription:
			"Build accounting copilots that retain context across periods, verify evidence and streamline every close.",
	},

	// 6. Consulting & Enterprise
	{
		slug: "consulting",
		name: "Consulting & Enterprise",
		templateVersion: "v2",
		heroTitle: "AI infrastructure for consulting teams.",
		heroDescription:
			"Build consulting copilots that carry project context forward, retrieve institutional knowledge and make every client interaction start informed.",
		heroLede:
			"Build consulting copilots that carry project context forward, retrieve institutional knowledge and make every client interaction start informed.",
		facts: [
			{ label: "Base", value: "Context scoped to each engagement" },
			{ label: "Memory", value: "Decisions across project stages" },
			{ label: "Extract", value: "Research becomes reusable knowledge" },
			{ label: "Deep search", value: "Expertise searchable by meaning" },
		],
		sessionHeading: "Every workstream adds durable project intelligence.",
		sessionSub:
			"PiyAPI captures stakeholder interviews, benchmark findings, and executive decisions so project teams never lose momentum.",
		sessionSteps: [
			{
				title: "Engagement kickoff",
				note: "Client goals, scope boundaries, and core stakeholders are logged.",
				adds: [
					{ k: "Client", v: "Global Retail Logistics" },
					{ k: "Objective", v: "Supply chain decarbonization" },
				],
				reply: "Kickoff brief created: Targeting 30% emissions reduction across tier-1 suppliers.",
			},
			{
				title: "C-Suite constraints",
				note: "Executive appetite, financial hurdles, and timelines are memorized.",
				adds: [
					{ k: "CFO hurdle", v: "Payback under 3.5 years" },
					{ k: "COO mandate", v: "Zero operational downtime" },
				],
				reply: "All decarbonization initiatives filtered for sub-3.5 year ROI with no downtime risk.",
			},
			{
				title: "Industry benchmarks",
				note: "Firm knowledge base and peer data are retrieved.",
				adds: [{ k: "Benchmark", v: "Fleet electrification achieves 2.8yr payback" }],
				reply: "Retrieved past firm case studies showing fleet electrification achieves 2.8yr payback.",
			},
			{
				title: "Workstream milestones",
				note: "Diagnostic results and workstream progress are updated.",
				adds: [
					{ k: "Diagnostic", v: "14 priority distribution hubs identified" },
					{ k: "Phase", v: "Pilot roadmap approved by steering committee" },
				],
				reply: "Diagnostic complete: Prioritized 14 distribution hubs for the Q1 pilot rollout.",
			},
			{
				title: "Executive presentation",
				note: "Final steering committee presentation synthesizes all prior phases.",
				adds: [{ k: "Deliverable", v: "Board deck with financial modeling" }],
				reply: "Board-ready deck assembled, reconciling CFO payback requirements with tier-1 supplier roadmaps.",
			},
		],
		whyHeading: "Strategic advisory requires institutional memory.",
		whyParagraphs: [
			"Consulting firms spend hundreds of hours recreating research that a different team in the same firm completed six months ago in another office. Knowledge is lost when partners and analysts rotate engagements.",
			"PiyAPI transforms fragmented slide decks, interview transcripts, and benchmark databases into an active, collaborative knowledge engine that keeps every engagement grounded.",
		],
		blocksHeading: "Four building blocks, one memory layer.",
		blocks: [
			{
				title: "Engagement copilots",
				text: "Keep objectives, executive decisions and workstream progress at every consultant's fingertips.",
				icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
			},
			{
				title: "Firm-wide knowledge search",
				text: "Find relevant prior work, models and deliverables across global practice areas in seconds.",
				icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
			},
			{
				title: "Interview synthesis",
				text: "Turn dozens of expert interview transcripts into verified insights and quantitative takeaways.",
				icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
			},
			{
				title: "Client continuity",
				text: "Carry context smoothly across consulting team rotations without losing rapport or momentum.",
				icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
			},
		],
		infraHeading: "The infrastructure underneath enterprise advisory.",
		infraList: [
			{
				title: "Engagement memory that builds over time",
				description:
					"Kickoff hypotheses, steering committee feedback and financial models stay connected in context.",
			},
			{
				title: "Strict client confidentiality barriers",
				description:
					"Client information barriers ensure proprietary data remains isolated by project code.",
			},
			{
				title: "Firm archives searchable by meaning",
				description:
					"Locate past benchmark studies and pricing frameworks using natural language queries.",
			},
			{
				title: "Evidence-backed recommendation grounding",
				description:
					"Every assertion in client deliverables links to verified interview quotes and verified data points.",
			},
		],
		architecture: {
			inputs: [
				{ title: "Engagement", subtitle: "Project scope & team" },
				{ title: "Client", subtitle: "Stakeholder context & data" },
			],
			core: {
				eyebrow: "Context engine",
				title: "Persistent Memory",
				ops: "Store, retrieve, recall",
			},
			engine: [
				{ title: "Extract", text: "Synthesize interview transcripts and slide decks" },
				{ title: "Search", text: "Retrieve past case studies and industry benchmarks" },
				{ title: "Knowledge", text: "Practice area methodologies and frameworks" },
				{ title: "Retrieval system", text: "Multi-tenant vector search with strict client firewalls" },
			],
			loop: ["Hypothesis", "Analysis", "Synthesis", "Steering readout"],
		},
		faqHeading: "Frequently asked about consulting memory.",
		faqs: [
			{
				question: "How are conflicting client confidentiality agreements handled?",
				answer:
					"PiyAPI supports strict ethical walls. Engagements are cryptographically isolated; confidential client data is never accessible across practice teams.",
			},
			{
				question: "Can PiyAPI ingest PowerPoint decks and financial models?",
				answer:
					"Yes. PiyAPI extracts slide content, speaker notes, Excel model schemas, and PDFs into structured knowledge embeddings.",
			},
			{
				question: "Does memory help during team turnover?",
				answer:
					"Yes. When a new consultant joins an ongoing project, the copilot briefs them on historical context, key decisions, and stakeholder personalities.",
			},
			{
				question: "Can we search expert interview transcripts?",
				answer:
					"Yes. Transcripts from expert network calls can be queried with questions like 'What did European logistics heads say about hydrogen fleets?'.",
			},
			{
				question: "How fast is knowledge retrieval across large firm archives?",
				answer:
					"Semantic search returns precise citations and passages across millions of documents in sub-150 milliseconds.",
			},
			{
				question: "Is PiyAPI hosted in enterprise private clouds?",
				answer:
					"PiyAPI offers VPC deployment and on-premise integrations with AWS, Azure, and Google Cloud for enterprise compliance.",
			},
		],
		finalCtaTitle: "Give your consulting practice an enduring intellectual edge.",
		finalCtaDescription:
			"Build advisory copilots that preserve engagement context, search global firm knowledge and impress clients every session.",
	},

	// 7. Legal & Compliance (ai-startups)
	{
		slug: "ai-startups",
		name: "Legal & Compliance",
		templateVersion: "v2",
		heroTitle: "AI infrastructure for legal & compliance.",
		heroDescription:
			"Build contract copilots, compliance monitoring and regulatory search on persistent context that keeps every matter, clause and disclosure organized.",
		heroLede:
			"Build contract copilots, compliance monitoring and regulatory search on persistent context that keeps every matter, clause and disclosure organized.",
		facts: [
			{ label: "Base", value: "Context scoped to each matter" },
			{ label: "Memory", value: "Clause history across revisions" },
			{ label: "Extract", value: "Precedents become searchable" },
			{ label: "Deep search", value: "Regulatory guidance by meaning" },
		],
		sessionHeading: "Every matter builds an auditable legal memory.",
		sessionSub:
			"PiyAPI tracks client negotiation postures, previous redlines, and regulatory precedents to keep counsel grounded in sound precedent.",
		sessionSteps: [
			{
				title: "Matter intake",
				note: "Matter type, governing law, and opposing counsel are logged.",
				adds: [
					{ k: "Matter", v: "Series B Preferred Stock Financing" },
					{ k: "Jurisdiction", v: "Delaware Corporate Law" },
				],
				reply: "Initiated matter workspace: NVCA standard documents with Delaware governing law.",
			},
			{
				title: "Client risk posture",
				note: "Non-negotiable terms and standard fallback positions are retained.",
				adds: [
					{ k: "Indemnity", v: "Capped at 1x investment value" },
					{ k: "Board seat", v: "1 investor seat, 1 observer" },
				],
				reply: "Client negotiation playbook loaded: Indemnity capped at 1x; strictly 1 observer.",
			},
			{
				title: "Redline analysis",
				note: "Incoming revisions from opposing counsel are flagged against history.",
				adds: [{ k: "Deviation", v: "Opposing counsel introduced uncapped IP indemnity" }],
				reply: "Alert: Opposing counsel marked up uncapped IP indemnity, directly violating client playbook.",
			},
			{
				title: "Precedent retrieval",
				note: "Firm past deals and approved fallback clauses are cited.",
				adds: [{ k: "Precedent", v: "Fall back to negotiated compromise from Project Summit" }],
				reply: "Retrieved fallback language from Project Summit: 2x super-cap limited solely to gross negligence.",
			},
			{
				title: "Closing debrief",
				note: "Executed agreements and final cap table models are archived.",
				adds: [{ k: "Status", v: "Executed closing set verified and indexed" }],
				reply: "Closing binder indexed: All signatures, disclosure schedules, and board consents locked.",
			},
		],
		whyHeading: "Precision legal work demands matter memory.",
		whyParagraphs: [
			"Attorneys spend countless non-billable hours hunting through older files to remember how a specific clause was negotiated or why a specific indemnification carve-out was accepted.",
			"PiyAPI provides a reliable memory infrastructure where every matter retains its history, redlines, and client preferences, while firm-wide precedents remain searchable at lightning speed.",
		],
		blocksHeading: "Four building blocks, one memory layer.",
		blocks: [
			{
				title: "Contract review copilots",
				text: "Analyze drafts against firm negotiation playbooks and flag dangerous clause deviations.",
				icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
			},
			{
				title: "Precedent & clause search",
				text: "Locate approved language across thousands of executed agreements by conceptual intent.",
				icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
			},
			{
				title: "Regulatory compliance radar",
				text: "Cross-reference contracts against shifting SEC, GDPR, and HIPAA compliance mandates.",
				icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
			},
			{
				title: "Matter continuity",
				text: "Keep associates, partners and in-house counsel aligned across months of complex negotiations.",
				icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
			},
		],
		infraHeading: "The infrastructure underneath legal intelligence.",
		infraList: [
			{
				title: "Matter memory that preserves redline reasoning",
				description:
					"Why a concession was granted remains documented alongside the redline draft for future reference.",
			},
			{
				title: "Strict attorney-client privilege isolation",
				description:
					"Client matters are isolated using multi-tenant encryption boundaries ensuring privilege is never compromised.",
			},
			{
				title: "Contracts you can query by legal meaning",
				description:
					"Ask 'Which supplier contracts allow termination for convenience without penalty?' and get cited clauses instantly.",
			},
			{
				title: "Strict regulatory grounding",
				description:
					"Copilots cite statutory authorities, case law, and internal compliance guidelines with zero hallucination.",
			},
		],
		architecture: {
			inputs: [
				{ title: "Matter", subtitle: "Active draft & correspondence" },
				{ title: "Client", subtitle: "Playbook & risk appetite" },
			],
			core: {
				eyebrow: "Context engine",
				title: "Persistent Memory",
				ops: "Store, retrieve, recall",
			},
			engine: [
				{ title: "Extract", text: "Parse legal agreements and redlines into structured clause graphs" },
				{ title: "Search", text: "Retrieve precedents and model language by legal concept" },
				{ title: "Knowledge", text: "Statutes, regulations and institutional playbooks" },
				{ title: "Retrieval system", text: "Deterministic clause comparison and vector search" },
			],
			loop: ["Drafting", "Redlining", "Risk check", "Execution"],
		},
		faqHeading: "Frequently asked about legal memory.",
		faqs: [
			{
				question: "How is attorney-client privilege protected?",
				answer:
					"Data is encrypted with matter-specific keys. Zero client data is ever used to train public foundation models.",
			},
			{
				question: "Can PiyAPI detect subtle wording changes in clauses?",
				answer:
					"Yes. PiyAPI combines semantic vector comparison with token-level diffing to highlight subtle shifts in legal obligations.",
			},
			{
				question: "Does the system link directly to original source contracts?",
				answer:
					"Every insight and recommendation includes clickable citations pointing to the exact section and paragraph in the source document.",
			},
			{
				question: "Can we index our firm's entire historical deal database?",
				answer:
					"Yes. Past executed agreements can be ingested, tagged, and indexed for semantic search across practice groups.",
			},
			{
				question: "How does PiyAPI avoid model hallucinations in legal advice?",
				answer:
					"The copilot operates strictly in retrieval-grounded mode, restricting its answers to verified clauses and authoritative legal sources.",
			},
			{
				question: "Does PiyAPI support custom legal playbooks?",
				answer:
					"Yes. You can upload custom risk thresholds, approved fallback language, and negotiation guidelines for any client.",
			},
		],
		finalCtaTitle: "Give your legal practice an indelible memory for every matter.",
		finalCtaDescription:
			"Build legal copilots that remember client postures, search precedents with precision and safeguard privilege.",
	},

	// 8. SaaS & Dev Tools
	{
		slug: "dev-tools",
		name: "SaaS & Dev Tools",
		templateVersion: "v2",
		heroTitle: "AI infrastructure for developer tools.",
		heroDescription:
			"Build coding copilots that keep project decisions, conventions and task context available across repositories and sessions.",
		heroLede:
			"Build coding copilots that keep project decisions, conventions and task context available across repositories and sessions.",
		facts: [
			{ label: "Base", value: "Context scoped to each repository" },
			{ label: "Memory", value: "Decisions across coding sessions" },
			{ label: "Extract", value: "Codebase knowledge made reusable" },
			{ label: "Deep search", value: "Find implementation context" },
		],
		sessionHeading: "Every commit adds architectural codebase memory.",
		sessionSub:
			"PiyAPI remembers repository patterns, schema migrations, and past PR discussions so developer copilots write production-ready code.",
		sessionSteps: [
			{
				title: "Repository initialization",
				note: "Frameworks, package dependencies, and directory conventions are indexed.",
				adds: [
					{ k: "Stack", v: "Next.js 14, Tailwind, Prisma ORM" },
					{ k: "Runtime", v: "Node.js 20 on Cloudflare Workers" },
				],
				reply: "Repository indexed: Next.js 14 App Router with edge runtime constraints.",
			},
			{
				title: "Team conventions",
				note: "Architectural rules, linting standards, and naming patterns are captured.",
				adds: [
					{ k: "Pattern", v: "Server Actions with Zod validation" },
					{ k: "Auth", v: "Session cookie via Iron Session" },
				],
				reply: "Applied team rules: Enforcing Server Actions with Zod schemas for all mutations.",
			},
			{
				title: "Known technical debt",
				note: "Edge cases, past bugfixes, and performance caveats are retained.",
				adds: [{ k: "Caveat", v: "Postgres connection pooling required on edge functions" }],
				reply: "Configured Prisma Accelerate pooler to prevent edge connection exhaustion.",
			},
			{
				title: "PR and commit history",
				note: "Merged features and recent schema changes build timeline context.",
				adds: [
					{ k: "Merged PR #142", v: "Added Stripe webhook idempotent processing" },
					{ k: "Migration", v: "Added customer_subscriptions table" },
				],
				reply: "PR #142 merged: Utilizing customer_subscriptions table for billing status check.",
			},
			{
				title: "Context-aware code generation",
				note: "New code is generated respecting all historical conventions.",
				adds: [{ k: "Task", v: "Implement invoice PDF download endpoint" }],
				reply: "Generated invoice download action using existing Iron Session auth and Zod schemas.",
			},
		],
		whyHeading: "Production software engineering requires memory.",
		whyParagraphs: [
			"Standard LLM assistants produce generic code that ignores your team's architectural decisions, creates subtle security bugs, and forces developers to spend hours rewriting boilerplate.",
			"PiyAPI gives developer tools persistent repository context, linking git history, schema migrations, and team coding standards into an autonomous memory layer.",
		],
		blocksHeading: "Four building blocks, one memory layer.",
		blocks: [
			{
				title: "Autonomous coding agents",
				text: "Carry task goals, decisions and architectural patterns between development sessions.",
				icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
			},
			{
				title: "Repository & AST search",
				text: "Retrieve relevant helper functions and type definitions from million-line codebases.",
				icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
			},
			{
				title: "Team convention enforcement",
				text: "Keep project-specific coding standards and API design patterns available to every copilot.",
				icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
			},
			{
				title: "Multi-session task continuity",
				text: "Preserve refactoring progress across IDE sessions, branch switches and developer handoffs.",
				icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
			},
		],
		infraHeading: "The infrastructure underneath developer copilots.",
		infraList: [
			{
				title: "Codebase context that persists across branches",
				description:
					"Refactoring goals, open issues and past code review feedback stay synchronized in memory.",
			},
			{
				title: "Repository and developer isolation",
				description:
					"Private code repositories and API credentials remain isolated behind tenant-level encryption.",
			},
			{
				title: "AST and symbols searchable by intent",
				description:
					"Find how authentication middleware is applied without grepping through hundreds of files.",
			},
			{
				title: "Framework documentation grounding",
				description:
					"Copilots generate code against the exact library versions pinned in your package manifest.",
			},
		],
		architecture: {
			inputs: [
				{ title: "Developer", subtitle: "Active task & IDE context" },
				{ title: "Codebase", subtitle: "AST, symbols & git history" },
			],
			core: {
				eyebrow: "Context engine",
				title: "Persistent Memory",
				ops: "Store, retrieve, recall",
			},
			engine: [
				{ title: "Extract", text: "Parse symbols, imports, and conventions into an AST knowledge graph" },
				{ title: "Search", text: "Semantic and exact symbol retrieval across repositories" },
				{ title: "Knowledge", text: "Library documentation, schemas, and PR discussions" },
				{ title: "Retrieval system", text: "Hybrid BM25 and vector retrieval for code snippets" },
			],
			loop: ["Prompt", "Code retrieval", "Lint verification", "Commit"],
		},
		faqHeading: "Frequently asked about developer tool memory.",
		faqs: [
			{
				question: "How does PiyAPI index massive code repositories?",
				answer:
					"PiyAPI parses the codebase into abstract syntax trees (ASTs), indexing symbols, functions, and file relationships for hybrid semantic search.",
			},
			{
				question: "Is our proprietary code used to train AI models?",
				answer:
					"Never. Your code and embeddings are strictly isolated and never shared or used to train any third-party models.",
			},
			{
				question: "Does the copilot understand private internal packages?",
				answer:
					"Yes. Private package repositories and internal APIs are ingested into the knowledge base alongside application code.",
			},
			{
				question: "Can memory survive branch switches?",
				answer:
					"Yes. Context is scoped to git commits and branches, allowing developers to switch tasks without corrupting assistant state.",
			},
			{
				question: "Does PiyAPI work inside IDE extensions?",
				answer:
					"Yes. PiyAPI provides lightweight SDKs and REST APIs designed for VS Code, JetBrains, and CLI tool integrations.",
			},
			{
				question: "How does it handle breaking API changes across versions?",
				answer:
					"PiyAPI checks your package.json / go.mod dependencies and grounds responses in documentation for that exact version.",
			},
		],
		finalCtaTitle: "Give your developer tools a codebase memory that never fades.",
		finalCtaDescription:
			"Build coding copilots that remember architectural conventions, search symbols with precision and boost engineering velocity.",
	},

	// 9. Healthcare & Medical
	{
		slug: "healthcare",
		name: "Healthcare & Medical",
		templateVersion: "v2",
		heroTitle: "AI infrastructure for healthcare workflows.",
		heroDescription:
			"Build healthcare AI systems that can retrieve relevant workflow context and preserve continuity while respecting scoped information boundaries.",
		heroLede:
			"Build healthcare AI systems that can retrieve relevant workflow context and preserve continuity while respecting scoped information boundaries.",
		facts: [
			{ label: "Base", value: "Context scoped to each workflow" },
			{ label: "Memory", value: "Continuity across interactions" },
			{ label: "Extract", value: "Records become searchable context" },
			{ label: "Deep search", value: "Relevant information by meaning" },
		],
		sessionHeading: "Every patient consultation deepens clinical continuity.",
		sessionSub:
			"PiyAPI captures chronic conditions, diagnostic timelines, and patient treatment responses to help clinicians make informed decisions.",
		sessionSteps: [
			{
				title: "Patient visit intake",
				note: "Presenting symptoms, vitals, and onset duration are logged.",
				adds: [
					{ k: "Chief complaint", v: "Chronic lower back pain" },
					{ k: "Duration", v: "6 months, worsening with sitting" },
				],
				reply: "Documented chronic lower back pain symptoms. Checking historical records.",
			},
			{
				title: "Allergies & history",
				note: "Known drug reactions and medical history are verified.",
				adds: [
					{ k: "Allergy", v: "Severe Penicillin allergy" },
					{ k: "History", v: "Prior physical therapy completed in 2023" },
				],
				reply: "Flagged Penicillin allergy. Retrieved 2023 physical therapy treatment discharge notes.",
			},
			{
				title: "Clinical contraindications",
				note: "Comorbidities and medication warnings are flagged.",
				adds: [{ k: "Contraindication", v: "NSAID intolerance due to gastric ulcer" }],
				reply: "Warning: Patient has history of gastric ulcer; avoid standard NSAID prescriptions.",
			},
			{
				title: "Diagnostic findings",
				note: "Imaging reports and lab panels are synthesized into context.",
				adds: [{ k: "MRI Lumbar", v: "L4-L5 disc protrusion without spinal stenosis" }],
				reply: "Lumbar MRI reviewed: L4-L5 disc protrusion noted without neurological impingement.",
			},
			{
				title: "Care plan synthesis",
				note: "Personalized care pathway generated respecting all clinical history.",
				adds: [{ k: "Plan", v: "Non-NSAID analgesic therapy & targeted physical therapy" }],
				reply: "Generated personalized treatment plan: Core-strengthening physical therapy and non-NSAID pain protocol.",
			},
		],
		whyHeading: "Clinical care demands rigorous context continuity.",
		whyParagraphs: [
			"Medical mistakes and provider burnout frequently stem from fragmented EHR records where critical allergies, previous therapies, and patient histories are buried across disparate tabs.",
			"PiyAPI provides a HIPAA-compliant memory layer that synthesizes diagnostic reports, clinical notes, and patient timelines into an intuitive context stream for healthcare providers.",
		],
		blocksHeading: "Four building blocks, one memory layer.",
		blocks: [
			{
				title: "Clinical care navigation",
				text: "Keep patient histories, preferences and prior treatment responses readily available.",
				icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
			},
			{
				title: "Medical guideline search",
				text: "Retrieve relevant clinical protocols from approved institutional guidelines by intent.",
				icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
			},
			{
				title: "Clinic operations copilots",
				text: "Streamline referral management, triage prioritization and pre-authorization workflows.",
				icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
			},
			{
				title: "Compliant scoped memory",
				text: "Separate patient medical data strictly from shared hospital guidelines and public knowledge.",
				icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
			},
		],
		infraHeading: "The infrastructure underneath healthcare systems.",
		infraList: [
			{
				title: "Clinical context that spans encounters",
				description:
					"Previous consultations, lab trends and medication adjustments carry seamlessly into follow-up visits.",
			},
			{
				title: "Strict patient data isolation and HIPAA compliance",
				description:
					"Each patient's PHI is encrypted with unique keys meeting stringent healthcare privacy standards.",
			},
			{
				title: "Medical literature and protocols searchable by meaning",
				description:
					"Clinicians query complex clinical trial data and hospital formularies with natural clinical terms.",
			},
			{
				title: "Diagnostic grounding with zero hallucination",
				description:
					"All suggested insights cite specific lab results, clinician notes and medical guideline passages.",
			},
		],
		architecture: {
			inputs: [
				{ title: "Patient", subtitle: "EHR timeline & allergy record" },
				{ title: "Encounter", subtitle: "Active consultation & notes" },
			],
			core: {
				eyebrow: "Context engine",
				title: "Persistent Memory",
				ops: "Store, retrieve, recall",
			},
			engine: [
				{ title: "Extract", text: "Parse clinical notes, lab reports, and vitals into patient signals" },
				{ title: "Search", text: "Semantic retrieval of institutional treatment guidelines" },
				{ title: "Knowledge", text: "Approved medical protocols and drug interaction databases" },
				{ title: "Retrieval system", text: "Deterministic clinical safety checks and vector search" },
			],
			loop: ["Intake", "Vitals check", "Diagnosis", "Care plan"],
		},
		faqHeading: "Frequently asked about healthcare memory.",
		faqs: [
			{
				question: "Is PiyAPI HIPAA-compliant?",
				answer:
					"Yes. PiyAPI supports HIPAA-compliant deployments with Business Associate Agreements (BAAs), end-to-end PHI encryption, and audit logging.",
			},
			{
				question: "How does PiyAPI integrate with existing EHR systems?",
				answer:
					"PiyAPI connects via HL7 FHIR APIs and standard healthcare integration engines to sync encounter notes and patient records.",
			},
			{
				question: "Can the copilot flag drug contraindications?",
				answer:
					"Yes. By preserving allergy records and active medications in patient memory, the system alerts clinicians to potential drug-drug or drug-disease interactions.",
			},
			{
				question: "How is patient data isolated across clinics?",
				answer:
					"Multi-tenant cryptographic boundaries ensure each healthcare organization and patient record remains strictly segregated.",
			},
			{
				question: "Can clinicians search scanned lab PDFs?",
				answer:
					"Yes. Medical-grade OCR parses laboratory panels, radiology summaries, and specialist letters into searchable context.",
			},
			{
				question: "Does the system replace clinical judgment?",
				answer:
					"No. PiyAPI serves as an assistive memory layer, providing verified context to support physicians and clinical teams.",
			},
		],
		finalCtaTitle: "Give your healthcare platform a memory that protects patient care.",
		finalCtaDescription:
			"Build clinical copilots that preserve patient context, retrieve medical guidelines and support clinical excellence.",
	},

	// 10. Customer Support (fintech)
	{
		slug: "fintech",
		name: "Customer Support",
		templateVersion: "v2",
		heroTitle: "AI infrastructure for customer support.",
		heroDescription:
			"Build support copilots that remember user history, retrieve knowledge bases and resolve complex inquiries without repeating questions.",
		heroLede:
			"Build support copilots that remember user history, retrieve knowledge bases and resolve complex inquiries without repeating questions.",
		facts: [
			{ label: "Base", value: "Context scoped to each customer" },
			{ label: "Memory", value: "Continuity across support tickets" },
			{ label: "Extract", value: "Knowledge base made searchable" },
			{ label: "Deep search", value: "Instant intent resolution" },
		],
		sessionHeading: "Every ticket builds permanent customer understanding.",
		sessionSub:
			"PiyAPI connects previous chat tickets, account tiers, and open technical issues so customers never have to explain themselves twice.",
		sessionSteps: [
			{
				title: "Ticket creation",
				note: "Customer inquiry received alongside subscription plan metadata.",
				adds: [
					{ k: "User tier", v: "Enterprise Annual Plan" },
					{ k: "Issue", v: "SAML SSO login loop on Okta" },
				],
				reply: "Acknowledged Enterprise customer ticket. Pulling SSO configuration logs.",
			},
			{
				title: "Historical ticket context",
				note: "Past resolutions and open bug reports are surfaced.",
				adds: [
					{ k: "Previous ticket", v: "Cert renewal completed last Tuesday" },
					{ k: "Admin", v: "DevOps Lead Alex Chen" },
				],
				reply: "Noticed certificate renewal last Tuesday. Checking IdP metadata timestamp mismatch.",
			},
			{
				title: "Root cause diagnosis",
				note: "Internal runbooks and error logs are matched.",
				adds: [{ k: "Root cause", v: "SHA-256 certificate thumbprint mismatch in Okta app" }],
				reply: "Diagnosed issue: Okta certificate thumbprint needs update following Tuesday's cert renewal.",
			},
			{
				title: "Step-by-step resolution",
				note: "Clear, customized remediation steps are generated for the customer.",
				adds: [{ k: "Remediation", v: "Sent 1-click metadata re-sync link to Alex" }],
				reply: "Sent Alex Chen the direct 1-click Okta metadata re-sync link.",
			},
			{
				title: "Follow-up verification",
				note: "Resolution confirmed and satisfaction metric recorded in customer history.",
				adds: [{ k: "Status", v: "Resolved in 4 minutes, CSAT 5/5" }],
				reply: "SSO confirmed operational. Updated customer memory: Okta SSO verified.",
			},
		],
		whyHeading: "Effortless customer service requires continuous memory.",
		whyParagraphs: [
			"Nothing frustrates a high-value customer more than being transferred to a new agent or starting a new chat session only to be asked the exact same three clarifying questions.",
			"PiyAPI provides a persistent customer memory layer that equips AI support agents with complete knowledge of past tickets, account tier nuances, and technical setup.",
		],
		blocksHeading: "Four building blocks, one memory layer.",
		blocks: [
			{
				title: "Frontline support copilots",
				text: "Resolve tickets in real time with complete knowledge of user history and account tier.",
				icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
			},
			{
				title: "Knowledge base & SOP search",
				text: "Retrieve exact policy guidelines and technical troubleshooting steps by semantic meaning.",
				icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
			},
			{
				title: "Sentiment & issue continuity",
				text: "Track customer sentiment over time and prioritize high-value accounts experiencing friction.",
				icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
			},
			{
				title: "Automated escalation routing",
				text: "Pass full conversational context and root cause diagnostic summaries to tier-2 engineers.",
				icon: "M13 10V3L4 14h7v7l9-11h-7z",
			},
		],
		infraHeading: "The infrastructure underneath support operations.",
		infraList: [
			{
				title: "Customer context that spans channels",
				description:
					"Conversations begun in chat, continued over email and concluded by phone share one memory.",
			},
			{
				title: "Account-level tenant isolation",
				description:
					"Company tickets and user account secrets remain isolated within designated enterprise boundaries.",
			},
			{
				title: "Documentation that answers back in seconds",
				description:
					"Search thousands of Zendesk, Notion and Jira articles with conversational queries.",
			},
			{
				title: "Grounding in verified company policies",
				description:
					"Copilots deliver refund, cancellation and SLA responses strictly adhering to published guidelines.",
			},
		],
		architecture: {
			inputs: [
				{ title: "Customer", subtitle: "Account history & past tickets" },
				{ title: "Inquiry", subtitle: "Active message & channel context" },
			],
			core: {
				eyebrow: "Context engine",
				title: "Persistent Memory",
				ops: "Store, retrieve, recall",
			},
			engine: [
				{ title: "Extract", text: "Parse tickets into customer signals and sentiment scores" },
				{ title: "Search", text: "Retrieve internal SOPs and historical ticket resolutions" },
				{ title: "Knowledge", text: "Help center articles, refund policies, and SLA commitments" },
				{ title: "Retrieval system", text: "Real-time semantic search with account-level filtering" },
			],
			loop: ["Ticket", "Diagnostic", "Resolution", "CSAT feedback"],
		},
		faqHeading: "Frequently asked about support memory.",
		faqs: [
			{
				question: "How does memory prevent customers from repeating themselves?",
				answer:
					"PiyAPI records previous ticket summaries and open issues into the customer's persistent profile, briefing the copilot before it types its first word.",
			},
			{
				question: "Can PiyAPI connect to Zendesk, Intercom, and Salesforce Service Cloud?",
				answer:
					"Yes. Pre-built webhooks and REST integrations stream tickets and customer profiles directly into the memory layer.",
			},
			{
				question: "Does the system maintain multi-channel continuity?",
				answer:
					"Yes. If a user starts a ticket via live chat and later follows up via email, both interactions link to the same customer memory.",
			},
			{
				question: "How are internal knowledge base articles kept up to date?",
				answer:
					"PiyAPI monitors your knowledge sources (Notion, Google Docs, Confluence) and re-indexes modified articles automatically.",
			},
			{
				question: "Can the copilot hand off tickets to human agents?",
				answer:
					"Yes. When a human takes over, PiyAPI generates a concise 3-bullet summary of the issue, eliminating the need to read raw logs.",
			},
			{
				question: "How does PiyAPI handle sensitive customer data like PII?",
				answer:
					"Automatic PII redaction strips credit card numbers, passwords, and sensitive tokens before vectors are stored.",
			},
		],
		finalCtaTitle: "Give your support team a memory that turns every ticket into loyalty.",
		finalCtaDescription:
			"Build customer service copilots that remember context, retrieve answers instantly and delight users.",
	},
]

export const getIndustryPage = (slug: string): IndustryPageData | undefined =>
	industryPages.find((industry) => industry.slug === slug)
