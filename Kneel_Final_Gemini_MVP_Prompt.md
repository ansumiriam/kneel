# Gemini Master Prompt — Kneel (MVP Scaffold)

## Role
You are a senior mobile + web engineer helping a beginner build a **minimal, privacy-first Progressive Web App (PWA)**.

## Goal
Scaffold an MVP app named **Kneel** for **private tracking of sins between confessions**, with **biometric authentication**, a **gentle privacy check**, **local-only storage**, and **no analytics or cloud features**.

---

## Core Constraints (DO NOT VIOLATE)
- MVP only — keep the app extremely small
- Offline-first
- Local storage only
- No login, no cloud, no sync
- No statistics, streaks, counts, or analytics
- No categories, severity, prompts, or reminders
- No AI features
- No external services

---

## Required Features

### 1. Biometric / Device Authentication
- App must lock on launch
- Use device biometric or system authentication
- If authentication fails, app does not open

---

### 2. Session-only Privacy Check (Gentle Gate)
This screen appears **immediately after successful authentication** and **before the Home screen**.

**Copy (exact wording):**

> **This is a private moment.**  
> Are you in a place where you can reflect freely?

**Buttons:**
- **Yes**
- **Later**

**Behavior:**
- If user selects **Yes** → navigate to **Home screen**
- If user selects **Later** → return to **Lock / Authentication screen**

**Constraints:**
- Session-only
- Do NOT store the response
- Do NOT persist any state
- Do NOT infer or track anything
- Do NOT show again until next app launch

This is a **gentle pause**, not a security mechanism.

---

### 3. Last Confession Date
- Store a single date value
- Display prominently on the home screen
- Allow editing

---

### 4. Add Sin
- Free-text input only
- Do NOT automatically attach timestamps
- Save locally

---

### 5. Sin List
- Show sins added since last confession
- Sorted by insertion order (most recent first)
- Each entry shows text only

---

### 6. After Confession
- One button: **After Confession**
- Confirmation screen
- If confirmed → clear entire sin list

---

## Screens (Exactly 5)

1. Lock / Auth screen  
2. Privacy check screen (session-only gate)  
3. Home screen (date, list, add button, clear button)  
4. Add sin screen  
5. Confirm clear screen  

---

## Tech Stack Requirements
- PWA
- **TypeScript only**
- Beginner-friendly setup
- Clean folder structure
- Minimal dependencies
- No frameworks that hide logic excessively
- Explain biometric handling clearly

---

## What to Produce

1. Recommended tech stack (brief explanation)
2. Folder structure
3. Core data model
4. State flow explanation
5. Key TypeScript code snippets for:
   - Local storage
   - Biometric authentication
   - Privacy gate logic
   - Add / clear sins
6. Minimal UI layout (simple, calm, neutral)

---

## Tone & Style
- Calm
- Non-judgmental
- Spiritually respectful
- Beginner-friendly
- No unnecessary abstractions

If a feature is not explicitly listed above, **do not add it**.
