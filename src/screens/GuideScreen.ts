/**
 * Guide Screen
 * Swipeable preparation guide pages with page flip animation
 */

import { navigateTo } from '../utils/router';
import { PREPARATION_GUIDE_PAGES } from '../content/prayers';
import { addSwipeHandler } from '../utils/swipe';

const GUIDE_PAGE_KEY = 'kneel_guide_current_page';

function getStoredPage(): number {
    const saved = localStorage.getItem(GUIDE_PAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
}

function setStoredPage(page: number): void {
    localStorage.setItem(GUIDE_PAGE_KEY, page.toString());
}

export function renderGuideScreen(): HTMLElement {
    let currentPage = getStoredPage();
    const container = document.createElement('div');
    container.className = 'screen screen--guide';

    const renderPage = (direction: 'left' | 'right' | 'none' = 'none') => {
        const page = PREPARATION_GUIDE_PAGES[currentPage];
        const totalPages = PREPARATION_GUIDE_PAGES.length;

        container.innerHTML = `
      <main class="guide-content ${direction !== 'none' ? `page-flip--${direction}` : ''}" id="guide-main">
        <h2 class="guide-page-title">${page.title}</h2>
        <div class="guide-text">${formatGuideText(page.content)}</div>
        
        <div class="guide-action-area">
          <button class="btn btn--primary btn--wide" id="make-entry-btn">
            <span class="btn-icon-plus">＋</span> Make an entry
          </button>
        </div>
      </main>

      <footer class="screen-footer guide-footer">
        <button class="btn btn--secondary guide-back-btn" id="back-btn">← Back</button>
        <div class="guide-nav">
          <button class="btn-link guide-reset-btn" id="first-page-btn">First page</button>
          <div class="guide-dots">
            ${generateDots(currentPage, totalPages)}
          </div>
        </div>
        <span class="guide-page-num">${currentPage + 1} &thinsp;/&thinsp; ${totalPages}</span>
      </footer>
    `;

        // Save current page
        setStoredPage(currentPage);

        // Remove animation class after it completes
        setTimeout(() => {
            const mainEl = container.querySelector('#guide-main');
            if (mainEl) {
                mainEl.classList.remove('page-flip--left', 'page-flip--right');
            }
        }, 300);

        // Back button handler
        container.querySelector('#back-btn')?.addEventListener('click', () => {
            navigateTo('prepare');
        });

        // First page handler
        container.querySelector('#first-page-btn')?.addEventListener('click', () => {
            if (currentPage !== 0) {
                currentPage = 0;
                renderPage('right');
            }
        });

        // Make an entry handler
        container.querySelector('#make-entry-btn')?.addEventListener('click', () => {
            navigateTo('add-sin', { from: 'guide' });
        });

        // Swipe support using utility
        const mainEl = container.querySelector('#guide-main') as HTMLElement;
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
            // Bullet list items
            if (para.startsWith('• ')) {
                const items = para.split('\n').map(item => `<li>${item.replace('• ', '')}</li>`).join('');
                return `<ul>${items}</ul>`;
            }
            // Numbered list items (1. 2. 3. etc.) - preserve starting number
            if (/^\d+\.\s/.test(para)) {
                const firstMatch = para.match(/^(\d+)\.\s/);
                const startNum = firstMatch ? firstMatch[1] : '1';
                const items = para.split('\n').map(item => `<li>${item.replace(/^\d+\.\s/, '')}</li>`).join('');
                return `<ol start="${startNum}">${items}</ol>`;
            }
            return `<p>${para}</p>`;
        })
        .join('');
}

/**
 * Generate Instagram-style dots (max 5 visible with scaling)
 */
function generateDots(current: number, total: number): string {
    const MAX_VISIBLE = 5;
    const dots: string[] = [];

    // Calculate visible range centered on current page
    let start = Math.max(0, current - Math.floor(MAX_VISIBLE / 2));
    let end = Math.min(total, start + MAX_VISIBLE);

    // Adjust start if we're near the end
    if (end - start < MAX_VISIBLE) {
        start = Math.max(0, end - MAX_VISIBLE);
    }

    for (let i = start; i < end; i++) {
        const distance = Math.abs(i - current);
        let sizeClass = '';

        if (i === current) {
            sizeClass = 'guide-dot--active';
        } else if (distance === 1) {
            sizeClass = 'guide-dot--near';
        } else if (distance === 2) {
            sizeClass = 'guide-dot--far';
        }

        dots.push(`<span class="guide-dot ${sizeClass}"></span>`);
    }

    return dots.join('');
}
