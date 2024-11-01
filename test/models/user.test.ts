import User from "../../src/models/user";
import sequelize from "../../src/orm";

beforeEach(async () => {
  (await User.findAll()).forEach((user) => user.destroy());
});

// Close DB connection after tests run to improve speed
afterAll(async () => {
  await sequelize.close();
});

test("email and password are valid", async () => {
  const user = await User.create({
    email: "my_email@gmail.com",
    password: "startrek123",
  });
  expect(user).toBeDefined();
  expect(user.getDataValue("email")).toBe("my_email@gmail.com");
});

test("email is invalid", async () => {
  await expect(
    User.create({
      email: "my_email@.com",
      password: "startrek123",
    })
  ).rejects.toThrow(/Validation error/);
});

test("email is not a string", async () => {
  await expect(
    User.create({
      email: null,
      password: "startrek123",
    })
  ).rejects.toThrow(/User.email cannot be null/);
});

test("password is not a string", async () => {
  await expect(
    User.create({
      email: "my_email@gmail.com",
      password: null,
    })
  ).rejects.toThrow(/Cannot read properties of null/);
});
