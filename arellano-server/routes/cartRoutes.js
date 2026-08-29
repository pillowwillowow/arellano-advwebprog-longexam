const express = require('express');
const router = express.Router();

const { getCarts, getCartByUser, createCart, updateCart, deleteCart, removeCartItem } 
= require(
  '../controllers/cartController'
);

const { verifyToken } = require(
  '../middleware/authMiddleware'
);

router.get('/', verifyToken, getCarts);
router.get('/user/:userId', verifyToken, getCartByUser);
router.post('/', verifyToken, createCart);
router.put('/:id', verifyToken, updateCart);
router.delete('/:cartId/item/:itemId', verifyToken, removeCartItem);
router.delete('/:id', verifyToken, deleteCart);

module.exports = router;