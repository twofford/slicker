import http, { Server } from "http";
import request from "supertest";
import sequelize from "../../../src/api/orm";
import routeAuthRequests from "../../../src/api/routers/auth_router";
import User from "../../../src/api/models/user";

let authServer: Server;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  authServer = http.createServer(routeAuthRequests);
  authServer.listen(3000);
});

beforeEach(async () => {
  await sequelize.truncate({ cascade: true });
});

afterAll(async () => {
  await sequelize.close();
  authServer.close();
});

afterEach(async () => {
  await sequelize.truncate({ cascade: true });
});

describe("createUser", () => {
  it("creates a new user when given a valid email and password", async () => {
    const res = await request(authServer)
      .post("/new")
      .send({ email: "my_email@gmail.com", password: "startrek1234" });
    expect(res.statusCode).toBe(201);
    expect(res.error).toBeFalsy();
  });

  it("does not return the user's hashed password", async () => {
    const res = await request(authServer)
      .post("/new")
      .send({ email: "my_email@gmail.com", password: "startrek1234" });
    const body = await JSON.parse(res.text);
    expect(body.password).toBeUndefined();
  });

  it("returns an error when given an invalid email", async () => {
    const res = await request(authServer)
      .post("/new")
      .send({ email: "my_email@.com", password: "startrek1234" });
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(/Validation isEmail on email failed/);
  });

  it("returns an error when given an invalid password", async () => {
    const res = await request(authServer)
      .post("/new")
      .send({ email: "my_email@gmail.com", password: "too$short" });
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(/Password must be at least 10 characters long/);
  });
});

describe("loginUser", () => {
  it("returns a session token when given a valid email and password", async () => {
    await User.create({
      email: "test_for_login@gmail.com",
      password: "startrek1234",
    });
    const res = await request(authServer)
      .post("/login")
      .send({ email: "test_for_login@gmail.com", password: "startrek1234" });
    const body = await JSON.parse(res.text);
    expect(res.statusCode).toBe(200);
    expect(body.user.session_token).toBeDefined();
    const loggedInUser = await User.findOne({
      where: { email: "test_for_login@gmail.com" },
    });
    expect(loggedInUser!.getDataValue("session_token")).not.toBeNull();
  });

  it("does not return the user's hashed password", async () => {
    await User.create({
      email: "test_for_login@gmail.com",
      password: "startrek1234",
    });
    const res = await request(authServer)
      .post("/login")
      .send({ email: "test_for_login@gmail.com", password: "startrek1234" });
    const body = await JSON.parse(res.text);
    expect(body.password).toBeUndefined();
  });

  it("returns an error when the user isn't found", async () => {
    await User.create({
      email: "test_for_login@gmail.com",
      password: "startrek1234",
    });
    const res = await request(authServer).post("/login").send({
      email: "non_existent_email@gmail.com",
      password: "startrek1234",
    });
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(
      /There was an error logging you in. Make sure you spelled your email and password correctly./,
    );
  });
});

describe("logoutUser", () => {
  it("sets the user's session token to null when given a valid email and session token", async () => {
    await User.create({
      email: "test_for_logout@gmail.com",
      password: "startrek1234",
      session_token: "1234567890",
    });
    const res = await request(authServer).post("/logout").send({
      email: "test_for_logout@gmail.com",
      session_token: "1234567890",
    });
    const body = await JSON.parse(res.text);
    expect(res.statusCode).toBe(200);
    expect(body.user.session_token).toBeNull();
    const loggedOutUser = await User.findOne({
      where: { email: "test_for_logout@gmail.com" },
    });
    expect(loggedOutUser!.getDataValue("session_token")).toBeNull();
  });

  it("returns an error when not given a valid email and/or session token", async () => {
    await User.create({
      email: "test_for_logout@gmail.com",
      password: "startrek1234",
      session_token: "1234567890",
    });
    const res = await request(authServer).post("/logout").send({
      email: "test_for_logout@gmail.com",
      session_token: "a_bad_session_token",
    });
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(/There was an error logging you out/);
  });
});
