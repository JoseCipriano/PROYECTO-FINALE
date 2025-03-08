import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { validarJWT } from "./validar-jwt.js";
import { hasRoles } from "./validate-role.js";


export const createdCategoryValidator = [
    validarJWT,
    hasRoles("ADMIN"),
    body("nameCategory").notEmpty().withMessage("The name category is required"),
    body("descriptionCategory").notEmpty().withMessage("The description is required"),
    validarCampos,
];

export const updateCategoryValidator = [
    validarJWT,
    hasRoles("ADMIN"),
    param("id").isMongoId().withMessage("It is not a valid ID"),
    body("descriptionCategory").optional().notEmpty().withMessage("Description is required"),
    validarCampos,
];