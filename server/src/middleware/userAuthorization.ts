import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/users";
import env from "../utils/validateEnv";

export const userAuthorization = async (req: any, res: any, next: any) => {
  // verify authorization
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required." });
  }

  // token
  const token = authorization.split(" ")[1];

  try {
    // get id from token
    const { _id } = (await jwt.verify(token, env.JWT_SECRET_KEY)) as JwtPayload;
    // pass user with id after authorization
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized." });
  }
};
