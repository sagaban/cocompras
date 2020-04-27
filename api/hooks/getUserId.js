const { authenticate } = require('@feathersjs/authentication').hooks;
const logger = require('../utils/logger');

export default async function(context) {
  try {
    const res = await authenticate('jwt')(context);
    const userId = res.params.authentication.payload.sub;
    if (res.data) {
      res.data.userId = userId;
    }
    res.params.query = { ...res.params.query, userId };
    return res;
  } catch (error) {
    logger.error(error);
  }
}
