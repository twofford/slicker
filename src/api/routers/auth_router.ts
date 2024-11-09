import { IncomingMessage, ServerResponse } from "http";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/users_controller";

async function routeAuthRequests(req: IncomingMessage, res: ServerResponse) {
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
        await loginUser(req, res);
        break;
      case "/logout":
        // Log the user out
        await logoutUser(req, res);
        break;
      default:
        // Unrecognized auth path
        const validPaths = ["/new", "/login", "/logout"];
        res.setHeader("ALLOW", validPaths);
        res.statusCode = 400;
        res.end(
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
    res.end(
      JSON.stringify({
        error: "Method Not Allowed",
        message: `Endpoint ${path} only accepts POST requests. You sent a ${method} request.`,
      })
    );
  }
}

export default routeAuthRequests;
