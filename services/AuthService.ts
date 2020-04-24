import axiosInstance from './axiosInstance';

export default {
  // TODO: Define Promise generic type. Should be UserData
  get $axios() {
    return axiosInstance.getInstance();
  },
  async registerUser(username: String, password: String): Promise<any> {
    try {
      const response = await this.$axios.post('/users', {
        username,
        password
      });
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('There was an error registering the user: ', error);
      return Promise.reject(error);
    }
  },
  setToken(token: String) {
    this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  async login(username: String, password: String): Promise<any> {
    try {
      const response = await this.$axios.post('/authentication', {
        username,
        password,
        strategy: 'local'
      });
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('There was an error registering the user: ', error);
      return Promise.reject(error);
    }
  }
};
