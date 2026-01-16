/**
 * Confirm Clear Screen
 * Confirmation before clearing all sins after confession
 */

import { clearSins, setLastConfessionDate } from '../services/storage';
import { navigateTo } from '../utils/router';
import { showToast } from '../services/toast';
import { getTodayISO } from '../utils/date';

export function renderConfirmClearScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--confirm';

  const today = getTodayISO();

  container.innerHTML = `
    <div class="confirm-content">
      <div class="confirm-icon">✓</div>
      <h1 class="confirm-title">Ready for a fresh start?</h1>
      <p class="confirm-subtitle">
        Have you completed your confession?<br>
        <strong>This will permanently delete all entries from your device.</strong>
      </p>

      <div class="confirm-date-section">
        <label for="confession-date" class="confirm-date-label">Date of Confession</label>
        <input type="date" id="confession-date" class="confirm-date-input" value="${today}" max="${today}" />
      </div>
      
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
    const dateInput = container.querySelector('#confession-date') as HTMLInputElement;
    const selectedDate = dateInput.value || today;

    clearSins();
    setLastConfessionDate(selectedDate);
    showToast('Entries cleared & date updated');
    navigateTo('home');
  });

  return container;
}
