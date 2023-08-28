// get возвращает информацию о пользователе (email и имя)
// patch обновляет информацию о пользователе (email и имя)
const User = require('../models/users');

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
}
function updateCurrentUser(req, res, next) {
  User.findByIdAndUpdate(req.user._id, req.body)
    .then((user) => res.status(200).send(user))
    .catch(next);
}

module.exports = {
  getCurrentUser,
  updateCurrentUser,
};
