/**
 * Lock Screen
 * Initial authentication gate (placeholder for biometric auth)
 */

import { authenticate } from '../services/auth';
import { navigateTo } from '../utils/router';

export function renderLockScreen(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'screen screen--lock';

    container.innerHTML = `
    <div class="lock-content">
      <h1 class="lock-title">Kneel</h1>
      <p class="lock-subtitle">Private reflection space</p>
      <button class="btn btn--primary lock-button" id="unlock-btn">
        Unlock
      </button>
      <p class="lock-error" id="lock-error" hidden></p>
    </div>
  `;

    // Handle unlock
    const unlockBtn = container.querySelector('#unlock-btn') as HTMLButtonElement;
    const errorMsg = container.querySelector('#lock-error') as HTMLParagraphElement;

    unlockBtn.addEventListener('click', async () => {
        unlockBtn.disabled = true;
        unlockBtn.textContent = 'Authenticating...';
        errorMsg.hidden = true;

        try {
            const success = await authenticate();
            if (success) {
                navigateTo('privacy-check');
            } else {
                errorMsg.textContent = 'Authentication failed. Please try again.';
                errorMsg.hidden = false;
                unlockBtn.disabled = false;
                unlockBtn.textContent = 'Unlock';
            }
        } catch (err) {
            errorMsg.textContent = 'An error occurred. Please try again.';
            errorMsg.hidden = false;
            unlockBtn.disabled = false;
            unlockBtn.textContent = 'Unlock';
        }
    });

    return container;
}
