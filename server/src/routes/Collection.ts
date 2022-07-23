import { Router } from "express";
import { createCollection } from "../controllers/Collection";

const CollectionRouter = Router();

CollectionRouter.post("/collection/create", createCollection);

export default CollectionRouter;
