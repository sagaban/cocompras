import getUserId from '../../hooks/getUserId';
const logger = require('../../utils/logger');

module.exports = {
  before: {
    all: [
      getUserId,
      context => {
        if (context.data && context.data.groceries) {
          context.params.sequelize = {
            ...context.params.sequelize,
            raw: false
          };
        }
        return context;
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async context => {
        if (context.data && context.data.groceries) {
          try {
            const response = await context.result.addGroceries(
              context.data.groceries
            );
            const groceries = response.map(({ dataValues }) => dataValues);
            context.result.dataValues = {
              ...context.result.dataValues,
              groceries
            };
          } catch (error) {
            logger.error(error);
          }
        }
        return context;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
