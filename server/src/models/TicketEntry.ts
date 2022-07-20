import mongoose from "mongoose";
import { genUUID } from "../utils/Utils";
import Ticket from "./Ticket";

// we can keep start date and end date then calculate the duration from them , for now including it in the schema up for discussion
const TicketEntrySchema = new mongoose.Schema({

  entryTitle: {
    type: String,
    min: [5, "Minimum 5 letter word"],
    max: [20, "Maximum 20 letter word"],
    required: [true, "Item Name is required"],
    trim: true,
  },

  entryDescription: {
    type: String,
    min: [5, "Minimal description required"],
  },

  entryIdentifier: {
    type: String,
    default: genUUID(),
    unique: true,
  },

  //not sure about image
  imageUrl: String,

  enteries : { 
    type : [Ticket]
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
});

export default mongoose.model("Warranty", TicketEntrySchema);
