/**
 * Home Screen
 * Main screen with confession date, sin list, and actions
 */

import type { SinColor } from '../types';
import { getSins, getLastConfessionDate, setLastConfessionDate, getDaysSinceConfession, getShowReminder, deleteSin, restoreSin, updateSin, getColorLabels, getColorTaggingEnabled } from '../services/storage';
import { navigateTo } from '../utils/router';
import { showToast, showUndoToast } from '../services/toast';
import { addSwipeHandler } from '../utils/swipe';
import { setEditingSinId } from './EditSinScreen';

/**
 * Format date for display
 */
function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Tap to set';

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

/**
 * Get CSS class for sin color
 */
function getColorClass(color?: SinColor): string {
  if (!color || color === 'none') return '';
  return `sin-item--${color}`;
}

export function renderHomeScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--home';

  const sins = getSins();
  const lastDate = getLastConfessionDate();
  const daysSince = getDaysSinceConfession();
  const showReminder = getShowReminder();
  const colorLabels = getColorLabels();
  const colorTaggingEnabled = getColorTaggingEnabled();

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
          <div class="confession-value confession-value--clickable" id="date-trigger">
            <span id="date-display">${formatDate(lastDate)}</span>
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
             <p>No entries yet. Take your time.</p>
           </div>`
      : `<ul class="sin-list" id="sin-list">
             ${sins.map(sin => `
               <li class="sin-item ${getColorClass(sin.color)}" data-id="${sin.id}">
                 <div class="sin-item-content">
                   <span class="sin-text">${escapeHtml(sin.text)}</span>
                 </div>
                 ${colorTaggingEnabled ? `
                 <div class="sin-item-actions" hidden>
                   <button class="color-btn" data-color="none" title="No color">○</button>
                   <button class="color-btn color-btn--rose" data-color="rose" title="${colorLabels.rose}">●</button>
                   <button class="color-btn color-btn--amber" data-color="amber" title="${colorLabels.amber}">●</button>
                   <button class="color-btn color-btn--sage" data-color="sage" title="${colorLabels.sage}">●</button>
                   <button class="color-btn color-btn--sky" data-color="sky" title="${colorLabels.sky}">●</button>
                   <button class="color-btn color-btn--lavender" data-color="lavender" title="${colorLabels.lavender}">●</button>
                 </div>
                 ` : ''}
               </li>
             `).join('')}
           </ul>
           <p class="swipe-hint">Swipe left to edit, right to delete${colorTaggingEnabled ? '. Long press for colors.' : ''}</p>`
    }
    </main>

    <footer class="home-footer">
      <button class="btn btn--primary" id="add-btn">+ Add Entry</button>
      <button class="btn btn--secondary" id="clear-btn" ${sins.length === 0 ? 'disabled' : ''}>
        After Confession
      </button>
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
    const actionsDiv = item.querySelector('.sin-item-actions') as HTMLElement | null;

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

    // Long press for color picker (only if enabled)
    if (colorTaggingEnabled && actionsDiv) {
      let longPressTimer: number | null = null;

      const handleTouchStart = () => {
        longPressTimer = window.setTimeout(() => {
          actionsDiv.hidden = !actionsDiv.hidden;
        }, 500); // 500ms for long press
      };

      const handleTouchEnd = () => {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      };

      item.addEventListener('touchstart', handleTouchStart, { passive: true });
      item.addEventListener('touchend', handleTouchEnd, { passive: true });
      item.addEventListener('touchmove', handleTouchEnd, { passive: true });

      // Color button handlers
      const colorBtns = actionsDiv.querySelectorAll('.color-btn');
      colorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const color = (btn as HTMLElement).dataset.color as SinColor;
          updateSin(sinId, { color });

          // Update UI immediately
          item.className = `sin-item ${getColorClass(color)}`;
          actionsDiv.hidden = true;
          showToast('Color updated');
        });
      });
    }

    // Tap to expand/collapse long text
    const textSpan = item.querySelector('.sin-text') as HTMLElement;
    textSpan.addEventListener('click', (e) => {
      // Don't expand if color actions are visible
      if (actionsDiv && !actionsDiv.hidden) return;
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
