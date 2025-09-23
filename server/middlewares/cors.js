const express = require("express");
const cors = require("cors");
const app = express();

// Todo: Add frontend hosted URL when deploying.

// CORS configuration
app.use(
    cors({
        origin: ["http://localhost:3000", "http://127.0.0.1:5500", "http://localhost:5173"],
        optionsSuccessStatus: 200,
    })
);

module.exports = app;
