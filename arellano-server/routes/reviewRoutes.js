const express = require('express');
const router = express.Router();

const { getReviews, getReviewsByProduct, createReview, updateReview, deleteReview
} = require(
  '../controllers/reviewController'
);

const {
  verifyToken,
  verifyRole
} = require(
  '../middleware/authMiddleware'
);

router.get('/', getReviews);
router.get('/product/:productId', getReviewsByProduct);
router.post('/', verifyToken, createReview);
router.put('/:id', verifyToken, verifyRole('admin'), updateReview);
router.delete('/:id', verifyToken, verifyRole('admin'), deleteReview);

module.exports = router;