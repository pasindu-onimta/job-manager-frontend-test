import axios from 'axios';

const state = {
    jobAllocationReport: {},
};

const getters ={
    jobAllocationReport: state => state.jobAllocationReport
};

const mutations= {
    SET_JOB_ALLOCATION_REPORT: (state, report) => {
        state.jobAllocationReport = report
    },
    
};

const actions = {
    jobAllocationReport({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('reports/job_allocations', {payload}).then(({ data }) => {                
                commit('SET_JOB_ALLOCATION_REPORT', data.data);
                resolve(data.data);
            }).catch(err => {
                reject(err)
            });
        })
    },
    tasksForJobAllocationReport({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('reports/job_allocations/tasks', {payload}).then(({ data }) => {                
                // commit('SET_JOB_ALLOCATION_REPORT', data.data);
                resolve(data.data);
            }).catch(err => {
                reject(err)
            });
        })
    },
};


export default { state, getters, mutations, actions };