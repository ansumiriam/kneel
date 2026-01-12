/**
 * Local Storage Service
 * Handles all persistent data operations
 */

import type { Sin, AppState } from '../types';

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
        sins: []
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

/**
 * Calculate days since last confession
 */
export function getDaysSinceConfession(): number | null {
    const dateStr = getLastConfessionDate();
    if (!dateStr) return null;

    const confessionDate = new Date(dateStr);
    const today = new Date();
    const diffTime = today.getTime() - confessionDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
