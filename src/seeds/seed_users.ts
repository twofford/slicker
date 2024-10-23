import sequelize from "../orm";
import User from "../models/user";

async function seedUsers() {
  try {
    const now = new Date();
    const queryInterface = sequelize.getQueryInterface();
    await User.sync({ force: true });
    await queryInterface.bulkInsert("users", [
      {
        email: "taylor.wofford@gmail.com",
        password: "startrek",
        created_at: now,
        updated_at: now,
      },
      {
        email: "waylor.tofford@gmail.com",
        password: "starwars",
        created_at: now,
        updated_at: now,
      },
    ]);
    const userCount = await User.count()
    console.log(`Seeded ${userCount} users`);
  } catch (err) {
    console.log(err);
  }
}

seedUsers();
