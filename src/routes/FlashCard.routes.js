const router = require("express").Router();
const { check } = require("express-validator");
const flashcardControllers = require("../controllers/FlashCard.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const validateFields = require("../helpers/validarCampos");

router.get("/getFlashcard/:id",isAuthenticated, flashcardControllers.getFlashCard);
router.get("/getFlashcards/:topic",isAuthenticated, flashcardControllers.getFlashCards);
router.post(
  "/createFlashcard/:topic",
  [
    isAuthenticated,
    check("topic", "El temario es incorrecto o esta vacio.").isMongoId(),
    validateFields,
    check("question", "La pregunta es incorrecta o esta vacia.").not().isEmpty(),
    check("answer", "La respuesta es incorrecta o esta vacia.").not().isEmpty(),
    validateFields,
  ],
  flashcardControllers.createFlashCard
);

router.put(
  "/editFlashcard/:topic/:id",
  [
    isAuthenticated,
    check("topic", "El temario es incorrecto o esta vacio.").isMongoId(),
    validateFields,
    check("id", "El id de la flashcard es incorrecto o esta vacio.").isMongoId(),
    validateFields,
    check("question", "La pregunta es incorrecta o esta vacia.").not().isEmpty(),
    check("answer", "La respuesta es incorrecta o esta vacia.").not().isEmpty(),
    validateFields,
  ],
  flashcardControllers.editFlashcard
);

router.delete(
  "/editFlashcard/:topic/:id",
  [
    isAuthenticated,
    check("topic", "El temario es incorrecto o esta vacio.").isMongoId(),
    validateFields,
    check("id", "El id de la flashcard es incorrecto o esta vacio.").isMongoId(),
    validateFields,
  ],
  flashcardControllers.deleteFlashcard
);

module.exports = router;
