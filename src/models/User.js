const { model, Schema } = require("mongoose");

const userModel = Schema({
  name: {
    type: String,
    required: true,
  },
 

  surname: {
    type: String,
    required: true,
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
