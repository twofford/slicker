import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dbport = process.env.DBPORT;
const dbname = process.env.DBNAME;

const sequelize = new Sequelize(
  `postgres://${username}:${password}@${host}:${dbport}/${dbname}`
);

export default sequelize;
