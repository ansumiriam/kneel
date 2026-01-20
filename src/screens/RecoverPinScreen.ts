/**
 * Recover PIN Screen
 * Allows resetting the PIN via security question
 */

import { getAuthSettings, verifySecurityAnswer, setPin } from '../services/storage';
import { navigateTo } from '../utils/router';

export function renderRecoverPinScreen(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'screen screen--recover-pin';

    const settings = getAuthSettings();
    let step = 1; // 1: Answer Question, 2: Set New PIN, 3: Confirm New PIN
    let newPin = '';
    let confirmPin = '';

    const renderContent = () => {
        if (step === 1) {
            container.innerHTML = `
        <div class="auth-container">
          <h1 class="auth-title">Recover PIN</h1>
          <p class="auth-subtitle">Answer your security question to reset</p>
          
          <div class="setup-form">
            <div class="form-question">${settings.question}</div>
            <input type="text" class="form-input" id="recovery-a" placeholder="Your answer" autofocus />
            <p class="auth-error" id="recovery-error" hidden></p>
            <button class="btn btn--primary btn--wide" id="verify-recovery-btn">Verify Answer</button>
            <button class="auth-link" id="back-to-lock-btn">Back to Lock</button>
          </div>
        </div>
      `;
        } else if (step === 2) {
            container.innerHTML = `
        <div class="auth-container">
          <h1 class="auth-title">New PIN</h1>
          <p class="auth-subtitle">Set a new 4-digit PIN</p>
          <div class="pin-display">
            <span class="pin-dot ${newPin.length > 0 ? 'filled' : ''}"></span>
            <span class="pin-dot ${newPin.length > 1 ? 'filled' : ''}"></span>
            <span class="pin-dot ${newPin.length > 2 ? 'filled' : ''}"></span>
            <span class="pin-dot ${newPin.length > 3 ? 'filled' : ''}"></span>
          </div>
          <div class="keypad">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map(key => `
              <button class="keypad-btn" data-key="${key}" ${key === '' ? 'disabled' : ''}>${key}</button>
            `).join('')}
          </div>
        </div>
      `;
        } else {
            container.innerHTML = `
        <div class="auth-container">
          <h1 class="auth-title">Confirm New PIN</h1>
          <p class="auth-subtitle">Please re-enter your new PIN</p>
          <div class="pin-display">
            <span class="pin-dot ${confirmPin.length > 0 ? 'filled' : ''}"></span>
            <span class="pin-dot ${confirmPin.length > 1 ? 'filled' : ''}"></span>
            <span class="pin-dot ${confirmPin.length > 2 ? 'filled' : ''}"></span>
            <span class="pin-dot ${confirmPin.length > 3 ? 'filled' : ''}"></span>
          </div>
          <div class="keypad">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map(key => `
              <button class="keypad-btn" data-key="${key}" ${key === '' ? 'disabled' : ''}>${key}</button>
            `).join('')}
          </div>
        </div>
      `;
        }

        attachListeners();
    };

    const attachListeners = () => {
        // Step 1: Verify Answer
        container.querySelector('#verify-recovery-btn')?.addEventListener('click', () => {
            const a = (container.querySelector('#recovery-a') as HTMLInputElement).value;
            const errorMsg = container.querySelector('#recovery-error') as HTMLParagraphElement;

            if (verifySecurityAnswer(a)) {
                step = 2;
                renderContent();
            } else {
                errorMsg.textContent = 'Incorrect answer. Please try again.';
                errorMsg.hidden = false;
            }
        });

        container.querySelector('#back-to-lock-btn')?.addEventListener('click', () => {
            navigateTo('lock');
        });

        // Step 2 & 3: Keypad for new PIN
        container.querySelectorAll('.keypad-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = (btn as HTMLButtonElement).dataset.key;
                if (key === '⌫') {
                    if (step === 2) newPin = newPin.slice(0, -1);
                    if (step === 3) confirmPin = confirmPin.slice(0, -1);
                    renderContent();
                } else if ((step === 2 && newPin.length < 4) || (step === 3 && confirmPin.length < 4)) {
                    if (step === 2) newPin += key;
                    else confirmPin += key;

                    renderContent();

                    if ((step === 2 && newPin.length === 4) || (step === 3 && confirmPin.length === 4)) {
                        setTimeout(() => {
                            if (step === 2) {
                                step = 3;
                                renderContent();
                            } else if (step === 3) {
                                if (newPin === confirmPin) {
                                    setPin(newPin);
                                    alert('PIN reset successful!');
                                    navigateTo('lock');
                                } else {
                                    alert('PINs do not match. Please try again.');
                                    newPin = '';
                                    confirmPin = '';
                                    step = 2;
                                    renderContent();
                                }
                            }
                        }, 200);
                    }
                }
            });
        });
    };

    renderContent();
    return container;
}
