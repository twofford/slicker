import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import sequelize from "./orm";
import { seedDatabase } from "./seeds";
import { getUserChannels } from "./controllers/channels_controller";
import { getChannelMessages } from "./controllers/messages_controller";

dotenv.config();
seedDatabase(sequelize.getQueryInterface());

const app: Express = express();
app.get("/", (_: Request, res: Response) => {
  res.send("S L I C K");
});
app.get(routes["getUserChannels"], getUserChannels);
app.get(routes["getChannelMessages"], getChannelMessages);

app.listen(3000);
