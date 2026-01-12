/**
 * Home Screen
 * Main screen with confession date, sin list, and actions
 */

import { getSins, getLastConfessionDate, setLastConfessionDate, getDaysSinceConfession, getShowReminder } from '../services/storage';
import { navigateTo } from '../utils/router';

/**
 * Format date for display
 */
function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Not set';

  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return 'Invalid date';
  }
}

/**
 * Get reminder level based on days (for progressive color)
 */
function getReminderLevel(days: number): 'calm' | 'gentle' | 'warm' {
  if (days <= 7) return 'calm';
  if (days <= 14) return 'gentle';
  return 'warm';
}

export function renderHomeScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--home';

  const sins = getSins();
  const lastDate = getLastConfessionDate();
  const daysSince = getDaysSinceConfession();
  const showReminder = getShowReminder();

  // Build reminder HTML if enabled
  let reminderHtml = '';
  if (showReminder && daysSince !== null && (daysSince > 0 || sins.length > 0)) {
    const level = getReminderLevel(daysSince);
    reminderHtml = `
      <div class="reminder reminder--${level}">
        <span class="reminder-days">${daysSince} day${daysSince !== 1 ? 's' : ''} ago</span>
        ${sins.length > 0 ? `<span class="reminder-entries">${sins.length} entr${sins.length !== 1 ? 'ies' : 'y'}</span>` : ''}
      </div>
    `;
  }

  container.innerHTML = `
    <header class="home-header">
      <div class="header-row">
        <div class="confession-date">
          <span class="confession-label">Last Confession</span>
          <div class="confession-value">
            <span id="date-display">${formatDate(lastDate)}</span>
            <button class="btn-icon" id="edit-date-btn" aria-label="Edit date">✏️</button>
          </div>
          <input type="date" id="date-input" class="date-input" value="${lastDate || ''}" hidden />
          ${reminderHtml}
        </div>
        <button class="btn-icon settings-btn" id="settings-btn" aria-label="Settings">⚙️</button>
      </div>
    </header>

    <main class="home-content">
      ${sins.length === 0
      ? `<div class="empty-state">
             <p>No entries yet.</p>
           </div>`
      : `<ul class="sin-list">
             ${sins.map(sin => `
               <li class="sin-item">${escapeHtml(sin.text)}</li>
             `).join('')}
           </ul>`
    }
    </main>

    <footer class="home-footer">
      <button class="btn btn--primary" id="add-btn">+ Add Entry</button>
      <button class="btn btn--secondary" id="clear-btn" ${sins.length === 0 ? 'disabled' : ''}>
        After Confession
      </button>
    </footer>
  `;

  // Edit date functionality
  const dateDisplay = container.querySelector('#date-display') as HTMLSpanElement;
  const dateInput = container.querySelector('#date-input') as HTMLInputElement;
  const editBtn = container.querySelector('#edit-date-btn') as HTMLButtonElement;

  editBtn.addEventListener('click', () => {
    dateInput.hidden = false;
    dateDisplay.hidden = true;
    editBtn.hidden = true;
    dateInput.focus();
  });

  dateInput.addEventListener('change', () => {
    const newDate = dateInput.value;
    if (newDate) {
      setLastConfessionDate(newDate);
      dateDisplay.textContent = formatDate(newDate);
    }
    dateInput.hidden = true;
    dateDisplay.hidden = false;
    editBtn.hidden = false;
  });

  dateInput.addEventListener('blur', () => {
    dateInput.hidden = true;
    dateDisplay.hidden = false;
    editBtn.hidden = false;
  });

  // Navigation buttons
  container.querySelector('#add-btn')?.addEventListener('click', () => {
    navigateTo('add-sin');
  });

  container.querySelector('#clear-btn')?.addEventListener('click', () => {
    navigateTo('confirm-clear');
  });

  container.querySelector('#settings-btn')?.addEventListener('click', () => {
    navigateTo('settings');
  });

  return container;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
