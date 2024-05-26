# Flashcards

La API de este proyecto de flashcards te permite crear una cuenta, autenticarte, crear y administrar tus propios temarios y flashcards personalizadas. Puedes crear, actualizar y eliminar temarios y flashcards, y obtener información sobre tus propios temarios y flashcards. Todo esto te permite personalizar tus propias flashcards y temarios para estudiar o practicar cualquier cosa que necesites.

## Instalar dependencias

`npm install`

## Iniciar aplicacion

`npm run dev`

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

- `GET` `/api/user/:id_user` - Obtener usuario por id
- `PUT` `/api/user/:id` - Actualizar usuario
- `DELETE` `/api/user/deleteUser/:id` - Actualizar usuario


## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Swagger
- Passport
