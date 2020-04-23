// Initializes the `groceries` service on path `/groceries`
const createModel = require('../../models/groceries.model');
const { Groceries } = require('./groceries.class');
const hooks = require('./groceries.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/groceries', new Groceries(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('groceries');

  service.hooks(hooks);
};
