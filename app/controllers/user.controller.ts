import { Request, Response } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { IUserAttributes } from "../models/user.model";

const signup = (req: Request, res: Response) => {
  try {
    const { email, password, name }: IUserAttributes = req.body;

    User.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 8)
    })
      .then(() => {
        res.send({ message: "User was registered successfully!" });
      })
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const signin = (req: Request, res: Response) => {
  try {
    const user = req.user;
    const token = jwt.sign({ id: user.id }, config.auth.secret);

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token
    })
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default {
  signup, signin
}