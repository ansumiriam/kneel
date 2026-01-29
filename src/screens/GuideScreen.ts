/**
 * Guide Screen
 * Vertical scrolling preparation guide
 */

import { navigateTo } from '../utils/router';
import { CONTENT } from '../content/prayers';
import { getLanguage } from '../services/storage';

export function renderGuideScreen(): HTMLElement {
    const lang = getLanguage();
    const pages = CONTENT[lang].guide;
    const container = document.createElement('div');
    container.className = 'screen screen--guide';

    // Generate content for all sections
    const renderSections = () => {
        return pages.map((page, index) => `
            <section class="guide-section">
                <h2 class="guide-page-title">${page.title}</h2>
                <div class="guide-text" lang="${lang}">
                    ${formatGuideText(page.content)}
                </div>
                ${index < pages.length - 1 ? '<hr class="guide-divider" />' : ''}
            </section>
        `).join('');
    };

    container.innerHTML = `
      <main class="guide-content scroll-area" id="guide-main">
        ${renderSections()}
      </main>

      <button class="fab-btn" id="fab-add-entry" aria-label="Make an entry">＋</button>

      <footer class="screen-footer guide-footer">
        <button class="btn btn--secondary guide-back-btn" id="back-btn">← Back</button>
      </footer>
    `;

    // Back button handler
    container.querySelector('#back-btn')?.addEventListener('click', () => {
        navigateTo('prepare');
    });

    // Make an entry handler (FAB)
    container.querySelector('#fab-add-entry')?.addEventListener('click', () => {
        navigateTo('add-sin', { from: 'guide' });
    });

    return container;
}

/**
 * Format guide text with markdown-like syntax
 */
function formatGuideText(text: string): string {
    return text
        .split('\n\n')
        .map(para => {
            // Detect headings (paragraphs wrapped in **)
            if (para.startsWith('**') && para.endsWith('**')) {
                return `<h3 class="content-heading">${para.replace(/\*\*/g, '')}</h3>`;
            }
            // Bold text (inline)
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
