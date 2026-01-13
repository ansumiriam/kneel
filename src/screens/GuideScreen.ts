/**
 * Guide Screen
 * Swipeable preparation guide pages
 */

import { navigateTo } from '../utils/router';
import { PREPARATION_GUIDE_PAGES, ATTRIBUTION } from '../content/prayers';

let currentPage = 0;

export function renderGuideScreen(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'screen screen--guide';

    const renderPage = () => {
        const page = PREPARATION_GUIDE_PAGES[currentPage];
        const totalPages = PREPARATION_GUIDE_PAGES.length;

        container.innerHTML = `
      <header class="guide-header">
        <button class="btn-back" id="back-btn" aria-label="Go back">← Back</button>
        <span class="guide-progress">${currentPage + 1} / ${totalPages}</span>
      </header>

      <main class="guide-content" id="guide-main">
        <h2 class="guide-title">${page.title}</h2>
        <span class="guide-subtitle">${page.subtitle}</span>
        <div class="guide-text">${formatGuideText(page.content)}</div>
      </main>

      <footer class="guide-nav">
        <button class="btn btn--secondary" id="prev-btn" ${currentPage === 0 ? 'disabled' : ''}>← Previous</button>
        <button class="btn btn--primary" id="next-btn" ${currentPage === totalPages - 1 ? 'disabled' : ''}>Next →</button>
      </footer>

      <div class="guide-attribution">
        <a href="${ATTRIBUTION.url}" target="_blank">Source: ${ATTRIBUTION.source}</a>
      </div>

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

        // Button handlers
        container.querySelector('#back-btn')?.addEventListener('click', () => {
            currentPage = 0;
            navigateTo('prepare');
        });

        container.querySelector('#prev-btn')?.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                renderPage();
            }
        });

        container.querySelector('#next-btn')?.addEventListener('click', () => {
            if (currentPage < totalPages - 1) {
                currentPage++;
                renderPage();
            }
        });

        container.querySelector('#nav-home')?.addEventListener('click', () => {
            currentPage = 0;
            navigateTo('home');
        });

        container.querySelector('#nav-prepare')?.addEventListener('click', () => {
            currentPage = 0;
            navigateTo('prepare');
        });

        // Swipe support
        setupSwipe(container.querySelector('#guide-main') as HTMLElement);
    };

    const setupSwipe = (element: HTMLElement) => {
        let startX = 0;

        element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        element.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = endX - startX;
            const totalPages = PREPARATION_GUIDE_PAGES.length;

            if (diff > 50 && currentPage > 0) {
                // Swipe right = previous
                currentPage--;
                renderPage();
            } else if (diff < -50 && currentPage < totalPages - 1) {
                // Swipe left = next
                currentPage++;
                renderPage();
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
