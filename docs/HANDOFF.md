# Kneel PWA - Agent Handoff Document

**Last Updated:** 2026-01-14
**Conversation Steps at Handoff:** ~1170

---

## Project Overview

**Kneel** is a privacy-first Progressive Web App for Catholics to prepare for confession. All data stays local on the device — no cloud sync, no accounts.

**Live URL:** https://ansumiriam.github.io/kneel/
**Repository:** github.com/ansumiriam/kneel

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Vite | Build tool |
| TypeScript | Type-safe JavaScript |
| Vanilla CSS | Styling (no Tailwind) |
| vite-plugin-pwa | PWA/Service Worker |
| LocalStorage | Data persistence |
| pnpm | Package manager |

---

## Project Structure

```
src/
├── app.ts                 # App entry, screen registration
├── main.ts                # Vite entry point
├── types.ts               # TypeScript interfaces
├── screens/               # UI screens
│   ├── LockScreen.ts
│   ├── PrivacyCheckScreen.ts
│   ├── HomeScreen.ts      # Main entries list
│   ├── AddSinScreen.ts
│   ├── EditSinScreen.ts
│   ├── ConfirmClearScreen.ts
│   ├── SettingsScreen.ts
│   ├── PrepareScreen.ts   # Prayer selection (🙏❤️📖 icons)
│   ├── PrayerScreen.ts    # Read-only prayer view
│   └── GuideScreen.ts     # Swipeable 25-page guide
├── content/prayers.ts     # Prayer text + 25 guide pages
├── services/storage.ts    # LocalStorage operations
├── utils/router.ts        # Simple screen routing
└── styles/main.css        # All styles (~1150 lines)
```

---

## Implemented Features

### Core
- Lock screen, Privacy check, Home screen with entries
- Add/Edit/Delete entries with swipe gestures
- Last confession date (tap to edit)
- Settings (theme, reminder, color code toggles)

### Interactions
- Swipe left → Edit, Swipe right → Delete with undo
- Long press → Color picker (when enabled)
- Tap entry → Expand/collapse

### Prepare Section
- 📖 button in Home header → Prepare screen
- Prayer Before Confession (🙏 icon), Act of Contrition (❤️ icon)
- 25-page Preparation Guide (📖 icon) with swipe-only navigation
- Page flip animation
- Fixed header with back button
- Page dots + page number at bottom
- Attribution to Malankara Library

---

## User Preferences

| Preference | Details |
|------------|---------|
| **Terminology** | "Entry" not "Sin" in UI |
| **Navigation** | Prepare button in header (📖), no bottom nav |
| **Guide pagination** | Swipe only, no prev/next buttons, no scroll |
| **Guide content** | Only from PDF, no added text |
| **Git workflow** | Combine add/commit/push in one line with semicolons |

---

## Commands

```bash
pnpm run dev      # Development
pnpm run build    # Build
git add .; git commit -m "message"; git push   # Git combined
```

---

## Key Formatting Notes

### Guide Text Formatter (GuideScreen.ts)
- Splits on `\n\n` for paragraphs
- `**text**` → `<strong>`
- `*text*` → `<em>`
- `• item` lines → `<ul><li>`
- `1. item` lines → `<ol start="N">` (preserves starting number)

### Content Rules
- Each section needs blank line between heading and bullet list
- Numbered lists preserve original numbers (e.g., 8, 9, 10)
- Content sourced only from `malankaralibrary.txt` (PDF extract)

---

## Recent Session (Jan 14, 2026)

1. Added more items per page (7-8 per page, reduced 28 → 25 pages)
2. Fixed numbered list formatting (8-10 instead of 1-3)
3. Added numbered summary for Two Commandments
4. Fixed bullet list rendering (blank line between heading and list)
5. Changed Prayer Before Confession icon to 🙏 praying hands
6. Fixed guide header to stay fixed at top on scroll

---

## Pending Work

- [ ] Biometric authentication (WebAuthn)
- [ ] Custom color label names
- [ ] Lock screen polish

---

*Document updated as work continues.*
