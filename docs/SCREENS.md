# Screens Specification

Kneel has exactly **5 screens**. No more, no less.

---

## Screen Flow

```
┌─────────────────┐
│  1. Lock Screen │
└────────┬────────┘
         │ (Auth success)
         ▼
┌─────────────────────┐
│ 2. Privacy Check    │◄──┐
└────────┬────────────┘   │
         │ (Yes)     (Later)
         ▼                │
┌─────────────────────┐   │
│    3. Home Screen   │───┘
└──┬──────────────┬───┘
   │              │
   ▼              ▼
┌──────────┐  ┌──────────────────┐
│ 4. Add   │  │ 5. Confirm Clear │
│   Sin    │  │                  │
└──────────┘  └──────────────────┘
```

---

## 1. Lock / Auth Screen

**Purpose**: Secure app access with device authentication.

### Elements
- App name: "Kneel"
- Simple icon/logo
- "Unlock" button
- Error message area (for failed auth)

### States
| State | Display |
|-------|---------|
| Initial | Unlock button visible |
| Authenticating | Loading indicator |
| Failed | Error message + retry button |

> ⚠️ **Note**: Biometric auth will be added after core testing. Initially, this screen will auto-proceed.

---

## 2. Privacy Check Screen

**Purpose**: Gentle pause before reflection (session-only).

### Elements
- Heading: "This is a private moment."
- Subtext: "Are you in a place where you can reflect freely?"
- **Yes** button (primary)
- **Later** button (secondary)

### Behavior
- "Yes" → Navigate to Home
- "Later" → Return to Lock screen
- No data stored

---

## 3. Home Screen

**Purpose**: Main screen showing confession state and sin list.

### Layout
```
┌─────────────────────────────┐
│ Last Confession: [Date] ✏️  │
├─────────────────────────────┤
│                             │
│  • Sin entry 1              │
│  • Sin entry 2              │
│  • Sin entry 3              │
│  ...                        │
│                             │
├─────────────────────────────┤
│ [+ Add Sin]                 │
│ [After Confession]          │
└─────────────────────────────┘
```

### Elements
| Element | Description |
|---------|-------------|
| Last Confession Date | Editable date display |
| Sin List | Text-only entries, most recent first |
| Add Sin Button | Navigate to Add Sin screen |
| After Confession Button | Navigate to Confirm Clear screen |

---

## 4. Add Sin Screen

**Purpose**: Free-text input for adding a sin.

### Elements
- Title: "Add Entry"
- Textarea (multi-line, placeholder: "What's on your mind?")
- **Save** button (primary)
- **Cancel** button (secondary/back)

### Behavior
- Save validates non-empty text
- On save → Return to Home with new entry
- On cancel → Return to Home unchanged

---

## 5. Confirm Clear Screen

**Purpose**: Confirmation before clearing all sins.

### Elements
- Icon (optional): Checkmark or peaceful symbol
- Heading: "After Confession"
- Subtext: "This will clear all entries and update your confession date."
- **Confirm** button (primary)
- **Cancel** button (secondary)

### Behavior
- Confirm → Clear all sins, set date to today, return to Home
- Cancel → Return to Home unchanged
