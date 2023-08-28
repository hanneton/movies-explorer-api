require('dotenv').config();
const { PORT = 3000, NODE_ENV } = process.env;
const http = require('http');
// Серверную программу нужно научить принимать сообщения, которые поступают на сетевую карту.
//В JavaScript нет такой встроенной возможности, зато она есть в специальном API из Node.js.

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf8',
  });
  res.statusMessage = 'OK';
  res.end();
}); // создаём сервер, Так мы даём библиотеке на C команду подключиться к сетевой карте и
//принимать сообщения. Теперь мы получаем к ним доступ из JavaScript-кода.
console.log(PORT);
server.listen(PORT); // будем принимать сообщения с 3000 порта