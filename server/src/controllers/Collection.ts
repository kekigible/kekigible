import { Request, Response, NextFunction } from "express";
import Collection from "../models/Collection";

const createCollection = async (req: Request, res: Response) => {
  try {
    const newCollection = Collection.create({ ...req.body });
    res.status(200).json({ statue: "Created Collection", data: newCollection });
  } catch (error) {
    throw res.status(200).json({ status: "Failed to create collection", message: error });
  }
};

export { createCollection };
