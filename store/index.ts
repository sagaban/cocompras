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
    AuthService.setToken(userData.token);
  },
  CLEAR_USER_DATA() {
    localStorage.removeItem('user');
    location.reload();
  }
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
  },
  async login(
    { commit }: { commit: any },
    { username, password }: Credentials
  ): Promise<any> {
    const response = await AuthService.login(username, password);
    commit('SET_USER_DATA', {
      ...response.user,
      token: response.accessToken
    });
  },
  logout({ commit }: { commit: any }) {
    commit('CLEAR_USER_DATA');
  }
};
export const getters = {
  loggedIn(state: IState): boolean {
    return !!state.user;
  }
};
