const express = require("express");
const cors = require("cors");
const app = express();

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",");

const startingWithAllowedOrigin = (origin) =>
    ALLOWED_ORIGINS.some((allowedOrigin) => origin.startsWith(allowedOrigin));

app.use(
    cors({
        origin: {
            origin: (origin, callback) => {
                if (startingWithAllowedOrigin(origin)) {
                    return callback(null, true);
                } else {
                    return callback(new Error("Not allowed by CORS"));
                }
            },
        },
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

module.exports = app;
