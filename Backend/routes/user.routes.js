import express from "express";
import { getCustomers } from "../controllers/user.controller.js";

const router = express.Router();

// GET all customers
router.get("/", getCustomers);

export default router;