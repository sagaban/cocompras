import getUserId from '../../hooks/getUserId';
const logger = require('../../utils/logger');

module.exports = {
  before: {
    all: [
      getUserId,
      context => {
        // Make the sequelize call not raw, soy ab object is returned
        // and can be operated in after hooks
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
    get: [
      context => {
        if (context.params.query.embedded) {
          delete context.params.query.embedded;
          const sequelize = context.app.get('sequelizeClient');
          const { groceries } = sequelize.models;

          context.params.sequelize = {
            include: [
              {
                model: groceries,
                attributes: ['id']
              }
            ],
            nest: true,
            raw: false
          };
        }
        return context;
      }
    ],
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
        // Embed groceries in the response
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
