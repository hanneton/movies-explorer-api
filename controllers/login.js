const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { ConflictErr } = require('../errors/conflictErr');
const { UnauthorizedErr } = require('../errors/unauthorizedErr');

function createUser(req, res, next) {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictErr('Такой пользователь уже зарегистрирован');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          email,
          password: hash,
        }))
        .then((newUser) => res.send({ name: newUser.name, email: newUser.email }))
        .catch(next);
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedErr('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => (matched ? user : Promise.reject(new UnauthorizedErr('Неправильные почта или пароль'))))
        .then((matchedUser) => {
          const token = jwt.sign({ _id: matchedUser._id }, 'super-strong-secret', { expiresIn: '7d' });
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
}

module.exports = {
  createUser,
  login,
};
