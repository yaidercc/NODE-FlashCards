const topicController = {};
module.exports = topicController;

const Topic = require("../models/Topic");

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
    const { user } = req.params;

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
    // TODO: Extraer el id desde el req.user de la auth para crear el user
    const { user } = req.params;
    const { name, ...otherInfo } = req.body;

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
      user,
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

    const response = await Topic.findByIdAndUpdate(id, { name: name.toUpperCase(), ...otherInfo });

    if(!response){
      return res.status(400).json({
        success: false,
        msg: "No se pudo editar el temario."
      })
    }

    return res.json({
      success: true,
      msg: "Temario editado con exito."
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
