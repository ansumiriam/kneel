/**
 * Guide Screen
 * Swipeable preparation guide pages with page flip animation
 */

import { navigateTo } from '../utils/router';
import { PREPARATION_GUIDE_PAGES, ATTRIBUTION } from '../content/prayers';

let currentPage = 0;

export function renderGuideScreen(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'screen screen--guide';

    const renderPage = (direction: 'left' | 'right' | 'none' = 'none') => {
        const page = PREPARATION_GUIDE_PAGES[currentPage];
        const totalPages = PREPARATION_GUIDE_PAGES.length;

        container.innerHTML = `
      <header class="guide-header">
        <button class="btn-back" id="back-btn" aria-label="Go back">← Back</button>
        <span class="guide-title-text">${page.title}</span>
      </header>

      <main class="guide-content ${direction !== 'none' ? `page-flip--${direction}` : ''}" id="guide-main">
        <div class="guide-text">${formatGuideText(page.content)}</div>
      </main>

      <footer class="guide-footer">
        <div class="guide-dots">
          ${Array.from({ length: totalPages }, (_, i) =>
            `<span class="guide-dot ${i === currentPage ? 'guide-dot--active' : ''}"></span>`
        ).join('')}
        </div>
        <span class="guide-page-num">${currentPage + 1} / ${totalPages}</span>
        <a href="${ATTRIBUTION.url}" target="_blank" class="guide-source-link">Source: Malankara Library</a>
      </footer>
    `;

        // Remove animation class after it completes
        setTimeout(() => {
            const mainEl = container.querySelector('#guide-main');
            if (mainEl) {
                mainEl.classList.remove('page-flip--left', 'page-flip--right');
            }
        }, 300);

        // Back button handler
        container.querySelector('#back-btn')?.addEventListener('click', () => {
            currentPage = 0;
            navigateTo('prepare');
        });

        // Swipe support
        setupSwipe(container.querySelector('#guide-main') as HTMLElement);
    };

    const setupSwipe = (element: HTMLElement) => {
        let startX = 0;
        let startY = 0;

        element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        element.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = endX - startX;
            const diffY = Math.abs(endY - startY);
            const totalPages = PREPARATION_GUIDE_PAGES.length;

            // Only trigger if horizontal swipe is dominant
            if (Math.abs(diffX) > 50 && diffY < 100) {
                if (diffX > 0 && currentPage > 0) {
                    // Swipe right = previous page
                    currentPage--;
                    renderPage('right');
                } else if (diffX < 0 && currentPage < totalPages - 1) {
                    // Swipe left = next page
                    currentPage++;
                    renderPage('left');
                }
            }
        }, { passive: true });
    };

    renderPage();
    return container;
}

/**
 * Format guide text with markdown-like syntax
 */
function formatGuideText(text: string): string {
    return text
        .split('\n\n')
        .map(para => {
            // Bold text
            para = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            // Italic text
            para = para.replace(/\*(.+?)\*/g, '<em>$1</em>');
            // List items
            if (para.startsWith('• ')) {
                const items = para.split('\n').map(item => `<li>${item.replace('• ', '')}</li>`).join('');
                return `<ul>${items}</ul>`;
            }
            return `<p>${para}</p>`;
        })
        .join('');
}
