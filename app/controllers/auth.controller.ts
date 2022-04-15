import { Request, Response } from "express";

const Authorizeduser = async (req: Request, res: Response) => {
    try {
        res.status(200).send("Authorized.");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export default {
    Authorizeduser
}