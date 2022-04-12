const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const db = require("../models");

verifyToken = (req, res, next) => {
  let token = req.header["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token!"
    });
  }

  jwt.verify(token, config.auth.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    req.userId = decoded.id;

    next();
  });
};

const authJwt = {
    verifyToken: verifyToken
};
  
module.exports = authJwt;