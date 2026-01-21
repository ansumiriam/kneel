# Kneel PWA - Agent Handoff Document

**Last Updated:** 2026-01-21
**Conversation Steps at Handoff:** ~1600

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
│   ├── LockScreen.ts      # PIN Authentication
│   ├── PrivacyCheckScreen.ts
│   ├── HomeScreen.ts      # Main entries list
│   ├── AddSinScreen.ts
│   ├── EditSinScreen.ts
│   ├── ConfirmClearScreen.ts # "Confessed?" ritual
│   ├── SettingsScreen.ts  # Theme, Language, PIN
│   ├── PrepareScreen.ts
│   ├── PrayerScreen.ts    # Read-only prayer view
│   └── GuideScreen.ts     # Swipeable 25-page guide
├── content/prayers.ts     # Prayer text + Guide pages (EN/ML)
├── services/
│   ├── storage.ts         # LocalStorage operations
│   ├── auth.ts            # Authentication wrapper
│   └── toast.ts           # Toast notifications
├── utils/router.ts        # Simple screen routing
└── styles/main.css        # All styles (~1600 lines)
```

---

## Implemented Features

### One-Handed UI (UX)
- **Footer-based Navigation**: All core actions (Add, Confessed?, Prepare, Settings) are in a 2x2 footer grid on the Home screen.
- **Uniform Back Buttons**: Consistent 120px wide footprint for all footer back buttons for easy thumb reach.
- **Reachability**: Settings screen uses a flex spacer to lower interactive items.
- **Zero-Scroll**: Main views use internal scrolling areas while the body remains fixed, preventing mobile browser chrome shifting.

### Core Features
- **"Confessed?" Ritual**: A transition flow that clears entries and records the confession date via a native picker.
- **Bilingual Support**: Full support for English and Malayalam content (toggle in Settings).
- **Security**: PIN-based authentication on launch.
- **WhatsApp Green Theme**: Vibrant green accent for Dark Mode.
- **Instagram-Style Dots**: Premium pagination in the Guide screen (max 5 dots, progressive scaling).
- **Gentle Reminder**: Inline "(X days ago)" indicator on the dashboard.

---

## User Preferences

| Preference | Details |
|------------|---------|
| **Terminology** | "Entry" not "Sin" in UI |
| **Accent Colors** | Maroon (Light) / WhatsApp Green (Dark) |
| **Navigation** | Footer grid on Home; no standard bottom nav bar |
| **Language** | English or Malayalam preference |

---

## Commands

```bash
pnpm run dev      # Development
pnpm run build    # Build
git add .; git commit -m "message"; git push   # Git combined
```

---

## Recent Session (Jan 21, 2026) - Content & Logic Update

1.  **Malayalam Content**: Defined correct Malayalam text for prayers and guide, fixing rendering issues (ligatures).
2.  **Language Support**: Added toggle in Settings to switch between English and Malayalam.
3.  **Removed Color Coding**: Eliminated the entry severity color coding feature (Green/Amber/Red) to reduce complexity and judgement.
4.  **Zero-Scroll Architecture**: Refactored CSS to use fixed positioning for the app shell and internal scrolling for content areas.
5.  **PIN Authentication**: Implemented keypad-based PIN entry for app security.

---

## Pending Work

- [ ] Biometric authentication (WebAuthn) as an upgrade to PIN
- [ ] Accessibility audit (Screen reader testing)
- [ ] Full PWA install testing (iOS safe areas verified)

---

*Document updated as work continues.*
