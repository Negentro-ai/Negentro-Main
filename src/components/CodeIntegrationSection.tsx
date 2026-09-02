import type React from "react"
import { useState } from "react"
import { Copy, Check } from "lucide-react"

type CategoryType = "sdk" | "agents" | "connectors" | "mcp"
type LangType = "python" | "node"

interface CodeBlock {
	raw: string
	lines: {
		lineNum: number
		content: React.ReactNode
	}[]
}

interface CategoryInfo {
	id: CategoryType
	tag: string
	title: string
	subtitle: string
	code: Record<LangType, CodeBlock>
}

export const CodeIntegrationSection: React.FC = () => {
	const [activeCategory, setActiveCategory] = useState<CategoryType>("sdk")
	const [activeLang, setActiveLang] = useState<LangType>("python")
	const [copied, setCopied] = useState(false)

	const CATEGORIES: Record<CategoryType, CategoryInfo> = {
		sdk: {
			id: "sdk",
			tag: "//01",
			title: "SDK",
			subtitle: "Native SDKs, REST APIs, and AI framework integrations",
			code: {
				python: {
					raw: `# 1. Install
# pip install piyapi-memory

from piyapi_memory import PiyAPI

# Initialize
client = PiyAPI(
    api_key="YOUR_API_KEY"
)

# Enable memory for the agent
memory = client.memory( user_id="user_123" )

# Remember
memory.store(
    "User prefers concise answers" )

# Recall
context = memory.search(
    "user preferences"
)`,
					lines: [
						{
							lineNum: 1,
							content: <span className="text-[#16A34A]"># 1. Install</span>,
						},
						{
							lineNum: 2,
							content: (
								<span className="text-[#16A34A]">
									# pip install piyapi-memory
								</span>
							),
						},
						{ lineNum: 3, content: <span>&nbsp;</span> },
						{
							lineNum: 4,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									piyapi_memory{" "}
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									PiyAPI
								</span>
							),
						},
						{ lineNum: 5, content: <span>&nbsp;</span> },
						{
							lineNum: 6,
							content: <span className="text-[#16A34A]"># Initialize</span>,
						},
						{ lineNum: 7, content: <span>client = PiyAPI(</span> },
						{
							lineNum: 8,
							content: (
								<span className="pl-6">
									api_key=<span className="text-[#DC2626]">"YOUR_API_KEY"</span>
								</span>
							),
						},
						{ lineNum: 9, content: <span>)</span> },
						{ lineNum: 10, content: <span>&nbsp;</span> },
						{
							lineNum: 11,
							content: (
								<span className="text-[#16A34A]">
									# Enable memory for the agent
								</span>
							),
						},
						{
							lineNum: 12,
							content: (
								<span>
									memory = client.memory( user_id=
									<span className="text-[#DC2626]">"user_123"</span> )
								</span>
							),
						},
						{ lineNum: 13, content: <span>&nbsp;</span> },
						{
							lineNum: 14,
							content: <span className="text-[#16A34A]"># Remember</span>,
						},
						{ lineNum: 15, content: <span>memory.store(</span> },
						{
							lineNum: 16,
							content: (
								<span className="pl-6">
									<span className="text-[#DC2626]">
										"User prefers concise answers"
									</span>{" "}
									)
								</span>
							),
						},
						{ lineNum: 17, content: <span>&nbsp;</span> },
						{
							lineNum: 18,
							content: <span className="text-[#16A34A]"># Recall</span>,
						},
						{ lineNum: 19, content: <span>context = memory.search(</span> },
						{
							lineNum: 20,
							content: (
								<span className="pl-6">
									<span className="text-[#DC2626]">"user preferences"</span>
								</span>
							),
						},
						{ lineNum: 21, content: <span>)</span> },
					],
				},
				node: {
					raw: `// 1. Install
// npm install @piyapi/memory

import { PiyAPI } from "piyapi-memory";

// Initialize
const client = new PiyAPI({
    apiKey: "YOUR_API_KEY"
});

// Enable memory for the agent
const memory = client.memory({ userId: "user_123" });

// Remember
await memory.store({
    content: "User prefers concise answers"
});

// Recall
const context = await memory.search({
    query: "user preferences"
});`,
					lines: [
						{
							lineNum: 1,
							content: <span className="text-[#16A34A]">// 1. Install</span>,
						},
						{
							lineNum: 2,
							content: (
								<span className="text-[#16A34A]">
									// npm install @piyapi/memory
								</span>
							),
						},
						{ lineNum: 3, content: <span>&nbsp;</span> },
						{
							lineNum: 4,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									&#123; PiyAPI &#125;{" "}
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									<span className="text-[#DC2626]">"piyapi-memory"</span>;
								</span>
							),
						},
						{ lineNum: 5, content: <span>&nbsp;</span> },
						{
							lineNum: 6,
							content: <span className="text-[#16A34A]">// Initialize</span>,
						},
						{
							lineNum: 7,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									client ={" "}
									<span className="text-[#2563EB] font-semibold">new</span>{" "}
									PiyAPI(&#123;
								</span>
							),
						},
						{
							lineNum: 8,
							content: (
								<span className="pl-6">
									apiKey: <span className="text-[#DC2626]">"YOUR_API_KEY"</span>
								</span>
							),
						},
						{ lineNum: 9, content: <span>&#125;);</span> },
						{ lineNum: 10, content: <span>&nbsp;</span> },
						{
							lineNum: 11,
							content: (
								<span className="text-[#16A34A]">
									// Enable memory for the agent
								</span>
							),
						},
						{
							lineNum: 12,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									memory = client.memory(&#123; userId:{" "}
									<span className="text-[#DC2626]">"user_123"</span> &#125;);
								</span>
							),
						},
						{ lineNum: 13, content: <span>&nbsp;</span> },
						{
							lineNum: 14,
							content: <span className="text-[#16A34A]">// Remember</span>,
						},
						{
							lineNum: 15,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">await</span>{" "}
									memory.store(&#123;
								</span>
							),
						},
						{
							lineNum: 16,
							content: (
								<span className="pl-6">
									content:{" "}
									<span className="text-[#DC2626]">
										"User prefers concise answers"
									</span>
								</span>
							),
						},
						{ lineNum: 17, content: <span>&#125;);</span> },
						{ lineNum: 18, content: <span>&nbsp;</span> },
						{
							lineNum: 19,
							content: <span className="text-[#16A34A]">// Recall</span>,
						},
						{
							lineNum: 20,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									context ={" "}
									<span className="text-[#2563EB] font-semibold">await</span>{" "}
									memory.search(&#123; query:{" "}
									<span className="text-[#DC2626]">"user preferences"</span>{" "}
									&#125;);
								</span>
							),
						},
						{ lineNum: 21, content: <span>&nbsp;</span> },
					],
				},
			},
		},
		agents: {
			id: "agents",
			tag: "//02",
			title: "AI AGENTS",
			subtitle:
				"Enable AI agents to remember accurately across every interaction and workflow.",
			code: {
				python: {
					raw: `from piyapi_memory import PiyAPI
from semantic_kernel import Kernel

# Credentials
piyapi = PiyAPI( api_key="PIYAPI_API_KEY" )

# Semantic Kernel
kernel = Kernel()

# PiyAPI GenAI Agents SDK
memory = piyapi.memory( user_id="user_123" )

# Agent actions
memory.store( "User prefers concise answers" )

context = memory.search( "user preferences" )

# AI Agent
agent_context = { "memory": context }`,
					lines: [
						{
							lineNum: 1,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									piyapi_memory{" "}
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									PiyAPI
								</span>
							),
						},
						{
							lineNum: 2,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									semantic_kernel{" "}
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									Kernel
								</span>
							),
						},
						{ lineNum: 3, content: <span>&nbsp;</span> },
						{
							lineNum: 4,
							content: <span className="text-[#16A34A]"># Credentials</span>,
						},
						{
							lineNum: 5,
							content: (
								<span>
									piyapi = PiyAPI( api_key=
									<span className="text-[#DC2626]">"PIYAPI_API_KEY"</span> )
								</span>
							),
						},
						{ lineNum: 6, content: <span>&nbsp;</span> },
						{
							lineNum: 7,
							content: (
								<span className="text-[#16A34A]"># Semantic Kernel</span>
							),
						},
						{ lineNum: 8, content: <span>kernel = Kernel()</span> },
						{ lineNum: 9, content: <span>&nbsp;</span> },
						{
							lineNum: 10,
							content: (
								<span className="text-[#16A34A]">
									# PiyAPI GenAI Agents SDK
								</span>
							),
						},
						{
							lineNum: 11,
							content: (
								<span>
									memory = piyapi.memory( user_id=
									<span className="text-[#DC2626]">"user_123"</span> )
								</span>
							),
						},
						{ lineNum: 12, content: <span>&nbsp;</span> },
						{
							lineNum: 13,
							content: <span className="text-[#16A34A]"># Agent actions</span>,
						},
						{
							lineNum: 14,
							content: (
								<span>
									memory.store({" "}
									<span className="text-[#DC2626]">
										"User prefers concise answers"
									</span>{" "}
									)
								</span>
							),
						},
						{ lineNum: 15, content: <span>&nbsp;</span> },
						{
							lineNum: 16,
							content: (
								<span>
									context = memory.search({" "}
									<span className="text-[#DC2626]">"user preferences"</span> )
								</span>
							),
						},
						{ lineNum: 17, content: <span>&nbsp;</span> },
						{
							lineNum: 18,
							content: <span className="text-[#16A34A]"># AI Agent</span>,
						},
						{
							lineNum: 19,
							content: (
								<span>
									agent_context = &#123;{" "}
									<span className="text-[#DC2626]">"memory"</span>: context
									&#125;
								</span>
							),
						},
						{ lineNum: 20, content: <span>&nbsp;</span> },
						{ lineNum: 21, content: <span>&nbsp;</span> },
					],
				},
				node: {
					raw: `import { PiyAPI } from "piyapi-memory";
import { Kernel } from "semantic-kernel";

// Credentials
const piyapi = new PiyAPI({ apiKey: "PIYAPI_API_KEY" });

// Semantic Kernel
const kernel = new Kernel();

// PiyAPI GenAI Agents SDK
const memory = piyapi.memory({ userId: "user_123" });

// Agent actions
await memory.store({ content: "User prefers concise answers" });

const context = await memory.search({ query: "user preferences" });

// AI Agent
const agentContext = { memory: context };`,
					lines: [
						{
							lineNum: 1,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									&#123; PiyAPI &#125;{" "}
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									<span className="text-[#DC2626]">"piyapi-memory"</span>;
								</span>
							),
						},
						{
							lineNum: 2,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									&#123; Kernel &#125;{" "}
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									<span className="text-[#DC2626]">"semantic-kernel"</span>;
								</span>
							),
						},
						{ lineNum: 3, content: <span>&nbsp;</span> },
						{
							lineNum: 4,
							content: <span className="text-[#16A34A]">// Credentials</span>,
						},
						{
							lineNum: 5,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									piyapi ={" "}
									<span className="text-[#2563EB] font-semibold">new</span>{" "}
									PiyAPI(&#123; apiKey:{" "}
									<span className="text-[#DC2626]">"PIYAPI_API_KEY"</span>{" "}
									&#125;);
								</span>
							),
						},
						{ lineNum: 6, content: <span>&nbsp;</span> },
						{
							lineNum: 7,
							content: (
								<span className="text-[#16A34A]">// Semantic Kernel</span>
							),
						},
						{
							lineNum: 8,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									kernel ={" "}
									<span className="text-[#2563EB] font-semibold">new</span>{" "}
									Kernel();
								</span>
							),
						},
						{ lineNum: 9, content: <span>&nbsp;</span> },
						{
							lineNum: 10,
							content: (
								<span className="text-[#16A34A]">
									// PiyAPI GenAI Agents SDK
								</span>
							),
						},
						{
							lineNum: 11,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									memory = piyapi.memory(&#123; userId:{" "}
									<span className="text-[#DC2626]">"user_123"</span> &#125;);
								</span>
							),
						},
						{ lineNum: 12, content: <span>&nbsp;</span> },
						{
							lineNum: 13,
							content: <span className="text-[#16A34A]">// Agent actions</span>,
						},
						{
							lineNum: 14,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">await</span>{" "}
									memory.store(&#123; content:{" "}
									<span className="text-[#DC2626]">
										"User prefers concise answers"
									</span>{" "}
									&#125;);
								</span>
							),
						},
						{ lineNum: 15, content: <span>&nbsp;</span> },
						{
							lineNum: 16,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									context ={" "}
									<span className="text-[#2563EB] font-semibold">await</span>{" "}
									memory.search(&#123; query:{" "}
									<span className="text-[#DC2626]">"user preferences"</span>{" "}
									&#125;);
								</span>
							),
						},
						{ lineNum: 17, content: <span>&nbsp;</span> },
						{
							lineNum: 18,
							content: <span className="text-[#16A34A]">// AI Agent</span>,
						},
						{
							lineNum: 19,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									agentContext = &#123; memory: context &#125;;
								</span>
							),
						},
						{ lineNum: 20, content: <span>&nbsp;</span> },
						{ lineNum: 21, content: <span>&nbsp;</span> },
					],
				},
			},
		},
		connectors: {
			id: "connectors",
			tag: "//03",
			title: "CONNECTORS",
			subtitle: "One source of truth. Every application. Every model.",
			code: {
				python: {
					raw: `from piyapi_memory import PiyAPI
from semantic_kernel import Kernel

piyapi = PiyAPI( api_key="PIYAPI_API_KEY" )
kernel = Kernel()
memory = piyapi.memory( user_id="user_123" )

class Connector:
    def fetch(self):
        return { "source": "gmail", "content": "User prefers concise answers" }

connector = Connector()
data = connector.fetch()

memory.store( data )

context = memory.search( "user preferences" )
agent_context = { "memory": context }

print( agent_context )`,
					lines: [
						{
							lineNum: 1,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									piyapi_memory{" "}
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									PiyAPI
								</span>
							),
						},
						{
							lineNum: 2,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									semantic_kernel{" "}
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									Kernel
								</span>
							),
						},
						{ lineNum: 3, content: <span>&nbsp;</span> },
						{
							lineNum: 4,
							content: (
								<span>
									piyapi = PiyAPI( api_key=
									<span className="text-[#DC2626]">"PIYAPI_API_KEY"</span> )
								</span>
							),
						},
						{ lineNum: 5, content: <span>kernel = Kernel()</span> },
						{
							lineNum: 6,
							content: (
								<span>
									memory = piyapi.memory( user_id=
									<span className="text-[#DC2626]">"user_123"</span> )
								</span>
							),
						},
						{ lineNum: 7, content: <span>&nbsp;</span> },
						{
							lineNum: 8,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">class</span>{" "}
									Connector:
								</span>
							),
						},
						{
							lineNum: 9,
							content: (
								<span className="pl-6">
									<span className="text-[#2563EB] font-semibold">def</span>{" "}
									fetch(self):
								</span>
							),
						},
						{
							lineNum: 10,
							content: (
								<span className="pl-12">
									<span className="text-[#2563EB] font-semibold">return</span>{" "}
									&#123; <span className="text-[#DC2626]">"source"</span>:{" "}
									<span className="text-[#DC2626]">"gmail"</span>,{" "}
									<span className="text-[#DC2626]">"content"</span>:{" "}
									<span className="text-[#DC2626]">
										"User prefers concise answers"
									</span>{" "}
									&#125;
								</span>
							),
						},
						{ lineNum: 11, content: <span>&nbsp;</span> },
						{ lineNum: 12, content: <span>connector = Connector()</span> },
						{ lineNum: 13, content: <span>data = connector.fetch()</span> },
						{ lineNum: 14, content: <span>&nbsp;</span> },
						{ lineNum: 15, content: <span>memory.store( data )</span> },
						{ lineNum: 16, content: <span>&nbsp;</span> },
						{
							lineNum: 17,
							content: (
								<span>
									context = memory.search({" "}
									<span className="text-[#DC2626]">"user preferences"</span> )
								</span>
							),
						},
						{
							lineNum: 18,
							content: (
								<span>
									agent_context = &#123;{" "}
									<span className="text-[#DC2626]">"memory"</span>: context
									&#125;
								</span>
							),
						},
						{ lineNum: 19, content: <span>&nbsp;</span> },
						{ lineNum: 20, content: <span>print( agent_context )</span> },
						{ lineNum: 21, content: <span>&nbsp;</span> },
					],
				},
				node: {
					raw: `import { PiyAPI } from "piyapi-memory";
import { Kernel } from "semantic-kernel";

const piyapi = new PiyAPI({ apiKey: "PIYAPI_API_KEY" });
const kernel = new Kernel();
const memory = piyapi.memory({ userId: "user_123" });

class Connector {
    fetch() {
        return { source: "gmail", content: "User prefers concise answers" };
    }
}

const connector = new Connector();
const data = connector.fetch();

await memory.store(data);

const context = await memory.search({ query: "user preferences" });
const agentContext = { memory: context };

console.log(agentContext);`,
					lines: [
						{
							lineNum: 1,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									&#123; PiyAPI &#125;{" "}
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									<span className="text-[#DC2626]">"piyapi-memory"</span>;
								</span>
							),
						},
						{
							lineNum: 2,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									&#123; Kernel &#125;{" "}
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									<span className="text-[#DC2626]">"semantic-kernel"</span>;
								</span>
							),
						},
						{ lineNum: 3, content: <span>&nbsp;</span> },
						{
							lineNum: 4,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									piyapi ={" "}
									<span className="text-[#2563EB] font-semibold">new</span>{" "}
									PiyAPI(&#123; apiKey:{" "}
									<span className="text-[#DC2626]">"PIYAPI_API_KEY"</span>{" "}
									&#125;);
								</span>
							),
						},
						{
							lineNum: 5,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									kernel ={" "}
									<span className="text-[#2563EB] font-semibold">new</span>{" "}
									Kernel();
								</span>
							),
						},
						{
							lineNum: 6,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									memory = piyapi.memory(&#123; userId:{" "}
									<span className="text-[#DC2626]">"user_123"</span> &#125;);
								</span>
							),
						},
						{ lineNum: 7, content: <span>&nbsp;</span> },
						{
							lineNum: 8,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">class</span>{" "}
									Connector &#123;
								</span>
							),
						},
						{
							lineNum: 9,
							content: <span className="pl-6">fetch() &#123;</span>,
						},
						{
							lineNum: 10,
							content: (
								<span className="pl-12">
									<span className="text-[#2563EB] font-semibold">return</span>{" "}
									&#123; source: <span className="text-[#DC2626]">"gmail"</span>
									, content:{" "}
									<span className="text-[#DC2626]">
										"User prefers concise answers"
									</span>{" "}
									&#125;;
								</span>
							),
						},
						{ lineNum: 11, content: <span className="pl-6">&#125;</span> },
						{ lineNum: 12, content: <span>&#125;</span> },
						{ lineNum: 13, content: <span>&nbsp;</span> },
						{
							lineNum: 14,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									connector ={" "}
									<span className="text-[#2563EB] font-semibold">new</span>{" "}
									Connector();
								</span>
							),
						},
						{
							lineNum: 15,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									data = connector.fetch();
								</span>
							),
						},
						{ lineNum: 16, content: <span>&nbsp;</span> },
						{
							lineNum: 17,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">await</span>{" "}
									memory.store(data);
								</span>
							),
						},
						{ lineNum: 18, content: <span>&nbsp;</span> },
						{
							lineNum: 19,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									context ={" "}
									<span className="text-[#2563EB] font-semibold">await</span>{" "}
									memory.search(&#123; query:{" "}
									<span className="text-[#DC2626]">"user preferences"</span>{" "}
									&#125;);
								</span>
							),
						},
						{
							lineNum: 20,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									agentContext = &#123; memory: context &#125;;
								</span>
							),
						},
						{ lineNum: 21, content: <span>console.log(agentContext);</span> },
					],
				},
			},
		},
		mcp: {
			id: "mcp",
			tag: "//04",
			title: "MCP",
			subtitle:
				"Enable coding assistants to remember projects, conversations, and decisions across sessions",
			code: {
				python: {
					raw: `from piyapi_memory import PiyAPI
from semantic_kernel import Kernel

piyapi = PiyAPI( api_key="PIYAPI_API_KEY" )
kernel = Kernel()
memory = piyapi.memory( user_id="user_123" )

class MCPMemoryServer:
    def handle_context(self):
        return { "source": "cursor_ide", "content": "User prefers concise answers" }

server = MCPMemoryServer()
data = server.handle_context()

memory.store( data )

context = memory.search( "user preferences" )
agent_context = { "memory": context }

print( agent_context )`,
					lines: [
						{
							lineNum: 1,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									piyapi_memory{" "}
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									PiyAPI
								</span>
							),
						},
						{
							lineNum: 2,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									semantic_kernel{" "}
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									Kernel
								</span>
							),
						},
						{ lineNum: 3, content: <span>&nbsp;</span> },
						{
							lineNum: 4,
							content: (
								<span>
									piyapi = PiyAPI( api_key=
									<span className="text-[#DC2626]">"PIYAPI_API_KEY"</span> )
								</span>
							),
						},
						{ lineNum: 5, content: <span>kernel = Kernel()</span> },
						{
							lineNum: 6,
							content: (
								<span>
									memory = piyapi.memory( user_id=
									<span className="text-[#DC2626]">"user_123"</span> )
								</span>
							),
						},
						{ lineNum: 7, content: <span>&nbsp;</span> },
						{
							lineNum: 8,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">class</span>{" "}
									MCPMemoryServer:
								</span>
							),
						},
						{
							lineNum: 9,
							content: (
								<span className="pl-6">
									<span className="text-[#2563EB] font-semibold">def</span>{" "}
									handle_context(self):
								</span>
							),
						},
						{
							lineNum: 10,
							content: (
								<span className="pl-12">
									<span className="text-[#2563EB] font-semibold">return</span>{" "}
									&#123; <span className="text-[#DC2626]">"source"</span>:{" "}
									<span className="text-[#DC2626]">"cursor_ide"</span>,{" "}
									<span className="text-[#DC2626]">"content"</span>:{" "}
									<span className="text-[#DC2626]">
										"User prefers concise answers"
									</span>{" "}
									&#125;
								</span>
							),
						},
						{ lineNum: 11, content: <span>&nbsp;</span> },
						{ lineNum: 12, content: <span>server = MCPMemoryServer()</span> },
						{
							lineNum: 13,
							content: <span>data = server.handle_context()</span>,
						},
						{ lineNum: 14, content: <span>&nbsp;</span> },
						{ lineNum: 15, content: <span>memory.store( data )</span> },
						{ lineNum: 16, content: <span>&nbsp;</span> },
						{
							lineNum: 17,
							content: (
								<span>
									context = memory.search({" "}
									<span className="text-[#DC2626]">"user preferences"</span> )
								</span>
							),
						},
						{
							lineNum: 18,
							content: (
								<span>
									agent_context = &#123;{" "}
									<span className="text-[#DC2626]">"memory"</span>: context
									&#125;
								</span>
							),
						},
						{ lineNum: 19, content: <span>&nbsp;</span> },
						{ lineNum: 20, content: <span>print( agent_context )</span> },
						{ lineNum: 21, content: <span>&nbsp;</span> },
					],
				},
				node: {
					raw: `import { PiyAPI } from "piyapi-memory";
import { Kernel } from "semantic-kernel";

const piyapi = new PiyAPI({ apiKey: "PIYAPI_API_KEY" });
const kernel = new Kernel();
const memory = piyapi.memory({ userId: "user_123" });

class MCPMemoryServer {
    handleContext() {
        return { source: "cursor_ide", content: "User prefers concise answers" };
    }
}

const server = new MCPMemoryServer();
const data = server.handleContext();

await memory.store(data);

const context = await memory.search({ query: "user preferences" });
const agentContext = { memory: context };

console.log(agentContext);`,
					lines: [
						{
							lineNum: 1,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									&#123; PiyAPI &#125;{" "}
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									<span className="text-[#DC2626]">"piyapi-memory"</span>;
								</span>
							),
						},
						{
							lineNum: 2,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">import</span>{" "}
									&#123; Kernel &#125;{" "}
									<span className="text-[#2563EB] font-semibold">from</span>{" "}
									<span className="text-[#DC2626]">"semantic-kernel"</span>;
								</span>
							),
						},
						{ lineNum: 3, content: <span>&nbsp;</span> },
						{
							lineNum: 4,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									piyapi ={" "}
									<span className="text-[#2563EB] font-semibold">new</span>{" "}
									PiyAPI(&#123; apiKey:{" "}
									<span className="text-[#DC2626]">"PIYAPI_API_KEY"</span>{" "}
									&#125;);
								</span>
							),
						},
						{
							lineNum: 5,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									kernel ={" "}
									<span className="text-[#2563EB] font-semibold">new</span>{" "}
									Kernel();
								</span>
							),
						},
						{
							lineNum: 6,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									memory = piyapi.memory(&#123; userId:{" "}
									<span className="text-[#DC2626]">"user_123"</span> &#125;);
								</span>
							),
						},
						{ lineNum: 7, content: <span>&nbsp;</span> },
						{
							lineNum: 8,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">class</span>{" "}
									MCPMemoryServer &#123;
								</span>
							),
						},
						{
							lineNum: 9,
							content: <span className="pl-6">handleContext() &#123;</span>,
						},
						{
							lineNum: 10,
							content: (
								<span className="pl-12">
									<span className="text-[#2563EB] font-semibold">return</span>{" "}
									&#123; source:{" "}
									<span className="text-[#DC2626]">"cursor_ide"</span>, content:{" "}
									<span className="text-[#DC2626]">
										"User prefers concise answers"
									</span>{" "}
									&#125;;
								</span>
							),
						},
						{ lineNum: 11, content: <span className="pl-6">&#125;</span> },
						{ lineNum: 12, content: <span>&#125;</span> },
						{ lineNum: 13, content: <span>&nbsp;</span> },
						{
							lineNum: 14,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									server ={" "}
									<span className="text-[#2563EB] font-semibold">new</span>{" "}
									MCPMemoryServer();
								</span>
							),
						},
						{
							lineNum: 15,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									data = server.handleContext();
								</span>
							),
						},
						{ lineNum: 16, content: <span>&nbsp;</span> },
						{
							lineNum: 17,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">await</span>{" "}
									memory.store(data);
								</span>
							),
						},
						{ lineNum: 18, content: <span>&nbsp;</span> },
						{
							lineNum: 19,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									context ={" "}
									<span className="text-[#2563EB] font-semibold">await</span>{" "}
									memory.search(&#123; query:{" "}
									<span className="text-[#DC2626]">"user preferences"</span>{" "}
									&#125;);
								</span>
							),
						},
						{
							lineNum: 20,
							content: (
								<span>
									<span className="text-[#2563EB] font-semibold">const</span>{" "}
									agentContext = &#123; memory: context &#125;;
								</span>
							),
						},
						{ lineNum: 21, content: <span>console.log(agentContext);</span> },
					],
				},
			},
		},
	}

	const activeCategoryData = CATEGORIES[activeCategory]
	const currentCode = activeCategoryData.code[activeLang]

	const handleCopy = () => {
		navigator.clipboard.writeText(currentCode.raw)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const categoryKeys: CategoryType[] = ["sdk", "agents", "connectors", "mcp"]

	return (
		<section className="w-full bg-white pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-20 flex flex-col justify-center items-center font-['DM_Sans',sans-serif]">
			{/* Universal Margin Container */}
			<div className="container-universal flex flex-col items-center">
				{/* Section Header - Perfectly centered between workflows above and sandbox below */}
				<div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
					<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F1123] tracking-[-0.03em] leading-[1.15]">
						Integrate <span className="text-[#765DFB]">Piyapi</span> where your AI already lives.
					</h2>
				</div>

				{/* Outer Container */}
				<div className="w-full max-w-[1366px] rounded-[18px] bg-white border border-[#2D2A54]/30 shadow-[0_12px_40px_rgba(15,46,92,0.04)] overflow-hidden flex flex-col lg:flex-row min-h-[634px] mx-auto">
					{/* Category Sidebar */}
					<div className="w-full lg:w-[320px] shrink-0 border-b lg:border-b-0 lg:border-r border-[#2D2A54]/30 bg-white flex flex-col justify-start">
						{categoryKeys.map((catKey, index) => {
							const cat = CATEGORIES[catKey]
							const isActive = activeCategory === catKey
							return (
								<button
									key={cat.id}
									type="button"
									onClick={() => setActiveCategory(catKey)}
									className={`w-full text-left p-6 sm:p-7 border-b border-[#2D2A54]/30 transition-all duration-200 cursor-pointer ${
										isActive
											? `bg-[#37338C] text-white shadow-sm ${index === 0 ? "lg:rounded-tl-[16px]" : ""}`
											: "bg-transparent hover:bg-black/[0.03] text-[#0B1015]"
									}`}
								>
									<div className="flex items-baseline gap-1.5 font-normal">
										<span
											className={`font-mono text-xs font-normal ${
												isActive ? "text-white/70" : "text-[#888E94]"
											}`}
										>
											{cat.tag}
										</span>
										<span
											className={`text-[17.6px] font-normal font-['DM_Sans',sans-serif] tracking-normal ${
												isActive ? "text-white" : "text-[#0B1015]"
											}`}
										>
											{cat.title}
										</span>
									</div>
									{isActive && (
										<p className="text-white/80 text-xs sm:text-[13px] mt-2 leading-relaxed font-normal">
											{cat.subtitle}
										</p>
									)}
								</button>
							)
						})}

						<div className="flex-1 bg-white" />
					</div>

					{/* Code Window */}
					<div className="flex-1 min-w-0 w-full bg-white p-3.5 sm:p-8 lg:p-10 flex items-center justify-center">
						<div className="w-full max-w-[940px] rounded-[16px] bg-white border border-[#2D2A54]/30 shadow-[0_12px_36px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col transition-all duration-200">
							{/* Window Top Header Bar with Border Divider */}
							<div className="h-[48px] px-5 sm:px-6 bg-white border-b border-[#2D2A54]/30 flex items-center justify-between">
								{/* 3 Mac Window Control Dots */}
								<div className="flex items-center gap-2">
									<div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
									<div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
									<div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
								</div>

								{/* Right Header Area: Language Switcher & Copy */}
								<div className="flex items-center gap-3">
									{/* Language Selector */}
									<div className="flex items-center bg-[#F0EFF7] p-0.5 rounded-lg text-xs font-bold text-[#0B1015] border border-[#2D2A54]/15">
										{/* Python Option */}
										<button
											type="button"
											onClick={() => setActiveLang("python")}
											className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
												activeLang === "python"
													? "bg-white text-[#0B1015] shadow-xs"
													: "text-[#6B7280] hover:text-[#0B1015]"
											}`}
										>
											{/* Python Logo Icon */}
											<svg
												className="w-3.5 h-3.5"
												viewBox="0 0 24 24"
												fill="currentColor"
											>
												<path
													d="M11.914 0C5.789 0 6.166 2.664 6.166 2.664l.006 2.76h5.84v.828H3.816S0 5.794 0 11.922c0 6.13 3.33 5.918 3.33 5.918h1.988v-2.798s-.108-3.33 3.27-3.33h5.61v-.846h-5.61s-2.54-.036-2.54-2.52c0-2.484 2.18-2.484 2.18-2.484h7.68s3.064.036 3.064-3.018c0-3.054-3.064-2.514-3.064-2.514zm-3.09 1.636a.91.91 0 1 1 0 1.818.91.91 0 0 1 0-1.818z"
													fill="#3776AB"
												/>
												<path
													d="M12.086 24c6.125 0 5.748-2.664 5.748-2.664l-.006-2.76h-5.84v-.828h8.196s3.816.458 3.816-5.67c0-6.13-3.33-5.918-3.33-5.918h-1.988v2.798s.108 3.33-3.27 3.33h-5.61v.846h5.61s2.54.036 2.54 2.52c0 2.484-2.18 2.484-2.18 2.484h-7.68s-3.064-.036-3.064 3.018c0 3.054 3.064 2.514 3.064 2.514zm3.09-1.636a.91.91 0 1 1 0-1.818.91.91 0 0 1 0 1.818z"
													fill="#FFD43B"
												/>
											</svg>
											<span>PYTHON</span>
										</button>

										{/* Node.js Option */}
										<button
											type="button"
											onClick={() => setActiveLang("node")}
											className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
												activeLang === "node"
													? "bg-white text-[#0B1015] shadow-xs"
													: "text-[#6B7280] hover:text-[#0B1015]"
											}`}
										>
											{/* Node.js Logo Icon */}
											<svg
												className="w-3.5 h-3.5 text-[#5FA04E]"
												viewBox="0 0 24 24"
												fill="currentColor"
											>
												<path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.077 17.653c-2.83 0-4.323-1.428-4.323-3.834 0-2.428 1.493-3.856 4.323-3.856 2.852 0 4.345 1.428 4.345 3.856 0 2.406-1.493 3.834-4.345 3.834z" />
											</svg>
											<span>NODE JS</span>
										</button>
									</div>

									{/* Copy Code Button */}
									<button
										type="button"
										onClick={handleCopy}
										className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F4F3FA] hover:bg-[#EBE9F5] text-[#5A5D7A] hover:text-[#0B1015] text-[11px] font-medium border border-[#2D2A54]/15 transition-colors cursor-pointer"
										title="Copy to clipboard"
									>
										{copied ? (
											<>
												<Check className="w-3 h-3 text-emerald-600" />
												<span className="text-emerald-600 font-semibold">
													Copied
												</span>
											</>
										) : (
											<>
												<Copy className="w-3 h-3" />
												<span>Copy</span>
											</>
										)}
									</button>
								</div>
							</div>

							{/* Code View Body with Line Numbers */}
							<div className="p-5 sm:p-7 overflow-x-auto bg-white">
								<div className="font-mono text-xs sm:text-[13px] leading-[1.65] flex">
									{/* Gutter / Line Numbers */}
									<div className="select-none text-[#9CA3AF] text-right pr-5 sm:pr-7 shrink-0 flex flex-col font-mono text-xs sm:text-[13px]">
										{currentCode.lines.map((l) => (
											<span
												key={l.lineNum}
												className="h-[21.5px] leading-[21.5px]"
											>
												{l.lineNum}
											</span>
										))}
									</div>

									{/* Syntax Highlighted Code Lines */}
									<div className="flex-1 overflow-x-auto text-[#111827] flex flex-col font-mono text-xs sm:text-[13px] whitespace-pre">
										{currentCode.lines.map((l) => (
											<div
												key={l.lineNum}
												className="h-[21.5px] leading-[21.5px]"
											>
												{l.content}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
