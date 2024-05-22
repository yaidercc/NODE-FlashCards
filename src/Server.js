const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/database");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();

    this.path = {
      user: "/api/user",
      auth: "/api/auth",
      flashcard: "/api/flashcard",
      topic: "/api/topic",
    };

    this.conectarDB();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors({ origin: "http://localhost:4000", credentials: true }));
    this.app.use(express.json());
    this.app.use(
      session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGO_CNN_SESSION,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
        cookie: { secure: false }, // Remember to set this
      })
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(express.static("public"));
  }

  async conectarDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.path.user, require("./routes/User.routes"));
    this.app.use(this.path.auth, require("./routes/Auth.routes"));
    this.app.use(this.path.flashcard, require("./routes/FlashCard.routes"));
    this.app.use(this.path.topic, require("./routes/Topic.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
