import express from "express";
import protect from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";

import {
  placeOrder,
  getMyOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

router.get("/", protect, admin, getOrders);
router.put("/:id", protect, admin, updateOrderStatus);

export default router;