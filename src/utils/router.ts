/**
 * Simple Router
 * Handles screen navigation without external dependencies
 */

import type { ScreenId } from '../types';

type RenderFunction = () => HTMLElement;

const routes: Map<ScreenId, RenderFunction> = new Map();
let currentScreen: ScreenId | null = null;

/**
 * Register a screen renderer
 */
export function registerScreen(id: ScreenId, render: RenderFunction): void {
    routes.set(id, render);
}

/**
 * Navigate to a screen
 */
export function navigateTo(screenId: ScreenId): void {
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

    // Clear and render new screen
    app.innerHTML = '';
    app.appendChild(render());
    currentScreen = screenId;
}

/**
 * Get the current screen ID
 */
export function getCurrentScreen(): ScreenId | null {
    return currentScreen;
}
