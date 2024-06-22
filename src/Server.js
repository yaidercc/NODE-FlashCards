const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/database");
const passport = require("passport");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const MongoStore = require("connect-mongo");
const { swaggerDocs: V1SwaggerDocs } = require("./config/swagger");

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

    V1SwaggerDocs(this.app, this.port);
  }

  middlewares() {
    const origincors = process.env.NODE_ENV === "production" ? "https://flashcards-tau-six.vercel.app" : "http://localhost:5173";

    const passportConfig = {
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_CNN_SESSION,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 12,
        secure: false,
        httpOnly: true,
      },
    };

    if (process.env.NODE_ENV === "production") {
      passportConfig["cookie"] = { ...passportConfig["cookie"], secure: true, sameSite: "none" };
      passportConfig["proxy"] = true;
    }

    this.app.use(
      cors({
        origin: origincors,
        credentials: true,
      })
    );
    this.app.use(express.json());

    this.app.use(
      session(passportConfig)
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(express.static("public"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
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
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
