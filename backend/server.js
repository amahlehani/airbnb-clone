const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");
const cors = require("cors");
const express = require("express");

require("dotenv").config();

const app = express();

// Enable CORS for all domains
app.use(cors({ origin: true }));

// Create the JSON Server
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middleware = jsonServer.defaults();

// Initialize the JSON Server database and authentication
server.db = router.db;

// Apply JSON Server middlewares
server.use(middleware);

// Apply authentication middleware
server.use(auth);

// Add the JSON Server router to handle API routes
server.use(router);

// Define the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
