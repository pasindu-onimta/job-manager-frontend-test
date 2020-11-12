import axios from 'axios';

const state = {
  jobs: [],
  jobs_for_admin: [],
  pending_approvals: [],
  jobCount: 0,
  jobs_qc: null,
  job: {},
  all_unassigned_jobs: null,
  user_all_assigned_jobs: null
};

const getters = {
  jobs: (state) => state.jobs,
  job: (state) => state.job,
  jobCount: (state) => state.jobCount,
  jobs_qc: (state) => state.jobs_qc,
  unassigned_jobs: (state) => state.all_unassigned_jobs,
  user_all_assigned_jobs: (state) => state.user_all_assigned_jobs,
  pending_approvals: (state) => state.pending_approvals
};

const mutations = {
  SET_JOBS: (state, jobs) => {
    state.jobs = jobs;
  },
  SET_JOBS_ADMIN: (state, jobs) => {
    state.jobs_for_admin = jobs;
  },
  SET_JOB_COUNT: (state, count) => {
    state.jobCount = count;
  },
  PUSH_JOB: (state, job) => {
    state.jobs.push(job);
  },
  SET_JOB: (state, job) => {
    console.log(111111111, job);
    state.job = job;
  },
  UPDATE_JOB: (state, job) => {
    let index = state.jobs.findIndex((element) => element.id == job.id);
    // state.jobs[index] = job;
    state.jobs.splice(index, 1, job);
  },
  SET_JOBS_QC: (state, jobs_qc) => {
    state.jobs_qc = jobs_qc;
  },
  SET_All_UNASSIGNED_JOBS: (state, jobs) => {
    state.all_unassigned_jobs = jobs;
  },
  SET_All_ASSIGNED_JOBS: (state, jobs) => {
    state.user_all_assigned_jobs = jobs;
  },
  SET_PENDING_APPROVALS: (state, pending) => {
    state.pending_approvals = [];
    pending.forEach((element, index) => {
      element.no = ++index;
      state.pending_approvals.push(element);
    });
  },
  UPDATE_PENDING_APPROVALS: (state, payload) => {
    const task_user_id = payload.task_user_id;
    const job_user_id = payload.job_user_id;
    const allTasks = payload.allTasks;

    if (allTasks) {
      const aa = state.pending_approvals.filter((element) => {
        return element.job_user_id == job_user_id;
      });
      aa.forEach((element, index) => {
        console.log('awaa', state.pending_approvals.splice(index, 1));
        state.pending_approvals = aa;
      });
    } else {
      state.pending_approvals.forEach((element, index) => {
        if (element.task_user_id == task_user_id) {
          state.pending_approvals.splice(index, 1);
        }
      });
    }
  }
};

const actions = {
  load_jobs({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('all_jobs')
        .then(({ data }) => {
          commit('SET_All_UNASSIGNED_JOBS', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  syncJobs({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('jobs/sync')
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  load_assigned_jobs({ commit }, user_id) {
    return new Promise((resolve, reject) => {
      axios
        .get('all_jobs/user/' + user_id)
        .then(({ data }) => {
          commit('SET_All_ASSIGNED_JOBS', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  jobs({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('jobs')
        .then(({ data }) => {
          commit('SET_JOBS', data);
          resolve(data);
        })
        .catch((err) => {
          localStorage.removeItem('token');
          reject(err);
        });
    });
  },
  jobsForAdmin({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('jobs/details/admin')
        .then(({ data }) => {
          commit('SET_JOBS_ADMIN', data);
          resolve(data);
        })
        .catch((err) => {
          localStorage.removeItem('token');
          reject(err);
        });
    });
  },

  loadJobDetails({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get('jobs/details/' + id)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  selectedJob({ commit, state }, job_id) {
    return new Promise((resolve, reject) => {
      let selected_job = state.jobs_for_admin.find((el) => el.id == job_id);
      resolve(selected_job);
    });
  },
  jobsQC({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('jobs/qc')
        .then(({ data }) => {
          commit('SET_JOBS_QC', data);
          resolve(data);
        })
        .catch((err) => {
          localStorage.removeItem('token');
          reject(err);
        });
    });
  },
  createJob({ commit }, job) {
    return new Promise((resolve, reject) => {
      axios
        .post('jobs', job)
        .then(({ data }) => {
          commit('PUSH_JOB', data.job);
          resolve(data);
        })
        .catch((err) => {
          // localStorage.removeItem('token')
          reject(err);
        });
    });
  },
  getJobs({ commit }, filter) {
    return new Promise((resolve, reject) => {
      axios
        .post(`jobs/all?page=${filter.page}`, filter)
        .then(({ data }) => {
          commit('SET_JOBS', data.jobs.data);
          commit('SET_JOB_COUNT', data.count);
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          // localStorage.removeItem('token')
          reject(err);
        });
    });
  },
  setJob({ commit }, job) {
    console.log(159, job);
    commit('SET_JOB', job);
  },
  updateJob({ commit }, job) {
    return new Promise((resolve, reject) => {
      axios
        .put('jobs', job)
        .then(({ data }) => {
          commit('UPDATE_JOB', data.job);
          resolve(data);
        })
        .catch((err) => {
          // localStorage.removeItem('token')
          console.log('44585');
          reject(err);
        });
    });
  },
  getJobsWIthTasks({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .get(`user/${user}/jobs`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          localStorage.removeItem('token');
          reject(err);
        });
    });
  },
  getJobById({ commit }, job_id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`job/${job_id}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          localStorage.removeItem('token');
          reject(err);
        });
    });
  },
  changeJobDueDate({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('jobs/change/due_date', payload)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  pendingApprovals({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('jobs/approvals/pending')
        .then(({ data }) => {
          commit('SET_PENDING_APPROVALS', data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  approveTask({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('tasks/approve', payload)
        .then((data) => {
          commit('UPDATE_PENDING_APPROVALS', payload);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default { state, getters, mutations, actions };
