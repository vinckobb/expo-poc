import { Request, Response } from "express";
import { getAllUsers } from "./logic";
import { GetAllUsersResponse } from "./types";

export const method = "GET";
export const path = "/users";

export const handler = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    const response: GetAllUsersResponse = {
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
      })),
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: "Internal server error when retrieving users",
    });
  }
};
