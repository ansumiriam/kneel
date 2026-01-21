/**
 * Prepare Screen
 * Entry point for prayers and preparation guide
 */

import { navigateTo } from '../utils/router';
import { CONTENT } from '../content/prayers';
import { getLanguage } from '../services/storage';
import { setCurrentPrayer } from './PrayerScreen';

export function renderPrepareScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--prepare';

  container.innerHTML = `
    <main class="scroll-area prepare-content">
      <h1 class="prepare-title">Prepare</h1>
      
      <div class="prepare-card" id="prayer-before">
        <span class="prepare-icon">🙏</span>
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

      <div class="prepare-card prepare-card--help" id="about-app">
        <span class="prepare-icon">❓</span>
        <div class="prepare-card-text">
          <span class="prepare-card-title">About This App</span>
          <span class="prepare-card-desc">Tap to learn more</span>
        </div>
      </div>

      <div class="about-panel" id="about-panel" hidden>
        <div class="about-content">
          <h2 class="about-title">About Kneel</h2>
          <p class="about-text">
            <strong>Kneel</strong> is a simple, private space to prepare for confession. 
            Your entries stay on your device — no accounts, no sync, no cloud.
          </p>
          <p class="about-text">
            <strong>The idea:</strong> Many of us forget what to confess by the time we reach 
            the confessional. This app is a quiet place to jot things down as they come to mind, 
            without judgment or tracking.
          </p>
          <p class="about-text">
            <strong>After confession,</strong> clear your entries with a single tap. 
            The app updates your confession date and gives you a fresh start.
          </p>
          <p class="about-text about-text--muted">
            Built with love for the faithful. Privacy is sacred.
          </p>
          <div class="prepare-attribution">
            <span class="attribution-text">Source: ${CONTENT[getLanguage()].attribution.source}</span>
            <a href="${CONTENT[getLanguage()].attribution.url}" target="_blank" class="attribution-link">View Full PDF</a>
          </div>
          <button class="btn btn--secondary about-close" id="about-close">Close</button>
        </div>
      </div>


    </main>

    <footer class="screen-footer prepare-footer">
      <button class="btn btn--secondary" id="back-btn">← Back</button>
    </footer>
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

  // About panel
  const aboutPanel = container.querySelector('#about-panel') as HTMLElement;
  container.querySelector('#about-app')?.addEventListener('click', () => {
    aboutPanel.hidden = false;
  });

  container.querySelector('#about-close')?.addEventListener('click', () => {
    aboutPanel.hidden = true;
  });

  return container;
}
