import { Router } from "express";
import { createProduct, extendWarranty } from "../controllers/Prodcut";

const ProductRouter = Router();

ProductRouter.post("/product/extend", extendWarranty);
ProductRouter.post("/product/create", createProduct);

export default ProductRouter;
