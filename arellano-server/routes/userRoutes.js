const express = require("express");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/", authentication, authorization("admin"), getUsers);
router.get("/:id", authentication, getUserById);
router.put("/:id", authentication, updateUser);
router.delete("/:id", authentication, authorization("admin"), deleteUser);

module.exports = router;
