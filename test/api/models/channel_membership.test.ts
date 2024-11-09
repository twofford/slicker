import Channel from "../../../src/api/models/channel";
import ChannelMembership from "../../../src/api/models/channel_membership";
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

describe("channel_membership model", () => {
  it("does not throw an error if channel and user exist", async () => {
    expect(async () => {
      await ChannelMembership.create({
        channel_id: 123,
        user_id: 123,
      });
    }).not.toThrow();
  });

  it("throws an error if channel does not exist", async () => {
    expect(async () => {
      await ChannelMembership.create({
        channel_id: 456,
        user_id: 123,
      });
    }).rejects.toThrow(
      /(?=.*violates foreign key constraint)(?=.*channel_memberships_channel_id_fkey)/,
    );
  });

  it("throws an error if user does not exist", async () => {
    expect(async () => {
      await ChannelMembership.create({
        channel_id: 123,
        user_id: 456,
      });
    }).rejects.toThrow(
      /(?=.*violates foreign key constraint)(?=.*channel_memberships_user_id_fkey)/,
    );
  });
});
