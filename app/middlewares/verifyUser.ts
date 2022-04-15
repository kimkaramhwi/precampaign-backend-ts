import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { IUserAttributes } from "../models/user.model";

export const checkDuplicateUserEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email }: IUserAttributes = req.body;
    User.findOne({
        where: {
            email: email || null
        }
    })
        .then(user => {
            if (user) {
                res.status(400).send({
                    message: "Email already exists!"
                });
                return;
            }
            next();
        })
}

export const passwordIsValid = (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: IUserAttributes = req.body;

    User.findOne({
        where: {
            email: email
        }
    }).
        then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const IsValid = bcrypt.compareSync(password, user.password);

            if (!IsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            req.user = user;
            next();
        })
}