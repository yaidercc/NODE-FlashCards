const router = require("express").Router();
const flashcardControllers = require("../controllers/FlashCard.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

// router.get("/getFlashcard/:id", isAuthenticated, flashcardControllers.getFlashcard)

module.exports = router;
