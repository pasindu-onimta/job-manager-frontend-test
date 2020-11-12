import axios from 'axios';

const state = {
  token: localStorage.getItem('token') || null,
  user: null
};

const getters = {
  getUser: (state) => state.user,
  isAuthenticated: (state) => state.token !== null,
  getUserLoadStatus(state) {
    return function() {
      return state.user !== null;
    };
  },
  isSuperAdmin: (state) => {
    return state.user.roles.includes('super admin');
  },
  isAdmin: (state) => {
    return state.user.roles.includes('admin');
  },
  isTeamLeader: (state) => {
    return state.user.roles.includes('team leader');
  },
  isDirector: (state) => {
    return state.user.roles.includes('director');
  },
  isDeveloper: (state) => {
    return state.user && state.user.roles.includes('developer');
  },
  isCoordinator: (state) => {
    return state.user.roles.includes('coordinator');
  },
  user: (state) => state.user
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  }
};

const actions = {
  async login({ dispatch }, credetials) {
    const { data } = await axios.post('auth/login', credetials);
    localStorage.setItem('token', data.access_token);
    return dispatch('attempt', data.access_token);
  },

  async loadUser({ commit }) {
    const { data } = await axios.get('auth/me');
    commit('SET_USER', data);
  },

  attempt({ commit, state }, token) {
    if (token) {
      commit('SET_TOKEN', token);
    }
    if (!state.token) {
      return;
    }
    return new Promise(async (resolve, reject) => {
      try {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data } = await axios.get('auth/me');
        commit('SET_USER', data);
        resolve(data);
      } catch (error) {
        localStorage.removeItem('token');
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
        reject(error);
      }
    });
  },
  signout({ commit }) {
    return axios.post('auth/logout').then((res) => {
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
    });
  }
};

export default { state, getters, mutations, actions };
