import { Router } from "express";
import { check } from "express-validator";
import { publicationsPost, publicationsDelete, publicationsGet } from "./publication.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/crear",
    [
        
        check("titulo", "El título es requerido").not().isEmpty(),
        check("categoria", "La categoría es requerida").not().isEmpty(),
        check("texto", "El texto es requerido").not().isEmpty(),
        validarCampos,
        validarJWT// Agregar middleware para validar JWT
    ],
    publicationsPost
);

router.delete(
    "/:id",
    validarJWT, // Agregar middleware para validar JWT
    publicationsDelete
);

router.get(
    "/",
    publicationsGet
);
export default router;
