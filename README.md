# Agents in Production

A production-ready AI agent implementation showcasing best practices for building, evaluating, and deploying conversational AI systems. This educational codebase introduces advanced patterns including Human-in-the-Loop approval flows, RAG (Retrieval-Augmented Generation), type-safe tool calling, and comprehensive evaluation frameworks.

- Watch the workshop on [Frontend Masters](https://frontendmasters.com/workshops/build-ai-agent/).
- View the [course notes](https://clumsy-humor-894.notion.site/Agent-from-scratch-13554fed51a380749554c44aa8989406?pvs=4)

## Key Production Features

### 🔒 Human-in-the-Loop (HITL)
The agent implements approval workflows for sensitive operations. For example, image generation requires explicit user consent before execution, preventing unauthorized or costly API calls.

### 📚 RAG Architecture
Production-ready Retrieval-Augmented Generation system for semantic search over a movie database:
- Vector embeddings using OpenAI's embedding models
- Upstash Vector database for scalable similarity search
- Efficient ingestion pipeline for large datasets

### 📊 Evaluation Framework
Comprehensive testing and evaluation system to ensure agent reliability:
- Automated evaluation experiments
- Performance scoring and metrics
- Visual dashboard for analyzing results
- Reproducible test scenarios

## CLI Usage

### Basic Commands

```bash
# Start interactive mode
npm start

# Run with a specific message
npm start "Tell me a dad joke"

# Alternative with bun
bun run index.ts "Find action movies from the 90s"
```

### CLI Features
- **Interactive Mode**: Start without arguments for a continuous conversation
- **Single Command**: Pass your message as an argument for one-shot interactions
- **Visual Feedback**: Loading spinners show when tools are being executed
- **Clear Tool Indication**: See which tools the agent is using in real-time
- **Approval Prompts**: Get asked for confirmation on sensitive operations

### Available Commands

```bash
# Core agent commands
npm start                 # Start the conversational agent
npm run ingest           # Ingest movie data for RAG system
npm run eval <name>      # Run evaluation experiments

# Dashboard commands (in dashboard/ directory)
npm run dev              # Start development server
npm run build            # Build for production
npm run lint             # Run code linting
```

## Agent Capabilities

The agent provides four main tools:

### 🎭 **Dad Jokes** - `dad_joke`
```bash
> Tell me a dad joke
> I need something funny
```

### 🎨 **Image Generation** - `generate_image` 
```bash
> Generate an image of a cyberpunk city
> Create a picture of a peaceful mountain lake
```
⚠️ **Requires approval**: The agent will ask for your confirmation before generating images

### 📱 **Reddit Browser** - `reddit`
```bash
> What's trending on Reddit?
> Show me the latest posts
```

### 🎬 **Movie Search** - `movieSearch`
```bash
> Find me some horror movies
> Movies directed by Quentin Tarantino
> Romantic comedies from 2010
```

## Setup Instructions

### Prerequisites

- **Node.js version 20+** or **bun v1.0.20**
- An [OpenAI API Key](https://platform.openai.com/settings/organization/api-keys)

### Installation

```bash
git clone https://github.com/Hendrixer/agent-from-scratch.git
cd agents-production
npm install # or bun install
```

### Configuration

Create a `.env` file in the root directory:

```
OPENAI_API_KEY='YOUR_API_KEY'
```

### Initial Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up RAG database (required for movie search)
npm run ingest

# 3. Start the agent
npm start
```

## Production Architecture

### Core Components

```
├── src/
│   ├── agent.ts         # Main conversation loop with HITL flows
│   ├── llm.ts          # LLM abstraction layer
│   ├── memory.ts       # Conversation persistence
│   ├── toolRunner.ts   # Tool execution with validation
│   ├── tools/          # Modular tool implementations
│   └── rag/            # RAG system components
│       ├── ingest.ts   # Data ingestion pipeline
│       └── query.ts    # Semantic search implementation
```

### Human-in-the-Loop Implementation

The agent implements approval workflows in `agent.ts`:
- Detects when sensitive tools are called
- Prompts user for confirmation
- Proceeds only with explicit approval
- Logs all approval decisions

Example flow:
```typescript
// When image generation is requested:
1. Agent recognizes intent
2. Prepares tool call
3. Asks: "I'll generate an image of [description]. Do you approve?"
4. Waits for user confirmation
5. Executes only if approved
```

### RAG System Architecture

The movie search demonstrates production RAG patterns:

1. **Data Ingestion** (`npm run ingest`):
   - Processes CSV data
   - Generates embeddings for each movie
   - Stores in vector database
   - Handles batching and rate limiting

2. **Query Processing**:
   - Converts user query to embeddings
   - Performs similarity search
   - Applies filters (genre, director)
   - Returns ranked results

### Evaluation System

Run comprehensive evaluations to ensure production readiness:

```bash
# Run a specific evaluation
npm run eval tool_selection

# View results in the dashboard
cd dashboard && npm run dev
```

The evaluation framework (`evals/`) includes:
- Tool selection accuracy tests
- Response quality metrics
- Performance benchmarks
- Edge case scenarios

## Monitoring & Analytics

The dashboard provides insights into:
- Tool usage patterns
- Evaluation scores over time
- Response latency metrics
- Error rates and types

Access at `http://localhost:5173` after running `npm run dev` in the dashboard directory.

## Learning from This Codebase

This repository demonstrates several advanced patterns that are essential for production AI applications:

### 🎯 Type-Safe Tool Calling with Zod

**What it is**: The codebase uses Zod schemas to define tool parameters, providing both runtime validation and TypeScript type inference.

**Where to find it**: Check `src/tools/movieSearch.ts` to see how the schema:
- Defines required and optional parameters
- Provides descriptions for the LLM to understand
- Automatically generates TypeScript types

**Why it matters**: In production, you need guarantees that the LLM is calling tools with valid parameters. Zod ensures this at runtime while TypeScript catches errors during development.

**Try it out**:
```bash
npm start "Find me action movies directed by Michael Bay"
# Watch how the parameters are validated before the tool executes
```

### 🔄 Smart Conversation Memory Management

**What it is**: The agent maintains conversation history with automatic summarization to prevent token limit issues.

**Where to find it**: Look at `src/memory.ts` and watch `db.json` during conversations.

**Why it matters**: Production agents need to handle long conversations without hitting token limits or losing context. This implementation shows how to:
- Keep recent messages in full detail
- Summarize older messages to preserve context
- Persist conversations for later analysis

**Try it out**:
```bash
# Have a long conversation
npm start
# Keep chatting until you see "Summarizing conversation..." 
# Then check db.json to see how older messages were compressed
```

### 🧪 Comprehensive Evaluation Framework

**What it is**: A testing system specifically designed for AI agents, not just unit tests.

**Where to find it**: Explore `evals/` directory and run existing evaluations.

**Why it matters**: AI agents are non-deterministic. Traditional testing isn't enough. This framework shows how to:
- Test tool selection accuracy
- Measure response quality
- Track performance over time
- Compare different prompts or models

**Try it out**:
```bash
# Run the tool selection evaluation
npm run eval tool_selection

# View results in the dashboard
cd dashboard && npm run dev
# Open http://localhost:5173 to see performance metrics
```

### 🔍 Production RAG Implementation

**What it is**: A complete RAG system using vector embeddings for semantic search.

**Where to find it**: See `src/rag/ingest.ts` for data processing and `src/rag/query.ts` for search.

**Why it matters**: RAG is essential for grounding AI responses in real data. This implementation demonstrates:
- Efficient batch processing of embeddings
- Semantic search with natural language
- Integration with the agent's tool system

**Try it out**:
```bash
# First, ingest the movie data
npm run ingest

# Then search for movies semantically
npm start "I want to watch something like The Matrix"
# Notice how it finds similar sci-fi movies even without exact matches
```

### 🛡️ Human-in-the-Loop Approval Flows

**What it is**: The agent asks for permission before executing expensive or sensitive operations.

**Where to find it**: See the image generation flow in `src/agent.ts` (search for "needsApproval").

**Why it matters**: Production agents need safeguards. This pattern shows how to:
- Identify sensitive operations
- Request user confirmation
- Handle approval/rejection gracefully
- Maintain conversation flow

**Try it out**:
```bash
npm start "Generate an image of a sunset"
# The agent will ask for approval before calling DALL-E
# Try both approving and rejecting to see how it handles each case
```

### 📊 Built-in Observability

**What it is**: The dashboard provides insights into agent performance and behavior.

**Where to find it**: The `dashboard/` directory contains a React app for visualizing evaluations.

**Why it matters**: You can't improve what you can't measure. The dashboard shows:
- Tool usage patterns
- Evaluation scores over time
- Performance trends
- Error analysis

**Try it out**:
```bash
# Run several evaluations
npm run eval tool_selection
npm run eval movie_search

# View the results
cd dashboard && npm run dev
# Open http://localhost:5173
```

### 🎨 Structured LLM Outputs

**What it is**: Using Zod schemas to ensure LLMs return data in expected formats.

**Where to find it**: Look for `zodResponseFormat` usage in `src/agent.ts`.

**Why it matters**: LLMs can be unpredictable. Structured outputs ensure:
- Consistent response formats
- Type-safe parsing
- Better error handling
- Reduced prompt engineering

**Example in the code**: The approval flow uses structured output to guarantee a boolean response.

## Understanding the Architecture

### Core Flow

1. **User Input** → CLI captures your message
2. **LLM Processing** → Determines which tools to use
3. **Tool Execution** → Runs tools with validated parameters
4. **Response Generation** → LLM creates final response
5. **Memory Update** → Conversation saved with potential summarization

### Key Files to Study

- `src/agent.ts`: Start here to understand the main conversation loop
- `src/toolRunner.ts`: See how tools are dispatched safely
- `src/memory.ts`: Learn about conversation persistence
- `src/llm.ts`: Understand the LLM abstraction layer
- `evals/run.ts`: See how to test AI agents properly

## Common Use Cases to Explore

### 1. Multi-Tool Interactions
```bash
npm start "What's trending on Reddit about movies?"
# Watch how the agent might use both reddit and movieSearch tools
```

### 2. Context Retention
```bash
npm start
> Tell me a dad joke
> Now generate an image based on that joke
# See how the agent remembers the joke for image generation
```

### 3. Semantic Search Capabilities
```bash
npm start "I'm in the mood for something funny but also heartwarming"
# The RAG system finds movies matching the vibe, not just keywords
```

### 4. Error Recovery
```bash
npm start "Search for movies directed by someone who doesn't exist"
# See how the system handles no results gracefully
```

## Best Practices Demonstrated

1. **Type Safety**: Zod + TypeScript throughout the codebase
2. **Error Handling**: Every tool has proper error management
3. **User Experience**: Clear feedback, loading states, and approval flows
4. **Testing**: Evaluation framework for non-deterministic behavior
5. **Persistence**: Simple but effective conversation storage
6. **Modularity**: Easy to understand and maintain architecture
7. **Production Considerations**: Rate limiting ready, cost controls, monitoring

## Workshop Information

This repository supports the Frontend Masters workshop. Start with `step/1` branch to build from scratch:

```bash
git checkout step/1  # Start from the beginning
```

## Contributing

This is an educational project showcasing production patterns. Feel free to explore and extend!

## License

See the workshop materials on Frontend Masters for license information.
