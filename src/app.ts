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
import { renderPrepareScreen } from './screens/PrepareScreen';
import { renderPrayerScreen } from './screens/PrayerScreen';
import { renderGuideScreen } from './screens/GuideScreen';
import { renderSetupPinScreen } from './screens/SetupPinScreen';
import { renderRecoverPinScreen } from './screens/RecoverPinScreen';

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
    registerScreen('prepare', renderPrepareScreen);
    registerScreen('prayer', renderPrayerScreen);
    registerScreen('guide', renderGuideScreen);
    registerScreen('setup-pin', renderSetupPinScreen);
    registerScreen('recover-pin', renderRecoverPinScreen);

    // Start at lock screen
    navigateTo('lock');
}
