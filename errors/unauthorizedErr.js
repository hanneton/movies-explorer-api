const { UNAUTHORIZED } = require('./statuses');

class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
    this.name = 'UnauthorizedError';
  }
}

module.exports = { UnauthorizedErr };
