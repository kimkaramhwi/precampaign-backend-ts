import { Request, Response } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { IUserAttributes } from "../models/user.model";

const signup = async (req: Request, res: Response) => {
  const { email, password, name }: IUserAttributes = req.body;

  User.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 8)
  })
    .then(() => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

const signin = async (req: Request, res: Response) => {
  const user = req.user;
  const token = jwt.sign({ id: user.id }, config.auth.secret);

  res.status(200).send({
    id: user.id,
    name: user.name,
    email: user.email,
    accessToken: token
  })
};

export default {
  signup, signin
}