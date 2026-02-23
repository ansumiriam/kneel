import { verifyPin } from './storage';

const SESSION_KEY = 'kneel_session';

/**
 * Verify PIN and set session as authenticated.
 */
export function authenticateWithPin(input: string): boolean {
    return verifyPin(input);
}

/**
 * Mark the current session as authenticated (stored in sessionStorage —
 * automatically cleared when the PWA/tab is closed).
 */
export function setAuthenticated(value: boolean): void {
    if (value) {
        sessionStorage.setItem(SESSION_KEY, 'true');
    } else {
        sessionStorage.removeItem(SESSION_KEY);
    }
}

/**
 * Returns true if the user has authenticated in this session.
 */
export function isAuthenticated(): boolean {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
}

