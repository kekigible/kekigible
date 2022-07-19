import mongoose from "mongoose";
import uuid from "node-uuid";
import { genUUID } from "../utils/Utils";

// we can keep start date and end date then calculate the duration from them , for now including it in the schema up for discussion
const WarrantySchema = new mongoose.Schema({
  duration: {
    type: String || Number, // confused whether will be keeping it in seconds or abstarct like 1d / 30min etc
    required: [true, "Duration is required "],
    default: "6 months",
  },

  startDate: {
    Type: Date,
    required: [true, "Start Date is required "],
  },

  endDate: {
    Type: Date,
  },

  itemName: {
    type: String,
    min: [5, "Minimum 5 letter word"],
    max: [20, "Maximum 20 letter word"],
    required: [true, "Item Name is required"],
    trim: true,
  },

  itemDescription: {
    type: String,
    min: [5, "Minimal description required"],
  },

  itemIdentifier: {
    type: String,
    default: genUUID(),
    unique: true,
  },

  //not sure about image
  imageUrl: String,

  itemUrl: {
    type: String,
    required: [true, "Item url is required "],
  },

  potentialAction: {
    type: String,
    enum: {
      values: ["Produced", "Ongoing", "Expired"],
      message: "{VALUE} is not supported",
    },
  },
});

export default mongoose.model("Warranty", WarrantySchema);
