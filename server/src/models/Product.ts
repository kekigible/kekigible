import mongoose from "mongoose";
import { genUUID } from "../utils/Utils";
import User, { UserSchema } from "./User";

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    default: 1,
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

  ownedBy: {
    type: UserSchema,
    nullable: true,
  },

  decayingTime: {
    type: Date,
  },

  warrantyAvail: {
    type: Number,
    default: -1,
  },

  resoldVoid: {
    type: Boolean,
    default: false,
  },

  //according to front-end

  productDate: {
    type: Date,
    validate: {
      validator: function (v) {
        return (
          v && // check that there is a date object
          v.getTime() > Date.now()
          // && v.getTime() < Date.now() + 90 * 24 * 60 * 60 * 1000
        );
      },
      message: "An event must be at least 1 day from now and not more than 90 days.",
    },
  },

  warrantyType: {
    type: String,
    enum: {
      values: ["Standard", "Extended", "Lifetime", "others"],
    },
  },
});

export { ProductSchema };
export default mongoose.model("Product", ProductSchema);
