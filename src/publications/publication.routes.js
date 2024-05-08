import { Router } from "express";
import { check } from "express-validator";
import { publicationsPost, publicationsDelete, publicationsGet, publicationsPut } from "./publication.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";
//import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/crear",
    [
        
        check("titulo", "El título es requerido").not().isEmpty(),
        check("categoria", "La categoría es requerida").not().isEmpty(),
        check("texto", "El texto es requerido").not().isEmpty(),
        validarCampos,
        //validarJWT
    ],
    publicationsPost
);

router.delete(
    "/:id",
    //validarJWT, 
    publicationsDelete
);

router.get(
    "/",
    publicationsGet
);

router.put(
    "/:id",
    [
        //validarJWT,
        check("titulo", "El título es requerido").not().isEmpty(),
        check("categoria", "La categoría es requerida").not().isEmpty(),
        check("texto", "El texto es requerido").not().isEmpty(),
        validarCampos
    ],
    publicationsPut
);
export default router;
