import axios from 'axios';

const state = {
  users: [],
  filtered_users: []
};

const getters = {
  users: (state) => state.users,
  filtered_users: (state) => state.filtered_users
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_USERS_FILTERED(state, users) {
    state.filtered_users = users;
  }
};

const actions = {
  // async load_users({ dispatch }) {
  //     const { data } = await axios.post('auth/login', credetials);
  //     localStorage.setItem('token', data.access_token);
  //     return dispatch('attempt', data.access_token);
  // },
  load_users({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('users')
        .then(({ data }) => {
          commit('SET_USERS', data.users);
          resolve(data.users);
        })
        .catch((err) => {
          // localStorage.removeItem('token')
          reject(err);
        });
    });
  },

  load_users_division_wise({ commit }, division) {
    return new Promise((resolve, reject) => {
      axios
        .get('users/' + division)
        .then(({ data }) => {
          commit('SET_USERS_FILTERED', data.users);
          resolve(data.users);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  load_users_division({ commit }, division) {
    return new Promise((resolve, reject) => {
      axios
        .get(`users/division/${division}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export default { state, getters, mutations, actions };
