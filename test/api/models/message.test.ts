import Channel from "../../../src/api/models/channel";
import Message from "../../../src/api/models/message";
import User from "../../../src/api/models/user";
import sequelize from "../../../src/api/orm";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  await sequelize.truncate({ cascade: true });
  await Channel.create({ id: 123, title: "test", type: "public" });
  await User.create({
    id: 123,
    email: "test_email@gmail.com",
    password: "startrek1234",
  });
});

afterEach(async () => {
  await sequelize.truncate({ cascade: true });
});

describe("message model", () => {
  it("does not throw an error if all fields are valid", async () => {
    expect(async () => {
      await Message.create({
        body: "Testing! Testing!",
        user_id: 123,
        channel_id: 123,
      });
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
    }).rejects.toThrow(/violates foreign key constraint/);
  });

  it("throws an error if the channel does not exist", async () => {
    await expect(async () => {
      await Message.create({
        body: "Testing! Testing!",
        user_id: 123,
        channel_id: 456,
      });
    }).rejects.toThrow(/violates foreign key constraint/);
  });
});
