const setCacheHeaders = (req, res, next) => {
  res.header('Cache-Control', 'only-if-cached');
  next();
};

module.exports = setCacheHeaders;
