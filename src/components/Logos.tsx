import type React from "react"

export const NegentroLogo: React.FC<{ className?: string }> = ({
	className = "h-8 sm:h-9",
}) => {
	return (
		<img
			src="/logos/negentro.svg"
			alt="Negentro"
			width={160}
			height={36}
			loading="lazy"
			decoding="async"
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
			width={110}
			height={36}
			loading="lazy"
			decoding="async"
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
			width={120}
			height={32}
			loading="lazy"
			decoding="async"
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
			width={100}
			height={28}
			loading="lazy"
			decoding="async"
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
			width={130}
			height={36}
			loading="lazy"
			decoding="async"
			className={`select-none object-contain transition-transform duration-300 hover:scale-105 ${className}`}
		/>
	)
}

// Aliases for backwards compatibility
export const AwsLogo = NotionLogo
export const NvidiaLogo = ClaudeLogo
export const MicrosoftLogo = ModalLogo
export const GoogleLogo = MongoDbLogo
