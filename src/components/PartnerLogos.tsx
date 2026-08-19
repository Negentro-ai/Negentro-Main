import type React from 'react'
import { AwsLogo, NvidiaLogo, MicrosoftLogo, GoogleLogo } from './Logos'

export const PartnerLogos: React.FC = () => {
  // Define the set of 4 partner logos
  const logoList = [
    { component: <AwsLogo className="h-10 sm:h-12 w-auto max-h-12" />, name: 'AWS' },
    { component: <NvidiaLogo className="h-8 sm:h-10 w-auto max-h-10" />, name: 'NVIDIA' },
    { component: <MicrosoftLogo className="h-8 sm:h-9 w-auto max-h-9" />, name: 'Microsoft' },
    { component: <GoogleLogo className="h-9 sm:h-11 w-auto max-h-11" />, name: 'Google' },
  ]

  // Duplicate the list 3 times for a smooth, seamless infinite loop
  const marqueeItems = [...logoList, ...logoList, ...logoList]

  return (
    <div className="w-full py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Animated Marquee Container with Horizontal Edge Fading Mask */}
        <div className="relative w-full overflow-hidden mask-gradient-x py-4">
          <div className="animate-marquee flex items-center">
            {marqueeItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center px-10 sm:px-14 md:px-18 shrink-0 select-none cursor-default opacity-85 hover:opacity-100 transition-opacity"
              >
                <div className="flex items-center justify-center h-14">
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
