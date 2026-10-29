/**
 * Model representing a single CSV Column Schema Definition
 */
export class Column {
  /**
   * @param {string} id - Unique identifier for the row DOM binding
   * @param {string} name - Header title of the column
   * @param {string} type - Data field generator key
   */
  constructor(id = crypto.randomUUID(), name = 'Field', type = 'person.fullName') {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}