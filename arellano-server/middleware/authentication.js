const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../config/config");

const { HttpStatus } = require("../config/constants");

module.exports = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        error: new Error("Invalid Request!"),
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        error: new Error("Invalid Request!"),
      });
    }

    const decodedToken = await jwt.verify(token, SECRET_KEY);

    const user = await decodedToken;

    request.user = user;

    next();
  } catch (error) {
    return response.status(HttpStatus.UNAUTHORIZED).json({
      error: new Error("Invalid request!"),
    });
  }
};
