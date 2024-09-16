// get возвращает информацию о пользователе (email и имя)
// patch обновляет информацию о пользователе (email и имя)
const User = require('../models/users');
const { BadRequestErr } = require('../errors/badRequestErr');
const { ConflictErr } = require('../errors/conflictErr');

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
}
function updateCurrentUser(req, res, next) {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.code === 11000) {
        next(new ConflictErr('Такой пользователь уже зарегистрирован'));
      }
      next(err);
    });
}

module.exports = {
  getCurrentUser,
  updateCurrentUser,
};
