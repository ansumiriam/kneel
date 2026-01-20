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

---

## 3. Last Confession Date

### Requirements
- Store a single date value
- Display inline on the home screen next to the formatted date (e.g., "(4 days ago)")
- Allow editing via:
  1. **Home Screen**: Tap the date to open a native date input.
  2. **"Confessed?" Flow**: Set the date during the clearing ritual.

### Storage
- Key: `lastConfessionDate`
- Format: ISO date string (e.g., `"2026-01-12"`)

---

## 4. Gentle Reminder Indicator

A non-judgmental inline visual cue showing time since last confession in parenthetical format.

### Display States
- **Format**: `Jan 16, 2026 ✏️ (4 days ago)`
- **Behavior**: Passive indicator only — NOT a push notification.

---

## 5. Add Entry

### Requirements
- **Reachability**: Fixed footer with "Cancel" and "Save" buttons.
- **Workflow**: Save locally immediately and return to previous screen (Home or Guide).

---

## 6. Entry List (Home Screen)

### Interactions
| Gesture | Action |
|---------|--------|
| Tap text | Expand/collapse entry text |
| Tap ↺ icon | Increment repeat counter (starts at 1) |
| Long press ↺ | Reset repeat counter |
| Swipe left | Navigate to Edit screen |
| Swipe right | Delete with undo toast |

---

## 7. "Confessed?" Ritual (Clear Entries)

Replaces the standard "Clear All" with a meaningful transition.

### Flow
1. User taps **"Confessed?"** on Home screen.
2. Confirmation screen appears:
   - **Title**: "Ready for a fresh start?"
   - **Warning**: "Have you completed your confession? **This will permanently delete all entries from your device.**"
   - **Date Picker**: Defaults to today, allows historical logging.
3. If confirmed → Clear entire entry list and update `lastConfessionDate` to the selected value.

---

## 8. Theme Support

### Options
- **Dark mode** (Default, WhatsApp Green accent)
- **Light mode** (Muted Maroon accent)

### Behavior
- Primary buttons in Dark Mode use dark text on green background for readability.

---

## 9. Prepare Section

Accessible from the Home footer via the 📖 **Prepare** button.

### Contents
- **Prayer Before Confession**: Read-only text.
- **Act of Contrition**: Read-only text.
- **Preparation Guide**: 25-page swipeable examination of conscience.

### Guide Features (Optimized for Use)
- **Wide Back Button**: Standard 120px footprint.
- **Instagram-Style Dots**: Max 5 dots visible with progressive scaling/fading.
- **Page Stats**: Current page vs total (e.g., "1 / 25") right-aligned.
- **Persistence**: Remembers exact current page using local storage.
- **Make an Entry**: "Make an entry" button on every page to quickly record a reflection.
- **Contextual Return**: Returning from "Add Entry" brings the user back to the exact guide page they left.

---

## 10. Settings

### Available Options
| Setting | Default | Description |
|---------|---------|-------------|
| Dark Mode | On | Light/dark theme toggle |
| Gentle Reminder | On | Show days-since indicator |
