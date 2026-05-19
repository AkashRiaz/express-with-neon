import type { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUserIntoDB(req.body);

    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(201).json({
      success: true,
      message: "User login successfully",
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

const refreshToken = async (req: Request, res: Response) => {
   try {
    const result = await AuthService.generateRefreshToken(req.cookies.refreshToken);

    res.status(201).json({
      success: true,
      message: "Access token generated",
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
  refreshToken,
};
