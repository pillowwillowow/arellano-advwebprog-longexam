const Review = require("../models/reviewModel");

// GET all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("user")
            .populate("product")
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving reviews",
            error: error.message
        });
    }
};

// GET reviews for a product
const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({
            product: req.params.productId
        })
        .populate(
            "user",
            "firstName lastName email"
        )
        .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving product reviews",
            error: error.message
        });
    }
};

// CREATE review
const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({
            message: "Error creating review",
            error: error.message
        });
    }
};

// UPDATE review
const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({
            message: "Error updating review",
            error: error.message
        });
    }
};

// DELETE review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(
            req.params.id
        );

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.status(200).json({
            message: "Review deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting review",
            error: error.message
        });
    }
};

module.exports = { getReviews, getReviewsByProduct, createReview, updateReview, deleteReview };