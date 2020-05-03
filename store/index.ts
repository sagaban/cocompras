import Vue from 'vue';
import Vuex, { GetterTree, ActionTree, MutationTree } from 'vuex';

import UsersService from '~/services/Users';
import GroceriesService from '~/services/Groceries';
import UserListsService from '~/services/UserLists';
import ListGroceriesService from '~/services/ListGroceries';

Vue.use(Vuex);

interface IGrocery {
  id: number;
  name: String;
  description: String;
  image: String;
}
interface IGroceryHash {
  [key: number]: IGrocery;
}

interface IUserList {
  id: number;
  name: String;
}
interface IUserListHash {
  [key: number]: IUserList;
}

interface IListGroceriesHash {
  [key: number]: Number[];
}

interface IState {
  groceries: IGroceryHash;
  lists: IUserListHash;
  listGroceries: IListGroceriesHash;
}

interface Credentials {
  username: String;
  password: String;
}
// I hate TypeScript
const getAuthObject = context => context.$auth;

export const state = (): IState => ({
  groceries: {},
  lists: {},
  listGroceries: {}
});
export const mutations: MutationTree<IState> = {
  SET_GROCERY(state: IState, grocery: IGrocery) {
    Vue.set(state.groceries, grocery.id, grocery);
  },
  SET_ALL_GROCERIES(state: IState, groceries: IGrocery[]) {
    groceries.forEach(grocery => Vue.set(state.groceries, grocery.id, grocery));
  },
  SET_ALL_USER_LISTS(state: IState, lists: IUserList[]) {
    lists.forEach(list => Vue.set(state.lists, list.id, list));
  },
  SET_LIST_GROCERIES(
    state: IState,
    { listId, listGroceries }: { listId: number; listGroceries: Number[] }
  ) {
    Vue.set(state.listGroceries, listId, listGroceries);
  }
};
// TODO: fix types
export const actions: ActionTree<IState, any> = {
  async register(
    { dispatch },
    { username, password }: Credentials
  ): Promise<any> {
    try {
      await UsersService().registerUser(username, password);
      return dispatch('login', {
        username,
        password
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error registering a new user: ', error);
    }
  },
  login(_store, { username, password }: Credentials): Promise<any> {
    return getAuthObject(this).loginWith('local', {
      data: {
        username,
        password,
        strategy: 'local'
      }
    });
  },
  logout({ commit }) {
    commit('CLEAR_USER_DATA');
  },
  async getGroceries({ commit }) {
    const response = await GroceriesService().getAll();
    commit('SET_ALL_GROCERIES', response.data.data);
  },
  async getUserLists({ commit }) {
    const response = await UserListsService().getAll();
    commit('SET_ALL_USER_LISTS', response.data.data);
  },
  async createUserList({ commit }, newList) {
    const response = await UserListsService().save(newList);
    commit('SET_ALL_USER_LISTS', response.data.data);
  }
};
