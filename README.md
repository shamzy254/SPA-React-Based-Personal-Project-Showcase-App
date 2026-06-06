# React Admin Product Showcase Portal

A single page React application for an e-commerce admin portal. The project includes client-side routing, hooks-based state management, a simulated backend using `json-server`, CRUD operations, and a testing suite with Jest and React Testing Library.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the JSON server:
   ```bash
   npm run json-server
   ```
3. Start the development server in a second terminal:
   ```bash
   npm run dev
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Project Routes

- `/` — Landing page
- `/products` — Product management page with search and edit
- `/new-product` — Form to add a new product
- `/products/:id` — Product details and inline update
