const Order = require("../models/order.model");

const getOrders = async (req, res, next) => {
    try {
        const filter = req.user.role === "admin" ? {} : { user: req.user.id };
        const orders = await Order.find(filter).populate("user", "name email").populate("items.product", "name price");
        return res.json(orders);
    } catch (error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email").populate("items.product", "name price");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (req.user.role !== "admin" && order.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        return res.json(order);
    } catch (error) {
        next(error);
    }
};

const createOrder = async (req, res, next) => {
    try {
        const payload = {
            ...req.body,
            user: req.user.role === "admin" && req.body.user ? req.body.user : req.user.id,
        };

        const order = await Order.create(payload);
        return res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (req.user.role !== "admin" && order.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const payload = { ...req.body };
        if (req.user.role !== "admin") {
            delete payload.status;
            delete payload.paymentStatus;
            delete payload.paymentMethod;
        }

        Object.assign(order, payload);
        await order.save();

        return res.json({ message: "Order updated successfully", order });
    } catch (error) {
        next(error);
    }
};

const deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.json({ message: "Order deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
