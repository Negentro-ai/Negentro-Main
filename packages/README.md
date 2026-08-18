# @piyapi/sdk

TypeScript SDK for PiyAPI — the cognitive memory engine for AI.

## Installation

```bash
npm install @piyapi/sdk
# or
bun add @piyapi/sdk
```

## Quick Start

```typescript
import { PiyAPI } from "@piyapi/sdk"

const client = new PiyAPI({
  apiKey: "sk_live_...",
})

// Store a memory
await client.memories.store({
  content: "User prefers dark mode UI",
  tags: ["preferences"],
})

// Hybrid search
const results = await client.search({
  query: "UI preferences",
  limit: 5,
})

// Cognitive RAG
const answer = await client.ask({
  query: "What are the user preferences?",
})
```

## Documentation

Full API reference → [piyapi.cloud/docs](https://piyapi.cloud/docs)
