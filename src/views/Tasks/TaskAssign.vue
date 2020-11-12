<template>
  <div class="pcoded-content">
    <PageHeader
      title="Task Assign"
      path="/jobTasking"
      description="Unassigned Tasks"
    ></PageHeader>

    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <!-- Job Detail Modal Start -->

            <div
              class="modal fade"
              id="job_details_modal"
              tabindex="-1"
              role="dialog"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="mb-5">
                    <div
                      class="ml-4 mt-4 d-flex justify-content-between align-items-start"
                    >
                      <div class="d-flex flex-column">
                        <h4 class="modal-title">
                          <i
                            class="fa fa-window-maximize mr-3"
                            style="font-size: 17px"
                            aria-hidden="true"
                          ></i>
                          {{ selected_job_details.job }}
                        </h4>
                      </div>
                      <button
                        type="button"
                        class="close mr-3"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true" style="font-size: 27px"
                          >&times;</span
                        >
                      </button>
                    </div>
                    <div class="row m-1">
                      <div class="col-md-7">
                        <!-- Activity Main Section -->

                        <div class="mt-4">
                          <h6>
                            <i
                              class="fa fa-align-left mr-3"
                              style="font-size: 17px"
                              aria-hidden="true"
                            ></i
                            >Job Description
                          </h6>
                          <p>{{ selected_job_details.job_description }}</p>
                        </div>
                      </div>
                      <div class="col-md-5">
                        <div class="d-flex mt-2">
                          <h6>
                            <i
                              class="far fa-address-book mr-2"
                              style="font-size: 17px"
                            ></i
                            >Customer -
                          </h6>
                          <p class="ml-2">
                            {{ selected_job_details.customer_name }}
                          </p>
                        </div>
                        <div class="d-flex mt-2">
                          <h6>
                            <i
                              class="fas fa-barcode mr-2"
                              style="font-size: 17px"
                            ></i
                            >System -
                          </h6>
                          <p class="ml-2">{{ selected_job_details.system }}</p>
                        </div>
                        <div class="d-flex mt-2">
                          <h6>
                            <i
                              class="far fa-bell mr-2"
                              style="font-size: 17px"
                            ></i
                            >Due Date -
                          </h6>
                          <p class="ml-2">
                            {{ selected_job_details.due_date | formattedDate2 }}
                          </p>
                        </div>
                        <div
                          class="mt-5"
                          v-if="selected_job_details.isJobExpired"
                        >
                          <label
                            class="col-form-label bg-danger text-white rounded pl-3 pr-3 mr-5"
                          >
                            <i class="fas fa-exclamation mr-2"></i>Expired
                          </label>
                          <p
                            style="font-weight: 400; font-size: 12px"
                            class="text-danger mt-2"
                          >
                            Please contact administration for further
                            information
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Task Detail Modal End -->
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Pending Job List</h5>
                    <div class="card-header-right">
                      <button
                        class="btn btn-info mr-3"
                        @click="syncData"
                        :disabled="isSyncing"
                      >
                        Sync
                      </button>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="row">
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
                        <div class="form-group d-flex justify-content-between">
                          <label class="col-form-label">Due Date</label>
                          <div class="col-sm-10">
                            <v-date-picker
                              style="z-index: 200"
                              v-model="value2"
                              :popover="{ visibility: 'click' }"
                            />
                          </div>
                        </div>
                        <div class="form-group d-flex justify-content-between">
                          <label class="col-form-label"></label>
                          <div class="col-sm-10">
                            <button
                              class="btn btn-primary btn-sm"
                              v-if="isJobSelected"
                              @click="showSelectedJobDetails"
                            >
                              View Job Details
                            </button>
                          </div>
                        </div>
                      </div>
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
                    <div class="row">
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
                            selectionInfoClass: 'custom-class',
                            selectionText: 'rows selected',
                            clearSelectionText: 'clear',
                            disableSelectInfo: true, // disable the select info panel on top
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
import { Locale } from "v-calendar";
const locale = new Locale();
const mask = "YYYY-MM-DD";

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
      isJobSelected: false,
      editMode: false,
      users: [],
      jobs: [],
      selected_job: "",
      priorities: [
        { name: "High", value: 1 },
        { name: "Medium", value: 2 },
        { name: "Low", value: 3 },
      ],
      subTasks: [],
      selected_id: "",
      job_id: "",
      task_name: "",
      task_no: "",
      task_description: "",
      optimistic_time: "",
      most_likely_time: "",
      pessimistic_time: "",
      selected_employee: "",
      selected_employee_qc: "",
      selected_priority: 2,
      due_date: moment().format("YYYY-MM-DD"),
      new_due_date: "2020-01-01",
      sub_task_name: "",
      sub_task_selected_employee: "",
      sub_task_due_date: new Date(),
      selected_job_details: "",
    };
  },

  computed: {
    ...mapGetters(["allTasks", "user"]),
    value2: {
      get() {
        return this.due_date ? locale.parse(this.due_date, mask) : null;
      },
      set(val) {
        this.due_date = val ? locale.format(val, mask) : "";
      },
    },
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
      "load_users",
      "load_jobs",
      "load_sub_tasks",
      "add_sub_task",
      "assign_task",
      "syncJobs",
    ]),
    showSelectedJobDetails() {
      $("#job_details_modal").modal("show");
    },
    loadTasks() {
      const loader = this.$loading.show();
      const filtered_tasks = [];
      this.$store
        .dispatch("load_selected_job_tasks", this.selected_job)
        .then((res) => {
          const filtered_tasks = res.filter((el) => {
            return el.Time01 != 0;
          });
          this.tasks = filtered_tasks;

          let selected_job_details = this.jobs.filter((el) => {
            return el.id == this.selected_job;
          });
          this.due_date = selected_job_details[0].due_date;

          this.selected_job_details = selected_job_details[0];
          this.isJobSelected = true;

          loader.hide();
        })
        .catch((err) => loader.hide());
    },
    showModal() {
      this.openmodal = true;
    },
    closeModal() {
      this.openmodal = false;
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
            type: 1,
            tasks: this.$refs["my-table"].selectedRows,
            task_assigned_employee: this.selected_employee,
            task_assigned_qc_employee: this.selected_employee_qc,
            task_priority: this.selected_priority,
            task_due_date: this.due_date,
          })
            .then((res) => {
              this.$refs["my-table"].selectedRows.forEach((el) => {
                let index = this.tasks.findIndex((a) => {
                  return a.id == el.id;
                });
                this.tasks.splice(index, 1);
              });
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
                  loader.hide();
                  swal("Good job!", `Task assigned successfully`, "success", {
                    timer: 2000,
                  });
                })
                .catch(function (error) {
                  loader.hide();
                  console.error("Error adding document: ", error);
                });
              this.cancelTaskAssigning();
            })
            .catch((err) => {
              swal("Error!", err.response.data.message, "error", {
                timer: 3000,
              });
              loader.hide();
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
      this.due_date = moment().format("YYYY-MM-DD");
      this.most_likely_time = "";
      this.pessimistic_time = "";
      this.optimistic_time = "";
      this.isTaskSelected = false;
      this.isJobSelected = true;
      this.validation.reset();
    },
    // saveSubTask() {
    //   this.add_sub_task({
    //     task_id: this.selected_id,
    //     stn: this.sub_task_name,
    //     ste: this.sub_task_selected_employee,
    //     stdd: this.sub_task_due_date
    //   }).then(res => {
    //     this.subTasks.unshift(res.sub_task);
    //     $("#subTaskAddModal").modal("hide");
    //   });
    // },

    syncData() {
      const loader = this.$loading.show();
      this.syncJobs()
        .then((res_1) => {
          if (res_1.status == 2) {
            this.load_jobs().then((res) => {
              loader.hide();
              swal(`${res_1.message}!`, {
                icon: "success",
              });
              this.jobs = res;
            });
          } else {
            loader.hide();
            swal(`${res_1.message}!`, {
              icon: "success",
            });
            v;
          }
        })
        .catch((err) => {
          loader.hide();
        });
      this.selected_job = "";
      this.selected_employee = "";
      this.selected_employee_qc = "";
      this.selected_priority = 2;
      // this.due_date = moment().format("YYYY-MM-DD");
      this.tasks = [];
      this.validation.reset();
    },
    // showSubTaskAddTextField() {
    //   $("#subTaskAddModal").modal({ backdrop: "static", keyboard: false });
    // }
  },

  created() {
    this.load_users().then((res) => {
      this.users = res;
    });
    this.load_jobs().then((res) => {
      this.jobs = res;
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