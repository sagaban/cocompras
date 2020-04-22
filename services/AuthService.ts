import axiosInstance from './axiosInstance';

export default {
  // TODO: Define Promise generic type. Should be UserData
  async registerUser(username: String, password: String): Promise<any> {
    try {
      const response = await axiosInstance.post('/auth/register', {
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
  setHeader(header: any, value: String) {
    axiosInstance.defaults.headers.common[header] = value;
  }
};
