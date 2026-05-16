import type { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUserIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "login successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const AuthController = {
  loginUser,
};
