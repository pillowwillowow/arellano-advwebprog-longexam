const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  SALT,
  SECRET_KEY
} = require(
  '../config/config'
);

const getUsers = async (
  req,
  res
) => {
  try {
    const users =
      await User.find()
        .select('-password');

    res.status(200).json(
      users
    );
  } catch (error) {
    res.status(500).json({
      message:
        'Error retrieving users',
      error:
        error.message
    });
  }
};

const getUserById = async (
  req,
  res
) => {
  try {
    if (
      req.user.role !==
        'admin' &&
      req.user.id !==
        req.params.id
    ) {
      return res.status(403).json({
        message:
          'You are not authorized to view this user.'
      });
    }

    const user =
      await User.findById(
        req.params.id
      ).select(
        '-password'
      );

    if (!user) {
      return res.status(404).json({
        message:
          'User not found'
      });
    }

    res.status(200).json(
      user
    );
  } catch (error) {
    res.status(500).json({
      message:
        'Error retrieving user',
      error:
        error.message
    });
  }
};

const createUser = async (
  req,
  res
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          'All fields are required.'
      });
    }

    if (
      password.length < 8
    ) {
      return res.status(400).json({
        message:
          'Password must contain at least 8 characters.'
      });
    }

    const existingUser =
      await User.findOne({
        email:
          email.toLowerCase()
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          'Email already exists.'
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        Number(SALT)
      );

    const user =
      await User.create({
        firstName,
        lastName,
        email:
          email.toLowerCase(),
        password:
          hashedPassword,
        role:
          'customer',
        isActive:
          true
      });

    res.status(201).json({
      _id:
        user._id,
      firstName:
        user.firstName,
      lastName:
        user.lastName,
      email:
        user.email,
      role:
        user.role,
      isActive:
        user.isActive
    });
  } catch (error) {
    res.status(500).json({
      message:
        'Error creating user',
      error:
        error.message
    });
  }
};

const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          'Email and password are required.'
      });
    }

    const user =
      await User.findOne({
        email:
          email.toLowerCase()
      });

    if (!user) {
      return res.status(401).json({
        message:
          'Invalid email or password.'
      });
    }

    if (
      user.isActive === false
    ) {
      return res.status(403).json({
        message:
          'Your account is inactive.'
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        message:
          'Invalid email or password.'
      });
    }

    const token =
      jwt.sign(
        {
          id:
            user._id.toString(),
          role:
            user.role
        },
        SECRET_KEY,
        {
          expiresIn:
            '1d'
        }
      );

    res.status(200).json({
      token,
      user: {
        id:
          user._id,
        firstName:
          user.firstName,
        lastName:
          user.lastName,
        email:
          user.email,
        role:
          user.role,
        isActive:
          user.isActive
      }
    });
  } catch (error) {
    res.status(500).json({
      message:
        'Login failed',
      error:
        error.message
    });
  }
};

const updateUser = async (
  req,
  res
) => {
  try {
    if (
      req.user.role !==
        'admin' &&
      req.user.id !==
        req.params.id
    ) {
      return res.status(403).json({
        message:
          'You are not authorized to update this user.'
      });
    }

    const updateData = {
      ...req.body
    };

    if (
      req.user.role !==
      'admin'
    ) {
      delete updateData.role;
      delete updateData.isActive;
    }

    if (
      updateData.password
    ) {
      if (
        updateData.password.length <
        8
      ) {
        return res.status(400).json({
          message:
            'Password must contain at least 8 characters.'
        });
      }

      updateData.password =
        await bcrypt.hash(
          updateData.password,
          Number(SALT)
        );
    }

    if (
      updateData.email
    ) {
      updateData.email =
        updateData.email.toLowerCase();
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new:
            true,
          runValidators:
            true
        }
      ).select(
        '-password'
      );

    if (!user) {
      return res.status(404).json({
        message:
          'User not found'
      });
    }

    res.status(200).json(
      user
    );
  } catch (error) {
    res.status(500).json({
      message:
        'Error updating user',
      error:
        error.message
    });
  }
};

const deleteUser = async (
  req,
  res
) => {
  try {
    const user =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        message:
          'User not found'
      });
    }

    res.status(200).json({
      message:
        'User deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      message:
        'Error deleting user',
      error:
        error.message
    });
  }
};

module.exports = { getUsers, getUserById, createUser, loginUser, updateUser, deleteUser };