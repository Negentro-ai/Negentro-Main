import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { PartnerLogos } from './components/PartnerLogos'
import { TryPiyApiModal } from './components/TryPiyApiModal'

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false)

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white font-sans antialiased">
      {/* 1. Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTryPiyApi={() => setIsConsoleOpen(true)}
      />

      {/* 2. Main Central Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <Hero
          activeTab={activeTab}
          onOpenConsole={() => setIsConsoleOpen(true)}
        />
      </main>

      {/* 3. Bottom Partner Logos - Displayed ONLY on the overview landing page */}
      {activeTab === 'overview' && (
        <footer className="w-full animate-fade-in">
          <PartnerLogos />
        </footer>
      )}

      {/* 4. Interactive Live Console Modal */}
      <TryPiyApiModal
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
      />
    </div>
  )
}

export default App
