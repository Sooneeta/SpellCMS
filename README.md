Blog Manager
A blog management application built with React.js, TypeScript, and Tailwind CSS. This project allows users to manage blog posts, categories, and authors with features like authentication, search, filtering, and CRUD operations. It uses JSON Server as a mock API backend and simulates token-based authentication with localStorage.

Features

1. Authentication

Email/Password Login: Mocked authentication using localStorage to store a token.
Persistent Auth State: Authentication state persists across sessions using localStorage.
Redirect Unauthenticated Users: Unauthenticated users are redirected to the login page.

2. Manage Blog Posts

Fetch Posts: Blog posts are fetched from a mock API (JSON Server).
Display Posts: Posts are displayed in a table with the following columns:
Title
Author (mapped to author name)
Category
Tags
Status (Draft/Published)
Created Date
Actions (View, Edit, Delete, Toggle Status)

Actions:
Create, edit, and delete blog posts.
Toggle post status between Draft and Published.

3. Categories

CRUD Operations: Add, edit, and delete blog categories.
Usage: Categories are used in the blog post form dropdown for selection.

4. Authors

CRUD Operations: Create, read, update, and delete authors with fields for name, avatar (URL or blob), and bio.

5. Search & Filter

Search: Search blog posts by title or tag (case-insensitive).
Filter: Filter blog posts by status (Draft/Published) or category.

Technical Stack

Framework: React.js with TypeScript
Styling: Tailwind CSS
Forms: React Hook Form with Zod for validation
State Management: React Query for API data fetching and caching
Routing: React Router DOM for navigation
API: JSON Server for simulating a REST backend
Auth: Simulated token-based authentication using localStorage

Project Setup
Prerequisites

-Node.js: v16 or higher
-npm or yarn
-JSON Server

Installation

Clone the Repository:
git clone <repository-url>
cd blog-manager

Install Dependencies:Using npm:
npm install

Or using yarn:
yarn install

Set Up JSON Server:

Create a db.json file in the project root with the following structure:{
"blogs": [],
"authors": [],
"categories": []
}

Run JSON Server:npx json-server --watch db.json --port 3000

The API will be available at http://localhost:3000.

Start the Development Server:Using npm:
npm start

Or using yarn:
yarn start

The app will run at http://localhost:5173.

Usage

Login:

Navigate to http://localhost:3000/login.
Credentials: email(blockmanager@gmail.com), password(blockmanager123)
The auth is mocked and will store a token in localStorage.
Auth state persists across sessions until logout.

Developed by Sunita Thapa
