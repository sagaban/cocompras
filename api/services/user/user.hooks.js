module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      context => {
        const results = Array.isArray(context.result)
          ? context.result
          : [context.result];
        results.forEach(r => {
          delete r.password;
          delete r.updatedAt;
          delete r.createdAt;
        });
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
