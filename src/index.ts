// ARCHITECTURE

// When the client-side code decides to open a WebSocket, it contacts the HTTP server to obtain an authorization “ticket”.
// The server generates this ticket. It typically contains some sort of user/account ID, the IP of the client requesting the ticket, a timestamp, and any other sort of internal record keeping you might need.
// The server stores this ticket (i.e. in a database or cache), and also returns it to the client.
// The client opens the WebSocket connection, and sends along this “ticket” as part of an initial handshake.
// The server can then compare this ticket, check source IPs, verify that the ticket hasn’t been re-used and hasn’t expired, and do any other sort of permission checking. If all goes well, the WebSocket connection is now verified.

import { WebSocket } from "ws";
import http, { IncomingMessage, ServerResponse } from "http";
import { createUser } from "./controllers/users_controller"

async function routeAuthRequests(req: IncomingMessage, res: ServerResponse){
  const path: string = req["url"] || "";
  const method: string = req["method"] || "";
  if (method == "POST") {
    switch (path) {
      case "/new":
        // Create a new user
        await createUser(req, res);
        break;
      case "/login":
        // Log the user in
        break;
      case "/logout":
        // Log the user out
        break;
      default:
        // Unrecognized auth path
        const validPaths = ["/new", "/login", "/logout"];
        res.setHeader("ALLOW", validPaths);
        res.statusCode = 400;
        res.write(
          JSON.stringify({
            error: "Bad Request",
            message: `This server does not respond to requests at path ${path}. Valid paths: ${validPaths.join(
              ", "
            )}`,
          })
        );
        break;
    }
  } else {
    // Invalid HTTP method
    res.setHeader("ALLOW", "POST");
    res.statusCode = 405;
    res.write(
      JSON.stringify({
        error: "Method Not Allowed",
        message: `Endpoint ${path} only accepts POST requests. You sent a ${method} request.`,
      })
    );
  }
  res.end();
}

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
