# LinkHub

Your personal link library. Organize with tags, search fast, share easily.

## Features

- **One-click save**: Save current tab with a single click
- **Tag-based organization**: Flexible categorization with tags
- **Full-text search**: Search by title, URL, tags, or memo
- **Copy to clipboard**: Quickly copy link URLs
- **Clean UI**: Modern, editorial-inspired design

## Installation

### From Chrome Web Store
Coming soon...

### Manual Installation
1. Download or clone this repository
2. Run `pnpm install && pnpm build`
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked" and select the `dist` folder

## Development

```bash
# Install dependencies
pnpm install

# Development with hot reload
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Chrome Extension Manifest V3

---

## Privacy

### Privacy Policy

**Last updated: January 2025**

LinkHub is committed to protecting your privacy. This privacy policy explains how our Chrome extension handles your data.

#### Data Collection

**LinkHub does NOT collect, transmit, or share any personal data.**

All data (saved links, tags, and preferences) is stored **locally on your device** using Chrome's Storage API. No data is ever sent to external servers.

#### Permissions

LinkHub requests the following permissions:

| Permission | Purpose |
|------------|---------|
| `storage` | Store your saved links, tags, and preferences locally |
| `tabs` | Access current tab information (URL, title, favicon) when saving |
| `activeTab` | Read the active tab's URL and title when you click Save |

#### Third-Party Services

LinkHub does not use any third-party analytics, tracking, or data collection services.

#### Data Security

Your data remains on your device and is never transmitted over the network. Chrome's built-in storage encryption protects your saved links.

#### Contact

If you have questions about this privacy policy, please open an issue on [GitHub](https://github.com/mag123c/linkhub/issues).

---

## License

MIT
