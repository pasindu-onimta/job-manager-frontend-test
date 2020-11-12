import axios from 'axios';

const state = {
    divisions: [],
};

const getters = {
    divisions: (state) => state.divisions,
};

const mutations = {
    SET_DIVISIONS: (state, divisions) => {
        state.divisions = divisions;
    },
};

const actions = {
    get_divisions({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get('divisions').then(({ data }) => {
                commit('SET_DIVISIONS', data);
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        })
    }
};

export default { state, getters, mutations, actions };




