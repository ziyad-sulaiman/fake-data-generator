import { StorageService } from '../services/StorageService.js';

/**
 * Handles UI interactions for Light/Dark Mode switching
 */
export class ThemeUI {
  constructor() {
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.themeIcon = document.getElementById('themeIcon');
  }

  /**
   * Initialize Theme UI and attach event listeners
   */
  init() {
    const activeTheme = StorageService.getTheme();
    this.applyTheme(activeTheme);

    this.themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-bs-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(newTheme);
      StorageService.setTheme(newTheme);
    });
  }

  /**
   * Apply Theme to DOM root
   * @param {string} theme - 'dark' | 'light'
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    if (theme === 'dark') {
      this.themeIcon.className = 'bi bi-sun-fill text-warning';
    } else {
      this.themeIcon.className = 'bi bi-moon-stars-fill';
    }
  }
}