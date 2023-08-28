const { FORBIDDEN } = require('./statuses');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
    this.name = 'ForbiddenError';
  }
}

module.exports = { ForbiddenErr };
