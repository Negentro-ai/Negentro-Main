import type React from "react"
import { NotionLogo, ClaudeLogo, ModalLogo, MongoDbLogo } from "./Logos"

export const PartnerLogos: React.FC = () => {
	// Define the set of 4 partner logos with optically balanced height and width proportions
	const logoList = [
		{
			component: (
				<NotionLogo className="h-7 sm:h-8 md:h-[34px] w-auto max-h-[34px]" />
			),
			name: "Notion",
		},
		{
			component: (
				<ClaudeLogo className="h-6 sm:h-7 md:h-[28px] w-auto max-h-[28px]" />
			),
			name: "Claude",
		},
		{
			component: (
				<ModalLogo className="h-5 sm:h-6 md:h-[25px] w-auto max-h-[25px]" />
			),
			name: "Modal",
		},
		{
			component: (
				<MongoDbLogo className="h-7 sm:h-8 md:h-[34px] w-auto max-h-[34px]" />
			),
			name: "MongoDB",
		},
	]

	// Duplicate the list 3 times for a smooth, seamless infinite loop
	const marqueeItems = [...logoList, ...logoList, ...logoList]

	return (
		<div className="w-full py-0 overflow-hidden shrink-0">
			<div className="container-universal text-center">
				{/* Exact Figma specifications: DM Sans, Thin (100), 24px, 40px line-height, 0px letter spacing, #000000 */}
				<p className="max-w-[1024px] mx-auto text-base sm:text-xl md:text-[24px] leading-[28px] sm:leading-[34px] md:leading-[40px] font-thin font-[100] tracking-[0px] text-black uppercase mb-2.5 sm:mb-3.5 select-none">
					SUPPORTED BY GLOBAL STARTUP PROGRAMS
				</p>

				{/* Animated Marquee Container with Horizontal Edge Fading Mask */}
				<div className="relative w-full overflow-hidden mask-gradient-x pt-1 pb-0">
					<div className="animate-marquee flex items-center">
						{marqueeItems.map((item, idx) => (
							<div
								key={idx}
								className="flex items-center justify-center w-[160px] sm:w-[200px] md:w-[230px] px-6 sm:px-8 shrink-0 select-none cursor-default opacity-90 hover:opacity-100 transition-opacity"
							>
								<div className="flex items-center justify-center h-11 w-full">
									{item.component}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
