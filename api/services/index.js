const users = require('./users/users.service.js');
const groceries = require('./groceries/groceries.service.js');
const userLists = require('./userLists/userLists.service.js');

module.exports = function(app) {
  app.configure(users);
  app.configure(groceries);
  app.configure(userLists);
};
