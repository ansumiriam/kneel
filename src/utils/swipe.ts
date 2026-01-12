/**
 * Swipe Gesture Handler
 * Detects left/right swipe gestures on elements
 */

export interface SwipeOptions {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    threshold?: number; // Minimum swipe distance (px)
}

/**
 * Add swipe gesture handling to an element
 */
export function addSwipeHandler(element: HTMLElement, options: SwipeOptions): () => void {
    const threshold = options.threshold ?? 50;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isSwiping = false;

    const handleTouchStart = (e: TouchEvent) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        currentX = startX;
        isSwiping = true;
        element.style.transition = 'none';
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isSwiping) return;

        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        const diffY = Math.abs(e.touches[0].clientY - startY);

        // If vertical scroll is dominant, don't swipe
        if (diffY > Math.abs(diffX)) {
            isSwiping = false;
            element.style.transform = '';
            return;
        }

        // Prevent scroll during horizontal swipe
        if (Math.abs(diffX) > 10) {
            e.preventDefault();
        }

        // Visual feedback - move element
        element.style.transform = `translateX(${diffX * 0.5}px)`;
    };

    const handleTouchEnd = () => {
        if (!isSwiping) return;
        isSwiping = false;

        const diffX = currentX - startX;
        element.style.transition = 'transform 0.2s';
        element.style.transform = '';

        if (diffX > threshold && options.onSwipeRight) {
            options.onSwipeRight();
        } else if (diffX < -threshold && options.onSwipeLeft) {
            options.onSwipeLeft();
        }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Return cleanup function
    return () => {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
    };
}
