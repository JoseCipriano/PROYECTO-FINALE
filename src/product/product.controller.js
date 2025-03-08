'use strict';

import Product from "./product.model.js";
import Category from "../category/category.model.js";

export const addProduct = async (req, res) => {
    try{
        const data = req.body;
        const category = await Category.findOne({ category: data.category});

        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        const product = new Product({
            ...data,
            category: category._id,
        });

        await product.save();

        res.status(200).json({
            success: true,
            product
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error saving product',
            error: error.message
        })
    }
}

export const getProductByName = async (req, res) => {
    try{
        const { nameProduct } = req.params;
        const product = await Product.findOne({ nameProduct: nameProduct }).populate("category", "nameCategory -_id");

        if(!product){
            return res.status(404).json({
                sucess:false,
                message: "Product not found."
            })
        }

        return res.status(200).json({
            success: true,
            product
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error when searching for the product',
            error: error.message
        })
    }
}

export const getProduct = async (req, res) =>{
    try{
        const products = await Product.find().populate("category", "nameCategory");

        return res.status(200).json({
            success: true,
            message: "Product Catalog",
            total: products.length,
            products
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error when displaying the product catalog.',
            error: error.menssge
        })
    }
}

export const getProductbyCategory = async (req, res) => {
    try{
        const { uid } = req.params;

        const category = await Category.findById(uid);
        if(!category) {
            return res.status(400).json({
                success: false,
                message: "Category not found"
            })
        }

        const products = await Product.find({category: uid})

        res.status(200).json({
            success: true,
            total: products.length,
            products
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error when displaying the product catalog by category.',
            error: error.menssge
        })
    }
}

export const getProductSouldOut = async (req, res) => {
    try{
        const products = await Product.find({stock: 0})

        res.status(200).json({
            success: true,
            total: products.length,
            products
        })   
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error when displaying the product catalog.',
            error: error.menssge
        })
    }
}

export const updateProduct = async (req, res) => {
    try{
        const { uid } = req.params;
        const { ...data} = req.body;

        const product = await Product.findByIdAndUpdate(uid, data, {new: true});
        
        res.status(200).json({
            success: true,
            message: 'Product updated successfully.',
            product
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const { uid } = req.params;

        const product = await Product.findByIdAndDelete(uid);
        
        if(!product){
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully.',
            product
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        })
    }
}

export const getTopSellingProducts = async (req, res) => {
    try{
        const topSellingProducts = await Product.find().sort({sales: -1}).limit(10);

        return res.status(200).json({
            success: true,
            message: 'Top selling products',
            total: topSellingProducts.length,
            topSellingProducts
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error getting top selling products',
            error: error.message
        })
    }
}
