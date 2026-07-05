const userService = require("../services/user.service");

const getUsers = (req, res) => {
    const users = userService.getUsers();

    res.json(users);
};

const getUserById = (req, res) => {
    const user = userService.getUserById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    res.json(user);
};

const createUser = (req, res) => {
    const user = userService.createUser(req.body);

    res.status(201).json({
        message: "User created successfully",
        user,
    });
};

const updateUser = (req, res) => {
    const user = userService.updateUser(req.body);

    res.status(200).json({
        message: "User updated successfully",
        user,
    });
};

const deleteUser = (req, res) => {
    const user = userService.deleteUser(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    res.json({
        message: "User deleted successfully",
        user,
    });
};

module.exports = {
    getUsers: getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};