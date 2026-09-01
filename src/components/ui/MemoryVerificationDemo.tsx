"use client"

import React, { useState, useEffect } from "react"

const FULL_QUERY = "what is the SSO requirement for enterprise customers?"
const FULL_ANSWER = "Enterprise Customers require SSO"

export const MemoryVerificationDemo: React.FC = () => {
	const [typedQuery, setTypedQuery] = useState("")
	const [step, setStep] = useState<
		"typing" | "signal1" | "verified" | "signal2" | "answer" | "hold"
	>("typing")

	useEffect(() => {
		let isMounted = true
		let timer: NodeJS.Timeout

		const runSequence = async () => {
			if (!isMounted) return

			// Reset
			setTypedQuery("")
			setStep("typing")

			// 1. Type query
			for (let i = 1; i <= FULL_QUERY.length; i++) {
				if (!isMounted) return
				await new Promise((resolve) => {
					timer = setTimeout(resolve, 38 + Math.random() * 20)
				})
				if (!isMounted) return
				setTypedQuery(FULL_QUERY.slice(0, i))
			}

			// Small pause after typing
			await new Promise((resolve) => {
				timer = setTimeout(resolve, 400)
			})
			if (!isMounted) return

			// 2. Signal 1 travels left to center
			setStep("signal1")
			await new Promise((resolve) => {
				timer = setTimeout(resolve, 600)
			})
			if (!isMounted) return

			// 3. Center card verified
			setStep("verified")
			await new Promise((resolve) => {
				timer = setTimeout(resolve, 1000)
			})
			if (!isMounted) return

			// 4. Signal 2 travels center to right
			setStep("signal2")
			await new Promise((resolve) => {
				timer = setTimeout(resolve, 600)
			})
			if (!isMounted) return

			// 5. Answer appears
			setStep("answer")
			await new Promise((resolve) => {
				timer = setTimeout(resolve, 4000)
			})
			if (!isMounted) return

			// Loop again
			runSequence()
		}

		runSequence()

		return () => {
			isMounted = false
			clearTimeout(timer)
		}
	}, [])

	const isCenterActive =
		step === "verified" || step === "signal2" || step === "answer"
	const isRightActive = step === "answer"
	const isSignal1Active = step === "signal1"
	const isSignal2Active = step === "signal2"

	return (
		<div className="w-full rounded-[20px] bg-gradient-to-r from-[#9A89F4] via-[#B8A3FA] to-[#8E7BF0] border border-[#BFBFBF]/60 p-6 sm:p-10 lg:p-12 shadow-[0_14px_36px_rgba(118,93,251,0.12)] overflow-hidden font-['DM_Sans',sans-serif]">
			<div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
				{/* 1. Left: User Query Card */}
				<div className="w-full lg:w-[260px] shrink-0">
					<div className="flex items-center justify-between mb-1">
						<span className="text-xs text-[#5C5880] font-medium block">
							User
						</span>
						{step === "typing" && (
							<span className="text-[10px] uppercase font-bold text-[#5146B8] tracking-wider animate-pulse">
								typing...
							</span>
						)}
					</div>
					<div className="bg-white rounded-[8px] p-4 sm:p-5 shadow-sm border border-[#BFBFBF]/40 min-h-[64px] flex items-center transition-all duration-300">
						<p className="text-[13px] sm:text-[13.5px] font-bold text-[#0F1123] leading-snug font-['DM_Sans',sans-serif]">
							{typedQuery.length > 0 ? (
								<>
									{typedQuery.slice(
										0,
										typedQuery.indexOf("enterprise") !== -1
											? typedQuery.indexOf("enterprise") + 10
											: typedQuery.length,
									)}
									{typedQuery.length > 39 && <br />}
									{typedQuery.indexOf("enterprise") !== -1 &&
										typedQuery.slice(typedQuery.indexOf("enterprise") + 10)}
								</>
							) : (
								<span className="text-neutral-400 font-normal italic">
									Ask a question...
								</span>
							)}
							{step === "typing" && (
								<span className="inline-block w-[2px] h-[14px] bg-[#765DFB] ml-0.5 align-middle animate-pulse" />
							)}
						</p>
					</div>
				</div>

				{/* Connector 1 (Left -> Center) */}
				<div className="hidden lg:flex items-center justify-center shrink-0 w-14 sm:w-16 relative">
					{/* Base dashed line */}
					<div
						className={`w-full border-t-2 border-dashed transition-colors duration-300 ${
							isSignal1Active || isCenterActive
								? "border-[#5146B8]"
								: "border-[#5146B8]/40"
						}`}
					/>
					{/* Glowing traveling dot */}
					{isSignal1Active && (
						<div
							className="absolute w-3 h-3 rounded-full bg-[#5146B8] shadow-[0_0_10px_#5146B8] animate-[signalDot_0.6s_ease-out_forwards]"
							style={{
								animation: "signalMove 0.6s ease-out forwards",
							}}
						/>
					)}
				</div>

				{/* 2. Center: Memory Verified Card */}
				<div className="w-full lg:w-[410px] shrink-0">
					<div className="flex items-center justify-between mb-1.5">
						<span
							className={`text-[11px] sm:text-xs font-bold tracking-[0.06em] uppercase font-['DM_Sans',sans-serif] transition-colors duration-300 ${
								isCenterActive ? "text-[#5146B8]" : "text-[#5C5880]/70"
							}`}
						>
							MEMORY VERIFIED
						</span>
						{step === "signal1" && (
							<span className="text-[10px] uppercase font-bold text-[#5146B8] tracking-wider animate-pulse">
								searching memory...
							</span>
						)}
					</div>

					<div
						className={`bg-white rounded-[10px] p-5 sm:p-6 shadow-md border border-[#BFBFBF]/40 space-y-4 transition-all duration-500 transform ${
							isCenterActive
								? "opacity-100 translate-y-0 scale-100 shadow-[0_10px_30px_rgba(118,93,251,0.15)]"
								: "opacity-40 translate-y-1 scale-[0.98]"
						}`}
					>
						{/* Top Policy Bar */}
						<div className="flex items-center justify-between">
							<span className="text-[13.5px] font-bold text-[#2D2A54] font-['DM_Sans',sans-serif]">
								Customer policy
							</span>
							<span
								className={`text-xs font-semibold font-['DM_Sans',sans-serif] transition-all duration-300 ${
									isCenterActive
										? "text-[#16A34A] opacity-100"
										: "text-neutral-400 opacity-60"
								}`}
							>
								{isCenterActive ? "verified" : "verifying..."}
							</span>
						</div>

						{/* Remembered Item */}
						<div className="space-y-1">
							<span className="text-[10px] font-bold text-[#888E94] uppercase tracking-[0.08em] block">
								REMEMBERED
							</span>
							<p className="text-[13.5px] font-bold text-[#0F1123] leading-tight font-['DM_Sans',sans-serif]">
								Enterprise customers require SSO
							</p>
						</div>

						{/* Source */}
						<div className="space-y-1">
							<span className="text-[10px] font-bold text-[#888E94] uppercase tracking-[0.08em] block">
								SOURCE
							</span>
							<p className="text-[13px] font-bold text-[#0F1123] font-['DM_Sans',sans-serif]">
								CRM &rarr; Account #4821
							</p>
						</div>

						{/* Timestamps */}
						<div className="grid grid-cols-2 gap-4 pt-1">
							<div>
								<span className="text-[10px] font-bold text-[#888E94] uppercase tracking-[0.08em] block mb-0.5">
									CREATED
								</span>
								<span className="text-xs font-bold text-[#0F1123] font-['DM_Sans',sans-serif]">
									12 Jun 2026
								</span>
							</div>
							<div>
								<span className="text-[10px] font-bold text-[#888E94] uppercase tracking-[0.08em] block mb-0.5">
									CREATED
								</span>
								<span className="text-xs font-bold text-[#0F1123] font-['DM_Sans',sans-serif]">
									17 Jun 2026
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Connector 2 (Center -> Right) */}
				<div className="hidden lg:flex items-center justify-center shrink-0 w-14 sm:w-16 relative">
					{/* Base dashed line */}
					<div
						className={`w-full border-t-2 border-dashed transition-colors duration-300 ${
							isSignal2Active || isRightActive
								? "border-[#5146B8]"
								: "border-[#5146B8]/40"
						}`}
					/>
					{/* Glowing traveling dot */}
					{isSignal2Active && (
						<div
							className="absolute w-3 h-3 rounded-full bg-[#5146B8] shadow-[0_0_10px_#5146B8]"
							style={{
								animation: "signalMove 0.6s ease-out forwards",
							}}
						/>
					)}
				</div>

				{/* 3. Right: Answer Card */}
				<div className="w-full lg:w-[260px] shrink-0">
					<div className="flex items-center justify-between mb-1">
						<span className="text-xs text-white/90 font-medium block">
							Answer
						</span>
						{isRightActive && (
							<span className="text-[10px] uppercase font-bold text-white tracking-wider animate-fade-in">
								ready
							</span>
						)}
					</div>
					<div
						className={`bg-white rounded-[8px] p-4 sm:p-5 shadow-sm border border-[#BFBFBF]/40 min-h-[64px] flex items-center transition-all duration-500 ${
							isRightActive
								? "opacity-100 translate-y-0 scale-100 shadow-[0_10px_30px_rgba(118,93,251,0.15)]"
								: "opacity-30 translate-y-1 scale-[0.98]"
						}`}
					>
						<p className="text-[13px] sm:text-[13.5px] font-bold text-[#0F1123] leading-snug font-['DM_Sans',sans-serif]">
							{isRightActive ? (
								FULL_ANSWER
							) : (
								<span className="text-neutral-400 font-normal italic">
									Awaiting memory...
								</span>
							)}
						</p>
					</div>
					<p
						className={`text-xs text-white/90 font-normal mt-2 font-['DM_Sans',sans-serif] transition-opacity duration-300 ${
							isRightActive ? "opacity-100" : "opacity-40"
						}`}
					>
						answer from verified memory
					</p>
				</div>
			</div>
		</div>
	)
}

export default MemoryVerificationDemo
