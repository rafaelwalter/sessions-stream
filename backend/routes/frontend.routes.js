const express = require('express');
const path = require('path');

module.exports = class FrontendRoutes {
  static getRouter() {
    const router = express.Router();

    const root = path.dirname(require.main.filename);
    const relativePath = path.join(root, 'frontend', 'dist');
    const absolutePath = path.resolve(root, 'frontend', 'dist', 'index.html');

    router.use(express.static(relativePath));
    router.get('/*', (req, res) => {
      res.sendFile(absolutePath);
    });

    return router;
  }
}
