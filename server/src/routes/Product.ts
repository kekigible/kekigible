import { Router } from "express";
import { createProduct, extendWarranty } from "../controllers/Prodcut";

const ProductRouter = Router();

ProductRouter.post("/collection/extend", extendWarranty);
ProductRouter.post("/collection/create", createProduct);

export default ProductRouter;
