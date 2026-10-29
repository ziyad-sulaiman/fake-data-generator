# Fake Data Generator

A lightweight, object-oriented web application that serves as a clean graphical user interface (GUI) wrapper around [Faker.js](https://fakerjs.dev/). It allows developers and testers to quickly generate mock datasets and export them directly to CSV.

## Features

- **Dynamic Schema Builder:** Add, remove, and configure custom columns with various data types (names, emails, addresses, dates, amounts, etc.).
- **Row Control:** Choose how many rows to generate (up to 10,000).
- **Live Table Preview:** Instantly preview the generated data (up to the first 10 rows).
- **CSV Export:** Download the generated dataset instantly as a standard `.csv` file.
- **Theme Switcher:** Toggle between light and dark mode with persistence via `localStorage`.
- **State Preservation:** Remembers your row count and custom column configurations across sessions.

## Tech Stack

- **HTML5 & CSS3** / **Bootstrap 5** (with Bootstrap Icons)
- **Vanilla JavaScript (ES6 Modules)** following an Object-Oriented Programming (OOP) architecture
- **Faker.js** for mock data generation

## Local Development

1. Clone or download the repository.
2. Install dependencies via npm:
   ```bash
   npm install
   ```
3. Run a local static server (e.g., using serve or Python):
    ```bash
   npx serve .
   ```
4. Open the provided local URL in your browser.

## License
MIT License • Built by Ziyad H. Sulaiman