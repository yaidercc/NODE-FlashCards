const router = require("express").Router();
const { check } = require("express-validator");
const topicControllers = require("../controllers/Topic.controller");
const validateFields = require("../helpers/validarCampos");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get(
  "/:id",
    [
        isAuthenticated, 
        check("id", "El id del temario es incorrecto o esta vacio.").isMongoId(), 
        validateFields
    ],
  topicControllers.getTopic
);

router.get("/getTopics", isAuthenticated, topicControllers.getTopics);

router.post(
    "/createTopic",
        [
            isAuthenticated, 
            check("name", "El nombre del temario es incorrecto o esta vacio").not().isEmpty(), 
            validateFields
        ],
    topicControllers.createTopic
);

router.put(
  "/editTopic/:id",
    [
        isAuthenticated,
        check("id", "El id es incorrecto o esta vacio").isMongoId(),
        validateFields,
        check("name", "El nombre del temario es incorrecto o esta vacio").not().isEmpty(),
        validateFields
    ],
  topicControllers.editTopic
);

router.delete(
  "/deleteTopic/:id",
  [
    isAuthenticated,
    check("id", "El id del temario es incorrecto o esta vacio.").isMongoId(),
    validateFields
  ],
  topicControllers.deleteTopic
);

module.exports = router;
