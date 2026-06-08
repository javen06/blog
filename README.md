# Leaf It Here

A simple blog-style web application built with Node.js, Express, and EJS.

## About

Leaf It Here is a server-rendered web app where users can view pages and interact with blog-style content. It uses Express as the backend server and EJS templates for rendering the frontend.

This project is mainly for practising backend routing, server-side rendering, static asset handling, and basic full-stack web app structure.

## Features

- Express.js server
- EJS templating
- Server-rendered pages
- Static files served from the `public` folder
- Local development with Nodemon
- Simple project structure for learning backend web development

## Tech Stack

- Node.js
- Express.js
- EJS
- HTML
- CSS
- JavaScript

## Requirements

Make sure Node.js and npm are installed.

Check with:

```bash
node -v
npm -v
```

If both commands show version numbers, you can run the project.

## Installation

Clone the repository:

```bash
git clone https://github.com/javen06/leaf-it-here.git
```

Go into the project folder:

```bash
cd leaf-it-here
```

Install dependencies:

```bash
npm install
```

## Run Locally

Start the local development server:

```bash
nodemon index.js
```

Then open this in your browser:

```text
http://localhost:3000
```

Keep the terminal open while using the app.

To stop the server, press:

```bash
Ctrl + C
```

## Alternative Run Command

If you do not have Nodemon installed, you can run the app with Node directly:

```bash
node index.js
```

Then open:

```text
http://localhost:3000
```

## Installing Nodemon

If `nodemon index.js` does not work, install Nodemon globally:

```bash
npm install -g nodemon
```

Then run:

```bash
nodemon index.js
```

## Recommended Package Scripts

For cleaner commands, add this to `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

After that, you can run the app with:

```bash
npm run dev
```

or:

```bash
npm start
```

## Project Structure

```text
leaf-it-here/
├── index.js
├── package.json
├── package-lock.json
├── public/
├── views/
└── README.md
```

## Notes

This project runs on a local Express server.

It cannot be hosted directly on GitHub Pages because GitHub Pages only supports static HTML, CSS, and JavaScript sites. Since this project uses Node.js and Express, it needs a server to run.

To deploy it online later, use a Node.js hosting platform such as Render, Railway, Fly.io, or similar.
