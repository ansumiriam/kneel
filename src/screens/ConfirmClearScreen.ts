/**
 * Confirm Clear Screen
 * Confirmation before clearing all sins after confession
 */

import { clearSins, setLastConfessionDate } from '../services/storage';
import { navigateTo } from '../utils/router';

/**
 * Get today's date in ISO format
 */
function getTodayISO(): string {
    return new Date().toISOString().split('T')[0];
}

export function renderConfirmClearScreen(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'screen screen--confirm';

    container.innerHTML = `
    <div class="confirm-content">
      <div class="confirm-icon">✓</div>
      <h1 class="confirm-title">After Confession</h1>
      <p class="confirm-subtitle">
        This will clear all entries and update your confession date to today.
      </p>
      
      <div class="confirm-actions">
        <button class="btn btn--secondary" id="cancel-btn">Cancel</button>
        <button class="btn btn--primary" id="confirm-btn">Confirm</button>
      </div>
    </div>
  `;

    // Handle cancel
    container.querySelector('#cancel-btn')?.addEventListener('click', () => {
        navigateTo('home');
    });

    // Handle confirm
    container.querySelector('#confirm-btn')?.addEventListener('click', () => {
        clearSins();
        setLastConfessionDate(getTodayISO());
        navigateTo('home');
    });

    return container;
}
