import User from "../../../src/api/models/user";
import sequelize from "../../../src/api/orm";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("user model", () => {
  it("does not throw an error if email and password are valid", async () => {
    expect(async () => {
      await User.create({
        email: "test_email@gmail.com",
        password: "startrek1234",
      });
    }).not.toThrow();
  });

  it("throws an error if email is not valid", async () => {
    expect(async () => {
      await User.create({
        email: "test_email@.com",
        password: "startrek1234",
      });
    }).rejects.toThrow(/Validation isEmail on email failed/);
  });

  it("throws an error if password is shorter than 10 characters", async () => {
    expect(async () => {
      await User.create({
        email: "test_email@gmail.com",
        password: "too$hort",
      });
    }).rejects.toThrow(/Password must be at least 10 characters long/);
  });
});
