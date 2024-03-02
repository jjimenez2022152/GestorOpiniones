import { Router } from "express";
import { check } from "express-validator";
import { agregarComentario } from "./comentario.controller.js"; // Importa el controlador de comentarios
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/crear",
    [
        check("texto", "El texto del comentario es requerido").not().isEmpty(),
        check("publicacionId", "El ID de la publicación es requerido").not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    agregarComentario
);

export default router;
