const express = require("express");

const authentication = require("../middleware/authentication");

const router = express.Router();

const {
  getCarts,
  getCartByUser,
  createCart,
  updateCart,
  deleteCart,
  removeCartItem,
} = require("../controllers/cartController");

router.get("/", authentication, getCarts);
router.get("/user/:userId", authentication, getCartByUser);
router.post("/", authentication, createCart);
router.put("/:id", authentication, updateCart);
router.delete("/:cartId/item/:itemId", authentication, removeCartItem);
router.delete("/:id", authentication, deleteCart);

module.exports = router;
