/**
 * Handles CSV conversion and downloading logic
 */
export class CsvExporter {
  /**
   * Convert array of data objects to CSV text string
   * @param {Array<Object>} data 
   * @returns {string}
   */
  static convertToCsv(data) {
    if (!data || !data.length) return '';

    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Add Escaped Headers
    csvRows.push(headers.map(h => this.escapeCsvValue(h)).join(','));

    // Add Data Rows
    data.forEach(row => {
      const values = headers.map(header => this.escapeCsvValue(row[header]));
      csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
  }

  /**
   * Escape values containing commas or quotes
   * @param {any} value 
   * @returns {string}
   */
  static escapeCsvValue(value) {
    const str = String(value ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  /**
   * Triggers a browser download of the CSV string
   * @param {string} csvString 
   * @param {string} filename 
   */
  static download(csvString, filename = 'generated_data.csv') {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}