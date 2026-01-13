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
    <header class="prayer-header">
      <button class="btn-back" id="back-btn" aria-label="Go back">← Back</button>
      <h1 class="prayer-title">${prayer.title}</h1>
    </header>

    <main class="prayer-content">
      <div class="prayer-text">${formatPrayerText(prayer.content)}</div>
    </main>

    <nav class="bottom-nav">
      <button class="nav-tab" id="nav-home">
        <span class="nav-icon">🏠</span>
        <span class="nav-label">Home</span>
      </button>
      <button class="nav-tab nav-tab--active" id="nav-prepare">
        <span class="nav-icon">📖</span>
        <span class="nav-label">Prepare</span>
      </button>
    </nav>
  `;

    // Navigation
    container.querySelector('#back-btn')?.addEventListener('click', () => {
        navigateTo('prepare');
    });

    container.querySelector('#nav-home')?.addEventListener('click', () => {
        navigateTo('home');
    });

    container.querySelector('#nav-prepare')?.addEventListener('click', () => {
        navigateTo('prepare');
    });

    return container;
}

/**
 * Format prayer text with line breaks
 */
function formatPrayerText(text: string): string {
    return text.split('\n\n').map(para => `<p>${para}</p>`).join('');
}
