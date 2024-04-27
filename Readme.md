# Flashcards - NODE

La API de este proyecto de flashcards te permite crear una cuenta, autenticarte, crear y administrar tus propios temarios y flashcards personalizadas. Puedes crear, actualizar y eliminar temarios y flashcards, y obtener información sobre tus propios temarios y flashcards. Todo esto te permite personalizar tus propias flashcards y temarios para estudiar o practicar cualquier cosa que necesites.

## Endpoints

### Autenticación

- `POST` `/api/auth/login` - Iniciar sesión
- `POST` `/api/auth/singin` - Registrarte
- `POST` `/api/auth/sendEmailChangePassword` - Enviar email para cambiar contraseña
- `POST` `/api/auth/changePassword` - Cambiar contraseña
- `POST` `/api/auth/validateToken` - Validar token

### Flashcards

- `GET` `/api/flashcards/flashcardsByTemario/:id` - Obtener flashcards por id de temario
- `GET` `/api/flashcards/:id` - Obtener flashcards por id
- `POST` `/api/flashcards/` - Crear flashcard
- `PUT` `/api/flashcards/` - Actualizar flashcard
- `DELETE` `/api/flashcards/:id` - Eliminar flashcard

### Búsqueda

- `GET` `/api/search/:coleccion/:termino` - Buscar un registro en cualquier colección

### Temarios

- `GET` `/api/temarios/temariosByUser/:usuario` - Obtener temarios por id de usuario
- `GET` `/api/temarios/:id` - Obtener temarios por id
- `POST` `/api/temarios/` - Crear temario
- `PUT` `/api/temarios/` - Actualizar temario
- `DELETE` `/api/temarios/:id` - Eliminar temario

### Usuarios

- `GET` `/api/usuarios/:id_user` - Obtener usuario por id
- `PUT` `/api/usuarios/:id` - Actualizar usuario


## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
