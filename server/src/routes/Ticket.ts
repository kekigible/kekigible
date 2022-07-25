import { Router } from "express";
import {
  createTicket,
  getClosedTicket,
  getNewTicket,
  getOngoingTicket,
  updateTicketStatus,
} from "../controllers/Ticket";

const TicketRouter = Router();

TicketRouter.get("/ticket/new", getNewTicket);
TicketRouter.get("/ticket/ongoing", getOngoingTicket);
TicketRouter.get("/ticket/closed", getClosedTicket);
TicketRouter.post("/ticket/create", createTicket);
TicketRouter.post("/ticket/update/:id", updateTicketStatus);

export default TicketRouter;
