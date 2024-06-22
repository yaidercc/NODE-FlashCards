const router = require("express").Router();
const { check } = require("express-validator");
const flashcardControllers = require("../controllers/FlashCard.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const validateFields = require("../helpers/validarCampos");

/**
 * @openapi
 * /api/flashcard/getFlashcard/{id}:
 *   get:
 *     summary: Obtener flashcard
 *     description: Obtener una flashcard especifico
 *     tags:
 *       - Flashcards
 *     parameters:
 *       - name: topic
 *         in: path
 *         required: true
 *         description: Id de la flashcard a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de la peticion
 *       400:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de error
 *       500:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Errores del servidor
 */
router.get("/getFlashcard/:id",isAuthenticated, flashcardControllers.getFlashCard);

/**
 * @openapi
 * /api/flashcard/getFlashcard/{topic}:
 *   get:
 *     summary: Obtener flashcards
 *     description: Obtener todos los flashcards de un temario en especifico
 *     tags:
 *       - Flashcards
 *     parameters:
 *       - name: topic
 *         in: path
 *         required: true
 *         description: Id del temario del cual se van a obtener las flashcards
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de la peticion
 *       400:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de error
 *       500:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Errores del servidor
 */
router.get("/getFlashcards/:topic",isAuthenticated, flashcardControllers.getFlashCards);


/**
 * @openapi
 * /api/flashcard/createFlashcard/{topic}:
 *   post:
 *     summary: Crear flashcard
 *     description: Crear una flashcard
 *     tags:
 *       - Flashcards
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de la peticion
 *       400:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de error
 *       500:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Errores del servidor
 */
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

/**
 * @openapi
 * /api/flashcard/editFlashcard/{topic}/{id}:
 *   put:
 *     summary: Editar flashcard
 *     description: Editar una flashcard especifico
 *     tags:
 *       - Flashcards
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de la peticion
 *       400:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de error
 *       500:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Errores del servidor
 */
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

/**
 * @openapi
 * /api/flashcard/editFlashcard/{topic}/{id}:
 *   delete:
 *     summary: Eliminar flashcard
 *     description: Eliminar una flashcard especifico
 *     tags:
 *       - Flashcards
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de la peticion
 *       400:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de error
 *       500:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Errores del servidor
 */
router.delete(
  "/deleteFlashcard/:topic/:id",
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
