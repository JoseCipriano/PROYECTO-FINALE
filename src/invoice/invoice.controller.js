import Invoice from "../invoice/invoice.model.js";
import Product from "../product/product.model.js";

export const updateInvoice = async (req, res) => {
    try {
        const { nameProduct, quantity, price } = req.body.products[0]; 
        const { id } = req.params;  

        if (quantity <= 0 || price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity and price must be greater than 0"
            });
        }

        const product = await Product.findOne({ nameProduct });
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }

        const invoice = await Invoice.findById(id); 
        if (!invoice) {
            return res.status(400).json({
                success: false,
                message: "Invoice not found"
            });
        }

        const productInInvoice = invoice.products.find(p => p.nameProduct === nameProduct);
        if (!productInInvoice) {
            return res.status(400).json({
                success: false,
                message: `Product ${nameProduct} not found in invoice`
            });
        }

        productInInvoice.product = product._id;  
        productInInvoice.quantity = quantity;
        productInInvoice.price = price;
        productInInvoice.totalProduct = quantity * price;

        invoice.total = invoice.products.reduce((acc, curr) => acc + curr.totalProduct, 0);

        const updatedInvoice = await invoice.save();

        return res.status(200).json({
            success: true,
            message: "Product updated in invoice",
            updatedInvoice
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating product in invoice",
            error: error.message
        });
    }
};

export const getInvoiceByUser = async (req, res) => {
    try {
        const invoices = await Invoice.find({ user: req.usuario._id }).populate({
            path: "products.product",
            select: "nameProduct price category  -_id",
            populate: { 
                path: "category", 
                select: "nameCategory -_id" 
            }
        });

        return res.status(200).json({
            success: true,
            message: "Invoices by user",
            total: invoices.length,
            invoices
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting invoices by user",
            error: error.message
        });
    }
}