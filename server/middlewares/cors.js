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
                // 2. Allow requests with no origin (like Postman or Server-to-Server calls)
                if (!origin) return callback(null, true);

                // 3. Check exact match against the array
                if (ALLOWED_ORIGINS.includes(origin)) {
                    return callback(null, true);
                } else {
                    console.error(`Blocked by CORS: ${origin}`); // Helpful for prod debugging
                    return callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true, // ✅ Usually needed in Prod for Cookies/Auth
            optionsSuccessStatus: 200,
        })
    );
}

module.exports = app;
