const createModel = require('../../models/groceryLists.model');
const { GroceryLists } = require('./groceryLists.class');
const hooks = require('./groceryLists.hooks');

// TODO: Is this service necessary?
// The model is user in the groceries-userLists relationship
module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/grocery-lists', new GroceryLists(options, app));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('grocery-lists');

  service.hooks(hooks);
};
