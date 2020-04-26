let axios;

export function setInstance(instance) {
  axios = instance;
}

export default function(path, getOtherActions) {
  return function() {
    const basicActions = {
      getAll() {
        return axios.get(path);
      },
      get(id) {
        return axios.get(`${path}/${id}`);
      },
      save(object) {
        return axios.post(path, object);
      },
      query(params) {
        return axios.get(path, { params });
      },
      update(id, object) {
        return axios.put(`${path}/${id}`, object);
      },
      delete(id) {
        return axios.delete(`${path}/${id}`);
      }
    };
    const otherActions = getOtherActions ? getOtherActions(axios) : {};
    return { ...basicActions, ...otherActions };
  };
}
