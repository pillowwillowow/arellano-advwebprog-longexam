const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true, min: 50 },
        stock: { type: Number, required: true, min: 0 },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        image: { type: String }
    },
    {
        timestamps: true
    }
);

productSchema.index({ productName: 1 });
productSchema.index({ category: 1 });

module.exports = mongoose.model("Product", productSchema);