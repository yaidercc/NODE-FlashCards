const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log(process.env.MONGO_CNN)
    console.log(`Database Ready`)
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectar la base de datos.");
  }
};

module.exports = dbConnection;
