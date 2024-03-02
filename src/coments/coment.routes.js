import { Router } from "express";
import { check } from "express-validator";
import { agregarComentario } from "./comentario.controller.js"; // Importa el controlador de comentarios
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/crear",
    [
        check("comentario", "El comentario es requerido").not().isEmpty(), // Cambiado de 'texto' a 'comentario'
        check("publicacionId", "El ID de la publicación es requerido").not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    agregarComentario
);

export default router;
