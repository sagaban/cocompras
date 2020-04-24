const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      context => {
        context.data.pwd = context.data.password;
        return hashPassword('password')(context);
      }
    ],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      async context => {
        try {
          const userData = {
            username: context.data.username,
            password: context.data.pwd,
            strategy: 'local'
          };
          const params = { user: context.result };
          const { accessToken } = await context.app
            .service('authentication')
            .create(userData, params);
          context.dispatch = { ...context.dispatch, accessToken };
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
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
