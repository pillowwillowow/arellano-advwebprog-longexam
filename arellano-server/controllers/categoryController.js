const Category = require("../models/categoryModel");

// GET all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully.",
            count: categories.length,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving categories",
            error: error.message
        });
    }
};

// GET category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category retrieved successfully.",
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving category",
            error: error.message
        });
    }
};

// CREATE category
const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);

        res.status(201).json({
            success: true,
            message: "Category created successfully.",
            data: category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error creating category",
            error: error.message
        });
    }
};

// UPDATE category
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            data: category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error updating category",
            error: error.message
        });
    }
};

// DELETE category
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(
            req.params.id
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting category",
            error: error.message
        });
    }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };