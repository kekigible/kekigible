import mongoose from "mongoose";
import uuid from "node-uuid";
import { genUUID } from "../utils/Utils";

// we can keep start date and end date then calculate the duration from them , for now including it in the schema up for discussion
const TicketSchema = new mongoose.Schema({
  potentialAction: {
    type: String,
    enum: {
      values: ["Ticket Open", "Ongoing Enquiry", "Ticket Closed"],
      message: "{VALUE} is not supported",
    },
  },
});

export default mongoose.model("Warranty", TicketSchema);
