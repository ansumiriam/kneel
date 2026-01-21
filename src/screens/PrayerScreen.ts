/**
 * Prayer Screen
 * Displays a single prayer (read-only)
 */

import { navigateTo } from '../utils/router';
import { CONTENT } from '../content/prayers';
import { getLanguage } from '../services/storage';

import { addSwipeHandler } from '../utils/swipe';

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

  // Convert string content to array if needed
  const pages = Array.isArray(prayer.content) ? prayer.content : [prayer.content];
  let currentPage = 0;

  const renderPage = (direction: 'left' | 'right' | 'none' = 'none') => {
    const pageContent = pages[currentPage];
    const totalPages = pages.length;

    container.innerHTML = `
      <main class="guide-content ${direction !== 'none' ? `page-flip--${direction}` : ''}" id="prayer-main" lang="${lang}">
        ${currentPage === 0 ? `<h1 class="prayer-title">${prayer.title}</h1>` : ''}
        <div class="prayer-text" lang="${lang}">${formatPrayerText(pageContent)}</div>
      </main>

      <footer class="screen-footer prayer-footer">
        <button class="btn btn--secondary" id="back-btn">← Back</button>
        ${totalPages > 1 ? `
        <div class="guide-nav">
          <div class="guide-dots">
            ${generateDots(currentPage, totalPages)}
          </div>
        </div>
        <span class="guide-page-num">${currentPage + 1} &thinsp;/&thinsp; ${totalPages}</span>
        ` : ''}
      </footer>
    `;

    // Remove animation class
    setTimeout(() => {
      const mainEl = container.querySelector('#prayer-main');
      if (mainEl) {
        mainEl.classList.remove('page-flip--left', 'page-flip--right');
      }
    }, 300);

    // Navigation
    container.querySelector('#back-btn')?.addEventListener('click', () => {
      navigateTo('prepare');
    });

    // Swipe support
    const mainEl = container.querySelector('#prayer-main') as HTMLElement;
    addSwipeHandler(mainEl, {
      onSwipeLeft: () => {
        if (currentPage < totalPages - 1) {
          currentPage++;
          renderPage('left');
        }
      },
      onSwipeRight: () => {
        if (currentPage > 0) {
          currentPage--;
          renderPage('right');
        }
      }
    });
  };

  renderPage();
  return container;
}

/**
 * Format prayer text with line breaks and markdown-like syntax
 */
function formatPrayerText(text: string): string {
  return text.split('\n\n').map(para => {
    const trimmed = para.trim();
    // Detect headings (paragraphs wrapped in **)
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      return `<h3 class="content-heading">${trimmed.replace(/\*\*/g, '')}</h3>`;
    }

    // Bold text
    para = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic text
    para = para.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Bullet list items
    if (para.startsWith('• ')) {
      const items = para.split('\n').map(item => `<li>${item.replace('• ', '')}</li>`).join('');
      return `<ul>${items}</ul>`;
    }

    // Numbered list items (1. 2. 3. etc.)
    if (/^\d+\.\s/.test(para)) {
      const firstMatch = para.match(/^(\d+)\.\s/);
      const startNum = firstMatch ? firstMatch[1] : '1';
      const items = para.split('\n').map(item => `<li>${item.replace(/^\d+\.\s/, '')}</li>`).join('');
      return `<ol start="${startNum}">${items}</ol>`;
    }

    return `<p>${para}</p>`;
  }).join('');
}

/**
 * Generate dots for pagination
 */
function generateDots(current: number, total: number): string {
  const MAX_VISIBLE = 5;
  const dots: string[] = [];
  let start = Math.max(0, current - Math.floor(MAX_VISIBLE / 2));
  let end = Math.min(total, start + MAX_VISIBLE);
  if (end - start < MAX_VISIBLE) start = Math.max(0, end - MAX_VISIBLE);

  for (let i = start; i < end; i++) {
    const distance = Math.abs(i - current);
    let sizeClass = '';
    if (i === current) sizeClass = 'guide-dot--active';
    else if (distance === 1) sizeClass = 'guide-dot--near';
    else if (distance === 2) sizeClass = 'guide-dot--far';
    dots.push(`<span class="guide-dot ${sizeClass}"></span>`);
  }
  return dots.join('');
}
