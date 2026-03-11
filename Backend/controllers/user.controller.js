import User from "../models/User.model.js";

// Get all customers (users only)
export const getCustomers = async (req, res, next) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");

    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};