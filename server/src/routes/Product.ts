import { Router } from "express";
import { extendWarranty } from "../controllers/Prodcut";

const ProductRouter = Router();

ProductRouter.post("/collection/create", extendWarranty);

export default ProductRouter;
