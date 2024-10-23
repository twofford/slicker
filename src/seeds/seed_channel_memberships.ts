import sequelize from "../orm";
import ChannelMembership from "../models/channel_membership";
import User from "../models/user";
import Channel from "../models/channel";

async function seedChannelMemberships() {
  try {
    const now = new Date();
    const users = await User.findAll();
    const channels = await Channel.findAll();
    const queryInterface = sequelize.getQueryInterface();
    await ChannelMembership.sync({ force: true });
    const channel_memberships = users.flatMap((user) => {
      return channels.map((channel) => ({
        channel_id: channel.dataValues["id"],
        user_id: user.dataValues["id"],
        created_at: now,
        updated_at: now,
      }));
    });
    await queryInterface.bulkInsert("channel_memberships", channel_memberships);
    const channelMembershipCount = await ChannelMembership.count();
    console.log(`Seeded ${channelMembershipCount} channel memberships`);
  } catch (err) {
    console.log(err);
  }
}

seedChannelMemberships();
