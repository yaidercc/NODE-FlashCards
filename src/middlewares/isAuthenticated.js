const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(401).json({ success: false, msg: "No autorizado" }); 
};

module.exports = isAuthenticated;
