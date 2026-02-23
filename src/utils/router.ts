import { route } from 'preact-router';
import type { ScreenId } from '../types';

let navigationState: any = null;

// Map screen IDs to their route paths
const screenPaths: Record<ScreenId, string> = {
    'lock': '/',
    'welcome': '/welcome',
    'home': '/home',
    'privacy-check': '/privacy-check',
    'add-sin': '/add-sin',
    'edit-sin': '/edit-sin',
    'confirm-clear': '/confirm-clear',
    'settings': '/settings',
    'prepare': '/prepare',
    'prayer': '/prayer',
    'guide': '/guide',
    'setup-pin': '/setup-pin',
    'recover-pin': '/recover-pin'
};

const BASE_URL = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL.slice(0, -1) : import.meta.env.BASE_URL;

export function navigateTo(screenId: ScreenId, state: any = null, shouldPush: boolean = true): void {
    navigationState = state;
    const path = screenPaths[screenId];
    if (path) {
        // Prepend BASE_URL to the path
        const fullPath = `${BASE_URL}${path}`;
        route(fullPath, !shouldPush);
    } else {
        console.error(`Unknown screen ID: ${screenId}`);
    }
}

export function getNavigationState(): any {
    return navigationState;
}

export function clearNavigationState(): void {
    navigationState = null;
}
