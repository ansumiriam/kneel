/**
 * Main Application
 * Registers screens and initializes the app
 */

import { registerScreen, navigateTo } from './utils/router';
import { renderLockScreen } from './screens/LockScreen';
import { renderPrivacyCheckScreen } from './screens/PrivacyCheckScreen';
import { renderHomeScreen } from './screens/HomeScreen';
import { renderAddSinScreen } from './screens/AddSinScreen';
import { renderEditSinScreen } from './screens/EditSinScreen';
import { renderConfirmClearScreen } from './screens/ConfirmClearScreen';
import { renderSettingsScreen, initTheme } from './screens/SettingsScreen';

/**
 * Initialize the application
 */
export function initApp(): void {
    // Initialize theme (dark by default)
    initTheme();

    // Register all screens
    registerScreen('lock', renderLockScreen);
    registerScreen('privacy-check', renderPrivacyCheckScreen);
    registerScreen('home', renderHomeScreen);
    registerScreen('add-sin', renderAddSinScreen);
    registerScreen('edit-sin', renderEditSinScreen);
    registerScreen('confirm-clear', renderConfirmClearScreen);
    registerScreen('settings', renderSettingsScreen);

    // Start at lock screen
    navigateTo('lock');
}
