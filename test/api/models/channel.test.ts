import Channel from "../../../src/api/models/channel";
import sequelize from "../../../src/api/orm";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("channel model", () => {
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
        type: "not public, private or dm",
      }).validate();
    }).rejects.toThrow(/Validation error/);
  });
});
