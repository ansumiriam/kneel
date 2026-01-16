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

/**
 * Build color picker HTML with selected indicator
 */
function buildColorPicker(currentColor: SinColor | undefined, colorLabels: { [key: string]: string }): string {
  const colors: SinColor[] = ['none', 'rose', 'amber', 'sage', 'sky', 'lavender'];
  const selectedColor = currentColor || 'none';

  return `
    <div class="sin-item-actions" hidden>
      <div class="color-picker-row">
        ${colors.map(color => `
          <button class="color-btn ${color !== 'none' ? `color-btn--${color}` : ''} ${selectedColor === color ? 'color-btn--selected' : ''}" 
                  data-color="${color}" 
                  title="${color === 'none' ? 'No color' : colorLabels[color] || color}">
            ${color === 'none' ? '○' : '●'}
          </button>
        `).join('')}
        <button class="color-btn color-btn--close" title="Close">✕</button>
      </div>
    </div>
  `;
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
  if (showReminder && daysSince !== null && daysSince > 0) {
    const level = getReminderLevel(daysSince);
    reminderHtml = `
      <div class="reminder reminder--${level}">
        <span class="reminder-days">${daysSince} day${daysSince !== 1 ? 's' : ''} since last confession</span>
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
      </div>
    </header>

    <main class="home-content">
      ${sins.length === 0
      ? `<div class="empty-state">
             <p>No entries yet. Take your time.</p>
           </div>`
      : `<ul class="sin-list" id="sin-list">
             ${sins.map(sin => `
               <li class="sin-item ${getColorClass(sin.color)}" data-id="${sin.id}" data-color="${sin.color || 'none'}">
                 <div class="sin-item-content">
                   <span class="sin-text">${escapeHtml(sin.text)}</span>
                 </div>
                 ${colorTaggingEnabled ? buildColorPicker(sin.color, colorLabels) : ''}
               </li>
             `).join('')}
           </ul>
           <p class="swipe-hint">Swipe left to edit, right to delete${colorTaggingEnabled ? '. Long press for colors.' : ''}</p>`
    }
    </main>

    <footer class="home-footer">
      <div class="footer-grid">
        <button class="btn btn--primary" id="add-btn">+ Add Entry</button>
        <button class="btn btn--secondary" id="clear-btn" ${sins.length === 0 ? 'disabled' : ''}>After Confession</button>
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

  // Helper to close all color pickers
  const closeAllPickers = () => {
    container.querySelectorAll('.sin-item-actions').forEach(el => {
      (el as HTMLElement).hidden = true;
    });
  };

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
          // Close other pickers first
          closeAllPickers();
          // Show this picker
          actionsDiv.hidden = false;
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

      // Close button handler
      const closeBtn = actionsDiv.querySelector('.color-btn--close');
      closeBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        actionsDiv.hidden = true;
      });

      // Color button handlers
      const colorBtns = actionsDiv.querySelectorAll('.color-btn:not(.color-btn--close)');
      colorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const color = (btn as HTMLElement).dataset.color as SinColor;
          updateSin(sinId, { color });

          // Update UI immediately
          item.className = `sin-item ${getColorClass(color)}`;
          (item as HTMLElement).dataset.color = color;

          // Update selected indicator
          actionsDiv.querySelectorAll('.color-btn').forEach(b => b.classList.remove('color-btn--selected'));
          btn.classList.add('color-btn--selected');

          // Close picker after selection
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
