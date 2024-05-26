const topicController = {};
module.exports = topicController;

const Topic = require("../models/Topic");
const FlashCard = require("../models/FlashCard")

topicController.getTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const getTopic = await Topic.findById(id);

    if (!getTopic) {
      return res.status(400).json({
        success: false,
        msg: "El temario no existe.",
      });
    }

    return res.json({
      success: true,
      topic: getTopic,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

topicController.getTopics = async (req, res) => {
  try {
    const { _id: user } = req.user;

    const Topics = await Topic.find({ user });

    return res.json({
      success: true,
      Topics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

topicController.createTopic = async (req, res) => {
  try {
    const { name, ...otherInfo } = req.body;

    const { _id } = req.user;

    const nameUpperCase = name.toUpperCase();

    const getTopic = await Topic.findOne({ name: nameUpperCase.toUpperCase() });

    if (getTopic) {
      return res.status(400).json({
        success: false,
        msg: "El temario ya existe.",
      });
    }

    const topic = new Topic({
      name: nameUpperCase,
      user: _id,
      ...otherInfo,
    });

    await topic.save();

    return res.json({
      success: true,
      msg: "Temario creado con exito.",
      topic,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

topicController.editTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ...otherInfo } = req.body;
    const { _id: userId } = req.user;
    const findTopic = await Topic.findById(id);

    if (!findTopic) {
      return res.status(400).json({
        succes: false,
        msg: "El temario no existe",
      });
    }

    if (findTopic.user.toString() != userId.toString()) {
      return res.status(400).json({
        success: false,
        msg: "El usuario no es el propietario del temario.",
      });
    }

    const response = await Topic.findByIdAndUpdate(id, { name: name.toUpperCase(), ...otherInfo });

    if (!response) {
      return res.status(400).json({
        success: false,
        msg: "No tienes acceso al temario.",
      });
    }

    return res.json({
      success: true,
      msg: "Temario editado con exito.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

topicController.deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: user } = req.user;

    const findTopic = await Topic.findById(id);

    if (!findTopic) {
      return res.status(400).json({
        success: false,
        msg: "No se encontro el temario.",
      });
    }

    if (findTopic.user.toString() != user.toString()) {
      return res.status(400).json({
        success: false,
        msg: "No tienes acceso a este temario",
      });
    }

    await Topic.findByIdAndDelete(id);
    await FlashCard.find({topic:id}).remove()

    return res.json({
      success: true,
      msg: "temario eliminado con exito.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
