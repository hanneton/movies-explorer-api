const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser, updateCurrentUser } = require('../controllers/users');

router.get('/me', getCurrentUser);// возвращает информацию о пользователе (email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateCurrentUser);// обновляет информацию о пользователе (email и имя)

module.exports = router;
