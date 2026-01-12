/**
 * Main Application
 * Registers screens and initializes the app
 */

import { registerScreen, navigateTo } from './utils/router';
import { renderLockScreen } from './screens/LockScreen';
import { renderPrivacyCheckScreen } from './screens/PrivacyCheckScreen';
import { renderHomeScreen } from './screens/HomeScreen';
import { renderAddSinScreen } from './screens/AddSinScreen';
import { renderConfirmClearScreen } from './screens/ConfirmClearScreen';

/**
 * Initialize the application
 */
export function initApp(): void {
    // Register all screens
    registerScreen('lock', renderLockScreen);
    registerScreen('privacy-check', renderPrivacyCheckScreen);
    registerScreen('home', renderHomeScreen);
    registerScreen('add-sin', renderAddSinScreen);
    registerScreen('confirm-clear', renderConfirmClearScreen);

    // Start at lock screen
    navigateTo('lock');
}
