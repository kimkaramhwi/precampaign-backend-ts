import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

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

      req.userId = decoded["id"];

      next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

