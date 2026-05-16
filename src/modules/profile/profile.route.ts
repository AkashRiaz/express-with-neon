import { Router } from "express";
import { ProfileController } from "./profile.controller";

const router = Router();

router.post("/", ProfileController.createProfile);

router.get("/", ProfileController.getAllUserProfile);

router.get("/:id", ProfileController.getSingleUserProfile);

router.put("/:id", ProfileController.updateUserProfile);

router.delete("/:id", ProfileController.deleteUserProfile);

export const profileRoute = router;
