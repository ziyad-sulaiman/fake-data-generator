/**
 * UI Component for rendering Data Tables (Limited to 10 rows) and CSV text preview
 */
export class PreviewUI {
  constructor() {
    this.tableContainer = document.getElementById('tableContainer');
    this.csvRawOutput = document.getElementById('csvRawOutput');
    this.dataStatusText = document.getElementById('dataStatusText');
    this.downloadCsvBtn = document.getElementById('downloadCsvBtn');
  }

  /**
   * Render preview components
   * @param {Array<Object>} fullDataset 
   * @param {string} csvString 
   */
  renderData(fullDataset, csvString) {
    if (!fullDataset || fullDataset.length === 0) return;

    // Maximum 10 rows preview requirement
    const PREVIEW_LIMIT = 10;
    const previewData = fullDataset.slice(0, PREVIEW_LIMIT);
    const headers = Object.keys(fullDataset[0]);

    // Build Table HTML
    let tableHtml = `
      <table class="table table-striped table-hover border align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th scope="col" class="text-secondary fs-7">#</th>
            ${headers.map(h => `<th scope="col">${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `;

    previewData.forEach((row, index) => {
      tableHtml += `
        <tr>
          <th scope="row" class="text-secondary fs-7">${index + 1}</th>
          ${headers.map(h => `<td>${row[h]}</td>`).join('')}
        </tr>
      `;
    });

    tableHtml += `</tbody></table>`;

    // Add info note if rows exceed limit
    if (fullDataset.length > PREVIEW_LIMIT) {
      tableHtml += `
        <div class="alert alert-info py-2 my-2 fs-7 d-flex align-items-center" role="alert">
          <i class="bi bi-info-circle-fill me-2"></i>
          Showing preview of first 10 rows out of ${fullDataset.length} total rows. Download CSV to view complete data.
        </div>
      `;
    }

    // Update DOM
    this.tableContainer.innerHTML = tableHtml;
    this.csvRawOutput.value = csvString;
    this.dataStatusText.textContent = `Generated ${fullDataset.length} rows with ${headers.length} columns.`;
    this.downloadCsvBtn.disabled = false;
  }
}