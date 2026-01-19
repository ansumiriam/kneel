/**
 * Settings Screen
 * User preferences including theme toggle
 */

import { getTheme, setTheme, getShowReminder, setShowReminder } from '../services/storage';
import { navigateTo } from '../utils/router';

export function renderSettingsScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--settings';

  const currentTheme = getTheme();
  const showReminder = getShowReminder();

  container.innerHTML = `
    <main class="scroll-area settings-content">
      <div class="settings-spacer"></div>
      <h1 class="settings-title">Settings</h1>
      
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

      <div class="settings-item">
        <div class="settings-label">
          <span class="settings-name">Gentle Reminder</span>
          <span class="settings-desc">Show days since confession</span>
        </div>
        <label class="toggle">
          <input type="checkbox" id="reminder-toggle" ${showReminder ? 'checked' : ''} />
          <span class="toggle-slider"></span>
        </label>
      </div>
    </main>

    <footer class="screen-footer settings-footer">
      <button class="btn btn--secondary" id="back-btn">← Back</button>
    </footer>
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

  // Handle reminder toggle
  const reminderToggle = container.querySelector('#reminder-toggle') as HTMLInputElement;
  reminderToggle.addEventListener('change', () => {
    setShowReminder(reminderToggle.checked);
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
