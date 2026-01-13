/**
 * Settings Screen
 * User preferences including theme toggle
 */

import { getTheme, setTheme, getShowReminder, setShowReminder, getColorTaggingEnabled, setColorTaggingEnabled } from '../services/storage';
import { navigateTo } from '../utils/router';

export function renderSettingsScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--settings';

  const currentTheme = getTheme();
  const showReminder = getShowReminder();
  const colorTaggingEnabled = getColorTaggingEnabled();

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

      <div class="settings-item">
        <div class="settings-label">
          <span class="settings-name">Gentle Reminder</span>
          <span class="settings-desc">Show days since confession & entry count</span>
        </div>
        <label class="toggle">
          <input type="checkbox" id="reminder-toggle" ${showReminder ? 'checked' : ''} />
          <span class="toggle-slider"></span>
        </label>
      </div>

      <div class="settings-item">
        <div class="settings-label">
          <span class="settings-name">Color Tagging</span>
          <span class="settings-desc">Long press entries to add color tags</span>
        </div>
        <label class="toggle">
          <input type="checkbox" id="color-toggle" ${colorTaggingEnabled ? 'checked' : ''} />
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

  // Handle reminder toggle
  const reminderToggle = container.querySelector('#reminder-toggle') as HTMLInputElement;
  reminderToggle.addEventListener('change', () => {
    setShowReminder(reminderToggle.checked);
  });

  // Handle color tagging toggle
  const colorToggle = container.querySelector('#color-toggle') as HTMLInputElement;
  colorToggle.addEventListener('change', () => {
    setColorTaggingEnabled(colorToggle.checked);
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
