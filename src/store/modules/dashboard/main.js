import axios from 'axios';

const state = {
  ongoings: []
};

const getters = {
  ongoings: (state) => state.ongoings
};

const mutations = {
  SET_ONGOINGS: (state, ongoings) => {
    state.ongoings = ongoings;
  }
};

const actions = {
  ongoing_jobs({ commit, state }, payload) {
    state.ongoings = [];
    return new Promise((resolve, reject) => {
      axios
        .post('ongoing_jobs', payload)
        .then(({ data }) => {
          commit('SET_ONGOINGS', data);
          resolve(data);
        })
        .catch((err) => {
          // localStorage.removeItem('token')
          reject(err);
        });
    });
  },
  employee_summary({ commit }, user_id) {
    return new Promise((resolve, reject) => {
      axios
        .post('summary', { emp_user_id: user_id })
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },
  employee_summary_tasks({ commit }, job_user_id) {
    return new Promise((resolve, reject) => {
      axios
        .post('summary/tasks', job_user_id)
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  changeTaskFromHome({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('tasks/change/dashboard', { payload })
        .then(({ data }) => {
          dispatch('ongoing_jobs');
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  restoreOngoingTask({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      axios
        .post('tasks/change/dashboard/restore')
        .then(({ data }) => {
          dispatch('ongoing_jobs');
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  // get generated id
  generateId({ commit }, val) {
    return new Promise((resolve, reject) => {
      axios
        .post('settings/generate', { id_type: val })
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  // assign new quick job
  assign_new_quick_job({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('jobs/assign/quick_job', payload)
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  // assign new quick job
  employee_activity({ commit }, user_id) {
    return new Promise((resolve, reject) => {
      axios
        .post('summary/activities', { emp_user_id: user_id })
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  // assign new quick job
  employee_activity_tasks({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('summary/activities/tasks', { emp_user_id: data.user_id })
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }
};

export default { state, getters, mutations, actions };
