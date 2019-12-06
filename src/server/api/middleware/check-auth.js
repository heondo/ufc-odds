const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
    if (err) {
      res.status(401);
      return next({
        message: 'Auth failed',
        type: 'JWT_DECODE'
      });
    }
    req.userData = decodedToken;
    next();
  });
};
