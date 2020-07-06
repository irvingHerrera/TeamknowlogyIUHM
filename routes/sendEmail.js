const express = require('express');
const emailController = require('../controllers/sendEmail');

const api = express.Router();

api.post('/sendEmail', emailController.sendEmail);

module.exports = api;