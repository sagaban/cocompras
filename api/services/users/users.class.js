const { Service } = require('feathers-sequelize');

exports.Users = class Users extends Service {
  find(params) {
    // Avoid the final user get all the system users
    if (params.user) {
      return Promise.resolve(params.user);
    }
    return super.find(params);
  }
};
