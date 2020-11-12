import axios from 'axios';

const state = {
  tasks: null,
  selected_task: null
};

const getters = {
  tasks: (state) => state.tasks,
  selected_task: (state) => state.selected_task
};

const mutations = {
  SET_TASKS: (state, tasks) => {
    state.tasks = tasks;
  },
  SET_SELECTED_TASK: (state, data) => {
    state.selected_task = data;
  }
};

const actions = {
  load_tasks({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('tasks', payload)
        .then(({ data }) => {
          commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  load_selected_job_tasks({ commit }, job_id) {
    return new Promise((resolve, reject) => {
      axios
        .get('job/tasks/' + job_id)
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  load_selected_job_tasks_for_user({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`job/tasks/${payload.job_id}/${payload.user_id}`)
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  single_task({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let obj = {};

      if (typeof payload === 'object') {
        obj = { task_id: payload.task, mode: payload.mode };
      } else {
        obj = { task_id: payload, mode: 'job' };
      }
      axios
        .post('tasks/single', obj)
        .then(({ data }) => {
          commit('SET_SELECTED_TASK', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  single_task_today({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .post('tasks/singleToday')
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  setPlanDate({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('tasks/plan_date', data)
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  change_task_due_date({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('tasks/due_date/change', data)
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  change_estimate_time({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('tasks/estimate_time/change', payload)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  get_users_tasks({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .get(`user/${user}/tasks`)
        .then(({ data }) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },
  change_task_dates({ commit }, task) {
    return new Promise((resolve, reject) => {
      axios
        .put(`user/task_plan`, task)
        .then((data) => {
          // commit('SET_TASKS', data);
          resolve(data);
        })
        .catch((error) => {
          if (error.response && [400, 500].includes(error.response.status)) {
            reject(error.response.data.message);
          }
        });
    });
  },
  sendApproveRequestToAdmin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('tasks/approve/request', payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  updateQcEmployee({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('tasks/updateQcEmployee', payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default { state, getters, mutations, actions };
