const express = require("express");
const cors = require("cors");
const app = express();

// 1. Split the string into an array for exact matching
// Default to empty array to prevent crashes if env is missing
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",");

// CORS configuration
if (process.env.ENV === "development") {
    app.use(
        cors({
            origin: "*", // ✅ Great for Dev (Phone, Laptop, Postman)
            // Note: 'credentials: true' allows cookies, but cannot be used with '*'
        })
    );
} else {
    app.use(
        cors({
            origin: (origin, callback) => {
                if (!origin) return callback(null, true);

                // exact match
                if (allowedOrigins.includes(origin)) return callback(null, true);

                // wildcard for vercel preview domains
                if (/^https:\/\/clarity-box-git-.*\.vercel\.app$/.test(origin)) {
                    return callback(null, true);
                }

                console.error(`Blocked by CORS: ${origin}`);
                return callback(new Error("Not allowed by CORS"));
            },
            credentials: true,
        })
    );
}

module.exports = app;
