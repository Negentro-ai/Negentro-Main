import type React from 'react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export interface HeroProps {
  onOpenConsole?: () => void
}

export const Hero: React.FC<HeroProps> = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const sublineRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    if (!headingRef.current || !sublineRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Heading reveal with soft spring and blur-to-focus animation
    gsap.set(headingRef.current, { opacity: 0, y: 24, scale: 0.96, filter: 'blur(8px)' })
    tl.to(
      headingRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power2.out',
      },
      0.3
    )

    // Subheading reveal
    gsap.set(sublineRef.current, { opacity: 0, y: 16, filter: 'blur(6px)' })
    tl.to(
      sublineRef.current,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
      },
      0.65
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto text-center pointer-events-none select-none px-6 sm:px-8"
    >
      {/* Main Headline matching DM Sans with glowing purple Memory */}
      <h1
        ref={headingRef}
        className="text-4xl sm:text-6xl md:text-[68px] lg:text-[76px] font-bold tracking-[-0.035em] text-[#eef0f6] max-w-5xl mx-auto leading-[1.12]"
      >
        The Next Evolution Of<br />
        Intelligence Is <span className="text-[#C16AFF]">Memory.</span>
      </h1>

      {/* Subheading matching DM Sans in light muted tone */}
      <p
        ref={sublineRef}
        className="text-base sm:text-xl md:text-[22px] text-[#b9becf] font-normal max-w-3xl mx-auto leading-relaxed mt-5 sm:mt-7 tracking-[-0.01em]"
      >
        Piyapi gives AI the ability to remember, learn, and evolve.
      </p>
    </div>
  )
}
