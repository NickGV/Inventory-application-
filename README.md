# Inventory Application

A web-based inventory management system built with Node.js, Express, PostgreSQL, and Sequelize ORM.

## Description

This application provides a platform to manage inventory items and their categories. It features a complete CRUD (Create, Read, Update, Delete) functionality for both items and categories.

## Features

- Category Management

  - Create new categories
  - View all categories
  - Update existing categories
  - Delete categories

- Item Management
  - Create new items with details (name, description, price)
  - View all items
  - Update item information
  - Delete items
  - Associate items with categories

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- EJS (Templating Engine)
- Method Override
- Dotenv

## Prerequisites

- Node.js
- PostgreSQL
- npm

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```bash
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=inventory_db_dev
DB_HOST=127.0.0.1
DB_PORT=5432
```

4. Seed the database (optional):

```bash
npx sequelize-cli db:migrate
```

## Runing the application

Start the server:

```bash
npm start
```

The application will be available at http://localhost:3000
