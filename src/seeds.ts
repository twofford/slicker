import { QueryInterface, Transaction } from "sequelize";
import sequelize from "./orm";

const users = [
  {
    id: 1,
    email: "taylor.wofford@gmail.com",
    password: "startrek",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    email: "waylor.tofford@gmail.com",
    password: "starwars",
    created_at: new Date(),
    updated_at: new Date(),
  },
];
const channels = [
  {
    id: 1,
    title: "General",
    type: "public",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    title: "Star Trek Chat",
    type: "public",
    created_at: new Date(),
    updated_at: new Date(),
  },
];
const messages = [
  {
    body: "Hello, world!",
    channel_id: 1,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    body: "Wello horld!",
    channel_id: 1,
    user_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
const channelMemberships = [
  { channel_id: 1, user_id: 1, created_at: new Date(), updated_at: new Date() },
  { channel_id: 1, user_id: 2, created_at: new Date(), updated_at: new Date() },
  { channel_id: 2, user_id: 1, created_at: new Date(), updated_at: new Date() },
  { channel_id: 2, user_id: 2, created_at: new Date(), updated_at: new Date() },
];

async function seedDatabase(queryInterface: QueryInterface) {
  queryInterface.sequelize.transaction(async (t: Transaction) => {
    await sequelize.sync({ force: true });
    return Promise.all([
      queryInterface.bulkInsert("users", users, { transaction: t }),
      queryInterface.bulkInsert("channels", channels, { transaction: t }),
      queryInterface.bulkInsert("messages", messages, { transaction: t }),
      queryInterface.bulkInsert("channel_memberships", channelMemberships, {
      transaction: t,
      }),
    ]);
  });
}

export { seedDatabase };
