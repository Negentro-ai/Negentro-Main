import React, { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "es" | "fr" | "de" | "ru"

export interface TranslationDictionary {
	nav: {
		overview: string
		research: string
		pricing: string
		initiatives: string
		resources: string
		company: string
		tryPiyApi: string
	}
	hero: {
		headlinePre: string
		headlineMemory: string
		subline: string
		emailPlaceholder: string
		joinWaitlist: string
		joining: string
		successMsg: string
		duplicateMsg: string
		invalidEmailMsg: string
	}
	partner: {
		supportedBy: string
	}
	problem: {
		tag: string
		headlinePre: string
		headlineMemory: string
		subline: string
		tab1Label: string
		tab1CardTitle: string
		tab1CardDesc: string
		tab2Label: string
		tab2CardTitle: string
		tab2CardDesc: string
		tab3Label: string
		tab3CardTitle: string
		tab3CardDesc: string
	}
	differentApproach: {
		tag: string
		titlePre: string
		titleHighlight: string
		sublinePre: string
		sublineHighlight: string
		sublinePost: string
		feat1Title: string
		feat1Desc: string
		feat2Title: string
		feat2Desc: string
		feat3Title: string
		feat3Desc: string
		feat4Title: string
		feat4Desc: string
		feat5Title: string
		feat5Desc: string
		feat6Title: string
		feat6Desc: string
		quotePre: string
		quoteHighlight: string
		quotePost: string
		sotaHeading: string
		sotaLine1: string
		sotaLine2: string
		sotaLine3: string
		metric1Value: string
		metric1Sublabel: string
		metric1Line1: string
		metric1Line2: string
		metric2Value: string
		metric2Sublabel: string
		metric2Line1: string
		metric2Line2: string
		metric3Value: string
		metric3Sublabel: string
		metric3Line1: string
		metric3Line2: string
		tableHeaderContext: string
		tableHeaderWrapper: string
		tableHeaderNative: string
		tableRow1: string
		tableRow2: string
		tableRow3: string
		tableRow4: string
	}
	workflows: {
		headlinePre: string
		headlineHighlight: string
		sublineLine1: string
		sublineLine2: string
		card1Id: string
		card1Title: string
		card1Desc: string
		card2Id: string
		card2Title: string
		card2Desc: string
		card3Id: string
		card3Title: string
		card3Desc: string
		card4Id: string
		card4Title: string
		card4Desc: string
		card5Id: string
		card5Title: string
		card5Desc: string
		card6Id: string
		card6Title: string
		card6Desc: string
	}
	code: {
		headline: string
		headlinePre: string
		headlineHighlight: string
		headlinePost: string
		subline: string
		tag01: string
		sdkTitle: string
		sdkSubtitle: string
		tag02: string
		agentsTitle: string
		agentsSubtitle: string
		tag03: string
		connectorsTitle: string
		connectorsSubtitle: string
		tag04: string
		mcpTitle: string
		mcpSubtitle: string
	}
	security: {
		tag: string
		headlineData: string
		headlineMemory: string
		headlineControl: string
		subline1: string
		subline2: string
		card1Title: string
		card1Desc: string
		card2Title: string
		card2Desc: string
		card3Title: string
		card3Desc: string
		card4Title: string
		card4Desc: string
		card5Title: string
		card5Desc: string
	}
	research: {
		tag: string
		headline: string
		paper1Overlay: string
		paper1Title: string
		paper1Status: string
		paper1Category: string
		paper2Overlay: string
		paper2Title: string
		paper2Status: string
		paper2Category: string
		paper3Overlay: string
		paper3Title: string
		paper3Status: string
		paper3Category: string
	}
	cta: {
		headline: string
		subline: string
		talkButton: string
		marqueeItems: string[]
	}
	calendly: {
		title: string
		loading: string
		close: string
	}
	footer: {
		infrastructure: string
		moreAboutUs: string
		devTitle: string
		devDocs: string
		devApi: string
		devMcp: string
		devCli: string
		devTrust: string
		devStatus: string
		prodTitle: string
		prodResearch: string
		prodBlog: string
		prodIntegrations: string
		prodReleaseNotes: string
		prodGithub: string
		compTitle: string
		compAbout: string
		compContact: string
		compCareers: string
		compStartup: string
		compInvestors: string
		compPricing: string
		usecasesTitle: string
		useSupport: string
		useHealth: string
		useEdu: string
		useSales: string
		useEcom: string
		soc2: string
		gdpr: string
		hipaa: string
		complianceTitle: string
		contactTitle: string
		contactEmail: string
		copyright: string
		rightsReserved: string
		languagesLabel: string
	}
	pricing: {
		tag: string
		heroHeadline: string
		heroSubline: string
		billingLabel: string
		billingMonthly: string
		billingYearly: string
		billingSave: string
		includedLabel: string
		contextCapacityLabel: string
		retrievalsLabel: string
		projectsLabel: string
		coverageHeadline: string
		coverageSubline: string
		stepsPrototype: string
		stepsProduction: string
		stepsScale: string
		stepsEnterprise: string
		compareHeadline: string
		compareSubline: string
		capabilityLabel: string
		recommendedLabel: string
		calculatorHeadline: string
		calculatorSubline: string
		mauLabel: string
		memoriesPerUserLabel: string
		retrievalRequestsLabel: string
		projectsCountLabel: string
		estimatedUsageLabel: string
		memoryOpsUnit: string
		suggestedPlanLabel: string
		estimatedPriceLabel: string
		calculatorCta: string
		calculatorDisclaimer: string
		selfHostHeadline: string
		selfHostSubline: string
		selfHostExplore: string
		criticalHeadline: string
		criticalSubline: string
		criticalCta: string
		faqHeadline: string
		finalCtaHeadline: string
		finalCtaSubline: string
		finalCtaStart: string
		finalCtaDocs: string
		planExploreName: string
		planBuildBadge: string
		planBuildName: string
		planScaleName: string
		planEnterpriseName: string
		planExploreDesc: string
		planExploreBillingText: string
		planExploreCta: string
		planExploreF1: string
		planExploreF2: string
		planExploreF3: string
		planExploreF4: string
		planExploreF5: string
		planBuildDesc: string
		planBuildBillingText: string
		planBuildCta: string
		planBuildF1: string
		planBuildF2: string
		planBuildF3: string
		planBuildF4: string
		planBuildF5: string
		planBuildF6: string
		planBuildF7: string
		planScaleDesc: string
		planScaleBillingText: string
		planScaleCta: string
		planScaleF1: string
		planScaleF2: string
		planScaleF3: string
		planScaleF4: string
		planScaleF5: string
		planScaleF6: string
		planScaleF7: string
		planScaleF8: string
		planEnterpriseDesc: string
		planEnterpriseBillingText: string
		planEnterpriseCta: string
		planEnterpriseF1: string
		planEnterpriseF2: string
		planEnterpriseF3: string
		planEnterpriseF4: string
		planEnterpriseF5: string
		planEnterpriseF6: string
		planEnterpriseF7: string
		planEnterpriseF8: string
		planEnterpriseF9: string
		planEnterpriseContextCapacity: string
		planEnterpriseProjects: string
		promise1Title: string
		promise1Desc: string
		promise2Title: string
		promise2Desc: string
		promise3Title: string
		promise3Desc: string
		promise4Title: string
		promise4Desc: string
		coverage1Title: string
		coverage1Desc: string
		coverage1Example: string
		coverage2Title: string
		coverage2Desc: string
		coverage2Example: string
		coverage3Title: string
		coverage3Desc: string
		coverage3Example: string
		coverage4Title: string
		coverage4Desc: string
		coverage4Example: string
		catMemory: string
		catRetrieval: string
		catPlatform: string
		catInfrastructure: string
		catSecurity: string
		catSupport: string
		rowMemoryStorage: string
		rowMemoryRetrieval: string
		rowMemoryRetention: string
		rowMemoryExport: string
		rowMetadataFiltering: string
		rowMemoryHistory: string
		rowSemanticSearch: string
		rowHybridRetrieval: string
		rowReranking: string
		rowSearchFilters: string
		rowCustomRetrievalConfig: string
		rowApiAccess: string
		rowProjects: string
		rowEnvironments: string
		rowUsageAnalytics: string
		rowWebhooks: string
		rowManagedInfra: string
		rowSelfHosted: string
		rowCustomStorage: string
		rowDedicatedResources: string
		rowDeploymentControls: string
		rowApiKeys: string
		rowRbac: string
		rowSsoSaml: string
		rowAuditLogs: string
		rowSecurityControls: string
		rowCommunitySupport: string
		rowEmailSupport: string
		rowPrioritySupport: string
		rowDedicatedSupport: string
		rowSla: string
		reason1Title: string
		reason1Desc: string
		reason2Title: string
		reason2Desc: string
		reason3Title: string
		reason3Desc: string
		reason4Title: string
		reason4Desc: string
		reason5Title: string
		reason5Desc: string
		reason6Title: string
		reason6Desc: string
		criticalCard1Title: string
		criticalCard1Desc: string
		criticalCard2Title: string
		criticalCard2Desc: string
		criticalCard3Title: string
		criticalCard3Desc: string
		selfHostYourApp: string
		selfHostYourInfra: string
		faq1Q: string
		faq1A: string
		faq2Q: string
		faq2A: string
		faq3Q: string
		faq3A: string
		faq4Q: string
		faq4A: string
		faq5Q: string
		faq5A: string
		faq6Q: string
		faq6A: string
		faq7Q: string
		faq7A: string
		faq8Q: string
		faq8A: string
		faq9Q: string
		faq9A: string
		faq10Q: string
		faq10A: string
		faq11Q: string
		faq11A: string
	}
	waitPage: {
		loading: string
		sublinePre: string
		sublineHighlight: string
	}
}

export const translations: Record<Language, TranslationDictionary> = {
	en: {
		nav: {
			overview: "Overview",
			research: "Research",
			pricing: "Pricing",
			initiatives: "Initiatives",
			resources: "Resources",
			company: "Company",
			tryPiyApi: "Try Piyapi",
		},
		hero: {
			headlinePre: "The Next Evolution Of\nSuper Intelligence Is ",
			headlineMemory: "Memory.",
			subline: "Piyapi gives AI the ability to remember, learn and evolve.",
			emailPlaceholder: "Enter your email",
			joinWaitlist: "Join Waitlist",
			joining: "Joining...",
			successMsg: "You're on the waitlist! We'll be in touch soon.",
			duplicateMsg: "You're already on the waitlist!",
			invalidEmailMsg: "Please enter a valid email address.",
		},
		partner: {
			supportedBy: "SUPPORTED BY GLOBAL STARTUP PROGRAMS",
		},
		problem: {
			tag: "PROBLEM",
			headlinePre: "AI Can Reason.\nIt Still Needs ",
			headlineMemory: "Memory.",
			subline:
				"AI can reason in the moment. But without memory, it struggles to carry knowledge, experience, and context forward.",
			tab1Label: "Context Stuffing",
			tab1CardTitle: "Context Stuffing",
			tab1CardDesc:
				"More context doesn't mean better memory. As information grows, costs rise and relevant knowledge gets harder to retrieve.",
			tab2Label: "AI Memory Wrappers",
			tab2CardTitle: "AI Memory Wrappers",
			tab2CardDesc:
				"Summarizing conversations reduces context size but can lose exact facts, timestamps, and provenance.",
			tab3Label: "Native Model Memory",
			tab3CardTitle: "Native Model Memory",
			tab3CardDesc:
				"Models can remember. But they still can't guarantee what they remember, why they remember it, or when it changed.",
		},
		differentApproach: {
			tag: "SOLUTION",
			titlePre: "A Different Approach to AI ",
			titleHighlight: "Memory.",
			sublinePre: "Purpose built for production AI, ",
			sublineHighlight: "Piyapi",
			sublinePost:
				" preserves exact knowledge with predictable retrieval and verifiable provenance.",
			feat1Title: "Determinism",
			feat1Desc:
				"Predictable and repeatable memory retrieval for reliable AI systems.",
			feat2Title: "Fidelity",
			feat2Desc:
				"Preserve the full context and nuance of data without loss or compression.",
			feat3Title: "Provenance",
			feat3Desc:
				"Complete traceability for every piece of retrieved knowledge.",
			feat4Title: "Persistence",
			feat4Desc:
				"Long-term historical continuity across sessions and models.",
			feat5Title: "Ownership",
			feat5Desc:
				"Full user control and sovereignty over private memory data.",
			feat6Title: "Portability",
			feat6Desc:
				"Model-agnostic interoperability for seamless infrastructure migration.",
			quotePre: "Retrieval is only half the problem. Production AI needs ",
			quoteHighlight: "memory",
			quotePost: " that can preserve and verify what it knows.",
			sotaHeading: "SOTA memory,\nMeasured.",
			sotaLine1: "Leading performance across LongMemEval,",
			sotaLine2: "LoCoMo, ConvoMem with fast recall and",
			sotaLine3: "dramatically lower token usage.",
			metric1Value: "#1",
			metric1Sublabel: "ON MEMBENCH",
			metric1Line1: "SUPERIOR AI",
			metric1Line2: "EXPERIENCE",
			metric2Value: "<500ms",
			metric2Sublabel: "RECALL LATENCY",
			metric2Line1: "REAL-TIME",
			metric2Line2: "MEMORY",
			metric3Value: "50-90%",
			metric3Sublabel: "FEWER TOKENS USED",
			metric3Line1: "ENTERPRISE",
			metric3Line2: "SCALE AI",
			tableHeaderContext: "Context Stuffing",
			tableHeaderWrapper: "Memory Wrapper",
			tableHeaderNative: "Native Memory",
			tableRow1: "Exact Preservation",
			tableRow2: "Model Independence",
			tableRow3: "Verifiable Provenance",
			tableRow4: "Enterprise Governance",
		},
		workflows: {
			headlinePre: "Built for Every ",
			headlineHighlight: "AI Workflow.",
			sublineLine1:
				"Empower your specialized infrastructure with deterministic memory",
			sublineLine2:
				"management optimized for high-scale, context-aware production models.",
			card1Id: "01",
			card1Title: "AI Agents",
			card1Desc: "Persistent memory for autonomous, multi-step decision making.",
			card2Id: "02",
			card2Title: "Conversational AI",
			card2Desc:
				"Maintain long-term context across customer support, sales, and personal assistants.",
			card3Id: "03",
			card3Title: "RAG Systems",
			card3Desc:
				"Retrieve exact knowledge with deterministic provenance instead of semantic similarity.",
			card4Id: "04",
			card4Title: "Enterprise Knowledge",
			card4Desc:
				"Preserve organizational knowledge across teams, documents, and workflows.",
			card5Id: "05",
			card5Title: "High-Stakes AI",
			card5Desc:
				"Power legal, financial, healthcare, and regulated systems where exact recall matters.",
			card6Id: "06",
			card6Title: "Multi-Agent Systems",
			card6Desc:
				"Provide a shared, persistent memory layer across collaborating AI agents.",
		},
		code: {
			headline: "Integrate Piyapi where your AI already lives.",
			headlinePre: "Integrate ",
			headlineHighlight: "Piyapi",
			headlinePost: " where your AI already lives.",
			subline: "Memory that works with any model, framework, or agent stack.",
			tag01: "//01",
			sdkTitle: "SDK",
			sdkSubtitle: "Native SDKs, REST APIs, and AI framework integrations",
			tag02: "//02",
			agentsTitle: "AI AGENTS",
			agentsSubtitle:
				"Enable AI agents to remember accurately across every interaction and workflow.",
			tag03: "//03",
			connectorsTitle: "CONNECTORS",
			connectorsSubtitle: "One source of truth. Every application. Every model.",
			tag04: "//04",
			mcpTitle: "MCP",
			mcpSubtitle:
				"Enable coding assistants to remember projects, conversations, and decisions across sessions",
		},
		security: {
			tag: "PRIVACY & SECURITY",
			headlineData: "Data.",
			headlineMemory: "Memory.",
			headlineControl: "Control.",
			subline1:
				"PiyAPI keeps AI memory private, explicit, and editable so you control what your AI",
			subline2: "remembers, changes, and forgets.",
			card1Title: "Private by design",
			card1Desc:
				"Sensitive knowledge stays encrypted and isolated throughout its lifecycle.",
			card2Title: "Explicit Memory",
			card2Desc:
				"Every memory is addressable and respectible not hidden inside model parameters or opaque state.",
			card3Title: "Editable by Design",
			card3Desc:
				"Correct, update, or delete individual memories without changing the underlying model.",
			card4Title: "Full Transparency",
			card4Desc:
				"See what AI remembers, where it came from, and how it has changed.",
			card5Title: "User-controlled memory",
			card5Desc: "Control who can create, read, update, export, or delete memory.",
		},
		research: {
			tag: "INSIGHTS AND BLOGS",
			headline: "Research & Insights",
			paper1Overlay: "Memory",
			paper1Title: "Memory Is the Missing Layer of Intelligence",
			paper1Status: "Coming soon",
			paper1Category: "Research Papers",
			paper2Overlay: "Memory",
			paper2Title: "Deterministic Memory for Probabilistic AI",
			paper2Status: "Coming Soon",
			paper2Category: "Experiments",
			paper3Overlay: "Memory",
			paper3Title: "Measuring Long-Term Memory in AI Systems",
			paper3Status: "Coming Soon",
			paper3Category: "Engineering",
		},
		cta: {
			headline: "Build With Piyapi",
			subline:
				"Have a use case in mind? Talk to our team and explore where deterministic memory can fit into your AI stack.",
			talkButton: "Talk to the Team",
			marqueeItems: [
				"Conversational AI",
				"Personal AI Memory",
				"Enterprise Knowledge",
				"Multi-Agent Systems",
				"Healthcare AI",
			],
		},
		calendly: {
			title: "Schedule a Demo with Piyapi",
			loading: "Loading scheduling interface...",
			close: "Close modal",
		},
		footer: {
			infrastructure: "Infrastructure for reliable AI.",
			moreAboutUs: "More about us",
			devTitle: "Developers",
			devDocs: "Developer Docs",
			devApi: "API Reference",
			devMcp: "MCP Integration",
			devCli: "CLI Reference",
			devTrust: "Trust Center",
			devStatus: "Status",
			prodTitle: "Product",
			prodResearch: "Research",
			prodBlog: "Blog",
			prodIntegrations: "Integrations",
			prodReleaseNotes: "Release notes",
			prodGithub: "GitHub",
			compTitle: "Company",
			compAbout: "About Us",
			compContact: "Contact Us",
			compCareers: "Careers",
			compStartup: "Startup Program",
			compInvestors: "Investors",
			compPricing: "Pricing",
			usecasesTitle: "Usecase",
			useSupport: "Customer Support",
			useHealth: "Healthcare",
			useEdu: "Education",
			useSales: "Sales & CRM",
			useEcom: "E-Commerce",
			soc2: "SOC 2 Type I & Type II Ready",
			gdpr: "GDPR Ready",
			hipaa: "HIPAA Ready",
			complianceTitle: "Compliance",
			contactTitle: "Contact Us",
			contactEmail: "ceo@negentro.tech",
			copyright: "© 2026 INFORAVIUM TECHNOLOGIES PRIVATE LIMITED",
			rightsReserved: "– Copyright All Rights reserved",
			languagesLabel: "Languages",
		},
		pricing: {
			tag: "PRICING",
			heroHeadline: "Infrastructure that scales with your context.",
			heroSubline: "Start building with persistent intelligence, then scale your memory, retrieval, and infrastructure as your application grows.",
			billingLabel: "BILLING",
			billingMonthly: "Monthly",
			billingYearly: "Yearly",
			billingSave: "Save 20%",
			includedLabel: "INCLUDED",
			contextCapacityLabel: "CONTEXT CAPACITY",
			retrievalsLabel: "Retrievals/mo",
			projectsLabel: "Projects",
			coverageHeadline: "What your plan actually covers",
			coverageSubline: "Every plan is built from the same four infrastructure dimensions.",
			stepsPrototype: "Prototype",
			stepsProduction: "Production",
			stepsScale: "Scale",
			stepsEnterprise: "Enterprise",
			compareHeadline: "Compare every capability",
			compareSubline: "See exactly how each plan differs before you choose.",
			capabilityLabel: "CAPABILITY",
			recommendedLabel: "RECOMMENDED",
			calculatorHeadline: "Estimate your monthly usage",
			calculatorSubline: "Tell us roughly how much context your application handles and we'll show an estimated plan range.",
			mauLabel: "MONTHLY ACTIVE USERS",
			memoriesPerUserLabel: "MEMORIES CREATED PER USER",
			retrievalRequestsLabel: "MONTHLY RETRIEVAL REQUESTS",
			projectsCountLabel: "PROJECTS",
			estimatedUsageLabel: "ESTIMATED MONTHLY USAGE",
			memoryOpsUnit: "memory operations",
			suggestedPlanLabel: "SUGGESTED PLAN",
			estimatedPriceLabel: "ESTIMATED PRICE",
			calculatorCta: "Start building",
			calculatorDisclaimer: "Actual usage and pricing may vary depending on configuration and infrastructure requirements.",
			selfHostHeadline: "Prefer to run it yourself?",
			selfHostSubline: "Deploy Negentro on your own infrastructure and choose the components, storage, and model providers that fit your environment.",
			selfHostExplore: "Explore Open Source",
			criticalHeadline: "For teams building critical AI systems.",
			criticalSubline: "Talk with the Negentro team about deployment requirements, security, scale, support, and custom infrastructure.",
			criticalCta: "Talk to sales",
			faqHeadline: "Frequently asked questions",
			finalCtaHeadline: "Start building with persistent intelligence.",
			finalCtaSubline: "Begin with the free tier and scale when your application needs more context.",
			finalCtaStart: "Start building",
			finalCtaDocs: "Read the docs",
			planExploreName: "Explore",
			planBuildBadge: "MOST POPULAR",
			planBuildName: "Build",
			planScaleName: "Scale",
			planEnterpriseName: "Enterprise",
			planExploreDesc: "For experimenting with persistent context",
			planExploreBillingText: "For developers getting started",
			planExploreCta: "Start building",
			planExploreF1: "Limited memory storage",
			planExploreF2: "Core retrieval",
			planExploreF3: "Developer API",
			planExploreF4: "Community support",
			planExploreF5: "Basic usage analytics",
			planBuildDesc: "For production applications",
			planBuildBillingText: "Billed monthly or yearly",
			planBuildCta: "Start building",
			planBuildF1: "Increased memory capacity",
			planBuildF2: "Higher API usage",
			planBuildF3: "Advanced retrieval",
			planBuildF4: "Metadata filtering",
			planBuildF5: "Project-level context",
			planBuildF6: "Usage analytics",
			planBuildF7: "Developer support",
			planScaleDesc: "For high-volume AI applications",
			planScaleBillingText: "Billed monthly or yearly",
			planScaleCta: "Start scaling",
			planScaleF1: "High memory limits",
			planScaleF2: "High API volume",
			planScaleF3: "Advanced retrieval",
			planScaleF4: "Multiple projects",
			planScaleF5: "Team collaboration",
			planScaleF6: "Advanced analytics",
			planScaleF7: "Priority support",
			planScaleF8: "Higher retention",
			planEnterpriseDesc: "For organizations operating at scale",
			planEnterpriseBillingText: "Tailored to your needs",
			planEnterpriseCta: "Talk to sales",
			planEnterpriseF1: "Custom limits",
			planEnterpriseF2: "Dedicated infrastructure options",
			planEnterpriseF3: "SSO/SAML",
			planEnterpriseF4: "Audit logs",
			planEnterpriseF5: "Advanced security controls",
			planEnterpriseF6: "SLA options",
			planEnterpriseF7: "Dedicated support",
			planEnterpriseF8: "Custom integrations",
			planEnterpriseF9: "Data and deployment controls",
			planEnterpriseContextCapacity: "Custom",
			planEnterpriseProjects: "Unlimited",
			promise1Title: "No hidden fees",
			promise1Desc: "Transparent pricing with no surprise charges or overages.",
			promise2Title: "Cancel anytime",
			promise2Desc: "No lock-in contracts. Downgrade or cancel whenever you need.",
			promise3Title: "Usage-based flexibility",
			promise3Desc: "Pay for what you use. Scale up or down based on your actual needs.",
			promise4Title: "Free tier forever",
			promise4Desc: "Our starter plan is free forever. No credit card required to get started.",
			coverage1Title: "Memory",
			coverage1Desc: "How much persistent context can be stored across your application.",
			coverage1Example: "e.g. 10K ? 1M+ memories",
			coverage2Title: "Retrieval",
			coverage2Desc: "How much context can be searched and retrieved on demand.",
			coverage2Example: "e.g. 5K ? 5M requests/mo",
			coverage3Title: "Infrastructure",
			coverage3Desc: "Storage, compute, deployment topology, and reliability guarantees.",
			coverage3Example: "Shared to Dedicated",
			coverage4Title: "Support",
			coverage4Desc: "Community, priority, or dedicated engineering support levels.",
			coverage4Example: "Community to Dedicated",
			catMemory: "MEMORY",
			catRetrieval: "RETRIEVAL",
			catPlatform: "PLATFORM",
			catInfrastructure: "INFRASTRUCTURE",
			catSecurity: "SECURITY",
			catSupport: "SUPPORT",
			rowMemoryStorage: "Memory storage",
			rowMemoryRetrieval: "Memory retrieval",
			rowMemoryRetention: "Memory retention",
			rowMemoryExport: "Memory export",
			rowMetadataFiltering: "Metadata filtering",
			rowMemoryHistory: "Memory history",
			rowSemanticSearch: "Semantic search",
			rowHybridRetrieval: "Hybrid retrieval",
			rowReranking: "Reranking",
			rowSearchFilters: "Search filters",
			rowCustomRetrievalConfig: "Custom retrieval configuration",
			rowApiAccess: "API access",
			rowProjects: "Projects",
			rowEnvironments: "Environments",
			rowUsageAnalytics: "Usage analytics",
			rowWebhooks: "Webhooks",
			rowManagedInfra: "Managed infrastructure",
			rowSelfHosted: "Self-hosted deployment",
			rowCustomStorage: "Custom storage",
			rowDedicatedResources: "Dedicated resources",
			rowDeploymentControls: "Deployment controls",
			rowApiKeys: "API keys",
			rowRbac: "RBAC",
			rowSsoSaml: "SSO/SAML",
			rowAuditLogs: "Audit logs",
			rowSecurityControls: "Security controls",
			rowCommunitySupport: "Community support",
			rowEmailSupport: "Email support",
			rowPrioritySupport: "Priority support",
			rowDedicatedSupport: "Dedicated support",
			rowSla: "SLA",
			reason1Title: "Enterprise-grade security",
			reason1Desc: "SOC 2, HIPAA, and GDPR compliant infrastructure.",
			reason2Title: "Sub-500ms recall latency",
			reason2Desc: "Real-time deterministic memory for production AI.",
			reason3Title: "50-90% fewer tokens",
			reason3Desc: "Dramatically reduce token usage with deterministic memory.",
			reason4Title: "#1 on MemBench",
			reason4Desc: "Leading performance across memory benchmarks.",
			reason5Title: "Model-agnostic",
			reason5Desc: "Works with any LLM, framework, or agent stack.",
			reason6Title: "Full data ownership",
			reason6Desc: "Your memory, your data, your control. Always.",
			criticalCard1Title: "Security",
			criticalCard1Desc: "SSO, access controls, and audit requirements built for regulated environments.",
			criticalCard2Title: "Scale",
			criticalCard2Desc: "Custom capacity and dedicated infrastructure for demanding workloads.",
			criticalCard3Title: "Support",
			criticalCard3Desc: "Priority engineering and deployment support from our team.",
			selfHostYourApp: "Your Application",
			selfHostYourInfra: "Your Infrastructure",
			faq1Q: "Is there a free plan?",
			faq1A: "Yes, the Explore plan is free and designed for developers experimenting with persistent context.",
			faq2Q: "How is usage measured?",
			faq2A: "Usage is measured based on the number of active users, stored memories, and retrieval operations performed each month.",
			faq3Q: "What counts as a memory operation?",
			faq3A: "A memory operation includes any create, read, update, or delete action on your memory store.",
			faq4Q: "Can I change plans later?",
			faq4A: "Yes! You can upgrade or downgrade your plan at any time to match your infrastructure needs.",
			faq5Q: "Do unused limits roll over?",
			faq5A: "No, unused usage limits reset at the beginning of each billing cycle.",
			faq6Q: "Can I use Negentro with my own infrastructure?",
			faq6A: "Yes, you can deploy Negentro on your own infrastructure with our open-source or enterprise offerings.",
			faq7Q: "What is included in self-hosting?",
			faq7A: "Self-hosting includes full deployment control, custom infrastructure, and the ability to bring your own model providers.",
			faq8Q: "Do you offer enterprise agreements?",
			faq8A: "Yes, our Enterprise plan includes custom limits, SSO/SAML, audit logs, and priority deployment support.",
			faq9Q: "Is there a usage-based option?",
			faq9A: "Yes, beyond base plan limits, you can scale dynamically with transparent usage-based pricing.",
			faq10Q: "Can I export my data?",
			faq10A: "Absolutely. You retain full data ownership and can export your context data at any time via our API.",
			faq11Q: "Do you offer support for production deployments?",
			faq11A: "Yes, we provide priority engineering and deployment support for our Scale and Enterprise customers.",
			},
		waitPage: {
			loading: "Memory is loading...",
			sublinePre: "Our team is putting the finishing touches on",
			sublineHighlight: "Negentro.",
		},
	},

	es: {
		nav: {
			overview: "Visión General",
			research: "Investigación",
			pricing: "Precios",
			initiatives: "Iniciativas",
			resources: "Recursos",
			company: "Compañía",
			tryPiyApi: "Probar PiyAPI",
		},
		hero: {
			headlinePre: "La Próxima Evolución De La\nInteligencia Es La ",
			headlineMemory: "Memoria.",
			subline: "Piyapi le da a la IA la capacidad de recordar, aprender y evolucionar.",
			emailPlaceholder: "Introduce tu correo electrónico",
			joinWaitlist: "Unirse a la Lista",
			joining: "Uniéndose...",
			successMsg: "¡Estás en la lista de espera! Nos pondremos en contacto pronto.",
			duplicateMsg: "¡Ya estás en la lista de espera!",
			invalidEmailMsg: "Por favor, introduce un correo electrónico válido.",
		},
		partner: {
			supportedBy: "CON EL RESPALDO DE PROGRAMAS GLOBALES DE STARTUPS",
		},
		problem: {
			tag: "PROBLEMA",
			headlinePre: "La IA Puede Razonar.\nAún Necesita ",
			headlineMemory: "Memoria.",
			subline:
				"La IA puede razonar en el momento. Pero sin memoria, tiene dificultades para transmitir conocimiento, experiencia y contexto.",
			tab1Label: "Relleno de Contexto",
			tab1CardTitle: "Relleno de Contexto",
			tab1CardDesc:
				"Más contexto no significa mejor memoria. A medida que la información crece, los costos aumentan y el conocimiento relevante se vuelve más difícil de recuperar.",
			tab2Label: "Envoltorios de Memoria IA",
			tab2CardTitle: "Envoltorios de Memoria IA",
			tab2CardDesc:
				"Resumir conversaciones reduce el tamaño del contexto pero puede perder hechos exactos, marcas de tiempo y procedencia.",
			tab3Label: "Memoria de Modelo Nativa",
			tab3CardTitle: "Memoria de Modelo Nativa",
			tab3CardDesc:
				"Los modelos pueden recordar. Pero todavía no pueden garantizar qué recuerdan, por qué lo recuerdan o cuándo cambió.",
		},
		differentApproach: {
			tag: "SOLUCIÓN",
			titlePre: "Un Enfoque Diferente para la Memoria de ",
			titleHighlight: "IA.",
			sublinePre: "Diseñado para IA en producción, ",
			sublineHighlight: "Piyapi",
			sublinePost:
				" preserva conocimiento exacto con recuperación predecible y procedencia verificable.",
			feat1Title: "Determinismo",
			feat1Desc:
				"Recuperación de memoria predecible y repetible para sistemas de IA confiables.",
			feat2Title: "Fidelidad",
			feat2Desc:
				"Preserve todo el contexto y matiz de los datos sin pérdidas ni compresión.",
			feat3Title: "Procedencia",
			feat3Desc:
				"Trazabilidad completa para cada fragmento de conocimiento recuperado.",
			feat4Title: "Persistencia",
			feat4Desc:
				"Continuidad histórica a largo plazo entre sesiones y modelos.",
			feat5Title: "Propiedad",
			feat5Desc:
				"Control total del usuario y soberanía sobre los datos privados de memoria.",
			feat6Title: "Portabilidad",
			feat6Desc:
				"Interoperabilidad agnóstica de modelos para una migración de infraestructura sin fricciones.",
			quotePre: "La recuperación es solo la mitad del problema. La IA en producción necesita ",
			quoteHighlight: "memoria",
			quotePost: " que pueda preservar y verificar lo que sabe.",
			sotaHeading: "Memoria SOTA,\nMedida.",
			sotaLine1: "Rendimiento líder en LongMemEval,",
			sotaLine2: "LoCoMo, ConvoMem con recuperación rápida y",
			sotaLine3: "un uso de tokens drásticamente menor.",
			metric1Value: "#1",
			metric1Sublabel: "EN MEMBENCH",
			metric1Line1: "EXPERIENCIA DE IA",
			metric1Line2: "SUPERIOR",
			metric2Value: "<500ms",
			metric2Sublabel: "LATENCIA DE RECUPERACIÓN",
			metric2Line1: "MEMORIA EN",
			metric2Line2: "TIEMPO REAL",
			metric3Value: "50-90%",
			metric3Sublabel: "MENOS TOKENS USADOS",
			metric3Line1: "IA A ESCALA",
			metric3Line2: "EMPRESARIAL",
			tableHeaderContext: "Relleno de Contexto",
			tableHeaderWrapper: "Envoltorio de Memoria",
			tableHeaderNative: "Memoria Nativa",
			tableRow1: "Preservación Exacta",
			tableRow2: "Independencia del Modelo",
			tableRow3: "Procedencia Verificable",
			tableRow4: "Gobernanza Empresarial",
		},
		workflows: {
			headlinePre: "Diseñado para Cada ",
			headlineHighlight: "Flujo de IA.",
			sublineLine1:
				"Potencie su infraestructura especializada con gestión de memoria determinista",
			sublineLine2:
				"optimizada para modelos de producción a gran escala y conscientes del contexto.",
			card1Id: "01",
			card1Title: "Agentes de IA",
			card1Desc: "Memoria persistente para la toma de decisiones autónoma y en múltiples pasos.",
			card2Id: "02",
			card2Title: "IA Conversacional",
			card2Desc:
				"Mantenga el contexto a largo plazo en soporte al cliente, ventas y asistentes personales.",
			card3Id: "03",
			card3Title: "Sistemas RAG",
			card3Desc:
				"Recupere conocimiento exacto con procedencia determinista en lugar de similitud semántica.",
			card4Id: "04",
			card4Title: "Conocimiento Empresarial",
			card4Desc:
				"Preserve el conocimiento organizacional entre equipos, documentos y flujos de trabajo.",
			card5Id: "05",
			card5Title: "IA de Alto Riesgo",
			card5Desc:
				"Potencie sistemas legales, financieros, de salud y regulados donde el recuerdo exacto importa.",
			card6Id: "06",
			card6Title: "Sistemas Multi-Agente",
			card6Desc:
				"Proporcione una capa de memoria persistente y compartida entre agentes de IA colaboradores.",
		},
		code: {
			headline: "Integra Piyapi donde tu IA ya vive.",
			headlinePre: "Integra ",
			headlineHighlight: "Piyapi",
			headlinePost: " donde tu IA ya vive.",
			subline: "Memoria que funciona con cualquier modelo, framework o stack de agentes.",
			tag01: "//01",
			sdkTitle: "SDK",
			sdkSubtitle: "SDKs nativos, APIs REST e integraciones con frameworks de IA",
			tag02: "//02",
			agentsTitle: "AGENTES DE IA",
			agentsSubtitle:
				"Permite que los agentes de IA recuerden con precisión en cada interacción y flujo.",
			tag03: "//03",
			connectorsTitle: "CONECTORES",
			connectorsSubtitle: "Una sola fuente de verdad. Cada aplicación. Cada modelo.",
			tag04: "//04",
			mcpTitle: "MCP",
			mcpSubtitle:
				"Permite a los asistentes de código recordar proyectos, conversaciones y decisiones entre sesiones",
		},
		security: {
			tag: "PRIVACIDAD Y SEGURIDAD",
			headlineData: "Datos.",
			headlineMemory: "Memoria.",
			headlineControl: "Control.",
			subline1:
				"PiyAPI mantiene la memoria de la IA privada, explícita y editable para que usted controle lo que su IA",
			subline2: "recuerda, modifica y olvida.",
			card1Title: "Privado por diseño",
			card1Desc:
				"El conocimiento sensible permanece cifrado y aislado durante todo su ciclo de vida.",
			card2Title: "Memoria Explícita",
			card2Desc:
				"Cada memoria es direccionable y auditable, no oculta dentro de parámetros del modelo.",
			card3Title: "Editable por Diseño",
			card3Desc:
				"Corrija, actualice o elimine memorias individuales sin alterar el modelo subyacente.",
			card4Title: "Transparencia Total",
			card4Desc:
				"Vea qué recuerda la IA, de dónde provino y cómo ha cambiado.",
			card5Title: "Memoria controlada por el usuario",
			card5Desc: "Controle quién puede crear, leer, actualizar, exportar o eliminar memoria.",
		},
		research: {
			tag: "INVESTIGACIÓN Y BLOGS",
			headline: "Investigación e Insights",
			paper1Overlay: "Memoria",
			paper1Title: "La Memoria es la Capa Faltante de la Inteligencia",
			paper1Status: "Próximamente",
			paper1Category: "Publicaciones Científicas",
			paper2Overlay: "Memoria",
			paper2Title: "Memoria Determinista para IA Probabilística",
			paper2Status: "Próximamente",
			paper2Category: "Experimentos",
			paper3Overlay: "Memoria",
			paper3Title: "Midiendo la Memoria a Largo Plazo en Sistemas de IA",
			paper3Status: "Próximamente",
			paper3Category: "Ingeniería",
		},
		cta: {
			headline: "Construya Con Piyapi",
			subline:
				"¿Tiene un caso de uso en mente? Hable con nuestro equipo y explore dónde encaja la memoria determinista en su stack de IA.",
			talkButton: "Hablar con el Equipo",
			marqueeItems: [
				"IA Conversacional",
				"Memoria Personal de IA",
				"Conocimiento Empresarial",
				"Sistemas Multi-Agente",
				"IA para la Salud",
			],
		},
		calendly: {
			title: "Agendar una Demostración con Piyapi",
			loading: "Cargando interfaz de programación...",
			close: "Cerrar modal",
		},
		footer: {
			infrastructure: "Infraestructura para una IA confiable.",
			moreAboutUs: "Más sobre nosotros",
			devTitle: "Desarrolladores",
			devDocs: "Documentación",
			devApi: "Referencia API",
			devMcp: "Integración MCP",
			devCli: "Referencia CLI",
			devTrust: "Centro de Confianza",
			devStatus: "Estado",
			prodTitle: "Producto",
			prodResearch: "Investigación",
			prodBlog: "Blog",
			prodIntegrations: "Integraciones",
			prodReleaseNotes: "Notas de la versión",
			prodGithub: "GitHub",
			compTitle: "Compañía",
			compAbout: "Acerca de Nosotros",
			compContact: "Contáctenos",
			compCareers: "Carreras",
			compStartup: "Programa Startups",
			compInvestors: "Inversores",
			compPricing: "Precios",
			usecasesTitle: "Casos de Uso",
			useSupport: "Atención al Cliente",
			useHealth: "Salud",
			useEdu: "Educación",
			useSales: "Ventas y CRM",
			useEcom: "Comercio Electrónico",
			soc2: "SOC 2 Tipo I y Tipo II Listo",
			gdpr: "Listo para GDPR",
			hipaa: "Listo para HIPAA",
			complianceTitle: "Cumplimiento",
			contactTitle: "Contáctenos",
			contactEmail: "ceo@negentro.tech",
			copyright: "© 2026 INFORAVIUM TECHNOLOGIES PRIVATE LIMITED",
			rightsReserved: "– Todos los derechos reservados",
			languagesLabel: "Idiomas",
		},
		pricing: {
			tag: "PRECIOS",
			heroHeadline: "Infraestructura que escala con tu contexto.",
			heroSubline: "Comienza a construir con inteligencia persistente, luego escala tu memoria, recuperación e infraestructura a medida que tu aplicación crece.",
			billingLabel: "FACTURACIÓN",
			billingMonthly: "Mensual",
			billingYearly: "Anual",
			billingSave: "Ahorra 20%",
			includedLabel: "INCLUIDO",
			contextCapacityLabel: "CAPACIDAD DE CONTEXTO",
			retrievalsLabel: "Recuperaciones/mes",
			projectsLabel: "Proyectos",
			coverageHeadline: "Lo que tu plan realmente cubre",
			coverageSubline: "Cada plan se construye con las mismas cuatro dimensiones de infraestructura.",
			stepsPrototype: "Prototipo",
			stepsProduction: "Producción",
			stepsScale: "Escala",
			stepsEnterprise: "Empresarial",
			compareHeadline: "Compara cada capacidad",
			compareSubline: "Ve exactamente cómo difiere cada plan antes de elegir.",
			capabilityLabel: "CAPACIDAD",
			recommendedLabel: "RECOMENDADO",
			calculatorHeadline: "Estima tu uso mensual",
			calculatorSubline: "Cuéntanos aproximadamente cuánto contexto maneja tu aplicación y te mostraremos un rango de plan estimado.",
			mauLabel: "USUARIOS ACTIVOS MENSUALES",
			memoriesPerUserLabel: "MEMORIAS CREADAS POR USUARIO",
			retrievalRequestsLabel: "SOLICITUDES DE RECUPERACIÓN MENSUALES",
			projectsCountLabel: "PROYECTOS",
			estimatedUsageLabel: "USO MENSUAL ESTIMADO",
			memoryOpsUnit: "operaciones de memoria",
			suggestedPlanLabel: "PLAN SUGERIDO",
			estimatedPriceLabel: "PRECIO ESTIMADO",
			calculatorCta: "Empezar a construir",
			calculatorDisclaimer: "El uso real y los precios pueden variar según la configuración y los requisitos de infraestructura.",
			selfHostHeadline: "¿Prefieres ejecutarlo tú mismo?",
			selfHostSubline: "Despliega Negentro en tu propia infraestructura y elige los componentes, almacenamiento y proveedores de modelos que se adapten a tu entorno.",
			selfHostExplore: "Explorar Código Abierto",
			criticalHeadline: "Para equipos que construyen sistemas de IA críticos.",
			criticalSubline: "Habla con el equipo de Negentro sobre requisitos de despliegue, seguridad, escala, soporte e infraestructura personalizada.",
			criticalCta: "Hablar con ventas",
			faqHeadline: "Preguntas frecuentes",
			finalCtaHeadline: "Empieza a construir con inteligencia persistente.",
			finalCtaSubline: "Comienza con el nivel gratuito y escala cuando tu aplicación necesite más contexto.",
			finalCtaStart: "Empezar a construir",
			finalCtaDocs: "Leer la documentación",
			planExploreName: "Explorar",
			planBuildBadge: "MAS POPULAR",
			planBuildName: "Construir",
			planScaleName: "Escalar",
			planEnterpriseName: "Empresarial",
			planExploreDesc: "Para experimentar con contexto persistente",
			planExploreBillingText: "Para desarrolladores que empiezan",
			planExploreCta: "Empezar a construir",
			planExploreF1: "Almacenamiento de memoria limitado",
			planExploreF2: "Recuperacion basica",
			planExploreF3: "API para desarrolladores",
			planExploreF4: "Soporte comunitario",
			planExploreF5: "Analisis de uso basico",
			planBuildDesc: "Para aplicaciones en produccion",
			planBuildBillingText: "Facturado mensual o anualmente",
			planBuildCta: "Empezar a construir",
			planBuildF1: "Mayor capacidad de memoria",
			planBuildF2: "Mayor uso de API",
			planBuildF3: "Recuperacion avanzada",
			planBuildF4: "Filtrado de metadatos",
			planBuildF5: "Contexto a nivel de proyecto",
			planBuildF6: "Analisis de uso",
			planBuildF7: "Soporte para desarrolladores",
			planScaleDesc: "Para aplicaciones de IA de alto volumen",
			planScaleBillingText: "Facturado mensual o anualmente",
			planScaleCta: "Empezar a escalar",
			planScaleF1: "Altos limites de memoria",
			planScaleF2: "Alto volumen de API",
			planScaleF3: "Recuperacion avanzada",
			planScaleF4: "Multiples proyectos",
			planScaleF5: "Colaboracion en equipo",
			planScaleF6: "Analisis avanzado",
			planScaleF7: "Soporte prioritario",
			planScaleF8: "Mayor retencion",
			planEnterpriseDesc: "Para organizaciones que operan a escala",
			planEnterpriseBillingText: "Adaptado a tus necesidades",
			planEnterpriseCta: "Hablar con ventas",
			planEnterpriseF1: "Limites personalizados",
			planEnterpriseF2: "Opciones de infraestructura dedicada",
			planEnterpriseF3: "SSO/SAML",
			planEnterpriseF4: "Registros de auditoria",
			planEnterpriseF5: "Controles de seguridad avanzados",
			planEnterpriseF6: "Opciones de SLA",
			planEnterpriseF7: "Soporte dedicado",
			planEnterpriseF8: "Integraciones personalizadas",
			planEnterpriseF9: "Controles de datos y despliegue",
			planEnterpriseContextCapacity: "Personalizado",
			planEnterpriseProjects: "Ilimitado",
			promise1Title: "Sin tarifas ocultas",
			promise1Desc: "Precios transparentes sin cargos sorpresa ni excedentes.",
			promise2Title: "Cancela en cualquier momento",
			promise2Desc: "Sin contratos vinculantes. Cambia de plan cuando lo necesites.",
			promise3Title: "Flexibilidad basada en uso",
			promise3Desc: "Paga por lo que usas. Escala segun tus necesidades.",
			promise4Title: "Nivel gratuito para siempre",
			promise4Desc: "Nuestro plan inicial es gratuito. No se requiere tarjeta de credito.",
			coverage1Title: "Memoria",
			coverage1Desc: "Cuanto contexto persistente se puede almacenar en tu aplicacion.",
			coverage1Example: "ej. 10K - 1M+ memorias",
			coverage2Title: "Recuperacion",
			coverage2Desc: "Cuanto contexto se puede buscar y recuperar bajo demanda.",
			coverage2Example: "ej. 5K - 5M solicitudes/mes",
			coverage3Title: "Infraestructura",
			coverage3Desc: "Almacenamiento, computo y garantias de fiabilidad.",
			coverage3Example: "Compartida a Dedicada",
			coverage4Title: "Soporte",
			coverage4Desc: "Niveles de soporte comunitario, prioritario o de ingenieria dedicada.",
			coverage4Example: "Comunidad a Dedicado",
			catMemory: "MEMORIA",
			catRetrieval: "RECUPERACION",
			catPlatform: "PLATAFORMA",
			catInfrastructure: "INFRAESTRUCTURA",
			catSecurity: "SEGURIDAD",
			catSupport: "SOPORTE",
			rowMemoryStorage: "Almacenamiento de memoria",
			rowMemoryRetrieval: "Recuperacion de memoria",
			rowMemoryRetention: "Retencion de memoria",
			rowMemoryExport: "Exportacion de memoria",
			rowMetadataFiltering: "Filtrado de metadatos",
			rowMemoryHistory: "Historial de memoria",
			rowSemanticSearch: "Busqueda semantica",
			rowHybridRetrieval: "Recuperacion hibrida",
			rowReranking: "Reordenamiento",
			rowSearchFilters: "Filtros de busqueda",
			rowCustomRetrievalConfig: "Configuracion de recuperacion personalizada",
			rowApiAccess: "Acceso a API",
			rowProjects: "Proyectos",
			rowEnvironments: "Entornos",
			rowUsageAnalytics: "Analisis de uso",
			rowWebhooks: "Webhooks",
			rowManagedInfra: "Infraestructura gestionada",
			rowSelfHosted: "Despliegue autoalojado",
			rowCustomStorage: "Almacenamiento personalizado",
			rowDedicatedResources: "Recursos dedicados",
			rowDeploymentControls: "Controles de despliegue",
			rowApiKeys: "Claves de API",
			rowRbac: "RBAC",
			rowSsoSaml: "SSO/SAML",
			rowAuditLogs: "Registros de auditoria",
			rowSecurityControls: "Controles de seguridad",
			rowCommunitySupport: "Soporte comunitario",
			rowEmailSupport: "Soporte por email",
			rowPrioritySupport: "Soporte prioritario",
			rowDedicatedSupport: "Soporte dedicado",
			rowSla: "SLA",
			reason1Title: "Seguridad de nivel empresarial",
			reason1Desc: "Infraestructura con cumplimiento SOC 2, HIPAA y GDPR.",
			reason2Title: "Latencia de recuperacion sub-500ms",
			reason2Desc: "Memoria determinista en tiempo real para IA en produccion.",
			reason3Title: "50-90% menos tokens",
			reason3Desc: "Reduce drasticamente el uso de tokens con memoria determinista.",
			reason4Title: "#1 en MemBench",
			reason4Desc: "Rendimiento lider en benchmarks de memoria.",
			reason5Title: "Agnostico al modelo",
			reason5Desc: "Funciona con cualquier LLM, framework o stack de agentes.",
			reason6Title: "Propiedad total de datos",
			reason6Desc: "Tu memoria, tus datos, tu control. Siempre.",
			criticalCard1Title: "Seguridad",
			criticalCard1Desc: "SSO, controles de acceso y requisitos de auditoria para entornos regulados.",
			criticalCard2Title: "Escala",
			criticalCard2Desc: "Capacidad personalizada e infraestructura dedicada para cargas de trabajo exigentes.",
			criticalCard3Title: "Soporte",
			criticalCard3Desc: "Soporte prioritario de ingenieria y despliegue de nuestro equipo.",
			selfHostYourApp: "Tu Aplicacion",
			selfHostYourInfra: "Tu Infraestructura",
			faq1Q: "Hay un plan gratuito?",
			faq1A: "Si, el plan Explorar es gratuito para desarrolladores que experimentan con contexto persistente.",
			faq2Q: "Como se mide el uso?",
			faq2A: "El uso se mide en funcion del numero de usuarios activos, memorias almacenadas y operaciones de recuperacion cada mes.",
			faq3Q: "Que cuenta como operacion de memoria?",
			faq3A: "Una operacion de memoria incluye cualquier accion de crear, leer, actualizar o eliminar en tu almacen de memoria.",
			faq4Q: "Puedo cambiar de plan mas adelante?",
			faq4A: "Si! Puedes actualizar o rebajar tu plan en cualquier momento.",
			faq5Q: "Los limites no utilizados se acumulan?",
			faq5A: "No, los limites de uso no utilizados se reinician al comienzo de cada ciclo de facturacion.",
			faq6Q: "Puedo usar Negentro con mi propia infraestructura?",
			faq6A: "Si, puedes desplegar Negentro en tu propia infraestructura con nuestras ofertas.",
			faq7Q: "Que incluye el autoalojamiento?",
			faq7A: "El autoalojamiento incluye control total de despliegue, infraestructura personalizada y la posibilidad de usar tus propios proveedores de modelos.",
			faq8Q: "Ofrecen acuerdos empresariales?",
			faq8A: "Si, nuestro plan Empresarial incluye limites personalizados, SSO/SAML, registros de auditoria y soporte prioritario.",
			faq9Q: "Hay una opcion basada en uso?",
			faq9A: "Si, mas alla de los limites del plan base, puedes escalar dinamicamente con precios transparentes.",
			faq10Q: "Puedo exportar mis datos?",
			faq10A: "Absolutamente. Mantienes la propiedad total de los datos y puedes exportarlos en cualquier momento via nuestra API.",
			faq11Q: "Ofrecen soporte para despliegues en produccion?",
			faq11A: "Si, proporcionamos soporte prioritario para nuestros clientes de Escalar y Empresarial.",
		},
		waitPage: {
			loading: "La memoria se está cargando...",
			sublinePre: "Nuestro equipo está dando los toques finales a",
			sublineHighlight: "Negentro.",
		},
	},

	fr: {
		nav: {
			overview: "Aperçu",
			research: "Recherche",
			pricing: "Tarifs",
			initiatives: "Initiatives",
			resources: "Ressources",
			company: "Entreprise",
			tryPiyApi: "Essayer PiyAPI",
		},
		hero: {
			headlinePre: "La Prochaine Évolution De\nL'Intelligence Est La ",
			headlineMemory: "Mémoire.",
			subline: "Piyapi donne à l'IA la capacité de se souvenir, d'apprendre et d'évoluer.",
			emailPlaceholder: "Entrez votre email",
			joinWaitlist: "Rejoindre la Liste",
			joining: "Inscription...",
			successMsg: "Vous êtes sur la liste d'attente ! Nous vous contacterons bientôt.",
			duplicateMsg: "Vous êtes déjà sur la liste d'attente !",
			invalidEmailMsg: "Veuillez entrer une adresse email valide.",
		},
		partner: {
			supportedBy: "SOUTENU PAR DES PROGRAMMES MONDIAUX DE STARTUPS",
		},
		problem: {
			tag: "PROBLÈME",
			headlinePre: "L'IA Peut Raisonner.\nElle A Toujours Besoin De ",
			headlineMemory: "Mémoire.",
			subline:
				"L'IA peut raisonner sur le moment. Mais sans mémoire, elle peine à transmettre les connaissances, l'expérience et le contexte.",
			tab1Label: "Remplissage de Contexte",
			tab1CardTitle: "Remplissage de Contexte",
			tab1CardDesc:
				"Plus de contexte ne signifie pas une meilleure mémoire. À mesure que l'information croît, les coûts augmentent et les connaissances pertinentes deviennent plus difficiles à retrouver.",
			tab2Label: "Conteneurs de Mémoire IA",
			tab2CardTitle: "Conteneurs de Mémoire IA",
			tab2CardDesc:
				"Résumer les conversations réduit la taille du contexte mais peut faire perdre des faits exacts, des horodatages et la provenance.",
			tab3Label: "Mémoire Native du Modèle",
			tab3CardTitle: "Mémoire Native du Modèle",
			tab3CardDesc:
				"Les modèles peuvent se souvenir. Mais ils ne peuvent toujours pas garantir ce dont ils se souviennent, pourquoi ils s'en souviennent ou quand cela a changé.",
		},
		differentApproach: {
			tag: "SOLUTION",
			titlePre: "Une Approche Différente de la Mémoire ",
			titleHighlight: "IA.",
			sublinePre: "Conçu pour l'IA en production, ",
			sublineHighlight: "Piyapi",
			sublinePost:
				" préserve des connaissances exactes avec une récupération prévisible et une traçabilité vérifiable.",
			feat1Title: "Déterminisme",
			feat1Desc:
				"Récupération de mémoire prévisible et répétable pour des systèmes IA fiables.",
			feat2Title: "Fidélité",
			feat2Desc:
				"Préservez l'intégralité du contexte et des nuances sans perte ni compression.",
			feat3Title: "Traçabilité",
			feat3Desc:
				"Traçabilité complète de chaque élément de connaissance récupéré.",
			feat4Title: "Persistance",
			feat4Desc:
				"Continuité historique à long terme à travers les sessions et modèles.",
			feat5Title: "Propriété",
			feat5Desc:
				"Contrôle total de l'utilisateur et souveraineté sur les données privées de mémoire.",
			feat6Title: "Portabilité",
			feat6Desc:
				"Interopérabilité agnostique des modèles pour une migration d'infrastructure fluide.",
			quotePre: "La récupération n'est que la moitié du problème. L'IA en production a besoin de ",
			quoteHighlight: "mémoire",
			quotePost: " capable de préserver et de vérifier ce qu'elle sait.",
			sotaHeading: "Mémoire SOTA,\nMesurée.",
			sotaLine1: "Performances de pointe sur LongMemEval,",
			sotaLine2: "LoCoMo, ConvoMem avec un rappel rapide et",
			sotaLine3: "une utilisation de tokens considérablement réduite.",
			metric1Value: "#1",
			metric1Sublabel: "SUR MEMBENCH",
			metric1Line1: "EXPÉRIENCE IA",
			metric1Line2: "SUPÉRIEURE",
			metric2Value: "<500ms",
			metric2Sublabel: "LATENCE DE RAPPEL",
			metric2Line1: "MÉMOIRE EN",
			metric2Line2: "TEMPS RÉEL",
			metric3Value: "50-90%",
			metric3Sublabel: "DE TOKENS EN MOINS",
			metric3Line1: "IA À L'ÉCHELLE",
			metric3Line2: "DE L'ENTREPRISE",
			tableHeaderContext: "Remplissage de Contexte",
			tableHeaderWrapper: "Conteneur de Mémoire",
			tableHeaderNative: "Mémoire Native",
			tableRow1: "Préservation Exacte",
			tableRow2: "Indépendance du Modèle",
			tableRow3: "Traçabilité Vérifiable",
			tableRow4: "Gouvernance d'Entreprise",
		},
		workflows: {
			headlinePre: "Conçu pour Chaque ",
			headlineHighlight: "Flux IA.",
			sublineLine1:
				"Renforcez votre infrastructure spécialisée avec une gestion déterministe de la mémoire",
			sublineLine2:
				"optimisée pour les modèles de production à grande échelle et conscients du contexte.",
			card1Id: "01",
			card1Title: "Agents IA",
			card1Desc: "Mémoire persistante pour la prise de décision autonome et multi-étapes.",
			card2Id: "02",
			card2Title: "IA Conversationnelle",
			card2Desc:
				"Maintenez le contexte à long terme dans le support client, les ventes et les assistants personnels.",
			card3Id: "03",
			card3Title: "Systèmes RAG",
			card3Desc:
				"Récupérez des connaissances exactes avec une traçabilité déterministe plutôt qu'une simple similarité sémantique.",
			card4Id: "04",
			card4Title: "Connaissance d'Entreprise",
			card4Desc:
				"Préservez la mémoire organisationnelle entre les équipes, les documents et les flux de travail.",
			card5Id: "05",
			card5Title: "IA à Forts Enjeux",
			card5Desc:
				"Alimentez les systèmes juridiques, financiers, médicaux et réglementés où l'exactitude du rappel est primordiale.",
			card6Id: "06",
			card6Title: "Systèmes Multi-Agents",
			card6Desc:
				"Offrez une couche de mémoire persistante et partagée entre agents IA collaborateurs.",
		},
		code: {
			headline: "Intégrez Piyapi là où votre IA évolue déjà.",
			headlinePre: "Intégrez ",
			headlineHighlight: "Piyapi",
			headlinePost: " là où votre IA évolue déjà.",
			subline: "Une mémoire qui fonctionne avec n'importe quel modèle, framework ou stack d'agents.",
			tag01: "//01",
			sdkTitle: "SDK",
			sdkSubtitle: "SDKs natifs, APIs REST et intégrations aux frameworks IA",
			tag02: "//02",
			agentsTitle: "AGENTS IA",
			agentsSubtitle:
				"Permettez aux agents IA de se souvenir avec précision à travers chaque interaction et flux.",
			tag03: "//03",
			connectorsTitle: "CONNECTEURS",
			connectorsSubtitle: "Une source unique de vérité. Chaque application. Chaque modèle.",
			tag04: "//04",
			mcpTitle: "MCP",
			mcpSubtitle:
				"Permettez aux assistants de programmation de se souvenir des projets, discussions et décisions entre les sessions",
		},
		security: {
			tag: "CONFIDENTIALITÉ ET SÉCURITÉ",
			headlineData: "Données.",
			headlineMemory: "Mémoire.",
			headlineControl: "Contrôle.",
			subline1:
				"PiyAPI garde la mémoire IA privée, explicite et modifiable afin que vous contrôliez ce que votre IA",
			subline2: "retient, modifie et oublie.",
			card1Title: "Privé dès la conception",
			card1Desc:
				"Les connaissances sensibles restent chiffrées et isolées tout au long de leur cycle de vie.",
			card2Title: "Mémoire Explicite",
			card2Desc:
				"Chaque souvenir est adressable et auditable, sans être dissimulé dans les paramètres opaques du modèle.",
			card3Title: "Modifiable par Conception",
			card3Desc:
				"Corrigez, mettez à jour ou supprimez des souvenirs individuels sans altérer le modèle sous-jacent.",
			card4Title: "Transparence Totale",
			card4Desc:
				"Voyez ce que l'IA retient, d'où provient l'information et comment elle a évolué.",
			card5Title: "Mémoire contrôlée par l'utilisateur",
			card5Desc: "Contrôlez qui peut créer, lire, modifier, exporter ou supprimer la mémoire.",
		},
		research: {
			tag: "RECHERCHE ET BLOGS",
			headline: "Recherche & Perspectives",
			paper1Overlay: "Mémoire",
			paper1Title: "La Mémoire est la Couche Manquante de l'Intelligence",
			paper1Status: "Bientôt disponible",
			paper1Category: "Articles de Recherche",
			paper2Overlay: "Mémoire",
			paper2Title: "Mémoire Déterministe pour IA Probabiliste",
			paper2Status: "Bientôt disponible",
			paper2Category: "Expérimentations",
			paper3Overlay: "Mémoire",
			paper3Title: "Mesurer la Mémoire à Long Terme dans les Systèmes IA",
			paper3Status: "Bientôt disponible",
			paper3Category: "Ingénierie",
		},
		cta: {
			headline: "Bâtissez Avec Piyapi",
			subline:
				"Un cas d'usage en tête ? Échangez avec notre équipe et découvrez comment la mémoire déterministe s'intègre à votre stack IA.",
			talkButton: "Parler à l'Équipe",
			marqueeItems: [
				"IA Conversationnelle",
				"Mémoire IA Personnelle",
				"Connaissance d'Entreprise",
				"Systèmes Multi-Agents",
				"IA pour la Santé",
			],
		},
		calendly: {
			title: "Planifier une Démo avec Piyapi",
			loading: "Chargement du calendrier...",
			close: "Fermer la modal",
		},
		footer: {
			infrastructure: "Infrastructure pour une IA fiable.",
			moreAboutUs: "En savoir plus sur nous",
			devTitle: "Développeurs",
			devDocs: "Documentation",
			devApi: "Référence API",
			devMcp: "Intégration MCP",
			devCli: "Référence CLI",
			devTrust: "Centre de Confiance",
			devStatus: "Statut",
			prodTitle: "Produit",
			prodResearch: "Recherche",
			prodBlog: "Blog",
			prodIntegrations: "Intégrations",
			prodReleaseNotes: "Notes de version",
			prodGithub: "GitHub",
			compTitle: "Entreprise",
			compAbout: "À Propos de Nous",
			compContact: "Contactez-nous",
			compCareers: "Carrières",
			compStartup: "Programme Startups",
			compInvestors: "Investisseurs",
			compPricing: "Tarifs",
			usecasesTitle: "Cas d'Usage",
			useSupport: "Support Client",
			useHealth: "Santé",
			useEdu: "Éducation",
			useSales: "Ventes & CRM",
			useEcom: "E-Commerce",
			soc2: "SOC 2 Type I & Type II Prêt",
			gdpr: "Prêt pour RGPD",
			hipaa: "Prêt pour HIPAA",
			complianceTitle: "Conformité",
			contactTitle: "Contactez-nous",
			contactEmail: "ceo@negentro.tech",
			copyright: "© 2026 INFORAVIUM TECHNOLOGIES PRIVATE LIMITED",
			rightsReserved: "– Tous droits réservés",
			languagesLabel: "Langues",
		},
		pricing: {
			tag: "TARIFS",
			heroHeadline: "Infrastructure qui s'adapte à votre contexte.",
			heroSubline: "Commencez à construire avec une intelligence persistante, puis faites évoluer votre mémoire, votre récupération et votre infrastructure au fur et à mesure que votre application grandit.",
			billingLabel: "FACTURATION",
			billingMonthly: "Mensuel",
			billingYearly: "Annuel",
			billingSave: "Économisez 20%",
			includedLabel: "INCLUS",
			contextCapacityLabel: "CAPACITÉ DE CONTEXTE",
			retrievalsLabel: "Récupérations/mois",
			projectsLabel: "Projets",
			coverageHeadline: "Ce que votre plan couvre réellement",
			coverageSubline: "Chaque plan est construit sur les mêmes quatre dimensions d'infrastructure.",
			stepsPrototype: "Prototype",
			stepsProduction: "Production",
			stepsScale: "Mise à l'échelle",
			stepsEnterprise: "Entreprise",
			compareHeadline: "Comparez chaque fonctionnalité",
			compareSubline: "Voyez exactement comment chaque plan diffère avant de choisir.",
			capabilityLabel: "FONCTIONNALITÉ",
			recommendedLabel: "RECOMMANDÉ",
			calculatorHeadline: "Estimez votre utilisation mensuelle",
			calculatorSubline: "Dites-nous approximativement combien de contexte votre application traite et nous vous montrerons une fourchette de plan estimée.",
			mauLabel: "UTILISATEURS ACTIFS MENSUELS",
			memoriesPerUserLabel: "MÉMOIRES CRÉÉES PAR UTILISATEUR",
			retrievalRequestsLabel: "REQUÊTES DE RÉCUPÉRATION MENSUELLES",
			projectsCountLabel: "PROJETS",
			estimatedUsageLabel: "UTILISATION MENSUELLE ESTIMÉE",
			memoryOpsUnit: "opérations de mémoire",
			suggestedPlanLabel: "PLAN SUGGÉRÉ",
			estimatedPriceLabel: "PRIX ESTIMÉ",
			calculatorCta: "Commencer à construire",
			calculatorDisclaimer: "L'utilisation réelle et les tarifs peuvent varier selon la configuration et les exigences d'infrastructure.",
			selfHostHeadline: "Préférez-vous l'héberger vous-même ?",
			selfHostSubline: "Déployez Negentro sur votre propre infrastructure et choisissez les composants, le stockage et les fournisseurs de modèles adaptés à votre environnement.",
			selfHostExplore: "Explorer l'Open Source",
			criticalHeadline: "Pour les équipes qui construisent des systèmes IA critiques.",
			criticalSubline: "Parlez avec l'équipe Negentro des exigences de déploiement, de sécurité, d'échelle, de support et d'infrastructure personnalisée.",
			criticalCta: "Parler aux ventes",
			faqHeadline: "Questions fréquemment posées",
			finalCtaHeadline: "Commencez à construire avec une intelligence persistante.",
			finalCtaSubline: "Commencez avec le niveau gratuit et montez en charge quand votre application a besoin de plus de contexte.",
			finalCtaStart: "Commencer à construire",
			finalCtaDocs: "Lire la documentation",
			planExploreName: "Explorer",
			planBuildBadge: "LE PLUS POPULAIRE",
			planBuildName: "Construire",
			planScaleName: "Mise a l'echelle",
			planEnterpriseName: "Entreprise",
			planExploreDesc: "Pour experimenter avec un contexte persistant",
			planExploreBillingText: "Pour les developpeurs qui debutent",
			planExploreCta: "Commencer a construire",
			planExploreF1: "Stockage de memoire limite",
			planExploreF2: "Recuperation de base",
			planExploreF3: "API developpeur",
			planExploreF4: "Support communautaire",
			planExploreF5: "Analytique utilisation de base",
			planBuildDesc: "Pour les applications en production",
			planBuildBillingText: "Facture mensuellement ou annuellement",
			planBuildCta: "Commencer a construire",
			planBuildF1: "Capacite de memoire accrue",
			planBuildF2: "Utilisation API plus elevee",
			planBuildF3: "Recuperation avancee",
			planBuildF4: "Filtrage de metadonnees",
			planBuildF5: "Contexte au niveau du projet",
			planBuildF6: "Analytique utilisation",
			planBuildF7: "Support developpeur",
			planScaleDesc: "Pour les applications IA a haut volume",
			planScaleBillingText: "Facture mensuellement ou annuellement",
			planScaleCta: "Commencer a evoluer",
			planScaleF1: "Limites de memoire elevees",
			planScaleF2: "Volume API eleve",
			planScaleF3: "Recuperation avancee",
			planScaleF4: "Projets multiples",
			planScaleF5: "Collaboration en equipe",
			planScaleF6: "Analytique avancee",
			planScaleF7: "Support prioritaire",
			planScaleF8: "Retention plus longue",
			planEnterpriseDesc: "Pour les organisations operant a grande echelle",
			planEnterpriseBillingText: "Adapte a vos besoins",
			planEnterpriseCta: "Parler aux ventes",
			planEnterpriseF1: "Limites personnalisees",
			planEnterpriseF2: "Options infrastructure dediee",
			planEnterpriseF3: "SSO/SAML",
			planEnterpriseF4: "Journaux audit",
			planEnterpriseF5: "Controles securite avances",
			planEnterpriseF6: "Options SLA",
			planEnterpriseF7: "Support dedie",
			planEnterpriseF8: "Integrations personnalisees",
			planEnterpriseF9: "Controles donnees et deploiement",
			planEnterpriseContextCapacity: "Personnalise",
			planEnterpriseProjects: "Illimite",
			promise1Title: "Pas de frais caches",
			promise1Desc: "Tarification transparente sans frais surprises ni depassements.",
			promise2Title: "Annulez a tout moment",
			promise2Desc: "Pas de contrats restrictifs. Changez de formule ou annulez quand vous voulez.",
			promise3Title: "Flexibilite basee sur utilisation",
			promise3Desc: "Payez ce que vous utilisez. Montez ou descendez selon vos besoins.",
			promise4Title: "Niveau gratuit pour toujours",
			promise4Desc: "Notre plan de demarrage est gratuit pour toujours. Aucune carte de credit requise.",
			coverage1Title: "Memoire",
			coverage1Desc: "Combien de contexte persistant peut etre stocke dans votre application.",
			coverage1Example: "ex. 10K - 1M+ memoires",
			coverage2Title: "Recuperation",
			coverage2Desc: "Combien de contexte peut etre recherche et recupere a la demande.",
			coverage2Example: "ex. 5K - 5M requetes/mois",
			coverage3Title: "Infrastructure",
			coverage3Desc: "Stockage, calcul, topologie de deploiement et garanties de fiabilite.",
			coverage3Example: "Partagee a Dediee",
			coverage4Title: "Support",
			coverage4Desc: "Niveaux de support communautaire, prioritaire ou ingenierie dediee.",
			coverage4Example: "Communaute a Dedie",
			catMemory: "MEMOIRE",
			catRetrieval: "RECUPERATION",
			catPlatform: "PLATEFORME",
			catInfrastructure: "INFRASTRUCTURE",
			catSecurity: "SECURITE",
			catSupport: "SUPPORT",
			rowMemoryStorage: "Stockage de memoire",
			rowMemoryRetrieval: "Recuperation de memoire",
			rowMemoryRetention: "Retention de memoire",
			rowMemoryExport: "Export de memoire",
			rowMetadataFiltering: "Filtrage de metadonnees",
			rowMemoryHistory: "Historique de memoire",
			rowSemanticSearch: "Recherche semantique",
			rowHybridRetrieval: "Recuperation hybride",
			rowReranking: "Reordonnancement",
			rowSearchFilters: "Filtres de recherche",
			rowCustomRetrievalConfig: "Configuration recuperation personnalisee",
			rowApiAccess: "Acces API",
			rowProjects: "Projets",
			rowEnvironments: "Environnements",
			rowUsageAnalytics: "Analytique utilisation",
			rowWebhooks: "Webhooks",
			rowManagedInfra: "Infrastructure geree",
			rowSelfHosted: "Deploiement auto-heberge",
			rowCustomStorage: "Stockage personnalise",
			rowDedicatedResources: "Ressources dediees",
			rowDeploymentControls: "Controles de deploiement",
			rowApiKeys: "Cles API",
			rowRbac: "RBAC",
			rowSsoSaml: "SSO/SAML",
			rowAuditLogs: "Journaux audit",
			rowSecurityControls: "Controles de securite",
			rowCommunitySupport: "Support communautaire",
			rowEmailSupport: "Support par email",
			rowPrioritySupport: "Support prioritaire",
			rowDedicatedSupport: "Support dedie",
			rowSla: "SLA",
			reason1Title: "Securite de niveau entreprise",
			reason1Desc: "Infrastructure conforme SOC 2, HIPAA et RGPD.",
			reason2Title: "Latence de rappel sub-500ms",
			reason2Desc: "Memoire deterministe en temps reel pour IA en production.",
			reason3Title: "50-90% moins de tokens",
			reason3Desc: "Reduisez considerablement utilisation des tokens avec memoire deterministe.",
			reason4Title: "#1 sur MemBench",
			reason4Desc: "Performances de pointe sur les benchmarks de memoire.",
			reason5Title: "Agnostique au modele",
			reason5Desc: "Fonctionne avec tout LLM, framework ou stack agents.",
			reason6Title: "Propriete totale des donnees",
			reason6Desc: "Votre memoire, vos donnees, votre controle. Toujours.",
			criticalCard1Title: "Securite",
			criticalCard1Desc: "SSO, controles acces et exigences audit pour environnements reglementes.",
			criticalCard2Title: "Mise a echelle",
			criticalCard2Desc: "Capacite personnalisee et infrastructure dediee pour charges de travail exigeantes.",
			criticalCard3Title: "Support",
			criticalCard3Desc: "Support prioritaire ingenierie et deploiement de notre equipe.",
			selfHostYourApp: "Votre Application",
			selfHostYourInfra: "Votre Infrastructure",
			faq1Q: "Y a-t-il un plan gratuit?",
			faq1A: "Oui, le plan Explorer est gratuit et concu pour les developpeurs experimentant avec un contexte persistant.",
			faq2Q: "Comment utilisation est-elle mesuree?",
			faq2A: "Utilisation est mesuree en fonction du nombre utilisateurs actifs, memoires stockees et operations de recuperation chaque mois.",
			faq3Q: "Qu est-ce qui compte comme operation de memoire?",
			faq3A: "Une operation de memoire inclut toute action creation, lecture, mise a jour ou suppression sur votre memoire.",
			faq4Q: "Puis-je changer de formule?",
			faq4A: "Oui! Vous pouvez mettre a niveau ou retrograder votre formule a tout moment.",
			faq5Q: "Les limites non utilisees sont-elles reportees?",
			faq5A: "Non, les limites utilisation non utilisees se reinitalisent au debut de chaque cycle de facturation.",
			faq6Q: "Puis-je utiliser Negentro avec ma propre infrastructure?",
			faq6A: "Oui, vous pouvez deployer Negentro sur votre propre infrastructure avec nos offres open-source ou entreprise.",
			faq7Q: "Qu est-ce qui est inclus dans auto-hebergement?",
			faq7A: "L auto-hebergement inclut le controle total du deploiement, infrastructure personnalisee et vos propres fournisseurs de modeles.",
			faq8Q: "Proposez-vous des accords entreprise?",
			faq8A: "Oui, notre formule Entreprise inclut des limites personnalisees, SSO/SAML, des journaux audit et un support deploiement prioritaire.",
			faq9Q: "Y a-t-il une option basee sur utilisation?",
			faq9A: "Oui, au-dela des limites de base du plan, vous pouvez evoluer dynamiquement avec une tarification transparente.",
			faq10Q: "Puis-je exporter mes donnees?",
			faq10A: "Absolument. Vous conservez la pleine propriete de vos donnees et pouvez les exporter a tout moment via notre API.",
			faq11Q: "Proposez-vous du support pour les deploiements en production?",
			faq11A: "Oui, nous fournissons un support prioritaire ingenierie et deploiement pour nos clients.",
		},
		waitPage: {
			loading: "La mémoire est en cours de chargement...",
			sublinePre: "Notre équipe apporte les dernières touches à",
			sublineHighlight: "Negentro.",
		},
	},

	de: {
		nav: {
			overview: "Übersicht",
			research: "Forschung",
			pricing: "Preise",
			initiatives: "Initiativen",
			resources: "Ressourcen",
			company: "Unternehmen",
			tryPiyApi: "PiyAPI Ausprobieren",
		},
		hero: {
			headlinePre: "Die Nächste Evolution Der\nIntelligenz Ist ",
			headlineMemory: "Gedächtnis.",
			subline: "Piyapi gibt KI die Fähigkeit zu erinnern, zu lernen und sich zu entwickeln.",
			emailPlaceholder: "Geben Sie Ihre E-Mail ein",
			joinWaitlist: "Warteliste Beitreten",
			joining: "Beitreten...",
			successMsg: "Sie stehen auf der Warteliste! Wir melden uns in Kürze.",
			duplicateMsg: "Sie stehen bereits auf der Warteliste!",
			invalidEmailMsg: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
		},
		partner: {
			supportedBy: "UNTERSTÜTZT VON GLOBALEN STARTUP-PROGRAMMEN",
		},
		problem: {
			tag: "PROBLEM",
			headlinePre: "KI Kann Schlussfolgern.\nSie Braucht Immer Noch ",
			headlineMemory: "Gedächtnis.",
			subline:
				"KI kann im Moment schlussfolgern. Doch ohne Gedächtnis fällt es ihr schwer, Wissen, Erfahrung und Kontext weiterzutragen.",
			tab1Label: "Kontext-Überladung",
			tab1CardTitle: "Kontext-Überladung",
			tab1CardDesc:
				"Mehr Kontext bedeutet nicht besseres Gedächtnis. Mit wachsender Information steigen Kosten und relevantes Wissen wird schwerer abrufbar.",
			tab2Label: "KI-Gedächtnis-Wrapper",
			tab2CardTitle: "KI-Gedächtnis-Wrapper",
			tab2CardDesc:
				"Zusammenfassungen reduzieren die Kontextgröße, können jedoch exakte Fakten, Zeitstempel und Herkunft verlieren.",
			tab3Label: "Natives Modell-Gedächtnis",
			tab3CardTitle: "Natives Modell-Gedächtnis",
			tab3CardDesc:
				"Modelle können sich erinnern. Aber sie können nicht garantieren, woran sie sich erinnern, warum oder wann es sich geändert hat.",
		},
		differentApproach: {
			tag: "LÖSUNG",
			titlePre: "Ein Anderer Ansatz für KI-",
			titleHighlight: "Gedächtnis.",
			sublinePre: "Entwickelt für produktive KI, ",
			sublineHighlight: "Piyapi",
			sublinePost:
				" bewahrt exaktes Wissen mit vorhersagbarem Abruf und überprüfbarer Herkunft.",
			feat1Title: "Determinismus",
			feat1Desc:
				"Vorhersehbarer und wiederholbarer Speicherabruf für zuverlässige KI-Systeme.",
			feat2Title: "Treue",
			feat2Desc:
				"Vollständigen Kontext und Feinheiten von Daten ohne Verlust oder Komprimierung bewahren.",
			feat3Title: "Herkunft",
			feat3Desc:
				"Vollständige Rückverfolgbarkeit für jedes abgerufene Wissenselement.",
			feat4Title: "Persistenz",
			feat4Desc:
				"Langfristige historische Kontinuität über Sitzungen und Modelle hinweg.",
			feat5Title: "Eigentum",
			feat5Desc:
				"Volle Nutzerkontrolle und Souveränität über private Speicherdaten.",
			feat6Title: "Portabilität",
			feat6Desc:
				"Modellagnostische Interoperabilität für nahtlose Infrastrukturmigration.",
			quotePre: "Retrieval ist nur die halbe Miete. Produktive KI braucht ",
			quoteHighlight: "Gedächtnis",
			quotePost: ", das bewahren und verifizieren kann, was es weiß.",
			sotaHeading: "SOTA Gedächtnis,\nGemessen.",
			sotaLine1: "Führende Leistung bei LongMemEval,",
			sotaLine2: "LoCoMo, ConvoMem mit schnellem Abruf und",
			sotaLine3: "drastisch reduziertem Token-Verbrauch.",
			metric1Value: "#1",
			metric1Sublabel: "AUF MEMBENCH",
			metric1Line1: "ÜBERRAGENDE KI-",
			metric1Line2: "ERFAHRUNG",
			metric2Value: "<500ms",
			metric2Sublabel: "ABRUFLATENZ",
			metric2Line1: "ECHTZEIT-",
			metric2Line2: "GEDÄCHTNIS",
			metric3Value: "50-90%",
			metric3Sublabel: "WENIGER TOKENS",
			metric3Line1: "KI AUF",
			metric3Line2: "ENTERPRISE-EBENE",
			tableHeaderContext: "Kontext-Überladung",
			tableHeaderWrapper: "Gedächtnis-Wrapper",
			tableHeaderNative: "Natives Gedächtnis",
			tableRow1: "Exakte Bewahrung",
			tableRow2: "Modellunabhängigkeit",
			tableRow3: "Überprüfbare Herkunft",
			tableRow4: "Unternehmens-Governance",
		},
		workflows: {
			headlinePre: "Entwickelt für Jeden ",
			headlineHighlight: "KI-Workflow.",
			sublineLine1:
				"Stärken Sie Ihre spezialisierte Infrastruktur mit deterministischem Gedächtnis",
			sublineLine2:
				"optimiert für hochskalierbare, kontextbewusste Produktionsmodelle.",
			card1Id: "01",
			card1Title: "KI-Agenten",
			card1Desc: "Persistentes Gedächtnis für autonome, mehrstufige Entscheidungsfindung.",
			card2Id: "02",
			card2Title: "Konversationelle KI",
			card2Desc:
				"Langzeitkontext im Kundensupport, Vertrieb und bei persönlichen Assistenten sichern.",
			card3Id: "03",
			card3Title: "RAG-Systeme",
			card3Desc:
				"Exaktes Wissen mit deterministischer Herkunft statt reiner semantischer Ähnlichkeit abrufen.",
			card4Id: "04",
			card4Title: "Unternehmenswissen",
			card4Desc:
				"Organisationswissen über Teams, Dokumente und Arbeitsabläufe hinweg bewahren.",
			card5Id: "05",
			card5Title: "Hochkritische KI",
			card5Desc:
				"Für juristische, finanzielle, medizinische und regulierte Systeme, bei denen exakter Abruf zählt.",
			card6Id: "06",
			card6Title: "Multi-Agenten-Systeme",
			card6Desc:
				"Eine gemeinsame, persistente Gedächtnisschicht für kollaborierende KI-Agenten bereitstellen.",
		},
		code: {
			headline: "Integrieren Sie Piyapi dort, wo Ihre KI bereits arbeitet.",
			headlinePre: "Integrieren Sie ",
			headlineHighlight: "Piyapi",
			headlinePost: " dort, wo Ihre KI bereits arbeitet.",
			subline: "Gedächtnis, das mit jedem Modell, Framework oder Agenten-Stack funktioniert.",
			tag01: "//01",
			sdkTitle: "SDK",
			sdkSubtitle: "Native SDKs, REST-APIs und KI-Framework-Integrationen",
			tag02: "//02",
			agentsTitle: "KI-AGENTEN",
			agentsSubtitle:
				"Ermöglichen Sie KI-Agenten, sich über jede Interaktion und jeden Workflow hinweg präzise zu erinnern.",
			tag03: "//03",
			connectorsTitle: "KONNEKTOREN",
			connectorsSubtitle: "Eine einzige Quelle der Wahrheit. Jede Anwendung. Jedes Modell.",
			tag04: "//04",
			mcpTitle: "MCP",
			mcpSubtitle:
				"Ermöglichen Sie Coding-Assistenten, sich über Sitzungen hinweg an Projekte, Gespräche und Entscheidungen zu erinnern",
		},
		security: {
			tag: "DATENSCHUTZ & SICHERHEIT",
			headlineData: "Daten.",
			headlineMemory: "Gedächtnis.",
			headlineControl: "Kontrolle.",
			subline1:
				"PiyAPI hält KI-Gedächtnis privat, explizit und editierbar, damit Sie die Kontrolle darüber behalten, was Ihre KI",
			subline2: "erinnert, ändert und vergisst.",
			card1Title: "Von Grund auf Privat",
			card1Desc:
				"Sensibles Wissen bleibt über den gesamten Lebenszyklus hinweg verschlüsselt und isoliert.",
			card2Title: "Explizites Gedächtnis",
			card2Desc:
				"Jede Erinnerung ist adressierbar und auditierbar, nicht in undurchsichtigen Modellparametern verborgen.",
			card3Title: "Editierbar durch Design",
			card3Desc:
				"Korrigieren, aktualisieren oder löschen Sie einzelne Erinnerungen, ohne das Modell zu verändern.",
			card4Title: "Volle Transparenz",
			card4Desc:
				"Sehen Sie, woran sich die KI erinnert, woher die Daten stammen und wie sie sich verändert haben.",
			card5Title: "Nutzergesteuertes Gedächtnis",
			card5Desc: "Steuern Sie, wer Erinnerungen erstellen, lesen, aktualisieren, exportieren oder löschen darf.",
		},
		research: {
			tag: "FORSCHUNG & BLOGS",
			headline: "Forschung & Einblicke",
			paper1Overlay: "Gedächtnis",
			paper1Title: "Gedächtnis ist die Fehlende Schicht der Intelligenz",
			paper1Status: "Demnächst",
			paper1Category: "Forschungsberichte",
			paper2Overlay: "Gedächtnis",
			paper2Title: "Deterministisches Gedächtnis für Probabilistische KI",
			paper2Status: "Demnächst",
			paper2Category: "Experimente",
			paper3Overlay: "Gedächtnis",
			paper3Title: "Messung des Langzeitgedächtnisses in KI-Systemen",
			paper3Status: "Demnächst",
			paper3Category: "Ingenieurwesen",
		},
		cta: {
			headline: "Bauen Sie Mit Piyapi",
			subline:
				"Haben Sie einen Anwendungsfall im Kopf? Sprechen Sie mit unserem Team und entdecken Sie, wo deterministisches Gedächtnis in Ihren KI-Stack passt.",
			talkButton: "Mit dem Team Sprechen",
			marqueeItems: [
				"Konversationelle KI",
				"Persönliches KI-Gedächtnis",
				"Unternehmenswissen",
				"Multi-Agenten-Systeme",
				"Gesundheits-KI",
			],
		},
		calendly: {
			title: "Demo mit Piyapi Vereinbaren",
			loading: "Kalenderansicht wird geladen...",
			close: "Modal schließen",
		},
		footer: {
			infrastructure: "Infrastruktur für zuverlässige KI.",
			moreAboutUs: "Mehr über uns",
			devTitle: "Entwickler",
			devDocs: "Entwickler-Dokumentation",
			devApi: "API-Referenz",
			devMcp: "MCP-Integration",
			devCli: "CLI-Referenz",
			devTrust: "Trust Center",
			devStatus: "Status",
			prodTitle: "Produkt",
			prodResearch: "Forschung",
			prodBlog: "Blog",
			prodIntegrations: "Integrationen",
			prodReleaseNotes: "Versionshinweise",
			prodGithub: "GitHub",
			compTitle: "Unternehmen",
			compAbout: "Über Uns",
			compContact: "Kontaktieren Sie Uns",
			compCareers: "Karriere",
			compStartup: "Startup-Programm",
			compInvestors: "Investoren",
			compPricing: "Preise",
			usecasesTitle: "Anwendungsfälle",
			useSupport: "Kundensupport",
			useHealth: "Gesundheitswesen",
			useEdu: "Bildung",
			useSales: "Vertrieb & CRM",
			useEcom: "E-Commerce",
			soc2: "SOC 2 Typ I & Typ II Bereit",
			gdpr: "DSGVO Bereit",
			hipaa: "HIPAA Bereit",
			complianceTitle: "Compliance",
			contactTitle: "Kontaktieren Sie Uns",
			contactEmail: "ceo@negentro.tech",
			copyright: "© 2026 INFORAVIUM TECHNOLOGIES PRIVATE LIMITED",
			rightsReserved: "– Alle Rechte vorbehalten",
			languagesLabel: "Sprachen",
		},
		pricing: {
			tag: "PREISE",
			heroHeadline: "Infrastruktur, die mit Ihrem Kontext skaliert.",
			heroSubline: "Beginnen Sie mit persistenter Intelligenz und skalieren Sie Ihr Gedächtnis, Ihre Abfragen und Infrastruktur, wenn Ihre Anwendung wächst.",
			billingLabel: "ABRECHNUNG",
			billingMonthly: "Monatlich",
			billingYearly: "Jährlich",
			billingSave: "20% sparen",
			includedLabel: "ENTHALTEN",
			contextCapacityLabel: "KONTEXTKAPAZITÄT",
			retrievalsLabel: "Abrufe/Monat",
			projectsLabel: "Projekte",
			coverageHeadline: "Was Ihr Plan tatsächlich abdeckt",
			coverageSubline: "Jeder Plan basiert auf denselben vier Infrastrukturdimensionen.",
			stepsPrototype: "Prototyp",
			stepsProduction: "Produktion",
			stepsScale: "Skalierung",
			stepsEnterprise: "Enterprise",
			compareHeadline: "Alle Funktionen vergleichen",
			compareSubline: "Sehen Sie genau, wie sich jeder Plan unterscheidet, bevor Sie wählen.",
			capabilityLabel: "FUNKTION",
			recommendedLabel: "EMPFOHLEN",
			calculatorHeadline: "Schätzen Sie Ihre monatliche Nutzung",
			calculatorSubline: "Sagen Sie uns ungefähr, wie viel Kontext Ihre Anwendung verarbeitet, und wir zeigen Ihnen einen geschätzten Planbereich.",
			mauLabel: "MONATLICH AKTIVE NUTZER",
			memoriesPerUserLabel: "ERSTELLTE ERINNERUNGEN PRO NUTZER",
			retrievalRequestsLabel: "MONATLICHE ABRUFANFRAGEN",
			projectsCountLabel: "PROJEKTE",
			estimatedUsageLabel: "GESCHÄTZTE MONATLICHE NUTZUNG",
			memoryOpsUnit: "Gedächtnisoperationen",
			suggestedPlanLabel: "EMPFOHLENER PLAN",
			estimatedPriceLabel: "GESCHÄTZTER PREIS",
			calculatorCta: "Mit dem Aufbau beginnen",
			calculatorDisclaimer: "Tatsächliche Nutzung und Preise können je nach Konfiguration und Infrastrukturanforderungen variieren.",
			selfHostHeadline: "Bevorzugen Sie die Eigenverantwortung?",
			selfHostSubline: "Stellen Sie Negentro auf Ihrer eigenen Infrastruktur bereit und wählen Sie die Komponenten, Speicher und Modellanbieter, die zu Ihrer Umgebung passen.",
			selfHostExplore: "Open Source erkunden",
			criticalHeadline: "Für Teams, die kritische KI-Systeme entwickeln.",
			criticalSubline: "Sprechen Sie mit dem Negentro-Team über Bereitstellungsanforderungen, Sicherheit, Skalierung, Support und benutzerdefinierte Infrastruktur.",
			criticalCta: "Mit Vertrieb sprechen",
			faqHeadline: "Häufig gestellte Fragen",
			finalCtaHeadline: "Mit persistenter Intelligenz aufbauen.",
			finalCtaSubline: "Beginnen Sie mit dem kostenlosen Tarif und skalieren Sie, wenn Ihre Anwendung mehr Kontext benötigt.",
			finalCtaStart: "Mit dem Aufbau beginnen",
			finalCtaDocs: "Dokumentation lesen",
			planExploreName: "Erkunden",
			planBuildBadge: "AM BELIEBTESTEN",
			planBuildName: "Aufbauen",
			planScaleName: "Skalieren",
			planEnterpriseName: "Enterprise",
			planExploreDesc: "Zum Experimentieren mit persistentem Kontext",
			planExploreBillingText: "Fuer Entwickler, die anfangen",
			planExploreCta: "Mit dem Aufbau beginnen",
			planExploreF1: "Begrenzter Speicher",
			planExploreF2: "Grundlegendes Abrufen",
			planExploreF3: "Entwickler-API",
			planExploreF4: "Community-Support",
			planExploreF5: "Grundlegende Nutzungsanalyse",
			planBuildDesc: "Fuer Produktionsanwendungen",
			planBuildBillingText: "Monatlich oder jaehrlich abgerechnet",
			planBuildCta: "Mit dem Aufbau beginnen",
			planBuildF1: "Erhoehte Speicherkapazitaet",
			planBuildF2: "Hoeheres API-Volumen",
			planBuildF3: "Erweitertes Abrufen",
			planBuildF4: "Metadaten-Filterung",
			planBuildF5: "Kontext auf Projektebene",
			planBuildF6: "Nutzungsanalyse",
			planBuildF7: "Entwickler-Support",
			planScaleDesc: "Fuer KI-Anwendungen mit hohem Volumen",
			planScaleBillingText: "Monatlich oder jaehrlich abgerechnet",
			planScaleCta: "Skalierung starten",
			planScaleF1: "Hohe Speicherlimits",
			planScaleF2: "Hohes API-Volumen",
			planScaleF3: "Erweitertes Abrufen",
			planScaleF4: "Mehrere Projekte",
			planScaleF5: "Team-Zusammenarbeit",
			planScaleF6: "Erweiterte Analysen",
			planScaleF7: "Priority-Support",
			planScaleF8: "Hoehere Aufbewahrung",
			planEnterpriseDesc: "Fuer Organisationen, die in grossem Massstab arbeiten",
			planEnterpriseBillingText: "Auf Ihre Beduerfnisse zugeschnitten",
			planEnterpriseCta: "Mit Vertrieb sprechen",
			planEnterpriseF1: "Benutzerdefinierte Limits",
			planEnterpriseF2: "Dedizierte Infrastrukturoptionen",
			planEnterpriseF3: "SSO/SAML",
			planEnterpriseF4: "Audit-Protokolle",
			planEnterpriseF5: "Erweiterte Sicherheitskontrollen",
			planEnterpriseF6: "SLA-Optionen",
			planEnterpriseF7: "Dedizierter Support",
			planEnterpriseF8: "Benutzerdefinierte Integrationen",
			planEnterpriseF9: "Daten- und Bereitstellungskontrollen",
			planEnterpriseContextCapacity: "Benutzerdefiniert",
			planEnterpriseProjects: "Unbegrenzt",
			promise1Title: "Keine versteckten Gebuehren",
			promise1Desc: "Transparente Preisgestaltung ohne unerwartete Kosten oder Ueberschreitungen.",
			promise2Title: "Jederzeit kuendigen",
			promise2Desc: "Keine Vertragsbindung. Stufen Sie ab oder kuendigen Sie, wann immer Sie moechten.",
			promise3Title: "Nutzungsbasierte Flexibilitaet",
			promise3Desc: "Zahlen Sie nur fuer das, was Sie nutzen. Skalieren Sie nach oben oder unten.",
			promise4Title: "Kostenloses Tier fuer immer",
			promise4Desc: "Unser Starterplan ist fuer immer kostenlos. Keine Kreditkarte erforderlich.",
			coverage1Title: "Gedaechtnis",
			coverage1Desc: "Wie viel persistenter Kontext in Ihrer Anwendung gespeichert werden kann.",
			coverage1Example: "z.B. 10K - 1M+ Erinnerungen",
			coverage2Title: "Abruf",
			coverage2Desc: "Wie viel Kontext auf Anfrage gesucht und abgerufen werden kann.",
			coverage2Example: "z.B. 5K - 5M Anfragen/Monat",
			coverage3Title: "Infrastruktur",
			coverage3Desc: "Speicher, Rechenleistung, Bereitstellungstopologie und Zuverlaessigkeitsgarantien.",
			coverage3Example: "Geteilt zu Dediziert",
			coverage4Title: "Support",
			coverage4Desc: "Community-, Prioritaets- oder dedizierter Engineering-Support.",
			coverage4Example: "Community zu Dediziert",
			catMemory: "GEDAECHTNIS",
			catRetrieval: "ABRUF",
			catPlatform: "PLATTFORM",
			catInfrastructure: "INFRASTRUKTUR",
			catSecurity: "SICHERHEIT",
			catSupport: "SUPPORT",
			rowMemoryStorage: "Gedaechnisspeicher",
			rowMemoryRetrieval: "Gedaechnisabruf",
			rowMemoryRetention: "Gedaechnisaufbewahrung",
			rowMemoryExport: "Gedaechnisexport",
			rowMetadataFiltering: "Metadaten-Filterung",
			rowMemoryHistory: "Gedaechnishistorie",
			rowSemanticSearch: "Semantische Suche",
			rowHybridRetrieval: "Hybrider Abruf",
			rowReranking: "Neuordnung",
			rowSearchFilters: "Suchfilter",
			rowCustomRetrievalConfig: "Benutzerdefinierte Abrufkonfiguration",
			rowApiAccess: "API-Zugang",
			rowProjects: "Projekte",
			rowEnvironments: "Umgebungen",
			rowUsageAnalytics: "Nutzungsanalyse",
			rowWebhooks: "Webhooks",
			rowManagedInfra: "Verwaltete Infrastruktur",
			rowSelfHosted: "Selbst gehostete Bereitstellung",
			rowCustomStorage: "Benutzerdefinierter Speicher",
			rowDedicatedResources: "Dedizierte Ressourcen",
			rowDeploymentControls: "Bereitstellungskontrollen",
			rowApiKeys: "API-Schluessel",
			rowRbac: "RBAC",
			rowSsoSaml: "SSO/SAML",
			rowAuditLogs: "Audit-Protokolle",
			rowSecurityControls: "Sicherheitskontrollen",
			rowCommunitySupport: "Community-Support",
			rowEmailSupport: "E-Mail-Support",
			rowPrioritySupport: "Prioritaets-Support",
			rowDedicatedSupport: "Dedizierter Support",
			rowSla: "SLA",
			reason1Title: "Sicherheit auf Enterprise-Niveau",
			reason1Desc: "SOC 2, HIPAA und DSGVO-konforme Infrastruktur.",
			reason2Title: "Abruflatenz unter 500ms",
			reason2Desc: "Echtzeit-deterministisches Gedaechtnis fuer Produktions-KI.",
			reason3Title: "50-90% weniger Tokens",
			reason3Desc: "Reduzieren Sie den Token-Verbrauch drastisch mit deterministischem Gedaechtnis.",
			reason4Title: "#1 bei MemBench",
			reason4Desc: "Fuehrende Leistung bei Gedaechtnis-Benchmarks.",
			reason5Title: "Modell-agnostisch",
			reason5Desc: "Funktioniert mit jedem LLM, Framework oder Agenten-Stack.",
			reason6Title: "Vollstaendige Dateneigentuemeschaft",
			reason6Desc: "Ihr Gedaechtnis, Ihre Daten, Ihre Kontrolle. Immer.",
			criticalCard1Title: "Sicherheit",
			criticalCard1Desc: "SSO, Zugriffskontrollen und Audit-Anforderungen fuer regulierte Umgebungen.",
			criticalCard2Title: "Skalierung",
			criticalCard2Desc: "Benutzerdefinierte Kapazitaet und dedizierte Infrastruktur fuer anspruchsvolle Workloads.",
			criticalCard3Title: "Support",
			criticalCard3Desc: "Prioritaets-Engineering- und Bereitstellungs-Support von unserem Team.",
			selfHostYourApp: "Ihre Anwendung",
			selfHostYourInfra: "Ihre Infrastruktur",
			faq1Q: "Gibt es einen kostenlosen Plan?",
			faq1A: "Ja, der Erkunden-Plan ist kostenlos und fuer Entwickler konzipiert, die mit persistentem Kontext experimentieren.",
			faq2Q: "Wie wird die Nutzung gemessen?",
			faq2A: "Die Nutzung wird anhand der Anzahl aktiver Benutzer, gespeicherter Erinnerungen und Abrufoperationen pro Monat gemessen.",
			faq3Q: "Was zaehlt als Gedaechnisoperation?",
			faq3A: "Eine Gedaechnisoperation umfasst jede Erstellungs-, Lese-, Aktualisierungs- oder Loeschaktion in Ihrem Gedaechnisspeicher.",
			faq4Q: "Kann ich spaeter den Plan wechseln?",
			faq4A: "Ja! Sie koennen Ihren Plan jederzeit upgraden oder downgraden, um Ihren Anforderungen gerecht zu werden.",
			faq5Q: "Werden ungenutzte Limits uebertragen?",
			faq5A: "Nein, ungenutzte Nutzungslimits werden zu Beginn jedes Abrechnungszyklus zurueckgesetzt.",
			faq6Q: "Kann ich Negentro mit meiner eigenen Infrastruktur nutzen?",
			faq6A: "Ja, Sie koennen Negentro auf Ihrer eigenen Infrastruktur mit unseren Open-Source- oder Enterprise-Angeboten bereitstellen.",
			faq7Q: "Was ist im Self-Hosting enthalten?",
			faq7A: "Self-Hosting umfasst vollstaendige Bereitstellungskontrolle, benutzerdefinierte Infrastruktur und die Moeglichkeit, eigene Modellanbieter zu verwenden.",
			faq8Q: "Bieten Sie Enterprise-Vereinbarungen an?",
			faq8A: "Ja, unser Enterprise-Plan umfasst benutzerdefinierte Limits, SSO/SAML, Audit-Protokolle und Priority-Deployment-Support.",
			faq9Q: "Gibt es eine nutzungsbasierte Option?",
			faq9A: "Ja, ueber die Basislimits des Plans hinaus koennen Sie dynamisch mit transparenter nutzungsbasierter Preisgestaltung skalieren.",
			faq10Q: "Kann ich meine Daten exportieren?",
			faq10A: "Absolut. Sie behalten die vollstaendige Dateneigentuemeschaft und koennen Ihre Daten jederzeit ueber unsere API exportieren.",
			faq11Q: "Bieten Sie Support fuer Produktionsbereitstellungen an?",
			faq11A: "Ja, wir bieten Priority-Engineering- und Bereitstellungs-Support fuer unsere Skalieren- und Enterprise-Kunden.",
		},
		waitPage: {
			loading: "Gedächtnis wird geladen...",
			sublinePre: "Unser Team legt letzte Hand an",
			sublineHighlight: "Negentro.",
		},
	},

	ru: {
		nav: {
			overview: "Обзор",
			research: "Исследования",
			pricing: "Тарифы",
			initiatives: "Инициативы",
			resources: "Ресурсы",
			company: "Компания",
			tryPiyApi: "Попробовать PiyAPI",
		},
		hero: {
			headlinePre: "Следующая Эволюция\nИнтеллекта — Это ",
			headlineMemory: "Память.",
			subline: "Piyapi наделяет ИИ способностью помнить, учиться и развиваться.",
			emailPlaceholder: "Введите ваш email",
			joinWaitlist: "Присоединиться",
			joining: "Отправка...",
			successMsg: "Вы в списке ожидания! Мы скоро свяжемся с вами.",
			duplicateMsg: "Вы уже находитесь в списке ожидания!",
			invalidEmailMsg: "Пожалуйста, введите корректный адрес электронной почты.",
		},
		partner: {
			supportedBy: "ПРИ ПОДДЕРЖКЕ МЕЖДУНАРОДНЫХ СТАРТАП-ПРОГРАММ",
		},
		problem: {
			tag: "ПРОБЛЕМА",
			headlinePre: "ИИ Способен Рассуждать.\nЕму Все Еще Нужна ",
			headlineMemory: "Память.",
			subline:
				"ИИ может рассуждать в моменте. Но без памяти ему трудно сохранять знания, опыт и контекст на будущее.",
			tab1Label: "Перегрузка Контекста",
			tab1CardTitle: "Перегрузка Контекста",
			tab1CardDesc:
				"Увеличение контекста не означает улучшение памяти. С ростом информации растут затраты, а поиск нужных знаний усложняется.",
			tab2Label: "Оболочки Памяти ИИ",
			tab2CardTitle: "Оболочки Памяти ИИ",
			tab2CardDesc:
				"Суммаризация диалогов уменьшает размер контекста, но может терять точные факты, временные метки и источник.",
			tab3Label: "Нативная Память Моделей",
			tab3CardTitle: "Нативная Память Моделей",
			tab3CardDesc:
				"Модели могут помнить. Но они все еще не могут гарантировать, что они помнят, почему они это помнят и когда данные изменились.",
		},
		differentApproach: {
			tag: "РЕШЕНИЕ",
			titlePre: "Другой Подход к Памяти ",
			titleHighlight: "ИИ.",
			sublinePre: "Создано для продуктового ИИ: ",
			sublineHighlight: "Piyapi",
			sublinePost:
				" сохраняет точные знания с предсказуемым извлечением и проверяемым происхождением.",
			feat1Title: "Детерминизм",
			feat1Desc:
				"Предсказуемое и воспроизводимое извлечение памяти для надежных систем ИИ.",
			feat2Title: "Точность",
			feat2Desc:
				"Сохранение полного контекста и нюансов данных без потерь и сжатия.",
			feat3Title: "Происхождение",
			feat3Desc:
				"Полная прослеживаемость для каждого фрагмента извлеченных знаний.",
			feat4Title: "Персистентность",
			feat4Desc:
				"Долгосрочная историческая непрерывность между сессиями и моделями.",
			feat5Title: "Собственность",
			feat5Desc:
				"Полный контроль пользователя и суверенитет над приватными данными памяти.",
			feat6Title: "Портативность",
			feat6Desc:
				"Модельно-независимая совместимость для бесшовной миграции инфраструктуры.",
			quotePre: "Извлечение — это лишь половина задачи. Продуктовому ИИ нужна ",
			quoteHighlight: "память",
			quotePost: ", способная сохранять и верифицировать свои знания.",
			sotaHeading: "Память SOTA,\nВ Цифрах.",
			sotaLine1: "Лидирующие показатели в LongMemEval,",
			sotaLine2: "LoCoMo, ConvoMem с быстрым извлечением и",
			sotaLine3: "кардинальным снижением расхода токенов.",
			metric1Value: "#1",
			metric1Sublabel: "В MEMBENCH",
			metric1Line1: "ПРЕВОСХОДНЫЙ",
			metric1Line2: "ОПЫТ ИИ",
			metric2Value: "<500ms",
			metric2Sublabel: "ЗАДЕРЖКА ИЗВЛЕЧЕНИЯ",
			metric2Line1: "ПАМЯТЬ В",
			metric2Line2: "РЕАЛЬНОМ ВРЕМЕНИ",
			metric3Value: "50-90%",
			metric3Sublabel: "МЕНЬШЕ ТОКЕНОВ",
			metric3Line1: "ИИ МАСШТАБА",
			metric3Line2: "ПРЕДПРИЯТИЯ",
			tableHeaderContext: "Перегрузка Контекста",
			tableHeaderWrapper: "Оболочка Памяти",
			tableHeaderNative: "Нативная Память",
			tableRow1: "Точное Сохранение",
			tableRow2: "Независимость от Модели",
			tableRow3: "Проверяемое Происхождение",
			tableRow4: "Корпоративное Управление",
		},
		workflows: {
			headlinePre: "Создано для Любого ",
			headlineHighlight: "ИИ-Воркфлоу.",
			sublineLine1:
				"Усильте вашу специализированную инфраструктуру детерминированной памятью,",
			sublineLine2:
				"оптимизированной для высоконагруженных продуктовых моделей с глубоким контекстом.",
			card1Id: "01",
			card1Title: "ИИ-Агенты",
			card1Desc: "Персистентная память для автономного принятия многоэтапных решений.",
			card2Id: "02",
			card2Title: "Диалоговый ИИ",
			card2Desc:
				"Сохранение долгосрочного контекста в поддержке клиентов, продажах и персональных ассистентах.",
			card3Id: "03",
			card3Title: "RAG-Системы",
			card3Desc:
				"Извлечение точных знаний с детерминированным происхождением вместо простого семантического сходства.",
			card4Id: "04",
			card4Title: "Корпоративные Знания",
			card4Desc:
				"Сохранение знаний организации между командами, документами и рабочими процессами.",
			card5Id: "05",
			card5Title: "ИИ Высокой Ответственности",
			card5Desc:
				"Для юридических, финансовых, медицинских и регулируемых систем, где важна абсолютная точность.",
			card6Id: "06",
			card6Title: "Мультиагентные Системы",
			card6Desc:
				"Единый персистентный слой памяти для совместной работы нескольких ИИ-агентов.",
		},
		code: {
			headline: "Интегрируйте Piyapi туда, где уже работает ваш ИИ.",
			headlinePre: "Интегрируйте ",
			headlineHighlight: "Piyapi",
			headlinePost: " туда, где уже работает ваш ИИ.",
			subline: "Память, работающая с любой моделью, фреймворком или стеком агентов.",
			tag01: "//01",
			sdkTitle: "SDK",
			sdkSubtitle: "Нативные SDK, REST API и интеграции с ИИ-фреймворками",
			tag02: "//02",
			agentsTitle: "ИИ-АГЕНТЫ",
			agentsSubtitle:
				"Позвольте ИИ-агентам точно помнить данные в каждом взаимодействии и процессе.",
			tag03: "//03",
			connectorsTitle: "КОННЕКТОРЫ",
			connectorsSubtitle: "Единый источник истины. Каждое приложение. Каждая модель.",
			tag04: "//04",
			mcpTitle: "MCP",
			mcpSubtitle:
				"Позвольте ассистентам разработки помнить проекты, диалоги и решения между сессиями",
		},
		security: {
			tag: "КОНФИДЕНЦИАЛЬНОСТЬ И БЕЗОПАСНОСТЬ",
			headlineData: "Данные.",
			headlineMemory: "Память.",
			headlineControl: "Контроль.",
			subline1:
				"PiyAPI сохраняет память ИИ приватной, явной и редактируемой, чтобы вы полностью контролировали то, что ваш ИИ",
			subline2: "помнит, изменяет и забывает.",
			card1Title: "Приватность по умолчанию",
			card1Desc:
				"Конфиденциальные знания остаются зашифрованными и изолированными на протяжении всего жизненного цикла.",
			card2Title: "Явная Память",
			card2Desc:
				"Каждое воспоминание доступно и прозрачно, а не скрыто внутри непрозрачных параметров модели.",
			card3Title: "Редактируемость по Дизайну",
			card3Desc:
				"Исправляйте, обновляйте или удаляйте отдельные записи памяти без переобучения базовой модели.",
			card4Title: "Полная Прозрачность",
			card4Desc:
				"Смотрите, что именно помнит ИИ, откуда взялась информация и как она менялась со временем.",
			card5Title: "Память под контролем пользователя",
			card5Desc: "Управляйте правами на создание, чтение, обновление, экспорт и удаление памяти.",
		},
		research: {
			tag: "ИССЛЕДОВАНИЯ И СТАТЬИ",
			headline: "Исследования & Инсайты",
			paper1Overlay: "Память",
			paper1Title: "Память — Недостающий Слой Интеллекта",
			paper1Status: "Скоро",
			paper1Category: "Научные Статьи",
			paper2Overlay: "Память",
			paper2Title: "Детерминированная Память для Вероятностного ИИ",
			paper2Status: "Скоро",
			paper2Category: "Эксперименты",
			paper3Overlay: "Память",
			paper3Title: "Измерение Долгосрочной Памяти в Системах ИИ",
			paper3Status: "Скоро",
			paper3Category: "Инженерия",
		},
		cta: {
			headline: "Создавайте С Piyapi",
			subline:
				"Есть проект? Поговорите с нашей командой и узнайте, как детерминированная память усилит ваш стек ИИ.",
			talkButton: "Связаться с Командой",
			marqueeItems: [
				"Диалоговый ИИ",
				"Персональная Память ИИ",
				"Корпоративные Знания",
				"Мультиагентные Системы",
				"ИИ в Медицине",
			],
		},
		calendly: {
			title: "Запланировать Демо с Piyapi",
			loading: "Загрузка расписания...",
			close: "Закрыть окно",
		},
		footer: {
			infrastructure: "Инфраструктура для надежного ИИ.",
			moreAboutUs: "Подробнее о нас",
			devTitle: "Разработчикам",
			devDocs: "Документация разработчика",
			devApi: "Справочник API",
			devMcp: "Интеграция MCP",
			devCli: "Справочник CLI",
			devTrust: "Центр доверия",
			devStatus: "Статус",
			prodTitle: "Продукт",
			prodResearch: "Исследования",
			prodBlog: "Блог",
			prodIntegrations: "Интеграции",
			prodReleaseNotes: "Примечания к выпуску",
			prodGithub: "GitHub",
			compTitle: "Компания",
			compAbout: "О нас",
			compContact: "Связаться с нами",
			compCareers: "Карьера",
			compStartup: "Программа стартапов",
			compInvestors: "Инвесторы",
			compPricing: "Тарифы",
			usecasesTitle: "Сценарии",
			useSupport: "Поддержка клиентов",
			useHealth: "Здравоохранение",
			useEdu: "Образование",
			useSales: "Продажи и CRM",
			useEcom: "Электронная коммерция",
			soc2: "SOC 2 Type I и Type II готов",
			gdpr: "Соответствие GDPR",
			hipaa: "Соответствие HIPAA",
			complianceTitle: "Соответствие",
			contactTitle: "Связаться с нами",
			contactEmail: "ceo@negentro.tech",
			copyright: "© 2026 INFORAVIUM TECHNOLOGIES PRIVATE LIMITED",
			rightsReserved: "– Все права защищены",
			languagesLabel: "Языки",
		},
		pricing: {
			tag: "ТАРИФЫ",
			heroHeadline: "Инфраструктура, масштабируемая вместе с вашим контекстом.",
			heroSubline: "Начните строить с персистентным интеллектом, затем масштабируйте память, извлечение и инфраструктуру по мере роста приложения.",
			billingLabel: "ОПЛАТА",
			billingMonthly: "Ежемесячно",
			billingYearly: "Ежегодно",
			billingSave: "Сэкономьте 20%",
			includedLabel: "ВКЛЮЧЕНО",
			contextCapacityLabel: "ЁМКОСТЬ КОНТЕКСТА",
			retrievalsLabel: "Запросов/мес",
			projectsLabel: "Проекты",
			coverageHeadline: "Что реально включает ваш план",
			coverageSubline: "Каждый план построен на одних и тех же четырёх инфраструктурных измерениях.",
			stepsPrototype: "Прототип",
			stepsProduction: "Производство",
			stepsScale: "Масштабирование",
			stepsEnterprise: "Предприятие",
			compareHeadline: "Сравните все возможности",
			compareSubline: "Посмотрите точно, чем отличаются планы, перед выбором.",
			capabilityLabel: "ВОЗМОЖНОСТЬ",
			recommendedLabel: "РЕКОМЕНДУЕТСЯ",
			calculatorHeadline: "Оцените ежемесячное использование",
			calculatorSubline: "Расскажите нам примерно, каким контекстом управляет ваше приложение, и мы покажем ориентировочный диапазон плана.",
			mauLabel: "ЕЖЕМЕСЯЧНО АКТИВНЫХ ПОЛЬЗОВАТЕЛЕЙ",
			memoriesPerUserLabel: "СОЗДАНО ВОСПОМИНАНИЙ НА ПОЛЬЗОВАТЕЛЯ",
			retrievalRequestsLabel: "ЕЖЕМЕСЯЧНЫХ ЗАПРОСОВ ИЗВЛЕЧЕНИЯ",
			projectsCountLabel: "ПРОЕКТЫ",
			estimatedUsageLabel: "РАСЧЁТНОЕ ЕЖЕМЕСЯЧНОЕ ИСПОЛЬЗОВАНИЕ",
			memoryOpsUnit: "операций памяти",
			suggestedPlanLabel: "РЕКОМЕНДУЕМЫЙ ПЛАН",
			estimatedPriceLabel: "ОРИЕНТИРОВОЧНАЯ ЦЕНА",
			calculatorCta: "Начать разработку",
			calculatorDisclaimer: "Фактическое использование и цены могут варьироваться в зависимости от конфигурации и требований к инфраструктуре.",
			selfHostHeadline: "Предпочитаете запускать самостоятельно?",
			selfHostSubline: "Разверните Negentro на своей инфраструктуре и выберите компоненты, хранилище и поставщиков моделей, подходящих для вашей среды.",
			selfHostExplore: "Изучить Open Source",
			criticalHeadline: "Для команд, создающих критические системы ИИ.",
			criticalSubline: "Поговорите с командой Negentro о требованиях к развёртыванию, безопасности, масштабировании, поддержке и настраиваемой инфраструктуре.",
			criticalCta: "Связаться с отделом продаж",
			faqHeadline: "Часто задаваемые вопросы",
			finalCtaHeadline: "Начните разработку с персистентным интеллектом.",
			finalCtaSubline: "Начните с бесплатного уровня и масштабируйтесь, когда приложению понадобится больше контекста.",
			finalCtaStart: "Начать разработку",
			finalCtaDocs: "Читать документацию",
			planExploreName: "Izuchenie",
			planBuildBadge: "SAMIY POPULYARNIY",
			planBuildName: "Razrabotka",
			planScaleName: "Masshtabirovanie",
			planEnterpriseName: "Predpriyatie",
			planExploreDesc: "Dlya eksperimentov s persistentnym kontekstom",
			planExploreBillingText: "Dlya razrabotchikov, kotorye nachinayut",
			planExploreCta: "Nachat razrabotku",
			planExploreF1: "Ogranichennoe khranilishche pamyati",
			planExploreF2: "Bazovoe izvlechenie",
			planExploreF3: "API dlya razrabotchikov",
			planExploreF4: "Podderzhka soobshchestva",
			planExploreF5: "Bazovaya analitika ispolzovaniya",
			planBuildDesc: "Dlya proizvodstvennykh prilozheniy",
			planBuildBillingText: "Ezhemesyachnaya ili ezhegodnaya oplata",
			planBuildCta: "Nachat razrabotku",
			planBuildF1: "Uvelichennaya yomkost pamyati",
			planBuildF2: "Povyshennoye ispolzovanie API",
			planBuildF3: "Rasshirennoye izvlechenie",
			planBuildF4: "Filtratsiya metadannykh",
			planBuildF5: "Kontekst na urovne proekta",
			planBuildF6: "Analitika ispolzovaniya",
			planBuildF7: "Podderzhka razrabotchikov",
			planScaleDesc: "Dlya vysokonagruzhennykh II-prilozheniy",
			planScaleBillingText: "Ezhemesyachnaya ili ezhegodnaya oplata",
			planScaleCta: "Nachat masshtabirovanie",
			planScaleF1: "Vysokiye limity pamyati",
			planScaleF2: "Vysokiy obyom API",
			planScaleF3: "Rasshirennoye izvlechenie",
			planScaleF4: "Neskolko proyektov",
			planScaleF5: "Komandnaya rabota",
			planScaleF6: "Rasshirennaya analitika",
			planScaleF7: "Prioritetnaya podderzhka",
			planScaleF8: "Dlitelnoye khraneniye",
			planEnterpriseDesc: "Dlya organizatsiy, rabotayushchikh v masshtabe",
			planEnterpriseBillingText: "Adaptirovano k vashim potrebnostyam",
			planEnterpriseCta: "Svyazatsya s otdelom prodazh",
			planEnterpriseF1: "Nastraivaemye limity",
			planEnterpriseF2: "Varianty vydelennoy infrastruktury",
			planEnterpriseF3: "SSO/SAML",
			planEnterpriseF4: "Zhurnaly audita",
			planEnterpriseF5: "Rasshirennyye sredstva bezopasnosti",
			planEnterpriseF6: "Optsii SLA",
			planEnterpriseF7: "Vydelennaya podderzhka",
			planEnterpriseF8: "Polzovatelskiye integratsii",
			planEnterpriseF9: "Kontrol dannykh i razvertyvaniya",
			planEnterpriseContextCapacity: "Nastraivaemyy",
			planEnterpriseProjects: "Neogranichennno",
			promise1Title: "Nikakih skrytykh platezhey",
			promise1Desc: "Prozrachnoye tsenovoye formirovaniye bez neozhidannykh platezhey i prevysheniy.",
			promise2Title: "Otmena v lyuboy moment",
			promise2Desc: "Bez obyazatelnykh kontraktov. Ponizhajte tarif ili otmenyayte kogda ugodno.",
			promise3Title: "Gibkost na osnove ispolzovaniya",
			promise3Desc: "Platite za to, chto ispolzuyete. Masshtabirujtes vverkh ili vniz po mere neobkhodimosti.",
			promise4Title: "Besplatnyy uroven navsegda",
			promise4Desc: "Nash startovyy plan besplatyen navsegda. Kreditnaya karta ne trebuetsya.",
			coverage1Title: "Pamyat",
			coverage1Desc: "Skolko persistentnogo konteksta mozhno khranit v vashem prilozhenii.",
			coverage1Example: "napr. 10K - 1M+ vospominaniy",
			coverage2Title: "Izvlechenie",
			coverage2Desc: "Skolko konteksta mozhno nayti i izvlech po trebovaniyu.",
			coverage2Example: "napr. 5K - 5M zaprosov/mes",
			coverage3Title: "Infrastruktura",
			coverage3Desc: "Khranilishche, vychisleniya, topologiya razvertyvaniya i garantii nadezhnosti.",
			coverage3Example: "Obshchaya k Vydelennoy",
			coverage4Title: "Podderzhka",
			coverage4Desc: "Urovni podderzhki: soobshchestvo, prioritetnaya ili vydelennaya inzhenernaya.",
			coverage4Example: "Soobshchestvo k Vydelennoy",
			catMemory: "PAMYAT",
			catRetrieval: "IZVLECHENIE",
			catPlatform: "PLATFORMA",
			catInfrastructure: "INFRASTRUKTURA",
			catSecurity: "BEZOPASNOST",
			catSupport: "PODDERZHKA",
			rowMemoryStorage: "Khranilishche pamyati",
			rowMemoryRetrieval: "Izvlechenie pamyati",
			rowMemoryRetention: "Uderzhanie pamyati",
			rowMemoryExport: "Eksport pamyati",
			rowMetadataFiltering: "Filtratsiya metadannykh",
			rowMemoryHistory: "Istoriya pamyati",
			rowSemanticSearch: "Semanticheskiy poisk",
			rowHybridRetrieval: "Gibridnoye izvlechenie",
			rowReranking: "Pereranzhirovanie",
			rowSearchFilters: "Filtry poiska",
			rowCustomRetrievalConfig: "Polzovatelskaya konfiguratsiya izvlecheniya",
			rowApiAccess: "Dostup k API",
			rowProjects: "Proekty",
			rowEnvironments: "Sredy",
			rowUsageAnalytics: "Analitika ispolzovaniya",
			rowWebhooks: "Vebkhuki",
			rowManagedInfra: "Upravlyaemaya infrastruktura",
			rowSelfHosted: "Samostoyatelnoye razvertyvaniye",
			rowCustomStorage: "Polzovatelskoe khranilishche",
			rowDedicatedResources: "Vydelennye resursy",
			rowDeploymentControls: "Kontrol razvertyvaniya",
			rowApiKeys: "Klyuchi API",
			rowRbac: "RBAC",
			rowSsoSaml: "SSO/SAML",
			rowAuditLogs: "Zhurnaly audita",
			rowSecurityControls: "Sredstva bezopasnosti",
			rowCommunitySupport: "Podderzhka soobshchestva",
			rowEmailSupport: "Podderzhka po email",
			rowPrioritySupport: "Prioritetnaya podderzhka",
			rowDedicatedSupport: "Vydelennaya podderzhka",
			rowSla: "SLA",
			reason1Title: "Korporativnyy uroven bezopasnosti",
			reason1Desc: "Infrastruktura, sootvetstvuyushchaya SOC 2, HIPAA i GDPR.",
			reason2Title: "Zaderzhka izvlecheniya meneye 500ms",
			reason2Desc: "Deterministicheskaya pamyat v realnom vremeni dlya proizvodstvennogo II.",
			reason3Title: "50-90% menshe tokenov",
			reason3Desc: "Znachitelno sokratite ispolzovanie tokenov s deterministicheskoy pamyatyu.",
			reason4Title: "#1 v MemBench",
			reason4Desc: "Lidiruyushchaya proizvoditelnost v benchmarkakh pamyati.",
			reason5Title: "Agnostik k modeli",
			reason5Desc: "Rabotayet s lyubym LLM, freymvorkom ili stelom agentov.",
			reason6Title: "Polnoye vladenie dannymi",
			reason6Desc: "Vasha pamyat, vashi dannye, vash kontrol. Vsegda.",
			criticalCard1Title: "Bezopasnost",
			criticalCard1Desc: "SSO, kontrol dostupa i trebovaniya audita dlya reguliruyemykh sred.",
			criticalCard2Title: "Masshtab",
			criticalCard2Desc: "Individualynaya yomkost i vydelennaya infrastruktura dlya trebovatelynykh nagruzok.",
			criticalCard3Title: "Podderzhka",
			criticalCard3Desc: "Prioritetnaya inzhenernaya podderzhka i podderzhka razvertyvaniya ot nashey komandy.",
			selfHostYourApp: "Vashe Prilozhenie",
			selfHostYourInfra: "Vasha Infrastruktura",
			faq1Q: "Est li besplatnyy plan?",
			faq1A: "Da, plan Izuchenie besplatyen i prednaznachen dlya razrabotchikov, eksperimentirruyushchikh s persistentnym kontekstom.",
			faq2Q: "Kak izmeryaetsya ispolzovanie?",
			faq2A: "Ispolzovanie izmeryaetsya na osnove kolichestva aktivnykh polzovateley, sokhranennykh vospominaniy i operatsiy izvlecheniya za mesyats.",
			faq3Q: "Chto schitaetsya operatsiey pamyati?",
			faq3A: "Operatsiya pamyati vklyuchayet lyuboye deystviye sozdaniya, chteniya, obnovleniya ili udaleniya v vashem khranilishche pamyati.",
			faq4Q: "Mozhno li smenit tarifnyy plan pozhe?",
			faq4A: "Da! Vy mozhete povysit ili ponizit tarifnyy plan v lyuboye vremya v sootvetstvii s potrebnostyami infrastruktury.",
			faq5Q: "Perenosyatsya li neispolzovannye limity?",
			faq5A: "Net, neispolzovannye limity sbrasyvayutsya v nachale kazhdogo raschetnogo perioda.",
			faq6Q: "Mozhno li ispolzovat Negentro s sobstvennoy infrastrukturoy?",
			faq6A: "Da, vy mozhete razvernet Negentro na svoyey infrastrukture s nashimi resheniyami.",
			faq7Q: "Chto vklyucheno v samostoyatelnyy khosting?",
			faq7A: "Samostoyatelnyy khosting vklyuchayet polnyy kontrol nad razvertyvanieyem, polzovatelskuyu infrastrukturu i vozmozhnost ispolzovat sobstvennykh postavshchikov modeley.",
			faq8Q: "Predlagayete li vy korporativnyye soglasheniya?",
			faq8A: "Da, nash korporativnyy plan vklyuchayet nastraivaemye limity, SSO/SAML, zhurnaly audita i prioritetnuyu podderzhku razvertyvaniya.",
			faq9Q: "Est li variant na osnove ispolzovaniya?",
			faq9A: "Da, pomimo bazovykh limitov plana, vy mozhete masshtabirovatsya dinamicheski s prozrachnym tsenoobrazovaniyem.",
			faq10Q: "Mogu li ya eksportirovat svoi dannye?",
			faq10A: "Absolyutno. Vy sokhranite polnoye vladenie dannymi i mozhete eksportirovat ikh v lyuboye vremya cherez nashe API.",
			faq11Q: "Predlagayete li vy podderzhku dlya proizvodstvennykh razvertyvaniy?",
			faq11A: "Da, my obespechivayem prioritetnuyu inzhenernuyu podderzhku i podderzhku razvertyvaniya dlya klientov Masshtabirovaniya i Predpriyatiya.",
		},
		waitPage: {
			loading: "Память загружается...",
			sublinePre: "Наша команда наносит последние штрихи на",
			sublineHighlight: "Negentro.",
		},
	},
}

interface LanguageContextType {
	language: Language
	setLanguage: (lang: Language) => void
	t: TranslationDictionary
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
)

const STORAGE_KEY = "negentro_lang"

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [language, setLanguageState] = useState<Language>(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem(STORAGE_KEY) as Language
			if (saved && translations[saved]) {
				return saved
			}
		}
		return "en"
	})

	const setLanguage = (lang: Language) => {
		if (translations[lang]) {
			setLanguageState(lang)
			if (typeof window !== "undefined") {
				localStorage.setItem(STORAGE_KEY, lang)
				document.documentElement.lang = lang
			}
		}
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			document.documentElement.lang = language
		}
	}, [language])

	const t = translations[language] || translations.en

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	)
}

export function useLanguage(): LanguageContextType {
	const context = useContext(LanguageContext)
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider")
	}
	return context
}
