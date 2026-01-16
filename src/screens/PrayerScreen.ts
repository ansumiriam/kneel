/**
 * Prayer Screen
 * Displays a single prayer (read-only)
 */

import { navigateTo } from '../utils/router';
import { PRAYER_BEFORE_CONFESSION, ACT_OF_CONTRITION } from '../content/prayers';

type PrayerType = 'before' | 'contrition';
let currentPrayer: PrayerType = 'before';

export function setCurrentPrayer(type: PrayerType): void {
  currentPrayer = type;
}

export function renderPrayerScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--prayer';

  const prayer = currentPrayer === 'before' ? PRAYER_BEFORE_CONFESSION : ACT_OF_CONTRITION;

  container.innerHTML = `
    <main class="prayer-content">
      <h1 class="prayer-title">${prayer.title}</h1>
      <div class="prayer-text">${formatPrayerText(prayer.content)}</div>
    </main>

    <footer class="screen-footer prayer-footer">
      <button class="btn btn--secondary" id="back-btn">← Back</button>
    </footer>
  `;

  // Navigation
  container.querySelector('#back-btn')?.addEventListener('click', () => {
    navigateTo('prepare');
  });

  return container;
}

/**
 * Format prayer text with line breaks and markdown-like syntax
 */
function formatPrayerText(text: string): string {
  return text.split('\n\n').map(para => {
    // Bold text
    para = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic text
    para = para.replace(/\*(.+?)\*/g, '<em>$1</em>');
    return `<p>${para}</p>`;
  }).join('');
}
