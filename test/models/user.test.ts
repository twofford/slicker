import User from "../../src/api/models/user";
import sequelize from "../../src/api/orm";

describe("user model", () => {
  // Close db connection after tests run
  afterAll(async () => {
    await sequelize.close();
  });

  it("does not throw an error if email and password are valid", async () => {
    expect(async () => {
      await User.build({
        email: "my_email@gmail.com",
        password: "startrek1234",
      }).validate();
    }).not.toThrow();
  });

  it("throws a validation error if email is not valid", async () => {
    expect(async () => {
      await User.build({
        email: "my_email",
        password: "startrek1234",
      }).validate();
    }).rejects.toThrow(/Validation error/);
  });

  it("throws a validation error if password is shorter than 10 characters", async () => {
    expect(async () => {
      await User.build({
        email: "my_email@gmail.com",
        password: "1234",
      }).validate();
    }).rejects.toThrow(/Password must be at least 10 characters long/);
  });
});
