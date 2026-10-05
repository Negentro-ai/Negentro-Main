import { useState } from "react"
import type React from "react"
import { NegentroLogo } from "./Logos"
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { industryPages as staticIndustryPages } from "@/data/industryPages"
import { useEffect } from "react"
import { getSupabase } from "@/lib/supabase"

export interface NavbarProps {
	activeTab: string
	setActiveTab: (tab: string) => void
	onTryPiyApi?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
	const { t } = useLanguage()
	const [mobileOpen, setMobileOpen] = useState(false)
	const [industriesExpanded, setIndustriesExpanded] = useState(false)
	const [hoveredIndustrySlug, setHoveredIndustrySlug] = useState<string | null>(
		null,
	)
	const [industryPages, setIndustryPages] = useState<any[]>(staticIndustryPages)

	useEffect(() => {
		const fetchIndustries = async () => {
			const client = await getSupabase()
			if (client) {
				const { data } = await client
					.from("cms_records")
					.select("title, slug, status")
					.eq("kind", "industries")
					.eq("status", "Published")
					.order("created_at", { ascending: true })
				if (data && data.length > 0) {
					const mapped = data.map((d) => ({
						name: d.title,
						slug: d.slug,
					}))
					setIndustryPages(mapped)
				}
			}
		}
		fetchIndustries()
	}, [])

	const navItems = [
		{ key: "research", label: t.nav.research },
		{ key: "pricing", label: t.nav.pricing },
		{ key: "initiatives", label: t.nav.initiatives },
		{ key: "resources", label: t.nav.resources },
		{ key: "company", label: t.nav.company },
	]
	const isOverview = activeTab === "overview"
	const dropdownPanelSurface = isOverview
		? "bg-foreground/95 border border-white/10 backdrop-blur-2xl"
		: "bg-[#fcfcff] border border-neutral-100/50"

	return (
		<header
			className={`w-full transition-all duration-300 ${
				isOverview
					? "absolute top-0 inset-x-0 z-50 bg-transparent border-b border-white/10"
					: "relative z-50 bg-white border-b border-[#e5e7eb]"
			}`}
		>
			<div className="container-universal h-19 flex items-center justify-between relative">
				{/* Left: Negentro Brand Logo */}
				<div className="flex items-center z-10">
					<button
						onClick={() => setActiveTab("overview")}
						className="flex items-center transition-all duration-300 ease-out hover:opacity-85 hover:scale-[1.03] active:scale-[0.97] cursor-pointer focus:outline-none"
						title="Negentro Home"
						aria-label="Negentro Home"
					>
						<NegentroLogo
							className={`h-8 sm:h-8.5 transition-all duration-300 ${
								isOverview ? "brightness-0 invert" : ""
							}`}
						/>
					</button>
				</div>

				{/* Center: Soft Rounded Rectangle Nav Container */}
				<div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
					<nav
						className={`flex items-center rounded-[10px] h-11.5 px-8 gap-7 sm:gap-8 transition-all duration-300 ${
							isOverview
								? "bg-white/10 border border-white/15 backdrop-blur-md text-white"
								: "bg-secondary text-neutral-950"
						}`}
					>
						{navItems.map((item) => {
							const isActive = activeTab === item.key
							return (
								<div
									key={item.key}
									className="relative flex items-center h-full group"
								>
									<button
										onClick={() =>
											item.key !== "initiatives" &&
											item.key !== "resources" &&
											setActiveTab(item.key)
										}
										className={`relative py-1 text-[14px] transition-all duration-200 ease-out cursor-pointer select-none active:scale-[0.96] ${
											isOverview
												? isActive
													? "text-white font-semibold"
													: "text-white/70 font-normal hover:text-white"
												: isActive
													? "text-[#765DFB] font-semibold"
													: "text-[#666666] font-normal hover:text-[#765DFB]"
										}`}
									>
										<span>{item.label}</span>
										<span
											className={`absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full transition-all duration-250 ease-out ${
												isOverview ? "bg-white" : "bg-[#765DFB]"
											} ${
												isActive
													? "opacity-100 scale-x-100"
													: "opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-75"
											}`}
										/>
									</button>

									{item.key === "initiatives" && (
										<div
											className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none translate-y-3 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-500 ease-out z-50 ${industriesExpanded ? "w-[min(680px,calc(100vw-32px))]" : "w-160"}`}
											onMouseLeave={() => setIndustriesExpanded(false)}
										>
											<div
												className={`relative transition-[height] duration-500 ease-in-out ${industriesExpanded ? "h-82.5" : "h-52.5"}`}
											>
												<div
													className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-in-out ${industriesExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
												>
													<div
														className={`relative isolate overflow-hidden rounded-[14px] shadow-[0_8px_16px_rgba(118,93,251,0.1)] px-5 sm:px-7.5 py-5 sm:py-6.5 ${dropdownPanelSurface}`}
													>
														<div
															className={`pointer-events-none absolute -left-16 -top-16 z-0 h-64 w-64 rounded-full blur-3xl ${isOverview ? "bg-purple-400/20" : "bg-purple-200/40"}`}
														/>
														<div
															className={`pointer-events-none absolute -bottom-16 -right-16 z-0 h-64 w-64 rounded-full blur-3xl ${isOverview ? "bg-purple-400/20" : "bg-purple-200/40"}`}
														/>
														<div className="relative z-10">
															<div className="pb-3">
																<p className="text-[9px] font-medium text-[#765DFB] tracking-[0.09em] mb-1.5">
																	02 / INDUSTRIES
																</p>
																<h3
																	className={`text-[16px] leading-5.5 font-bold tracking-[0.01em] ${isOverview ? "text-white" : "text-[#00050e]"}`}
																>
																	Industries
																</h3>
															</div>
															<div
																className={`h-px mb-2 ${isOverview ? "bg-white/10" : "bg-[#00050e]/[0.07]"}`}
															/>
															<div className="grid grid-cols-2 gap-x-4 sm:gap-x-6">
																{[
																	industryPages.slice(0, 5),
																	industryPages.slice(5),
																].map((column, columnIndex) => (
																	<div
																		key={columnIndex}
																		className={`min-w-0 ${columnIndex === 0 ? `${isOverview ? "border-r border-white/10" : "border-r border-[#00050e]/[0.07]"} pr-3 sm:pr-4` : "pl-0 sm:pl-1"}`}
																	>
																		{column.map((industry, industryIndex) => {
																			const index =
																				columnIndex * 5 + industryIndex + 1
																			const isSelectedIndustry =
																				activeTab ===
																					`industry:${industry.slug}` ||
																				hoveredIndustrySlug === industry.slug
																			return (
																				<button
																					type="button"
																					key={industry.slug}
																					onMouseEnter={() =>
																						setHoveredIndustrySlug(
																							industry.slug,
																						)
																					}
																					onMouseLeave={() =>
																						setHoveredIndustrySlug(null)
																					}
																					onFocus={() =>
																						setHoveredIndustrySlug(
																							industry.slug,
																						)
																					}
																					onBlur={() =>
																						setHoveredIndustrySlug(null)
																					}
																					onClick={() => {
																						setActiveTab(
																							`industry:${industry.slug}`,
																						)
																						setIndustriesExpanded(false)
																					}}
																					aria-label={`Open ${industry.name} industry page`}
																					className={`group/industry flex h-10.75 w-full items-center justify-between gap-2 border-b px-2.5 text-left transition-colors last:border-b-0 hover:rounded-lg focus-visible:ring-1 focus-visible:ring-[#765DFB] ${isOverview ? "border-white/10 hover:border-[#765DFB]/50 hover:bg-[#765DFB]/25" : "border-[#00050e]/[0.07] hover:border-[#765DFB]/25 hover:bg-[#ECCDE5]/40"} ${isSelectedIndustry ? (isOverview ? "border-[#765DFB]/50 rounded-lg bg-[#765DFB]/30" : "border-[#765DFB]/25 rounded-lg bg-[#ECCDE5]/60") : ""}`}
																				>
																					<span
																						className={`w-4.5 shrink-0 font-mono text-[10px] tracking-widest ${isSelectedIndustry ? (isOverview ? "text-[#d5ccff]" : "text-[#765DFB]") : isOverview ? "text-white/45" : "text-[#00050e]/40"}`}
																					>
																						{String(index).padStart(2, "0")}
																					</span>
																					<span
																						className={`min-w-0 flex-1 truncate text-[13px] font-medium ${isSelectedIndustry ? (isOverview ? "text-[#d5ccff]" : "text-[#765DFB]") : isOverview ? "text-white/85 group-hover/industry:text-white" : "text-[#00050e] group-hover/industry:text-[#765DFB]"}`}
																					>
																						{industry.name}
																					</span>
																					<ArrowRight
																						className={`h-2.5 w-2.25 shrink-0 ${isSelectedIndustry ? (isOverview ? "text-[#d5ccff]" : "text-[#765DFB]") : isOverview ? "text-white/35 group-hover/industry:text-white/70" : "text-[#00050e]/20 group-hover/industry:text-[#765DFB]"}`}
																					/>
																				</button>
																			)
																		})}
																	</div>
																))}
															</div>
														</div>
													</div>
												</div>
												<div
													className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-in-out ${industriesExpanded ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}`}
												>
													<div
														className={`rounded-[20px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex relative transition-all duration-300 ${dropdownPanelSurface}`}
													>
														{/* Left Column */}
														<div
															onClick={() => setActiveTab("use-cases")}
															className={`flex-1 p-8 sm:p-10 relative group/card cursor-pointer transition-colors overflow-hidden border-r ${
																isOverview
																	? "hover:bg-white/5 border-white/10"
																	: "hover:bg-white/60 border-indigo-50/50"
															}`}
														>
															<div
																className={`absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
																	isOverview
																		? "bg-purple-400/20 group-hover/card:bg-purple-400/30"
																		: "bg-purple-200/40 group-hover/card:bg-purple-300/40"
																}`}
															/>
															<p className="text-[10px] font-mono font-bold text-[#765DFB] tracking-[0.15em] mb-4 uppercase relative z-10">
																01 / Use Cases
															</p>
															<h3
																className={`text-[22px] font-bold mb-3 relative z-10 ${
																	isOverview ? "text-white" : "text-neutral-900"
																}`}
															>
																Use Cases
															</h3>
															<p
																className={`text-[14px] leading-[1.6] pr-4 relative z-10 ${
																	isOverview
																		? "text-white/70"
																		: "text-neutral-500"
																}`}
															>
																Explore the real-world workflows powered by
																persistent memory architecture.
															</p>
															<div className="absolute bottom-6 right-6 text-[#765DFB] transform opacity-0 -translate-x-2 translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
																<ArrowUpRight className="w-5 h-5" />
															</div>
														</div>

														{/* Right Column */}
														<div
															onMouseEnter={() => setIndustriesExpanded(true)}
															onFocus={() => setIndustriesExpanded(true)}
															className={`flex-1 p-8 sm:p-10 relative group/card cursor-pointer transition-colors overflow-hidden ${
																isOverview
																	? "hover:bg-white/5"
																	: "hover:bg-white/60"
															}`}
														>
															<div
																className={`absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
																	isOverview
																		? "bg-purple-400/20 group-hover/card:bg-purple-400/30"
																		: "bg-purple-200/40 group-hover/card:bg-purple-300/40"
																}`}
															/>
															<p className="text-[10px] font-mono font-bold text-[#765DFB] tracking-[0.15em] mb-4 uppercase relative z-10">
																02 / Industries
															</p>
															<h3
																className={`text-[22px] font-bold mb-3 relative z-10 ${
																	isOverview ? "text-white" : "text-neutral-900"
																}`}
															>
																Industries
															</h3>
															<p
																className={`text-[14px] leading-[1.6] pr-4 relative z-10 ${
																	isOverview
																		? "text-white/70"
																		: "text-neutral-500"
																}`}
															>
																Discover how persistent intelligence can
																transform different industries.
															</p>
															<div className="absolute bottom-6 right-6 text-[#765DFB] transform opacity-0 -translate-x-2 translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
																<ArrowUpRight className="w-5 h-5" />
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									)}

									{item.key === "resources" && (
										<div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none translate-y-3 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-500 ease-out z-50 w-160">
											<div
												className={`rounded-[20px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex relative transition-all duration-300 ${dropdownPanelSurface}`}
											>
												{/* Left Column */}
												<div
													onClick={() => setActiveTab("docs")}
													className={`flex-1 p-8 sm:p-10 relative group/card cursor-pointer transition-colors overflow-hidden border-r ${
														isOverview
															? "hover:bg-white/5 border-white/10"
															: "hover:bg-white/60 border-indigo-50/50"
													}`}
												>
													<div
														className={`absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
															isOverview
																? "bg-purple-400/20 group-hover/card:bg-purple-400/30"
																: "bg-purple-200/40 group-hover/card:bg-purple-300/40"
														}`}
													/>
													<p className="text-[10px] font-mono font-bold text-[#765DFB] tracking-[0.15em] mb-4 uppercase relative z-10">
														01 / Docs
													</p>
													<h3
														className={`text-[22px] font-bold mb-3 relative z-10 ${
															isOverview ? "text-white" : "text-neutral-900"
														}`}
													>
														Docs
													</h3>
													<p
														className={`text-[14px] leading-[1.6] pr-4 relative z-10 ${
															isOverview ? "text-white/70" : "text-neutral-500"
														}`}
													>
														Explore technical guides, API references, and
														tutorials for building with PiyApi
													</p>
													<div className="absolute bottom-6 right-6 text-[#765DFB] transform opacity-0 -translate-x-2 translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
														<ArrowUpRight className="w-5 h-5" />
													</div>
												</div>

												{/* Right Column */}
												<div
													onClick={() => setActiveTab("blog")}
													onKeyDown={(event) => {
														if (event.key === "Enter" || event.key === " ")
															setActiveTab("blog")
													}}
													role="button"
													tabIndex={0}
													aria-label="Open Blog insights"
													className={`flex-1 p-8 sm:p-10 relative group/card cursor-pointer transition-colors overflow-hidden focus-visible:ring-2 focus-visible:ring-[#765DFB] ${
														isOverview
															? "hover:bg-white/5"
															: "hover:bg-white/60"
													}`}
												>
													<div
														className={`absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
															isOverview
																? "bg-purple-400/20 group-hover/card:bg-purple-400/30"
																: "bg-purple-200/40 group-hover/card:bg-purple-300/40"
														}`}
													/>
													<p className="text-[10px] font-mono font-bold text-[#765DFB] tracking-[0.15em] mb-4 uppercase relative z-10">
														02 / Blog
													</p>
													<h3
														className={`text-[22px] font-bold mb-3 relative z-10 ${
															isOverview ? "text-white" : "text-neutral-900"
														}`}
													>
														Blog
													</h3>
													<p
														className={`text-[14px] leading-[1.6] pr-4 relative z-10 ${
															isOverview ? "text-white/70" : "text-neutral-500"
														}`}
													>
														Discover our latest research, engineering deep
														dives, and product updates.
													</p>
													<div className="absolute bottom-6 right-6 text-[#765DFB] transform opacity-0 -translate-x-2 translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
														<ArrowUpRight className="w-5 h-5" />
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							)
						})}
					</nav>
				</div>

				{/* Right: Try PiyApi Button */}
				<div className="hidden md:flex items-center z-10">
					<a
						href="https://piyapi.cloud"
						target="_blank"
						rel="noopener noreferrer"
						className={`relative inline-flex items-center justify-center text-sm font-medium h-10.5 px-5 rounded-lg transition-all duration-250 ease-out shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer overflow-hidden group ${
							isOverview
								? "bg-white text-neutral-950 hover:bg-white/90"
								: "bg-[#232323] hover:bg-neutral-950 text-white"
						}`}
					>
						<span className="relative z-10">{t.nav.tryPiyApi}</span>
						<span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
					</a>
				</div>

				{/* Mobile Hamburger Button */}
				<div className="flex md:hidden">
					<button
						onClick={() => setMobileOpen(!mobileOpen)}
						className={`p-2 rounded-lg transition-all duration-200 active:scale-95 ${
							isOverview
								? "text-white hover:bg-white/10"
								: "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
						}`}
						aria-label="Toggle Navigation"
					>
						{mobileOpen ? (
							<X className="w-5 h-5 transition-transform duration-200 rotate-90" />
						) : (
							<Menu className="w-5 h-5 transition-transform duration-200" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Drawer with smooth animation */}
			{mobileOpen && (
				<div
					className={`md:hidden border-t px-6 py-4 space-y-3 animate-fade-in ${
						isOverview
							? "border-white/15 bg-[#04050c]/95 backdrop-blur-xl"
							: "border-neutral-200 bg-white"
					}`}
				>
					<div
						className={`rounded-[10px] p-2 space-y-1 ${
							isOverview ? "bg-white/10" : "bg-secondary"
						}`}
					>
						{navItems.map((item) => {
							return (
								<button
									key={item.key}
									onClick={() => {
										setActiveTab(item.key)
										setMobileOpen(false)
									}}
									className={`block w-full text-left px-4 py-2.5 text-sm font-normal rounded-md transition-all duration-200 ease-out ${
										activeTab === item.key
											? isOverview
												? "bg-white/20 text-white font-semibold"
												: "bg-[#765DFB]/10 text-[#765DFB] font-semibold shadow-xs"
											: isOverview
												? "text-white/70 hover:text-white hover:bg-white/10"
												: "text-[#666666] hover:text-[#765DFB] hover:bg-[#765DFB]/5"
									}`}
								>
									{item.label}
								</button>
							)
						})}
					</div>

					<div className="pt-2">
						<a
							href="https://piyapi.cloud"
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => setMobileOpen(false)}
							className={`w-full flex items-center justify-center text-sm font-medium py-3 rounded-lg transition-all duration-250 active:scale-[0.98] shadow-xs hover:shadow-md ${
								isOverview
									? "bg-white text-neutral-950 hover:bg-white/90"
									: "bg-[#232323] hover:bg-neutral-950 text-white"
							}`}
						>
							<span>{t.nav.tryPiyApi}</span>
						</a>
					</div>
				</div>
			)}
		</header>
	)
}
