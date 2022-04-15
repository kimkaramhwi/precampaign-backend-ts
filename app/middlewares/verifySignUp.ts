import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { IUserAttributes } from "../models/user.model";

export const checkDuplicateUserEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email }: IUserAttributes = req.body;
    User.findOne({
        where: {
            email: email || null
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Email already exists!"
            });
            return;
        }
        next();
    })
}
