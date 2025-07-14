# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Running the Agent
```bash
# Start the main agent application
npm start
# or
npx tsx index.ts
# or with bun
bun run index.ts
```

### RAG Data Ingestion
```bash
# Ingest movie data for RAG system
npm run ingest
```

### Running Evaluations
```bash
# Run evaluation experiments
npm run eval <experiment-name>
```

### Dashboard Development
```bash
cd dashboard
# Start development server
npm run dev
# Build for production
npm run build
# Run linting
npm run lint
```

## Architecture Overview

This is an AI agent application built for a Frontend Masters workshop. The system consists of three main components:

### 1. Core Agent System (`/src`)
- **agent.ts**: Main conversation loop and message handling. Implements tool calling, approval flows, and conversation management.
- **llm.ts**: OpenAI API integration layer for chat completions and embeddings.
- **memory.ts**: Conversation persistence using LowDB (JSON file storage at `db.json`).
- **toolRunner.ts**: Framework for executing agent tools with schema validation.
- **tools/**: Individual tool implementations (dad jokes, image generation, Reddit, movie search).

### 2. RAG System (`/src/rag`)
- Uses Upstash Vector database for movie search functionality.
- **ingest.ts**: Processes `imdb_movie_dataset.csv` and creates embeddings.
- **query.ts**: Handles semantic search queries against the movie database.

### 3. Evaluation Framework (`/evals`)
- **run.ts**: Main evaluation runner that executes experiments and generates results.
- **scorers.ts**: Scoring functions for evaluating agent responses.
- **experiments/**: Individual test scenarios for the agent.

## Key Technical Details

- **TypeScript**: Strict mode enabled, ESNext target
- **Environment Variables**: Requires `OPENAI_API_KEY` in `.env` file
- **Node.js 20+** or **Bun v1.0.20+** required
- **Tool Approval**: Image generation requires user approval before execution
- **Message Format**: Uses OpenAI's chat completion format with tool calling support

## Workshop Structure

The repository uses git branches for workshop progression:
- `main`: Final complete application
- `step/1` through `step/N`: Progressive workshop steps

When implementing new features or fixing issues, ensure compatibility with the existing tool framework and maintain TypeScript strict mode compliance.