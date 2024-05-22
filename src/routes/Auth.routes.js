const router = require("express").Router();
const { check } = require("express-validator");
const validateFields = require("../helpers/validarCampos");
const authControllers = require("../controllers/Auth.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const path = require("path")

router.post("/login", authControllers.login);

router.post(
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
router.get("/logout", isAuthenticated, authControllers.logout);

router.get("/hola",isAuthenticated, (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


module.exports = router;
