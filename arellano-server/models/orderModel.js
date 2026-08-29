const mongoose = require('mongoose');

require("./userModel");
require("./productModel");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        quantity: {
          type: Number,
          required: true,
          min: 1
        },

        price: {
          type: Number,
          required: true,
          min: 0
        }
      }
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: [
        "Ongoing",
        "Confirmed",
        "Ready for Claiming",
        "Claimed",
        "Cancelled"
      ],
      default: "Ongoing"
    },

    shippingAddress: {
      type: String,
      required: true
    },

    orderDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

orderSchema.index({
  user: 1,
  createdAt: -1
});

orderSchema.index({
  status: 1,
  createdAt: -1
});

module.exports = mongoose.model(
  "Order",
  orderSchema
);