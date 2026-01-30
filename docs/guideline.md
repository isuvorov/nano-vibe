# Project Guidelines

# General

Universal guidelines for TypeScript projects. Portable between projects.

Using the latest and trending tools for 2026.

**Important:**
- Update this file after each project change
- Run `bun run test` after each code change

## Stack

| Tool | Choice | Notes |
|------|--------|-------|
| Runtime | Bun | Fastest JS runtime |
| Package Manager | Bun | `bun install`, `bun add` |
| Linting + Formatting | Biome | Replaces ESLint + Prettier |
| Testing | Bun Test | Built-in, Jest-compatible API |
| TypeScript | 5.7+ | Strict mode |
| Git Hooks | Lefthook | Fast, simple config |
| Config | @lsk4/config | Configuration loading |
| Validation | Zod | Schema validation |
| Logger | @lsk4/log | Logging |
| Deploy | Fly.io | Production hosting |

## Project Structure

### Filesystem

| Folder / File         | Purpose                                  |
|-----------------------|------------------------------------------|
| `src/`                | Application source code                  |
| `tests/`              | Tests for functions and API              |
| `docs/`               | Documentation and project specification  |
| `.github/workflows/release.yml`  | CI/CD pipelines (deploy, release)        |
| `.env.example`        | Environment variables example            |
| `biome.json`          | Biome configuration                      |
| `tsconfig.json`       | TypeScript config in strict mode         |
| `lefthook.yml`        | Git hooks (pre-commit, etc.)             |
| `package.json`        | Scripts and dependencies                 |
| `fly.toml`            | Fly.io deployment configuration          |
| `Dockerfile`          | Docker image for deployment              |

```
project/
├── src/
│   ├── config.ts    # ENV config, schema and environment variables validation 
│   ├── index.ts     # Main functions export (e.g., add)
│   ├── log.ts       # Logging wrapper 
│   ├── main.ts      # Additional logic (demo run, experimental part)
│   └── server.ts    # HTTP API implementation on Bun (endpoints)
├── tests/
│   ├── index.test.ts   # Unit tests for base functions
│   └── server.test.ts  # API interface tests
├── docs/
│   └── guideline.md # Current project standards
├── .github/
│   └── workflows/
│       └── release.yml     # Release pipeline
├── .env.example
├── biome.json
├── tsconfig.json
├── lefthook.yml
└── package.json
```

### `src/` Structure

| File           | Purpose                                                                           |
|----------------|-----------------------------------------------------------------------------------|
| `config.ts`    | Describes env schema; all variables are read and exported here                    |
| `index.ts`     | Exports key functions/library (add, etc.)                                         |
| `log.ts`       | Application logger (usually imports createLogger)                                 |
| `server.ts`    | HTTP API server via Bun. Implements endpoints (/{}, /add, etc.)                   |
| `main.ts`      | Additional logic (demo run or experimental part, optional if needed)              |


## Commands

```bash
# Production
bun start              # Start app in prod from lib

# Development
bun run dev            # Start app in dev from src with watch mode
bun run dev:tsc        # Start dev using tsc builder
bun run dev:bun        # Start dev using bun builder

# Build
bun run build          # Build project from src to lib
bun run build:tsc      # Build using tsc builder
bun run build:bun      # Build using bun builder

# Testing
bun run test           # Run lints and tests from test folder
bun run test:watch     # Run tests in watch mode
bun run test:lint      # Run only lints
bun run test:unit      # Run only unit tests

# Fixing
bun run fix            # Auto fix lint & formats and other fix tools
bun run fix:lint       # Auto fix lints only
bun run fix:format     # Auto fix formats only

# Release
bun run release        # Build && test && release in prod mode
```

## TypeScript

Using the latest TypeScript version with strict mode enabled, then disabling individual rules if needed.

**Current tsconfig.json:** `@lskjs/tsconfig`

Strict mode enabled in `tsconfig.json`:
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `noImplicitOverride: true`
- `noFallthroughCasesInSwitch: true`

## Lint

Using Biome for code linting and formatting.

**Current biome.json:** https://github.com/lskjs/presets/blob/main/presets/biome-config/biome.json


```bash
bun run lint
bun run fix
```

## Git Hooks (Lefthook)

Configured in `lefthook.yml`:
- **pre-commit**: lint + typecheck
- **pre-push**: tests

Install hooks after clone:

```bash
bun install  # runs "prepare" script automatically
```

## CI/CD

GitHub Actions runs on push/PR to main:
1) install 
2) release

## Environment Variables & Config

Using `@lsk4/config` for configuration loading and `zod` for schema validation.

Configuration is read in `src/config.ts`:
- Loading from `.env.json` & `.env.js` files via `loadConfig`
- Validation via Zod schema
- Export of typed `config` object

Bun auto-loads `.env` files. No need for `dotenv`.


## Logger

The current logger instance is located in `src/log.ts`.

Using `@lsk4/log`.
