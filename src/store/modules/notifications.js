import axios from 'axios';

const state = {
    notifications: null,
    notifications_count: 0,
};

const getters = {
    notifications: (state) => state.notifications,
    notifications_count: (state) => state.notifications_count
};

const mutations = {
    SET_NOTIFICATIONS: (state, notifications) => {
        state.notifications = notifications;
    },
    SET_NOTIFICATIONS_COUNT: (state, notifications_count) => {
        state.notifications_count = notifications_count;
    },
};

const actions = {
    notifications({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get('notifications').then(({ data }) => {
                commit('SET_NOTIFICATIONS', data.notifications);
                commit('SET_NOTIFICATIONS_COUNT', data.notifications_count);
                resolve(data);
            }).catch(err => {
                reject(err)
            });
        })
    },
};

export default { state, getters, mutations, actions };




