const Cart = require("../models/cartModel");

// GET all carts
const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
            .populate("user")
            .populate("items.product");

        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving carts",
            error: error.message
        });
    }
};

// GET cart by user
const getCartByUser = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.params.userId
        })
        .populate("items.product");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving cart",
            error: error.message
        });
    }
};

// CREATE cart
const createCart = async (req, res) => {
    try {
        const {
            user,
            product,
            quantity,
            price
        } = req.body;

        if (
            !user ||
            !product ||
            !quantity ||
            price === undefined
        ) {
            return res.status(400).json({
                message: "Missing required cart information"
            });
        }

        let cart = await Cart.findOne({ user });

        if (!cart) {
            cart = await Cart.create({
                user,
                items: [
                    {
                        product,
                        quantity,
                        price
                    }
                ],
                totalAmount: price * quantity
            });

            return res.status(201).json(cart);
        }

        const existingItem = cart.items.find(
            (item) =>
                item.product.toString() === product
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                product,
                quantity,
                price
            });
        }

        cart.totalAmount = cart.items.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );

        await cart.save();

        await cart.populate("items.product");

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({
            message: "Error adding product to cart",
            error: error.message
        });
    }
};

// UPDATE cart
const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({
            message: "Error updating cart",
            error: error.message
        });
    }
};

const removeCartItem = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item._id.toString() !== itemId
    );

    cart.totalAmount =
      cart.items.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0
      );

    await cart.save();

    await cart.populate(
      "items.product"
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Error removing cart item",
      error: error.message
    });
  }
};

// DELETE cart
const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(
            req.params.id
        );

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        res.status(200).json({
            message: "Cart deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting cart",
            error: error.message
        });
    }
};

module.exports = { getCarts, getCartByUser, createCart, updateCart, deleteCart, removeCartItem };