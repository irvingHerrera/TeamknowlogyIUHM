const express = require('express');
const mutationController = require('../controllers/mutation');

const api = express.Router();

api.post('/mutation', mutationController.mutation);
api.get('/stats', mutationController.stats);

module.exports = api;