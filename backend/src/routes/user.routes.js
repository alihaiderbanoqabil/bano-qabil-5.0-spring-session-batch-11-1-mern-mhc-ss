const express = require("express");

const { createUser, deleteUser, getUsers, getUserById } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.delete("/:id", deleteUser);

// const controller = require("../controllers/user.controller");

// const router = express.Router();

// router.get("/", controller.getUsers);

// router.get("/:id", controller.getUserById);

// router.post("/", controller.createUser);

// router.delete("/:id", controller.deleteUser);

module.exports = router;