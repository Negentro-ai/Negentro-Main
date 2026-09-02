import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "es" | "fr" | "de" | "ru"

export interface TranslationDictionary {
	nav: {
		overview: string
		research: string
		pricing: string
		initiatives: string
		resources: string
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
	paradigm: {
		tag: string
		titlePre: string
		titleHighlight: string
		subline: string
		problem1Title: string
		problem1Desc: string
		problem2Title: string
		problem2Desc: string
		problem3Title: string
		problem3Desc: string
	}
	differentApproach: {
		sectionTag: string
		headlinePre: string
		headlineHighlight: string
		card1Title: string
		card1Desc: string
		card2Title: string
		card2Desc: string
		card3Title: string
		card3Desc: string
		quotePre: string
		quoteHighlight: string
		quotePost: string
		sotaTitle: string
		sotaLine1: string
		sotaLine2: string
		sotaLine3: string
		sotaMetric1Value: string
		sotaMetric1Badge: string
		sotaMetric1Label: string
		sotaMetric2Value: string
		sotaMetric2Badge: string
		sotaMetric2Label: string
		sotaMetric3Value: string
		sotaMetric3Badge: string
		sotaMetric3Label: string
		tableHeaderDim: string
		tableHeaderPiyapi: string
		tableHeaderVector: string
		tableHeaderRedis: string
		tableHeaderCustom: string
		row1Name: string
		row1Piyapi: string
		row1Vector: string
		row1Redis: string
		row1Custom: string
		row2Name: string
		row2Piyapi: string
		row2Vector: string
		row2Redis: string
		row2Custom: string
		row3Name: string
		row3Piyapi: string
		row3Vector: string
		row3Redis: string
		row3Custom: string
		row4Name: string
		row4Piyapi: string
		row4Vector: string
		row4Redis: string
		row4Custom: string
		row5Name: string
		row5Piyapi: string
		row5Vector: string
		row5Redis: string
		row5Custom: string
		row6Name: string
		row6Piyapi: string
		row6Vector: string
		row6Redis: string
		row6Custom: string
	}
	workflows: {
		headline: string
		subline: string
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
		card6Title: string
		card6Desc: string
	}
	code: {
		headline: string
		subline: string
		installCmd: string
		feature1Title: string
		feature1Desc: string
		feature2Title: string
		feature2Desc: string
		feature3Title: string
		feature3Desc: string
	}
	security: {
		headlinePre: string
		headlineHighlight: string
		headlinePost: string
		subline: string
		card1Title: string
		card1Desc: string
		card2Title: string
		card2Desc: string
		card3Title: string
		card3Desc: string
		card4Title: string
		card4Desc: string
	}
	research: {
		headline: string
		subline: string
		readPaper: string
		paper1Title: string
		paper1Abstract: string
		paper2Title: string
		paper2Abstract: string
		paper3Title: string
		paper3Abstract: string
	}
	cta: {
		headline: string
		subline: string
		talkButton: string
		marqueeItems: string[]
	}
	calendly: {
		modalTitle: string
		openNewTab: string
		loading: string
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
		prodPiyapi: string
		prodBench: string
		prodPlayground: string
		prodConnectors: string
		prodIntegrations: string
		prodChangelog: string
		compTitle: string
		compAbout: string
		compResearch: string
		compCareers: string
		compPrivacy: string
		compTerms: string
		compSecurity: string
		useTitle: string
		useConv: string
		useAgents: string
		useHealth: string
		useFin: string
		useEnter: string
		soc2: string
		gdpr: string
		hipaa: string
		contactTitle: string
		copyright: string
		rightsReserved: string
		languagesLabel: string
	}
	waitPage: {
		loading: string
		sublinePre: string
		sublineHighlight: string
		comingSoon: string
		exploreDocs: string
		returnHome: string
		notifyTitle: string
		notifySub: string
		placeholder: string
		notifyBtn: string
		joined: string
		subpageResearchTitle: string
		subpageResearchDesc: string
		subpagePricingTitle: string
		subpagePricingDesc: string
		subpageInitiativesTitle: string
		subpageInitiativesDesc: string
		subpageResourcesTitle: string
		subpageResourcesDesc: string
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
			tryPiyApi: "Try PiyAPI",
		},
		hero: {
			headlinePre: "The Next Evolution Of\nIntelligence Is ",
			headlineMemory: "Memory.",
			subline: "Piyapi gives AI the ability to remember, learn, and evolve.",
			emailPlaceholder: "Enter your email",
			joinWaitlist: "Join Waitlist",
			joining: "Joining...",
			successMsg: "You're on the waitlist! We'll be in touch soon.",
			duplicateMsg: "You are already on the waitlist!",
			invalidEmailMsg: "Please enter a valid email address.",
		},
		partner: {
			supportedBy: "Supported by global startup programs",
		},
		paradigm: {
			tag: "THE PROBLEM",
			titlePre: "AI Can Reason. ",
			titleHighlight: "It Still Needs Memory.",
			subline:
				"Current models treat every interaction as an isolated session. Without persistent cognitive memory, intelligence remains stateless, repetitive, and expensive.",
			problem1Title: "Context Window Limits",
			problem1Desc:
				"Expanding context windows increases quadratic attention costs and latency, without providing true long-term knowledge retention.",
			problem2Title: "Naïve RAG & Wrappers",
			problem2Desc:
				"Standard vector embeddings only retrieve shallow similarities, failing to model temporal relationships, causality, and changing facts.",
			problem3Title: "Stateless Multi-Agents",
			problem3Desc:
				"Without deterministic shared state, agentic workflows suffer from memory drift, hallucinated states, and unrecoverable coordination failures.",
		},
		differentApproach: {
			sectionTag: "ARCHITECTURE",
			headlinePre: "A Radically Different Approach to ",
			headlineHighlight: "AI Memory",
			card1Title: "Associative Neural Graph",
			card1Desc:
				"Combines semantic embeddings with dynamic knowledge graphs to form associative memory pathways that mirror human cognitive recall.",
			card2Title: "Temporal State Engine",
			card2Desc:
				"Tracks evolving beliefs, preferences, and state changes over time with deterministic rollback and point-in-time state reconstruction.",
			card3Title: "Zero-Latency Hybrid Retrieval",
			card3Desc:
				"Sub-millisecond hybrid indexing blending vector similarity with symbolic graph traversal for ultra-reliable factual recall.",
			quotePre: "Retrieval is a crude approximation of ",
			quoteHighlight: "memory",
			quotePost:
				" — True cognitive intelligence requires structured, evolving, and contextual state persistence.",
			sotaTitle: "SOTA Performance Snapshot",
			sotaLine1: "Leading performance across LongMemEval,",
			sotaLine2: "LoCoMo, ConvoMem with fast recall and",
			sotaLine3: "dramatically lower token usage.",
			sotaMetric1Value: "#1",
			sotaMetric1Badge: "RANKING",
			sotaMetric1Label: "LongMem Benchmark",
			sotaMetric2Value: "<500ms",
			sotaMetric2Badge: "LATENCY",
			sotaMetric2Label: "Global Hybrid Recall",
			sotaMetric3Value: "50-90%",
			sotaMetric3Badge: "TOKEN SAVINGS",
			sotaMetric3Label: "Context Window Reduction",
			tableHeaderDim: "Capabilities & Architecture",
			tableHeaderPiyapi: "Piyapi Cognitive",
			tableHeaderVector: "Traditional Vector DBs",
			tableHeaderRedis: "Redis / Key-Value",
			tableHeaderCustom: "Custom RAG Pipelines",
			row1Name: "Memory Architecture",
			row1Piyapi: "Neural Graph + Temporal Memory",
			row1Vector: "Flat Vector Index (HNSW)",
			row1Redis: "Raw Key-Value Caching",
			row1Custom: "Ad-hoc LangChain / LlamaIndex",
			row2Name: "Temporal Tracking",
			row2Piyapi: "Full timeline & belief evolution",
			row2Vector: "No temporal awareness",
			row2Redis: "Manual TTL timestamps",
			row2Custom: "Fragile custom logic",
			row3Name: "Recall Latency",
			row3Piyapi: "< 500ms Sub-millisecond Recall",
			row3Vector: "1.2s - 4.5s (Query Latency)",
			row3Redis: "Fast key lookup (no semantics)",
			row3Custom: "2.5s - 8.0s (High Overhead)",
			row4Name: "Context Window Cost",
			row4Piyapi: "50-90% Lower Token Consumption",
			row4Vector: "Bloated raw prompt stuffing",
			row4Redis: "No semantic context pruning",
			row4Custom: "High token wastage",
			row5Name: "Conflict Resolution",
			row5Piyapi: "Deterministic truth arbitration",
			row5Vector: "Conflicting chunks in top-k",
			row5Redis: "Last-write-wins overwrite",
			row5Custom: "Unpredictable hallucinations",
			row6Name: "Multi-Agent Sync",
			row6Piyapi: "Real-time shared state fabric",
			row6Vector: "Stateless per agent query",
			row6Redis: "Manual locking needed",
			row6Custom: "Prone to state drift",
		},
		workflows: {
			headline: "Transforming Workflows with Persistent Memory",
			subline:
				"Empower your agents, copilots, and autonomous pipelines with memory architectures designed for production.",
			card1Title: "Personal AI Companions",
			card1Desc:
				"Retain user preferences, emotional nuance, and life context across months of conversation.",
			card2Title: "Enterprise Knowledge Agents",
			card2Desc:
				"Query thousands of internal documents, Slack threads, and tickets with precise versioning.",
			card3Title: "Multi-Agent Coordination",
			card3Desc:
				"Enable teams of specialized agents to read and write to a unified cognitive scratchpad.",
			card4Title: "Healthcare & Patient History",
			card4Desc:
				"Track longitudinal patient narratives, clinical visits, and diagnostic evolution safely.",
			card5Title: "Financial Reasoning & Audit",
			card5Desc:
				"Maintain verifiable audit trails for financial transactions, regulatory rules, and market context.",
			card6Title: "Autonomous Code Refactoring",
			card6Desc:
				"Allow developer copilots to remember repo-wide conventions, tech debt, and historical PRs.",
		},
		code: {
			headline: "Ship in 3 Lines of Code",
			subline:
				"Integrate cognitive memory into your existing LLM stack in minutes with our lightweight TypeScript, Python, and REST SDKs.",
			installCmd: "npm install @piyapi/sdk",
			feature1Title: "Zero Infrastructure Overhead",
			feature1Desc: "Fully managed, globally distributed cloud API.",
			feature2Title: "Universal LLM Compatibility",
			feature2Desc: "Works seamlessly with OpenAI, Anthropic, Gemini, and local models.",
			feature3Title: "Built-in CDC Connectors",
			feature3Desc: "Automatic real-time sync with PostgreSQL, MongoDB, Notion, and Slack.",
		},
		security: {
			headlinePre: "Your Data. Your Memory. ",
			headlineHighlight: "Your Control.",
			headlinePost: "",
			subline:
				"Enterprise-grade security, deterministic governance, and granular privacy controls built into every layer.",
			card1Title: "End-to-End Encryption",
			card1Desc: "All memory graphs and vectors encrypted in transit (TLS 1.3) and at rest (AES-256).",
			card2Title: "Zero Data Retention",
			card2Desc: "Strict privacy boundaries. Your memory states are never used to train foundational models.",
			card3Title: "SOC 2 & HIPAA Ready",
			card3Desc: "Compliant with global privacy standards, enterprise audits, and healthcare requirements.",
			card4Title: "On-Premises & VPC Deployments",
			card4Desc: "Deploy PiyAPI within your dedicated AWS, GCP, Azure VPC or air-gapped sovereign cloud.",
		},
		research: {
			headline: "From Our Research Lab",
			subline: "Pioneering deterministic cognitive memory and associative state architectures.",
			readPaper: "Read Paper",
			paper1Title: "Associative Neural State Space for Long-Term Dialogue",
			paper1Abstract:
				"We present a hybrid memory architecture combining temporal state spaces with sparse associative graph indices for unbounded conversational retention.",
			paper2Title: "Deterministic Truth Arbitration in Dynamic Knowledge Graphs",
			paper2Abstract:
				"A formal framework for resolving temporal contradictions in LLM memory without retraining or full-context re-indexing.",
			paper3Title: "Sub-Millisecond Semantic Graph Traversal for Real-Time Agents",
			paper3Abstract:
				"Benchmarking high-throughput multi-agent state fabrics against traditional vector search across 10M+ entity graphs.",
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
			modalTitle: "Schedule a Call with Negentro Team",
			openNewTab: "Open in new tab",
			loading: "Loading Calendly scheduling...",
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
			prodPiyapi: "PiyAPI Engine",
			prodBench: "Benchmarks",
			prodPlayground: "Playground",
			prodConnectors: "Data Connectors",
			prodIntegrations: "Integrations",
			prodChangelog: "Changelog",
			compTitle: "Company",
			compAbout: "About Us",
			compResearch: "Research Lab",
			compCareers: "Careers",
			compPrivacy: "Privacy Policy",
			compTerms: "Terms of Service",
			compSecurity: "Security",
			useTitle: "Usecase",
			useConv: "Conversational AI",
			useAgents: "Multi-Agent Fabrics",
			useHealth: "Healthcare AI",
			useFin: "Financial Reasoning",
			useEnter: "Enterprise Knowledge",
			soc2: "SOC 2 Type I & II Ready",
			gdpr: "GDPR Ready",
			hipaa: "HIPAA Ready",
			contactTitle: "Contact Us",
			copyright: "© 2026 INFORAVIUM TECHNOLOGIES PRIVATE LIMITED",
			rightsReserved: "– Copyright All Rights reserved",
			languagesLabel: "Languages",
		},
		waitPage: {
			loading: "Memory is loading...",
			sublinePre: "Our team is putting the finishing touches on",
			sublineHighlight: "Negentro.",
			comingSoon: "COMING SOON",
			exploreDocs: "Explore Documentation",
			returnHome: "Return to Home",
			notifyTitle: "Get notified when we launch",
			notifySub: "Be the first to get access to developer previews, research updates, and new features.",
			placeholder: "Enter your work email",
			notifyBtn: "Notify Me",
			joined: "You're on the list! We'll notify you upon release.",
			subpageResearchTitle: "Pioneering Cognitive AI Research",
			subpageResearchDesc:
				"Our research team is publishing foundational papers on associative neural graphs, deterministic truth arbitration, and memory architectures for artificial general intelligence.",
			subpagePricingTitle: "Transparent & Scalable Pricing",
			subpagePricingDesc:
				"Flexible developer tiers and high-throughput enterprise infrastructure designed to scale memory from prototypes to hundreds of millions of daily queries.",
			subpageInitiativesTitle: "Global AI Initiatives & Ecosystem",
			subpageInitiativesDesc:
				"Fostering open research partnerships, university grants, and open-source SDKs to democratize cognitive state persistence for the next generation of intelligent agents.",
			subpageResourcesTitle: "Developer Resources & Knowledge Base",
			subpageResourcesDesc:
				"Comprehensive guides, architectural blueprints, integration recipes, and community MCP plugins to help you build reliable memory-enabled AI applications.",
		},
	},

	es: {
		nav: {
			overview: "Descripción general",
			research: "Investigación",
			pricing: "Precios",
			initiatives: "Iniciativas",
			resources: "Recursos",
			tryPiyApi: "Probar PiyAPI",
		},
		hero: {
			headlinePre: "La próxima evolución de\nla inteligencia es la ",
			headlineMemory: "Memoria.",
			subline: "Piyapi otorga a la IA la capacidad de recordar, aprender y evolucionar.",
			emailPlaceholder: "Ingresa tu correo electrónico",
			joinWaitlist: "Unirse a la lista de espera",
			joining: "Uniéndose...",
			successMsg: "¡Estás en la lista de espera! Nos pondremos en contacto pronto.",
			duplicateMsg: "¡Ya estás en la lista de espera!",
			invalidEmailMsg: "Por favor, ingresa un correo electrónico válido.",
		},
		partner: {
			supportedBy: "Con el respaldo de programas globales de startups",
		},
		paradigm: {
			tag: "EL PROBLEMA",
			titlePre: "La IA puede razonar. ",
			titleHighlight: "Aún necesita memoria.",
			subline:
				"Los modelos actuales tratan cada interacción como una sesión aislada. Sin memoria cognitiva persistente, la inteligencia sigue siendo sin estado, repetitiva y costosa.",
			problem1Title: "Límites de la ventana de contexto",
			problem1Desc:
				"Ampliar las ventanas de contexto aumenta los costos cuadráticos de atención y la latencia, sin proporcionar una retención real a largo plazo.",
			problem2Title: "RAG ingenuo y envoltorios",
			problem2Desc:
				"Las incrustaciones vectoriales estándar solo recuperan similitudes superficiales, sin modelar relaciones temporales ni hechos cambiantes.",
			problem3Title: "Multi-Agentes sin estado",
			problem3Desc:
				"Sin un estado compartido determinista, los flujos de trabajo de agentes sufren de deriva de memoria y fallos de coordinación irrecuperables.",
		},
		differentApproach: {
			sectionTag: "ARQUITECTURA",
			headlinePre: "Un enfoque radicalmente diferente para la ",
			headlineHighlight: "Memoria de IA",
			card1Title: "Grafo Neuronal Asociativo",
			card1Desc:
				"Combina incrustaciones semánticas con grafos de conocimiento dinámicos para formar vías de memoria asociativa que reflejan la cognición humana.",
			card2Title: "Motor de Estado Temporal",
			card2Desc:
				"Rastrea la evolución de creencias, preferencias y estados a lo largo del tiempo con reversión determinista y reconstrucción de estado puntual.",
			card3Title: "Recuperación Híbrida de Cero Latencia",
			card3Desc:
				"Indexación híbrida por debajo del milisegundo que combina similitud vectorial con recorrido simbólico de grafos para una precisión factual confiable.",
			quotePre: "La recuperación es una burda aproximación de la ",
			quoteHighlight: "memoria",
			quotePost:
				" — La verdadera inteligencia cognitiva requiere una persistencia de estado estructurada, evolutiva y contextual.",
			sotaTitle: "Rendimiento SOTA",
			sotaLine1: "Rendimiento líder en LongMemEval,",
			sotaLine2: "LoCoMo, ConvoMem con recuperación rápida y",
			sotaLine3: "un consumo de tokens drásticamente menor.",
			sotaMetric1Value: "#1",
			sotaMetric1Badge: "CLASIFICACIÓN",
			sotaMetric1Label: "Benchmark LongMem",
			sotaMetric2Value: "<500ms",
			sotaMetric2Badge: "LATENCIA",
			sotaMetric2Label: "Recuperación Híbrida Global",
			sotaMetric3Value: "50-90%",
			sotaMetric3Badge: "AHORRO DE TOKENS",
			sotaMetric3Label: "Reducción de Ventana de Contexto",
			tableHeaderDim: "Capacidades y Arquitectura",
			tableHeaderPiyapi: "Piyapi Cognitivo",
			tableHeaderVector: "Bases de Datos Vectoriales",
			tableHeaderRedis: "Redis / Clave-Valor",
			tableHeaderCustom: "Pipelines RAG Personalizados",
			row1Name: "Arquitectura de Memoria",
			row1Piyapi: "Grafo Neuronal + Memoria Temporal",
			row1Vector: "Índice Vectorial Plano (HNSW)",
			row1Redis: "Caché Clave-Valor Simple",
			row1Custom: "LangChain / LlamaIndex Ad-hoc",
			row2Name: "Seguimiento Temporal",
			row2Piyapi: "Línea de tiempo completa y evolución",
			row2Vector: "Sin conciencia temporal",
			row2Redis: "Marcas de tiempo TTL manuales",
			row2Custom: "Lógica personalizada frágil",
			row3Name: "Latencia de Recuperación",
			row3Piyapi: "< 500ms Recuperación Submilisegundo",
			row3Vector: "1.2s - 4.5s (Latencia de Consulta)",
			row3Redis: "Búsqueda rápida (sin semántica)",
			row3Custom: "2.5s - 8.0s (Alto Overhead)",
			row4Name: "Costo de Ventana de Contexto",
			row4Piyapi: "50-90% Menor Consumo de Tokens",
			row4Vector: "Relleno excesivo de prompts",
			row4Redis: "Sin poda semántica de contexto",
			row4Custom: "Alto desperdicio de tokens",
			row5Name: "Resolución de Conflictos",
			row5Piyapi: "Arbitraje determinista de la verdad",
			row5Vector: "Fragmentos conflictivos en top-k",
			row5Redis: "Sobrescritura por última escritura",
			row5Custom: "Alucinaciones impredecibles",
			row6Name: "Sincronización Multi-Agente",
			row6Piyapi: "Estructura de estado compartido en tiempo real",
			row6Vector: "Consulta sin estado por agente",
			row6Redis: "Bloqueo manual requerido",
			row6Custom: "Propenso a deriva de estado",
		},
		workflows: {
			headline: "Transformando Flujos de Trabajo con Memoria Persistente",
			subline:
				"Potencia tus agentes, copilotos y pipelines autónomos con arquitecturas de memoria diseñadas para producción.",
			card1Title: "Compañeros de IA Personal",
			card1Desc:
				"Conserva preferencias de usuario, matices emocionales y contexto vital a lo largo de meses de conversación.",
			card2Title: "Agentes de Conocimiento Empresarial",
			card2Desc:
				"Consulta miles de documentos internos, hilos de Slack y tickets con versionado de máxima precisión.",
			card3Title: "Coordinación Multi-Agente",
			card3Desc:
				"Permite que equipos de agentes especializados lean y escriban en un bloc de notas cognitivo unificado.",
			card4Title: "Salud e Historial del Paciente",
			card4Desc:
				"Rastrea historias clínicas longitudinales, visitas y evolución diagnóstica de forma segura.",
			card5Title: "Razonamiento Financiero y Auditoría",
			card5Desc:
				"Mantén registros de auditoría verificables para transacciones financieras, normativas y contexto de mercado.",
			card6Title: "Refactorización Autónoma de Código",
			card6Desc:
				"Permite a los copilotos de desarrollo recordar convenciones de repositorios, deuda técnica y PRs históricos.",
		},
		code: {
			headline: "Implementa en 3 Líneas de Código",
			subline:
				"Integra memoria cognitiva en tu stack de LLM en minutos con nuestros SDKs ligeros para TypeScript, Python y REST.",
			installCmd: "npm install @piyapi/sdk",
			feature1Title: "Cero Sobrecarga de Infraestructura",
			feature1Desc: "API en la nube totalmente gestionada y distribuida globalmente.",
			feature2Title: "Compatibilidad Universal con LLMs",
			feature2Desc: "Funciona perfectamente con OpenAI, Anthropic, Gemini y modelos locales.",
			feature3Title: "Conectores CDC Integrados",
			feature3Desc: "Sincronización automática en tiempo real con PostgreSQL, MongoDB, Notion y Slack.",
		},
		security: {
			headlinePre: "Tus Datos. Tu Memoria. ",
			headlineHighlight: "Tu Control.",
			headlinePost: "",
			subline:
				"Seguridad de nivel empresarial, gobernanza determinista y controles de privacidad granulares integrados en cada capa.",
			card1Title: "Cifrado de Extremo a Extremo",
			card1Desc: "Todos los grafos y vectores de memoria cifrados en tránsito (TLS 1.3) y en reposo (AES-256).",
			card2Title: "Cero Retención de Datos",
			card2Desc: "Límites estrictos de privacidad. Tus estados de memoria nunca se utilizan para entrenar modelos base.",
			card3Title: "Listo para SOC 2 y HIPAA",
			card3Desc: "Cumple con los estándares globales de privacidad, auditorías empresariales y requisitos de salud.",
			card4Title: "Despliegues On-Premises y VPC",
			card4Desc: "Despliega PiyAPI en tu VPC dedicada de AWS, GCP, Azure o nube soberana aislada.",
		},
		research: {
			headline: "Desde Nuestro Laboratorio de Investigación",
			subline: "Pioneros en memoria cognitiva determinista y arquitecturas de estado asociativo.",
			readPaper: "Leer Artículo",
			paper1Title: "Espacio de Estado Neuronal Asociativo para Diálogo a Largo Plazo",
			paper1Abstract:
				"Presentamos una arquitectura de memoria híbrida que combina espacios de estado temporal con índices de grafos asociativos dispersos para una retención conversacional ilimitada.",
			paper2Title: "Arbitraje Determinista de la Verdad en Grafos de Conocimiento Dinámicos",
			paper2Abstract:
				"Un marco formal para resolver contradicciones temporales en la memoria de LLM sin reentrenamiento ni reindexación de contexto completo.",
			paper3Title: "Recorrido de Grafos Semánticos Submilisegundo para Agentes en Tiempo Real",
			paper3Abstract:
				"Evaluación comparativa de estructuras de estado multi-agente de alto rendimiento frente a búsquedas vectoriales tradicionales en grafos de más de 10 millones de entidades.",
		},
		cta: {
			headline: "Construye con Piyapi",
			subline:
				"¿Tienes un caso de uso en mente? Habla con nuestro equipo y descubre cómo la memoria determinista se adapta a tu stack de IA.",
			talkButton: "Habla con el Equipo",
			marqueeItems: [
				"IA Conversacional",
				"Memoria Personal de IA",
				"Conocimiento Empresarial",
				"Sistemas Multi-Agente",
				"IA para Salud",
			],
		},
		calendly: {
			modalTitle: "Agendar una llamada con el equipo de Negentro",
			openNewTab: "Abrir en nueva pestaña",
			loading: "Cargando calendario de citas...",
		},
		footer: {
			infrastructure: "Infraestructura para IA confiable.",
			moreAboutUs: "Más sobre nosotros",
			devTitle: "Desarrolladores",
			devDocs: "Documentación para Desarrolladores",
			devApi: "Referencia de API",
			devMcp: "Integración MCP",
			devCli: "Referencia CLI",
			devTrust: "Centro de Confianza",
			devStatus: "Estado del Sistema",
			prodTitle: "Producto",
			prodPiyapi: "Motor PiyAPI",
			prodBench: "Benchmarks",
			prodPlayground: "Playground",
			prodConnectors: "Conectores de Datos",
			prodIntegrations: "Integraciones",
			prodChangelog: "Registro de Cambios",
			compTitle: "Compañía",
			compAbout: "Sobre Nosotros",
			compResearch: "Laboratorio de Investigación",
			compCareers: "Carreras",
			compPrivacy: "Política de Privacidad",
			compTerms: "Términos de Servicio",
			compSecurity: "Seguridad",
			useTitle: "Casos de Uso",
			useConv: "IA Conversacional",
			useAgents: "Estructuras Multi-Agente",
			useHealth: "IA para la Salud",
			useFin: "Razonamiento Financiero",
			useEnter: "Conocimiento Empresarial",
			soc2: "Listo para SOC 2 Tipo I y II",
			gdpr: "Listo para GDPR",
			hipaa: "Listo para HIPAA",
			contactTitle: "Contacto",
			copyright: "© 2026 INFORAVIUM TECHNOLOGIES PRIVATE LIMITED",
			rightsReserved: "– Todos los derechos reservados",
			languagesLabel: "Idiomas",
		},
		waitPage: {
			loading: "La memoria se está cargando...",
			sublinePre: "Nuestro equipo está dando los toques finales a",
			sublineHighlight: "Negentro.",
			comingSoon: "PRÓXIMAMENTE",
			exploreDocs: "Explorar Documentación",
			returnHome: "Volver al Inicio",
			notifyTitle: "Recibe una notificación cuando lancemos",
			notifySub: "Sé el primero en acceder a vistas previas de desarrollador, investigaciones y nuevas funciones.",
			placeholder: "Ingresa tu correo de trabajo",
			notifyBtn: "Notificarme",
			joined: "¡Estás en la lista! Te notificaremos al momento del lanzamiento.",
			subpageResearchTitle: "Investigación Pionera en IA Cognitiva",
			subpageResearchDesc:
				"Nuestro equipo de investigación publica artículos fundamentales sobre grafos neuronales asociativos, arbitraje de la verdad y arquitecturas de memoria para la inteligencia artificial general.",
			subpagePricingTitle: "Precios Transparentes y Escalables",
			subpagePricingDesc:
				"Niveles flexibles para desarrolladores e infraestructura empresarial de alto rendimiento diseñada para escalar la memoria desde prototipos hasta cientos de millones de consultas diarias.",
			subpageInitiativesTitle: "Iniciativas Globales de IA y Ecosistema",
			subpageInitiativesDesc:
				"Fomentando alianzas de investigación abierta, becas universitarias y SDKs de código abierto para democratizar la persistencia de estado cognitivo.",
			subpageResourcesTitle: "Recursos para Desarrolladores y Base de Conocimiento",
			subpageResourcesDesc:
				"Guías completas, planos arquitectónicos, recetas de integración y plugins MCP de la comunidad para ayudarte a crear aplicaciones de IA con memoria confiable.",
		},
	},

	fr: {
		nav: {
			overview: "Aperçu",
			research: "Recherche",
			pricing: "Tarification",
			initiatives: "Initiatives",
			resources: "Ressources",
			tryPiyApi: "Essayer PiyAPI",
		},
		hero: {
			headlinePre: "La prochaine évolution de\nl'intelligence est la ",
			headlineMemory: "Mémoire.",
			subline: "Piyapi donne à l'IA la capacité de se souvenir, d'apprendre et d'évoluer.",
			emailPlaceholder: "Entrez votre email",
			joinWaitlist: "Rejoindre la liste d'attente",
			joining: "Inscription...",
			successMsg: "Vous êtes sur la liste d'attente ! Nous vous contacterons bientôt.",
			duplicateMsg: "Vous êtes déjà sur la liste d'attente !",
			invalidEmailMsg: "Veuillez entrer une adresse email valide.",
		},
		partner: {
			supportedBy: "Soutenu par des programmes mondiaux de startups",
		},
		paradigm: {
			tag: "LE PROBLÈME",
			titlePre: "L'IA sait raisonner. ",
			titleHighlight: "Elle a encore besoin de mémoire.",
			subline:
				"Les modèles actuels traitent chaque interaction comme une session isolée. Sans mémoire cognitive persistante, l'intelligence reste sans état, répétitive et coûteuse.",
			problem1Title: "Limites de la fenêtre de contexte",
			problem1Desc:
				"L'augmentation des fenêtres de contexte accroît les coûts d'attention quadratiques et la latence, sans garantir une véritable rétention des connaissances à long terme.",
			problem2Title: "RAG naïf et wrappers",
			problem2Desc:
				"Les plongements vectoriels standards ne récupèrent que des similarités superficielles, échouant à modéliser les relations temporelles et les faits changeants.",
			problem3Title: "Multi-Agents sans état",
			problem3Desc:
				"Sans état partagé déterministe, les workflows d'agents souffrent de dérive de mémoire et d'échecs de coordination irrécupérables.",
		},
		differentApproach: {
			sectionTag: "ARCHITECTURE",
			headlinePre: "Une approche radicalement différente de la ",
			headlineHighlight: "Mémoire IA",
			card1Title: "Graphe Neuronal Associatif",
			card1Desc:
				"Combine des plongements sémantiques avec des graphes de connaissances dynamiques pour former des voies de mémoire associative inspirées de la cognition humaine.",
			card2Title: "Moteur d'État Temporel",
			card2Desc:
				"Suit l'évolution des croyances, préférences et états au fil du temps avec retour arrière déterministe et reconstruction d'état ponctuelle.",
			card3Title: "Récupération Hybride Zéro Latence",
			card3Desc:
				"Indexation hybride sous la milliseconde combinant similarité vectorielle et traversée de graphe symbolique pour un rappel factuel ultra-fiable.",
			quotePre: "La recherche vectorielle est une approximation rudimentaire de la ",
			quoteHighlight: "mémoire",
			quotePost:
				" — La véritable intelligence cognitive exige une persistance d'état structurée, évolutive et contextuelle.",
			sotaTitle: "Performances SOTA",
			sotaLine1: "Performances de pointe sur LongMemEval,",
			sotaLine2: "LoCoMo, ConvoMem avec un rappel ultra-rapide et",
			sotaLine3: "une réduction drastique de la consommation de jetons.",
			sotaMetric1Value: "#1",
			sotaMetric1Badge: "CLASSEMENT",
			sotaMetric1Label: "Benchmark LongMem",
			sotaMetric2Value: "<500ms",
			sotaMetric2Badge: "LATENCE",
			sotaMetric2Label: "Rappel Hybride Global",
			sotaMetric3Value: "50-90%",
			sotaMetric3Badge: "ÉCONOMIE DE JETONS",
			sotaMetric3Label: "Réduction de Fenêtre de Contexte",
			tableHeaderDim: "Capacités et Architecture",
			tableHeaderPiyapi: "Piyapi Cognitif",
			tableHeaderVector: "Bases Vectorielles Traditionnelles",
			tableHeaderRedis: "Redis / Clé-Valeur",
			tableHeaderCustom: "Pipelines RAG Personnalisés",
			row1Name: "Architecture de Mémoire",
			row1Piyapi: "Graphe Neuronal + Mémoire Temporelle",
			row1Vector: "Index Vectoriel Plat (HNSW)",
			row1Redis: "Cache Clé-Valeur Brut",
			row1Custom: "LangChain / LlamaIndex Ad-hoc",
			row2Name: "Suivi Temporel",
			row2Piyapi: "Chronologie complète et évolution",
			row2Vector: "Aucune conscience temporelle",
			row2Redis: "Horodatages TTL manuels",
			row2Custom: "Logique personnalisée fragile",
			row3Name: "Latence de Rappel",
			row3Piyapi: "< 500ms Rappel Sous-milliseconde",
			row3Vector: "1.2s - 4.5s (Latence de Requête)",
			row3Redis: "Recherche de clé rapide (sans sémantique)",
			row3Custom: "2.5s - 8.0s (Surcharge Élevée)",
			row4Name: "Coût de Fenêtre de Contexte",
			row4Piyapi: "50-90% Moins de Jetons Consommés",
			row4Vector: "Remplissage massif de prompts",
			row4Redis: "Aucun élagage contextuel",
			row4Custom: "Gaspillage élevé de jetons",
			row5Name: "Résolution des Conflits",
			row5Piyapi: "Arbitrage déterministe de la vérité",
			row5Vector: "Fragments contradictoires dans top-k",
			row5Redis: "Écrasement par dernière écriture",
			row5Custom: "Hallucinations imprévisibles",
			row6Name: "Synchronisation Multi-Agents",
			row6Piyapi: "Tissu d'état partagé en temps réel",
			row6Vector: "Requête sans état par agent",
			row6Redis: "Verrouillage manuel nécessaire",
			row6Custom: "Sujet à la dérive d'état",
		},
		workflows: {
			headline: "Transformer les Workflows avec une Mémoire Persistante",
			subline:
				"Donnez à vos agents, copilotes et pipelines autonomes des architectures de mémoire conçues pour la production.",
			card1Title: "Compagnons IA Personnels",
			card1Desc:
				"Conservez les préférences utilisateur, les nuances émotionnelles et le contexte de vie sur des mois de conversation.",
			card2Title: "Agents de Connaissances d'Entreprise",
			card2Desc:
				"Interrogez des milliers de documents internes, fils Slack et tickets avec un versionnage ultra-précis.",
			card3Title: "Coordination Multi-Agents",
			card3Desc:
				"Permettez à des équipes d'agents spécialisés de lire et d'écrire sur un bloc-notes cognitif unifié.",
			card4Title: "Santé et Historique Patient",
			card4Desc:
				"Suivez les parcours cliniques longitudinaux, les consultations et l'évolution diagnostique en toute sécurité.",
			card5Title: "Raisonnement Financier et Audit",
			card5Desc:
				"Maintenez des pistes d'audit vérifiables pour les transactions financières, les réglementations et le contexte du marché.",
			card6Title: "Refactorisation Autonome de Code",
			card6Desc:
				"Permettez aux copilotes développeurs de mémoriser les conventions de code, la dette technique et l'historique des PRs.",
		},
		code: {
			headline: "Déployez en 3 Lignes de Code",
			subline:
				"Intégrez la mémoire cognitive dans votre infrastructure LLM existante en quelques minutes grâce à nos SDKs légers pour TypeScript, Python et REST.",
			installCmd: "npm install @piyapi/sdk",
			feature1Title: "Zéro Gestion d'Infrastructure",
			feature1Desc: "API cloud entièrement gérée et distribuée à l'échelle mondiale.",
			feature2Title: "Compatibilité Universelle LLM",
			feature2Desc: "Fonctionne parfaitement avec OpenAI, Anthropic, Gemini et modèles locaux.",
			feature3Title: "Connecteurs CDC Intégrés",
			feature3Desc: "Synchronisation automatique en temps réel avec PostgreSQL, MongoDB, Notion et Slack.",
		},
		security: {
			headlinePre: "Vos Données. Votre Mémoire. ",
			headlineHighlight: "Votre Contrôle.",
			headlinePost: "",
			subline:
				"Sécurité de niveau entreprise, gouvernance déterministe et contrôles de confidentialité granulaires intégrés à chaque couche.",
			card1Title: "Chiffrement de Bout en Bout",
			card1Desc: "Tous les graphes et vecteurs de mémoire chiffrés en transit (TLS 1.3) et au repos (AES-256).",
			card2Title: "Zéro Rétention de Données",
			card2Desc: "Limites de confidentialité strictes. Vos états de mémoire ne sont jamais utilisés pour entraîner des modèles de base.",
			card3Title: "Prêt pour SOC 2 et HIPAA",
			card3Desc: "Conforme aux normes mondiales de confidentialité, aux audits d'entreprise et aux exigences de santé.",
			card4Title: "Déploiements On-Premises et VPC",
			card4Desc: "Déployez PiyAPI au sein de votre VPC dédié sur AWS, GCP, Azure ou dans un cloud souverain isolé.",
		},
		research: {
			headline: "De Notre Laboratoire de Recherche",
			subline: "Pionniers de la mémoire cognitive déterministe et des architectures d'état associatif.",
			readPaper: "Lire l'Article",
			paper1Title: "Espace d'État Neuronal Associatif pour Dialogue à Long Terme",
			paper1Abstract:
				"Nous présentons une architecture de mémoire hybride combinant des espaces d'état temporel avec des indices de graphes associatifs clairsemés pour une rétention conversationnelle sans limite.",
			paper2Title: "Arbitrage Déterministe de la Vérité dans les Graphes Dynamiques",
			paper2Abstract:
				"Un cadre formel pour résoudre les contradictions temporelles dans la mémoire des LLM sans réentraînement ni réindexation complète du contexte.",
			paper3Title: "Traversée de Graphe Sémantique Sous-milliseconde pour Agents en Temps Réel",
			paper3Abstract:
				"Évaluation comparative des tissus d'état multi-agents à haut débit par rapport à la recherche vectorielle traditionnelle sur des graphes de plus de 10 millions d'entités.",
		},
		cta: {
			headline: "Construisez avec Piyapi",
			subline:
				"Vous avez un cas d'usage en tête ? Échangez avec notre équipe et découvrez comment intégrer la mémoire déterministe dans votre stack IA.",
			talkButton: "Parler à l'Équipe",
			marqueeItems: [
				"IA Conversationnelle",
				"Mémoire IA Personnelle",
				"Connaissances Entreprise",
				"Systèmes Multi-Agents",
				"IA Médicale",
			],
		},
		calendly: {
			modalTitle: "Planifier un appel avec l'équipe Negentro",
			openNewTab: "Ouvrir dans un nouvel onglet",
			loading: "Chargement du calendrier...",
		},
		footer: {
			infrastructure: "Infrastructure pour une IA fiable.",
			moreAboutUs: "En savoir plus sur nous",
			devTitle: "Développeurs",
			devDocs: "Documentation Développeur",
			devApi: "Référence API",
			devMcp: "Intégration MCP",
			devCli: "Référence CLI",
			devTrust: "Centre de Confiance",
			devStatus: "Statut des Services",
			prodTitle: "Produit",
			prodPiyapi: "Moteur PiyAPI",
			prodBench: "Benchmarks",
			prodPlayground: "Playground",
			prodConnectors: "Connecteurs de Données",
			prodIntegrations: "Intégrations",
			prodChangelog: "Journal des Modifications",
			compTitle: "Entreprise",
			compAbout: "À Propos",
			compResearch: "Laboratoire de Recherche",
			compCareers: "Carrières",
			compPrivacy: "Politique de Confidentialité",
			compTerms: "Conditions d'Utilisation",
			compSecurity: "Sécurité",
			useTitle: "Cas d'Usage",
			useConv: "IA Conversationnelle",
			useAgents: "Tissus Multi-Agents",
			useHealth: "IA de Santé",
			useFin: "Raisonnement Financier",
			useEnter: "Connaissances Entreprise",
			soc2: "Prêt pour SOC 2 Type I & II",
			gdpr: "Prêt pour le RGPD",
			hipaa: "Prêt pour HIPAA",
			contactTitle: "Contactez-nous",
			copyright: "© 2026 INFORAVIUM TECHNOLOGIES PRIVATE LIMITED",
			rightsReserved: "– Tous droits réservés",
			languagesLabel: "Langues",
		},
		waitPage: {
			loading: "La mémoire est en cours de chargement...",
			sublinePre: "Notre équipe apporte les dernières touches à",
			sublineHighlight: "Negentro.",
			comingSoon: "BIENTÔT DISPONIBLE",
			exploreDocs: "Explorer la Documentation",
			returnHome: "Retour à l'Accueil",
			notifyTitle: "Soyez notifié lors du lancement",
			notifySub: "Soyez le premier informé des versions d'aperçu développeur, des publications de recherche et des nouveautés.",
			placeholder: "Entrez votre email professionnel",
			notifyBtn: "M'avertir",
			joined: "Vous êtes inscrit ! Nous vous préviendrons dès la sortie.",
			subpageResearchTitle: "Recherche Pionnière en IA Cognitive",
			subpageResearchDesc:
				"Notre équipe de recherche publie des articles fondamentaux sur les graphes neuronaux associatifs, l'arbitrage de vérité et les architectures de mémoire pour l'IA générale.",
			subpagePricingTitle: "Tarifs Transparents et Évolutifs",
			subpagePricingDesc:
				"Des forfaits flexibles pour développeurs et une infrastructure d'entreprise conçue pour faire évoluer la mémoire des prototypes vers des centaines de millions de requêtes quotidiennes.",
			subpageInitiativesTitle: "Initiatives Mondiales pour l'IA & Écosystème",
			subpageInitiativesDesc:
				"Favoriser les partenariats de recherche ouverte, les bourses universitaires et les SDKs open-source pour démocratiser la persistance d'état cognitif.",
			subpageResourcesTitle: "Ressources Développeurs & Base de Connaissances",
			subpageResourcesDesc:
				"Guides exhaustifs, schémas d'architecture, recettes d'intégration et plugins communautaires MCP pour vous aider à créer des applications d'IA mémorielle fiables.",
		},
	},

	de: {
		nav: {
			overview: "Übersicht",
			research: "Forschung",
			pricing: "Preise",
			initiatives: "Initiativen",
			resources: "Ressourcen",
			tryPiyApi: "PiyAPI Testen",
		},
		hero: {
			headlinePre: "Die nächste Evolution der\nIntelligenz ist ",
			headlineMemory: "Gedächtnis.",
			subline: "Piyapi verleiht KI die Fähigkeit zu erinnern, zu lernen und sich weiterzuentwickeln.",
			emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
			joinWaitlist: "Auf die Warteliste",
			joining: "Wird eingetragen...",
			successMsg: "Sie stehen auf der Warteliste! Wir melden uns in Kürze.",
			duplicateMsg: "Sie stehen bereits auf der Warteliste!",
			invalidEmailMsg: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
		},
		partner: {
			supportedBy: "Unterstützt von weltweiten Startup-Programmen",
		},
		paradigm: {
			tag: "DAS PROBLEM",
			titlePre: "KI kann schlussfolgern. ",
			titleHighlight: "Sie braucht Gedächtnis.",
			subline:
				"Aktuelle Modelle behandeln jede Interaktion als isolierte Sitzung. Ohne persistentes kognitives Gedächtnis bleibt Intelligenz zustandslos, repetitiv und teuer.",
			problem1Title: "Kontextfenster-Grenzen",
			problem1Desc:
				"Größere Kontextfenster erhöhen quadratische Aufmerksamkeitskosten und Latenzen, ohne echtes langfristiges Wissen zu speichern.",
			problem2Title: "Natives RAG & Wrapper",
			problem2Desc:
				"Standard-Vektoreinbettungen erfassen nur oberflächliche Ähnlichkeiten und modellieren weder zeitliche Beziehungen noch dynamische Fakten.",
			problem3Title: "Zustandslose Multi-Agenten",
			problem3Desc:
				"Ohne deterministischen gemeinsamen Zustand leiden Agenten-Workflows unter Gedächtnisdrift und irreparablen Koordinationsfehlern.",
		},
		differentApproach: {
			sectionTag: "ARCHITEKTUR",
			headlinePre: "Ein radikal neuer Ansatz für ",
			headlineHighlight: "KI-Gedächtnis",
			card1Title: "Assoziativer Neuronaler Graph",
			card1Desc:
				"Kombiniert semantische Einbettungen mit dynamischen Wissensgraphen zu assoziativen Gedächtnispfaden nach dem Vorbild menschlicher Kognition.",
			card2Title: "Temporale Zustands-Engine",
			card2Desc:
				"Verfolgt Wissensstände, Präferenzen und Zustandsänderungen über die Zeit mit deterministischem Rollback und zeitpunktgenauer Rekonstruktion.",
			card3Title: "Zero-Latency Hybrider Abruf",
			card3Desc:
				"Sub-Millisekunden-Hybridindizierung aus Vektorähnlichkeit und symbolischer Graph-Traversierung für extrem präzisen Faktenabruf.",
			quotePre: "Vektorsuche ist nur eine grobe Annäherung an ",
			quoteHighlight: "Gedächtnis",
			quotePost:
				" — Wahre kognitive Intelligenz erfordert strukturierte, sich entwickelnde und kontextbezogene Zustandspersistenz.",
			sotaTitle: "SOTA Performance-Überblick",
			sotaLine1: "Führende Performance bei LongMemEval,",
			sotaLine2: "LoCoMo, ConvoMem mit schnellem Abruf und",
			sotaLine3: "drastisch reduziertem Token-Verbrauch.",
			sotaMetric1Value: "#1",
			sotaMetric1Badge: "PLATZIERUNG",
			sotaMetric1Label: "LongMem Benchmark",
			sotaMetric2Value: "<500ms",
			sotaMetric2Badge: "LATENZ",
			sotaMetric2Label: "Globaler Hybrider Abruf",
			sotaMetric3Value: "50-90%",
			sotaMetric3Badge: "TOKEN-ERSPARNIS",
			sotaMetric3Label: "Reduzierung des Kontextfensters",
			tableHeaderDim: "Funktionen & Architektur",
			tableHeaderPiyapi: "Piyapi Kognitiv",
			tableHeaderVector: "Herkömmliche Vektordatenbanken",
			tableHeaderRedis: "Redis / Key-Value",
			tableHeaderCustom: "Individuelle RAG-Pipelines",
			row1Name: "Gedächtnisarchitektur",
			row1Piyapi: "Neuronaler Graph + Temporaler Speicher",
			row1Vector: "Flacher Vektorindex (HNSW)",
			row1Redis: "Reines Key-Value-Caching",
			row1Custom: "Ad-hoc LangChain / LlamaIndex",
			row2Name: "Temporales Tracking",
			row2Piyapi: "Vollständige Zeitleiste & Faktenentwicklung",
			row2Vector: "Kein Zeitbewusstsein",
			row2Redis: "Manuelle TTL-Zeitstempel",
			row2Custom: "Fragile Eigenlogik",
			row3Name: "Abruflatenz",
			row3Piyapi: "< 500ms Sub-Millisekunden-Abruf",
			row3Vector: "1.2s - 4.5s (Abfragelatenz)",
			row3Redis: "Schneller Key-Lookup (ohne Semantik)",
			row3Custom: "2.5s - 8.0s (Hoher Overhead)",
			row4Name: "Kontextfenster-Kosten",
			row4Piyapi: "50-90% Geringerer Token-Verbrauch",
			row4Vector: "Überladenes Prompt-Stuffing",
			row4Redis: "Kein semantisches Kontext-Pruning",
			row4Custom: "Hohe Token-Verschwendung",
			row5Name: "Konfliktlösung",
			row5Piyapi: "Deterministische Wahrheits-Arbitrierung",
			row5Vector: "Widersprüchliche Chunks im Top-k",
			row5Redis: "Last-Write-Wins Überschreibung",
			row5Custom: "Unvorhersehbare Halluzinationen",
			row6Name: "Multi-Agenten-Synchronisation",
			row6Piyapi: "Echtzeit-Struktur für geteilten Zustand",
			row6Vector: "Zustandslose Abfrage pro Agent",
			row6Redis: "Manuelle Sperren erforderlich",
			row6Custom: "Anfällig für Zustandsdrift",
		},
		workflows: {
			headline: "Workflows mit Persistentem Gedächtnis Transformieren",
			subline:
				"Statten Sie Ihre Agenten, Copiloten und autonomen Pipelines mit produktionsreifen Gedächtnisarchitekturen aus.",
			card1Title: "Persönliche KI-Begleiter",
			card1Desc:
				"Behalten Sie Nutzerpräferenzen, emotionale Nuancen und Lebenskontext über Monate hinweg bei.",
			card2Title: "Wissensagenten für Unternehmen",
			card2Desc:
				"Durchsuchen Sie Tausende interne Dokumente, Slack-Threads und Tickets mit präziser Versionierung.",
			card3Title: "Multi-Agenten-Koordination",
			card3Desc:
				"Ermöglichen Sie spezialisierten Agententeams das gemeinsame Lesen und Schreiben auf einem kognitiven Notizblock.",
			card4Title: "Gesundheitswesen & Patientenhistorie",
			card4Desc:
				"Verfolgen Sie Behandlungsverläufe, Arztbesuche und diagnostische Entwicklungen mit höchster Datensicherheit.",
			card5Title: "Finanzanalysen & Audit-Trails",
			card5Desc:
				"Führen Sie nachvollziehbare Audit-Protokolle für Finanztransaktionen, regulatorische Vorschriften und Marktdaten.",
			card6Title: "Autonome Code-Refaktorierung",
			card6Desc:
				"Geben Sie Entwickler-Copiloten ein Gedächtnis für Konventionen, technische Schulden und historische Pull Requests.",
		},
		code: {
			headline: "In 3 Zeilen Code Einsatzbereit",
			subline:
				"Integrieren Sie kognitives Gedächtnis in wenigen Minuten in Ihren LLM-Stack mit unseren leichtgewichtigen SDKs für TypeScript, Python und REST.",
			installCmd: "npm install @piyapi/sdk",
			feature1Title: "Kein Infrastruktur-Overhead",
			feature1Desc: "Vollständig verwaltete, global verteilte Cloud-API.",
			feature2Title: "Universelle LLM-Kompatibilität",
			feature2Desc: "Kompatibel mit OpenAI, Anthropic, Gemini und lokalen Modellen.",
			feature3Title: "Integrierte CDC-Konnektoren",
			feature3Desc: "Automatische Echtzeitsynchronisierung mit PostgreSQL, MongoDB, Notion und Slack.",
		},
		security: {
			headlinePre: "Ihre Daten. Ihr Gedächtnis. ",
			headlineHighlight: "Ihre Kontrolle.",
			headlinePost: "",
			subline:
				"Sicherheit auf Enterprise-Niveau, deterministische Governance und granulare Datenschutzkontrollen auf jeder Ebene.",
			card1Title: "Ende-zu-Ende-Verschlüsselung",
			card1Desc: "Alle Gedächtnisgraphen und Vektoren bei Übertragung (TLS 1.3) und im Ruhezustand (AES-256) verschlüsselt.",
			card2Title: "Keine Datenspeicherung zu Trainingszwecken",
			card2Desc: "Strikte Datenschutzgrenzen. Ihre Gedächtniszustände werden niemals für Basistrainings verwendet.",
			card3Title: "SOC 2 & HIPAA Konform",
			card3Desc: "Erfüllt weltweite Datenschutzstandards, Enterprise-Audits und regulatorische Vorgaben.",
			card4Title: "On-Premises & VPC-Bereitstellungen",
			card4Desc: "Betreiben Sie PiyAPI in Ihrer dedizierten AWS, GCP, Azure VPC oder einer isolierten Sovereign Cloud.",
		},
		research: {
			headline: "Aus Unserem Forschungslabor",
			subline: "Pioniere im Bereich deterministischer kognitiver Gedächtnis- und assoziativer Zustandsarchitekturen.",
			readPaper: "Paper Lesen",
			paper1Title: "Assoziativer Neuronaler Zustandsraum für Langzeitdialoge",
			paper1Abstract:
				"Wir präsentieren eine hybride Gedächtnisarchitektur, die temporale Zustandsräume mit spärlich besetzten assoziativen Graphenindizes für unbegrenzte Dialogerinnerung verbindet.",
			paper2Title: "Deterministische Wahrheits-Arbitrierung in Dynamischen Wissensgraphen",
			paper2Abstract:
				"Ein formales Framework zur Auflösung zeitlicher Widersprüche im LLM-Gedächtnis ohne Nachtraining oder vollständige Kontextneuberechnung.",
			paper3Title: "Sub-Millisekunden-Semantikgraphen-Traversierung für Echtzeit-Agenten",
			paper3Abstract:
				"Benchmark-Vergleich von Multi-Agenten-Zustandsstrukturen gegenüber herkömmlicher Vektorsuche auf Graphen mit über 10 Mio. Entitäten.",
		},
		cta: {
			headline: "Bauen Sie mit Piyapi",
			subline:
				"Haben Sie einen konkreten Anwendungsfall? Sprechen Sie mit unserem Team und entdecken Sie, wie deterministischer Speicher Ihren KI-Stack optimiert.",
			talkButton: "Mit dem Team Sprechen",
			marqueeItems: [
				"Konversations-KI",
				"Persönliches KI-Gedächtnis",
				"Unternehmenswissen",
				"Multi-Agenten-Systeme",
				"Healthcare-KI",
			],
		},
		calendly: {
			modalTitle: "Termin mit dem Negentro-Team vereinbaren",
			openNewTab: "In neuem Tab öffnen",
			loading: "Kalender wird geladen...",
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
			devStatus: "Systemstatus",
			prodTitle: "Produkt",
			prodPiyapi: "PiyAPI Engine",
			prodBench: "Benchmarks",
			prodPlayground: "Playground",
			prodConnectors: "Daten-Konnektoren",
			prodIntegrations: "Integrationen",
			prodChangelog: "Changelog",
			compTitle: "Unternehmen",
			compAbout: "Über Uns",
			compResearch: "Forschungslabor",
			compCareers: "Karriere",
			compPrivacy: "Datenschutzerklärung",
			compTerms: "Nutzungsbedingungen",
			compSecurity: "Sicherheit",
			useTitle: "Anwendungsfälle",
			useConv: "Konversations-KI",
			useAgents: "Multi-Agenten-Strukturen",
			useHealth: "Healthcare-KI",
			useFin: "Finanz-Analysen",
			useEnter: "Unternehmenswissen",
			soc2: "SOC 2 Typ I & II Bereit",
			gdpr: "DSGVO Konform",
			hipaa: "HIPAA Konform",
			contactTitle: "Kontakt",
			copyright: "© 2026 INFORAVIUM TECHNOLOGIES PRIVATE LIMITED",
			rightsReserved: "– Alle Rechte vorbehalten",
			languagesLabel: "Sprachen",
		},
		waitPage: {
			loading: "Gedächtnis wird geladen...",
			sublinePre: "Unser Team legt letzte Hand an",
			sublineHighlight: "Negentro.",
			comingSoon: "DEMNÄCHST VERFÜGBAR",
			exploreDocs: "Dokumentation Erkunden",
			returnHome: "Zur Startseite",
			notifyTitle: "Bei Veröffentlichung benachrichtigt werden",
			notifySub: "Erhalten Sie als Erster Zugang zu Entwickler-Previews, Forschungspapieren und neuen Funktionen.",
			placeholder: "Geben Sie Ihre geschäftliche E-Mail ein",
			notifyBtn: "Benachrichtigen",
			joined: "Sie stehen auf der Liste! Wir informieren Sie zum Start.",
			subpageResearchTitle: "Pionierarbeit in Kognitiver KI-Forschung",
			subpageResearchDesc:
				"Unser Forschungsteam veröffentlicht grundlegende Arbeiten zu assoziativen neuronalen Graphen, Wahrheitsarbitrierung und Gedächtnisarchitekturen für künstliche allgemeine Intelligenz.",
			subpagePricingTitle: "Transparente & Skalierbare Preise",
			subpagePricingDesc:
				"Flexible Entwickler-Tarife und hochleistungsfähige Enterprise-Infrastruktur zur Skalierung von Prototypen bis hin zu Hunderten Millionen täglicher Abfragen.",
			subpageInitiativesTitle: "Globale KI-Initiativen & Ökosystem",
			subpageInitiativesDesc:
				"Förderung offener Forschungspartnerschaften, Universitätsstipendien und Open-Source-SDKs zur Demokratisierung kognitiver Zustandspersistenz.",
			subpageResourcesTitle: "Entwickler-Ressourcen & Knowledge Base",
			subpageResourcesDesc:
				"Umfassende Anleitungen, Architektur-Blueprints, Integrationsbeispiele und Community-MCP-Plugins für den Bau zuverlässiger KI-Anwendungen.",
		},
	},

	ru: {
		nav: {
			overview: "Обзор",
			research: "Исследования",
			pricing: "Тарифы",
			initiatives: "Инициативы",
			resources: "Ресурсы",
			tryPiyApi: "Попробовать PiyAPI",
		},
		hero: {
			headlinePre: "Следующий этап эволюции\nинтеллекта — это ",
			headlineMemory: "Память.",
			subline: "Piyapi дает искусственному интеллекту возможность помнить, учиться и развиваться.",
			emailPlaceholder: "Введите ваш email",
			joinWaitlist: "Вступить в лист ожидания",
			joining: "Запись...",
			successMsg: "Вы в списке ожидания! Мы свяжемся с вами в ближайшее время.",
			duplicateMsg: "Вы уже находитесь в списке ожидания!",
			invalidEmailMsg: "Пожалуйста, введите корректный адрес электронной почты.",
		},
		partner: {
			supportedBy: "При поддержке ведущих международных акселераторов",
		},
		paradigm: {
			tag: "ПРОБЛЕМА",
			titlePre: "ИИ способен рассуждать. ",
			titleHighlight: "Ему все еще нужна память.",
			subline:
				"Современные модели воспринимают каждое взаимодействие как изолированную сессию. Без постоянной когнитивной памяти интеллект остается статичным, повторяющимся и дорогим.",
			problem1Title: "Ограничения контекстного окна",
			problem1Desc:
				"Увеличение контекстного окна экспоненциально повышает вычислительные затраты и задержку, не обеспечивая долговременного сохранения знаний.",
			problem2Title: "Примитивный RAG и обертки",
			problem2Desc:
				"Обычные векторные базы данных находят лишь поверхностные сходства, не способные отражать временные взаимосвязи и изменение фактов.",
			problem3Title: "Мультиагентные системы без состояния",
			problem3Desc:
				"Без детерминированного общего состояния рабочие процессы агентов подвержены искажению памяти и несогласованности действий.",
		},
		differentApproach: {
			sectionTag: "АРХИТЕКТУРА",
			headlinePre: "Принципиально новый подход к ",
			headlineHighlight: "Памяти ИИ",
			card1Title: "Ассоциативный Нейрограф",
			card1Desc:
				"Объединяет семантические эмбеддинги с динамическими графами знаний, создавая ассоциативные пути памяти по аналогии с человеческим мозгом.",
			card2Title: "Движок Временных Состояний",
			card2Desc:
				"Отслеживает изменение убеждений, предпочтений и контекста во времени с возможностью детерминированного отката к любой точке истории.",
			card3Title: "Мгновенный Гибридный Поиск",
			card3Desc:
				"Субмиллисекундная гибридная индексация, сочетающая векторный поиск со структурированным обходом графа для безупречной точности.",
			quotePre: "Векторный поиск — лишь грубое приближение к ",
			quoteHighlight: "памяти",
			quotePost:
				" — Истинному когнитивному интеллекту требуется структурированное, развивающееся и контекстное сохранение состояния.",
			sotaTitle: "Показатели SOTA",
			sotaLine1: "Лидирующие результаты в LongMemEval,",
			sotaLine2: "LoCoMo, ConvoMem со сверхбыстрым откликом и",
			sotaLine3: "кардинально сниженным расходом токенов.",
			sotaMetric1Value: "#1",
			sotaMetric1Badge: "РЕЙТИНГ",
			sotaMetric1Label: "Бенчмарк LongMem",
			sotaMetric2Value: "<500мс",
			sotaMetric2Badge: "ЗАДЕРЖКА",
			sotaMetric2Label: "Глобальный Гибридный Отклик",
			sotaMetric3Value: "50-90%",
			sotaMetric3Badge: "ЭКОНОМИЯ ТОКЕНОВ",
			sotaMetric3Label: "Сокращение контекстного окна",
			tableHeaderDim: "Возможности и Архитектура",
			tableHeaderPiyapi: "Piyapi Когнитивная",
			tableHeaderVector: "Традиционные Векторные БД",
			tableHeaderRedis: "Redis / Key-Value",
			tableHeaderCustom: "Кастомные RAG Пайплайны",
			row1Name: "Архитектура Памяти",
			row1Piyapi: "Нейрограф + Временная Память",
			row1Vector: "Плоский векторный индекс (HNSW)",
			row1Redis: "Простое кэширование ключ-значение",
			row1Custom: "Связки LangChain / LlamaIndex",
			row2Name: "Учет Фактора Времени",
			row2Piyapi: "Полная хронология и эволюция фактов",
			row2Vector: "Нет временного контекста",
			row2Redis: "Ручные метки TTL",
			row2Custom: "Ненадежная кастомная логика",
			row3Name: "Скорость Отклика",
			row3Piyapi: "< 500мс Субмиллисекундный поиск",
			row3Vector: "1.2с - 4.5с (Задержка запроса)",
			row3Redis: "Быстрый поиск по ключу (без смысла)",
			row3Custom: "2.5с - 8.0с (Высокие накладные расходы)",
			row4Name: "Расход Токенов",
			row4Piyapi: "На 50-90% Меньше Расход Токенов",
			row4Vector: "Перегрузка контекста сырыми данными",
			row4Redis: "Нет смысловой фильтрации",
			row4Custom: "Большие потери токенов",
			row5Name: "Разрешение Конфликтов",
			row5Piyapi: "Детерминированный арбитраж фактов",
			row5Vector: "Противоречивые фрагменты в выдаче",
			row5Redis: "Перезапись последней операцией",
			row5Custom: "Непредсказуемые галлюцинации",
			row6Name: "Мультиагентная Синхронизация",
			row6Piyapi: "Единое общее состояние в реальном времени",
			row6Vector: "Изолированные запросы агентов",
			row6Redis: "Требуются ручные блокировки",
			row6Custom: "Высокий риск рассинхронизации",
		},
		workflows: {
			headline: "Трансформация Процессов с Долговременной Памятью",
			subline:
				"Оснастите ваших агентов, копайлотов и автономные конвейеры архитектурой памяти, готовой к продакшену.",
			card1Title: "Персональные ИИ-Ассистенты",
			card1Desc:
				"Сохраняйте предпочтения пользователя, эмоциональный контекст и детали общения на протяжении месяцев диалога.",
			card2Title: "Корпоративные Базы Знаний",
			card2Desc:
				"Мгновенный поиск по тысячам внутренних документов, переписке в Slack и тикетам с точным версионированием.",
			card3Title: "Координация Мультиагентов",
			card3Desc:
				"Позволяет командам специализированных агентов совместно работать с единым когнитивным пространством памяти.",
			card4Title: "Медицина и История Пациентов",
			card4Desc:
				"Безопасное отслеживание динамики лечения, истории приемов и диагностических показателей пациентов.",
			card5Title: "Финансовый Анализ и Аудит",
			card5Desc:
				"Формирование прозрачных аудиторских следов для финансовых операций, комплаенса и рыночной аналитики.",
			card6Title: "Автономный Рефакторинг Кода",
			card6Desc:
				"Копайлоты для разработчиков запоминают архитектурные правила репозитория, техдолг и историю пулл-реквестов.",
		},
		code: {
			headline: "Интеграция в 3 Строки Кода",
			subline:
				"Подключите когнитивную память к вашему LLM-стеку за считанные минуты с помощью наших SDK для TypeScript, Python и REST.",
			installCmd: "npm install @piyapi/sdk",
			feature1Title: "Без Затрат на Инфраструктуру",
			feature1Desc: "Полностью управляемый, глобально распределенный облачный API.",
			feature2Title: "Универсальная Совместимость",
			feature2Desc: "Бесшовная работа с OpenAI, Anthropic, Gemini и локальными моделями.",
			feature3Title: "Готовые CDC-Коннекторы",
			feature3Desc: "Автоматическая синхронизация в реальном времени с PostgreSQL, MongoDB, Notion и Slack.",
		},
		security: {
			headlinePre: "Ваши Данные. Ваша Память. ",
			headlineHighlight: "Ваш Контроль.",
			headlinePost: "",
			subline:
				"Корпоративный уровень безопасности, детерминированное управление и гранулярный контроль конфиденциальности на каждом уровне.",
			card1Title: "Сквозное Шифрование",
			card1Desc: "Все графы и векторы памяти зашифрованы при передаче (TLS 1.3) и хранении (AES-256).",
			card2Title: "Нулевое Сохранение Данных",
			card2Desc: "Строгая изоляция. Ваши данные памяти никогда не используются для обучения базовых моделей.",
			card3Title: "Готовность к SOC 2 и HIPAA",
			card3Desc: "Соответствие международным стандартам безопасности, корпоративным аудитам и медицинским протоколам.",
			card4Title: "On-Premises и VPC Развертывание",
			card4Desc: "Развертывание PiyAPI в изолированном VPC в AWS, GCP, Azure или в суверенном закрытом контуре.",
		},
		research: {
			headline: "Из Нашей Исследовательской Лаборатории",
			subline: "Передовые разработки в области детерминированной когнитивной памяти и ассоциативных архитектур.",
			readPaper: "Читать Статью",
			paper1Title: "Ассоциативное Нейропространство Состояний для Долговременного Диалога",
			paper1Abstract:
				"Мы представляем гибридную архитектуру памяти, объединяющую временные пространства состояний с разреженными ассоциативными графами для неограниченного сохранения контекста.",
			paper2Title: "Детерминированный Арбитраж Истинности в Динамических Графах Знаний",
			paper2Abstract:
				"Формальная модель разрешения временных противоречий в памяти LLM без повторного обучения или переиндексации контекста.",
			paper3Title: "Субмиллисекундный Семантический Обход Графов для Агентов Реального Времени",
			paper3Abstract:
				"Сравнительный анализ высоконагруженных мультиагентных систем памяти с векторным поиском на графах более 10 млн сущностей.",
		},
		cta: {
			headline: "Создавайте с Piyapi",
			subline:
				"Есть проект или идея? Обсудите с нашей командой, как детерминированная память может усилить ваш ИИ-стек.",
			talkButton: "Связаться с Командой",
			marqueeItems: [
				"Диалоговый ИИ",
				"Персональная Память ИИ",
				"Корпоративные Знания",
				"Мультиагентные Системы",
				"Медицинский ИИ",
			],
		},
		calendly: {
			modalTitle: "Запланировать встречу с командой Negentro",
			openNewTab: "Открыть в новой вкладке",
			loading: "Загрузка календаря...",
		},
		footer: {
			infrastructure: "Инфраструктура для надежного ИИ.",
			moreAboutUs: "Подробнее о нас",
			devTitle: "Разработчикам",
			devDocs: "Документация",
			devApi: "Справочник API",
			devMcp: "Интеграция MCP",
			devCli: "Справочник CLI",
			devTrust: "Центр Доверия",
			devStatus: "Статус Системы",
			prodTitle: "Продукт",
			prodPiyapi: "Движок PiyAPI",
			prodBench: "Бенчмарки",
			prodPlayground: "Песочница",
			prodConnectors: "Коннекторы Данных",
			prodIntegrations: "Интеграции",
			prodChangelog: "История Изменений",
			compTitle: "Компания",
			compAbout: "О Нас",
			compResearch: "Лаборатория",
			compCareers: "Карьера",
			compPrivacy: "Политика Конфиденциальности",
			compTerms: "Условия Использования",
			compSecurity: "Безопасность",
			useTitle: "Сферы Применения",
			useConv: "Диалоговый ИИ",
			useAgents: "Мультиагентные Системы",
			useHealth: "Медицина и Здравоохранение",
			useFin: "Финансовая Аналитика",
			useEnter: "Корпоративные Знания",
			soc2: "Готовность к SOC 2 Type I & II",
			gdpr: "Соответствие GDPR",
			hipaa: "Соответствие HIPAA",
			contactTitle: "Контакты",
			copyright: "© 2026 INFORAVIUM TECHNOLOGIES PRIVATE LIMITED",
			rightsReserved: "– Все права защищены",
			languagesLabel: "Языки",
		},
		waitPage: {
			loading: "Память загружается...",
			sublinePre: "Наша команда наносит последние штрихи на",
			sublineHighlight: "Negentro.",
			comingSoon: "СКОРО ОТКРЫТИЕ",
			exploreDocs: "Изучить Документацию",
			returnHome: "На Главную",
			notifyTitle: "Узнайте первыми о запуске",
			notifySub: "Получите ранний доступ к превью для разработчиков, публикациям исследований и новым функциям.",
			placeholder: "Введите ваш рабочий email",
			notifyBtn: "Уведомить Меня",
			joined: "Вы в списке! Мы сообщим вам сразу после релиза.",
			subpageResearchTitle: "Передовые Исследования в Области Когнитивного ИИ",
			subpageResearchDesc:
				"Наша исследовательская команда публикует фундаментальные работы по ассоциативным нейрографам, арбитражу фактов и архитектурам памяти для сильного искусственного интеллекта.",
			subpagePricingTitle: "Прозрачные и Гибкие Тарифы",
			subpagePricingDesc:
				"Доступные тарифы для разработчиков и мощная корпоративная инфраструктура, готовая масштабироваться от первых тестов до сотен миллионов запросов в день.",
			subpageInitiativesTitle: "Глобальные Инициативы и Экосистема ИИ",
			subpageInitiativesDesc:
				"Развитие открытых научных партнерств, университетских грантов и открытых SDK для демократизации когнитивной памяти в ИИ.",
			subpageResourcesTitle: "База Знаний и Ресурсы для Разработчиков",
			subpageResourcesDesc:
				"Подробные руководства, архитектурные схемы, примеры интеграции и плагины сообщества для создания надежных ИИ-приложений с долговременной памятью.",
		},
	},
}

interface LanguageContextType {
	language: Language
	setLanguage: (lang: Language) => void
	t: TranslationDictionary
}

const LanguageContext = createContext<LanguageContextType>({
	language: "en",
	setLanguage: () => {},
	t: translations.en,
})

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [language, setLanguageState] = useState<Language>(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("negentro_language") as Language | null
			if (saved && ["en", "es", "fr", "de", "ru"].includes(saved)) {
				return saved
			}
		}
		return "en"
	})

	const setLanguage = (lang: Language) => {
		setLanguageState(lang)
		if (typeof window !== "undefined") {
			localStorage.setItem("negentro_language", lang)
			document.documentElement.lang = lang
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

export const useLanguage = () => useContext(LanguageContext)
