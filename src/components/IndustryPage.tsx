import { useState, useEffect } from "react"
import { getSupabase } from "@/lib/supabase"
import type { IndustryPageData } from "@/data/industryPages"
import { getIndustryPage } from "@/data/industryPages"
import NewIndustryTemplate from "./NewIndustryTemplate"

export interface IndustryPageProps {
	industrySlug?: string
	previewIndustry?: any
	onNavigate: (slug: string) => void
	onTryPiyApi?: () => void
}

export function IndustryPage({
	industrySlug,
	previewIndustry,
	onNavigate,
	onTryPiyApi,
}: IndustryPageProps) {
	const [industry, setIndustry] = useState<IndustryPageData | null>(
		previewIndustry || (industrySlug ? getIndustryPage(industrySlug) || null : null),
	)
	const [loading, setLoading] = useState(!previewIndustry && !industry)

	useEffect(() => {
		if (previewIndustry) {
			setIndustry(previewIndustry)
			setLoading(false)
			return
		}

		if (!industrySlug) return

		const defaultIndustry = getIndustryPage(industrySlug)
		if (defaultIndustry) {
			setIndustry(defaultIndustry)
		}

		const fetchCmsData = async () => {
			try {
				const client = await getSupabase()
				if (!client) {
					setLoading(false)
					return
				}

				const { data } = await client
					.from("cms_records")
					.select("*")
					.eq("kind", "industries")
					.eq("slug", industrySlug)
					.maybeSingle()

				if (
					data &&
					data.content &&
					data.content.blocks &&
					data.content.blocks[0]?.content
				) {
					try {
						const parsed = JSON.parse(data.content.blocks[0].content)
						setIndustry({
							...(defaultIndustry || ({} as IndustryPageData)),
							slug: data.slug,
							name: data.title,
							heroTitle: parsed.heroTitle || data.title,
							heroDescription: parsed.heroDescription || data.summary,
							heroLede: parsed.heroLede || parsed.heroDescription || data.summary,
							facts: parsed.facts && parsed.facts.length > 0 ? parsed.facts : defaultIndustry?.facts || [],
							sessionHeading: parsed.sessionHeading || defaultIndustry?.sessionHeading,
							sessionSub: parsed.sessionSub || defaultIndustry?.sessionSub,
							sessionSteps: parsed.sessionSteps && parsed.sessionSteps.length > 0 ? parsed.sessionSteps : defaultIndustry?.sessionSteps,
							whyHeading: parsed.whyHeading || defaultIndustry?.whyHeading,
							whyParagraphs: parsed.whyParagraphs && parsed.whyParagraphs.length > 0 ? parsed.whyParagraphs : defaultIndustry?.whyParagraphs,
							blocksHeading: parsed.blocksHeading || defaultIndustry?.blocksHeading,
							blocks: parsed.blocks && parsed.blocks.length > 0 ? parsed.blocks : defaultIndustry?.blocks,
							infraHeading: parsed.infraHeading || defaultIndustry?.infraHeading,
							infraList: parsed.infraList && parsed.infraList.length > 0 ? parsed.infraList : defaultIndustry?.infraList,
							architecture: parsed.architecture || defaultIndustry?.architecture,
							faqHeading: parsed.faqHeading || defaultIndustry?.faqHeading,
							faqs: parsed.faqs && parsed.faqs.length > 0 ? parsed.faqs : defaultIndustry?.faqs || [],
							finalCtaTitle: parsed.finalCtaTitle || defaultIndustry?.finalCtaTitle || "Give your product a memory that grows with it.",
							finalCtaDescription: parsed.finalCtaDescription || defaultIndustry?.finalCtaDescription || "Build AI systems with persistent context.",
						} as IndustryPageData)
					} catch (e) {
						console.error("Failed to parse CMS industry content", e)
					}
				}
			} catch (err) {
				console.error("Error fetching CMS industry data", err)
			} finally {
				setLoading(false)
			}
		}

		fetchCmsData()
	}, [industrySlug, previewIndustry])

	if (loading && !industry) {
		return (
			<div className="flex items-center justify-center min-h-[50vh] bg-white">
				<div className="w-8 h-8 rounded-full border-2 border-[#765DFB] border-t-transparent animate-spin" />
			</div>
		)
	}

	if (!industry) {
		return (
			<div className="py-32 text-center text-zinc-500 bg-white">
				Industry not found.
			</div>
		)
	}

	return (
		<NewIndustryTemplate
			data={industry}
			onNavigate={onNavigate}
			onTryPiyApi={onTryPiyApi}
		/>
	)
}

export default IndustryPage
