const express = require("express");
const router = express.Router();

// Requiring the usersService methods.

const { auth } = require("../../../auth/authService");
const RouterLogger = require("../../../logger/loggers/customLogger");
