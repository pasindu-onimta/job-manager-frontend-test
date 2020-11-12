import axios from 'axios';


const state = {
};

const getters = {
    // ongoings: (state) => state.ongoings
};

const mutations = {
    // SET_ONGOINGS: (state, ongoings) => {
    //     state.ongoings = ongoings;
    // },
};

const actions = {
    get_dash_jobs_summary({ commit }, request) {
        return new Promise((resolve, reject) => {
            axios.post('jobs/summary', request).then(({ data }) => {
                resolve(data);
            }).catch(err => {
                reject(err)
            });
        })
    },
}

export default { state, getters, mutations, actions };
//,