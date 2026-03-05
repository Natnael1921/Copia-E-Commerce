import Cart from "../models/Cart.model.js";

/* ADD TO CART */
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const item = cart.items.find(
        (i) => i.product.toString() === productId
      );

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/* GET USER CART */
export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/* UPDATE ITEM QUANTITY */
export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    const item = cart.items.id(req.params.id);

    item.quantity = quantity;

    await cart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/* REMOVE ITEM */
export const removeCartItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.id
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/* CLEAR CART */
export const clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] }
    );

    res.json({ message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
};