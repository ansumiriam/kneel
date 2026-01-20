/**
 * Simple Router
 * Handles screen navigation without external dependencies
 */

import type { ScreenId } from '../types';
import { renderSettingsScreen } from '../screens/SettingsScreen';
import { renderPrepareScreen } from '../screens/PrepareScreen';
import { renderPrayerScreen } from '../screens/PrayerScreen';
import { renderGuideScreen } from '../screens/GuideScreen';
import { renderSetupPinScreen } from '../screens/SetupPinScreen';
import { renderRecoverPinScreen } from '../screens/RecoverPinScreen';

type RenderFunction = () => HTMLElement;

const routes: Map<ScreenId, RenderFunction> = new Map();
let currentScreen: ScreenId | null = null;
let navigationState: any = null;

/**
 * Register a screen renderer
 */
export function registerScreen(id: ScreenId, render: RenderFunction): void {
    routes.set(id, render);
}

// Register all screens
registerScreen('settings', renderSettingsScreen);
registerScreen('prepare', renderPrepareScreen);
registerScreen('prayer', renderPrayerScreen);
registerScreen('guide', renderGuideScreen);
registerScreen('setup-pin', renderSetupPinScreen);
registerScreen('recover-pin', renderRecoverPinScreen);

/**
 * Navigate to a screen with optional state
 */
export function navigateTo(screenId: ScreenId, state: any = null): void {
    const render = routes.get(screenId);
    if (!render) {
        console.error(`Screen not found: ${screenId}`);
        return;
    }

    const app = document.getElementById('app');
    if (!app) {
        console.error('App container not found');
        return;
    }

    navigationState = state;

    // Clear and render new screen
    app.innerHTML = '';
    app.appendChild(render());
    currentScreen = screenId;
}

/**
 * Get the current navigation state
 */
export function getNavigationState(): any {
    return navigationState;
}

/**
 * Clear the navigation state
 */
export function clearNavigationState(): void {
    navigationState = null;
}

/**
 * Get the current screen ID
 */
export function getCurrentScreen(): ScreenId | null {
    return currentScreen;
}
