import type { Request, Response } from "express";
import { ProfileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await ProfileService.createProfileIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllUserProfile = async (req: Request, res: Response) => {
  try {
    const result = await ProfileService.getAllUserProfileFromDB();

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ProfileService.getSingleUserProfileFromDB(
      id as string,
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Profile not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile retrieve successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ProfileService.updateUserProfileIntoDB(
      id as string,
      req.body,
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "profile not found",
        data: null,
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await ProfileService.deleteUserProfileFromDB(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "profile not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const ProfileController = {
  createProfile,
  getAllUserProfile,
  getSingleUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
