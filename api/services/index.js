const user = require('./user/user.service.js');
module.exports = function() {
  const app = this;
  app.configure(user);
};
