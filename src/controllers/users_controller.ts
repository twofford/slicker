// import { Request, Response, NextFunction } from "express";
import { IncomingMessage, ServerResponse } from "http";
import { User } from "../models/models";
import { getBody } from "../utils/http_utils";
import { createSessionToken } from "../utils/string_utils";

async function getAllUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await User.findAll({
      attributes: ["email"],
    });
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        users: users,
      })
    );
  } catch (err: any) {
    res.statusCode = 400;
    res.end(
      JSON.stringify(err.message)
    )
  }
}

async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = JSON.parse(await getBody(req));
    const email = body["email"];
    const password = body["password"];
    const user = await User.create({
      email: email,
      password: password,
      session_token: createSessionToken()
    });
    // Must do this because Sequelize won't allow you to choose which fields are returned
    ["id", "updated_at", "created_at", "password"].forEach(field => delete user.dataValues[field])
    res.statusCode = 201;
    res.end(
      JSON.stringify({
        user: user
      })
    );
  } catch (err: any) {
    // TODO: More robust error handling
    res.statusCode = 400;
    res.end(
      JSON.stringify(err.message)
    )
  }
}

export { getAllUsers, createUser };
