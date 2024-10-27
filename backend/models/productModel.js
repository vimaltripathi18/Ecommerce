import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: [{ type: String }],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  sizes: {
    type: Array,
    required: true
  },
  bestseller: {
    type: Boolean
  },
  date: {
    type: Number,
    required: true,
    default: Date.now
  }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;