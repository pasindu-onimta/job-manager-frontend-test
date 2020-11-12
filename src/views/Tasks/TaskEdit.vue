<template>
  <div class="pcoded-content">
    <PageHeader
      title="Task Re-assigning"
      path="/jobTasking"
      description="Assigned Tasks"
    ></PageHeader>

    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Assigned Job List</h5>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div
                          class="form-group d-flex justify-content-between"
                          :class="{
                            error: validation.hasError('selected_user'),
                          }"
                        >
                          <label class="col-form-label">Employee</label>
                          <div class="col-sm-10">
                            <v-select
                              label="name"
                              v-model="selected_user"
                              :options="users"
                              :reduce="(users) => users.id"
                              placeholder="Select an employee.."
                              @input="loadJobsForSelectedUser"
                            ></v-select>
                            <div class="message">
                              {{ validation.firstError("selected_user") }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div
                          class="form-group d-flex justify-content-between"
                          :class="{
                            error: validation.hasError('selected_job'),
                          }"
                        >
                          <label class="col-form-label">Job</label>
                          <div class="col-sm-10">
                            <v-select
                              label="job_no"
                              v-model="selected_job"
                              :options="jobs"
                              :reduce="(jobs) => jobs.id"
                              placeholder="Select a job"
                              @input="loadTasks"
                            >
                              <template
                                slot="option"
                                slot-scope="option"
                                class="d-flex justify-contnet-between"
                              >
                                <span style="font-weight: bold">{{
                                  option.job_no
                                }}</span>
                                - {{ option.customer_name }}
                              </template>
                            </v-select>
                            <div class="message">
                              {{ validation.firstError("selected_job") }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-md-12">
                        <vue-good-table
                          ref="my-table"
                          :columns="columns"
                          :rows="tasks"
                          styleClass="vgt-table bordered condensed"
                          :search-options="{
                            enabled: true,
                          }"
                          :select-options="{
                            enabled: true,
                            selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                            selectionInfoClass: 'bg-info text-white',
                            selectionText: 'rows selected',
                            clearSelectionText: 'clear',
                            disableSelectInfo: false, // disable the select info panel on top
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
                <div class="card" v-if="isTaskSelected">
                  <div class="card-body">
                    <div class="row mt-3">
                      <div class="col-md-6">
                        <div
                          class="form-group d-flex justify-content-between"
                          :class="{
                            error: validation.hasError('selected_employee'),
                          }"
                        >
                          <label class="col-form-label">Assignee</label>
                          <div class="col-sm-10">
                            <v-select
                              label="name"
                              v-model="selected_employee"
                              :options="users"
                              :reduce="(users) => users.id"
                              placeholder="Select an employee.."
                            ></v-select>
                            <div class="message">
                              {{ validation.firstError("selected_employee") }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="form-group d-flex justify-content-between"
                          :class="{
                            error: validation.hasError('selected_employee_qc'),
                          }"
                        >
                          <label class="col-form-label">QC</label>
                          <div class="col-sm-10">
                            <v-select
                              label="name"
                              v-model="selected_employee_qc"
                              :options="users"
                              :reduce="(users) => users.id"
                              placeholder="Select an employee.."
                            ></v-select>
                            <div class="message">
                              {{
                                validation.firstError("selected_employee_qc")
                              }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group d-flex justify-content-between">
                          <label class="col-form-label">Due Date</label>
                          <div class="col-sm-10">
                            <v-date-picker
                              style="z-index: 200"
                              v-model="due_date"
                              :popover="{ visibility: 'click' }"
                              :min-date="new Date()"
                            />
                          </div>
                        </div>
                        <div
                          class="form-group d-flex justify-content-between"
                          :class="{
                            error: validation.hasError('selected_priority'),
                          }"
                        >
                          <label class="col-form-label">Priority</label>
                          <div class="col-sm-10">
                            <v-select
                              label="name"
                              :options="priorities"
                              v-model="selected_priority"
                              :reduce="(priorities) => priorities.value"
                            ></v-select>
                            <div class="message">
                              {{ validation.firstError("selected_priority") }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-end mt-3">
                      <button
                        class="btn btn-success"
                        type="button"
                        @click="assignTask"
                      >
                        save
                      </button>
                      <button
                        class="btn btn-secondary ml-2"
                        type="button"
                        @click="cancelTaskAssigning"
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="md-overlay"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
import db from "@/firebase";
import PageHeader from "@/components/PageHeader";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    PageHeader,
  },
  data() {
    return {
      columns: [
        {
          label: "Id",
          field: "id",
          hidden: true,
        },
        {
          label: "Task No",
          field: "task_no",
        },
        {
          label: "Task Name",
          field: "task_name",
          width: "450px",
          tdClass: "table-custom",
        },
        {
          label: "OP",
          field: "Time01",
        },
        {
          label: "ML",
          field: "Time02",
        },
        {
          label: "PE",
          field: "Time03",
        },
      ],
      tasks: [],
      openmodal: false,
      isSyncing: false,
      search: "",
      isTaskSelected: false,
      editMode: false,
      users: [],
      jobs: [],
      selected_job: "",
      priorities: [
        { name: "High", value: 1 },
        { name: "Medium", value: 2 },
        { name: "Low", value: 3 },
      ],
      jobsWithTasks: [],
      subTasks: [],
      selected_id: "",
      job_id: "",
      task_name: "",
      task_no: "",
      task_description: "",
      optimistic_time: "",
      most_likely_time: "",
      pessimistic_time: "",
      selected_user: "",
      selected_employee: "",
      selected_employee_qc: "",
      selected_job: "",
      selected_priority: 2,
      due_date: new Date(),
      sub_task_name: "",
      sub_task_selected_employee: "",
      sub_task_due_date: new Date(),
    };
  },

  validators: {
    selected_job: function (value) {
      return Validator.value(value).required("Please select a job");
    },
    selected_employee_qc: function (value) {
      return Validator.value(value).required("Please select an employee");
    },
    selected_employee: function (value) {
      return Validator.value(value).required("Please select an employee");
    },
    selected_priority: function (value) {
      return Validator.value(value).required(
        "Please select valid priority type"
      );
    },
  },
  methods: {
    ...mapActions([
      "fetchAllJObsWithTasks",
      "load_users",
      "load_jobs",
      "load_sub_tasks",
      "add_sub_task",
      "assign_task",
      "syncJobs",
    ]),
    loadTasks() {
      const loader = this.$loading.show();
      const filtered_tasks = [];
      this.$store
        .dispatch("load_selected_job_tasks_for_user", {
          job_id: this.selected_job,
          user_id: this.selected_user,
        })
        .then((res) => {
          const filtered_tasks = res.filter((el) => {
            return el.Time01 != 0;
          });
          this.tasks = filtered_tasks;
          this.isTaskSelected = true;
          loader.hide();
        })
        .catch((err) => loader.hide());
    },
    loadJobsForSelectedUser() {
      this.selected_job = "";
      this.$store
        .dispatch("load_assigned_jobs", this.selected_user)
        .then((res) => {
          this.jobs = res;
        });
    },
    showModal() {
      this.openmodal = true;
    },
    closeModal() {
      this.openmodal = false;
    },
    getDays() {
      var someWeek = moment.weekdaysShort(new Date());
    },
    assignTask() {
      let self = this;
      this.$validate().then((success) => {
        if (success) {
          if (this.$refs["my-table"].selectedRows.length == 0) {
            swal("Error!", `You should select at least one task`, "error", {
              timer: 2000,
            });
            return;
          }
          const loader = this.$loading.show();
          this.assign_task({
            type: 2,
            tasks: this.$refs["my-table"].selectedRows,
            task_assigned_employee: this.selected_employee,
            task_assigned_qc_employee: this.selected_employee_qc,
            task_priority: this.selected_priority,
            task_due_date: this.due_date,
          })
            .then((res) => {
              this.cancelTaskAssigning();
              // add record to firebase firestore
              db.collection("tasks")
                .doc("emp")
                .set({
                  notification_id: 1,
                  user_id: res.assigned_emp,
                  status: 1,
                  timestamp: new Date(),
                })
                .then(function (docRef) {
                  // self.fetchAllJObsWithTasks().then(res => {
                  loader.hide();
                  swal("Good job!", `Task assigned successfully`, "success", {
                    timer: 2000,
                  });
                  // self.jobsWithTasks = res;
                  // });
                })
                .catch(function (error) {
                  loader.hide();
                  console.error("Error adding document: ", error);
                });
              this.cancelTaskAssigning();
              // loader.hide();
            })
            .catch((err) => {
              loader.hide();
              this.cancelTaskAssigning();
              swal("Error!", err.response.data.message, "error", {
                timer: 3000,
              });
            });
        }
      });

      this.editMode = false;
    },
    cancelTaskAssigning() {
      this.job_id = "";
      this.task_name = "";
      this.task_description = "";
      this.selected_id = "";
      this.selected_employee = "";
      this.selected_employee_qc = "";
      this.selected_priority = 2;
      this.due_date = new Date();
      this.most_likely_time = "";
      this.pessimistic_time = "";
      this.optimistic_time = "";
      // this.isTaskSelected = false;
      this.$refs["my-table"].unselectAllInternal();
      this.validation.reset();
    },
    saveSubTask() {
      this.add_sub_task({
        task_id: this.selected_id,
        stn: this.sub_task_name,
        ste: this.sub_task_selected_employee,
        stdd: this.sub_task_due_date,
      }).then((res) => {
        this.subTasks.unshift(res.sub_task);
        $("#subTaskAddModal").modal("hide");
      });
    },
    syncData() {
      const loader = this.$loading.show();
      this.syncJobs()
        .then((res_1) => {
          this.fetchAllJObsWithTasks().then((res) => {
            loader.hide();
            swal(`${res_1.message}!`, {
              icon: "success",
            });
            this.jobsWithTasks = res;
          });
        })
        .catch((err) => {
          loader.hide();
        });
    },
    showSubTaskAddTextField() {
      $("#subTaskAddModal").modal({ backdrop: "static", keyboard: false });
    },
  },
  computed: {
    ...mapGetters(["allTasks", "user"]),
    filteredJobsWithTasks: function () {
      if (this.jobsWithTasks.filter) {
        return this.jobsWithTasks.filter((job) => {
          return job.job_no.match(this.search.toUpperCase());
        });
      }
    },
  },
  created() {
    $(window).scroll(function () {
      if ($(window).scrollTop() >= 200) {
        $(".fixedContainer").addClass("fixed-header");
      } else {
        $(".fixedContainer").removeClass("fixed-header");
      }
    });
    // const loader = this.$loading.show();
    // this.fetchAllJObsWithTasks().then(res => {
    //   this.jobsWithTasks = res;
    //   loader.hide();
    // });
    this.getDays();
    this.load_users().then((res) => {
      this.users = res;
    });
  },
};
</script>



<style scoped>
.d {
  /* position: absolute; */
  display: table;
  /* This is important */
  overflow-y: auto;
  overflow-x: auto;
  width: auto;
  min-width: 70%;
}

.fixed-header {
  position: fixed;
  top: 15%;
  left: 54%;
  width: 600px;
}
.block-ellipsis {
  width: 50px;
  word-wrap: break-word;
}
.ps {
  height: 420px;
}
.message {
  color: red;
  font-size: 12px;
  margin-left: 5px;
}

.table-custom {
  max-width: 100px;
  overflow: hidden;
}
</style>