/**
 * Prayer Screen
 * Displays a single prayer (read-only)
 */

import { navigateTo } from '../utils/router';
import { CONTENT } from '../content/prayers';
import { getLanguage } from '../services/storage';

type PrayerType = 'before' | 'contrition';
let currentPrayer: PrayerType = 'before';

export function setCurrentPrayer(type: PrayerType): void {
  currentPrayer = type;
}

export function renderPrayerScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--prayer';

  const lang = getLanguage();
  const content = CONTENT[lang];
  const prayer = currentPrayer === 'before' ? content.prayerBefore : content.actOfContrition;

  container.innerHTML = `
    <main class="scroll-area prayer-content" lang="${lang}">
      <h1 class="prayer-title">${prayer.title}</h1>
      <div class="prayer-text" lang="${lang}">${formatPrayerText(prayer.content)}</div>
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
    // Detect headings (paragraphs wrapped in **)
    if (para.startsWith('**') && para.endsWith('**')) {
      return `<h3 class="content-heading">${para.replace(/\*\*/g, '')}</h3>`;
    }
    // Bold text
    para = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic text
    para = para.replace(/\*(.+?)\*/g, '<em>$1</em>');
    return `<p>${para}</p>`;
  }).join('');
}
