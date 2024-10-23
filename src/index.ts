import express, { Express, Request, Response, json } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { getUserChannels } from "./controllers/channels_controller";
import { getChannelMessages } from "./controllers/messages_controller";
import { createUser, getAllUsers } from "./controllers/users_controller";

dotenv.config();

const app: Express = express();
const jsonParser = express.json()

app.get("/", (req: Request, res: Response) => {
  res.send("S L I C K");
});
app.get(routes["getUserChannels"], getUserChannels);
app.get(routes["getChannelMessages"], getChannelMessages);
app.get(routes["getAllUsers"], getAllUsers);
app.post(routes["createUser"], jsonParser, createUser)

app.listen(3000);
