import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.username;
const password = process.env.password;
const host = process.env.host;
const port = process.env.port;
const dbname = process.env.dbname;

const sequelize = new Sequelize(
  `postgres://${username}:${password}@${host}:${port}/${dbname}`
);

export default sequelize;
