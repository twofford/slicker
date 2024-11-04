import Message from "../../src/models/message";
import sequelize from "../../src/orm";

describe("message model", () => {
  // Close db connection after tests run
  afterAll(async () => {
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
});
