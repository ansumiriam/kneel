# Tech Stack

Technology choices for Kneel MVP, designed for beginners.

---

## Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **TypeScript** | 5.x | Type-safe JavaScript (required) |
| **Vite** | 5.x | Fast build tool & dev server |
| **vite-plugin-pwa** | 0.x | PWA manifest & service worker |
| **Vanilla CSS** | - | Styling without framework overhead |

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
- Beginner-friendly — just run `npm run dev`

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
├── docs/                   # Documentation (you are here)
├── public/
│   └── icons/              # PWA icons
├── src/
│   ├── screens/            # Screen components
│   ├── services/           # Storage, auth utilities
│   ├── styles/             # CSS files
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
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
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
