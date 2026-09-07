const express = require("express");

const authentication = require("../middleware/authentication");

const authorization = require("../middleware/authorization");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authentication, authorization("admin"), createProduct);
router.put("/:id", authentication, authorization("admin"), updateProduct);
router.delete("/:id", authentication, authorization("admin"), deleteProduct);

module.exports = router;
