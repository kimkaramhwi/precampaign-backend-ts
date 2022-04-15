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
  const { email, password }: IUserAttributes = req.body;

  User.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, config.auth.secret);

      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

export default {
  signup, signin
}