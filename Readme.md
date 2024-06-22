# Flashcards

La API de este proyecto de flashcards te permite crear una cuenta, autenticarte, crear y administrar tus propios temarios y flashcards personalizadas. Puedes crear, actualizar y eliminar temarios y flashcards, y obtener información sobre tus propios temarios y flashcards. Todo esto te permite personalizar tus propias flashcards y temarios para estudiar o practicar cualquier cosa que necesites.

## Docker

### URL de la imagen

https://hub.docker.com/repository/docker/rediatcc/flashcard-backend

### Crear e iniciar contenedor de docker

1. Entra a la raiz de la carpeta desde la consola de comandos y escibres el siguiente comando `docker compose up` y esperas a que termine
2. En el navagador o postman escribes: `localhost:4400/api/` o acompañado de algunos de los endpoints referenciados mas abajo.

## Instalar dependencias

`npm install`

## Iniciar aplicacion

`npm run dev`

## Documentacion con swagger

Para la documentacion debes entrar a la siguiente url en el navegador  `http://localhost:{puerto}/api/`

## Endpoints

### Autenticación

- `POST` `/api/auth/login` - Iniciar sesión
- `POST` `/api/auth/singin` - Registrarte
- `POST` `/api/auth/sendEmailChangePassword` - Enviar email para cambiar contraseña
- `POST` `/api/auth/changePassword` - Cambiar contraseña
- `POST` `/api/auth/validateToken` - Validar token

### Flashcards

- `GET` `/api/flashcard/:topic` - Obtener flashcards por id de temario
- `GET` `/api/flashcard/getFlashcard/:id` - Obtener flashcard por id
- `POST` `/api/flashcard/createFlashcard/:topic` - Crear flashcard
- `PUT` `/api/flashcard/editFlashcard/:topic/:id` - Editar flashcard
- `DELETE` `/api/deleteFlashcard/:topic/:id` - Eliminar flashcard


### Temarios

- `GET` `/api/topic/getTopics` - Obtener temarios por id de usuario
- `GET` `/api/topic/:id` - Obtener temario por id
- `POST` `/api/topic/createTopic` - Crear temario
- `PUT` `/api/topic/editTopic/:id` - Actualizar temario
- `DELETE` `/api/topic/deleteTopic/:id` - Eliminar temario

### Usuarios

- `GET` `/api/user/getUser/:id` - Obtener usuario por id
- `PUT` `/api/user/editUser/:id` - Actualizar usuario
- `DELETE` `/api/user/deleteUser/:id` - Actualizar usuario


## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Swagger
- Passport.js
