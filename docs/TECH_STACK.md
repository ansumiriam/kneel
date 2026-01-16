# Tech Stack

Technology choices for Kneel, designed for beginners.

---

## Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **TypeScript** | 5.x | Type-safe JavaScript (required) |
| **Vite** | 5.x | Fast build tool & dev server |
| **vite-plugin-pwa** | 0.x | PWA manifest & service worker |
| **Vanilla CSS** | - | Styling without framework overhead |
| **pnpm** | - | Package manager |

---

## Why This Stack?

### TypeScript
- **Required** per specification
- Catches errors at compile time
- Better IDE support with autocomplete
- Self-documenting code

### Vite
- Zero-config TypeScript support
- Instant hot module replacement (HMR)
- Small production bundles
- Beginner-friendly — just run `pnpm dev`

### No Framework (Vanilla TS)
- Keeps all logic visible and explicit
- No hidden abstractions
- Easier to understand for beginners
- Smaller bundle size

### vite-plugin-pwa
- Automatic service worker generation
- PWA manifest configuration
- Handles caching strategies
- Offline support out of the box

---

## Browser APIs Used

| API | Purpose |
|-----|---------|
| **LocalStorage** | Persistent local data |
| **WebAuthn** | Biometric authentication (deferred) |
| **Service Worker** | Offline caching (via vite-plugin-pwa) |

---

## Project Structure

```
kneel/
├── docs/                   # Documentation
├── public/
│   └── icons/              # PWA icons
├── src/
│   ├── screens/            # Screen components (10 screens)
│   │   ├── LockScreen.ts
│   │   ├── PrivacyCheckScreen.ts
│   │   ├── HomeScreen.ts
│   │   ├── AddSinScreen.ts
│   │   ├── EditSinScreen.ts
│   │   ├── ConfirmClearScreen.ts
│   │   ├── SettingsScreen.ts
│   │   ├── PrepareScreen.ts
│   │   ├── PrayerScreen.ts
│   │   └── GuideScreen.ts
│   ├── content/
│   │   └── prayers.ts      # Prayer text + 25 guide pages
│   ├── services/
│   │   ├── storage.ts      # LocalStorage operations
│   │   ├── auth.ts         # Authentication (placeholder)
│   │   └── toast.ts        # Toast notifications
│   ├── utils/
│   │   ├── router.ts       # Simple screen routing
│   │   └── swipe.ts        # Swipe gesture detection
│   ├── styles/
│   │   └── main.css        # All styles (~1150 lines)
│   ├── types.ts            # TypeScript interfaces
│   ├── app.ts              # Main app logic
│   └── main.ts             # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

---

## Browser Support

Target: Modern browsers with LocalStorage support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |

> Mobile browsers: iOS Safari 13+, Chrome for Android 80+
