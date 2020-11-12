import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardLayout from '@/layouts/Dashboard.vue';
import Login from '@/views/Auth/Login.vue';
import KanbanBoard from '@/views/Kanban/KanbanBoard.vue';
import KanbanBoardQC from '@/views/Kanban/KanbanBoardQC.vue';
import Home from '@/views/Home.vue';
import Summary from '@/views/Summary.vue';
import EmployeeActivity from '@/views/EmployeeActivity.vue';
import Jobs from '@/views/Kanban/Jobs.vue';
import QCJobs from '@/views/Kanban/QCJobs.vue';
import TaskAssign from '@/views/Tasks/TaskAssign.vue';
import TaskEdit from '@/views/Tasks/TaskEdit.vue';
import store from '@/store';
import Employee from '@/views/Setting/Employee.vue';
import EditJobDetails from '@/views/Setting/EditJobDetails.vue';
import EmployeeDailyActivity from '@/views/Reports/EmployeeDailyActivity.vue';
import JobAllocations from '@/views/Reports/JobAllocations.vue';
import JobDetails from '@/views/Reports/JobDetails.vue';
import Customer from '@/views/Setting/Customer.vue';

import CreateJobs from '@/views/Jobs/CreateJobs.vue';
import JobList from '@/views/Jobs/JobList.vue';
import EmpPlan from '@/views/EmployeePlan/EmpPlan.vue';
import jobDashboard from '@/views/JobDashboard/JobDashboard.vue';
import ServiceAdd from '@/views/Services/ServiceAdd.vue';
import SuperAdmin from '@/views/Admin/SuperAdmin.vue';
import JobAuthorization from '@/views/Jobs/JobAuthorization.vue';
import AllJobs from '@/views/Jobs/AllJobs.vue';
import JobRequest from '@/views/Jobs/JobRequest.vue';
import NewJob from '@/views/Jobs/NewJob.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dashboardLayout',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Home,
        meta: { requiresAdmin: true }
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: Jobs
      },
      {
        path: 'job',
        name: 'KanbanBoard',
        component: KanbanBoard,
        beforeEnter: (to, from, next) => {
          console.log(to.query.id);
          store.dispatch('notifications');
          next();
        }
      },
      {
        path: 'qcs',
        name: 'QC',
        component: QCJobs
      },
      {
        path: 'qc',
        name: 'KanbanBoardQC',
        component: KanbanBoardQC,
        beforeEnter: (to, from, next) => {
          // console.log(to.query.id);
          store.dispatch('notifications');
          next();
        }
      },
      {
        path: 'task-assign',
        name: 'TaskAssign',
        component: TaskAssign
      },
      {
        path: 'task-edit',
        name: 'TaskEdit',
        component: TaskEdit
      },
      {
        path: 'employee',
        name: 'Employee',
        component: Employee
      },
      {
        path: 'summary',
        name: 'Summary',
        component: Summary
      },
      {
        path: 'emp_activity',
        name: 'EmployeeActivity',
        component: EmployeeActivity
      },
      {
        path: 'emp_daily_activity',
        name: 'EmployeeDailyActivity',
        component: EmployeeDailyActivity
      },
      {
        path: 'customer',
        name: 'customer',
        component: Customer
      },
      {
        path: 'daily_job_allocations',
        name: 'JobAllocations',
        component: JobAllocations
      },
      {
        path: 'job_details',
        name: 'JobDetails',
        component: JobDetails
      },
      {
        path: 'allJobs',
        name: 'allJobs',
        component: JobList,
        children: [
          {
            path: '',
            name: 'AllJobs',
            component: AllJobs
          },
          {
            path: 'job-request',
            name: 'job-request',
            component: JobRequest
          },
          {
            path: 'new-job',
            name: 'new-job',
            component: NewJob
          }
        ]
      },
      {
        path: 'employee_plan',
        name: 'employee_plan',
        component: EmpPlan
      },
      {
        path: 'edit-job-details',
        name: 'EditJobDetails',
        component: EditJobDetails
      },
      {
        path: 'job-dashboard',
        name: 'jobDashboard',
        component: jobDashboard
      },
      {
        path: 'service-add',
        name: 'ServiceAdd',
        component: ServiceAdd
      },
      {
        path: 'super-admin',
        name: 'SuperAdmin',
        component: SuperAdmin
      },
      {
        path: 'job-authorization',
        name: 'JobAuthorization',
        component: JobAuthorization
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '*',
    component: DashboardLayout
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
