import axios from 'axios';

const state = {
  log: []
};

const getters = {
  getLog: (state) => state.log
};

const mutations = {
  SET_LOG: (state, data) => {
    state.log = data;
  }
};

const actions = {
  getAllLogDetails({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('admin/allActivities')
        .then(({ data }) => {
          commit('SET_LOG', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default { state, getters, mutations, actions };
