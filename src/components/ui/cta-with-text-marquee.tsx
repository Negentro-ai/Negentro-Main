"use client"

import { cn } from "@/lib/utils"
import { type ReactNode, useEffect, useRef } from "react"
import Velaris from "@/components/ui/velaris"

interface VerticalMarqueeProps {
	children: ReactNode
	pauseOnHover?: boolean
	reverse?: boolean
	className?: string
	speed?: number
	onItemsRef?: (items: HTMLElement[]) => void
}

function VerticalMarquee({
	children,
	pauseOnHover = false,
	reverse = false,
	className,
	speed = 28,
	onItemsRef,
}: VerticalMarqueeProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (onItemsRef && containerRef.current) {
			const items = Array.from(
				containerRef.current.querySelectorAll(".marquee-item"),
			) as HTMLElement[]
			onItemsRef(items)
		}
	}, [onItemsRef])

	return (
		<div
			ref={containerRef}
			className={cn("group flex flex-col overflow-hidden", className)}
			style={
				{
					"--duration": `${speed}s`,
				} as React.CSSProperties
			}
		>
			<div
				className={cn(
					"flex shrink-0 flex-col animate-marquee-vertical",
					reverse && "[animation-direction:reverse]",
					pauseOnHover && "group-hover:[animation-play-state:paused]",
				)}
			>
				{children}
			</div>
			<div
				className={cn(
					"flex shrink-0 flex-col animate-marquee-vertical",
					reverse && "[animation-direction:reverse]",
					pauseOnHover && "group-hover:[animation-play-state:paused]",
				)}
				aria-hidden="true"
			>
				{children}
			</div>
		</div>
	)
}

const marqueeItems = [
	"Conversational AI",
	"Personal AI Memory",
	"Enterprise Knowledge",
	"Multi-Agent Systems",
	"Healthcare AI",
]

export interface CTAWithVerticalMarqueeProps {
	onOpenConsole?: () => void
}

export default function CTAWithVerticalMarquee({
	onOpenConsole: _onOpenConsole,
}: CTAWithVerticalMarqueeProps = {}) {
	const marqueeRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const marqueeContainer = marqueeRef.current
		if (!marqueeContainer) return

		const updateOpacity = () => {
			const items = marqueeContainer.querySelectorAll(".marquee-item")
			const containerRect = marqueeContainer.getBoundingClientRect()
			const centerY = containerRect.top + containerRect.height / 2

			items.forEach((item) => {
				const itemRect = item.getBoundingClientRect()
				const itemCenterY = itemRect.top + itemRect.height / 2
				const distance = Math.abs(centerY - itemCenterY)
				const maxDistance = containerRect.height / 2
				const normalizedDistance = Math.min(distance / maxDistance, 1)
				const opacity = 1 - normalizedDistance * 0.78
				;(item as HTMLElement).style.opacity = Math.max(
					0.2,
					opacity,
				).toString()
			})
		}

		const animationFrame = () => {
			updateOpacity()
			requestAnimationFrame(animationFrame)
		}

		const frame = requestAnimationFrame(animationFrame)

		return () => cancelAnimationFrame(frame)
	}, [])

	return (
		/* ═══════════════════════════════════════════════════════════════════════
		   CTA SECTION WITH VELARIS ANIMATED WEBGL BACKGROUND & USE CASE MARQUEE
		   ═══════════════════════════════════════════════════════════════════════ */
		<section className="w-full relative overflow-hidden bg-[#0e0728] min-h-[400px] lg:min-h-[450px] flex items-center justify-center font-['DM_Sans',sans-serif] border-t border-white/10 select-none">
			{/* Velaris Living WebGL Shader Background */}
			<div className="absolute inset-0 w-full h-full pointer-events-none">
				<Velaris
					bg="#0e0728"
					colors={["#6355DC", "#9B7EF8", "#4846AC", "#765DFB"]}
					speed={1.4}
					grain={0.16}
					height="100%"
					className="w-full h-full"
				/>
			</div>

			{/* Cosmic Nebula Background Image Overlay with Soft Blend */}
			<img
				src="/assets/cta-bg-frame88.jpg"
				alt="Cosmic Nebula Background"
				className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none mix-blend-overlay opacity-60"
			/>

			{/* Subtle Contrast Gradient */}
			<div className="absolute inset-0 bg-gradient-to-r from-[#0a071c]/70 via-transparent to-[#1a0f3d]/40 pointer-events-none" />

			{/* Main Content Container */}
			<div className="relative z-10 w-full max-w-[1258px] mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16 h-full flex flex-col justify-center">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
					{/* Left Content Column */}
					<div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
						{/* Headline: Build With Piyapi */}
						<h2 className="text-[36px] sm:text-[46px] lg:text-[52px] font-bold leading-[1.06] tracking-[-0.03em] text-white font-['DM_Sans',sans-serif]">
							Build With Piyapi
						</h2>

						{/* Subheading */}
						<p className="text-[14.5px] sm:text-[16px] lg:text-[17px] text-white/90 font-normal leading-relaxed max-w-[480px] font-['DM_Sans',sans-serif]">
							Have a use case in mind? Talk to our team and explore
							<br className="hidden sm:inline" />
							{" "}where deterministic memory can fit into your AI stack.
						</p>

						{/* Action Button: Talk to the Team */}
						<div className="pt-2">
							<button
								type="button"
								onClick={(e) => e.preventDefault()}
								className="px-6 py-2.5 rounded-[6px] bg-white text-[#3B368C] font-semibold text-[14.5px] tracking-normal shadow-md hover:bg-neutral-50 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center justify-center"
							>
								Talk to the Team
							</button>
						</div>
					</div>

					{/* Right Moving Word Marquee directly on cosmic background */}
					<div
						ref={marqueeRef}
						className="lg:col-span-6 relative h-[320px] sm:h-[360px] lg:h-[390px] flex items-center justify-start pointer-events-none bg-transparent overflow-hidden"
						style={{
							maskImage:
								"linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
							WebkitMaskImage:
								"linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
						}}
					>
						<div className="relative w-full h-full flex items-center justify-start bg-transparent">
							<VerticalMarquee
								speed={14}
								className="h-full w-full bg-transparent"
							>
								{marqueeItems.map((item, idx) => (
									<div
										key={idx}
										className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-normal tracking-[-0.015em] py-3 sm:py-3.5 text-white marquee-item text-left transition-opacity duration-150 font-['DM_Sans',sans-serif] select-none"
									>
										{item}
									</div>
								))}
							</VerticalMarquee>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
