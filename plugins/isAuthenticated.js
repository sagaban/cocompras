export default function({ route, store }) {
  const userString = localStorage && localStorage.getItem('user');
  if (userString) {
    const userData = JSON.parse(userString);
    store.commit('SET_USER_DATA', userData);
  }
  if (
    !store.getters.loggedIn &&
    !['index', 'login', 'register'].includes(route.name)
  ) {
    location = '/login';
  }
}
