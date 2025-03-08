import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { addProductCart, deleteProductCart, getShoopingCart } from "./cart.controller.js";

const router = Router();

router.post(
    "/addProductCart",
    [
        validarJWT,
        validarCampos,
    ],
    addProductCart
)

router.get(
    "/",
    [
      validarJWT,
      validarCampos  
    ],
    
    getShoopingCart
)

router.delete(
    "/deleteProductCart",
    [
        validarJWT,
        validarCampos
    ],
    
    deleteProductCart

)


export default router;