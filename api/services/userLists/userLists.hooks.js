const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [
      async context => {
        const res = await authenticate('jwt')(context);
        const userId = res.params.authentication.payload.sub;
        if (res.data) {
          res.data.userId = userId;
        }
        res.params.query = { ...res.params.query, userId };
        return res;
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
    create: [],
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
