module.exports = class SingleProcessMiddleware {
  static listen() {
    let processing = false;

    return (req, res, next) => {
      if (processing) {
        return res.status(429).json({ error: 'Too many requests' });
      }
    
      processing = true;
      res.once('finish', () => processing = false);
      return next();
    };
  }
}
