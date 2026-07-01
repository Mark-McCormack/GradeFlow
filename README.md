# GradeFlow

GradeFlow is a simple React web app for calculating and visualising student grades across multiple academic years. It is designed to help students quickly see how individual module results and year weightings affect their overall performance.

<div align="center">
  <img alt="Aceso health dashboard preview" src="./README Image.png" />
  <p><em>GradeFlow allows for Maynooth University students to track their progress!</em></p>
</div>

## Purpose

The purpose of GradeFlow is to make grade tracking easier and more intuitive. Instead of manually calculating weighted averages, users can enter module names and grades, adjust the importance of each year, and instantly view both yearly and final results.

## Features

- Add or remove modules within each academic year
- Edit module names and grades directly in the interface
- Set custom weightings for each year
- View calculated yearly averages and a final weighted overall grade
- Load sample data to explore the calculator quickly

## Tech Stack

- React
- React Bootstrap
- Create React App

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mark-McCormack/student-grade-calculator.git
   ```
2. Navigate into the project folder:
   ```bash
   cd student-grade-calculator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Run the app locally

Start the development server:

```bash
npm start
```

Then open http://localhost:3000 in your browser.

## Available Scripts

- `npm start` - runs the app in development mode
- `npm test` - launches the test runner
- `npm run build` - creates a production build
- `npm run deploy` - deploys the build to GitHub Pages

## Project Structure

- `src/components/Calculator.js` - main grade calculator UI and logic
- `src/App.js` - app entry point
- `public/` - static assets and HTML shell

## License

This project is available for educational and personal use.
