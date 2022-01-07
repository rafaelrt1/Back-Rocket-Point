const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductsSchema = new Schema({
	img: String,
	name: String,
	listPrice: Number,
	salePrice: Number
});

module.exports = mongoose.model("products", ProductsSchema, "products");