import { ThemeUI } from './ui/ThemeUI.js';
import { SchemaUI } from './ui/SchemaUI.js';
import { PreviewUI } from './ui/PreviewUI.js';
import { DataGenerator } from './services/DataGenerator.js';
import { DataExporter } from './services/DataExporter.js';

/**
 * Application Orchestrator / Controller Class
 */
class App {
  constructor() {
    this.themeUI = new ThemeUI();
    this.schemaUI = new SchemaUI();
    this.previewUI = new PreviewUI();

    this.generatorForm = document.getElementById('generatorForm');
    this.downloadBtn = document.getElementById('downloadBtn');
    this.exportFormatSelect = document.getElementById('exportFormatSelect');

    this.currentData = '';
  }

  /**
   * Launch application logic
   */
  init() {
    // Sub-component setup
    this.themeUI.init();
    this.schemaUI.init();

    // Event binding
    this.generatorForm.addEventListener('submit', (e) => this.handleGenerate(e));
    this.downloadBtn.addEventListener('click', () => this.handleDownload());
  }

  /**
   * Handle generation action
   * @param {Event} e 
   */
  handleGenerate(e) {
    e.preventDefault();

    const { rowCount, columns } = this.schemaUI.getSchema();
    if (!columns || columns.length === 0) {
      alert('Please add at least one column.');
      return;
    }

    const generatedRows = DataGenerator.generate(rowCount, columns);
    this.currentData = Array.isArray(generatedRows) ? generatedRows : [];

    const csvPreview = DataExporter.convertToCsv(this.currentData);
    this.previewUI.renderData(this.currentData, csvPreview);
  }

  async handleDownload() {
    if (!Array.isArray(this.currentData) || this.currentData.length === 0) return;

    const format = this.exportFormatSelect?.value || 'csv';
    const originalHtml = this.downloadBtn.innerHTML;

    try {
      this.downloadBtn.disabled = true;
      this.downloadBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Exporting...';
      await DataExporter.exportData(format, this.currentData, `dataset_${Date.now()}`);
    } catch (err) {
      console.error('Export failed:', err);
      alert(`Export failed: ${err.message}`);
    } finally {
      this.downloadBtn.innerHTML = originalHtml;
      this.downloadBtn.disabled = this.currentData.length === 0;
    }
  }

  /**
   * Trigger file download
   */
  async handleDownload() {
    if (!Array.isArray(this.currentData) || this.currentData.length === 0) return;

    const format = this.exportFormatSelect ? this.exportFormatSelect.value : 'csv';
    const originalHtml = this.downloadBtn.innerHTML;

    try {
      this.downloadBtn.disabled = true;
      this.downloadBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Exporting...';
      await DataExporter.exportData(format, this.currentData, `dataset_${Date.now()}`);
    } catch (err) {
      console.error('Export failed:', err);
      alert(`Export failed: ${err.message}`);
    } finally {
      this.downloadBtn.innerHTML = originalHtml;
      this.downloadBtn.disabled = this.currentData.length === 0;
    }
  }
}

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});