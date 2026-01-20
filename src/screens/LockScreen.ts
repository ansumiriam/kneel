import { navigateTo } from '../utils/router';
import { getAuthSettings, verifyPin } from '../services/storage';
import { authenticateBiometric, isBiometricAvailable } from '../services/auth';

export function renderLockScreen(): HTMLElement {
  const settings = getAuthSettings();

  // If PIN not set, redirect to setup
  if (!settings.isPinSet) {
    setTimeout(() => navigateTo('setup-pin'), 0);
    return document.createElement('div');
  }

  const container = document.createElement('div');
  container.className = 'screen screen--lock';

  let currentPin = '';

  const renderContent = async () => {
    const biometricSupported = await isBiometricAvailable();

    if (settings.method === 'biometric' && biometricSupported) {
      container.innerHTML = `
        <div class="auth-container">
          <div class="lock-image-container">
            <img src="assets/unlock-bg.png" alt="Sacred Art" class="lock-image" />
          </div>
          <h1 class="auth-title">Kneel</h1>
          <p class="auth-subtitle">Tap to unlock with biometrics</p>
          <button class="btn btn--primary btn--wide" id="biometric-btn">Unlock</button>
          <button class="auth-link" id="switch-to-pin-btn">Use PIN instead</button>
          <p class="auth-error" id="lock-error" hidden></p>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="auth-container">
          <h1 class="auth-title">Kneel</h1>
          <p class="auth-subtitle">Enter your 4-digit PIN</p>
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
          <button class="auth-link" id="forgot-pin-btn">Forgot PIN?</button>
          <p class="auth-error" id="lock-error" hidden></p>
        </div>
      `;
    }
    attachListeners();
  };

  const attachListeners = () => {
    // Biometric Flow
    container.querySelector('#biometric-btn')?.addEventListener('click', async () => {
      const success = await authenticateBiometric();
      if (success) {
        navigateTo('privacy-check');
      } else {
        const errorMsg = container.querySelector('#lock-error') as HTMLElement;
        if (errorMsg) {
          errorMsg.textContent = 'Biometric authentication failed.';
          errorMsg.hidden = false;
        }
      }
    });

    container.querySelector('#switch-to-pin-btn')?.addEventListener('click', () => {
      settings.method = 'pin';
      renderContent();
    });

    // PIN Flow
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
              if (verifyPin(currentPin)) {
                navigateTo('privacy-check');
              } else {
                const errorMsg = container.querySelector('#lock-error') as HTMLElement;
                if (errorMsg) {
                  errorMsg.textContent = 'Incorrect PIN. Try again.';
                  errorMsg.hidden = false;
                }
                currentPin = '';
                setTimeout(renderContent, 1000);
              }
            }, 200);
          }
        }
      });
    });

    container.querySelector('#forgot-pin-btn')?.addEventListener('click', () => {
      navigateTo('recover-pin');
    });
  };

  renderContent();
  return container;
}
