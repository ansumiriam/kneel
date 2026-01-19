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
    <main class="scroll-area add-content">
      <h1 class="add-title">Add Entry</h1>
      <textarea 
        class="add-textarea" 
        id="sin-input" 
        placeholder="What's on your mind?"
        rows="6"
        autofocus
      ></textarea>
    </main>

    <footer class="screen-footer add-footer">
      <button class="btn btn--secondary" id="back-btn">← Back</button>
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

  // Handle back
  container.querySelector('#back-btn')?.addEventListener('click', () => navigateTo('home'));

  // Handle Enter key (Ctrl+Enter to save)
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  });

  return container;
}
