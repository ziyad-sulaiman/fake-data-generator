/**
 * Service managing persistent browser state (LocalStorage)
 */
export class StorageService {
  static THEME_KEY = 'fdg_theme_preference';
  static CONFIG_KEY = 'fdg_schema_config';

  /**
   * Get dark/light mode preference
   * @returns {string} 'dark' | 'light'
   */
  static getTheme() {
    return localStorage.getItem(this.THEME_KEY) || 'light';
  }

  /**
   * Save theme preference
   * @param {string} theme - 'dark' | 'light'
   */
  static setTheme(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  /**
   * Retrieve saved configuration options
   * @returns {Object|null}
   */
  static getConfig() {
    try {
      const data = localStorage.getItem(this.CONFIG_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to parse schema config from localStorage', e);
      return null;
    }
  }

  /**
   * Save configuration options
   * @param {Object} config - { rowCount: number, columns: Array<Object> }
   */
  static saveConfig(config) {
    localStorage.setItem(this.CONFIG_KEY, JSON.stringify(config));
  }
}