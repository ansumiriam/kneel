import { route } from 'preact-router';
import type { ScreenId } from '../types';

let navigationState: any = null;

// Map screen IDs to their route paths
const screenPaths: Record<ScreenId, string> = {
    'lock': '/',
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

export function navigateTo(screenId: ScreenId, state: any = null, shouldPush: boolean = true): void {
    navigationState = state;
    const path = screenPaths[screenId];
    if (path) {
        route(path, !shouldPush);
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
