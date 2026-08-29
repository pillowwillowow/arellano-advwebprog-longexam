const express = require('express');
const router = express.Router();

const { getOrders, getOrdersByUser, getOrderById, createOrder, updateOrder, deleteOrder
} = require(
  '../controllers/orderController'
);

const { verifyToken, verifyRole } 
= require(
  '../middleware/authMiddleware'
);

router.get('/', verifyToken, verifyRole('admin'), getOrders);
router.get('/user/:userId', verifyToken, getOrdersByUser);
router.post('/', verifyToken, createOrder);
router.get('/:id', verifyToken, getOrderById);
router.put('/:id', verifyToken, verifyRole('admin'), updateOrder);
router.delete('/:id', verifyToken, verifyRole('admin'), deleteOrder);

module.exports = router;