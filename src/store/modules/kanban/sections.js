import axios from 'axios';

const state = {
    sections: null,
};

const getters = {
    sections: (state) => state.sections
};

const mutations = {
    SET_SECTIONS: (state, sections) => {
        state.jobs = sections;
    }
};

const actions = {
    load_sections({ commit }, job_type) {
        return new Promise((resolve, reject) => {
            axios.post('sections', { type: job_type }).then(({ data }) => {
                commit('SET_SECTIONS', data);
                resolve(data);
            }).catch(err => reject(err));
        })
    },
};

export default { state, getters, mutations, actions };





