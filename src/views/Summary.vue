<template>
  <div class="pcoded-content">
    <div class="d-flex justify-content-end">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- <img src="http://localhost:8000/Profileimage/profile_cover.jpg" alt class="cover-image" /> -->
      </div>
    </div>
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <!-- <button class="btn btn-info mb-3" @click="loadActivitiesToday()">Load employee history</button> -->
            <!-- Task Detail Modal Start -->

            <div
              class="modal fade"
              id="large-Modal3"
              tabindex="-1"
              role="dialog"
            >
              <div class="modal-dialog modal-lg" role="document">
                <activity-modal-content
                  :selected_task="selected_task"
                ></activity-modal-content>
              </div>
            </div>

            <!-- Task Detail Modal End -->
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Employee Daily Activity</h5>
                  </div>
                  <div class="card-block">
                    <div class="row">
                      <div class="col-md-12">
                        <vue-good-table
                          ref="my-table1"
                          :columns="historyField"
                          :rows="dailyActivities"
                          rowStyleClass="bg-success text-white"
                          styleClass="vgt-table bordered condensed"
                          :search-options="{
                            enabled: true,
                          }"
                          :pagination-options="{
                            enabled: true,
                            mode: 'records',
                            perPage: 15,
                            position: 'bottom',
                            perPageDropdown: [5, 10, 15, 50, 100],
                            dropdownAllowAll: false,
                            setCurrentPage: 1,
                            nextLabel: 'next',
                            prevLabel: 'prev',
                            rowsPerPageLabel: 'Rows per page',
                            ofLabel: 'of',
                            pageLabel: 'page', // for 'pages' mode
                            allLabel: 'All',
                          }"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Job Details</h5>
                  </div>
                  <div class="card-block">
                    <div class="row">
                      <div class="col-md-12">
                        <vue-good-table
                          ref="my-table2"
                          :row-style-class="tasksTableClass2"
                          :columns="jobsfields"
                          :rows="all_assigned_jobs"
                          styleClass="vgt-table bordered condensed"
                          :search-options="{
                            enabled: true,
                          }"
                          :pagination-options="{
                            enabled: true,
                            mode: 'records',
                            perPage: 15,
                            position: 'bottom',
                            perPageDropdown: [5, 10, 15, 50, 100],
                            dropdownAllowAll: false,
                            setCurrentPage: 1,
                            nextLabel: 'next',
                            prevLabel: 'prev',
                            rowsPerPageLabel: 'Rows per page',
                            ofLabel: 'of',
                            pageLabel: 'page', // for 'pages' mode
                            allLabel: 'All',
                          }"
                        >
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'action'">
                              <button
                                class="btn btn-info btn-sm"
                                style="height: 30px"
                                @click="onActionClicked(props.row)"
                              >
                                view
                              </button>
                            </span>
                            <span v-else>{{
                              props.formattedRow[props.column.field]
                            }}</span>
                          </template>
                        </vue-good-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-md-12 mt-2 mb-2 ml-2 d-flex align-items-start"
                id="task_details"
                v-if="isJobSelect"
              >
                <div class="mr-5">
                  <div>
                    <span style="font-weight: bold" class="mr-3">Job No</span>
                    -
                    <span class="ml-3">{{ selected_job.jobno }}</span>
                  </div>
                  <div class="mt-2">
                    <span style="font-weight: bold" class="mr-3"
                      >Customer ID</span
                    >
                    -
                    <span class="ml-3">{{ selected_job.customer_id }}</span>
                  </div>
                  <div class="mt-2">
                    <span style="font-weight: bold" class="mr-3">Customer</span>
                    -
                    <span class="ml-3">{{ selected_job.customer }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span style="font-weight: bold" class="mr-3">System</span>
                    -
                    <span class="ml-3">{{ selected_job.system }}</span>
                  </div>
                  <div class="mt-2">
                    <span style="font-weight: bold" class="mr-3">Due Date</span>
                    -
                    <span class="ml-3">{{ selected_job.due_date }}</span>
                  </div>
                </div>
              </div>
              <div class="ml-4 mb-4" v-if="isJobSelect">
                <span style="font-weight: bold" class="mr-3">Description</span>
                -
                <span class="ml-3">{{ selected_job.job_description }}</span>
              </div>
              <div class="col-md-12" v-if="isJobSelect">
                <div class="card">
                  <div
                    class="card-header d-flex justify-content-between align-items-center"
                  >
                    <h5>Tasks Details</h5>
                  </div>
                  <div class="card-block">
                    <!-- <vuetable
                      ref="tasks"
                      :api-mode="false"
                      :fields="tasksfields"
                      :per-page="perPage"
                      :data-manager="dataManager2"
                      pagination-path="pagination"
                      :row-class="taskRowClass"
                    >
                    <div slot="actions" slot-scope="props">
                        <button
                          class="btn btn-sm btn-info"
                          @click="loadActivities('view-item', props.rowData)"
                        >view</button>
                      </div>
                    </vuetable>-->
                    <div class="row">
                      <div class="col-md-12">
                        <vue-good-table
                          ref="my-table3"
                          :row-style-class="tasksTableClass"
                          :columns="tasksfields"
                          :rows="tasksData"
                          styleClass="vgt-table bordered condensed"
                          :search-options="{
                            enabled: true,
                          }"
                          :pagination-options="{
                            enabled: true,
                            mode: 'records',
                            perPage: 15,
                            position: 'bottom',
                            perPageDropdown: [5, 10, 15, 50, 100],
                            dropdownAllowAll: false,
                            setCurrentPage: 1,
                            nextLabel: 'next',
                            prevLabel: 'prev',
                            rowsPerPageLabel: 'Rows per page',
                            ofLabel: 'of',
                            pageLabel: 'page', // for 'pages' mode
                            allLabel: 'All',
                          }"
                        >
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'action'">
                              <button
                                class="btn btn-info btn-sm"
                                style="height: 30px"
                                @click="loadActivities(props.row)"
                              >
                                view
                              </button>
                            </span>
                            <span v-else>{{
                              props.formattedRow[props.column.field]
                            }}</span>
                          </template>
                        </vue-good-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
// import JobsDetailRow from "@/components/JobsDetailRow";
// import Vuetable from "vuetable-2";
// import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import moment from "moment";
// import _ from "lodash";
import { mapActions } from "vuex";
export default {
  name: "Jobs",
  components: {
    PageHeader,
    // JobsDetailRow,
    // Vuetable,
    // VuetablePagination
  },
  data() {
    return {
      historyField: [
        { field: "jobno", label: "Job No" },
        { field: "customer", label: "Customer" },
        { field: "duedate", label: "Due Date" },
        { field: "status", label: "Status" },
        { field: "started_at", label: "Started At" },
        { field: "actions", label: "Action" },
      ],
      jobsfields: [
        { field: "jobno", label: "Job No" },
        { field: "customer", label: "Customer" },
        { field: "duedate", label: "Due Date" },
        { field: "plandate", label: "Plan Date", tdClass: "text-center" },
        { field: "no_of_tasks", label: "NT", tdClass: "text-center" },
        { field: "finished_tasks", label: "FT", tdClass: "text-center" },
        // { name: "qc_tasks", title: "QT" },
        { field: "remains_tasks", label: "RT", tdClass: "text-center" },
        { field: "status", label: "Status" },
        { field: "started_at", label: "Started At" },
        // { name: "ended_at", title: "Ended At" },
        { field: "action", label: "Action" },
      ],
      tasksfields: [
        { field: "taskno", label: "Task No" },
        { field: "duedate", label: "Due Date" },
        { field: "plandate", label: "Plan Date", tdClass: "text-center" },
        { field: "op_time", label: "OP", tdClass: "text-right" },
        { field: "mo_time", label: "MO", tdClass: "text-right" },
        { field: "pe_time", label: "PE", tdClass: "text-right" },
        { field: "time_spent", label: "Spent Time" },
        { field: "status", label: "Status" },
        { field: "started_at", label: "Started At", tdClass: "text-center" },
        { field: "ended_at", label: "Ended At", tdClass: "text-center" },
        { field: "action", label: "Action", tdClass: "bg-white" },
      ],
      all_assigned_jobs: [],
      tasksData: [],
      dailyActivities: [],
      search: "",
      selected_task: {},
      selected_job: {},
      comment: "",
      isJobSelect: false,
      isDueDateChange: false,
      admin_due_date: new Date(),
    };
  },

  created() {
    const loader = this.$loading.show();
    const data = [];
    this.$store
      .dispatch("employee_summary", { id: this.$route.query.id })
      .then((res) => {
        res.forEach((el) => {
          if (el.job_status != "Finished") {
            data.push({
              job_user_id: el.job_user.id,
              ongoing: el.ongoing,
              is_qc_job: el.is_qc_job,
              jobno: `${el.job_no} ${el.is_qc_job ? "(QC)" : ""}`,
              customer: el.customer_name,
              job_description: el.job_description,
              due_date: el.due_date,
              customer_id: el.customer_id,
              system: el.system,
              duedate: moment(el.due_date).format("DD/MM/YYYY"),
              plandate: el.plan_date
                ? moment(el.plan_date).format("DD/MM/YYYY")
                : "N/A",
              no_of_tasks: el.no_of_tasks,
              finished_tasks: el.no_of_finished_tasks,
              qc_tasks: el.no_of_qc_tasks,
              remains_tasks: el.no_of_remaining_tasks,
              status: el.job_status,
              started_at: el.first_activity
                ? moment(el.first_activity).format("MM/DD h:mm A")
                : "N/A",
              // ended_at: "24/06/2020"
            });
          }
        });
        this.all_assigned_jobs = data;
        // this.loadDailyActivities();
        loader.hide();
      })
      .catch((err) => loader.hide());

    this.$store
      .dispatch("employee_activity", { id: this.$route.query.id })
      .then((res) => {
        res.forEach((el) => {
          data2.push({
            // job_user_id: el.job_user.id,
            // ongoing: el.ongoing,
            // is_qc_job: el.is_qc_job,
            jobno: `${el.job_no} ${el.is_qc_job ? "(QC)" : ""}`,
            customer: el.customer_name,
            // due_date: el.due_date,
            // customer_id: el.customer_id,
            duedate: moment(el.due_date).format("DD/MM/YYYY"),
            // plandate: moment(el.plan_date).format("MM/DD/YYYY"),
            // status: el.job_status,
            started_at: el.created_at
              ? moment(el.created_at).format("MM/DD h:mm A")
              : "N/A",
            // ended_at: "24/06/2020"
          });
        });
        this.dailyActivities = data2;
      });

    const data2 = [];
  },

  mounted() {},

  methods: {
    ...mapActions(["single_task", "save_comments", "single_task_today"]),

    loadDailyActivities() {
      this.$store
        .dispatch("employee_activity", { id: this.$route.query.id })
        .then((res) => {
          res.forEach((el) => {
            data2.push({
              // job_user_id: el.job_user.id,
              // ongoing: el.ongoing,
              // is_qc_job: el.is_qc_job,
              jobno: `${el.job_no} ${el.is_qc_job ? "(QC)" : ""}`,
              customer: el.customer_name,
              // due_date: el.due_date,
              // customer_id: el.customer_id,
              duedate: moment(el.due_date).format("DD/MM/YYYY"),
              // plandate: moment(el.plan_date).format("MM/DD/YYYY"),
              // status: el.job_status,
              started_at: el.created_at
                ? moment(el.created_at).format("MM/DD h:mm A")
                : "N/A",
              // ended_at: "24/06/2020"
            });
          });
          this.dailyActivities = data2;
        });
    },

    loadCoverPhoto() {
      return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH}profile_cover.jpg`;
    },

    modalClose() {
      this.admin_due_date = new Date();
      this.isDueDateChange = !this.isDueDateChange;
    },

    onActionClicked(data) {
      const loader = this.$loading.show();
      this.isJobSelect = true;
      this.selected_job = {
        customer: data.customer,
        job_description: data.job_description,
        customer_id: data.customer_id,
        jobno: data.jobno,
        system: data.system,
        due_date: data.due_date,
      };
      const tasks = [];
      this.$store
        .dispatch("employee_summary_tasks", { job_user_id: data.job_user_id })
        .then((res) => {
          res.forEach((el) => {
            tasks.push({
              task_user_id: el.id,
              task_description: el.task_description,
              task_name: el.task_name,
              due_date: el.due_date,
              plan_date: el.plan_date,
              finished_at: el.finished_at,
              task_id: el.task_id,
              user_id: el.user_id,
              taskno: el.task_no,
              duedate: moment(el.due_date).format("DD/MM/YYYY"),
              plandate: el.plan_date
                ? moment(el.plan_date).format("DD/MM/YYYY")
                : "N/A",
              op_time: el.Time01,
              mo_time: el.Time02,
              pe_time: el.Time03,
              time_spent:
                el.spent.days == "00"
                  ? `${el.spent.hours} hrs ${el.spent.minutes} min`
                  : `${el.spent.days} days ${el.spent.hours} hrs ${el.spent.minutes} min`,
              status: el.task_status,
              started_at: el.started_at
                ? moment(el.started_at).format("MM/DD h:mm A")
                : "N/A",
              ended_at: el.finished_at
                ? moment(el.finished_at).format("MM/DD h:mm A")
                : "N/A",
              spent: el.spent,
            });
          });
          this.tasksData = tasks;
          $([document.documentElement, document.body]).animate(
            {
              scrollTop: $("#task_details").offset().top - 100,
            },
            1000
          );
          loader.hide();
        })
        .catch((err) => loader.hide());
    },

    loadActivities(data) {
      const loader = this.$loading.show();
      this.selected_task = {};
      this.single_task(data.task_id)
        .then((res) => {
          this.selected_task = res.details;
          this.selected_task.activities = res.activitiesWithComments;
          this.selected_task.task_title =
            res.activitiesWithComments.length != 0
              ? res.activitiesWithComments[0].task_title
              : task.task_name;
          loader.hide();
          $("#large-Modal3").modal({ backdrop: "static", keyboard: false });
        })
        .catch((err) => loader.hide());
    },

    // save comments for activities

    saveComment(task_id) {
      this.save_comments({ task_id, comment: this.comment })
        .then((res) => {
          this.selected_task.activities.unshift(res);
          this.comment = "";
        })
        .catch((err) => console.log(err.response));
    },

    loadActivitiesToday() {
      const loader = this.$loading.show();
      this.selected_task = {};
      this.single_task_today()
        .then((res) => {
          this.selected_task = {};
          this.selected_task.activities = res;
          // this.selected_task.due_date = ongoing.task_user.due_date;
          // this.selected_task.plan_date = ongoing.task_user.plan_date;
          loader.hide();
          $("#large-Modal3").modal("show");
        })
        .catch((err) => loader.hide());
    },

    checkIfDueDateHasExceeded(
      dueDate,
      estimatedUnits,
      spentTime,
      status,
      finished_at
    ) {
      if (status == "Ongoing") {
        return "bg-success text-white";
      }
      if (!dueDate) return "";
      let currentDate = new Date();
      dueDate = moment(dueDate).add(1, "days");
      dueDate = new Date(dueDate);
      let result;
      if (status == "Finished") {
        let finishedDate = new Date(finished_at);
        result = finishedDate.getTime() > dueDate.getTime();
      } else {
        result = currentDate.getTime() > dueDate.getTime();
      }
      if (result) {
        return "bg-danger text-white";
      } else {
        if (!spentTime === undefined) return "";
        estimatedUnits = ((estimatedUnits * 100) / 25) * 15;
        let days = parseInt(spentTime.days);
        let hours = parseInt(spentTime.hours);
        let minutes = parseInt(spentTime.minutes);
        if (days != "00") minutes += days * 24 * 60;
        if (hours != "00") minutes += hours * 60;
        if (Math.sign(estimatedUnits - minutes) == -1) {
          return "text-danger";
        } else {
          if (status == "Finished") {
            return "text-success";
          }
          return "text-inverse";
        }
      }
    },

    tasksTableClass(row) {
      if (row.status == "Ongoing") {
        return "bg-success text-white";
      } else {
        return this.checkIfDueDateHasExceeded(
          row.due_date,
          row.mo_time,
          row.spent,
          row.status,
          row.finished_at
        );
      }
    },
    tasksTableClass2(row) {
      if (row.status == "Ongoing") {
        return "bg-success text-white";
      }
      return "";
    },

    getTaskColor(type) {
      if (type == 3) return "bg-warning-custom text-white";
      if (type == 4) return "bg-success text-white";
      if (type == 6) return "bg-primary text-white"; // 6 - meeting
      if (type == 7) return "bg-info text-white"; // 7 - lunch
      if (type == 8) return "bg-inverse text-white"; // 8 - hold
      if (type == 9) return "bg-danger text-white"; // 9 - dayoff
      if (type == 10) return "help text-dark"; // 10 - help
      if (type == 11) return "leave text-dark"; // 11 - leave
      return "bg-default text-dark";
    },

    getTaskColor2(type) {
      if (type == 3) return "text-white";
      if (type == 4) return "text-white";
      if (type == 6) return "text-white"; // 6 - meeting
      if (type == 7) return "text-white"; // 7 - lunch
      if (type == 8) return "text-white"; // 8 - hold
      if (type == 9) return "text-white"; // 9 - dayoff
      return "text-dark";
    },
    getTaskColor3(type) {
      if (type == 3) return "text-white";
      if (type == 4) return "text-white";
      if (type == 6) return "text-white"; // 6 - meeting
      if (type == 7) return "text-white"; // 7 - lunch
      if (type == 8) return "text-white"; // 8 - hold
      if (type == 9) return "text-white"; // 9 - dayoff
      return "text-dark";
    },

    getTaskColorActivity(activity) {
      if (activity.is_qc_task == 1) return "card card-body qc_task text-dark";
      return "text-dark";
    },

    setProfileImage(activity) {
      if (activity)
        return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH + activity.image}`;
      return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH}default.png`;
    },

    setProfileImage2(user) {
      if (user && user.employee)
        return `${
          process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH + user.employee.image
        }`;
      return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH}default.png`;
    },
  },
};
</script>

<style scoped>
.qc_job {
  background-color: rgb(247, 181, 119);
}
.qc_task {
  background-color: rgba(184, 218, 247, 0.308);
  margin: 0 0 0 10px;
}
.help {
  background-color: rgba(131, 66, 235, 0.308);
  margin: 0 0 0 10px;
}
.leave {
  background-color: rgba(238, 79, 166, 0.308);
  margin: 0 0 0 10px;
}
.cover-image {
  width: 100%;
  background-size: cover;
  height: 250px;
}
.vgt-table {
  color: white !important;
}
</style>
