import { getAuthSettings, verifyPin } from './storage';

/**
 * Check if biometric authentication is available
 */
export function isBiometricAvailable(): boolean {
    return !!window.PublicKeyCredential;
}

/**
 * Attempt biometric authentication
 * Returns true if authentication succeeds
 */
export async function authenticateBiometric(): Promise<boolean> {
    const settings = getAuthSettings();
    if (settings.method !== 'biometric') return false;

    // Placeholder for actual WebAuthn credential assertion
    // In a real PWA context, this would involve navigator.credentials.get()
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000); // Simulate delay
    });
}

/**
 * Verify PIN entry
 */
export function authenticateWithPin(input: string): boolean {
    return verifyPin(input);
}
