import { Router } from "express";
import {
  createCollection,
  getAllCollection,
  uploadGamifiedNftImage,
  uploadNftImage,
} from "../controllers/Collection";
import { nftUpload } from "../middleware/Upload";

const CollectionRouter = Router();

CollectionRouter.post(
  "/collection/create",
  nftUpload.single("productImage"),
  createCollection
);
CollectionRouter.get("/collection", getAllCollection);
// CollectionRouter.post("/collection/upload/nft", nftUpload.single("image"), uploadNftImage);
// CollectionRouter.post(
//   "/collection/upload/gamifiednft",
//   nftUpload.single("image"),
//   uploadGamifiedNftImage
// );

export default CollectionRouter;
