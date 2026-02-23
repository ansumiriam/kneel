/**
 * Local Storage Service
 * Handles all persistent data operations
 */

import type { Sin, AppState } from '../types';
import { getDaysSinceConfession as calculateDays } from '../utils/date';

const STORAGE_KEY = 'kneel_data';

/**
 * Generate a simple UUID
 */
function generateId(): string {
    return crypto.randomUUID();
}

/**
 * Get the current app state from LocalStorage
 */
function getState(): AppState {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            // Invalid JSON, return default
        }
    }
    return {
        lastConfessionDate: null,
        sins: [],
        language: 'en',
        authMethod: 'pin',
        pin: null,
        securityQuestion: null,
        securityAnswer: null
    };
}

/**
 * Save app state to LocalStorage
 */
function saveState(state: AppState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// === Sins ===

/**
 * Get all sins, sorted by most recent first
 */
export function getSins(): Sin[] {
    const state = getState();
    return [...state.sins].sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Add a new sin
 */
export function addSin(text: string): Sin {
    const state = getState();
    const sin: Sin = {
        id: generateId(),
        text: text.trim(),
        createdAt: Date.now()
    };
    state.sins.push(sin);
    saveState(state);
    return sin;
}

/**
 * Clear all sins (after confession)
 */
export function clearSins(): void {
    const state = getState();
    state.sins = [];
    saveState(state);
}

/**
 * Delete a single sin by ID
 */
export function deleteSin(id: string): Sin | null {
    const state = getState();
    const index = state.sins.findIndex(s => s.id === id);
    if (index === -1) return null;

    const [deleted] = state.sins.splice(index, 1);
    saveState(state);
    return deleted;
}

/**
 * Restore a deleted sin
 */
export function restoreSin(sin: Sin): void {
    const state = getState();
    state.sins.push(sin);
    saveState(state);
}

/**
 * Update a sin's properties
 */
export function updateSin(id: string, updates: Partial<Pick<Sin, 'text'>>): Sin | null {
    const state = getState();
    const sin = state.sins.find(s => s.id === id);
    if (!sin) return null;

    if (updates.text !== undefined) sin.text = updates.text;

    saveState(state);
    return sin;
}

/**
 * Toggle the repeated status of a sin
 */
export function toggleSinRepeated(id: string): Sin | null {
    const state = getState();
    const sin = state.sins.find(s => s.id === id);
    if (!sin) return null;

    sin.isRepeated = !sin.isRepeated;

    saveState(state);
    return sin;
}

// === Last Confession Date ===

/**
 * Get the last confession date
 */
export function getLastConfessionDate(): string | null {
    return getState().lastConfessionDate;
}

/**
 * Set the last confession date
 */
export function setLastConfessionDate(date: string): void {
    const state = getState();
    state.lastConfessionDate = date;
    saveState(state);
}

// === Theme ===

const THEME_KEY = 'kneel_theme';

/**
 * Get the current theme (dark is default)
 */
export function getTheme(): 'light' | 'dark' {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
        return stored;
    }
    return 'dark'; // Default to dark
}

/**
 * Set the theme
 */
export function setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem(THEME_KEY, theme);
}

// === Gentle Reminder ===

const REMINDER_KEY = 'kneel_reminder';

/**
 * Get reminder preference (enabled by default)
 */
export function getShowReminder(): boolean {
    const stored = localStorage.getItem(REMINDER_KEY);
    if (stored === 'false') {
        return false;
    }
    return true; // Default to enabled
}

/**
 * Set reminder preference
 */
export function setShowReminder(show: boolean): void {
    localStorage.setItem(REMINDER_KEY, show ? 'true' : 'false');
}

// === Prayer Visibility ===

const SHOW_PRAYERS_KEY = 'kneel_show_prayers';

export function getShowPrayers(): boolean {
    const stored = localStorage.getItem(SHOW_PRAYERS_KEY);
    return stored === 'true'; // Default false
}

export function setShowPrayers(show: boolean): void {
    localStorage.setItem(SHOW_PRAYERS_KEY, show ? 'true' : 'false');
}

// === Language ===

/**
 * Get current language (default to English)
 */
export function getLanguage(): 'en' | 'ml' {
    return getState().language || 'en';
}

/**
 * Set current language
 */
export function setLanguage(lang: 'en' | 'ml'): void {
    const state = getState();
    state.language = lang;
    saveState(state);
}

export function getAuthSettings() {
    const state = getState();
    return {
        method: state.authMethod,
        isPinSet: !!state.pin,
        question: state.securityQuestion
    };
}

export function setAuthMethod(method: 'pin'): void {
    const state = getState();
    state.authMethod = method;
    saveState(state);
}

export function setPin(pin: string): void {
    const state = getState();
    state.pin = pin;
    saveState(state);
}

export function verifyPin(input: string): boolean {
    return getState().pin === input;
}

export function setSecurityQuestion(question: string, answer: string): void {
    const state = getState();
    state.securityQuestion = question;
    state.securityAnswer = answer.toLowerCase().trim();
    saveState(state);
}

export function verifySecurityAnswer(answer: string): boolean {
    const state = getState();
    return state.securityAnswer === answer.toLowerCase().trim();
}




/**
 * Calculate days since last confession
 */
export function getDaysSinceConfession(): number | null {
    const dateStr = getLastConfessionDate();
    return calculateDays(dateStr);
}

// === Welcome Screen ===

const WELCOMED_KEY = 'kneel_welcomed';

/**
 * Has the user seen the welcome screen before?
 */
export function hasSeenWelcome(): boolean {
    return localStorage.getItem(WELCOMED_KEY) === 'true';
}

/**
 * Mark the welcome screen as seen (one-time flag)
 */
export function markWelcomeSeen(): void {
    localStorage.setItem(WELCOMED_KEY, 'true');
}
