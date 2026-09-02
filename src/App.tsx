import { useState, lazy, Suspense } from "react"
import { LanguageProvider } from "./lib/i18n"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { FluidBackground } from "./components/FluidBackground"
import { PartnerLogos } from "./components/PartnerLogos"
import { MemoryParadigmSection } from "./components/MemoryParadigmSection"
import { DifferentApproachSection } from "./components/DifferentApproachSection"
import { WorkflowsSection } from "./components/WorkflowsSection"
import { CodeIntegrationSection } from "./components/CodeIntegrationSection"
import { SecurityComplianceSection } from "./components/SecurityComplianceSection"
import { ResearchPapersSection } from "./components/ResearchPapersSection"
import { CtaSection } from "./components/CtaSection"
import { Footer } from "./components/Footer"

// Lazy loaded non-initial route and interactive modal
const WaitPage = lazy(() =>
	import("./components/WaitPage").then((m) => ({ default: m.WaitPage })),
)
const TryPiyApiModal = lazy(() =>
	import("./components/TryPiyApiModal").then((m) => ({
		default: m.TryPiyApiModal,
	})),
)

export function App() {
	const [activeTab, setActiveTab] = useState<string>("overview")
	const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false)
	const isOverview = activeTab === "overview"

	return (
		<LanguageProvider>
			{isOverview ? (
				<div className="w-full bg-[#04050c] font-sans antialiased selection:bg-[#6320EE] selection:text-white">
					{/* Hero Section with Interactive Fluid Simulation */}
					<section className="relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden">
						<FluidBackground />

						<div className="relative z-20 w-full">
							<Navbar
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								onTryPiyApi={() => setIsConsoleOpen(true)}
							/>
						</div>

						<main className="flex-1 w-full flex flex-col items-center justify-center relative z-10 my-auto">
							<Hero onOpenConsole={() => setIsConsoleOpen(true)} />
						</main>
					</section>

					{/* Partner Logos */}
					<section className="w-full bg-white pt-6 pb-12 sm:pb-16 lg:pb-20 relative z-20 border-t border-neutral-100/80">
						<PartnerLogos />
					</section>

					{/* Landing Page Content Sections */}
					<MemoryParadigmSection onOpenConsole={() => setIsConsoleOpen(true)} />
					<DifferentApproachSection />
					<WorkflowsSection />
					<CodeIntegrationSection />
					<SecurityComplianceSection />
					<ResearchPapersSection />
					<CtaSection onOpenConsole={() => setIsConsoleOpen(true)} />
					<Footer onOpenConsole={() => setIsConsoleOpen(true)} />
				</div>
			) : (
				<div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white font-sans antialiased">
					<Navbar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						onTryPiyApi={() => setIsConsoleOpen(true)}
					/>

					<main className="flex-1 flex flex-col items-center justify-center">
						<Suspense
							fallback={
								<div className="flex items-center justify-center min-h-[50vh]">
									<div className="w-8 h-8 rounded-full border-2 border-[#765DFB] border-t-transparent animate-spin" />
								</div>
							}
						>
							<WaitPage pageName={activeTab} />
						</Suspense>
					</main>
				</div>
			)}

			{/* Interactive Live Console Modal */}
			{isConsoleOpen && (
				<Suspense fallback={null}>
					<TryPiyApiModal
						isOpen={isConsoleOpen}
						onClose={() => setIsConsoleOpen(false)}
					/>
				</Suspense>
			)}
		</LanguageProvider>
	)
}

export default App
