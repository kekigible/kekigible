import { Router } from "express";
import {
  buyProducts,
  createProduct,
  extendWarranty,
  getProducts,
} from "../controllers/Prodcut";
import { authMiddleware } from "../middleware/Auth";

const ProductRouter = Router();

ProductRouter.post("/product/extend", extendWarranty);
ProductRouter.post("/product/create", createProduct);
ProductRouter.get("/product", authMiddleware, getProducts);
ProductRouter.post("/product/buy", buyProducts);

export default ProductRouter;
