# Panda - Housing Rental Web Application

A modern web application for listing and browsing housing rentals, built with React, Express, and Prisma.

Deployed the application on Vercel and MySQL via Aiven

URL for frontend to view the application: https://panda-flax.vercel.app/

## Overview

Panda is a full-stack application that allows property owners to list rental properties and helps prospective tenants browse available listings. The application features a clean, responsive UI and a robust backend API.

## Features

- **Browse Listings**: View all available rental properties
- **Detailed Listings**: See comprehensive information about each property including rent, rooms, and contact details
- **Add New Listings**: Property owners can easily add new rental listings
- **Data Validation**: Input validation on both client and server sides
- **Phone Number Formatting**: Automatically formats contact numbers for better readability

## Tech Stack

### Frontend
- React
- React Hook Form (for form handling)
- Tailwind CSS (for styling)

### Backend
- Node.js
- Express.js
- Prisma ORM
- MySQL (Aiven Cloud)
- Zod (for schema validation)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL database (or Aiven MySQL instance)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/panda.git
cd panda
```
2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure database:
Create a .env file in the backend directory
Add your database connection string:

```bash
DATABASE_URL="mysql://username:password@host:port/database_name"
```

4. Set up Tailwind CSS:
```bash
# Navigate to the frontend directory
cd frontend

# Start the Tailwind CLI build process
npx @tailwindcss/cli -i ./src/index.css -o ./src/output.css --watch
```

5. Set up the database schema:
```bash
cd backend
npx prisma db push
npx prisma generate
```

6. Start the development servers:
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend development server (from frontend directory)
npm start
```

7. Access the application at http://localhost:3000

### API Endpoints

- GET /api/listing - Retrieve all listings
- POST /api/listing - Create a new listing

### Database Schema

```bash
model Listing {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  rent        Int
  address     String
  rooms       Int
  contact     String
  createdAt   DateTime @default(now())
}
```

