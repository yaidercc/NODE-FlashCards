const flashcardController = {};
module.exports = flashcardController;

const { validateTopicOwner } = require("../helpers/TopicsHelpers");
const FlashCard = require("../models/FlashCard");

flashcardController.getFlashCard = async (req, res) => {
  try {
    const { _id: user } = req.user;
    const { id } = req.params;

    const getFlashcard = await FlashCard.findById(id);

    if (!getFlashcard) {
      return res.status(404).json({
        success: false,
        code: 404,
        msg: "La flashcard no existe.",
      });
    }

    const topicValidation = await validateTopicOwner(user, getFlashcard.topic);

    if (!topicValidation.success) {
      return res.status(400).json(topicValidation);
    }

    return res.json({
      success: true,
      flashcard: getFlashcard,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      code: 500,
      msg:"Error en el servidor. Por favor, intenta de nuevo más tarde",
    });
  }
};

flashcardController.getFlashCards = async (req, res) => {
  try {
    const { _id: user } = req.user;
    const { topic } = req.params;

    const topicValidation = await validateTopicOwner(user, topic);

    if (!topicValidation.success) {
      return res.status(400).json(topicValidation);
    }

    const getFlashcards = await FlashCard.find({topic});

    return res.json({
      success: true,
      flashcard: getFlashcards,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      code: 500,
      msg:"Error en el servidor. Por favor, intenta de nuevo más tarde",
    });
  }
};

flashcardController.createFlashCard = async (req, res) => {
  try {
    const { question, answer, ...otherInfo } = req.body;
    const { topic } = req.params;
    const { _id: user } = req.user;

    const topicValidation = await validateTopicOwner(user, topic);

    if (!topicValidation.success) {
      return res.status(400).json(topicValidation);
    }

    if(!question.trim() || !answer.trim()){
      return res.status(400).json({
        success: false,
        code: 400,
        masg: "Alguno de los datos es incorrecto o esta vacio."
      })
    }

    const flashcard = new FlashCard({
      question,
      answer,
      topic,
      ...otherInfo,
    });

    await flashcard.save();

    return res.json({
      success: true,
      msg: "Flashcard creada con exito.",
      flashcard,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      code: 500,
      msg:"Error en el servidor. Por favor, intenta de nuevo más tarde",
    });
  }
};

flashcardController.editFlashcard = async (req, res) => {
  try {
    const { question, answer, ...otherInfo } = req.body;
    const { topic, id } = req.params;
    const { _id: user } = req.user;

    const topicValidation = await validateTopicOwner(user, topic);

    if (!topicValidation.success) {
      return res.status(400).json(topicValidation);
    }

    if(!question.trim() || !answer.trim()){
      return res.status(400).json({
        success: false,
        code: 400,
        masg: "Alguno de los datos es incorrecto o esta vacio."
      })
    }

    await FlashCard.findByIdAndUpdate(id, { question, answer, ...otherInfo });

    return res.json({
      success: true,
      msg: "Flashcard editada con exito."
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      code: 500,
      msg:"Error en el servidor. Por favor, intenta de nuevo más tarde",
    });
  }
};

flashcardController.deleteFlashcard = async (req, res) => {
  try {
    const { topic, id } = req.params;
    const { _id: user } = req.user;

    const topicValidation = await validateTopicOwner(user, topic);

    if (!topicValidation.success) {
      return res.status(400).json(topicValidation);
    }
    await FlashCard.findByIdAndDelete(id);

    return res.json({
      success: true,
      msg: "Flashcard eliminada con exito."
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      code: 500,
      msg:"Error en el servidor. Por favor, intenta de nuevo más tarde",
    });
  }
};
