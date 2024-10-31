import { ServerResponse } from "http";

function handleError(res: ServerResponse, err: SyntaxError | any) {
  if (err instanceof SyntaxError) {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        error: "Bad Request",
        message: "The JSON you submitted was improperly formatted.",
      })
    );
  } else {
  }
}

export default handleError;
