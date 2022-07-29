import { Request, Response, NextFunction } from "express";
import Collection from "../models/Collection";
import { reqCompany } from "../types";
import { PayloadType } from "../types";
import Company from "../models/Company";
import { verify } from "jsonwebtoken";
import Product from "../models/Product";
import { genUUID } from "../utils/Utils";

const createCollection = async (req: reqCompany, res: Response) => {
  try {
    // console.log(req.body, req.file, req.user);
    // console.log(req.query.id)
    const payload = verify(
      req.query.id as string,
      process.env.JWT_SECRET_KEY as string
    ) as unknown as PayloadType;

    //@ts-ignore
    // console.log(req.files, req.files.productImage.data);
    req.user = await Company.findOne({ id: payload.id });
    console.log(req.body);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    let productArray = [];
    const collectionID = genUUID();
    for (let i = 1; i <= req.body.numberOfProducts; i++) {
      const newProduct = Product.create({ productId: i, collectionId: collectionID });
      productArray = [...productArray, newProduct];
    }
    // const newCollection = await Collection.create({ ...req.body, nftImageUrl: req.files[0].buffer });
    const newCollection = await Collection.create({
      productName: req.body.productName as string,
      companyId: req.user.companyId as string,
      collectionId: collectionID,
      author: "me",
      description: req.body.description,
      decayingTime: 12222,
      warrantyType: req.body.warrantyType || "Standard",
      numberOfProducts: req.body.numberOfProducts,
      //@ts-ignore
      nftImageUrl: req.files.productImage.data,
    });
    res.status(200).json({ status: "Created Collection" });
  } catch (error) {
    res.status(500).json({ status: "Failed to create collection", message: error });
  }
};

const getAllCollection = async (req: Request, res: Response) => {
  try {
    const collections = await Collection.find({});
    res.status(200).json({ status: "success", data: collections });
  } catch (error) {
    res.status(500).json({ status: "Failed to get collection list", message: error });
  }
};

const getCollection = async (req: Request, res: Response) => {
  try {
    const collections = await Collection.findOne({ collectionId: req.params.id });
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

export {
  createCollection,
  getAllCollection,
  uploadNftImage,
  uploadGamifiedNftImage,
  getCollection,
};
