require('dotenv').config()

// const app = require("./app");
const express = require("express");

// const connectDB = require("./config/db");

const userRoutes = require("./routes/user.routes");
// const productsRoutes = require("./routes/products.routes");
// const categoriesRoutes = require("./routes/categories.routes");
// const ordersRoutes = require("./routes/orders.routes");

// connectDB();

const app = express(); // Create an instance of the Express application

app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/api/users", userRoutes); // Mount the user routes at the /api/users path
// app.use("/api/products", productsRoutes); // Mount the product routes at the /api/products path
// app.use("/api/categories", categoriesRoutes); // Mount the category routes at the /api/categories path
// app.use("/api/orders", ordersRoutes); // Mount the order routes at the /api/orders path

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});