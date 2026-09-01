import type React from "react"
import { useEffect, useState } from "react"
import { X, ExternalLink, Loader2 } from "lucide-react"

export interface CalendlyModalProps {
	isOpen: boolean
	onClose: () => void
	calendlyUrl?: string
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({
	isOpen,
	onClose,
	calendlyUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/negentro/30min",
}) => {
	const [isLoading, setIsLoading] = useState(true)

	// Close on Escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}
		if (isOpen) {
			document.body.style.overflow = "hidden"
			window.addEventListener("keydown", handleKeyDown)
			setIsLoading(true)
		} else {
			document.body.style.overflow = ""
		}
		return () => {
			document.body.style.overflow = ""
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Modal Container */}
			<div className="relative w-full max-w-4xl h-[90vh] max-h-[780px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 border border-[#4846AC]/20">
				{/* Top Header Bar */}
				<div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-[#F9F8FD]">
					<div className="flex items-center gap-2.5">
						<span className="w-2.5 h-2.5 rounded-full bg-[#765DFB] animate-pulse" />
						<span className="font-semibold text-sm sm:text-base text-[#0F1123] font-['DM_Sans',sans-serif]">
							Schedule a Call with Negentro Team
						</span>
					</div>

					<div className="flex items-center gap-2">
						{/* Open in new tab fallback button */}
						<a
							href={calendlyUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
							title="Open in new tab"
						>
							<ExternalLink className="w-4 h-4" />
						</a>

						{/* Close button */}
						<button
							type="button"
							onClick={onClose}
							className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
							aria-label="Close"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Embed / IFrame Body */}
				<div className="relative flex-1 w-full bg-white overflow-hidden">
					{isLoading && (
						<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-10">
							<Loader2 className="w-8 h-8 text-[#765DFB] animate-spin" />
							<span className="text-sm font-medium text-neutral-500 font-['DM_Sans',sans-serif]">
								Loading Calendly scheduling...
							</span>
						</div>
					)}
					<iframe
						src={`${calendlyUrl}?embed_domain=${typeof window !== "undefined" ? window.location.host : ""}&embed_type=Inline`}
						width="100%"
						height="100%"
						frameBorder="0"
						title="Schedule a meeting"
						onLoad={() => setIsLoading(false)}
						className="w-full h-full"
					/>
				</div>
			</div>
		</div>
	)
}
