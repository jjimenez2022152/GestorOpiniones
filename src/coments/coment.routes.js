import { Router } from "express";
import { check } from "express-validator";
import { agregarComentario } from "./coment.controller.js"; // Importa el controlador de comentarios
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/crear",
    [
        check("comentario", "El comentario es requerido").not().isEmpty(),
        check("idPublicacion", "El ID de la publicación es requerido").not().isEmpty(), // Corregido el nombre del parámetro
        validarCampos,
        validarJWT
    ],
    agregarComentario
);

export default router;
