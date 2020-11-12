import axios from 'axios';

const state = {
  customers: []
};

const getters = {
  customers: (state) => state.customers
};

const mutations = {
  SET_CUSTOMERS: (state, customers) => {
    state.customers = customers;
  }
};

const actions = {
  customersSync({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('customers/sync')
        .then(({ data }) => {
          // commit('SET_CUSTOMERS', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  load_customers({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('customers')
        .then(({ data }) => {
          commit('SET_CUSTOMERS', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  storeNewCustomer({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('customers', payload)
        .then(({ data }) => {
          // commit('SET_CUSTOMERS', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  loadSelectedCustomer({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get('customers/' + id)
        .then(({ data }) => {
          // commit('SET_CUSTOMERS', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  loadSelectedBranchAgreements({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get('customers/agreement/' + id)
        .then(({ data }) => {
          // commit('SET_CUSTOMERS', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export default { state, getters, mutations, actions };
