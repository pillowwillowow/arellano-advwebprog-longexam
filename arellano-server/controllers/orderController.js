const Order = require("../models/orderModel");

// GET all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user")
            .populate("items.product");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving orders",
            error: error.message
        });
    }
};

// GET order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user")
            .populate("items.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving order",
            error: error.message
        });
    }
};

// GET orders by user
const getOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.params.userId
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving user orders",
            error: error.message
        });
    }
};

// CREATE order
const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({
            message: "Error creating order",
            error: error.message
        });
    }
};

// UPDATE order status
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({
            message: "Error updating order",
            error: error.message
        });
    }
};

// DELETE order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(
            req.params.id
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting order",
            error: error.message
        });
    }
};

module.exports = { getOrders, getOrderById, getOrdersByUser, createOrder, updateOrder, deleteOrder };