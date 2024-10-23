import express, { Express, Request, Response } from "express";
import { WebSocket } from "ws";
import dotenv from "dotenv";
import { IncomingMessage } from "http";

dotenv.config();

const app: Express = express();
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("A new client connected");

  ws.on("message", (msg: IncomingMessage) => {
    console.log("New message received:", msg.toString());
  });
});

app.listen(3000);
