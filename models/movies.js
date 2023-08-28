const mongoose = require('mongoose');
const { regexpUrl } = require('../utils/regexp-pattern');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(str) {
        return regexpUrl.test(str);
      },
      message: 'Ошибочный url',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(str) {
        return regexpUrl.test(str);
      },
      message: 'Ошибочный url',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(str) {
        return regexpUrl.test(str);
      },
      message: 'Ошибочный url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // 12-byte unique identifier
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

// country — страна создания фильма.Обязательное поле - строка.
// director — режиссёр фильма.Обязательное поле - строка.
// duration — длительность фильма.Обязательное поле - число.
// year — год выпуска фильма.Обязательное поле - строка.
// description — описание фильма.Обязательное поле - строка.
// image — ссылка на постер к фильму.Обязательное поле - строка.Запишите её URL - адресом.
// trailerLink — ссылка на трейлер фильма.Обязательное поле - строка.Запишите её URL - адресом.
// thumbnail — миниатюрное изображение постера к фильму.
// Обязательное поле - строка.Запишите её URL - адресом.
// owner — _id пользователя, который сохранил фильм.Обязательное поле.
// movieId — id фильма, который содержится в ответе сервиса MoviesExplorer.
// Обязательное поле в формате number.
// nameRU — название фильма на русском языке.Обязательное поле - строка.
// nameEN — название фильма на английском языке.Обязательное поле - строка.

module.exports = mongoose.model('movie', movieSchema);
