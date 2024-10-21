import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import sequelize from "./orm";
import { getUserChannels } from "./controllers/channels_controller";
import { getChannelMessages } from "./controllers/messages_controller";

dotenv.config();

const app: Express = express();
sequelize.sync({ force: true });

app.get("/", (_: Request, res: Response) => {
  res.send("S L I C K");
});
app.get(routes["getUserChannels"], getUserChannels);
app.get(routes["getChannelMessages"], getChannelMessages);

app.listen(3000);
