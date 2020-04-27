const createModel = require('../../models/userLists.model');
const { UserLists } = require('./userLists.class');
const hooks = require('./userLists.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-lists', new UserLists(options, app));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('user-lists');

  service.hooks(hooks);
};
