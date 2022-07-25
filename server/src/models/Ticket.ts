import mongoose from "mongoose";
import { genUUID } from "../utils/Utils";

// we can keep start date and end date then calculate the duration from them , for now including it in the schema up for discussion
const TicketSchema = new mongoose.Schema({
  potentialAction: {
    type: String,
    enum: {
      values: ["Ticket Open", "Ongoing", "Enquiry", "Ticket Closed"],
      message: "{VALUE} is not supported",
      default: "Enquiry",
    },
  },

  collectionId: {
    type: String,
    default: genUUID(),
    unique: true,
  },

  productId: {
    type: String,
    default: genUUID(),
    unique: true,
  },
});

export default mongoose.model("Warranty", TicketSchema);
