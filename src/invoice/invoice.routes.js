import { Router } from 'express';
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { getInvoiceByUser, updateInvoice } from './invoice.controller.js';

const router = Router();

router.put("/updateInvoice/:id",
    [
        validarJWT,
        validarCampos
    ],
    updateInvoice
)

router.get("/invoices",
    [
        validarJWT,
        validarCampos
    ],
    getInvoiceByUser
)

export default router;