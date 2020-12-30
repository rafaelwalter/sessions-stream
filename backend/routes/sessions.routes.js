const express = require('express');

const SessionsController = require('../controllers/sessions.controller');

module.exports = class SessionsRoutes {
  static getRouter() {
    const router = express.Router();
    
    router.get('/params', SessionsController.getParams);
    router.get('/', SessionsController.getSessions);

    return router;
  }
}
