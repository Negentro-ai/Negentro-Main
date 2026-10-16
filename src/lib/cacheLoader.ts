/**
 * High-performance Cache Loader & Asset Preloader for Negentro AI
 * Provides instant in-memory image warming and Service Worker registration.
 */

// Critical interactive & visual assets to warm in browser cache
export const CRITICAL_ASSETS = [
	"/logos/negentro.webp",
	"/logos/negentro.svg",
	"/assets/piyapi-logo-exact.webp",
	"/assets/context-problem.webp",
	"/assets/wrappers-problem.webp",
	"/assets/native-problem.webp",
	"/assets/cta-bg-frame88.webp",
	"/logos/notion.svg",
	"/logos/claude.svg",
	"/logos/modal.svg",
	"/logos/mongoDB.svg",
]

// Secondary below-the-fold assets to preload during idle time
export const IDLE_ASSETS = [
	"/assets/AI Agents.webp",
	"/assets/Conversational AI.webp",
	"/assets/RAG Systems.webp",
	"/assets/Enterprise Knowledge.webp",
	"/assets/Multi-Agents.webp",
	"/assets/High-Stakes.webp",
	"/assets/research-butterfly.webp",
	"/assets/research-image-2.webp",
	"/assets/research-image-3.webp",
	"/assets/use-cases/hero_server_room.webp",
	"/assets/blog/featured-reliable-ai.webp",
	"/assets/research/memory-performance-chart.webp",
]

const preloadedSet = new Set<string>()

/**
 * Preloads a single image URL into browser cache
 */
export function preloadImage(src: string): Promise<void> {
	if (typeof window === "undefined" || !src || preloadedSet.has(src)) {
		return Promise.resolve()
	}

	return new Promise((resolve) => {
		const img = new Image()
		img.onload = () => {
			preloadedSet.add(src)
			resolve()
		}
		img.onerror = () => {
			// Resolve on error to avoid unhandled rejections
			resolve()
		}
		img.src = src
	})
}

/**
 * Batch preload an array of images
 */
export function preloadImages(srcs: string[]): Promise<void[]> {
	return Promise.all(srcs.map((src) => preloadImage(src)))
}

/**
 * Registers the service worker in production and warms critical cache
 */
export function initCacheLoader(): void {
	if (typeof window === "undefined") return

	// 1. Immediately warm critical assets
	preloadImages(CRITICAL_ASSETS)

	// 2. Preload secondary assets during browser idle
	const preloadIdle = () => {
		if ("requestIdleCallback" in window) {
			window.requestIdleCallback(
				() => {
					preloadImages(IDLE_ASSETS)
				},
				{ timeout: 2000 },
			)
		} else {
			setTimeout(() => {
				preloadImages(IDLE_ASSETS)
			}, 800)
		}
	}

	if (document.readyState === "complete") {
		preloadIdle()
	} else {
		window.addEventListener("load", preloadIdle, { once: true })
	}

	// 3. Register Service Worker for offline resilience & instant caching
	if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
		window.addEventListener("load", () => {
			navigator.serviceWorker
				.register("/sw.js")
				.then((reg) => {
					// Check for SW updates
					reg.addEventListener("updatefound", () => {
						const newWorker = reg.installing
						if (newWorker) {
							newWorker.addEventListener("statechange", () => {
								if (
									newWorker.state === "installed" &&
									navigator.serviceWorker.controller
								) {
									console.debug("[SW] New version available in background")
								}
							})
						}
					})
				})
				.catch((err) => {
					console.debug("[SW] Registration skipped or failed:", err)
				})
		})
	}
}
