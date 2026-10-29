import { ThemeUI } from './ui/ThemeUI.js';
import { SchemaUI } from './ui/SchemaUI.js';
import { PreviewUI } from './ui/PreviewUI.js';
import { DataGenerator } from './services/DataGenerator.js';
import { CsvExporter } from './services/CsvExporter.js';

/**
 * Application Orchestrator / Controller Class
 */
class App {
  constructor() {
    this.themeUI = new ThemeUI();
    this.schemaUI = new SchemaUI();
    this.previewUI = new PreviewUI();

    this.generatorForm = document.getElementById('generatorForm');
    this.downloadCsvBtn = document.getElementById('downloadCsvBtn');

    this.currentCsvData = '';
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
    this.downloadCsvBtn.addEventListener('click', () => this.handleDownload());
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

    // Generate Dataset using services
    const data = DataGenerator.generate(rowCount, columns);
    this.currentCsvData = CsvExporter.convertToCsv(data);

    // Render Preview UI
    this.previewUI.renderData(data, this.currentCsvData);
  }

  /**
   * Trigger file download
   */
  handleDownload() {
    if (!this.currentCsvData) return;
    CsvExporter.download(this.currentCsvData, `dataset_${Date.now()}.csv`);
  }
}

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});