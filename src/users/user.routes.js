import { Router } from "express";
import { check, param } from "express-validator";
import { getUsers, getUserById, updateUser, updateRol, deleteUser } from "./user.controller.js";
import { adminRol, existeUsuarioById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { updateUserValidator } from "../middlewares/validator.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { hasRoles } from "../middlewares/validate-role.js";

const router = Router();

router.get("/", getUsers);

router.get(
    "/findUser/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    getUserById
)

router.put(
    "/:id",
    updateUserValidator,
    updateUser
)

router.patch(
    "/updateRol/:uid",
    [
        validarJWT,
        hasRoles("ADMIN"),
        check("uid", "No es un ID válido").isMongoId(),
        check("uid").custom(existeUsuarioById),
        check("uid").custom(adminRol),
        validarCampos
    ],
    updateRol
)

router.delete(
    "/deleteUser/:uid",
    [
        validarJWT,
        hasRoles("ADMIN"),
        check("uid", "No es un ID válido").isMongoId(),
        check("uid").custom(existeUsuarioById),
        validarCampos
    ],
    
    deleteUser
    

)

export default router;