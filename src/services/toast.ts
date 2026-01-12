/**
 * Toast Notification Service
 * Shows brief feedback messages
 */

let toastContainer: HTMLElement | null = null;
let currentToast: HTMLElement | null = null;
let toastTimeout: number | null = null;

/**
 * Initialize toast container
 */
function ensureContainer(): HTMLElement {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

/**
 * Show a toast message
 */
export function showToast(message: string, duration: number = 2500): void {
    const container = ensureContainer();

    // Clear existing toast
    if (currentToast) {
        currentToast.remove();
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }
    }

    // Create new toast
    currentToast = document.createElement('div');
    currentToast.className = 'toast';
    currentToast.textContent = message;
    container.appendChild(currentToast);

    // Trigger animation
    requestAnimationFrame(() => {
        currentToast?.classList.add('toast--visible');
    });

    // Auto-hide
    toastTimeout = window.setTimeout(() => {
        hideToast();
    }, duration);
}

/**
 * Hide the current toast
 */
export function hideToast(): void {
    if (currentToast) {
        currentToast.classList.remove('toast--visible');
        const toast = currentToast;
        setTimeout(() => toast.remove(), 300);
        currentToast = null;
    }
}

/**
 * Show undo toast with action
 */
export function showUndoToast(message: string, onUndo: () => void, duration: number = 10000): void {
    const container = ensureContainer();

    // Clear existing toast
    if (currentToast) {
        currentToast.remove();
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }
    }

    // Create undo toast
    currentToast = document.createElement('div');
    currentToast.className = 'toast toast--undo';
    currentToast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-undo-btn">Undo</button>
    `;
    container.appendChild(currentToast);

    // Handle undo click
    currentToast.querySelector('.toast-undo-btn')?.addEventListener('click', () => {
        onUndo();
        hideToast();
    });

    // Trigger animation
    requestAnimationFrame(() => {
        currentToast?.classList.add('toast--visible');
    });

    // Auto-hide
    toastTimeout = window.setTimeout(() => {
        hideToast();
    }, duration);
}
