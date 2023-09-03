const { INTERNAL } = require('../errors/statuses');
// central errors handler
function centralErrorsHandler(err, req, res, next) {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = INTERNAL, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
}

module.exports = { centralErrorsHandler };
