import axios from 'axios';

const state = {
  serviceDetails: []
};

const getters = {
  getServiceDetails: (state) => state.serviceDetails
};

const mutations = {
  SET_SERVICE_DETAILS: (state, data) => {
    state.serviceDetails = data;
  }
};

const actions = {
  storeServiceData({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('service', payload)
        .then(({ data }) => {
          // dispatch('loadServiceDetails');
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  loadServiceDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('service/load', payload)
        .then(({ data }) => {
          commit('SET_SERVICE_DETAILS', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export default { state, getters, mutations, actions };
