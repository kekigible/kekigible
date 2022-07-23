import { Request, Response, NextFunction } from "express";
import Collection from "../models/Collection";

const createCollection = async (req: Request, res: Response) => {
  try {
    const newCollection = Collection.create({ ...req.body });
    res.status(200).json({ statue: "Created Collection", data: newCollection });
  } catch (error) {
    res.status(500).json({ status: "Failed to create collection", message: error });
  }
};

const getAllCollection = async (req: Request, res: Response) => {
  try {
    const collections = Collection.find({});
    res.status(200).json({ status: "success", data: collections });
  } catch (error) {
    res.status(500).json({ status: "Failed to get collection list", message: error });
  }
};

export { createCollection, getAllCollection };
