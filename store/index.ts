import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '~/services/Authentication';
import GroceriesService from '~/services/Groceries';
import UserListsService from '~/services/UserLists';

Vue.use(Vuex);

interface IUserData {
  username: String;
  token: String;
}

interface IGrocery {
  id: Number;
  name: String;
  description: String;
  image: String;
}

interface IUserList {
  id: Number;
  name: String;
}

interface IState {
  user: IUserData | null;
  groceries: IGrocery[];
  lists: IUserList[];
}

interface Credentials {
  username: String;
  password: String;
}

export const state = (): IState => ({
  user: null,
  groceries: [],
  lists: []
});
export const mutations = {
  SET_USER_DATA(state: IState, userData: IUserData) {
    state.user = userData;
    localStorage.setItem('user', JSON.stringify(userData));
    AuthService().setToken(userData.token);
  },
  CLEAR_USER_DATA() {
    localStorage.removeItem('user');
    location.reload();
  },
  SET_ALL_GROCERIES(state: IState, groceries: IGrocery[]) {
    state.groceries = groceries;
  },
  SET_ALL_USER_LISTS(state: IState, lists: IUserList[]) {
    state.lists = lists;
  }
};
// TODO: fix types
export const actions = {
  async register(
    { commit }: { commit: any },
    { username, password }: Credentials
  ): Promise<any> {
    const userData: IUserData = await AuthService().registerUser(
      username,
      password
    );
    commit('SET_USER_DATA', userData);
  },
  async login(
    { commit }: { commit: any },
    { username, password }: Credentials
  ): Promise<any> {
    const response = await AuthService().login(username, password);
    commit('SET_USER_DATA', {
      ...response.user,
      token: response.accessToken
    });
  },
  logout({ commit }: { commit: any }) {
    commit('CLEAR_USER_DATA');
  },
  async getGroceries({ commit }: { commit: any }): Promise<any> {
    const response = await GroceriesService().getAll();
    commit('SET_ALL_GROCERIES', response.data.data);
  },
  async getUserLists({ commit }: { commit: any }): Promise<any> {
    const response = await UserListsService().getAll();
    commit('SET_ALL_USER_LISTS', response.data.data);
  }
};
export const getters = {
  loggedIn(state: IState): boolean {
    return !!state.user;
  }
};
