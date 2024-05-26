const { model, Schema } = require("mongoose");

const userModel = Schema({
  first_name: {
    type: String,
    required: true,
  },
  second_name: {
    type: String,
  },

  surname: {
    type: String,
    required: true,
  },

  second_surname: {
    type: String,
  },

  username: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  profile_img: {
    type: String,
    default: "ADD URL",
  },
  google: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  }
});


module.exports = model("user", userModel);
