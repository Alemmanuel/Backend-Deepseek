const express = require('express');
const { chatController } = require('../controllers/ai.controllers');
const router = express.Router();

// Ruta POST para enviar el prompt y obtener la respuesta de Deepseek
router.post('/chat', chatController);

module.exports = { deepseekRouter: router };