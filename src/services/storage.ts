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
export function updateSin(id: string, updates: Partial<Pick<Sin, 'text' | 'color'>>): Sin | null {
    const state = getState();
    const sin = state.sins.find(s => s.id === id);
    if (!sin) return null;

    if (updates.text !== undefined) sin.text = updates.text;
    if (updates.color !== undefined) sin.color = updates.color;

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

// === Color Tagging ===

const COLOR_TAGGING_KEY = 'kneel_color_tagging';

/**
 * Get color tagging preference (disabled by default)
 */
export function getColorTaggingEnabled(): boolean {
    const stored = localStorage.getItem(COLOR_TAGGING_KEY);
    return stored === 'true'; // Default to disabled
}

/**
 * Set color tagging preference
 */
export function setColorTaggingEnabled(enabled: boolean): void {
    localStorage.setItem(COLOR_TAGGING_KEY, enabled ? 'true' : 'false');
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

// === Color Labels ===

const COLOR_LABELS_KEY = 'kneel_color_labels';

export interface ColorLabels {
    [key: string]: string;
    rose: string;
    amber: string;
    sage: string;
    sky: string;
    lavender: string;
}

const DEFAULT_COLOR_LABELS: ColorLabels = {
    rose: 'Repetitive',
    amber: 'Important',
    sage: 'Resolved',
    sky: 'Reflect',
    lavender: 'Other'
};

/**
 * Get color labels
 */
export function getColorLabels(): ColorLabels {
    const stored = localStorage.getItem(COLOR_LABELS_KEY);
    if (stored) {
        try {
            return { ...DEFAULT_COLOR_LABELS, ...JSON.parse(stored) };
        } catch {
            // Invalid JSON
        }
    }
    return DEFAULT_COLOR_LABELS;
}

/**
 * Set color labels
 */
export function setColorLabels(labels: Partial<ColorLabels>): void {
    const current = getColorLabels();
    localStorage.setItem(COLOR_LABELS_KEY, JSON.stringify({ ...current, ...labels }));
}
