const express = require("express");

const authentication = require("../middleware/authentication");

const authorization = require("../middleware/authorization");

const router = express.Router();

const {
  getOrders,
  getOrdersByUser,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.get("/", authentication, authorization("admin"), getOrders);
router.get("/user/:userId", authentication, getOrdersByUser);
router.post("/", authentication, createOrder);
router.get("/:id", authentication, getOrderById);
router.put("/:id", authentication, authorization("admin"), updateOrder);
router.delete("/:id", authentication, authorization("admin"), deleteOrder);

module.exports = router;
