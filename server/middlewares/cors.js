const express = require("express");
const cors = require("cors");
const app = express();

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;

// Todo: Add frontend hosted URL to the allowed origins.

// CORS configuration
app.use(
    cors({
        origin: ALLOWED_ORIGINS,
        optionsSuccessStatus: 200,
    })
);

module.exports = app;
