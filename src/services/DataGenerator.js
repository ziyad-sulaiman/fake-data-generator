import { faker } from '@faker-js/faker';

/**
 * Service wrapping Faker library to build structured datasets
 */
export class DataGenerator {
  /**
   * List of supported options with internal generator mapping
   */
  static SUPPORTED_TYPES = [
    { value: 'person.fullName', label: 'Full Name' },
    { value: 'person.firstName', label: 'First Name' },
    { value: 'person.lastName', label: 'Last Name' },
    { value: 'internet.email', label: 'Email Address' },
    { value: 'phone.number', label: 'Phone Number' },
    { value: 'location.streetAddress', label: 'Street Address' },
    { value: 'location.city', label: 'City' },
    { value: 'location.country', label: 'Country' },
    { value: 'company.name', label: 'Company Name' },
    { value: 'finance.amount', label: 'Currency Amount ($)' },
    { value: 'date.past', label: 'Past Date' },
    { value: 'string.uuid', label: 'UUID' }
  ];

  /**
   * Generates mock data rows according to schema definitions
   * @param {number} rowCount - Total rows to generate
   * @param {Array<Column>} columns - Array of Column models
   * @returns {Array<Object>}
   */
  static generate(rowCount, columns) {
    const data = [];
    
    for (let i = 0; i < rowCount; i++) {
      const row = {};
      columns.forEach(col => {
        row[col.name] = this.generateFieldValue(col.type);
      });
      data.push(row);
    }

    return data;
  }

  /**
   * Resolves faker generator method call based on chosen type string
   * @param {string} type 
   * @returns {string|number}
   */
  static generateFieldValue(type) {
    switch (type) {
      case 'person.fullName': return faker.person.fullName();
      case 'person.firstName': return faker.person.firstName();
      case 'person.lastName': return faker.person.lastName();
      case 'internet.email': return faker.internet.email();
      case 'phone.number': return faker.phone.number();
      case 'location.streetAddress': return faker.location.streetAddress();
      case 'location.city': return faker.location.city();
      case 'location.country': return faker.location.country();
      case 'company.name': return faker.company.name();
      case 'finance.amount': return faker.finance.amount();
      case 'date.past': return faker.date.past().toISOString().split('T')[0];
      case 'string.uuid': return faker.string.uuid();
      default: return faker.lorem.word();
    }
  }
}