/**
 * Home Screen
 * Main screen with confession date, sin list, and actions
 */

import { getSins, getLastConfessionDate, setLastConfessionDate, getDaysSinceConfession, getShowReminder, deleteSin, restoreSin } from '../services/storage';
import { navigateTo } from '../utils/router';
import { showUndoToast } from '../services/toast';
import { addSwipeHandler } from '../utils/swipe';
import { setEditingSinId } from './EditSinScreen';
import { formatDate } from '../utils/date';






export function renderHomeScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--home';

  const sins = getSins();
  const lastDate = getLastConfessionDate();
  const daysSince = getDaysSinceConfession();
  const showReminder = getShowReminder();

  // Build days text if enabled
  let daysText = '';
  if (showReminder && daysSince !== null && daysSince > 0) {
    daysText = ` (${daysSince} day${daysSince !== 1 ? 's' : ''} ago)`;
  }

  container.innerHTML = `
    <header class="home-header">
      <div class="header-row">
        <div class="confession-date">
          <span class="confession-label">Last Confession</span>
          <div class="confession-value confession-value--clickable" id="date-trigger">
            <span id="date-display">${formatDate(lastDate)} ✏️${daysText}</span>
          </div>
          <input type="date" id="date-input" class="date-input" value="${lastDate || ''}" hidden />
        </div>
      </div>
    </header>

    <main class="scroll-area home-content">
      ${sins.length === 0
      ? `<div class="empty-state">
             <p>No entries yet. Take your time.</p>
           </div>`
      : `<ul class="sin-list" id="sin-list">
             ${sins.map(sin => `
               <li class="sin-item" data-id="${sin.id}">
                 <div class="sin-item-content">
                   <span class="sin-text">${escapeHtml(sin.text)}</span>
                 </div>
               </li>
             `).join('')}
           </ul>
           <p class="swipe-hint">Swipe left to edit, right to delete</p>`
    }
    </main>

    <footer class="home-footer">
      <div class="footer-grid">
        <button class="btn btn--primary" id="add-btn">+ Add Entry</button>
        <button class="btn btn--secondary" id="clear-btn" ${sins.length === 0 ? 'disabled' : ''}>Confessed?</button>
        <button class="btn btn--secondary" id="prepare-btn">📖 Prepare</button>
        <button class="btn btn--secondary" id="settings-btn">⚙️ Settings</button>
      </div>
    </footer>
  `;

  // Tap date to edit
  const dateTrigger = container.querySelector('#date-trigger') as HTMLElement;
  const dateDisplay = container.querySelector('#date-display') as HTMLSpanElement;
  const dateInput = container.querySelector('#date-input') as HTMLInputElement;

  dateTrigger.addEventListener('click', () => {
    dateInput.hidden = false;
    dateTrigger.hidden = true;
    dateInput.focus();
  });

  dateInput.addEventListener('change', () => {
    const newDate = dateInput.value;
    if (newDate) {
      setLastConfessionDate(newDate);
      dateDisplay.textContent = formatDate(newDate);
    }
    dateInput.hidden = true;
    dateTrigger.hidden = false;
  });

  dateInput.addEventListener('blur', () => {
    dateInput.hidden = true;
    dateTrigger.hidden = false;
  });


  // Set up handlers for each sin item
  const sinItems = container.querySelectorAll('.sin-item');
  sinItems.forEach(item => {
    const sinId = (item as HTMLElement).dataset.id!;

    // Swipe handlers
    addSwipeHandler(item as HTMLElement, {
      onSwipeLeft: () => {
        // Edit the entry
        setEditingSinId(sinId);
        navigateTo('edit-sin');
      },
      onSwipeRight: () => {
        // Delete with undo
        const deleted = deleteSin(sinId);
        if (deleted) {
          (item as HTMLElement).style.display = 'none';
          showUndoToast('Entry deleted', () => {
            restoreSin(deleted);
            navigateTo('home'); // Refresh
          });
        }
      }
    });

    // Tap to expand/collapse long text
    const textSpan = item.querySelector('.sin-text') as HTMLElement;
    textSpan.addEventListener('click', (e) => {
      e.stopPropagation();
      item.classList.toggle('sin-item--expanded');
    });
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

  // Header Prepare button
  container.querySelector('#prepare-btn')?.addEventListener('click', () => {
    navigateTo('prepare');
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
