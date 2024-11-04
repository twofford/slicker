import {
  Channel,
  Message,
  User,
  ChannelMembership,
} from "../src/models/models";

async function setupDatabase(models: any) {
  models.forEach(async (model: any) => {
    await model.sync();
  });
}

setupDatabase([Channel, Message, User, ChannelMembership]);
