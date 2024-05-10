const Routes = require("express").Router();
const { check } = require("express-validator")
const userControllers = require("../controllers/User.controller");
const validateFields = require("../helpers/validarCampos");

module.exports = Routes;
