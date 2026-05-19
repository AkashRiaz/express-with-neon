import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connection_string: process.env.CONNECTIONSTRING as string,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expire_in: process.env.JWT_EXPIRES_IN,
  jwt_refresh_secret: process.env.REFRESH_TOKEN_SECRET,
  jwt_refresh_expire_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

export default config;
