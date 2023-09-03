const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('./users');
const movies = require('./movies');
const { createUser, login } = require('../controllers/login');
const { auth } = require('../middlewares/auth');
const { NotFoundErr } = require('../errors/notFoundErr');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);// создаёт пользователя с переданными в теле email, password и name

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);// проверяет переданные в теле почту и пароль и возвращает JWT

router.use(auth);
router.use('/users', users);
router.use('/movies', movies);
router.use('*', (req, res, next) => {
  next(new NotFoundErr({ message: 'Запрашиваемая страница не найдена' }));
});

module.exports = router;
