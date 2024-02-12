import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGODB_URI: str(),
  PORT: port(),
  JWT_SECRET_KEY: str(),
  BASE_URL: str(),
  API_KEY: str(),
});
