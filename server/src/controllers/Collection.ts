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

const uploadNftImage = async (req: Request, res: Response) => {
  try {
    const collection = await Collection.findOne({ collectionId: req.body.id });
    const UpdateCollection = await Collection.updateOne(
      { collectionId: req.body.id },
      { ...collection, nftImageUrl: req.file.buffer },
      {
        new: true,
        runValidators: true,
      }
    ).exec();
    res.status(200).json({ status: "success", data: collection });
  } catch (error) {
    console.log(error);
  }
};

const uploadGamifiedNftImage = async (req: Request, res: Response) => {
  try {
    const collection = await Collection.findOne({ collectionId: req.body.id });
    const UpdateCollection = await Collection.updateOne(
      { collectionId: req.body.id },
      { ...collection, nftLoyaltyImageUrl: req.file.buffer },
      {
        new: true,
        runValidators: true,
      }
    ).exec();
    res.status(200).json({ status: "success", data: UpdateCollection });
  } catch (error) {
    console.log(error);
  }
};

export { createCollection, getAllCollection, uploadNftImage, uploadGamifiedNftImage };
