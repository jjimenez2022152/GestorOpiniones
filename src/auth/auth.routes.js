import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validarCampos.js"
import { login } from "./auth.controller.js";

const router = Router()

router.post(
    '/login',
    [
        check('user', 'Correo necesario').not().isEmpty(),
        check('password', 'Contraseña necesaria').not().isEmpty(),
        validarCampos,
    ], login)

    export default router