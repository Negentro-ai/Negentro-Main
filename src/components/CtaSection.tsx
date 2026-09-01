import type React from "react"
import CTAWithVerticalMarquee from "@/components/ui/cta-with-text-marquee"

export interface CtaSectionProps {
	onOpenConsole?: () => void
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenConsole }) => {
	return <CTAWithVerticalMarquee onOpenConsole={onOpenConsole} />
}
