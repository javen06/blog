# Leaf It Here

A server-rendered blogging application built with Node.js, Express, and EJS.
Users can create, read, edit, and delete posts through a responsive web
interface. Posts are persisted locally in JSON between server restarts.

## Features

- Create, browse, edit, and delete posts
- Persistent local JSON storage
- Server-rendered EJS templates
- Express routing and form handling
- Method override for REST-style update and delete routes
- Responsive static styling
- Input validation and 404 responses

## Tech Stack

- Node.js
- Express
- EJS
- HTML and CSS

## Installation

```bash
git clone https://github.com/javen06/leaf-it-here.git
cd leaf-it-here
npm install
```

## Run

Start the application:

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

Open http://localhost:3000.

## Data Storage

User-created posts are written to `data/posts.json`. The file is created
automatically and ignored by Git so local content is not committed.

This storage model is intended for a learning project and single-process local
use. A production deployment should replace it with a database and add
authentication before allowing public edits.

## Project Structure

```text
leaf-it-here/
├── data/
├── public/
├── views/
├── index.js
├── package.json
└── README.md
```

## Validation

Check the server entrypoint for syntax errors:

```bash
npm run check
```
