import type React from "react"
import { Shield, ListOrdered, Layers, Sliders, ChevronRight } from "lucide-react"
import { MemoryVerificationDemo } from "@/components/ui/MemoryVerificationDemo"
import { useLanguage } from "@/lib/i18n"

export const SecurityComplianceSection: React.FC = () => {
	const { t } = useLanguage()

	const securityPillars = [
		{
			icon: <Shield className="w-4.5 h-4.5 text-white" />,
			title: t.security.card1Title,
			desc: t.security.card1Desc,
		},
		{
			icon: <ListOrdered className="w-4.5 h-4.5 text-white" />,
			title: t.security.card2Title,
			desc: t.security.card2Desc,
		},
		{
			icon: <Layers className="w-4.5 h-4.5 text-white" />,
			title: t.security.card3Title,
			desc: t.security.card3Desc,
		},
		{
			icon: <Sliders className="w-4.5 h-4.5 text-white" />,
			title: t.security.card4Title,
			desc: t.security.card4Desc,
		},
	]

	const primitives = [
		"AES-256-GCM",
		"Argon2id",
		"HMAC-SHA256",
		"PostgreSQL RLS",
		"SAML/OIDC",
		"SSRF Protection",
		"Rate Limiting",
		"TLS 1.3",
	]

	return (
		<section className="w-full bg-white pt-8 sm:pt-10 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 font-['DM_Sans',sans-serif]">
			<div className="container-universal space-y-10 sm:space-y-12">
				{/* Top-Left Category Tag */}
				<div className="w-full flex items-center justify-start">
					<div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.08em] text-[#888E94] uppercase select-none">
						<ChevronRight className="w-3.5 h-3.5 text-[#0562EF] stroke-[3]" />
						<span>PRIVACY &amp; SECURITY</span>
					</div>
				</div>

				{/* Centered Main Title & Subtitle */}
				<div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
					<h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#000410] tracking-[-0.03em] leading-[1.12]">
						{t.security.headlinePre}
						<span className="text-[#765DFB]">{t.security.headlineHighlight}</span>
					</h2>

					<p className="text-base sm:text-[17px] text-[#000410] leading-relaxed font-normal max-w-2xl mx-auto">
						{t.security.subline}
					</p>
				</div>

				{/* Central Visual Banner: Animated Memory Verification Flow */}
				<MemoryVerificationDemo />

				{/* 5 Security Pillar Cards (5 Columns Grid) */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
					{securityPillars.map((pillar) => (
						<div
							key={pillar.title}
							className="rounded-[18px] bg-white border border-[#E5E2F4] p-6 shadow-[0_4px_20px_rgba(35,25,105,0.03)] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#765DFB]/40 hover:-translate-y-1 min-h-[190px]"
						>
							<div>
								<div className="w-9 h-9 rounded-[10px] bg-[#765DFB] flex items-center justify-center shadow-xs mb-4">
									{pillar.icon}
								</div>

								<h3 className="text-base sm:text-[17px] font-bold text-[#000410] tracking-tight mb-2">
									{pillar.title}
								</h3>

								<p className="text-xs sm:text-[13px] text-[#888E94] leading-relaxed font-normal">
									{pillar.desc}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Bottom Bar: Security Primitives Badges with Static Left Section, Divider Line & Right-to-Left Marquee */}
				<div className="rounded-[14px] sm:rounded-[16px] bg-white border border-[#E5E2F4] p-4 sm:p-5 shadow-[0_4px_20px_rgba(35,25,105,0.03)] flex items-center overflow-hidden relative">
					{/* Left Static Text & Icon */}
					<div className="flex items-center gap-3.5 shrink-0 z-20 bg-white pr-4 sm:pr-6 select-none">
						{/* Exact Group 72.svg double-shield vector */}
						<svg
							className="w-6 h-8 sm:w-7 sm:h-9 shrink-0"
							viewBox="0 0 34 42"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M32.4072 22.4889C32.4072 32.4077 25.4641 37.3671 17.2116 40.2436C16.7791 40.3904 16.311 40.3825 15.8825 40.2238C7.61017 37.3671 0.666992 32.4077 0.666992 22.4889V8.60256C0.666992 7.50752 1.55572 6.61879 2.65076 6.61879C6.61829 6.61879 11.5777 4.23827 15.0294 1.22295C15.8983 0.481022 17.1759 0.481022 18.0448 1.22295C21.5164 4.25811 26.4559 6.61879 30.4235 6.61879C31.5185 6.61879 32.4072 7.50752 32.4072 8.60256V22.4889Z"
								stroke="#09090B"
								strokeWidth="1.33333"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M29.7949 22.1632C29.7949 30.4491 23.9948 34.592 17.101 36.9949C16.7398 37.1175 16.3487 37.1109 15.9907 36.9783C9.08035 34.592 3.28027 30.4491 3.28027 22.1632V10.5631C3.28027 9.64833 4.02268 8.90592 4.93744 8.90592C8.25177 8.90592 12.3947 6.91732 15.2782 4.39843C16.004 3.77865 17.0712 3.77865 17.797 4.39843C20.6971 6.93389 24.8234 8.90592 28.1378 8.90592C29.0525 8.90592 29.7949 9.64833 29.7949 10.5631V22.1632Z"
								stroke="#09090B"
								strokeWidth="1.33333"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span className="text-[13.5px] sm:text-[15.5px] font-bold text-[#000410] whitespace-nowrap">
							Built on proven
							<br className="sm:hidden" /> security primitives.
						</span>
					</div>

					{/* Vertical Dividing Line */}
					<div className="h-8 sm:h-9 w-[1.5px] bg-[#E2DFED] shrink-0 z-20" />

					{/* Right Animated Marquee Track (Moving Right to Left, contained inside box) */}
					<div
						className="flex-1 overflow-hidden relative ml-3 sm:ml-5 flex items-center"
						style={{
							maskImage:
								"linear-gradient(to right, black 0%, black 85%, transparent 100%)",
							WebkitMaskImage:
								"linear-gradient(to right, black 0%, black 85%, transparent 100%)",
						}}
					>
						<div
							className="flex items-center"
							style={
								{
									"--duration": "22s",
								} as React.CSSProperties
							}
						>
							<div className="flex shrink-0 items-center gap-2.5 sm:gap-3 animate-marquee pr-2.5 sm:pr-3">
								{primitives.map((item) => (
									<span
										key={item}
										className="px-3.5 py-1.5 rounded-[6px] bg-[#6B57FB] text-white text-xs sm:text-[13px] font-medium tracking-wide whitespace-nowrap shadow-2xs select-none"
									>
										{item}
									</span>
								))}
							</div>
							<div
								className="flex shrink-0 items-center gap-2.5 sm:gap-3 animate-marquee pr-2.5 sm:pr-3"
								aria-hidden="true"
							>
								{primitives.map((item) => (
									<span
										key={`dup-${item}`}
										className="px-3.5 py-1.5 rounded-[6px] bg-[#6B57FB] text-white text-xs sm:text-[13px] font-medium tracking-wide whitespace-nowrap shadow-2xs select-none"
									>
										{item}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
