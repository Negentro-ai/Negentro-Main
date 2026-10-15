import React, { useState, useEffect } from "react"
import { NegentroLogo } from "./Logos"
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { industryPages as staticIndustryPages } from "@/data/industryPages"
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
											className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none translate-y-3 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 ${
												industriesExpanded
													? "w-[min(820px,calc(100vw-32px))]"
													: "w-160 max-w-[calc(100vw-32px)]"
											}`}
											onMouseLeave={() => {
												setIndustriesExpanded(false)
												setHoveredIndustrySlug(null)
											}}
										>
											<div
												className={`rounded-[20px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row relative transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${dropdownPanelSurface} ${
													industriesExpanded ? "h-[340px]" : "h-[225px]"
												}`}
											>
												{/* LEFT COLUMN: Use Cases (Rock-solid fixed width: 320px) */}
												<div
													onClick={() => setActiveTab("use-cases")}
													onMouseEnter={() => {
														setIndustriesExpanded(false)
														setHoveredIndustrySlug(null)
													}}
													className={`w-full md:w-[320px] shrink-0 p-8 sm:p-10 relative group/card cursor-pointer transition-colors duration-200 overflow-hidden border-b md:border-b-0 md:border-r ${
														isOverview
															? "hover:bg-white/5 border-white/10"
															: "hover:bg-white/60 border-indigo-50/50"
													}`}
												>
													{/* Left glow orb matching Resources exactly */}
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
															isOverview ? "text-white/70" : "text-neutral-500"
														}`}
													>
														Explore how Negentro intelligence can power real-world applications and workflows.
													</p>
													<div className="absolute bottom-6 right-6 text-[#765DFB] transform opacity-0 -translate-x-2 translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
														<ArrowUpRight className="w-5 h-5" />
													</div>
												</div>

												{/* RIGHT COLUMN: Industries (Interactive Morphing Area) */}
												<div
													onClick={(e) => {
														if ((e.target as HTMLElement).closest("button")) return
														setIndustriesExpanded(!industriesExpanded)
													}}
													onMouseEnter={() => setIndustriesExpanded(true)}
													className={`group-nav flex-1 p-8 sm:p-10 relative group/card cursor-pointer transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
														industriesExpanded ? "is-expanded" : ""
													} ${
														isOverview
															? "hover:bg-white/5"
															: "hover:bg-white/60"
													}`}
												>
													{/* Right glow orb matching Resources exactly */}
													<div
														className={`absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
															isOverview
																? "bg-purple-400/20 group-hover/card:bg-purple-400/30"
																: "bg-purple-200/40 group-hover/card:bg-purple-300/40"
														}`}
													/>

													{/* Header (Always Visible) */}
													<div className="relative z-10 mb-3">
														<p className="text-[10px] font-mono font-bold text-[#765DFB] tracking-[0.15em] mb-4 uppercase relative z-10">
															02 / Industries
														</p>
														<h3
															className={`text-[22px] font-bold relative z-10 ${
																isOverview ? "text-white" : "text-neutral-900"
															}`}
														>
															Industries
														</h3>
													</div>

													{/* Default View State (Description & Arrow matching Resources) */}
													<div className="ini-view-default relative z-10 w-full">
														<div className="ini-view-inner">
															<p
																className={`text-[14px] leading-[1.6] pr-4 relative z-10 ${
																	isOverview ? "text-white/70" : "text-neutral-500"
																}`}
															>
																Discover how persistent intelligence can transform different industries.
															</p>
														</div>
													</div>

													{/* Arrow matching Resources exactly in default state */}
													<div
														className={`absolute bottom-6 right-6 text-[#765DFB] transform -translate-x-2 translate-y-2 transition-all duration-300 ${
															industriesExpanded
																? "opacity-0 pointer-events-none"
																: "opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-0 group-hover/card:translate-y-0"
														}`}
													>
														<ArrowUpRight className="w-5 h-5" />
													</div>

													{/* Expanded View State (2-column Industry Navigation List) */}
													<div className="ini-view-expanded relative z-10 w-full">
														<div className="ini-view-inner">
															<div className="grid grid-cols-2 gap-x-5 gap-y-0.5 pt-1">
																{/* Left Sub-column (Items 1-5) */}
																<div className="flex flex-col">
																	{industryPages.slice(0, 5).map((industry, index) => {
																		const idStr = String(index + 1).padStart(2, "0")
																		const isSelected =
																			activeTab === `industry:${industry.slug}` ||
																			hoveredIndustrySlug === industry.slug
																		return (
																			<React.Fragment key={industry.slug}>
																				<button
																					type="button"
																					onMouseEnter={() =>
																						setHoveredIndustrySlug(industry.slug)
																					}
																					onMouseLeave={() => setHoveredIndustrySlug(null)}
																					onClick={() =>
																						setActiveTab(`industry:${industry.slug}`)
																					}
																					className={`ini-list-item group/row flex items-center justify-between py-2 px-2.5 -mx-2 rounded-lg transition-all duration-200 text-left cursor-pointer ${
																						isOverview
																							? isSelected
																								? "bg-[#765DFB]/25 text-[#d5ccff]"
																								: "hover:bg-white/10 text-white/80 hover:text-white"
																							: isSelected
																								? "bg-[#ECCDE5]/50 text-[#765DFB]"
																								: "hover:bg-[#ECCDE5]/30 text-[#00050E] hover:text-[#765DFB]"
																					}`}
																					style={{
																						transitionDelay: `${40 + index * 20}ms`,
																					}}
																				>
																					<div className="flex items-center gap-2.5 min-w-0">
																						<span
																							className={`font-mono text-[11px] tracking-wider shrink-0 ${
																								isSelected
																									? isOverview
																										? "text-[#d5ccff]"
																										: "text-[#765DFB]"
																									: isOverview
																										? "text-white/40 group-hover/row:text-[#d5ccff]"
																										: "text-gray-400 group-hover/row:text-[#765DFB]"
																							}`}
																						>
																							{idStr}
																						</span>
																						<span className="font-medium text-[13px] truncate">
																							{industry.name}
																						</span>
																					</div>
																					<ArrowRight
																						className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${
																							isSelected
																								? "opacity-100 translate-x-0"
																								: "opacity-0 -translate-x-1.5 group-hover/row:opacity-100 group-hover/row:translate-x-0"
																						} ${
																							isOverview
																								? "text-[#d5ccff]"
																								: "text-[#765DFB]"
																						}`}
																					/>
																				</button>
																				{index !== 4 && (
																					<div
																						className={`h-[1px] w-full my-0.5 ${
																							isOverview
																								? "bg-white/10"
																								: "bg-neutral-100"
																						}`}
																					/>
																				)}
																			</React.Fragment>
																		)
																	})}
																</div>

																{/* Right Sub-column (Items 6-10) */}
																<div className="flex flex-col">
																	{industryPages.slice(5, 10).map((industry, index) => {
																		const idStr = String(index + 6).padStart(2, "0")
																		const isSelected =
																			activeTab === `industry:${industry.slug}` ||
																			hoveredIndustrySlug === industry.slug
																		return (
																			<React.Fragment key={industry.slug}>
																				<button
																					type="button"
																					onMouseEnter={() =>
																						setHoveredIndustrySlug(industry.slug)
																					}
																					onMouseLeave={() => setHoveredIndustrySlug(null)}
																					onClick={() =>
																						setActiveTab(`industry:${industry.slug}`)
																					}
																					className={`ini-list-item group/row flex items-center justify-between py-2 px-2.5 -mx-2 rounded-lg transition-all duration-200 text-left cursor-pointer ${
																						isOverview
																							? isSelected
																								? "bg-[#765DFB]/25 text-[#d5ccff]"
																								: "hover:bg-white/10 text-white/80 hover:text-white"
																							: isSelected
																								? "bg-[#ECCDE5]/50 text-[#765DFB]"
																								: "hover:bg-[#ECCDE5]/30 text-[#00050E] hover:text-[#765DFB]"
																					}`}
																					style={{
																						transitionDelay: `${140 + index * 20}ms`,
																					}}
																				>
																					<div className="flex items-center gap-2.5 min-w-0">
																						<span
																							className={`font-mono text-[11px] tracking-wider shrink-0 ${
																								isSelected
																									? isOverview
																										? "text-[#d5ccff]"
																										: "text-[#765DFB]"
																									: isOverview
																										? "text-white/40 group-hover/row:text-[#d5ccff]"
																										: "text-gray-400 group-hover/row:text-[#765DFB]"
																							}`}
																						>
																							{idStr}
																						</span>
																						<span className="font-medium text-[13px] truncate">
																							{industry.name}
																						</span>
																					</div>
																					<ArrowRight
																						className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${
																							isSelected
																								? "opacity-100 translate-x-0"
																								: "opacity-0 -translate-x-1.5 group-hover/row:opacity-100 group-hover/row:translate-x-0"
																						} ${
																							isOverview
																								? "text-[#d5ccff]"
																								: "text-[#765DFB]"
																						}`}
																					/>
																				</button>
																				{index !== 4 && (
																					<div
																						className={`h-[1px] w-full my-0.5 ${
																							isOverview
																								? "bg-white/10"
																								: "bg-neutral-100"
																						}`}
																					/>
																				)}
																			</React.Fragment>
																		)
																	})}
																</div>
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
												<a
													href="https://docs.negentro.tech/"
													target="_blank"
													rel="noopener noreferrer"
													className={`flex-1 p-8 sm:p-10 relative group/card cursor-pointer transition-colors overflow-hidden border-r block ${
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
												</a>

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
