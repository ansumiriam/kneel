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

      <div class="prepare-card" id="source-pdf">
        <span class="prepare-icon">📄</span>
        <div class="prepare-card-text">
          <span class="prepare-card-title">View Source PDF</span>
          <span class="prepare-card-desc">Based on '${CONTENT[getLanguage()].attribution.source}'</span>
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
            On a daily basis, I realize and regret certain things I’ve done. But if I don’t write them down, 
            I often forget them by the time I prepare for confession—whether it’s at the end of the month or even after a few months. 
            Then, only the major sins stand out in my mind, and those are the ones I confess.
          </p>
          <p class="about-text">
            God, in His mercy, has given us the beautiful opportunity to confess, be forgiven, and grow in purity. 
            But if I miss even the smaller sins I struggle with, I know I’m still far from the holiness I’m called to.
          </p>
          <p class="about-text">
            That’s why I created this app—to note down what I want to confess, and to keep track of the date of my last confession. 
            I truly hope it helps you as much as it has helped me.
          </p>
          <p class="about-text about-text--muted">
            Built with love for the faithful. Privacy is sacred.
          </p>
          
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

  container.querySelector('#source-pdf')?.addEventListener('click', () => {
    window.open(CONTENT[getLanguage()].attribution.url, '_blank');
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
