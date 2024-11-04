import ChannelMembership from "../../src/models/channel_membership";
import sequelize from "../../src/orm";

describe("channel_membership model", () => {
  // Close db connection after tests run
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
});
