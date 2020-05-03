import baseService from './index';

const UsersService = baseService('users/', (axios: any) => ({
  async registerUser(username: String, password: String): Promise<any> {
    try {
      const response = await axios.post('/users', {
        username,
        password
      });
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('There was an error registering the user: ', error);
      return Promise.reject(error);
    }
  }
}));

export default UsersService;
