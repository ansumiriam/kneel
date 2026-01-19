/**
 * Entry Point
 * Initializes styles and starts the application
 */

import './styles/main.css';
import { initApp } from './app';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initApp();

    // Prevent undesirable mobile browser behaviors (pull-to-refresh, overscroll bounce)
    // while still allowing scrolling within our designated .scroll-area elements.
    document.body.addEventListener('touchmove', (e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.scroll-area')) {
            return; // Allow scrolling in designated areas
        }
        // Prevent default behavior (scroll/bounce) for everything else
        if (e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false });
});
