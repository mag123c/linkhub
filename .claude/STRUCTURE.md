# AI Context Structure Rules

> This document defines the rules for the `.claude/` directory structure.

## Core Principles

### 1. Knowledge/Behavior Separation (Boris Principle)

| Type | Directory | Role | Format |
|------|-----------|------|--------|
| **Knowledge** | `ai-context/` | Information AI should reference | JSON |
| **Behavior** | `skills/` | Workflows AI should execute | SKILL.md |

### 2. Layer Responsibility Separation (DRY Principle)

| Layer | Location | Responsibility | No Duplication |
|-------|----------|----------------|----------------|
| **Root** | `.claude/` | Project-wide common | - |
| **Module** | `src/{module}/CLAUDE.md` | Module-specific only | Do not redefine root info |

### 3. Selective Loading (Kurly OMS Principle)

- CLAUDE.md is the only entry point
- Load only required documents based on task type
- Consider token efficiency

---

## Directory Structure

```
linkhub/
├── CLAUDE.md                     # Project router (entry point)
├── .claude/
│   ├── STRUCTURE.md              # This document (structure rules)
│   ├── ai-context/               # Knowledge (global)
│   │   ├── CLAUDE.md             # Directory explanation
│   │   ├── architecture.json     # Layers, dependencies, external APIs
│   │   ├── conventions.json      # Coding style, commit rules
│   │   ├── testing.json          # Test commands, locations
│   │   ├── domain/               # Domain knowledge
│   │   │   ├── glossary.json     # Terms, constants
│   │   │   └── entities.json     # Entity relationships
│   │   └── integrations/         # External integrations
│   │       └── chrome.json       # Chrome Extension APIs
│   ├── skills/                   # Behaviors (shared)
│   │   ├── clarify/SKILL.md      # Requirements clarification
│   │   ├── task/SKILL.md         # Workflow orchestration
│   │   ├── developer/SKILL.md    # Data layer, logic
│   │   ├── frontend/SKILL.md     # UI components
│   │   ├── reviewer/SKILL.md     # Code review
│   │   ├── verify/SKILL.md       # Build/lint verification
│   │   └── linkhub-wrap/SKILL.md # Session wrap-up
│   ├── plans/                    # Plan mode outputs
│   ├── hooks/                    # Claude Code hooks
│   │   ├── clarify-prompt.sh     # First prompt clarify suggestion
│   │   └── pre-commit-verify.sh  # Pre-commit verification
│   ├── settings.json             # Hook configurations (shared)
│   └── settings.local.json       # (ignored) Local settings
│
└── src/
    └── {module}/CLAUDE.md        # Module-specific entry points
```

---

## Layer Responsibilities

### Root Layer (.claude/)

**Purpose**: Information common across the entire project

| File | Content | Example |
|------|---------|---------|
| `architecture.json` | Layers, dependencies, external APIs | `"popup": {"path": "src/popup/"}` |
| `conventions.json` | Coding style, naming, commit rules | `"commit.types": ["feat", "fix"]` |
| `testing.json` | Test commands, locations | `"commands.test": "pnpm test"` |
| `skills/` | Workflows usable in all contexts | clarify, task, verify |
| `hooks/` | Event-triggered scripts | clarify-prompt, pre-commit |

### Hooks Layer (.claude/hooks/)

**Purpose**: Automated behaviors triggered by Claude Code events

| Hook | Event | Purpose |
|------|-------|---------|
| `clarify-prompt.sh` | UserPromptSubmit | Suggest /clarify on first prompt |
| `pre-commit-verify.sh` | PreToolUse (Bash) | Suggest verification before git commit |

**Configuration**: `.claude/settings.json`

### Module Layer (src/{module}/CLAUDE.md)

**Purpose**: Module-specific information only (no root redefinition)

| Content | Description |
|---------|-------------|
| Module purpose | Brief description |
| Directory structure | Subdirectories and their purposes |
| Key interfaces | Important types/interfaces |
| Usage patterns | Example code snippets |

---

## Prohibited Patterns

### 1. No Root Info Redefinition

```
# Wrong: Redefining architecture in module CLAUDE.md
src/popup/CLAUDE.md:
  ## Architecture (already in root)

# Correct: Module-specific info only
src/popup/CLAUDE.md:
  ## Popup Components (module-specific)
```

### 2. No Skills in Module Layer

```
# Wrong
src/popup/.claude/skills/  # Module-level skills not allowed

# Correct
.claude/skills/            # All skills at root level
```

### 3. No Knowledge Files Outside ai-context

```
# Wrong
.claude/common/         # Ambiguous name
.claude/testing/        # Outside ai-context

# Correct
.claude/ai-context/     # All knowledge files here
```
