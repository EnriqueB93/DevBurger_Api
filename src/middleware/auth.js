import jwt, { decode } from "jsonwebtoken";
import authconfig from "./../config/auth";

function authMiddleware(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: "token not provideds" });
  }

  const token = authToken.split(" ").at(1);

  try {
    jwt.verify(token, authconfig.secret, (err, decode) => {
      if (err) {
        throw new Error();
      }

      request.userId = decode.id;
    });
  } catch (err) {
    return response.status(401).json({ error: "token is invalid" });
  }

  return next();
}

export default authMiddleware;
("");
