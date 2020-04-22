import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '~/services/AuthService';
Vue.use(Vuex);

interface IUserData {
  username: String;
  token: String;
}
interface IState {
  user: IUserData | null;
}

interface Credentials {
  username: String;
  password: String;
}

export const state = (): IState => ({
  user: null
});
export const mutations = {
  SET_USER_DATA(state: IState, userData: IUserData) {
    state.user = userData;
    localStorage.setItem('user', JSON.stringify(userData));
    AuthService.setHeader('Authorization', `Bearer ${userData.token}`);
  }
  // CLEAR_USER_DATA() {
  //   localStorage.removeItem('user');
  //   location.reload();
  // }
};
// TODO: fix types
export const actions = {
  async register(
    { commit }: { commit: any },
    { username, password }: Credentials
  ): Promise<any> {
    const userData: IUserData = await AuthService.registerUser(
      username,
      password
    );
    commit('SET_USER_DATA', userData);
  }
  // login({ commit }, credentials) {
  //   return axios
  //     .post('//localhost:3000/login', credentials)
  //     .then(({ data }) => {
  //       commit('SET_USER_DATA', data);
  //     });
  // },
  // logout({ commit }) {
  //   commit('CLEAR_USER_DATA');
  // }
};
export const getters = {
  loggedIn(state: IState): boolean {
    return !!state.user;
  }
};
