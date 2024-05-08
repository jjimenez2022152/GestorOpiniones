import { Router } from "express";
import { check } from "express-validator";
import { agregarComentario, getComments,
     commentPut, commentDelete } from "./coment.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", getComments);

router.post(
    "/crear",
    [
        check("comentario", "El comentario es requerido").not().isEmpty(),
        check("idPublicacion", "El ID de la publicación es requerido").not().isEmpty(), 
        validarCampos,
        //validarJWT
    ],
    agregarComentario
);

router.put(
    "/:id",
    [
        //validarJWT,
        check("comentario", "El comentario es obligatorio").not().isEmpty(),
        validarCampos
    ],
    commentPut
);

router.delete(
    "/:id",
    //validarJWT, 
    commentDelete
);

export default router;
