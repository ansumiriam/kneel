/**
 * Edit Sin Screen
 * Edit existing entry text
 */

import { getSins, updateSin } from '../services/storage';
import { navigateTo } from '../utils/router';
import { showToast } from '../services/toast';

// Store the ID of the sin being edited
let editingSinId: string | null = null;

export function setEditingSinId(id: string): void {
    editingSinId = id;
}

export function renderEditSinScreen(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'screen screen--add';

    // Get the sin being edited
    const sins = getSins();
    const sin = sins.find(s => s.id === editingSinId);
    const currentText = sin?.text || '';

    container.innerHTML = `
    <header class="add-header">
      <button class="btn-back" id="back-btn" aria-label="Go back">← Back</button>
      <h1 class="add-title">Edit Entry</h1>
    </header>

    <main class="add-content">
      <textarea 
        class="add-textarea" 
        id="sin-input" 
        placeholder="What's on your mind?"
        rows="6"
        autofocus
      >${escapeHtml(currentText)}</textarea>
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
        if (text && editingSinId) {
            updateSin(editingSinId, { text });
            showToast('Entry updated');
            editingSinId = null;
            navigateTo('home');
        } else if (!text) {
            textarea.focus();
            textarea.classList.add('shake');
            setTimeout(() => textarea.classList.remove('shake'), 300);
        }
    };

    saveBtn.addEventListener('click', handleSave);

    // Handle cancel / back
    const handleCancel = () => {
        editingSinId = null;
        navigateTo('home');
    };
    container.querySelector('#cancel-btn')?.addEventListener('click', handleCancel);
    container.querySelector('#back-btn')?.addEventListener('click', handleCancel);

    // Handle Ctrl+Enter to save
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSave();
        }
    });

    return container;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
