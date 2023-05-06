const mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, requried: true, lowercase: true },
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
  },
  { collection: "product" }
);

mongoose.model("product", productSchema);
