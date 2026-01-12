/**
 * Settings Screen
 * User preferences including theme toggle
 */

import { getTheme, setTheme } from '../services/storage';
import { navigateTo } from '../utils/router';

export function renderSettingsScreen(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'screen screen--settings';

    const currentTheme = getTheme();

    container.innerHTML = `
    <header class="settings-header">
      <button class="btn-back" id="back-btn" aria-label="Go back">← Back</button>
      <h1 class="settings-title">Settings</h1>
    </header>

    <main class="settings-content">
      <div class="settings-item">
        <div class="settings-label">
          <span class="settings-name">Dark Mode</span>
          <span class="settings-desc">Use dark color theme</span>
        </div>
        <label class="toggle">
          <input type="checkbox" id="theme-toggle" ${currentTheme === 'dark' ? 'checked' : ''} />
          <span class="toggle-slider"></span>
        </label>
      </div>
    </main>
  `;

    // Handle back navigation
    container.querySelector('#back-btn')?.addEventListener('click', () => {
        navigateTo('home');
    });

    // Handle theme toggle
    const themeToggle = container.querySelector('#theme-toggle') as HTMLInputElement;
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
    });

    return container;
}

/**
 * Apply theme to document
 */
export function applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Initialize theme on app load
 */
export function initTheme(): void {
    const theme = getTheme();
    applyTheme(theme);
}
