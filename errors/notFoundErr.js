const { NOT_FOUND } = require('./statuses');

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.name = 'NotFound';
  }
}

module.exports = { NotFoundErr };
