const router = require("express").Router();
const { check } = require("express-validator")
const userControllers = require("../controllers/User.controller");
const validateFields = require("../helpers/validarCampos");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/getUser/:id", isAuthenticated, userControllers.getUser)
router.put("/editUser/:id", [
    isAuthenticated,
    check("id", "El id del usuario es obligatorio o esta vacio").not().isEmpty(),
    validateFields,
    check("first_name", "El nombre es obligatorio").not().isEmpty(),
    check("surname", "El nombre es obligatorio").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("mail", "El correo es obligatorio").not().isEmpty(),
    validateFields,
], userControllers.editUser)

router.delete("/deleteUser/:id", [
    isAuthenticated,
    check("id", "El id es obligatorio o esta vacio").not().isEmpty(),
    validateFields,
], userControllers.deleteUser)

module.exports = router;
