import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Get all products
export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error("Error fetching products:", error);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Create a new product
export const createProduct = async (req, res) => {
	const { name, price, image } = req.body; // User will send this data

	// Check if all required fields are provided
	if (!name || !price || !image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	if (isNaN(price)) {
		return res.status(400).json({ success: false, message: "Price must be a number" });
	}

	// Create a new product document
	const newProduct = new Product({ name, price, image });

	try {
		await newProduct.save(); // Save the product to the database
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error creating product:", error);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Update a product
export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const product = req.body;

	// Validate that the ID is valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product ID" });
	}

	try {
		// Find and update the product by ID
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		
		if (!updatedProduct) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		console.error("Error updating product:", error);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Delete a product
export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	// Validate that the ID is valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product ID" });
	}

	try {
		// Find and delete the product by ID
		const deletedProduct = await Product.findByIdAndDelete(id);

		if (!deletedProduct) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.error("Error deleting product:", error);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
