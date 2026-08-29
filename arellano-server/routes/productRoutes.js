const express =
  require('express');

const router =
  express.Router();

const { getProducts, getProductById, createProduct, updateProduct, deleteProduct }
 = require(
  '../controllers/productController'
);

const { verifyToken, verifyRole } 
= require(
  '../middleware/authMiddleware'
);

router.get('/', getProducts);
router.get('/:id', getProductById );
router.post('/', verifyToken, verifyRole('admin'), createProduct);
router.put('/:id', verifyToken, verifyRole('admin'), updateProduct);
router.delete('/:id', verifyToken, verifyRole('admin'), deleteProduct);

module.exports = router;