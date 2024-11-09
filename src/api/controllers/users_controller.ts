import { IncomingMessage, ServerResponse } from "http";
import { User } from "../models/models";
import { getBody } from "../utils/http_utils";
import { createSessionToken, hashString } from "../utils/string_utils";

/**
 * @deprecated
 * @param req
 * @param res
 */
async function getAllUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await User.findAll({
      attributes: ["email"],
    });
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        users: users,
      }),
    );
  } catch (err: any) {
    res.statusCode = 400;
    res.end(JSON.stringify(err.message));
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
      session_token: createSessionToken(),
    });
    if (user == null) {
      throw "Something went wrong.";
    }
    // Must do this because Sequelize won't allow you to choose which fields are returned
    ["id", "updated_at", "created_at", "password"].forEach(
      (field) => delete user.dataValues[field],
    );
    res.statusCode = 201;
    res.end(
      JSON.stringify({
        user: user,
      }),
    );
  } catch (err: any) {
    // TODO: more robust error handling
    res.statusCode = 400;
    res.end(JSON.stringify(err.message));
  }
}

async function loginUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = JSON.parse(await getBody(req));
    const email = body["email"];
    // Must hash password before comparing it to the one in the database
    const password = hashString(body["password"], "sha256");
    const user = await User.findOne({
      where: { email: email, password: password },
    });
    if (user === null) {
      throw "There was an error logging you in. Make sure you spelled your email and password correctly.";
    } else {
      user.setDataValue("session_token", createSessionToken());
      await user.save();
      ["id", "updated_at", "created_at", "password"].forEach(
        (field) => delete user.dataValues[field],
      );
      res.statusCode = 200;
      res.end(JSON.stringify({ user: user }));
    }
  } catch (err) {
    // TODO: more robust error handling
    res.statusCode = 400;
    res.end(JSON.stringify(err));
  }
}

async function logoutUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = JSON.parse(await getBody(req));
    const email = body["email"];
    const token = body["session_token"];
    const user = await User.findOne({
      where: { email: email, session_token: token },
    });
    if (user === null) {
      throw "There was an error logging you out.";
    } else {
      user.setDataValue("session_token", null);
      await user.save();
      ["id", "updated_at", "created_at", "password"].forEach(
        (field) => delete user.dataValues[field],
      );
      res.statusCode = 200;
      res.end(JSON.stringify({ user: user }));
    }
  } catch (err) {
    // TODO: more robust error handling
    res.statusCode = 400;
    res.end(JSON.stringify(err));
  }
}

export { getAllUsers, createUser, loginUser, logoutUser };
