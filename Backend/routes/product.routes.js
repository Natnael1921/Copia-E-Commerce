import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import protect from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

/* PUBLIC ROUTES */

router.get("/", getProducts);
router.get("/:id", getProductById);

/* ADMIN ROUTES */

router.post("/", protect, admin, upload.single("image"), createProduct);

router.put("/:id", protect, admin, upload.single("image"), updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

export default router;