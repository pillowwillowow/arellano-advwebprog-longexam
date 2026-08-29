const express =
  require('express');

const router =
  express.Router();

const { getUsers, getUserById, createUser, loginUser, updateUser, deleteUser } 
= require(
 '../controllers/userController'
);

const { verifyToken, verifyRole } 
= require(
  '../middleware/authMiddleware'
);

router.post( '/', createUser);
router.post( '/login', loginUser );
router.get( '/', verifyToken, verifyRole('admin'), getUsers);
router.get( '/:id', verifyToken, getUserById);
router.put( '/:id', verifyToken, updateUser);
router.delete( '/:id', verifyToken, verifyRole('admin'), deleteUser);

module.exports = router;