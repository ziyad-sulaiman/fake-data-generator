import { Column } from '../models/Column.js';
import { DataGenerator } from '../services/DataGenerator.js';
import { StorageService } from '../services/StorageService.js';

/**
 * UI Component for dynamic schema builder (Columns list & input rows)
 */
export class SchemaUI {
  constructor() {
    this.container = document.getElementById('columnListContainer');
    this.addColumnBtn = document.getElementById('addColumnBtn');
    this.rowCountInput = document.getElementById('rowCountInput');
    this.resetConfigBtn = document.getElementById('resetConfigBtn');
    
    this.columns = [];
  }

  /**
   * Initialize logic, bind events, and load stored config
   */
  init() {
    this.addColumnBtn.addEventListener('click', () => this.addColumn());
    this.resetConfigBtn.addEventListener('click', () => this.loadDefaultSchema());
    
    this.container.addEventListener('input', () => this.saveCurrentState());
    this.container.addEventListener('change', () => this.saveCurrentState());
    this.rowCountInput.addEventListener('input', () => this.saveCurrentState());

    this.loadInitialData();
  }

  /**
   * Retrieve saved columns/rows from storage or initialize defaults
   */
  loadInitialData() {
    const savedConfig = StorageService.getConfig();

    if (savedConfig && savedConfig.columns && savedConfig.columns.length > 0) {
      this.rowCountInput.value = savedConfig.rowCount || 50;
      this.columns = savedConfig.columns.map(c => new Column(c.id, c.name, c.type));
    } else {
      this.loadDefaultSchema();
      return;
    }

    this.render();
  }

  /**
   * Fallback default column configuration
   */
  loadDefaultSchema() {
    this.rowCountInput.value = 50;
    this.columns = [
      new Column(crypto.randomUUID(), 'ID', 'string.uuid'),
      new Column(crypto.randomUUID(), 'Full Name', 'person.fullName'),
      new Column(crypto.randomUUID(), 'Email', 'internet.email'),
      new Column(crypto.randomUUID(), 'Country', 'location.country')
    ];
    this.render();
    this.saveCurrentState();
  }

  /**
   * Add a new column to schema
   */
  addColumn() {
    this.columns.push(new Column(crypto.randomUUID(), `Field_${this.columns.length + 1}`, 'person.fullName'));
    this.render();
    this.saveCurrentState();
  }

  /**
   * Remove column from schema
   * @param {string} id 
   */
  removeColumn(id) {
    if (this.columns.length <= 1) {
      alert('You must have at least one column.');
      return;
    }
    this.columns = this.columns.filter(c => c.id !== id);
    this.render();
    this.saveCurrentState();
  }

  /**
   * Read UI states and serialize to storage
   */
  saveCurrentState() {
    const updatedColumns = this.columns.map(col => {
      const rowEl = this.container.querySelector(`[data-id="${col.id}"]`);
      if (rowEl) {
        const nameInput = rowEl.querySelector('.col-name-input');
        const typeSelect = rowEl.querySelector('.col-type-select');
        return new Column(col.id, nameInput.value.trim() || 'Field', typeSelect.value);
      }
      return col;
    });

    this.columns = updatedColumns;

    StorageService.saveConfig({
      rowCount: parseInt(this.rowCountInput.value, 10) || 1,
      columns: this.columns
    });
  }

  /**
   * Get active config parameters for generator execution
   */
  getSchema() {
    this.saveCurrentState();
    return {
      rowCount: parseInt(this.rowCountInput.value, 10) || 1,
      columns: this.columns
    };
  }

  /**
   * Render column rows in DOM
   */
  render() {
    this.container.innerHTML = '';

    this.columns.forEach(col => {
      const row = document.createElement('div');
      row.className = 'card card-body p-2 column-row border';
      row.setAttribute('data-id', col.id);

      const typeOptionsHTML = DataGenerator.SUPPORTED_TYPES.map(type => 
        `<option value="${type.value}" ${type.value === col.type ? 'selected' : ''}>${type.label}</option>`
      ).join('');

      row.innerHTML = `
        <div class="row g-2 align-items-center">
          <div class="col-5">
            <input type="text" class="form-control form-control-sm col-name-input" value="${col.name}" placeholder="Column Title" required>
          </div>
          <div class="col-5">
            <select class="form-select form-select-sm col-type-select">
              ${typeOptionsHTML}
            </select>
          </div>
          <div class="col-2 text-end">
            <button type="button" class="btn btn-outline-danger btn-sm remove-col-btn" title="Remove Field">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      `;

      row.querySelector('.remove-col-btn').addEventListener('click', () => this.removeColumn(col.id));
      this.container.appendChild(row);
    });
  }
}