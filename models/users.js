// email — почта пользователя, по которой он регистрируется. Это обязательное поле, уникальное для
// каждого пользователя. Также оно должно валидироваться на соответствие схеме электронной почты.
// password — **хеш пароля. Обязательное поле-строка. Нужно задать поведение по умолчанию,
// чтобы база данных не возвращала это поле.
// name — имя пользователя, например: Александр или Мария.
// Это обязательное поле-строка от 2 до 30 символов.
const isEmail = require('validator/lib/isEmail');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (str) => isEmail(str),
      message: 'Ошибочный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
