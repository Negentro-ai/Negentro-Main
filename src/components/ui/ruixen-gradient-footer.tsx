"use client"

import {
	type CSSProperties,
	type ReactNode,
	useEffect,
	useId,
	useRef,
} from "react"

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

export interface RuixenGradientFooterProps {
	/** Footer content — links, wordmark, copyright — shown above the glow. */
	children?: ReactNode
	/** Height of the glow band reserved under the content. */
	gradientHeight?: string
	className?: string
	style?: CSSProperties
}

export function RuixenGradientFooter({
	children,
	gradientHeight = "340px",
	className,
	style,
}: RuixenGradientFooterProps) {
	const uid = useId().replace(/:/g, "")
	const bandRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = bandRef.current
		if (!el) return
		const doc = el.ownerDocument
		const win = doc.defaultView ?? window

		let rafId: number | null = null

		const update = () => {
			if (!el) return
			const scrollRemaining =
				doc.documentElement.scrollHeight - win.innerHeight - win.scrollY

			// Reveal gracefully over the final 320px scroll stretch to the bottom
			const revealDistance = 320
			const t = clamp01((revealDistance - scrollRemaining) / revealDistance)

			if (t <= 0.005) {
				el.style.opacity = "0"
				el.style.visibility = "hidden"
				el.style.transform = "translate3d(0, 100%, 0)"
			} else {
				el.style.visibility = "visible"
				// Smooth ease-out cubic curve
				const eased = t * t * (3 - 2 * t)
				el.style.opacity = `${Math.min(1, eased * 1.05)}`
				const translateY = (1 - eased) * 45 // smooth 45px lift
				el.style.transform = `translate3d(0, ${translateY}px, 0)`
			}
		}

		const onScroll = () => {
			if (rafId !== null) return
			rafId = requestAnimationFrame(() => {
				update()
				rafId = null
			})
		}

		update()
		win.addEventListener("scroll", onScroll, { passive: true })
		win.addEventListener("resize", onScroll, { passive: true })

		return () => {
			if (rafId !== null) cancelAnimationFrame(rafId)
			win.removeEventListener("scroll", onScroll)
			win.removeEventListener("resize", onScroll)
		}
	}, [])

	return (
		<footer
			className={className}
			style={{ paddingBottom: gradientHeight, ...style }}
		>
			{children}

			{/* Dynamic Pristine Glowing Cosmic Dome Curve */}
			<div
				ref={bandRef}
				aria-hidden="true"
				className="pointer-events-none fixed inset-x-0 bottom-0 overflow-visible z-10"
				style={{
					height: gradientHeight,
					transform: "translate3d(0, 100%, 0)",
					opacity: 0,
					visibility: "hidden",
					willChange: "transform, opacity",
				}}
			>
				<svg
					className="w-full h-full block overflow-visible select-none"
					viewBox="0 100 1728 350"
					preserveAspectRatio="none"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						{/* Outer Indigo Blur */}
						<filter
							id={`blur-outer-${uid}`}
							x="-20%"
							y="-20%"
							width="140%"
							height="140%"
						>
							<feGaussianBlur stdDeviation="28" />
						</filter>

						{/* Middle Violet Blur */}
						<filter
							id={`blur-mid-${uid}`}
							x="-20%"
							y="-20%"
							width="140%"
							height="140%"
						>
							<feGaussianBlur stdDeviation="18" />
						</filter>

						{/* Inner Lilac Blur */}
						<filter
							id={`blur-inner-${uid}`}
							x="-20%"
							y="-20%"
							width="140%"
							height="140%"
						>
							<feGaussianBlur stdDeviation="10" />
						</filter>

						{/* Intense Crest Glow Filter */}
						<filter
							id={`glow-crest-${uid}`}
							x="-10%"
							y="-10%"
							width="120%"
							height="120%"
						>
							<feDropShadow
								dx="0"
								dy="-4"
								stdDeviation="12"
								floodColor="#ECCDF5"
								floodOpacity="0.8"
							/>
						</filter>
					</defs>

					{/* 1. Outer Deep Indigo Dome (#4846AC) */}
					<g filter={`url(#blur-outer-${uid})`}>
						<path
							d="M -200 450 Q 864 110 1928 450 L 1928 500 L -200 500 Z"
							fill="#4846AC"
							opacity="0.9"
						/>
					</g>

					{/* 2. Middle Electric Violet Dome (#765DFB) */}
					<g filter={`url(#blur-mid-${uid})`}>
						<path
							d="M -100 450 Q 864 180 1828 450 L 1828 500 L -100 500 Z"
							fill="#765DFB"
							opacity="0.92"
						/>
					</g>

					{/* 3. Inner Luminous Lilac Crest Dome (#ECCDF5) */}
					<g filter={`url(#blur-inner-${uid})`}>
						<path
							d="M 0 450 Q 864 250 1728 450 L 1728 500 L 0 500 Z"
							fill="#ECCDF5"
							opacity="0.95"
						/>
					</g>

					{/* 4. Middle Arc Definition Line */}
					<path
						d="M -100 450 Q 864 180 1828 450"
						stroke="#765DFB"
						strokeWidth="1.5"
						strokeOpacity="0.75"
						fill="none"
					/>

					{/* 5. Razor-Sharp Luminous Top Crest Arc with Radiant Neon Glow */}
					<path
						d="M 0 450 Q 864 250 1728 450"
						stroke="#ECCDF5"
						strokeWidth="2.5"
						strokeOpacity="0.98"
						fill="none"
						filter={`url(#glow-crest-${uid})`}
					/>
				</svg>
			</div>
		</footer>
	)
}
