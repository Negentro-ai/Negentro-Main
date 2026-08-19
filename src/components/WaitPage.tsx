import type React from 'react'

export interface WaitPageProps {
  pageName?: string
}

export const WaitPage: React.FC<WaitPageProps> = () => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 animate-fade-in my-auto">
      {/* Floating Pixel-Art Character SVG Illustration */}
      <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
        <img
          src="/wait-illustration.svg"
          alt="Memory is loading"
          className="w-[320px] sm:w-[420px] md:w-[480px] max-w-[90vw] h-auto object-contain select-none transition-transform hover:scale-[1.02] duration-300"
        />
      </div>

      {/* Main Gradient Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-[54px] font-bold tracking-[-0.03em] leading-[1.18] bg-gradient-to-r from-[#C16AFF] to-[#0B1015] bg-clip-text text-transparent pb-1 px-1">
        Memory is loading...
      </h1>

      {/* Subheading tightly spaced directly beneath the heading */}
      <p className="text-base sm:text-lg md:text-[22px] font-bold text-black tracking-[-0.01em] -mt-1 sm:-mt-1.5 max-w-2xl mx-auto leading-snug">
        Our team is putting the finishing touches on{' '}
        <span className="text-[#C16AFF]">Negentro.</span>
      </p>
    </div>
  )
}
