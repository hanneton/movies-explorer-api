// get возвращает все сохранённые текущим пользователем фильмы
// post создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
// delete удаляет сохранённый фильм по id
// CRUD - create/read/update/delete

const { BadRequestErr } = require('../errors/badRequestErr');
const { ForbiddenErr } = require('../errors/forbiddenErr');
const { NotFoundErr } = require('../errors/notFoundErr');
const Movie = require('../models/movies');

function commonController(req, res, next) {
  const { path } = req;
  res.status(200).send(path);
  next();
}

function getSavedMovies(req, res, next) {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
}

function createNewMovie(req, res, next) {
  const movieInfo = { ...req.body, owner: req.user._id };
  Movie.create(movieInfo)
    .then((movie) => res.status(201).send(movie))
    .catch(next);
}

function removeMovieById(req, res, next) {
  Movie.findById(req.params.id)
    .orFail(new NotFoundErr('Фильм не найден'))
    .then(() => {
      Movie.deleteOne({ _id: req.params.id, owner: req.user._id })
        .then((data) => {
          if (data.deletedCount === 0) {
            throw new ForbiddenErr('Недостаточно прав на удаление');
          } else {
            res.status(200).send({ message: 'Фильм удален' });
          }
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Некорректный формат id'));
      } else { next(err); }
    });
}

module.exports = {
  commonController,
  getSavedMovies,
  createNewMovie,
  removeMovieById,
};
