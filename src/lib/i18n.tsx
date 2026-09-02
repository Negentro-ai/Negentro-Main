import React, { createContext, useContext, useState, useEffect } from "react"

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
			tryPiyApi: "Try Piyapi",
		},
		hero: {
			headlinePre: "The Next Evolution Of\nIntelligence Is ",
			headlineMemory: "Memory.",
			subline: "Piyapi gives AI the ability to remember, learn, and evolve.",
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
