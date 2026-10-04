export const researchArticle = {
	date: "September 27, 2026",
	category: "Research",
	title: "Advancing persistent memory across long-lived AI systems",
	subtitle:
		"Exploring how retrieval, persistent context, and memory architecture help AI systems reason over long-lived histories.",
	intro: {
		lead: "We are studying how persistent memory can help AI systems operate over information that extends far beyond a single interaction or context window.",
		paragraphs: [
			"Persistent context allows a system to retain relevant information across sessions rather than discarding it at the end of each interaction. Retrieval mechanisms then determine which fragments of that accumulated history are most relevant to a given query, rather than requiring the model to process the entire record each time.",
			"As systems accumulate more history, the challenge shifts from storage to selection: identifying which fragments materially change the answer a model should give, and structuring memory so that reasoning over long-term context remains tractable at scale.",
		],
	},
	architecture: {
		heading: "Why memory architecture matters",
		paragraphs: [
			"Memory architecture determines how a system decides what to remember, what to forget, and what to surface at inference time. As deployments grow from thousands to millions of stored interactions, naive approaches that pass full history into context become impractical, both in cost and in the model's ability to reason precisely.",
			"We treat memory not as a storage layer bolted onto a model, but as part of the reasoning system itself: a component that actively shapes what evidence a model sees, and therefore what it can conclude.",
		],
	},
	comparison: {
		fullContext: {
			label: "Full context",
			volume: "Entire history",
			result: "Signal + noise",
		},
		selectiveRetrieval: {
			label: "Selective retrieval",
			volume: "5-10K tokens",
			result: "Precise signal",
		},
		caption:
			"Selective retrieval reduces the amount of context the model must process while preserving the evidence required to answer.",
		callout:
			"At scale, memory architecture becomes part of the reasoning system.",
	},
	performance: {
		heading: "Measuring performance at scale",
		paragraphs: [
			"To understand how memory architecture behaves under load, we evaluate performance across illustrative scale tiers of 100K, 1M, and 10M stored items. These values represent research benchmark scale, not claims about any specific deployment or dataset.",
			"Across these tiers, we observe how retrieval precision, latency, and reasoning quality shift as the underlying memory store grows, and how architectural choices affect the rate of degradation.",
		],
		chartImage: "/assets/research/memory-performance-chart.png",
		chartAlt:
			"Line chart comparing memory performance at 100K, 1M, and 10M items. Negentro stays near 92 while System A and System B decline as scale increases.",
		chartNote: "Illustrative benchmark values, internal research configuration.",
		chartSummary:
			"Negentro maintains substantially flatter degradation as scale increases, suggesting that selective retrieval preserves relevant signal even as the underlying memory store grows by orders of magnitude.",
		metrics: [
			{ value: "92.1", label: "Performance at 10M" },
			{ value: "88.7", label: "Retrieval precision" },
			{ value: "76%", label: "Token reduction" },
		],
		tokenEfficiency:
			"By retrieving only the fragments necessary to answer a given query, Negentro reduces the volume of tokens processed per request while retaining the evidence required for accurate responses.",
		categories: [
			{ name: "Instruction following", value: 86.2 },
			{ name: "Preference following", value: 79.8 },
			{ name: "Summarization", value: 82.4 },
			{ name: "Abstention", value: 91.0 },
			{ name: "Event ordering", value: 74.6 },
			{ name: "Information extraction", value: 88.9 },
			{ name: "Temporal reasoning", value: 68.3 },
			{ name: "Knowledge updates", value: 80.1 },
		],
		categorySummary:
			"Performance varies meaningfully by category, with abstention and information extraction scoring highest, while temporal reasoning remains the most challenging category for current memory architectures.",
	},
	results: {
		heading: "What the results reveal",
		paragraphs: [
			"Taken together, these results suggest that memory architecture has a measurable effect on how well a system reasons over long-lived histories, particularly as scale increases beyond what fits comfortably in a single context window.",
			"Selective retrieval consistently outperforms naive full-context approaches on both accuracy and efficiency, and the gap widens as the underlying memory store grows.",
			"These findings inform how we design memory systems going forward, prioritizing precision of retrieval over raw volume of stored context.",
		],
	},
	limitations: {
		heading: "Limits of memory benchmarks",
		intro: [
			"Benchmark results, including those presented here, are shaped by the assumptions and constraints of the evaluation setup. We believe it is important to be explicit about where these limits lie.",
			"The scale tiers and metrics used in this research are illustrative of the trends we observe, but they do not capture every dimension of real-world deployment complexity.",
		],
		items: [
			{
				title: "Synthetic data",
				description: "Benchmark data may differ meaningfully from real production traffic patterns and user behavior.",
			},
			{
				title: "Single configuration",
				description: "Results depend on the specific evaluated configuration and may not generalize across all setups.",
			},
			{
				title: "Judge variance",
				description: "Evaluation methods, including model-based judges, can introduce variance into reported scores.",
			},
			{
				title: "Production scope",
				description: "Real deployments introduce privacy, concurrency, identity, and operational constraints not fully captured here.",
			},
		],
	},
	research: {
		heading: "Research & availability",
		paragraphs: [
			"The methodology behind these benchmarks, along with detailed results across each scale tier and category, is documented for teams evaluating persistent memory approaches for their own systems.",
			"An early implementation reference is available below, demonstrating how persistent memory retrieval integrates into an existing agent loop.",
		],
		codeTitle: "Adding persistent memory to an agent",
		code: `const context = await memory.search({
  query,
  scope: userId,
  limit: 8
})

const response = await agent.run({
  context,
  input: query
})`,
		codeCaption:
			"This example illustrates a minimal retrieval step inserted before an agent's reasoning call, using only the memory fragments relevant to the current query.",
	},
	related: [
		{
			title: "Building reliable persistent memory",
			category: "Research · Sep 2026",
			style: "violet",
		},
		{
			title: "Retrieval beyond context windows",
			category: "Research · Sep 2026",
			style: "lilac",
		},
		{
			title: "Evaluating long-lived AI systems",
			category: "Research · Sep 2026",
			style: "dark",
		},
	],
}