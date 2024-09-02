if (process.env.USER) require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

// Routers
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// Configure APP
app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// Validators (not found and error handlers)
app.use(notFound);
app.use(errorHandler);

// Exports
module.exports = app;
