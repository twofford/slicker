import Channel from "../../src/models/channel";
import sequelize from "../../src/orm";

describe("channel model", () => {
  // Close db connection after tests run
  afterAll(async () => {
    await sequelize.close();
  });

  it("does not throw an error if title and type are not null", async () => {
    expect(async () => {
      await Channel.build({
        title: "Test Title",
        type: "public",
      }).validate();
    }).not.toThrow();
  });

  it("throws an error if type is not `public`, `private`, or `dm`", async () => {
    expect(async () => {
        await Channel.build({
            title: "Test Title",
            type: "not public, private or dm"
        }).validate();
    }).rejects.toThrow(/Validation error/)
  })
});
