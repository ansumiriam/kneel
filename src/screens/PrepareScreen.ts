/**
 * Prepare Screen
 * Entry point for prayers and preparation guide
 */

import { navigateTo } from '../utils/router';
import { ATTRIBUTION } from '../content/prayers';
import { setCurrentPrayer } from './PrayerScreen';

export function renderPrepareScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--prepare';

  container.innerHTML = `
    <header class="prepare-header">
      <button class="btn-back" id="back-btn" aria-label="Go back">← Back</button>
      <h1 class="prepare-title">Prepare</h1>
    </header>

    <main class="prepare-content">
      <div class="prepare-card" id="prayer-before">
        <span class="prepare-icon">📿</span>
        <div class="prepare-card-text">
          <span class="prepare-card-title">Prayer Before Confession</span>
          <span class="prepare-card-desc">Tap to read</span>
        </div>
      </div>

      <div class="prepare-card" id="act-contrition">
        <span class="prepare-icon">❤️</span>
        <div class="prepare-card-text">
          <span class="prepare-card-title">Act of Contrition</span>
          <span class="prepare-card-desc">Tap to read</span>
        </div>
      </div>

      <div class="prepare-card" id="prep-guide">
        <span class="prepare-icon">📖</span>
        <div class="prepare-card-text">
          <span class="prepare-card-title">Preparation Guide</span>
          <span class="prepare-card-desc">Swipe to read · Self-examination & Commandments</span>
        </div>
      </div>

      <div class="prepare-attribution">
        <span class="attribution-text">Source: ${ATTRIBUTION.source}</span>
        <a href="${ATTRIBUTION.url}" target="_blank" class="attribution-link">View Full PDF</a>
      </div>
    </main>
  `;

  // Back button
  container.querySelector('#back-btn')?.addEventListener('click', () => {
    navigateTo('home');
  });

  // Card click handlers
  container.querySelector('#prayer-before')?.addEventListener('click', () => {
    setCurrentPrayer('before');
    navigateTo('prayer');
  });

  container.querySelector('#act-contrition')?.addEventListener('click', () => {
    setCurrentPrayer('contrition');
    navigateTo('prayer');
  });

  container.querySelector('#prep-guide')?.addEventListener('click', () => {
    navigateTo('guide');
  });

  return container;
}
