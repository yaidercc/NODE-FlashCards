const router = require("express").Router();
const { check } = require("express-validator");
const topicControllers = require("../controllers/Topic.controller");
const validateFields = require("../helpers/validarCampos");
const isAuthenticated = require("../middlewares/isAuthenticated");

// TODO: Hacer validacion de usuario autenticado tanto aqui como en los controllers

router.get("/:id",[
    check("id", "El id del temario es incorrecto o esta vacio.").isMongoId(),
    validateFields
] , topicControllers.getTopic)

router.get("/getTopics/:user", topicControllers.getTopics)

router.post("/createTopic/:user", 
[
    // isAuthenticated,
    // validateFields,
    check("name","El nombre del temario es incorrecto o esta vacio").not().isEmpty(),
    check("user","El usuario es incorrecto o esta vacio").isMongoId(),
    validateFields,
], topicControllers.createTopic)

router.put("/editTopic/:id",[
    check("name","El nombre del temario es incorrecto o esta vacio").not().isEmpty(),
    // check("user","El usuario es incorrecto o esta vacio").isMongoId(),
    validateFields,
], topicControllers.editTopic)

router.put("/deleteTopic/:id",[
    check("name","El nombre del temario es incorrecto o esta vacio").not().isEmpty(),
    // check("user","El usuario es incorrecto o esta vacio").isMongoId(),
    validateFields,
], topicControllers.editTopic)

module.exports = router;
