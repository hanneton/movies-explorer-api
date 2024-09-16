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

function getSavedMovies(req, res, next) {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
}

function createNewMovie(req, res, next) {
  const movieInfo = { ...req.body, owner: req.user._id };
  Movie.create(movieInfo)
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      next(err);
    });
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
  getSavedMovies,
  createNewMovie,
  removeMovieById,
};
