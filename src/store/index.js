import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import sections from './modules/kanban/sections';
import jobs from './modules/kanban/jobs';
import tasks from './modules/kanban/tasks';
import activity from './modules/kanban/activity';
import taskAssisgn from './modules/taskAssign/task';
import sub_tasks from './modules/taskAssign/sub_tasks';
import main from './modules/dashboard/main';
import users from './modules/users';
import notifications from './modules/notifications';

import employee from './modules/setting/employee';
import customers from './modules/setting/customers';

import employeeDailyActivity from './modules/reports/employeeDailyActivity';
import jobAllocationReport from './modules/reports/jobAllocationReport';
import divisions from './modules/setting/division';
import jobSummary from './modules/dashboard/dashJob';
import service from './modules/service';
import superAdmin from './modules/admin/superAdmin';
import features from './modules/admin/features';
// Load vuex
Vue.use(Vuex);

// Create store
const store = new Vuex.Store({
  modules: {
    auth,
    sections,
    jobs,
    tasks,
    activity,
    employee,
    taskAssisgn,
    users,
    sub_tasks,
    main,
    notifications,
    customers,
    employeeDailyActivity,
    jobAllocationReport,
    divisions,
    jobSummary,
    service,
    superAdmin,
    features
  }
});

export default store;
