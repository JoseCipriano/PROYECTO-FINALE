import Invoice from "../invoice/invoice.model.js";
import Cart from "../cart/cart.model.js";

export const completeBuys = async (req, res) => {
    try{
        const cart = await Cart.findOne({ user: req.usuario._id }).populate("products.product");
        if(!cart || cart.products.length === 0){
            return res.status(400).json({
                success: false,
                message: "Cart not found"
            })
        }

        let total = 0;
        const productsBuy = [];

        for(const item of cart.products){
            const product = item.product;
            if(product.stock < item.quantity){
                return res.status(400).json({
                    success: false,
                    message: `There are few units available for the product ${product.nameProduct}`
                })
            }
            product.stock -= item.quantity;
            product.sales += item.quantity;
            await product.save();

            const productTotal = product.price * item.quantity;
            total += productTotal;
            productsBuy.push({
                product: product._id,
                nameProduct: product.nameProduct,
                quantity: item.quantity,
                price: product.price,
                totalProduct: productTotal
            });
        }

        const invoice = new Invoice({
            user: req.usuario._id,
            products: productsBuy,
            total,
            date: new Date()
        });

        await invoice.save();

        cart.products = [];
        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Purchase completed",
            invoice
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error completing purchase",
            error: error.message
        })
    }
}

export const gethistoryBuy = async (req, res) => {
    try{
        const invoices = await Invoice.find({ user: req.usuario._id }).populate("products.product", "nameProduct price");
        
        if(invoices.length === 0){
            return res.status(400).json({
                success: false,
                message: "No purchases found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Purchases",
            total: invoices.length,
            invoices
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error getting purchases",
            error: error.message
        })
    }
}
