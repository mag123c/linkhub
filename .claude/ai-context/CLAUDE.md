# AI Context

This directory contains **knowledge documents** needed for Claude to understand the project.

## Structure

```
ai-context/
├── CLAUDE.md             # This file
├── architecture.json     # Project layers, dependencies
├── conventions.json      # Naming, commit, code style
├── testing.json          # Test commands and locations
│
├── domain/               # Domain knowledge
│   ├── glossary.json     # LinkHub domain terms
│   └── entities.json     # Entity relationships (Link, Tag, Settings)
│
└── integrations/         # External integrations
    └── chrome.json       # Chrome Extension APIs
```

## Loading Rules

### Basic Loading (All Sessions)

Always reference these files:

| File | Purpose |
|------|---------|
| `architecture.json` | Understand project structure |
| `conventions.json` | Follow coding standards |
| `domain/glossary.json` | Understand LinkHub terms |

### Selective Loading

Load additional files based on task type:

| Task | Additional Files |
|------|------------------|
| Domain logic | `domain/entities.json` |
| Chrome API work | `integrations/chrome.json` |
| Testing | `testing.json` |

## Usage Examples

### 1. New Feature Development

```
1. architecture.json - Identify affected layers
2. conventions.json - Follow naming patterns
3. domain/glossary.json - Understand related terms
4. domain/entities.json - Data structure
```

### 2. Chrome API Integration

```
1. Basic 3 files
2. integrations/chrome.json - API details, permissions
```

### 3. Testing

```
1. Basic 3 files
2. testing.json - Commands, patterns
```

## Token Prediction

| Session Type | Files Loaded | Est. Tokens |
|--------------|--------------|-------------|
| General work | architecture + conventions | ~1K |
| Domain work | + domain/* (2 files) | ~2K |
| Full analysis | All files | ~3K |

## Document Update Rules

1. **entities.json**: Update when data structure changes
2. **glossary.json**: Update when new domain terms introduced
3. **chrome.json**: Update when permissions or APIs change
4. **architecture.json**: Update when adding new layers

---
Last updated: 2026-01-21
