import Cart from "./cart.model.js";
import Product from "../product/product.model.js";

export const addProductCart = async (req, res) => {
    try{
        const { nameProduct, quantity } = req.body;

        const product = await Product.findOne({ nameProduct: nameProduct });
        if(!product){
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }

        if(product.stock === 0){
            return res.status(400).json({
                success: false,
                message: "Product out of stock"
            })
        }

        if(quantity > product.stock){
            return res.status(400).json({
                success: false,
                message: `There are few units available for the product ${product.nameProduct}`
            })
        }

        let cart = await Cart.findOne({ user: req.usuario._id });

        if(!cart){
            cart = new Cart({ user: req.usuario._id, products: [] });
        }

        const productExist = cart.products.find(p => p.product.toString() === product._id.toString());
        if(productExist){
            productExist.quantity += quantity; 
        }else{
            cart.products.push({ product: product._id, quantity });
        }

        const shoopingCart = await cart.save();
        return res.status(200).json({
            success: true,
            message: "Product added to cart",
            shoopingCart
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error adding product to cart",
            error: error.message
        })
    }
}

export const getShoopingCart = async (req, res) => {
    try{
        const shoopingCart = await Cart.findOne({ user: req.usuario._id }).populate("products.product", "nameProduct price -_id");
        if(!shoopingCart){
            return res.status(400).json({
                success: false,
                message: "Cart not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Shooping Cart",
            shoopingCart
        }) 
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error getting cart",
            error: error.message
        })
    }
}

export const deleteProductCart = async (req, res) => {
    try{
        const { nameProduct } = req.body;

        const shoopingCart = await Cart.findOne({ user: req.usuario._id }).populate("products.product");;
       
        shoopingCart.products = shoopingCart.products.filter(p => p.product.nameProduct !== nameProduct);
       
        const deleteProductCart = await shoopingCart.save();

        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            deleteProductCart
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error removing product from cart",
            error: error.message
        })
    }    
}   
