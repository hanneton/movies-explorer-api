const jwt = require('jsonwebtoken');
const { UnauthorizedErr } = require('../errors/unauthorizedErr');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedErr('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthorizedErr('Необходима авторизация'));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
}
module.exports = {
  auth,
};
