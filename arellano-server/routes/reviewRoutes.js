
const express = require("express");

const authentication = require("../middleware/authentication");

const authorization = require("../middleware/authorization");

const router = express.Router();

const {
  getReviews,
  getReviewsByProduct,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.get("/", getReviews);
router.get("/product/:productId", getReviewsByProduct);
router.post("/", authentication, createReview);
router.put("/:id", authentication, authorization("admin"), updateReview);
router.delete("/:id", authentication, authorization("admin"), deleteReview);

module.exports = router;
