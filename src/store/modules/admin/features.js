import axios from 'axios';

const state = {
  features: []
};

const getters = {
  getFeatures: (state) => state.features
};

const mutations = {
  SET_FEATURES: (state, data) => {
    state.features = data;
  }
};

const actions = {
  getAllFeatures({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('admin/allFeatures')
        .then(({ data }) => {
          commit('SET_FEATURES', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  changeFeatureStatus({ commit }, features) {
    return new Promise((resolve, reject) => {
      axios
        .post('admin/changeFeatureStatus', { features })
        .then(({ data }) => {
          commit('SET_FEATURES', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export default { state, getters, mutations, actions };
