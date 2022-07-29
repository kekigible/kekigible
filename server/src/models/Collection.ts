import mongoose from "mongoose";
import { genUUID } from "../utils/Utils";
import Product, { ProductSchema } from "./Product";

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    min: [5, "Minimum 5 letter word"],
    max: [10, "Maximum 20 letter word"],
    required: [true, "COllection Name is required"],
    trim: true,
  },

  collectionId: {
    type: String,
    default: genUUID(),
    unique: true,
  },

  author: {
    type: String,
    required: [true, "Author is required"],
  },

  description: {
    type: String,
    min: [5, "Minimal description required"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    required: [true, "Created date is required"],
  },

  modifiedAt: {
    type: Date,
    default: Date.now(),
  },

  //assuming it is a collection of products

  decayingTime: {
    type: Date,
  },

  productArray: {
    type: [ProductSchema],
    default: [],
  },

  warrantyType: {
    type: String,
    enum: {
      values: ["Standard", "Extended", "Lifetime", "others"],
    },
  },

  numberOfProducts: Number,

  nftImageUrl: String,

  nftLoyaltyImageUrl: String,

  nftSoulBound: { type: Boolean, default: false },

  nftPurchasable: { type: Number, default: 10 },

  loyaltyCoinAlloted: { type: Number, default: 10, min: 1 },
});

export default mongoose.model("Collection", collectionSchema);
