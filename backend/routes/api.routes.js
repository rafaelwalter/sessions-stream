const express = require('express');

const SingleProcessMiddleware = require('../middlewares/single-process.middleware');
const SessionsRoutes = require('./sessions.routes');

module.exports = class APIRoutes {
  static getRouter() {
    const router = express.Router();

    router.use(SingleProcessMiddleware.listen());
    router.use('/sessions', SessionsRoutes.getRouter());

    return router;
  }
}
