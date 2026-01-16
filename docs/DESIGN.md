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

A soft, neutral palette that feels calm and private.

### Light Theme

```css
:root {
  /* Background */
  --bg-primary: #fafafa;      /* Light gray-white */
  --bg-secondary: #f0f0f0;    /* Subtle contrast */
  --bg-card: #ffffff;         /* Card surfaces */
  
  /* Text */
  --text-primary: #2d2d2d;    /* Soft black */
  --text-secondary: #6b6b6b;  /* Muted gray */
  --text-muted: #999999;      /* Very muted */
  
  /* Accent */
  --accent: #5a6e7a;          /* Muted blue-gray */
  --accent-light: #7a8e9a;    /* Lighter variant */
  --accent-dark: #4a5e6a;     /* Darker variant */
  
  /* Interactive */
  --border: #e0e0e0;
  --focus: #5a6e7a;
  --error: #c45050;
}
```

### Dark Theme (Default)

```css
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --bg-card: #252525;

  --text-primary: #e8e8e8;
  --text-secondary: #a0a0a0;
  --text-muted: #707070;

  --accent: #7a9caa;
  --accent-light: #8aacba;
  --accent-dark: #6a8c9a;

  --border: #3a3a3a;
  --focus: #7a9caa;
  --error: #e07070;
}
```

### Color Tags (Pastel)

For optional entry categorization:

| Color | Hex | Usage |
|-------|-----|-------|
| Rose | `#e8a0a0` | Repetitive |
| Amber | `#d4a574` | Important |
| Sage | `#a8c4a8` | Resolved |
| Sky | `#a0c4d4` | Reflect |
| Lavender | `#c4a8d4` | Other |

---

## Typography

Use system fonts for maximum privacy (no external font loading).

```css
:root {
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                 Roboto, Oxygen, Ubuntu, sans-serif;
  
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.5rem;     /* 24px */
  --font-size-2xl: 2rem;      /* 32px */
  
  --line-height: 1.6;
}
```

---

## Spacing

Consistent spacing creates visual harmony.

```css
:root {
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
}
```

---

## Component Styles

### Buttons

```css
/* Primary Button */
.btn--primary {
  background: var(--accent);
  color: white;
  padding: var(--space-md) var(--space-xl);
  border: none;
  border-radius: 0.5rem;
}

/* Secondary Button */
.btn--secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}
```

### Cards / List Items

```css
.sin-item {
  background: var(--bg-card);
  padding: var(--space-md);
  border-radius: 0.5rem;
  border-left: 3px solid var(--accent-light);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
```

### Toggle Switch

Custom toggle for Settings screen with smooth animation.

---

## Layout Principles

1. **Mobile-first** — Design for phone screens first
2. **Full-height screens** — Each screen fills the viewport
3. **Centered content** — Max-width ~28rem for readability
4. **Generous whitespace** — Let elements breathe
5. **Fixed footer** — Action buttons at bottom for thumb reach

---

## Accessibility (AX) Requirements

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | WCAG AA minimum (4.5:1 for text) |
| Focus indicators | Visible focus rings on all interactive elements |
| Touch targets | Minimum 44x44px for all buttons |
| Screen reader | Semantic HTML, ARIA labels where needed |
| Reduced motion | Respect `prefers-reduced-motion` |

---

## Gentle Reminder Indicator

A passive, non-intrusive visual cue on the Home screen.

| State | Background | Meaning |
|-------|------------|---------|
| Calm | `--bg-secondary` | Within reasonable timeframe |
| Gentle | Soft amber (15% opacity) | Moderate time passed |
| Warm | Soft rose (15% opacity) | Longer time since confession |

> **Note**: This is intentionally a passive indicator, not a notification.

---

## What NOT to Include

Per specification, avoid:
- ❌ Statistics or counts (beyond days since confession)
- ❌ Streaks or gamification
- ❌ Categories or severity labels
- ❌ AI suggestions
- ❌ Push notifications or system reminders
- ❌ Social features
- ❌ Export/import
