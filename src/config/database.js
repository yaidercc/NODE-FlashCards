const mongoose = require("mongoose");
require("colors")

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log(`Database ${'Ready'.bgGreen}`)
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectar la base de datos.");
  }
};

module.exports = dbConnection;
