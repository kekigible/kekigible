import { Router } from "express";
import { createCollection, getAllCollection } from "../controllers/Collection";

const CollectionRouter = Router();

CollectionRouter.post("/collection/create", createCollection);
CollectionRouter.get("/collection", getAllCollection);

export default CollectionRouter;
