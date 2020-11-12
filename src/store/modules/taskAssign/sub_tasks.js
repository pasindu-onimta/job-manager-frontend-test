import axios from 'axios';

const state = {
    sub_tasks: [],
};

const getters ={
    sub_tasks: state => state.sub_tasks
};

const mutations= {
    SET_SUB_TASKS: (state, sub_tasks) => {
        state.sub_tasks = sub_tasks
    }
    
};

const actions = {
    load_sub_tasks({ commit }, id) {
        return new Promise((resolve, reject) => {
            axios.get('tasks/sub_tasks/' + id).then(({ data }) => {
                commit('SET_SUB_TASKS', data);
                resolve(data);
            }).catch(err => {
                reject(err)
            });
        })
    },
    add_sub_task({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('tasks/sub_tasks', payload).then(({ data }) => {
                // commit('SET_WORKLOAD', data);
                resolve(data);
            }).catch(err => {
                reject(err)
            });
        })
    }
};


export default { state, getters, mutations, actions };