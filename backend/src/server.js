require("dotenv").config();

const express = require("express");
// https://www.npmjs.com/package/cors
const cors = require('cors'); 
// https://www.npmjs.com/package/helmet
const helmet = require('helmet');
// https://www.npmjs.com/package/express-rate-limit
const rateLimit = require('express-rate-limit');
// https://www.npmjs.com/package/express-xss-sanitizer
const { xss } = require('express-xss-sanitizer');

const path = require("path");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const orderRoutes = require("./routes/order.routes");

// process.on("unhandledRejection"...) aur uncaughtException
// Ye do lines Express ke bahar hone wale crashes pakarne ke liye hain — errorHandler sirf un errors ko pakarta hai jo kisi request ke andar (route/controller mein) aayen. Lekin kabhi kabhi error aisi jagah aata hai jahan Express bilkul involved nahi hota:

// Koi setTimeout ya setInterval ke andar ek async function fail ho jaye
// Koi background job ya cron chal raha ho jo kisi request se related na ho
// Koi promise banayi lekin uska .catch() lagana bhool gaye
// Aise cases mein agar ye handlers na hon, to Node.js poora process silently crash kar deta ya ajeeb tareeke se hang ho jata — koi log bhi nahi milta ke wajah kya thi. Ye do lines sirf itna karti hain:

// process.on("unhandledRejection", (reason) => {
//     console.error("Unhandled Rejection:", reason);
//     process.exit(1);
// });
// Error ko console mein log karo (taake pata chale kya hua)
// Phir process.exit(1) — server ko jaan boojh kar band kar do
// Sawal ye ho sakta hai: "band kyun karein, handle kyun na karein?" — Node.js ki official recommendation yehi hai: agar unhandledRejection/uncaughtException aa jaye, iska matlab app ki state corrupt ho sakti hai (kisi variable ka half-updated state, DB connection ka ajeeb state, etc). Usay chalte rehne dena zyada risky hai bajaye clean restart ke. Production mein aapke paas normally nodemon/pm2 jaisa process manager hota hai jo crash hone par automatically restart kar deta hai — to ye "fail fast, restart clean" pattern hai.

// Agar aap chahen ke server na band ho, sirf log ho — wo bhi kar sakte hain, lekin standard practice yehi crash-and-restart hai.
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

connectDB();

const app = express();

app.set('query parser', 'extended'); // restores qs-style nested query parsing

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

// Must come after every route: catches anything unmatched above.
app.use(notFound);
// Must be registered last: catches every error passed to next(), thrown in a
// sync handler, or rejected in an async handler (Express 5 forwards these automatically).
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;