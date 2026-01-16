# Features Specification

Detailed breakdown of all features in Kneel.

---

## 1. Biometric / Device Authentication

> ⚠️ **Implementation Note**: This feature will be implemented last, after core testing is complete.

### Requirements
- App must lock on launch
- Use device biometric or system authentication
- If authentication fails, app does not open

### Technical Approach
- WebAuthn API for biometric credentials
- Fallback to device passcode if biometric unavailable
- Requires HTTPS in production (localhost allowed for dev)

---

## 2. Session-only Privacy Check (Gentle Gate)

This screen appears **immediately after successful authentication** and **before the Home screen**.

### Copy (exact wording)

> **This is a private moment.**  
> Are you in a place where you can reflect freely?

### Buttons
- **Yes** — Navigate to Home screen
- **Later** — Return to Lock/Authentication screen

### Behavior Rules
| Rule | Description |
|------|-------------|
| Session-only | Reset on every app launch |
| No storage | Do NOT store the response |
| No persistence | Do NOT persist any state |
| No inference | Do NOT infer or track anything |
| Show once | Do NOT show again until next app launch |

> This is a **gentle pause**, not a security mechanism.

---

## 3. Last Confession Date

### Requirements
- Store a single date value
- Display prominently on the home screen
- Allow editing via date picker (tap to edit)

### Storage
- Key: `lastConfessionDate`
- Format: ISO date string (e.g., `"2026-01-12"`)
- Location: LocalStorage

---

## 4. Gentle Reminder Indicator

A non-judgmental visual cue showing time since last confession.

### Display States
| State | Color | Meaning |
|-------|-------|---------|
| Calm | Neutral gray | Within reasonable timeframe |
| Gentle | Soft amber | Moderate time has passed |
| Warm | Soft rose | Longer time since confession |

### Behavior
- Togglable in Settings (enabled by default)
- Passive indicator only — NOT a push notification
- Shows days count and number of entries

---

## 5. Add Entry

### Requirements
- Free-text input only
- Do NOT automatically attach timestamps
- Save locally immediately

### Data Structure
```typescript
interface Sin {
  id: string;        // UUID for identification
  text: string;      // User's free-text input
  createdAt: number; // For ordering only (not displayed)
  color?: SinColor;  // Optional color tag
}
```

---

## 6. Entry List

### Requirements
- Show entries added since last confession
- Sorted by insertion order (most recent first)
- Each entry shows text only (no timestamps)

### Interactions
| Gesture | Action |
|---------|--------|
| Tap | Expand/collapse entry text |
| Swipe left | Navigate to Edit screen |
| Swipe right | Delete with undo toast |
| Long press | Open color picker (when enabled) |

---

## 7. Color Tagging

Optional feature to categorize entries with pastel colors.

### Available Colors
| Color | Default Label |
|-------|---------------|
| Rose 🌹 | Repetitive |
| Amber 🔶 | Important |
| Sage 🌿 | Resolved |
| Sky 🩵 | Reflect |
| Lavender 💜 | Other |

### Behavior
- Disabled by default (enable in Settings)
- Long-press entry to open color picker
- Colors show as left border + gradient background
- Labels stored in LocalStorage (customizable future feature)

---

## 8. After Confession

### Flow
1. User taps **"After Confession"** button
2. Confirmation screen appears
3. If confirmed → Clear entire entry list
4. Update last confession date to today

### Confirmation Copy
> This will clear all entries and update your confession date.

---

## 9. Theme Support

### Options
- **Dark mode** (default)
- **Light mode**

### Behavior
- Toggle in Settings
- Persisted in LocalStorage
- Applies immediately

---

## 10. Prepare Section

Prayer and preparation resources accessible from Home header.

### Contents
| Icon | Name | Type |
|------|------|------|
| 🙏 | Prayer Before Confession | Read-only text |
| ❤️ | Act of Contrition | Read-only text |
| 📖 | Preparation Guide | 25-page swipeable guide |

### Guide Features
- Swipe-only navigation (no buttons)
- Page flip animation
- Fixed header with back button
- Page dots + page number at bottom
- Content sourced from Malankara Library PDF

---

## 11. Toast Notifications

In-app feedback for user actions.

### Features
- Appears at bottom of screen
- Auto-dismisses after timeout
- Delete toast includes "Undo" button
- Non-intrusive animation

---

## 12. Settings

### Available Options
| Setting | Default | Description |
|---------|---------|-------------|
| Dark Mode | On | Light/dark theme toggle |
| Gentle Reminder | On | Show days-since indicator |
| Color Tagging | Off | Enable long-press color picker |
