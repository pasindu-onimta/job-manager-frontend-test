import axios from 'axios';


const state = {
    department: null,
    position: null,
    employee: [],
    editEmploye:[],
    emplist:[]
};

const getters = {
    department: (state) => state.department,
    position: (state) => state.position,
    employee: (state) => state.employee,
    emplist:(state)=>state.emplist,
    editEmploye:(state)=>state.editEmploye
};

const mutations = {
    SET_DEPARTMENT: (state, department) => {
        state.department = department;
    },

    SET_POSITION: (state, position) => {
        state.position = position;
    },

    SET_EMPLOYEE: (state, employee) => {
        state.employee = employee;

    },

    SET_EMPLIST:(state,emplist)=>{
        state.emplist = emplist;
    },

    SET_EDITEMPLOYEE:(state,editEmploye)=>{
        state.editEmploye=editEmploye;
    }
};

const actions = {
    getdepartment({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get('employee/getdepartment').then(({ data }) => {
                console.log(data);

                commit('SET_DEPARTMENT', data.allitems);
                resolve(data);
            }).catch(err => {
                localStorage.removeItem('token')
                // this.$router.push({ name: "login" });
                reject(err)
            });
        })
    },

    getposition({ commit }, id) {
        return new Promise((resolve, reject) => {
            axios.get(`employee/getposition/${id}`).then(({ data }) => {
                console.log(data.Position);

                commit('SET_POSITION', data.Position);
                resolve(data);
            }).catch(err => {
                localStorage.removeItem('token')
                // this.$router.push({ name: "login" });
                reject(err)
            });
        })
    },

    addemployee({ commit },employee){
        return new Promise((resolve, reject) => {
            axios.post('employee/addemployee',employee).then(({ data }) => {
                console.log(employee);

                commit('SET_EMPLOYEE', data.msg);
                resolve(data.msg);
            }).catch(err => {
                localStorage.removeItem('token')
                // this.$router.push({ name: "login" });
                reject(err)
            });
        })
    },

    
      async  getListemp({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('employee/listemployee').then(({ data }) => {
                    console.log(data.allemp);
    
                    commit('SET_EMPLIST', data.allemp);
                    resolve(data);
                }).catch(err => {
                    localStorage.removeItem('token')
                    // this.$router.push({ name: "login" });
                    reject(err)
                });
            })
    },

    getEditemployee({ commit },id){

        return new Promise((resolve, reject) => {
            axios.get(`employee/getemployee/${id}`).then(({ data }) => {
                console.log('thineth nnaya', data);

                commit('SET_EDITEMPLOYEE', data);
                resolve(data);
            }).catch(err => {
                localStorage.removeItem('token')
                // this.$router.push({ name: "login" });
                reject(err)
            });
        })


    }
    

};

export default { state, getters, mutations, actions };
