// ARCHITECTURE

// When the client-side code decides to open a WebSocket, it contacts the HTTP server to obtain an authorization “ticket”.
// The server generates this ticket. It typically contains some sort of user/account ID, the IP of the client requesting the ticket, a timestamp, and any other sort of internal record keeping you might need.
// The server stores this ticket (i.e. in a database or cache), and also returns it to the client.
// The client opens the WebSocket connection, and sends along this “ticket” as part of an initial handshake.
// The server can then compare this ticket, check source IPs, verify that the ticket hasn’t been re-used and hasn’t expired, and do any other sort of permission checking. If all goes well, the WebSocket connection is now verified.

import { WebSocket } from "ws";
import http, { IncomingMessage } from "http";
import routeAuthRequests from "./routers/auth_router";

const authServer = http.createServer(routeAuthRequests);
authServer.listen(3000);

const chatServer = new WebSocket.Server({ port: 8080 });

chatServer.once("connection", (ws, req) => {
  console.log(`req: ${JSON.stringify(req.headers)}`);
  console.log("A new client connected");

  ws.on("message", (msg: IncomingMessage) => {
    console.log("New message received:", JSON.parse(msg.toString()));
  });
});

export { authServer, chatServer };
