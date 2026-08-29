const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const { HttpStatus } = require("../config/constants");

// Get all products
const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const filter = {};

        // Category filtering
        if (req.query.category) {
            const category = await Category.findOne({
                categoryName: {
                    $regex: `^${req.query.category}$`,
                    $options: "i"
                }
            });

            if (category) {
                filter.category = category._id;
            } else {
                filter.category = null;
            }
        }

        // Keyword search
        if (req.query.search) {
            filter.$or = [
                {
                    productName: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                }
            ];
        }

        // Sorting
        const sort = req.query.sort || "createdAt";

        // Get products
        const products = await Product.find(filter)
            .populate("category")
            .sort(sort)
            .skip(skip)
            .limit(limit);

        // Total matching products
        const total = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            message: "Products retrieved successfully.",
            count: products.length,
            total,
            page,
            limit,
            data: products
        });

    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving products",
            count: 0,
            data: null,
            error: error.message
        });
    }
};

// Get one product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product retrieved successfully.",
            count: 1,
            data: product
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Product not found.",
            count: 0,
            data: null
        });
    }
};

// Create product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
        success: true,
        message: "Product created successfully.",
        count: 1,
        data: product
    });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error creating product.",
            count: 0,
            data: null,
            error: error.message
        });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            count: 1,
            data: product
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Product not found.",
            count: 0,
            data: null
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            count: 1,
            data: product
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Product not found.",
            count: 0,
            data: null
        });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };