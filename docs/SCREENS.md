# Screens Specification

Kneel has **10 screens** organized into core flows and auxiliary sections.

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
   ├──► 4. Add Sin
   ├──► 5. Edit Sin
   ├──► 6. Confirm Clear
   ├──► 7. Settings
   └──► 8. Prepare ─┬─► 9. Prayer (read-only)
                    └─► 10. Guide (25 pages)
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

**Purpose**: Main screen showing confession state and entry list.

### Layout
```
┌─────────────────────────────┐
│ Last Confession: [Date] ✏️ ⚙️📖│
├─────────────────────────────┤
│ [Gentle Reminder Indicator] │
├─────────────────────────────┤
│                             │
│  • Entry 1 (with color tag) │
│  • Entry 2                  │
│  • Entry 3                  │
│  ...                        │
│                             │
├─────────────────────────────┤
│ [+ Add Entry]               │
│ [After Confession]          │
└─────────────────────────────┘
```

### Elements
| Element | Description |
|---------|-------------|
| Last Confession Date | Tap to edit via date picker |
| Gentle Reminder | Visual indicator of days since confession |
| Settings Button | ⚙️ icon → Settings screen |
| Prepare Button | 📖 icon → Prepare screen |
| Entry List | Text entries with optional color tags |
| Add Entry Button | Navigate to Add Sin screen |
| After Confession Button | Navigate to Confirm Clear screen |

### Interactions
- **Swipe left** on entry → Edit
- **Swipe right** on entry → Delete (with undo toast)
- **Tap** entry → Expand/collapse text
- **Long press** entry → Color picker (when enabled)

---

## 4. Add Sin Screen

**Purpose**: Free-text input for adding an entry.

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

## 5. Edit Sin Screen

**Purpose**: Modify an existing entry.

### Elements
- Title: "Edit Entry"
- Textarea pre-filled with entry text
- **Save** button (primary)
- **Cancel** button (secondary/back)

### Behavior
- Save validates non-empty text
- On save → Update entry and return to Home
- On cancel → Discard changes, return to Home

---

## 6. Confirm Clear Screen

**Purpose**: Confirmation before clearing all entries.

### Elements
- Icon (optional): Checkmark or peaceful symbol
- Heading: "After Confession"
- Subtext: "This will clear all entries and update your confession date."
- **Confirm** button (primary)
- **Cancel** button (secondary)

### Behavior
- Confirm → Clear all entries, set date to today, return to Home
- Cancel → Return to Home unchanged

---

## 7. Settings Screen

**Purpose**: Configure app preferences.

### Elements
| Setting | Description |
|---------|-------------|
| Dark Mode | Toggle light/dark theme |
| Gentle Reminder | Toggle days-since indicator |
| Color Tagging | Enable long-press color picker |

### Behavior
- All toggles save immediately to LocalStorage
- Changes apply instantly (no save button needed)

---

## 8. Prepare Screen

**Purpose**: Prayer selection hub before confession.

### Elements
- Title: "Prepare"
- Back button (← Home)
- Three icon buttons:
  - 🙏 Prayer Before Confession
  - ❤️ Act of Contrition
  - 📖 Preparation Guide

### Behavior
- 🙏 → Prayer screen (read-only)
- ❤️ → Prayer screen (read-only)
- 📖 → Guide screen (swipeable)

---

## 9. Prayer Screen

**Purpose**: Display prayer text for reading.

### Elements
- Title (prayer name)
- Back button
- Scrollable prayer text

### Behavior
- Read-only, no interaction
- Back button returns to Prepare

---

## 10. Guide Screen

**Purpose**: 25-page preparation guide with swipe navigation.

### Elements
- Fixed header with back button
- Page content (formatted text)
- Page dots at bottom
- Page number ("Page X of 25")
- Attribution: "Adapted from Malankara Library"

### Behavior
- **Swipe only** navigation (no prev/next buttons)
- Page flip animation
- No scroll within pages
- Back button returns to Prepare
