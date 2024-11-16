import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();


router.get("/", getProducts);// GET all products
router.post("/", createProduct);// POST a new product
router.put("/:id", updateProduct);// PUT (update) a product by ID
router.delete("/:id", deleteProduct);// DELETE a product by ID

export default router;
