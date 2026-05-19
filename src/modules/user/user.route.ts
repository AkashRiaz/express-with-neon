import { Router, type Request, type Response } from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();

router.post("/", UserController.createUser);

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  UserController.getAllUsers,
);

router.get("/:id", UserController.getSingleUser);

router.put(`/:id`, UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

export const userRoute = router;
