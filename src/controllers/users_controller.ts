import { Request, Response, NextFunction } from "express";
import { User } from "../models/models";

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.findAll({
      attributes: ["email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    const pw = req.body.pw;
    const user = await User.create({
      email: email,
      password: pw,
    });
    res.json(user.get("session_token"));
  } catch (err) {
    console.log(err)
    next(err);
  }
}

export { getAllUsers, createUser };
