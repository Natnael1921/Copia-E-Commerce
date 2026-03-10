import Product from "../models/Product.model.js";

/* CREATE PRODUCT (ADMIN) */
export const createProduct = async (req, res, next) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);

    const { name, description, price, category, brand } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !brand) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate file upload
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Product image is required" });
    }

    // Convert price to Number
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      brand,
      image: req.file.path, // Cloudinary URL
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
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
    const updates = { ...req.body };

    if (req.file?.path) updates.image = req.file.path;

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
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
