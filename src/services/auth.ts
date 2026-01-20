import { getAuthSettings, verifyPin } from './storage';

/**
 * Verify PIN entry
 */
export function authenticateWithPin(input: string): boolean {
    return verifyPin(input);
}
