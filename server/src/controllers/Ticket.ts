import { Request, Response } from "express";
import Ticket from "../models/Ticket";

const getOngoingTicket = async (req: Request, res: Response) => {
  try {
    const tickerList = await Ticket.find({ potentialAction: "Ticket Open" });
    res.status(200).json({ status: "success", data: tickerList });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error });
  }
};

const getClosedTicket = async (req: Request, res: Response) => {
  try {
    const tickerList = await Ticket.find({ potentialAction: "Ongoing Enquiry" });
    res.status(200).json({ status: "success", data: tickerList });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error });
  }
};

const getNewTicket = async (req: Request, res: Response) => {
  try {
    const tickerList = await Ticket.find({ potentialAction: "Ticket Open" });
    res.status(200).json({ status: "success", data: tickerList });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error });
  }
};

const createTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.create({
      potentialAction: "Ticket Open",
      collectionId: req.body.collectionId,
      productId: req.body.productId,
    });
    res.status(200).json({ status: "success ", data: ticket });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error });
  }
};

const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id });

    if (!ticket) res.status(500).json({ status: "failure", message: "No such ticket exists" });

    const updateTicket = await Ticket.updateOne(
      { _id: req.body.id },
      { ...Ticket, potentialAction: "Ongoing", isRead: true },
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    res.status(200).json({ status: "success", data: updateTicket });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error });
  }
};

export { updateTicketStatus, createTicket, getClosedTicket, getNewTicket, getOngoingTicket };
