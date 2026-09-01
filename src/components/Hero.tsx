import type React from "react"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { Loader2 } from "lucide-react"
import { submitWaitlistEmail } from "@/lib/supabase"

export interface HeroProps {
	onOpenConsole?: () => void
}

export const Hero: React.FC<HeroProps> = () => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const headingRef = useRef<HTMLHeadingElement | null>(null)
	const sublineRef = useRef<HTMLParagraphElement | null>(null)
	const formRef = useRef<HTMLDivElement | null>(null)
	const [email, setEmail] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [statusMessage, setStatusMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		if (!headingRef.current || !sublineRef.current) return

		const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

		// Heading reveal animation
		gsap.set(headingRef.current, {
			opacity: 0,
			y: 24,
			scale: 0.96,
			filter: "blur(8px)",
		})
		tl.to(
			headingRef.current,
			{
				opacity: 1,
				y: 0,
				scale: 1,
				filter: "blur(0px)",
				duration: 0.9,
				ease: "power2.out",
			},
			0.3,
		)

		// Subheading reveal
		gsap.set(sublineRef.current, { opacity: 0, y: 16, filter: "blur(6px)" })
		tl.to(
			sublineRef.current,
			{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				duration: 0.8,
				ease: "power2.out",
			},
			0.65,
		)

		// Waitlist Form reveal
		if (formRef.current) {
			gsap.set(formRef.current, { opacity: 0, y: 20, scale: 0.96 })
			tl.to(
				formRef.current,
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.85,
					ease: "back.out(1.15)",
				},
				0.95,
			)
		}

		return () => {
			tl.kill()
		}
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!email || !email.includes("@")) return
		setIsSubmitting(true)
		setErrorMessage("")

		const res = await submitWaitlistEmail(email)
		setIsSubmitting(false)

		if (res.success) {
			setStatusMessage(res.message)
			setSubmitted(true)
		} else {
			setErrorMessage(res.message)
		}
	}

	return (
		<div
			ref={containerRef}
			className="w-full max-w-5xl mx-auto text-center px-6 sm:px-8 z-10"
		>
			<h1
				ref={headingRef}
				className="text-4xl sm:text-6xl md:text-[68px] lg:text-[76px] font-bold tracking-[-0.035em] text-[#eef0f6] max-w-5xl mx-auto leading-[1.12] pointer-events-none select-none"
			>
				The Next Evolution Of
				<br />
				Intelligence Is <span className="text-[#765DFB]">Memory.</span>
			</h1>

			<p
				ref={sublineRef}
				className="text-base sm:text-xl md:text-[22px] text-[#b9becf] font-normal max-w-3xl mx-auto leading-relaxed mt-5 sm:mt-7 tracking-[-0.01em] pointer-events-none select-none"
			>
				Piyapi gives AI the ability to remember, learn, and evolve.
			</p>

			{/* Waitlist Form Container */}
			<div
				ref={formRef}
				className="mt-8 sm:mt-10 flex flex-col items-center justify-center w-full pointer-events-auto"
			>
				{submitted ? (
					<div className="flex items-center justify-center h-14 sm:h-16 px-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg animate-fade-in text-[#eef0f6] text-base sm:text-lg font-medium">
						<span>✨ {statusMessage || "You're on the waitlist! We'll be in touch soon."}</span>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="w-full max-w-[590px]">
						<div className="flex items-center h-14 sm:h-16 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-xl shadow-sm pl-5 sm:pl-6 pr-1.5 sm:pr-2 transition-all duration-300 ease-out focus-within:border-white/30 focus-within:bg-white/[0.12] focus-within:shadow-[0_0_24px_rgba(193,106,255,0.18)]">
							<input
								type="email"
								required
								disabled={isSubmitting}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								className="flex-1 min-w-0 h-full bg-transparent text-[#eef0f6] text-base sm:text-lg outline-none border-none placeholder:text-[#b9becf] font-normal font-sans disabled:opacity-50"
							/>
							<button
								type="submit"
								disabled={isSubmitting}
								className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-white hover:bg-white/90 text-[#2f2f33] font-medium text-sm sm:text-base cursor-pointer shadow-xs hover:shadow-md transition-all duration-250 ease-out hover:scale-[1.03] active:scale-[0.97] shrink-0 select-none disabled:opacity-60 disabled:cursor-not-allowed"
							>
								{isSubmitting ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin text-[#2f2f33]" />
										<span>Joining...</span>
									</>
								) : (
									"Join Waitlist"
								)}
							</button>
						</div>
						{errorMessage && (
							<p className="text-sm text-red-300 mt-2.5 font-medium animate-fade-in">
								{errorMessage}
							</p>
						)}
					</form>
				)}
			</div>
		</div>
	)
}
