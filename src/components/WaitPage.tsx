import type React from "react"
import { useLanguage } from "@/lib/i18n"

export interface WaitPageProps {
	pageName?: string
}

export const WaitPage: React.FC<WaitPageProps> = () => {
	const { t } = useLanguage()

	return (
		<div className="container-universal flex-1 flex flex-col items-center justify-center text-center py-8 sm:py-12 animate-fade-in my-auto">
			<div className="relative mb-6 sm:mb-8 flex items-center justify-center">
				<img
					src="/wait-illustration.svg"
					alt="Memory is loading"
					className="w-[320px] sm:w-[420px] md:w-[480px] max-w-[90vw] h-auto object-contain select-none transition-transform hover:scale-[1.02] duration-300"
				/>
			</div>

			<h1 className="text-4xl sm:text-5xl md:text-[54px] font-bold tracking-[-0.03em] leading-[1.18] bg-gradient-to-r from-[#4846AC] via-[#765DFB] to-[#9B7EF8] bg-clip-text text-transparent pb-1 px-1">
				{t.waitPage.loading}
			</h1>

			<p className="text-base sm:text-lg md:text-[22px] font-bold text-black tracking-[-0.01em] -mt-1 sm:-mt-1.5 max-w-2xl mx-auto leading-snug">
				{t.waitPage.sublinePre}{" "}
				<span className="text-[#765DFB]">{t.waitPage.sublineHighlight}</span>
			</p>
		</div>
	)
}
