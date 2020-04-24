let instance;

export default {
  getInstance() {
    return instance;
  },
  setInstance(axios) {
    instance = axios;
  }
};
