const express = require("express");
const cors = require("cors");
const app = express();

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",");

app.use(
    cors({
        origin: ALLOWED_ORIGINS,
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

module.exports = app;
