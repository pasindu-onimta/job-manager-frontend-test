import axios from 'axios';

const state = {
    activities: null,
};

const getters = {
    activities: (state) => state.activities
};

const mutations = {
    SET_ACTIVITIES: (state, activities) => {
        state.activities = activities;
    }
};

const actions = {
    activities({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('activity', payload).then(({ data }) => {
                commit('SET_ACTIVITIES', data);
                resolve(data);
            }).catch(err => reject(err));
        })
    },

    change_ongoing_task({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('activity/change', payload).then(({ data }) => {
                // commit('SET_ACTIVITIES', data);
                resolve(data);
            }).catch(err => reject(err));
        })
    },

    change_ongoing_qc_task({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('activity/change/qc', payload).then(({ data }) => {
                // commit('SET_ACTIVITIES', data);
                resolve(data);
            }).catch(err => reject(err));
        })
    },

    add_quick_job_ongoing({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('activity/change/quickjob', payload).then(({ data }) => {
                // commit('SET_ACTIVITIES', data);
                resolve(data);
            }).catch(err => reject(err));
        })
    },

    save_comments({ commit }, comment) {
        return new Promise((resolve, reject) => {
            axios.post('activity/comment/add', comment).then(({ data }) => {
                // commit('SET_ACTIVITIES', data);
                console.log(data);

                resolve(data);
            }).catch(err => reject(err));
        })
    },
    
    save_activity_plan({ commit }, activity) {
        return new Promise((resolve, reject) => {
            axios.post('activity-plan', activity).then(({ data }) => {
                // commit('SET_ACTIVITIES', data);
                console.log(data);
                resolve(data);
            }).catch(err => reject(err));
        })
    },
    delete_activity_plan({ commit }, activityId) {
        return new Promise((resolve, reject) => {
            axios.delete(`activity-plan/${activityId}`).then(({ data }) => {
                if (data) {
                    resolve(data);
                } else {
                    reject(data)
                }
            }).catch(err => reject(err));
        })
    },

};

export default { state, getters, mutations, actions };




