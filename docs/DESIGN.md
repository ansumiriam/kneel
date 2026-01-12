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

```css
:root {
  /* Background */
  --bg-primary: #fafafa;      /* Light gray-white */
  --bg-secondary: #f0f0f0;    /* Subtle contrast */
  
  /* Text */
  --text-primary: #2d2d2d;    /* Soft black */
  --text-secondary: #6b6b6b;  /* Muted gray */
  
  /* Accent */
  --accent: #5a6e7a;          /* Muted blue-gray */
  --accent-light: #7a8e9a;    /* Lighter variant */
  
  /* Interactive */
  --button-primary: #5a6e7a;
  --button-secondary: #e0e0e0;
  
  /* Semantic */
  --border: #e0e0e0;
  --focus: #5a6e7a;
}
```

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
.btn-primary {
  background: var(--button-primary);
  color: white;
  padding: var(--space-sm) var(--space-lg);
  border: none;
  border-radius: 8px;
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  /* ... same padding/radius as primary */
}
```

### Input / Textarea

```css
.input {
  width: 100%;
  padding: var(--space-md);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: var(--font-size-base);
  font-family: inherit;
  resize: vertical;
}

.input:focus {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
```

### Cards / List Items

```css
.card {
  background: white;
  padding: var(--space-md);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
```

---

## Layout Principles

1. **Mobile-first** — Design for phone screens first
2. **Full-height screens** — Each screen fills the viewport
3. **Centered content** — Max-width ~400px for readability
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

## What NOT to Include

Per specification, avoid:
- ❌ Statistics or counts
- ❌ Streaks or gamification
- ❌ Categories or severity labels
- ❌ AI suggestions
- ❌ Reminders or notifications
- ❌ Social features
- ❌ Export/import
