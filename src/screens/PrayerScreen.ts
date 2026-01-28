/**
 * Prayer Screen
 * Displays a single prayer (read-only) with Book-like pagination
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

  // Combine all content parts into Single Page Flow
  const rawParts = Array.isArray(prayer.content) ? prayer.content : [prayer.content];
  // Filter out any potential empty strings or badly formatted parts if needed
  const fullText = rawParts.join('\n\n');

  let currentPage = 0;
  let totalPages = 1;
  let pageWidth = 0;
  let gap = 0;

  // Render Skeleton
  container.innerHTML = `
    <main class="book-wrapper" id="book-wrapper">
       <div class="book-content" id="book-content" lang="${lang}">
         <h1 class="prayer-title">${prayer.title}</h1>
         ${formatPrayerText(fullText)}
       </div>
    </main>

    <footer class="screen-footer prayer-footer">
      <button class="btn btn--secondary" id="back-btn">← Back</button>
      <div class="guide-nav" id="nav-container" style="opacity: 0">
        <div class="guide-dots" id="dots-container"></div>
      </div>
      <span class="guide-page-num" id="page-indicator"></span>
    </footer>
  `;

  // Elements
  const wrapper = container.querySelector('#book-wrapper') as HTMLElement;
  const contentEl = container.querySelector('#book-content') as HTMLElement;
  const dotsContainer = container.querySelector('#dots-container') as HTMLElement;
  const pageIndicator = container.querySelector('#page-indicator') as HTMLElement;
  const navContainer = container.querySelector('#nav-container') as HTMLElement;

  // Logic to calculate layout
  const calculateLayout = () => {
    if (!wrapper || !contentEl) return;

    // Width of one "page" (the wrapper's viewable area)
    pageWidth = contentEl.clientWidth;

    // Safety check - if not visible yet
    if (pageWidth === 0) {
      requestAnimationFrame(calculateLayout);
      return;
    }

    // Gap defined in CSS
    const style = window.getComputedStyle(contentEl);
    gap = parseFloat(style.columnGap) || 32;

    // Total scroll width
    const scrollW = contentEl.scrollWidth;

    // Calculate total pages
    // Ensure we handle single page correctly
    if (scrollW <= pageWidth + 5) { // 5px tolerance
      totalPages = 1;
    } else {
      totalPages = Math.ceil((scrollW + gap) / (pageWidth + gap));
    }

    // Update state
    if (currentPage >= totalPages) currentPage = Math.max(0, totalPages - 1);

    updateUI();
  };

  const updateUI = () => {
    // 1. Transform content to show current page
    const offset = currentPage * (pageWidth + gap);
    contentEl.style.transform = `translateX(-${offset}px)`;

    // 2. Update Dots
    if (totalPages > 1) {
      navContainer.style.opacity = '1';
      dotsContainer.innerHTML = generateDots(currentPage, totalPages);
      pageIndicator.textContent = `${currentPage + 1} / ${totalPages}`;
    } else {
      navContainer.style.opacity = '0';
      pageIndicator.textContent = '';
    }
  };

  // Resize Observer for robust layout handling
  const resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(calculateLayout);
  });

  // Start observing
  resizeObserver.observe(wrapper);

  // Initial Calculation
  requestAnimationFrame(calculateLayout);

  // Cleanup listener on simple "unmount" check? 
  // In a real framework we'd return a cleanup fn. Here we rely on GC or full page reload/router replacement.
  // Ideally router should handle cleanup. For now, this leak is minor as app is small.

  // Navigation Handlers
  container.querySelector('#back-btn')?.addEventListener('click', () => {
    navigateTo('prepare');
  });

  addSwipeHandler(wrapper, {
    onSwipeLeft: () => {
      if (currentPage < totalPages - 1) {
        currentPage++;
        updateUI();
      }
    },
    onSwipeRight: () => {
      if (currentPage > 0) {
        currentPage--;
        updateUI();
      }
    }
  });

  // Tap edges to navigate (optional Kindle-like feel)
  wrapper.addEventListener('click', (e) => {
    const x = e.clientX;
    const w = window.innerWidth;
    if (x > w * 0.7 && currentPage < totalPages - 1) {
      currentPage++;
      updateUI();
    } else if (x < w * 0.3 && currentPage > 0) {
      currentPage--;
      updateUI();
    }
  });

  return container;
}

/**
 * Format prayer text with line breaks and markdown-like syntax
 */
function formatPrayerText(text: string): string {
  // Split by double newline (robust for keys and OS differences)
  return text.split(/\r?\n\s*\r?\n/).map(para => {
    const trimmed = para.trim();
    if (!trimmed) return ''; // Skip empty
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
