# Design Guidelines

UI/UX principles and visual design specifications for Kneel.

---

## Tone & Style

| Principle | Description |
|-----------|-------------|
| **Calm** | Peaceful, unhurried interface |
| **Non-judgmental** | Neutral language, no shame |
| **Spiritually respectful** | Honor the sacred nature of reflection |
| **Beginner-friendly** | Clear, obvious interactions |
| **Minimal** | No unnecessary elements |

---

## Color Palette

A neutral, spiritually grounded palette optimized for OLED screens.

### Light Theme

```css
:root {
  --bg-primary: #fafafa;
  --bg-secondary: #f0f0f0;
  --bg-card: #ffffff;
  
  --text-primary: #2d2d2d;
  --text-secondary: #6b6b6b;
  --text-muted: #999999;
  
  --accent: #A04040;          /* Muted Maroon */
  --accent-light: #B85050;
  --accent-dark: #883030;
  
  --border: #e0e0e0;
  --focus: #A04040;
}
```

### Dark Theme (OLED Optimized)

```css
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --bg-card: #252525;

  --text-primary: #e8e8e8;
  --text-secondary: #a0a0a0;
  --text-muted: #707070;

  --accent: #00a884;          /* WhatsApp Green */
  --accent-light: #05cd99;
  --accent-dark: #00816a;

  --border: #3a3a3a;
  --focus: #00a884;
}
```

### Color Tags (Pastel)

For optional entry categorization:

| Color | Hex | Label (Customizable) |
|-------|-----|-------|
| Rose | `#e8a0a0` | Repetitive |
| Amber | `#d4a574` | Important |
| Sage | `#a8c4a8` | Resolved |
| Sky | `#a0c4d4` | Reflect |
| Lavender | `#c4a8d4` | Other |

---

## Typography

Use system fonts for maximum privacy and performance.

---

## One-Handed Reachability (UX)

The interface is optimized for thumb use on large devices:

1. **Fixed Footers**: Primary action buttons and navigation are always at the bottom.
2. **Standardized Back Buttons**: A consistent `min-width: 120px` footprint is used for all "Back" buttons in footers.
3. **Solitary Balance**: Single navigation buttons are centered in the footer.
4. **Reachability Spacers**: Screens like *Settings* use a flexible spacer to push interactive elements (toggles) to the lower half of the screen.

---

## Component Styles

### Instagram-Style Pagination
For long lists (like the Preparation Guide), we use a dynamic indicator:
- **Max 5 dots** visible at a time.
- **Progressive Scaling**: Dots scale down and fade based on distance from the active page.
- **Centered Layout**: Perfectly centered in the footer row.

### Confession Ritual
The "Confessed?" flow is treated as a ritualistic fresh start:
- **Confirmation Screen**: High-contrast checkmark, bold permanent deletion warning.
- **Date Record**: Defaults to today but allows historical recording via a date picker.

---

## Layout Principles

1. **Mobile-first** — Design for phone screens first.
2. **Full-height screens** — Each screen fills the viewport.
3. **Centered content** — Max-width ~28rem for readability.
4. **Generous whitespace** — Use `padding-bottom` to prevent content overlap with fixed footers.

---

## What NOT to Include

Avoid:
- ❌ Statistics or counts (beyond days since confession)
- ❌ Streaks or gamification
- ❌ Categories or severity labels
- ❌ AI suggestions
- ❌ Push notifications
- ❌ Social features
- ❌ External fonts or analytics (Privacy-First)
