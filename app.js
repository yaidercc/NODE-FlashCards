require("dotenv").config()
const server = require("./src/Server");

const Server = new server();

Server.listen();

// const bcrypt = require("bcryptjs");

// const password = "juansito123";
// const hashedPassword = bcrypt.hashSync(password, 10);

// console.log(hashedPassword);

