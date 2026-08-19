import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { FluidBackground } from './components/FluidBackground'
import { WaitPage } from './components/WaitPage'
import { PartnerLogos } from './components/PartnerLogos'
import { TryPiyApiModal } from './components/TryPiyApiModal'

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false)
  const isOverview = activeTab === 'overview'

  return (
    <>
      {isOverview ? (
        /* ════════════════════════════════════════════════════════════
           1. OVERVIEW LANDING PAGE
           - 100vh Full-screen Hero Section with WebGL Fluid Canvas
             spanning the entire screen from behind the navbar down
           - Scroll-down Brand Logos Marquee
           ════════════════════════════════════════════════════════════ */
        <div className="w-full bg-[#04050c] font-sans antialiased">
          {/* Full 100vh Hero Section */}
          <section className="relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden">
            {/* Interactive WebGL Fluid Background spanning full 100vh screen including behind the navbar */}
            <FluidBackground />

            {/* Top Navbar Header floating seamlessly on top of fluid canvas */}
            <div className="relative z-20 w-full">
              <Navbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onTryPiyApi={() => setIsConsoleOpen(true)}
              />
            </div>

            {/* Main Central Canvas centered in 100vh view */}
            <main className="flex-1 w-full flex flex-col items-center justify-center relative z-10 my-auto">
              <Hero onOpenConsole={() => setIsConsoleOpen(true)} />
            </main>

            {/* Bottom spacer for balanced centering */}
            <div className="h-4 sm:h-6 pointer-events-none relative z-10" />
          </section>

          {/* Brand Logos Section (Visible when scrolling down with reduced clean spacing) */}
          <section className="w-full bg-white py-8 sm:py-12 relative z-20 border-t border-neutral-100 shadow-sm animate-fade-in">
            <PartnerLogos />
          </section>
        </div>
      ) : (
        /* ════════════════════════════════════════════════════════════
           2. SUBPAGES (Research, Pricing, Initiatives, Resources)
           - Clean original full-page layout with white navbar & WaitPage
           ════════════════════════════════════════════════════════════ */
        <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white font-sans antialiased">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onTryPiyApi={() => setIsConsoleOpen(true)}
          />

          <main className="flex-1 flex flex-col items-center justify-center">
            <WaitPage pageName={activeTab} />
          </main>
        </div>
      )}

      {/* Interactive Live Console Modal */}
      <TryPiyApiModal
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
      />
    </>
  )
}

export default App
