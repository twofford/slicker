import http, { Server } from "http";
import request from "supertest";
import sequelize from "../../../src/api/orm";
import routeAuthRequests from "../../../src/api/routers/auth_router";

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

describe("loginUser", () => {});

describe("logoutUser", () => {});
