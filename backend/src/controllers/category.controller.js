const fs = require("fs/promises");
const path = require("path");
const Category = require("../models/category.model");
// Helper: delete a file if it exists, given the stored "/uploads/xxx.png" style path
const deleteImageFile = async (imagePath) => {
    if (!imagePath) return;
    try {
        // imagePath is like "/uploads/filename.png" -> resolve to actual disk path
        const filePath = path.join(__dirname, "..", imagePath); // adjust "../" depending on your folder structure
        await fs.unlink(filePath);
    } catch (err) {
        if (err.code !== "ENOENT") {
            console.error("Failed to delete old image:", err.message);
        }
        // ENOENT = file already missing, safe to ignore
    }
};
// Recursive function to build nested category tree
const buildCategoryTree = (categories, parentId = null) => {
    return categories
        .filter((cat) => {
            // Compare parentCategory._id (if populated) or parentCategory itself, against parentId
            const catParentId = cat.parentCategory ? cat.parentCategory._id.toString() : null;
            return catParentId === parentId;
        })
        .map((cat) => ({
            ...cat,
            subCategories: buildCategoryTree(categories, cat._id.toString()),
        }));
};
// const getCategories = async (req, res) => {
//     try {
//         // const categories = await Category.find().populate("parentCategory");
//         const categories = await Category.find().populate("parentCategory", "name slug image");;
//         return res.json({ message: "Categories fetched successfully.", data: categories });

//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
            // .populate("parentCategory")
            // .populate("parentCategory", "name slug image")
            .lean(); // .lean() gives plain JS objects, easier/faster to manipulate

        // const categoryTree = buildCategoryTree(categories);

        return res.json({ message: "Categories fetched successfully.", data: categories });

    } catch (error) {
        next(error);
    }
};

const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.json(category);
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    console.log(req.body, "req.body");
    console.log(req.file, "req.file");

    try {
        const payload = { ...req.body };
        if (req.file) {
            // payload.image = `http://localhost:5000/uploads/${req.file.filename}`; // don't store localhost urls or domain names like this while save file path in DB "http://localhost:5000"
            payload.image = `/uploads/${req.file.filename}`;
        }

        const category = await Category.create(payload);
        return res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        if (error?.message.startsWith("E11000")) {
            return res.status(400).json({ message: "Category already exists" });
        }
        next(error);
    }
};

// const updateCategory = async (req, res) => {
//     try {
//         const payload = { ...req.body };
//         if (req.file) {
//             payload.image = `/uploads/${req.file.filename}`;
//         }

//         const category = await Category.findByIdAndUpdate(req.params.id, payload, { new: true });
//         if (!category) {
//             return res.status(404).json({ message: "Category not found" });
//         }

//         return res.json({ message: "Category updated successfully", category });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

const updateCategory = async (req, res, next) => {
    try {
        // 1. Pehle existing category fetch karo, taake old image path pata chale
        const existingCategory = await Category.findById(req.params.id);
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        const payload = { ...req.body };

        if (req.file) {
            payload.image = `/uploads/${req.file.filename}`;

            // 2. Naya image aaya hai to purana delete karo
            await deleteImageFile(existingCategory.image);
        }

        // 3. Update karo
        const category = await Category.findByIdAndUpdate(req.params.id, payload, { new: true });

        return res.json({ message: "Category updated successfully", category });
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.json({ message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
