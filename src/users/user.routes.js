import { Router } from "express";
import { check } from "express-validator";
import {
    usuariosGet,
    usuariosPost,
    getUsuarioById,
    usuariosPut,
} from "./user.controller.js";
import {
    existenteEmail,
    existeUsuarioById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validarCampos.js";
//import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", usuariosGet);

router.get(
    "/:id", [
    check("id", "The ID entered is not valid").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
],
    getUsuarioById
);

router.post(
    "/", [
    check("username", "The username is required").not().isEmpty(),
    check("password", "Password must be greater than 6 characters").isLength({
        min: 6,
    }),
    check("email", "The email entered is not valid ").isEmail(),
    check("email").custom(existenteEmail),
    validarCampos,
],
    usuariosPost
);


router.put(
    "/:id",
    [
    check("id", "The ID entered is not valid").isMongoId(),
    check("id").custom(existeUsuarioById),
    check('email', 'El email actual es obligatorio').not().isEmpty(),
    check('newPassword', 'La nueva contraseña es obligatoria').not().isEmpty(), // Cambio de newEmail a newPassword
    validarCampos,
    ],
    usuariosPut
);
export default router;