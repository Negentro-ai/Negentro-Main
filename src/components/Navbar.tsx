import { useState } from 'react'
import type React from 'react'
import { NegentroLogo } from './Logos'
import { Menu, X } from 'lucide-react'

export interface NavbarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onTryPiyApi?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navItems = ['Research', 'Pricing', 'Initiatives', 'Resources']
  const isOverview = activeTab === 'overview'

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isOverview
          ? 'absolute top-0 inset-x-0 z-50 bg-transparent border-b border-white/10'
          : 'sticky top-0 z-50 bg-white border-b border-[#e5e7eb]'
      }`}
    >
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 h-[76px] flex items-center justify-between">
        {/* Left: Negentro Brand Logo with smooth scale hover */}
        <div className="flex items-center">
          <button
            onClick={() => setActiveTab('overview')}
            className="flex items-center transition-all duration-300 ease-out hover:opacity-85 hover:scale-[1.03] active:scale-[0.97] cursor-pointer focus:outline-none"
            title="Negentro Home"
          >
            <NegentroLogo
              className={`h-8 sm:h-[34px] transition-all duration-300 ${
                isOverview ? 'brightness-0 invert' : ''
              }`}
            />
          </button>
        </div>

        {/* Center: Soft Rounded Rectangle Nav Container with smooth interactive items */}
        <nav
          className={`hidden md:flex items-center rounded-[10px] h-[46px] px-8 gap-7 sm:gap-8 transition-all duration-300 ${
            isOverview
              ? 'bg-white/10 border border-white/15 backdrop-blur-md text-white'
              : 'bg-[#f4f4f5] text-neutral-950'
          }`}
        >
          {navItems.map((item) => {
            const key = item.toLowerCase()
            const isActive = activeTab === key
            return (
              <button
                key={item}
                onClick={() => setActiveTab(key)}
                className={`relative py-1 text-[14px] transition-all duration-200 ease-out cursor-pointer select-none group active:scale-[0.96] ${
                  isOverview
                    ? isActive
                      ? 'text-white font-semibold'
                      : 'text-white/70 font-normal hover:text-white'
                    : isActive
                    ? 'text-neutral-950 font-semibold'
                    : 'text-[#666666] font-normal hover:text-neutral-950'
                }`}
              >
                <span>{item}</span>
                {/* Smooth Animated Indicator Bar */}
                <span
                  className={`absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full transition-all duration-250 ease-out ${
                    isOverview ? 'bg-white' : 'bg-neutral-950'
                  } ${
                    isActive
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-75'
                  }`}
                />
              </button>
            )
          })}
        </nav>

        {/* Right: Try PiyApi Button with smooth lift, shadow & sheen animations */}
        <div className="hidden md:flex items-center">
          <a
            href="https://piyapi.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative inline-flex items-center justify-center text-sm font-medium h-[42px] px-5 rounded-[8px] transition-all duration-250 ease-out shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer overflow-hidden group ${
              isOverview
                ? 'bg-white text-neutral-950 hover:bg-white/90'
                : 'bg-[#232323] hover:bg-neutral-950 text-white'
            }`}
          >
            <span className="relative z-10">Try Piyapi</span>
            {/* Smooth Sheen Sweep Animation on Hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 rounded-lg transition-all duration-200 active:scale-95 ${
              isOverview
                ? 'text-white hover:bg-white/10'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
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
              ? 'border-white/15 bg-[#04050c]/95 backdrop-blur-xl'
              : 'border-neutral-200 bg-white'
          }`}
        >
          <div
            className={`rounded-[10px] p-2 space-y-1 ${
              isOverview ? 'bg-white/10' : 'bg-[#f4f4f5]'
            }`}
          >
            {navItems.map((item) => {
              const key = item.toLowerCase()
              return (
                <button
                  key={item}
                  onClick={() => {
                    setActiveTab(key)
                    setMobileOpen(false)
                  }}
                  className={`block w-full text-left px-4 py-2.5 text-sm font-normal rounded-md transition-all duration-200 ease-out ${
                    activeTab === key
                      ? isOverview
                        ? 'bg-white/20 text-white font-semibold'
                        : 'bg-white text-neutral-950 font-semibold shadow-xs'
                      : isOverview
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-[#666666] hover:text-neutral-950 hover:bg-white/60'
                  }`}
                >
                  {item}
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
              className={`w-full flex items-center justify-center text-sm font-medium py-3 rounded-[8px] transition-all duration-250 active:scale-[0.98] shadow-xs hover:shadow-md ${
                isOverview
                  ? 'bg-white text-neutral-950 hover:bg-white/90'
                  : 'bg-[#232323] hover:bg-neutral-950 text-white'
              }`}
            >
              <span>Try Piyapi</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
