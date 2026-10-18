---
name: negentro
description: Use when building AI agents and applications that need persistent memory, context retrieval, and bitemporal reasoning across sessions. Reach for this skill when implementing memory-powered workflows, configuring hybrid search, integrating with agent frameworks, or deploying memory infrastructure.
metadata:
  mintlify-proj: negentro
  version: "1.0"
---

# Negentro (PiyAPI) Skill

## Product Summary

Negentro (PiyAPI) is a persistent memory and context platform for AI applications. It separates memory management from application logic, enabling agents to store facts, preferences, and context as tagged records and retrieve them via hybrid search (dense vector HNSW + BM25 trigrams) when needed. Agents use PiyAPI to build stateful AI systems that maintain context across conversations, sessions, and workflows.

**Key files & commands:**
- TypeScript SDK: `@piyapi/sdk`
- Python SDK: `piyapi-memory`
- MCP Server: `npx -y @piyapi/mcp-server`
- API Base: `https://api.piyapi.cloud/api/v1`
- Documentation: `https://docs.negentro.tech`

## When to Use

- **Building stateful agents**: Remember user preferences, past interactions, or project context across sessions.
- **Implementing memory workflows**: Storing and retrieving conversational facts, preferences, or structured context.
- **Configuring hybrid search**: Semantic vector search combined with keyword BM25 retrieval, reranked with UnifiedScorer.
- **Integrating with frameworks**: Connect to LangChain, CrewAI, LlamaIndex, AutoGen, or Vercel AI SDK.
- **IDE & Agent Plugins**: Connect directly via MCP to Cursor, Windsurf, or Claude Code.

## Quick Reference: Core API Operations

| Method | Endpoint | Purpose |
| :--- | :--- | :--- |
| `POST` | `/v1/memories` | Create and store a new memory record |
| `POST` | `/v1/memories/search` | Hybrid search (vector + BM25) across stored memories |
| `PATCH` | `/v1/memories/:id` | Update existing memory content or metadata |
| `DELETE` | `/v1/memories/:id` | Remove a specific memory |
| `POST` | `/v1/context/retrieve` | Assemble token-budget-aware context for LLM prompts |

## SDK Initialization

### TypeScript (`@piyapi/sdk`)
```typescript
import { PiyApi } from '@piyapi/sdk';

const client = new PiyApi({
  apiKey: process.env.PIYAPI_API_KEY!,
});

// Store a persistent memory
await client.memory.add({
  content: 'User prefers dark mode and concise TypeScript examples',
  userId: 'user_1029',
  tags: ['preference', 'ui'],
});

// Retrieve context for a prompt
const context = await client.context.retrieve({
  query: 'How should I format this component?',
  userId: 'user_1029',
  maxTokens: 1000,
});
```

### Python (`piyapi-memory`)
```python
from piyapi import PiyApi

client = PiyApi(api_key=os.environ["PIYAPI_API_KEY"])

# Add memory
client.memory.add(
    content="User prefers dark mode and concise TypeScript examples",
    user_id="user_1029",
    tags=["preference", "ui"]
)

# Search memories
results = client.memory.search(
    query="ui preference",
    user_id="user_1029",
    limit=5
)
```
