/**
 * Settings Screen
 * User preferences including theme toggle
 */

import { getTheme, setTheme, getShowReminder, setShowReminder, getLanguage, setLanguage, getAuthSettings, setAuthMethod } from '../services/storage';
import { navigateTo } from '../utils/router';
import { isBiometricAvailable } from '../services/auth';

export function renderSettingsScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--settings';

  const currentTheme = getTheme();
  const showReminder = getShowReminder();
  const currentLanguage = getLanguage();
  const authSettings = getAuthSettings();
  const biometricPossible = isBiometricAvailable();

  container.innerHTML = `
    <main class="scroll-area settings-content">
      <div class="settings-spacer"></div>
      <h1 class="settings-title">Settings</h1>
      
      <div class="settings-section">
        <h2 class="settings-section-title">General</h2>
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

        <div class="settings-item settings-item--col">
          <div class="settings-label">
            <span class="settings-name">Language (Content)</span>
          </div>
          <div class="segment-control">
            <button class="segment-btn ${currentLanguage === 'en' ? 'segment-btn--active' : ''}" id="lang-en">English</button>
            <button class="segment-btn ${currentLanguage === 'ml' ? 'segment-btn--active' : ''}" id="lang-ml">മലയാളം</button>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h2 class="settings-section-title">Security</h2>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-name">Biometric Unlock</span>
            <span class="settings-desc">${biometricPossible ? 'Use FaceID/Fingerprint' : 'Not available on this device'}</span>
          </div>
          <label class="toggle">
            <input type="checkbox" id="biometric-toggle" ${authSettings.method === 'biometric' ? 'checked' : ''} ${!biometricPossible ? 'disabled' : ''} />
            <span class="toggle-slider"></span>
          </label>
        </div>
        
        <div class="settings-item" id="change-pin-item">
          <div class="settings-label">
            <span class="settings-name">Change PIN</span>
            <span class="settings-desc">Update your security code</span>
          </div>
          <button class="btn btn--secondary btn--sm" id="change-pin-btn">Update</button>
        </div>
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

  // Handle language selection
  container.querySelector('#lang-en')?.addEventListener('click', () => {
    setLanguage('en');
    navigateTo('settings');
  });

  container.querySelector('#lang-ml')?.addEventListener('click', () => {
    setLanguage('ml');
    navigateTo('settings');
  });

  // Handle biometric toggle
  const biometricToggle = container.querySelector('#biometric-toggle') as HTMLInputElement;
  biometricToggle?.addEventListener('change', () => {
    setAuthMethod(biometricToggle.checked ? 'biometric' : 'pin');
  });

  // Handle change PIN
  container.querySelector('#change-pin-btn')?.addEventListener('click', () => {
    navigateTo('setup-pin');
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
