const router = require('express').Router();// создали роутер
const { celebrate, Joi } = require('celebrate');
const {
  getSavedMovies,
  createNewMovie,
  removeMovieById,
} = require('../controllers/movies');
const { regexpUrl } = require('../utils/regexp-pattern');

router.get('/', getSavedMovies);// возвращает все сохранённые текущим пользователем фильмы

router.post('/', celebrate({
  body: Joi.object().keys(
    {
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(regexpUrl),
      thumbnail: Joi.string().required().regex(regexpUrl),
      trailerLink: Joi.string().required().regex(regexpUrl),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().required(),
    },
  ),
}), createNewMovie);// создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), removeMovieById);// удаляет сохранённый фильм по id

module.exports = router;
