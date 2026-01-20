/**
 * Sin entry stored locally
 */
export interface Sin {
    id: string;
    text: string;
    createdAt: number; // For ordering only, not displayed
    count?: number;
}

/**
 * Persistent app state (stored in LocalStorage)
 */
export interface AppState {
    lastConfessionDate: string | null; // ISO date string
    sins: Sin[];
    language: 'en' | 'ml';
    authMethod: 'pin';
    pin: string | null;
    securityQuestion: string | null;
    securityAnswer: string | null;
}

/**
 * Session state (NOT persisted, resets on app launch)
 */
export interface SessionState {
    isAuthenticated: boolean;
    hasPassedPrivacyCheck: boolean;
}

/**
 * Screen identifiers for routing
 */
export type ScreenId =
    | 'lock'
    | 'privacy-check'
    | 'home'
    | 'add-sin'
    | 'edit-sin'
    | 'confirm-clear'
    | 'settings'
    | 'prepare'
    | 'prayer'
    | 'guide'
    | 'setup-pin'
    | 'recover-pin';
