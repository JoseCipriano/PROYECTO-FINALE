import { body, param } from "express-validator"
import { validarCampos } from "./validar-campos.js"
import { validarJWT } from "./validar-jwt.js"
import { hasRoles } from "./validate-role.js"
import { nameProductExists } from "../helpers/db-validator.js"

export const createdProductValidator = [
    validarJWT,
    hasRoles("ADMIN"),
    body("nameProduct").notEmpty().withMessage("Name product is required"),
    body("descriptionProduct").notEmpty().withMessage("Description is required"),
    body("price").isDecimal({min: 0}).withMessage("The price must not be less than 0"),
    body("nameProduct").custom(nameProductExists),
    validarCampos,
]

export const getProductByNameValidator = [
    body("nameProduct").custom(nameProductExists),
    validarCampos,
    
]

export const getProductSouldOutValidator = [
    validarJWT,
    hasRoles("ADMIN"),
    validarCampos,
]    

export const updateProductValidator = [
    validarJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("It is not a valid ID"),
    body("nameProduct").optional().notEmpty().withMessage("Name product is required"),
    body("descriptionProduct").optional().notEmpty().withMessage("Description is required"),
    body("price").optional().isDecimal({min: 0}).withMessage("The price must not be less than 0"),
    body("nameProduct").optional().custom(nameProductExists),
    validarCampos,
]

export const deleteProductValidator = [
    validarJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("It is not a valid ID"),
    validarCampos,
]