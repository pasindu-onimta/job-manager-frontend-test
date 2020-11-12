import axios from 'axios';

const state = {
  employeeDailyActivityReport: {}
};

const getters = {
  dailyEmployeeActivities: (state) => state.employeeDailyActivityReport
};

const mutations = {
  SET_EMP_DAILY_ACTIVITY_REPORT: (state, report) => {
    state.employeeDailyActivityReport = report;
  }
};

const actions = {
  employeeDailyActivityReport({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('reports/emp_daily_activity', { payload })
        .then(({ data }) => {
          commit('SET_EMP_DAILY_ACTIVITY_REPORT', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  allEmployeeDailyActivityReport({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('reports/all_emp_daily_activity', { payload })
        .then(({ data }) => {
          commit('SET_EMP_DAILY_ACTIVITY_REPORT', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  isEmployeeDayEnd({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('reports/uploads/isEmployeeDayEnd', payload)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  uploadToWorksheet({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('reports/uploads/worksheet', payload)
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
