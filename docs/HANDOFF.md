# Kneel PWA - Agent Handoff Document

**Last Updated:** 2026-01-16
**Conversation Steps at Handoff:** ~1500

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
│   ├── ConfirmClearScreen.ts # "Confessed?" ritual
│   ├── SettingsScreen.ts
│   ├── PrepareScreen.ts
│   ├── PrayerScreen.ts    # Read-only prayer view
│   └── GuideScreen.ts     # Swipeable 25-page guide
├── content/prayers.ts     # Prayer text + 25 guide pages
├── services/storage.ts    # LocalStorage operations
├── utils/router.ts        # Simple screen routing
└── styles/main.css        # All styles (~1350 lines)
```

---

## Implemented Features

### One-Handed UI (UX)
- **Footer-based Navigation**: All core actions (Add, Confessed?, Prepare, Settings) are in a 2x2 footer grid on the Home screen.
- **Uniform Back Buttons**: Consistent 120px wide footprint for all footer back buttons for easy thumb reach.
- **Solitary Balance**: Single buttons are centered in the footer.
- **Reachability Spacer**: Settings screen uses a flex spacer to lower interactive items.

### Core Features
- **"Confessed?" Ritual**: A transition flow that clears entries and records the confession date via a native picker.
- **WhatsApp Green Theme**: Vibrant green accent for Dark Mode with optimized readout contrast.
- **Instagram-Style Dots**: Premium pagination in the Guide screen (max 5 dots, progressive scaling).
- **Gentle Reminder**: Inline "(X days ago)" indicator on the dashboard.

---

## User Preferences

| Preference | Details |
|------------|---------|
| **Terminology** | "Entry" not "Sin" in UI |
| **Accent Colors** | Maroon (Light) / WhatsApp Green (Dark) |
| **Navigation** | Footer grid on Home; no standard bottom nav bar |
| **Git workflow** | Combine add/commit/push in one line with semicolons |

---

## Commands

```bash
pnpm run dev      # Development
pnpm run build    # Build
git add .; git commit -m "message"; git push   # Git combined
```

---

## Recent Session (Jan 16, 2026) - UI Refinement

1. **Standardized Back Buttons**: Increased footprint to 120px and centered solitary ones.
2. **Instagram Pagination**: Implemented dynamic scaling dots for the 25-page guide.
3. **WhatsApp Green Theme**: Updated dark mode accent and button contrast.
4. **"Confessed?" Screen**: Added ritualistic fresh start message and date selection.
5. **Home Navigation**: Rebuilt Home footer into a 2x2 grid for better thumb access.
6. **Documentation Sync**: Fully updated DESIGN, FEATURES, and SCREENS.md to match implementation.

---

## Pending Work

- [ ] Biometric authentication (WebAuthn)
- [ ] Custom color label names (UI in Settings)
- [ ] Lock screen visual polish
- [ ] Full PWA install testing (iOS safe areas verified, needs manifest check)

---

*Document updated as work continues.*
