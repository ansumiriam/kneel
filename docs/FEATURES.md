# Features Specification

Detailed breakdown of all required features for Kneel MVP.

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
- Allow editing via date picker

### Storage
- Key: `lastConfessionDate`
- Format: ISO date string (e.g., `"2026-01-12"`)
- Location: LocalStorage

---

## 4. Add Sin

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
}
```

---

## 5. Sin List

### Requirements
- Show sins added since last confession
- Sorted by insertion order (most recent first)
- Each entry shows text only

### Display Rules
- No timestamps shown
- No categories or labels
- Simple, clean list format

---

## 6. After Confession

### Flow
1. User taps **"After Confession"** button
2. Confirmation screen appears
3. If confirmed → Clear entire sin list
4. Update last confession date to today

### Confirmation Copy
> Are you sure? This will clear all entries.
