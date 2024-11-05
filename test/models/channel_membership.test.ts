import ChannelMembership from "../../src/api/models/channel_membership";
import Channel from "../../src/api/models/channel";
import User from "../../src/api/models/user";
import sequelize from "../../src/api/orm";

describe("channel_membership model", () => {
  beforeEach(async () => {
    await Channel.create({ id: 123, title: "test", type: "public" });
    await User.create({
      id: 123,
      email: "my_email@gmail.com",
      password: "startrek1234",
    });
  });

  afterEach(async () => {
    await Channel.destroy({ where: { id: 123 } });
    await User.destroy({ where: { id: 123 } });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("throws an error if channel_id is null", async () => {
    expect(async () => {
      await ChannelMembership.build({
        channel_id: null,
        user_id: 123,
      }).validate();
    }).rejects.toThrow(/channel_id cannot be null/);
  });

  it("throws an error if user_id is null", async () => {
    expect(async () => {
      await ChannelMembership.build({
        channel_id: 123,
        user_id: null,
      }).validate();
    }).rejects.toThrow(/user_id cannot be null/);
  });

  it("throws an error if the channel does not exist", async () => {
    await expect(async () => {
      await ChannelMembership.create({
        channel_id: 456,
        user_id: 123,
      });
    }).rejects.toThrow(/violates foreign key constraint/);
  });

  it("throws an error if the user does not exist", async () => {
    await expect(async () => {
      await ChannelMembership.create({
        channel_id: 123,
        user_id: 456,
      });
    }).rejects.toThrow(/violates foreign key constraint/);
  });
});
