const User = require("../models/user.model");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        return res.json({ message: "Users get successfully", data: users });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    // console.log(req.params, "req.params");
    try {
        if (req.user.role !== "admin" && req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // const user = await User.findById(req.params.id).select("name email");
        // const user = await User.findById(req.params.id).select("-password");
        const user = await User.findById(req.params.id);
        // const user = await User.findOne({ _id: req.params.id });
        // const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (req.user.role !== "admin" && req.user.id !== user._id.toString()) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const updates = { ...req.body };
        if (req.user.role !== "admin") {
            delete updates.role;
        }

        if (updates.password) {
            user.password = updates.password;
            delete updates.password;
        }

        Object.assign(user, updates);
        await user.save();

        const updatedUser = await User.findById(user._id).select("-password");
        return res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};