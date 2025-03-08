import { Router } from "express";
import { createdProductValidator, deleteProductValidator, updateProductValidator, getProductByNameValidator, getProductSouldOutValidator} from "../middlewares/product-validator.js";
import { addProduct, deleteProduct, getProduct, getProductbyCategory, getProductByName, updateProduct, getProductSouldOut, getTopSellingProducts } from "./product.controller.js";
import { body, check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { nameProductExists } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { hasRoles } from "../middlewares/validate-role.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";

const router = Router()

router.post("/addProduct",
     createdProductValidator, 
     addProduct)
     

router.get(
    "/findProduct/:nameProduct", 
    [
        body("nameProduct").custom(nameProductExists),
        validarCampos
    ],

    getProductByName
    
)
router.get(
    "/",
     getProduct)




router.get(
    "/productCatalog/category/:uid", 
    getProductbyCategory)


router.get(
    "/souldOut/",
    [
        validarJWT,
        hasRoles("ADMIN"),
        validarCampos

    ],

    getProductSouldOut

)


router.put(
    "/updateProduct/:uid",
    [
        validarJWT,
        hasRoles("ADMIN"),
        check("uid").isMongoId().withMessage("it is not a valid id"),
        body("nameProduct").optional().notEmpty().withMessage("Name is required"),
        body("price").optional().isDecimal({min: 0}).withMessage("Price must not be less than 0"),
        body("descriptionProduct").optional().notEmpty().withMessage("Description is required"),
        body("nameProduct").custom(nameProductExists),
        validarCampos,
        deleteFileOnError
    ],

    updateProduct

)


router.delete(
    "/deleteProduct/:uid", 
    [
        validarJWT, 
        hasRoles("ADMIN"),
        check("uid").isMongoId().withMessage("it is not a valid id"),
        validarCampos
    ],

    deleteProduct
   
)

router.get(
    "/topSellingProducts",

    getTopSellingProducts
)

export default router;