import Message from "../../src/models/message";
import Channel from "../../src/models/channel";
import User from "../../src/models/user";
import sequelize from "../../src/orm";

describe("message model", () => {
  beforeAll(async () => {
    await Channel.create({ id: 123, title: "test", type: "public" });
    // THE PROBLEM IS BELOW. EVERYTHING RUNS FINE WITHOUT THIS.
    await User.create({
      id: 123,
      email: "my_email@gmail.com",
      password: "startrek1234",
    });
  });

  afterAll(async () => {
    await Channel.destroy({ where: { id: 123 } });
    await User.destroy({ where: { id: 123 } });
    await sequelize.close();
  });

  it("does not throw an error if all fields are valid", async () => {
    expect(async () => {
      await Message.build({
        body: "Testing! Testing!",
        user_id: 123,
        channel_id: 123,
      }).validate();
    }).not.toThrow();
  });

  it("throws an error if body is null", async () => {
    expect(async () => {
      await Message.build({
        body: null,
        user_id: 123,
        channel_id: 123,
      }).validate();
    }).rejects.toThrow(/body cannot be null/);
  });

  it("throws an error if user_id is null", async () => {
    expect(async () => {
      await Message.build({
        body: "Testing! Testing!",
        user_id: null,
        channel_id: 123,
      }).validate();
    }).rejects.toThrow(/user_id cannot be null/);
  });

  it("throws an error if channel_id is null", async () => {
    expect(async () => {
      await Message.build({
        body: "Testing! Testing!",
        user_id: 123,
        channel_id: null,
      }).validate();
    }).rejects.toThrow(/channel_id cannot be null/);
  });

  it("throws an error if the user does not exist", async () => {
    await expect(async () => {
      await Message.create({
        body: "Testing! Testing!",
        user_id: 456,
        channel_id: 123,
      });
    }).rejects.toThrow(/User does not exist/);
  });

  it("throws an error if the channel does not exist", async () => {
    await expect(async () => {
      await Message.create({
        body: "Testing! Testing!",
        user_id: 123,
        channel_id: 456,
      });
    }).rejects.toThrow(/Channel does not exist/);
  });
});
