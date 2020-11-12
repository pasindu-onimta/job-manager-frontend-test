import axios from 'axios';

const state = {
  allTasks: []
};

const getters = {
  allTasks: (state) => state.workload
};

const mutations = {
  // SET_WORKLOAD: (state, workload) => {
  //     state.workload = workload
  // },
  SET_ALL_JOBS_WITH_TASKS: (state, allTasks) => {
    state.allTasks = allTasks;
  },
  
  CHANGE_TASK_DETAILS: (state, task_id) => {
    state.allTasks.forEach((element) => {
      element.tasks.forEach((task) => {
        if (task.id == task_id) {
          task.isAssigned = 1;
        }
      });
    });
  },

  //TODO: check all tasks is assigned
  CHECK_TASK_DETAILS: (state) => {
    state.allTasks.forEach((element) => {
      element.tasks.forEach((task) => {
        if (task.isAssigned == 1) {
          task.isAssigned = 1;
        }
      });
    });
  }
};

const actions = {
  // load_workload({ commit }) {
  //     return new Promise((resolve, reject) => {
  //         axios.post('workload').then(({ data }) => {
  //             commit('SET_WORKLOAD', data);
  //             resolve(data);
  //         }).catch(err => reject(err));
  //     })
  // },

  // syncJobs({ commit }) {
  //     return new Promise((resolve, reject) => {
  //         axios.get('jobs/sync').then(({ data }) => {

  //             // commit('SET_ALL_JOBS_WITH_TASKS', data);
  //             resolve(data);
  //         }).catch(err => {
  //             // localStorage.removeItem('token')
  //             reject(err)
  //         });
  //     })
  // },

  fetchAllJObsWithTasks({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('tasks/allTasks')
        .then(({ data }) => {
          commit('SET_ALL_JOBS_WITH_TASKS', data);
          resolve(data);
        })
        .catch((err) => {
          // localStorage.removeItem('token')
          reject(err);
        });
    });
  },

  fetchAllAssignedJObsWithTasks({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('tasks/all-tasks/assigned')
        .then(({ data }) => {
          console.log('assigned', data);

          // commit('SET_ALL_JOBS_WITH_TASKS', data);
          resolve(data);
        })
        .catch((err) => {
          // localStorage.removeItem('token')
          reject(err);
        });
    });
  },

  assign_task({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('tasks/assign', payload)
        .then(({ data }) => {
          commit('CHANGE_TASK_DETAILS', payload.task_id);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // getallEmployeeActivity({ commit }) {
  //     return new Promise((resolve, reject) => {
  //         axios.get('tasks/workload').then(({ data }) => {
  //             console.log('workload', data);

  //             // commit('SET_WORKLOAD', data);
  //             resolve(data);
  //         }).catch(err => {
  //             // localStorage.removeItem('token')
  //             // this.$router.push({ name: "login" });
  //             reject(err)
  //         });
  //     })
  // }
};

export default { state, getters, mutations, actions };
