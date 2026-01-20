import { getAuthSettings, verifyPin, setCredentialId } from './storage';

/**
 * Check if biometric authentication is available
 */
export async function isBiometricAvailable(): Promise<boolean> {
    if (typeof window.PublicKeyCredential === 'undefined') return false;

    try {
        return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
        return false;
    }
}

/**
 * Register the device for biometric authentication
 * Returns true if registration succeeds
 */
export async function registerBiometrics(): Promise<boolean> {
    try {
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        const userID = 'kneel-user-' + Math.random().toString(36).substring(2, 11);

        const createCredentialOptions: CredentialCreationOptions = {
            publicKey: {
                challenge,
                rp: { name: "Kneel" },
                user: {
                    id: new TextEncoder().encode(userID),
                    name: "user@kneel.local",
                    displayName: "Kneel User"
                },
                pubKeyCredParams: [{ alg: -7, type: "public-key" }], // ES256
                authenticatorSelection: {
                    authenticatorAttachment: "platform",
                    userVerification: "required",
                    requireResidentKey: false
                },
                timeout: 60000
            }
        };

        const credential = await navigator.credentials.create(createCredentialOptions) as PublicKeyCredential;
        if (credential) {
            const rawId = credential.rawId;
            const idString = btoa(String.fromCharCode(...new Uint8Array(rawId)));
            setCredentialId(idString);
            return true;
        }
        return false;
    } catch (err) {
        console.error('Biometric registration failed:', err);
        return false;
    }
}

/**
 * Attempt biometric authentication using WebAuthn
 * Returns true if authentication succeeds
 */
export async function authenticateBiometric(): Promise<boolean> {
    const settings = getAuthSettings();
    if (settings.method !== 'biometric' || !settings.credentialId) return false;

    try {
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        const binaryId = Uint8Array.from(atob(settings.credentialId), c => c.charCodeAt(0));

        const getAssertionOptions: CredentialRequestOptions = {
            publicKey: {
                challenge,
                allowCredentials: [{
                    id: binaryId,
                    type: "public-key"
                }],
                userVerification: "required",
                timeout: 60000
            }
        };

        const assertion = await navigator.credentials.get(getAssertionOptions);
        return !!assertion;
    } catch (err) {
        console.error('Biometric authentication failed:', err);
        return false;
    }
}

/**
 * Verify PIN entry
 */
export function authenticateWithPin(input: string): boolean {
    return verifyPin(input);
}
