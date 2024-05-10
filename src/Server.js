const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/database");
const passport = require("passport")
const session = require("express-session");
const MongoStore = require('connect-mongo');
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
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ 
          mongoUrl: process.env.MONGO_CNN_SESSION,
          ttl: 24 * 60 * 60, // Especifica en cuanto tiempo se van a borrar el documento creado (24h)
        }),
        cookie: {
          expires: new Date(Date.now() + 3600000), // Especifica hasta cuando es valida la sesioon del usuario (1h)
          httpOnly: true, // indica al navegador que la cookie solo debe ser accesible a través del protocolo HTTP
          path: '/', // Indica que la cookie va a esta disponible para todos los directorios de la pagina
        },
      })
    );

    this.app.use(passport.initialize())
    this.app.use(passport.session())
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
