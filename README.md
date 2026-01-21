<div align="center">

# LinkHub

**Your personal link library.**

Organize with tags, search fast, share easily.

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

<img src="docs/images/popup.png" alt="LinkHub Screenshot" width="400">

</div>

---

## Why LinkHub?

| Chrome Bookmarks | LinkHub |
|------------------|---------|
| Hard to find saved links | Full-text search (title, URL, tags, memo) |
| Folder-only organization | Flexible tag-based system |
| Basic UI | Clean, card-based layout |
| No quick sharing | One-click copy to clipboard |

## Features

- **One-click save** — Save current tab instantly
- **Tag-based organization** — Categorize links with multiple tags
- **Full-text search** — Find links by title, URL, tag, or memo
- **Copy to clipboard** — Share links quickly
- **Tag management** — Delete unused tags easily
- **Clean UI** — Modern, editorial-inspired design

## Screenshots

<div align="center">
<img src="docs/images/hero.png" alt="LinkHub Hero" width="800">
</div>

## Installation

### Chrome Web Store

Coming soon...

### Manual Installation

1. Download or clone this repository
2. Install dependencies and build:
   ```bash
   pnpm install && pnpm build
   ```
3. Open Chrome → `chrome://extensions/`
4. Enable **Developer mode** (top right)
5. Click **Load unpacked** → Select the `dist` folder

## Usage

1. **Save a link**: Click the extension icon → Click **Save**
2. **Add tags**: Type tags and press Enter
3. **Search**: Type in the search box to filter links
4. **Filter by tag**: Click a tag to filter
5. **Copy URL**: Hover a link → Click copy icon
6. **Delete tag**: Click a tag → Click X

## Development

```bash
pnpm install      # Install dependencies
pnpm dev          # Development with hot reload
pnpm build        # Production build
pnpm test         # Run tests
pnpm lint         # Lint code
```

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Chrome Extension Manifest V3

---

## Privacy

**LinkHub does NOT collect any data.**

All your links, tags, and preferences are stored **locally on your device** using Chrome's Storage API. Nothing is ever sent to external servers.

### Permissions Explained

| Permission | Why |
|------------|-----|
| `storage` | Store your links and tags locally |
| `tabs` | Read current tab info when saving |
| `activeTab` | Access active tab URL and title |

[Full Privacy Policy →](#privacy-policy)

---

## Privacy Policy

**Last updated: January 2025**

### Data Collection

LinkHub does NOT collect, transmit, or share any personal data. All data is stored locally on your device.

### Third-Party Services

LinkHub does not use any third-party analytics, tracking, or data collection services.

### Contact

Questions? [Open an issue](https://github.com/mag123c/linkhub/issues)

---

## License

MIT © 2025

---

<div align="center">

**[⬆ Back to top](#linkhub)**

</div>
