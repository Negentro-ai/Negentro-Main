import type React from "react"

export const NegentroLogo: React.FC<{ className?: string }> = ({
	className = "h-8 sm:h-9",
}) => {
	return (
		<img
			src="/logos/negentro.svg"
			alt="Negentro"
			className={`select-none object-contain ${className}`}
		/>
	)
}

export const NotionLogo: React.FC<{ className?: string }> = ({
	className = "h-7 sm:h-8 md:h-9",
}) => {
	return (
		<img
			src="/logos/notion.svg"
			alt="Notion"
			className={`select-none object-contain transition-transform duration-300 hover:scale-105 ${className}`}
		/>
	)
}

export const ClaudeLogo: React.FC<{ className?: string }> = ({
	className = "h-6 sm:h-7 md:h-8",
}) => {
	return (
		<img
			src="/logos/claude.svg"
			alt="Claude"
			className={`select-none object-contain transition-transform duration-300 hover:scale-105 ${className}`}
		/>
	)
}

export const ModalLogo: React.FC<{ className?: string }> = ({
	className = "h-5 sm:h-6 md:h-7",
}) => {
	return (
		<img
			src="/logos/modal.svg"
			alt="Modal"
			className={`select-none object-contain transition-transform duration-300 hover:scale-105 ${className}`}
		/>
	)
}

export const MongoDbLogo: React.FC<{ className?: string }> = ({
	className = "h-7 sm:h-8 md:h-9",
}) => {
	return (
		<img
			src="/logos/mongoDB.svg"
			alt="MongoDB"
			className={`select-none object-contain transition-transform duration-300 hover:scale-105 ${className}`}
		/>
	)
}

// Aliases for backwards compatibility
export const AwsLogo = NotionLogo
export const NvidiaLogo = ClaudeLogo
export const MicrosoftLogo = ModalLogo
export const GoogleLogo = MongoDbLogo
