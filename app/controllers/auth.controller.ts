import { Request, Response } from "express";

const Authorizeduser = (req: Request, res: Response) => {
    res.status(200).send("Authorized.");
};

export default {
    Authorizeduser
}