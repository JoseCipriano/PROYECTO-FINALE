import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { completeBuys, gethistoryBuy } from "./buys.controller.js";

const router = Router();

router.post(
    "/completeBuy",
    [
        validarJWT,
        validarCampos
    ],
    completeBuys
)

router.get(
    "/historyBuy",
    [
        validarJWT,
        validarCampos
    ], 
    gethistoryBuy
)

export default router;