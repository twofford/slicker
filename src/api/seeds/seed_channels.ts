import sequelize from "../orm";
import Channel from "../models/channel";

async function seedChannels() {
  try {
    const now = new Date();
    const queryInterface = sequelize.getQueryInterface();
    await Channel.sync({ force: true });
    await queryInterface.bulkInsert("channels", [
      {
        title: "General",
        type: "public",
        created_at: now,
        updated_at: now,
      },
      {
        title: "Star Trek Chat",
        type: "public",
        created_at: now,
        updated_at: now,
      },
    ]);
    const channelCount = await Channel.count();
    console.log(`Seeded ${channelCount} channels`);
  } catch (err) {
    console.log(err);
  }
}

seedChannels();
