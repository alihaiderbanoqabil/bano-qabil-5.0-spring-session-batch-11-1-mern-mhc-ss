const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose")

const uploadDir = path.join(__dirname, "../../uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) return cb(null, true);
    cb(new Error("Only image files are allowed"));
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log({ req, file, cb });
        cb(null, uploadDir)
    },
    // filename: (req, file, cb) => {
    //     const ext = path.extname(file.originalname);
    //     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    //     cb(null, uniqueName);
    // },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        // const name = path.basename(file.originalname, ext).replace(/\s+/g, "-");
        // const uniqueName = `${name}-${new mongoose.Types.ObjectId()}${ext}`;
        const uniqueName = `${new mongoose.Types.ObjectId()}${ext}`;
        cb(null, uniqueName);
    }
});


const upload = multer({
    storage: storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
        // console.log(decoded, "decoded");
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

const authorizeRoles = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
};

const uploadSingle = (fieldName = "image") => upload.single(fieldName);
const uploadMultiple = (fieldName = "images", maxCount = 5) => upload.array(fieldName, maxCount);

module.exports = {
    authenticate,
    authorizeRoles,
    uploadSingle,
    uploadMultiple,
};


// function add(num1, num2) {
//     return num1 + num2
// }

// function add(...numbers) {
//     let sum = 0
//     console.log(numbers, "numbers");
//     for (const number of numbers) {
//         sum = sum + number;
//     }
//     return sum

// }
// console.log(add(10, 20, 30, 40, 50));
// console.log(add(10, 20, 30, 40, 50, 40));
