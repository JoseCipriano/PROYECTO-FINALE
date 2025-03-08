import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { existenteEmail, esRoleValido, existeUsuarioById, adminRol } from "../helpers/db-validator.js";
import { validarJWT } from "./validar-jwt.js";
import { hasRoles } from "./validate-role.js";

export const registerValidator = [
    body("name", "The name is required").not().isEmpty(),
    body("surname", "The surname is required").not().isEmpty(),
    body("email", "You must enter a valid email").isEmail(),
    body("email").custom(existenteEmail),
    body('role').custom(esRoleValido),
    body("password", "Password must be at least 8 characters").isLength({ min: 8}),
    validarCampos
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Enter a valid email address"),
    body("username").optional().isString().withMessage("Enter a valid username"),
    body("password", "Password must be at least 8 characters").isLength({min: 8}),
    validarCampos
]

export const updateUserValidator = [
    validarJWT,
    hasRoles("ADMIN"),
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(existeUsuarioById),
    param("id").custom(adminRol),
    validarCampos,
];