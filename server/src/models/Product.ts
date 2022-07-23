import mongoose from "mongoose";
import { genUUID } from "../utils/Utils";
import User from "./User";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    min: [5, "Minimum 5 letter word"],
    max: [20, "Maximum 20 letter word"],
    required: [true, "Item Name is required"],
    trim: true,
  },

  description: {
    type: String,
    min: [5, "Minimal description required"],
  },

  productId: {
    type: String,
    default: genUUID(),
    unique: true,
  },

  manufactorer: {
    type: String,
    required: [true, "manufactorer is required"],
  },

  //not sure about image
  imageUrl: String,

  category: {
    type: String,
    enum: {
      values: ["tech", "autonombile"], //collection tags / valuez
      message: "{VALUE} is not supported",
    },
  },

  price: Number,

  brand: String,

  ownedBy : {
    type : User,
    nullable :true,
  },

  decayingTime : { 
    type : Date 
  },

  warrantyAvail : { 
    type : Number , 
    default : -1 ,
  },

  resoldVoid : { 
    type : Boolean ,
    default : false 
  }
});

export default mongoose.model("Product", ProductSchema);
