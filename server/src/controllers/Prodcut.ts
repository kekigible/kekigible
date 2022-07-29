import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import { ProductType } from "../types";

const extendWarranty = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ productId: req.body.id }).exec();

    if (!product) return res.status(404).json({ message: "Product doesnt exist" });

    const UpdateTask = await Product.updateOne(
      { productId: req.body.id },
      { ...product, decayingTime: new Date(product.decayingTime + req.body.extendBy) },
      {
        new: true,
        runValidators: true,
      }
    ).exec();
    res.status(200).json({
      status: "success",
      message: "Warranty extended successfully",
      data: UpdateTask,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Something went wrong with Warranty extension" });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = Product.create({
      ...req.body,
      productDate: req.body.purchasedDate,
      imageUrl: req.file,
      decayingTime: req.body.timePeriod,
    });

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};

export { extendWarranty, createProduct };
