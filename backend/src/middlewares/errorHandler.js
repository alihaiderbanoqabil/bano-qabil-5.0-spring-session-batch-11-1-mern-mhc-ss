// Runs when no route matched — must be registered after every app.use("/api/...").
const notFound = (req, res, next) => {
    res.status(404).json({ message: `Route not found - ${req.method} ${req.originalUrl}` });
};

// Single place that turns any error — thrown, passed to next(), or an async
// rejection Express 5 forwards automatically — into a consistent JSON response.
// Must be registered last, and must keep all four (err, req, res, next) params
// so Express recognizes it as error-handling middleware.
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    switch (err.name) {
        case "CastError":
            statusCode = 400;
            message = `Invalid ${err.path}: ${err.value}`;
            break;
        case "ValidationError":
            statusCode = 400;
            message = Object.values(err.errors).map((e) => e.message).join(", ");
            break;
        case "JsonWebTokenError":
            statusCode = 401;
            message = "Invalid token";
            break;
        case "TokenExpiredError":
            statusCode = 401;
            message = "Token expired";
            break;
        case "MulterError":
            statusCode = 400;
            break;
    }

    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue || {})[0];
        message = field ? `${field} already exists` : "Duplicate field value";
    }

    res.status(statusCode).json({ message });
};

module.exports = { notFound, errorHandler };
