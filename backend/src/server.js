require("dotenv").config();

const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { xss } = require('express-xss-sanitizer');
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const orderRoutes = require("./routes/order.routes");

connectDB();

const app = express();

// Adds headers: Access-Control-Allow-Origin: *
// app.use(cors())

// Helmet — sets various security-related HTTP headers
app.use(helmet());

// middleware which sanitizes user input data (in req.body, req.query, req.headers and req.params) to prevent Cross Site Scripting (XSS) attack.
app.use(xss());

// CORS — configure allowed origins as needed
app.use(cors({
    origin: ['http://localhost:3000'], // replace with your allowed origin(s), or '*' for all
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true, // only if you need cookies/auth headers cross-origin
}));

// Rate limiting — protects against brute force / abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,                 // limit each IP to 100 requests per window
    standardHeaders: true,    // return rate limit info in RateLimit-* headers
    legacyHeaders: false,     // disable X-RateLimit-* headers
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Middleware to parse JSON request bodies
app.use(express.json()); 
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true })); 
// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); 

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;