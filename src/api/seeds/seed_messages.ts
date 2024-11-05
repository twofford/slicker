import sequelize from "../orm";
import Message from "../models/message";
import Channel from "../models/channel";
import User from "../models/user";

async function seedMessages() {
  try {
    const now = new Date();
    const channels = await Channel.findAll();
    const users = await User.findAll();
    const queryInterface = sequelize.getQueryInterface();
    await Message.sync({ force: true });
    await queryInterface.bulkInsert("messages", [
      {
        body: "Hello world!",
        channel_id:
          channels[Math.floor(Math.random() * channels.length)].dataValues[
            "id"
          ],
        user_id:
          users[Math.floor(Math.random() * users.length)].dataValues["id"],
        created_at: now,
        updated_at: now,
      },
      {
        body: "Goodbye world!",
        channel_id:
          channels[Math.floor(Math.random() * channels.length)].dataValues[
            "id"
          ],
        user_id:
          users[Math.floor(Math.random() * users.length)].dataValues["id"],
        created_at: now,
        updated_at: now,
      },
      {
        body: "Hecat andonyallo, mando-corco Mandostova!",
        channel_id:
          channels[Math.floor(Math.random() * channels.length)].dataValues[
            "id"
          ],
        user_id:
          users[Math.floor(Math.random() * users.length)].dataValues["id"],
        created_at: now,
        updated_at: now,
      },
      {
        body: "He'd long forsworn all weighing of consequence and allowing as he did that men's destinies are given yet he usurped to contain within him all that he would ever be in the world and all that the world would be to him and be his charter written in the urstone itself he claimed agency and said so.",
        channel_id:
          channels[Math.floor(Math.random() * channels.length)].dataValues[
            "id"
          ],
        user_id:
          users[Math.floor(Math.random() * users.length)].dataValues["id"],
        created_at: now,
        updated_at: now,
      },
    ]);

    const messageCount = await Message.count();
    console.log(`Seeded ${messageCount} messages`);
  } catch (err) {
    console.log(err);
  }
}

seedMessages();
