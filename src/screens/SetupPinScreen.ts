/**
 * Setup PIN Screen
 * Required on first launch to establish security
 */

import { setPin, setSecurityQuestion } from '../services/storage';
import { navigateTo } from '../utils/router';

export function renderSetupPinScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--setup-pin';

  let step = 1; // 1: Enter PIN, 2: Confirm PIN, 3: Security Question
  let firstPin = '';
  let currentPin = '';

  const renderContent = () => {
    if (step === 1) {
      container.innerHTML = `
        <div class="auth-container">
          <h1 class="auth-title">Create PIN</h1>
          <p class="auth-subtitle">Set a 4-digit PIN to secure your data</p>
          <div class="pin-display">
            <span class="pin-dot ${currentPin.length > 0 ? 'filled' : ''}"></span>
            <span class="pin-dot ${currentPin.length > 1 ? 'filled' : ''}"></span>
            <span class="pin-dot ${currentPin.length > 2 ? 'filled' : ''}"></span>
            <span class="pin-dot ${currentPin.length > 3 ? 'filled' : ''}"></span>
          </div>
          <div class="keypad">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map(key => `
              <button class="keypad-btn" data-key="${key}" ${key === '' ? 'disabled' : ''}>${key}</button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (step === 2) {
      container.innerHTML = `
        <div class="auth-container">
          <h1 class="auth-title">Confirm PIN</h1>
          <p class="auth-subtitle">Please re-enter your 4-digit PIN</p>
          <div class="pin-display">
            <span class="pin-dot ${currentPin.length > 0 ? 'filled' : ''}"></span>
            <span class="pin-dot ${currentPin.length > 1 ? 'filled' : ''}"></span>
            <span class="pin-dot ${currentPin.length > 2 ? 'filled' : ''}"></span>
            <span class="pin-dot ${currentPin.length > 3 ? 'filled' : ''}"></span>
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
          <h1 class="auth-title">Security Question</h1>
          <p class="auth-subtitle">Used to recover your PIN if forgotten</p>
          
          <div class="setup-form">
            <select class="form-select" id="security-q">
              <option value="In what city were you born?">In what city were you born?</option>
              <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
              <option value="What was the name of your first pet?">What was the name of your first pet?</option>
              <option value="What was your first car?">What was your first car?</option>
              <option value="What is your favorite book?">What is your favorite book?</option>
            </select>
            <input type="text" class="form-input" id="security-a" placeholder="Your answer" autofocus />
            <p class="auth-error" id="setup-error" hidden></p>
            <button class="btn btn--primary btn--wide" id="save-setup-btn">Complete Setup</button>
          </div>
        </div>
      `;
    }

    attachListeners();
  };

  const attachListeners = () => {
    container.querySelectorAll('.keypad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = (btn as HTMLButtonElement).dataset.key;
        if (key === '⌫') {
          currentPin = currentPin.slice(0, -1);
          renderContent();
        } else if (currentPin.length < 4) {
          currentPin += key;
          renderContent();

          if (currentPin.length === 4) {
            setTimeout(() => {
              if (step === 1) {
                firstPin = currentPin;
                currentPin = '';
                step = 2;
                renderContent();
              } else if (step === 2) {
                if (currentPin === firstPin) {
                  step = 3;
                  renderContent();
                } else {
                  currentPin = '';
                  step = 1;
                  renderContent();
                  const errorMsg = container.querySelector('#setup-error-msg') || document.createElement('p');
                  errorMsg.id = 'setup-error-msg';
                  errorMsg.className = 'auth-error';
                  errorMsg.textContent = 'PINs do not match. Please try again.';
                  container.querySelector('.auth-subtitle')?.after(errorMsg);
                }
              }
            }, 200);
          }
        }
      });
    });

    container.querySelector('#save-setup-btn')?.addEventListener('click', () => {
      const q = (container.querySelector('#security-q') as HTMLSelectElement).value;
      const a = (container.querySelector('#security-a') as HTMLInputElement).value;
      const errorMsg = container.querySelector('#setup-error') as HTMLParagraphElement;

      if (!a.trim()) {
        errorMsg.textContent = 'Please provide an answer.';
        errorMsg.hidden = false;
        return;
      }

      setPin(firstPin);
      setSecurityQuestion(q, a);
      navigateTo('privacy-check');
    });
  };

  renderContent();
  return container;
}
