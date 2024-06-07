const Topic = require("../models/Topic");

const validateTopicOwner = async (user, idTopic) => {
  const findTopic = await Topic.findById(idTopic);

  if (!findTopic) {
    return {
      success: false,
      code: 404,
      msg: "El temario no existe.",
    };
  }

  if (findTopic.user.toString() != user.toString()) {
    return {
      success: false,
      code: 403,
      msg: "No tienes acceso a este temario.",
    };
  }

  return {
    success: true
  }
};

module.exports = {
  validateTopicOwner
}