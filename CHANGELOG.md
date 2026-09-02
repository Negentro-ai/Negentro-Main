# Changelog

All notable changes to the Piyapi SDK are documented here.  
Format: [Keep a Changelog](https://keepachangelog.com/) · [Semantic Versioning](https://semver.org/)

## [Unreleased]

## [0.1.0] — 2026-08-19

### Added
- Initial SDK release (TypeScript + Python)
- Core memory operations: store, retrieve, update, delete, merge, summarize, pin, verify
- Hybrid search (vector + BM25, tunable alpha blending)
- Cognitive RAG with auto-citations
- Bitemporal knowledge graph (PiyGraph) with time-travel queries
- Speculative memory branching: create, diff, merge
- MCP server (`@piyapi/mcp-server`) with 40+ tools, 3 resources, 3 prompts
- 12 data connectors with real-time CDC webhooks
- LangChain adapter (`piyapi-langchain`)

### Notes
- The core Piyapi cognitive engine, PiyGraph, bitemporal store, and inference infrastructure are proprietary and not included in this release. The SDK is the public API client.
