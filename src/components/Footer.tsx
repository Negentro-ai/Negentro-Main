import type React from "react"
import { RuixenGradientFooter } from "@/components/ui/ruixen-gradient-footer"
import { NegentroFooterLogo } from "@/components/ui/negentro-footer-logo"
import { useLanguage, type Language } from "@/lib/i18n"

export interface FooterProps {
	onOpenConsole?: () => void
}

export const Footer: React.FC<FooterProps> = ({
	onOpenConsole: _onOpenConsole,
}) => {
	const { language, setLanguage, t } = useLanguage()

	const languagesList: { code: Language; label: string }[] = [
		{ code: "en", label: "En" },
		{ code: "es", label: "Es" },
		{ code: "fr", label: "Fr" },
		{ code: "de", label: "De" },
		{ code: "ru", label: "Ru" },
	]

	return (
		<RuixenGradientFooter
			gradientHeight="340px"
			className="w-full bg-[#000410] text-[#8F9FA3] font-sans antialiased relative z-20 m-0 border-none select-none overflow-hidden"
		>
			<div className="container-universal pt-16 pb-8 relative z-20">
				{/* 1. Main Navigation Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12 pb-14">
					{/* Brand Column */}
					<div className="lg:col-span-2 space-y-4">
						<div className="flex items-center gap-2">
							<NegentroFooterLogo className="h-8 w-auto text-white" />
						</div>
						<p className="text-xs sm:text-sm text-[#8F9FA3] leading-relaxed max-w-sm font-normal">
							{t.footer.infrastructure}
						</p>
						<div>
							<a
								href="#more"
								className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-white/80 transition-colors group"
							>
								<span>{t.footer.moreAboutUs}</span>
								<span className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform" />
							</a>
						</div>
					</div>

					{/* Column 1: Developers */}
					<div className="space-y-3.5">
						<h4 className="text-sm font-medium text-white">{t.footer.devTitle}</h4>
						<ul className="space-y-2.5 text-xs sm:text-sm text-[#8F9FA3]">
							<li>
								<a
									href="#docs"
									className="hover:text-white transition-colors block"
								>
									{t.footer.devDocs}
								</a>
							</li>
							<li>
								<a
									href="#api"
									className="hover:text-white transition-colors block"
								>
									{t.footer.devApi}
								</a>
							</li>
							<li>
								<a
									href="#mcp"
									className="hover:text-white transition-colors block"
								>
									{t.footer.devMcp}
								</a>
							</li>
							<li>
								<a
									href="#cli"
									className="hover:text-white transition-colors block"
								>
									{t.footer.devCli}
								</a>
							</li>
							<li>
								<a
									href="#trust"
									className="hover:text-white transition-colors block"
								>
									{t.footer.devTrust}
								</a>
							</li>
							<li>
								<a
									href="#status"
									className="hover:text-white transition-colors block"
								>
									{t.footer.devStatus}
								</a>
							</li>
						</ul>
					</div>

					{/* Column 2: Product */}
					<div className="space-y-3.5">
						<h4 className="text-sm font-medium text-white">{t.footer.prodTitle}</h4>
						<ul className="space-y-2.5 text-xs sm:text-sm text-[#8F9FA3]">
							<li>
								<a
									href="#research"
									className="hover:text-white transition-colors block"
								>
									{t.footer.prodPiyapi}
								</a>
							</li>
							<li>
								<a
									href="#benchmarks"
									className="hover:text-white transition-colors block"
								>
									{t.footer.prodBench}
								</a>
							</li>
							<li>
								<a
									href="#playground"
									className="hover:text-white transition-colors block"
								>
									{t.footer.prodPlayground}
								</a>
							</li>
							<li>
								<a
									href="#connectors"
									className="hover:text-white transition-colors block"
								>
									{t.footer.prodConnectors}
								</a>
							</li>
							<li>
								<a
									href="#integrations"
									className="hover:text-white transition-colors block"
								>
									{t.footer.prodIntegrations}
								</a>
							</li>
						</ul>
					</div>

					{/* Column 3: Company */}
					<div className="space-y-3.5">
						<h4 className="text-sm font-medium text-white">{t.footer.compTitle}</h4>
						<ul className="space-y-2.5 text-xs sm:text-sm text-[#8F9FA3]">
							<li>
								<a
									href="#about"
									className="hover:text-white transition-colors block"
								>
									{t.footer.compAbout}
								</a>
							</li>
							<li>
								<a
									href="#research"
									className="hover:text-white transition-colors block"
								>
									{t.footer.compResearch}
								</a>
							</li>
							<li>
								<a
									href="#careers"
									className="hover:text-white transition-colors block"
								>
									{t.footer.compCareers}
								</a>
							</li>
							<li>
								<a
									href="#privacy"
									className="hover:text-white transition-colors block"
								>
									{t.footer.compPrivacy}
								</a>
							</li>
							<li>
								<a
									href="#terms"
									className="hover:text-white transition-colors block"
								>
									{t.footer.compTerms}
								</a>
							</li>
						</ul>
					</div>

					{/* Column 4: Usecase */}
					<div className="space-y-3.5">
						<h4 className="text-sm font-medium text-white">{t.footer.useTitle}</h4>
						<ul className="space-y-2.5 text-xs sm:text-sm text-[#8F9FA3]">
							<li>
								<a
									href="#conv"
									className="hover:text-white transition-colors block"
								>
									{t.footer.useConv}
								</a>
							</li>
							<li>
								<a
									href="#agents"
									className="hover:text-white transition-colors block"
								>
									{t.footer.useAgents}
								</a>
							</li>
							<li>
								<a
									href="#health"
									className="hover:text-white transition-colors block"
								>
									{t.footer.useHealth}
								</a>
							</li>
							<li>
								<a
									href="#fin"
									className="hover:text-white transition-colors block"
								>
									{t.footer.useFin}
								</a>
							</li>
							<li>
								<a
									href="#enter"
									className="hover:text-white transition-colors block"
								>
									{t.footer.useEnter}
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* 2. Middle Row: Compliance & Contact Us */}
				<div className="pt-8 pb-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
					{/* Left: Contact Us */}
					<div className="space-y-1.5">
						<h4 className="text-sm font-medium text-white">{t.footer.contactTitle}</h4>
						<a
							href="mailto:ceo@negentro.tech"
							className="text-xs sm:text-sm text-[#8F9FA3] hover:text-white transition-colors block"
						>
							ceo@negentro.tech
						</a>
					</div>

					{/* Right: Compliance Badges */}
					<div className="space-y-3 md:text-right">
						<h4 className="text-sm font-medium text-white">Compliance</h4>
						<div className="flex flex-wrap items-center md:justify-end gap-5 text-xs text-white">
							{/* SOC 2 Badge */}
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 rounded-full bg-[#4846AC] border border-[#765DFB] flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
									SOC
								</div>
								<span className="text-xs text-white/90">
									{t.footer.soc2}
								</span>
							</div>

							{/* GDPR Badge */}
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 rounded-full bg-[#765DFB] border border-[#ECCDF5]/40 flex items-center justify-center text-[7px] font-bold text-white shadow-sm">
									GDPR
								</div>
								<span className="text-xs text-white/90">{t.footer.gdpr}</span>
							</div>

							{/* HIPAA Badge */}
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 rounded-full bg-[#4846AC] border border-[#765DFB] flex items-center justify-center text-[7px] font-bold text-white shadow-sm">
									HIPAA
								</div>
								<span className="text-xs text-white/90">{t.footer.hipaa}</span>
							</div>
						</div>
					</div>
				</div>

				{/* 3. Bottom Row: Clustered Social Badges from block.svg, Copyright, and Languages */}
				<div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
					{/* Left: Clustered 6 White Social Badges & INFORAVIUM Copyright */}
					<div className="flex items-center gap-5">
						{/* Clustered 6 White Badges from block.svg */}
						<div className="grid grid-cols-2 gap-1.5 items-center">
							{/* 1. Reddit Badge */}
							<a
								href="https://www.reddit.com/u/Negentro_AI/s/wmZgfDGMXN"
								target="_blank"
								rel="noopener noreferrer"
								className="col-span-1 block w-7 h-7 sm:w-8 sm:h-8 hover:scale-110 transition-transform cursor-pointer"
								aria-label="Reddit"
							>
								<svg
									viewBox="0 0 40 40"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-full"
								>
									<rect width="40" height="40" rx="20" fill="white" />
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M31.4346 20C31.4346 26.3145 26.315 31.4341 20.0005 31.4341C13.686 31.4341 8.56641 26.3145 8.56641 20C8.56641 13.6855 13.686 8.56592 20.0005 8.56592C26.315 8.56592 31.4346 13.6855 31.4346 20ZM27.3259 19.1024C27.5108 19.3664 27.6156 19.6779 27.627 20C27.6321 20.3151 27.5478 20.6252 27.3839 20.8943C27.22 21.1635 26.9832 21.3807 26.7009 21.5207C26.7142 21.6884 26.7142 21.8561 26.7009 22.0238C26.7009 24.5851 23.7166 26.6661 20.0348 26.6661C16.353 26.6661 13.3687 24.5851 13.3687 22.0238C13.3557 21.8564 13.3557 21.6882 13.3687 21.5207C13.1507 21.4187 12.9573 21.2706 12.802 21.0867C12.6466 20.9028 12.5329 20.6875 12.4686 20.4554C12.4044 20.2234 12.3912 19.9802 12.4299 19.7426C12.4685 19.505 12.5582 19.2786 12.6927 19.0789C12.8272 18.8793 13.0034 18.7111 13.209 18.586C13.4147 18.4608 13.645 18.3817 13.8842 18.3541C14.1233 18.3265 14.3656 18.3509 14.5944 18.4258C14.8232 18.5007 15.0331 18.6243 15.2096 18.788C16.5272 17.8945 18.0772 17.4057 19.6689 17.3816L20.515 13.414C20.5243 13.3679 20.5427 13.3242 20.5691 13.2853C20.5955 13.2465 20.6294 13.2133 20.6688 13.1877C20.7082 13.1622 20.7523 13.1447 20.7986 13.1364C20.8448 13.1282 20.8923 13.1292 20.9381 13.1396L23.7394 13.6998C23.8762 13.4648 24.0923 13.2862 24.3489 13.1961C24.6056 13.1061 24.8859 13.1104 25.1396 13.2084C25.3933 13.3063 25.6037 13.4915 25.7332 13.7307C25.8626 13.9699 25.9026 14.2473 25.8459 14.5133C25.7892 14.7793 25.6396 15.0164 25.4239 15.182C25.2082 15.3476 24.9405 15.4309 24.6689 15.4169C24.3973 15.4029 24.1396 15.2926 23.942 15.1057C23.7444 14.9189 23.6199 14.6677 23.5908 14.3973L21.1439 13.8828L20.4007 17.4502C21.9731 17.4837 23.5022 17.9722 24.8028 18.8566C24.9764 18.6895 25.1841 18.562 25.4116 18.4829C25.6392 18.4037 25.8812 18.3749 26.121 18.3982C26.3608 18.4216 26.5927 18.4966 26.8007 18.6182C27.0087 18.7398 27.1879 18.905 27.3259 19.1024ZM16.3854 20.5079C16.302 20.6327 16.2439 20.7728 16.2146 20.9201C16.1853 21.0675 16.1853 21.2191 16.2145 21.3664C16.2737 21.6639 16.4486 21.9258 16.7008 22.0943C16.953 22.2629 17.2618 22.3244 17.5594 22.2652C17.7067 22.2359 17.8468 22.1779 17.9717 22.0945C18.0966 22.011 18.2038 21.9038 18.2873 21.779C18.4558 21.5267 18.5173 21.2179 18.4582 20.9204C18.399 20.6229 18.2241 20.361 17.9719 20.1925C17.7197 20.0239 17.4109 19.9625 17.1133 20.0216C16.8158 20.0807 16.554 20.2557 16.3854 20.5079ZM20.0119 25.1682C21.0267 25.2101 22.0253 24.9452 22.8361 24.3335C22.8968 24.2744 22.9315 24.1936 22.9325 24.1089C22.9336 24.0242 22.901 23.9425 22.8419 23.8819C22.8126 23.8518 22.7777 23.8279 22.7391 23.8113C22.7006 23.7948 22.6592 23.786 22.6172 23.7855C22.5325 23.7844 22.4509 23.817 22.3902 23.8762C21.6961 24.3737 20.8532 24.6197 20.0005 24.5736C19.1487 24.612 18.3095 24.3578 17.6222 23.8533C17.563 23.8047 17.4877 23.7798 17.4112 23.7836C17.3347 23.7873 17.2622 23.8194 17.208 23.8736C17.1539 23.9278 17.1218 24.0002 17.118 24.0768C17.1142 24.1533 17.1391 24.2285 17.1877 24.2878C17.9986 24.8997 18.9969 25.2109 20.0119 25.1682ZM21.9948 22.1401C22.1834 22.2659 22.3931 22.3783 22.6189 22.3783C22.7739 22.38 22.9277 22.3501 23.0708 22.2905C23.214 22.2309 23.3435 22.1428 23.4515 22.0315C23.5595 21.9203 23.6438 21.7883 23.6992 21.6435C23.7546 21.4986 23.7799 21.3441 23.7737 21.1891C23.7737 20.9916 23.7224 20.7975 23.625 20.6257C23.5276 20.4539 23.3874 20.3102 23.218 20.2087C23.0485 20.1072 22.8557 20.0513 22.6583 20.0465C22.4608 20.0417 22.2655 20.0881 22.0913 20.1812C21.9171 20.2743 21.77 20.4109 21.6643 20.5778C21.5587 20.7447 21.498 20.936 21.4883 21.1333C21.4786 21.3306 21.5201 21.527 21.6089 21.7034C21.6976 21.8799 21.8306 22.0303 21.9948 22.1401Z"
										fill="black"
									/>
								</svg>
							</a>

							{/* 2. TikTok Badge */}
							<a
								href="https://www.tiktok.com/@negentro_ai?_r=1&_t=ZS-99Ok7m0aXSa"
								target="_blank"
								rel="noopener noreferrer"
								className="col-span-1 block w-7 h-7 sm:w-8 sm:h-8 hover:scale-110 transition-transform cursor-pointer"
								aria-label="TikTok"
							>
								<svg
									viewBox="0 0 40 40"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-full"
								>
									<rect width="40" height="40" rx="20" fill="white" />
									<path
										d="M26.65 15.69C25.43 15.62 24.3 15.04 23.45 14.08C23.45 19.34 23.45 19.5 23.45 20.25C23.41 23.95 20.35 26.94 16.65 26.9C12.98 26.86 10.03 23.85 10.07 20.18C10.11 16.51 13.12 13.56 16.79 13.6C17.27 13.61 17.74 13.7 18.19 13.86V16.89C17.75 16.68 17.27 16.57 16.79 16.57C14.78 16.57 13.15 18.2 13.15 20.21C13.15 22.22 14.78 23.85 16.79 23.85C18.78 23.85 20.4 22.25 20.43 20.27V10.1H23.45C23.45 11.23 23.93 12.3 24.77 13.06C25.32 13.55 26 13.88 26.65 14.02V15.69Z"
										fill="black"
									/>
								</svg>
							</a>

							{/* 3. X (Twitter) Badge */}
							<a
								href="https://x.com/negentroai?s=11"
								target="_blank"
								rel="noopener noreferrer"
								className="block w-7 h-7 sm:w-8 sm:h-8 hover:scale-110 transition-transform cursor-pointer"
								aria-label="X"
							>
								<svg
									viewBox="0 50 40 40"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-full"
								>
									<rect y="50" width="40" height="40" rx="20" fill="white" />
									<path
										d="M26.325 60.0312H29.6992L22.3293 68.4765L31 79.9688H24.2116L18.8945 72.9975L12.8101 79.9688H9.4345L17.3174 70.935L9 60.0312H15.9616L20.7547 66.3888L26.325 60.0312ZM25.1401 77.9472H27.0101L14.9392 61.9427H12.9328L25.1401 77.9472Z"
										fill="black"
									/>
								</svg>
							</a>

							{/* 4. GitHub Badge */}
							<a
								href="https://github.com/Negentro-ai/Piyapi-by-Negentro"
								target="_blank"
								rel="noopener noreferrer"
								className="block w-7 h-7 sm:w-8 sm:h-8 hover:scale-110 transition-transform cursor-pointer"
								aria-label="GitHub"
							>
								<svg
									viewBox="50 50 40 40"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-full"
								>
									<rect
										x="50"
										y="50"
										width="40"
										height="40"
										rx="20"
										fill="white"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M70 59C64.1988 59 59.5 63.9225 59.5 70C59.5 74.8675 62.5056 78.9788 66.6794 80.4363C67.2044 80.5363 67.3947 80.1988 67.3947 79.9113C67.3947 79.6525 67.3828 78.785 67.3828 77.8625C64.7528 78.3625 64.0625 77.1713 63.8525 76.5513C63.7344 76.2388 63.2225 75.2638 62.7766 75.005C62.4091 74.7963 61.8841 74.2875 62.7634 74.275C63.5903 74.2625 64.1809 75.0713 64.3778 75.4013C65.3228 77.0675 66.8322 76.6025 67.4341 76.315C67.5259 75.5963 67.7981 75.1075 68.1009 74.8238C65.7381 74.5425 63.2625 73.5875 63.2625 69.3088C63.2625 68.0875 63.6694 67.0913 64.3516 66.3075C64.2403 66.02 63.8597 64.8725 64.4631 63.3275C64.4631 63.3275 65.3556 63.0275 67.3947 64.4738C68.2478 64.225 69.1534 64.1 70.0591 64.1C70.9647 64.1 71.8703 64.225 72.7234 64.4738C74.7625 63.0275 75.655 63.3275 75.655 63.3275C76.2584 64.8725 75.8778 66.02 75.7666 66.3075C76.4488 67.0913 76.8556 68.0875 76.8556 69.3088C76.8556 73.6 74.3669 74.5425 72.0041 74.8238C72.3978 75.1838 72.7391 75.8775 72.7391 76.9638C72.7391 78.5138 72.7259 79.7613 72.7259 80.1413C72.7259 80.4288 72.9163 80.7788 73.4413 80.6725C77.4259 79.2813 80.5 75.0438 80.5 70C80.5 63.9225 75.8013 59 70 59Z"
										fill="black"
									/>
								</svg>
							</a>

							{/* 5. LinkedIn Badge */}
							<a
								href="https://www.linkedin.com/company/negentroai/"
								target="_blank"
								rel="noopener noreferrer"
								className="block w-7 h-7 sm:w-8 sm:h-8 hover:scale-110 transition-transform cursor-pointer"
								aria-label="LinkedIn"
							>
								<svg
									viewBox="0 100 40 40"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-full"
								>
									<rect
										y="100"
										width="40"
										height="40"
										rx="20"
										fill="white"
									/>
									<path
										d="M14.5 113.8C14.5 114.794 13.6941 115.6 12.7 115.6C11.7059 115.6 10.9 114.794 10.9 113.8C10.9 112.806 11.7059 112 12.7 112C13.6941 112 14.5 112.806 14.5 113.8ZM11.1 117.2H14.3V127H11.1V117.2ZM19.3 117.2H22.4V118.6C22.8 117.7 24.1 116.9 25.8 116.9C29 116.9 30.2 118.8 30.2 121.9V127H27V122.4C27 121 26.6 119.8 25 119.8C23.5 119.8 22.5 120.9 22.5 122.6V127H19.3V117.2Z"
										fill="black"
									/>
								</svg>
							</a>

							{/* 6. Instagram Badge */}
							<a
								href="https://www.instagram.com/negentro_ai?igsi=N3J2cWd6MWU0dTU3"
								target="_blank"
								rel="noopener noreferrer"
								className="block w-7 h-7 sm:w-8 sm:h-8 hover:scale-110 transition-transform cursor-pointer"
								aria-label="Instagram"
							>
								<svg
									viewBox="50 100 40 40"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-full"
								>
									<rect
										x="50"
										y="100"
										width="40"
										height="40"
										rx="20"
										fill="white"
									/>
									<path
										d="M70 112.627C72.3855 112.627 72.7108 112.627 73.6867 112.627C74.5542 112.627 74.988 112.843 75.3133 112.952C75.747 113.169 76.0723 113.386 76.3976 113.711C76.7229 114.036 76.9398 114.361 77.1566 114.795C77.2651 115.12 77.4819 115.554 77.4819 116.422C77.4819 117.398 77.4819 117.723 77.4819 120.108C77.4819 122.494 77.4819 122.819 77.4819 123.795C77.4819 124.663 77.2651 125.096 77.1566 125.422C76.9398 125.855 76.7229 126.181 76.3976 126.506C76.0723 126.831 75.747 127.048 75.3133 127.265C74.988 127.373 74.5542 127.59 73.6867 127.59C72.7108 127.59 72.3855 127.59 70 127.59C67.6145 127.59 67.2892 127.59 66.3133 127.59C65.4458 127.59 65.012 127.373 64.6867 127.265C64.253 127.048 63.9277 126.831 63.6024 126.506C63.2771 126.181 63.0602 125.855 62.8434 125.422C62.7349 125.096 62.5181 124.663 62.5181 123.795C62.5181 122.819 62.5181 122.494 62.5181 120.108C62.5181 117.723 62.5181 117.398 62.5181 116.422C62.5181 115.554 62.7349 115.12 62.8434 114.795C63.0602 114.361 63.2771 114.036 63.6024 113.711C63.9277 113.386 64.253 113.169 64.6867 112.952C65.012 112.843 65.4458 112.627 66.3133 112.627C67.2892 112.627 67.6145 112.627 70 112.627ZM70 111C67.5707 111 67.2671 111.01 66.3129 111.054C65.3606 111.097 64.7088 111.248 64.1414 111.468C63.5546 111.696 63.0566 112.001 62.561 112.497C62.0654 112.993 61.7602 113.491 61.5322 114.077C61.312 114.645 61.1609 115.297 61.1177 116.249C61.0734 117.203 61.063 117.507 61.063 119.936C61.063 122.366 61.0734 122.669 61.1177 123.623C61.1609 124.576 61.312 125.227 61.5322 125.795C61.7602 126.381 62.0654 126.88 62.561 127.375C63.0566 127.871 63.5546 128.176 64.1414 128.404C64.7088 128.624 65.3606 128.775 66.3129 128.819C67.2671 128.862 67.5707 128.873 70 128.873C72.4293 128.873 72.7329 128.862 73.6871 128.819C74.6394 128.775 75.2912 128.624 75.8586 128.404C76.4454 128.176 76.9434 127.871 77.439 127.375C77.9346 126.88 78.2398 126.381 78.4678 125.795C78.688 125.227 78.8391 124.576 78.8823 123.623C78.9266 122.669 78.937 122.366 78.937 119.936C78.937 117.507 78.9266 117.203 78.8823 116.249C78.8391 115.297 78.688 114.645 78.4678 114.077C78.2398 113.491 77.9346 112.993 77.439 112.497C76.9434 112.001 76.4454 111.696 75.8586 111.468C75.2912 111.248 74.6394 111.097 73.6871 111.054C72.7329 111.01 72.4293 111 70 111Z"
										fill="black"
									/>
									<path
										d="M70 115.337C67.3976 115.337 65.3373 117.398 65.3373 120C65.3373 122.602 67.3976 124.663 70 124.663C72.6024 124.663 74.6627 122.602 74.6627 120C74.6627 117.398 72.6024 115.337 70 115.337ZM70 123.036C68.3241 123.036 66.9639 121.676 66.9639 120C66.9639 118.324 68.3241 116.964 70 116.964C71.6759 116.964 73.0361 118.324 73.0361 120C73.0361 121.676 71.6759 123.036 70 123.036Z"
										fill="black"
									/>
									<path
										d="M74.7711 116.313C75.3699 116.313 75.8554 115.828 75.8554 115.229C75.8554 114.63 75.3699 114.145 74.7711 114.145C74.1722 114.145 73.6867 114.63 73.6867 115.229C73.6867 115.828 74.1722 116.313 74.7711 116.313Z"
										fill="black"
									/>
								</svg>
							</a>
						</div>

						{/* Copyright text */}
						<div className="text-[11px] sm:text-xs text-[#8F9FA3] leading-snug">
							<div>{t.footer.copyright}</div>
							<div>{t.footer.rightsReserved}</div>
						</div>
					</div>

					{/* Right: Languages Switcher with active state */}
					<div className="flex flex-col md:items-end gap-1.5">
						<span className="text-[11px] text-[#8F9FA3] font-medium select-none">
							{t.footer.languagesLabel}
						</span>
						<div className="flex items-center gap-3 text-xs">
							{languagesList.map((langItem) => {
								const isActive = language === langItem.code
								return (
									<button
										key={langItem.code}
										type="button"
										onClick={() => setLanguage(langItem.code)}
										className={`transition-all duration-200 cursor-pointer ${
											isActive
												? "text-white font-bold underline underline-offset-4 decoration-[#765DFB] scale-110"
												: "text-[#8F9FA3] hover:text-white"
										}`}
										title={langItem.label}
									>
										{langItem.label}
									</button>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</RuixenGradientFooter>
	)
}
