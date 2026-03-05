import Product from "../models/Product.model.js";

/* CREATE PRODUCT (ADMIN) */
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

/* GET ALL PRODUCTS */
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    next(error);
  }
};

/* GET SINGLE PRODUCT */
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

/* UPDATE PRODUCT (ADMIN) */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (error) {
    next(error);
  }
};

/* DELETE PRODUCT (ADMIN) */
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product removed" });
  } catch (error) {
    next(error);
  }
};