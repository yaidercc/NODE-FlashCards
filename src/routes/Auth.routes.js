const Routes = require("express").Router();
const { check } = require("express-validator");
const validateFields = require("../helpers/validarCampos");
const authControllers = require("../controllers/Auth.controller");

Routes.post("/login", authControllers.login);

Routes.post(
  "/singin",
  [
    check("first_name", "El nombre es obligatorio").not().isEmpty(),
    check("surname", "El nombre es obligatorio").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("mail", "El correo es obligatorio").not().isEmpty(),
    check("password", "La clave es obligatoria").not().isEmpty(),
    validateFields,
  ],
  authControllers.signin
);

module.exports = Routes;
