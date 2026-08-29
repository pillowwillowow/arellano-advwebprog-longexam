const jwt = require('jsonwebtoken');

const {
  SECRET_KEY
} = require('../config/config');

const verifyToken = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        'Bearer '
      )
    ) {
      return res.status(401).json({
        message:
          'Access denied. Token required.'
      });
    }

    const token =
      authHeader.split(' ')[1];

    const decoded =
      jwt.verify(
        token,
        SECRET_KEY
      );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message:
        'Invalid or expired token.'
    });
  }
};

const verifyRole = (
  ...allowedRoles
) => {
  return (
    req,
    res,
    next
  ) => {
    if (
      !req.user ||
      !allowedRoles.includes(
        req.user.role
      )
    ) {
      return res.status(403).json({
        message:
          'You are not authorized to access this resource.'
      });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  verifyRole
};