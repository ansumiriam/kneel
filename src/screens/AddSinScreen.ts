/**
 * Add Sin Screen
 * Free-text input for adding a sin entry
 */

import { addSin } from '../services/storage';
import { navigateTo } from '../utils/router';
import { showToast } from '../services/toast';

export function renderAddSinScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'screen screen--add';

  container.innerHTML = `
    <header class="add-header">
      <button class="btn-back" id="back-btn" aria-label="Go back">← Back</button>
      <h1 class="add-title">Add Entry</h1>
    </header>

    <main class="add-content">
      <textarea 
        class="add-textarea" 
        id="sin-input" 
        placeholder="What's on your mind?"
        rows="6"
        autofocus
      ></textarea>
    </main>

    <footer class="add-footer">
      <button class="btn btn--secondary" id="cancel-btn">Cancel</button>
      <button class="btn btn--primary" id="save-btn">Save</button>
    </footer>
  `;

  const textarea = container.querySelector('#sin-input') as HTMLTextAreaElement;
  const saveBtn = container.querySelector('#save-btn') as HTMLButtonElement;

  // Handle save
  const handleSave = () => {
    const text = textarea.value.trim();
    if (text) {
      addSin(text);
      showToast('Entry saved');
      navigateTo('home');
    } else {
      textarea.focus();
      textarea.classList.add('shake');
      setTimeout(() => textarea.classList.remove('shake'), 300);
    }
  };

  saveBtn.addEventListener('click', handleSave);

  // Handle cancel / back
  const handleCancel = () => navigateTo('home');
  container.querySelector('#cancel-btn')?.addEventListener('click', handleCancel);
  container.querySelector('#back-btn')?.addEventListener('click', handleCancel);

  // Handle Enter key (Ctrl+Enter to save)
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  });

  return container;
}
