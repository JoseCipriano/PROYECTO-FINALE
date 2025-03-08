import { Router } from "express";
import { addCategory, getCategory, updateCategory } from "./category.controller.js";
import { createdCategoryValidator } from "../middlewares/category-validator.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { hasRoles } from "../middlewares/validate-role.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post("/addCategory", 
    createdCategoryValidator, 
    addCategory);

router.get("/", getCategory);

router.patch(
    "/updateCategory/:id", 
    [
        validarJWT,
        hasRoles("ADMIN"),
        check("id", "No es un ID válido").isMongoId(),
        check("descriptionCategory").optional().notEmpty().withMessage("Description is required"),
        validarCampos

    ],
    updateCategory
    
    )

export default router;