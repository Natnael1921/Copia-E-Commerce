import express from "express";

const router = express.Router();

// Base test route
router.get("/", (req, res) => {
  res.json({ message: "API v1 working " });
});

export default router;