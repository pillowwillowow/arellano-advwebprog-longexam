// routes/categoryRoutes.js

const express = require("express");

const authentication = require("../middleware/authentication");

const authorization = require("../middleware/authorization");

const router = express.Router();

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", authentication, authorization("admin"), createCategory);
router.put("/:id", authentication, authorization("admin"), updateCategory);
router.delete("/:id", authentication, authorization("admin"), deleteCategory);

module.exports = router;
