import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
import logger from "./middleware/logger";
import cors from "cors"
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200 
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions))
app.use(logger);


app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);



// test route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express developer",
    author: "Md Akashuzzaman Riaz",
  });
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
