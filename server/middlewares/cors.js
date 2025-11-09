const express = require("express");
const cors = require("cors");
const app = express();

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;

// Todo: Add frontend hosted URL to the allowed origins.

// CORS configuration
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || ALLOWED_ORIGINS.includes(origin)) {
                return callback(null, origin || true); // return one allowed origin
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        optionsSuccessStatus: 200,
    })
);

module.exports = app;
