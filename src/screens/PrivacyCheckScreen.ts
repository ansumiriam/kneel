/**
 * Privacy Check Screen
 * Session-only gate before home screen
 */

import { navigateTo } from '../utils/router';

export function renderPrivacyCheckScreen(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'screen screen--privacy';

    container.innerHTML = `
    <div class="privacy-content">
      <h1 class="privacy-title">This is a private moment.</h1>
      <p class="privacy-subtitle">Are you in a place where you can reflect freely?</p>
      
      <div class="privacy-actions">
        <button class="btn btn--primary" id="yes-btn">Yes</button>
        <button class="btn btn--secondary" id="later-btn">Later</button>
      </div>
    </div>
  `;

    // Handle Yes - proceed to home
    container.querySelector('#yes-btn')?.addEventListener('click', () => {
        navigateTo('home');
    });

    // Handle Later - return to lock
    container.querySelector('#later-btn')?.addEventListener('click', () => {
        navigateTo('lock');
    });

    return container;
}
