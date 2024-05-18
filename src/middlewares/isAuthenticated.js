const isAuthenticated = (req, res, next) =>{
  if (req.isAuthenticated()) {
    return next(); // Si el usuario está autenticado, permite continuar
  }
  res.status(401).json({ message: "Unauthorized" }); // Si el usuario no está autenticado, devuelve un error 401
}

module.exports = isAuthenticated