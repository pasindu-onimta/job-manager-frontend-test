<template>
  <div id="app">
    <router-view />
    <!-- Task Detail Modal Start -->

    <div class="modal fade" id="subTaskAddModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="mb-5">
            <div
              class="ml-4 mt-4 d-flex justify-content-between align-items-start"
            >
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="modal-title">
                  <i class="far fa-clipboard mr-2"></i>
                  Add New Custom Job
                </h4>
                <!-- <h5 class="ml-2">(QJ-0001)</h5> -->
              </div>
              <button
                type="button"
                class="close mr-3"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" style="font-size: 27px">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div
                class="form-group"
                :class="{ error: validation.hasError('selected_job_type') }"
              >
                <label class="ml-3">Job Type</label>
                <div class="col-sm-12">
                  <v-select
                    label="name"
                    :options="jobtypes"
                    v-model="selected_job_type"
                    :reduce="(jobtypes) => jobtypes.value"
                    placeholder="Select job type.."
                  ></v-select>
                  <div class="message">
                    {{ validation.firstError("selected_job_type") }}
                  </div>
                </div>
              </div>
              <div
                class="form-group"
                v-if="isQuickJob"
                :class="{ error: validation.hasError('selected_employee') }"
              >
                <label class="ml-3">Assign By</label>
                <div class="col-sm-12">
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
                class="form-group"
                v-if="isQuickJob"
                :class="{ error: validation.hasError('selected_customer') }"
              >
                <label class="ml-3">Customer</label>
                <div class="col-sm-12">
                  <v-select
                    label="customer_name"
                    v-model="selected_customer"
                    :options="customers"
                    :reduce="(customers) => customers.id"
                    placeholder="Select a customer.."
                  ></v-select>
                  <div class="message">
                    {{ validation.firstError("selected_customer") }}
                  </div>
                </div>
              </div>
              <div
                class="form-group mt-4"
                :class="{ error: validation.hasError('job_description') }"
              >
                <label class="ml-3">Description</label>
                <div class="col-sm-12">
                  <textarea
                    rows="5"
                    v-model="job_description"
                    cols="5"
                    class="form-control"
                    placeholder="Default textarea"
                    spellcheck="false"
                  ></textarea>
                  <div class="message">
                    {{ validation.firstError("job_description") }}
                  </div>
                </div>
              </div>

              <div
                class="col-md-4 form-group text-right d-flex align-items-center"
                v-if="isQuickJob"
              >
                <Checkbox v-model="isChargeable">Chargeable</Checkbox>
                <Checkbox v-model="isQc">QC</Checkbox>
              </div>

              <div class="float-right mt-2">
                <button
                  class="btn btn-success btn-md mr-1"
                  @click="createNewJob"
                >
                  Save
                </button>
                <button class="btn btn-default btn-md" @click="clearForm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="leaveAddModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="mb-5">
            <div
              class="ml-4 mt-4 d-flex justify-content-between align-items-start"
            >
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="modal-title">
                  <i class="far fa-clipboard mr-2"></i>
                  Employee Leave Manager
                </h4>
                <!-- <h5 class="ml-2">(QJ-0001)</h5> -->
              </div>
              <button
                type="button"
                class="close mr-3"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" style="font-size: 27px">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div
                class="form-group"
                :class="{ error: validation.hasError('selected_employee') }"
              >
                <label class="ml-3">Employee</label>
                <div class="col-sm-12">
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
                class="form-group"
                :class="{ error: validation.hasError('selected_employee') }"
              >
                <label class="ml-3">Date</label>
                <div class="col-sm-12">
                  <v-date-picker
                    style="z-index: 200"
                    v-model="value"
                    :popover="{ visibility: 'click' }"
                  />
                  <div class="message">
                    {{ validation.firstError("selected_employee") }}
                  </div>
                </div>
              </div>

              <div class="d-flex">
                <div
                  class="form-group"
                  :class="{ error: validation.hasError('selected_employee') }"
                >
                  <label class="ml-3">Start Time</label>
                  <div class="col-sm-12">
                    <datetime
                      v-model="start_time"
                      type="time"
                      :use12Hour="true"
                      :auto="true"
                      title="Start Time"
                      format="t"
                      input-class="form-control"
                      @input="showTime"
                    ></datetime>
                    <div class="message">
                      {{ validation.firstError("selected_employee") }}
                    </div>
                  </div>
                </div>
                <div
                  class="form-group"
                  :class="{ error: validation.hasError('selected_employee') }"
                >
                  <label class="ml-3">End Time</label>
                  <div class="col-sm-12">
                    <datetime
                      v-model="end_time"
                      type="time"
                      :use12-hour="true"
                      :auto="true"
                      title="Start Time"
                      format="t"
                      input-class="form-control"
                    ></datetime>
                    <div class="message">
                      {{ validation.firstError("selected_employee") }}
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="form-group mt-4"
                :class="{ error: validation.hasError('remark') }"
              >
                <label class="ml-3">Remark</label>
                <div class="col-sm-12">
                  <textarea
                    rows="5"
                    v-model="remark"
                    cols="5"
                    class="form-control"
                    placeholder="Remark"
                    spellcheck="false"
                  ></textarea>
                  <div class="message">
                    {{ validation.firstError("remark") }}
                  </div>
                </div>
              </div>

              <div class="float-right mt-2">
                <button
                  class="btn btn-success btn-md mr-1"
                  @click="createNewJob"
                >
                  Save
                </button>
                <button class="btn btn-default btn-md" @click="clearForm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Task Detail Modal End -->
  </div>
</template>

<script>
var moment = require("moment");
import db from "@/firebase";
import Checkbox from "vue-material-checkbox";
import { Locale } from "v-calendar";
const locale = new Locale();
const mask = "YYYY-MM-DD";
export default {
  components: {
    Checkbox,
  },
  computed: {
    value: {
      get() {
        return this.leave_date ? locale.parse(this.leave_date, mask) : null;
      },
      set(val) {
        this.leave_date = val ? locale.format(val, mask) : "";
      },
    },
  },
  data() {
    return {
      leave_date: moment().format("YYYY-MM-DD"),
      sub_task_name: "",
      isQuickJob: false,
      enabled: false,
      remark: "",
      start_time: moment().format("YYYY-MM-DD"),
      end_time: moment().format("YYYY-MM-DD"),
      jobtypes: [
        {
          name: "Quick Job",
          value: 1,
        },
        {
          name: "Tasking",
          value: 2,
        },
        {
          name: "Internal Office Work",
          value: 3,
        },
      ],
      users: [],
      customers: [],
      selected_job_type: "",
      selected_employee: "",
      selected_customer: "",
      job_description: "",
      generated_id: "",
      isChargeable: false,
      isQc: false,
    };
  },
  watch: {
    selected_job_type: function (val, old) {
      this.loadEmployees(val);
    },
  },
  created() {
    // this.$options.sockets.onmessage = data => console.log(data);
    if (this.$store.getters.isAuthenticated) {
      this.$store
        .dispatch("attempt", localStorage.getItem("token"))
        .then((res) => {
          // firebase
          db.collection("tasks").onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                if (res.id == change.doc.data().user_id) {
                  this.$store.dispatch("notifications").then((res) => {
                    // console.log(res);
                  });
                }
              } else if (change.type === "modified") {
                // if (res.id == change.doc.data().user_id) {
                //   this.$store.dispatch("notifications").then(res => {
                // console.log(res);
                //   });
                // }
                this.$store.dispatch("notifications").then((res) => {
                  // console.log(res);
                });
              }
            });
          });
          this.$store.dispatch("load_users").then((res) => {
            this.users = res;
          });
        })
        .catch((err) => {
          this.$router.push({
            name: "login",
          });
        });
    }
  },
  validators: {
    selected_job_type: function (value) {
      return Validator.value(value).required("Please select a job type");
    },
    selected_customer: function (value) {
      if (this.isQuickJob) {
        return Validator.value(value).required("Please select a customer");
      }
    },
    selected_employee: function (value) {
      if (this.isQuickJob) {
        return Validator.value(value).required("Please select an employee");
      }
    },
    job_description: function (value) {
      return Validator.value(value).required("This field is required");
    },
  },
  methods: {
    loadEmployees(val) {
      // this.$store.dispatch("generateId", val).then(res => {
      //     this.generated_id = res;
      //   })
      if (val == 1) {
        this.isQuickJob = true;
        this.$store.dispatch("load_users").then((res) => {
          this.users = res;
        });
        this.$store.dispatch("load_customers").then((res) => {
          this.customers = res;
        });
      } else {
        this.isQuickJob = false;
      }
    },

    createNewJob() {
      let self = this;
      this.$validate().then((success) => {
        if (success) {
          const loader = this.$loading.show();
          this.$store
            .dispatch("assign_new_quick_job", {
              job_assign_by: this.selected_employee,
              selected_customer: this.selected_customer,
              job_description: this.job_description,
              job_type: this.selected_job_type,
              chargeable: this.isChargeable,
              qc: this.isQc,
            })
            .then((res) => {
              loader.hide();
              swal({
                title: "Quick Job Addedd Successfully!",
                text: "Do you want to make this job as ongoing?",
                icon: "success",
                buttons: ["No", "Yes"],
                dangerMode: false,
              }).then((willDelete) => {
                if (willDelete) {
                  this.$store
                    .dispatch("add_quick_job_ongoing", {
                      task_user_id: res.task_user_id,
                      job_user_id: res.new_job_user,
                    })
                    .then((res) => {
                      swal("Success! Ongoing task changed!", {
                        icon: "success",
                      });
                      this.$router.push({ name: "Jobs" });
                    });
                } else {
                  swal("Your can add this job to ongoing anytime you like :)");
                }
              });
              this.clearForm();
            });
        }
      });

      this.editMode = false;
    },

    showTime() {
      console.log("start time - ", moment(this.start_time).format("HH:mm:ss"));
    },

    clearForm() {
      $("#subTaskAddModal").modal("hide");
      this.selected_employee = "";
      this.selected_customer = "";
      this.job_description = "";
      this.selected_job_type = "";
      this.isQuickJob = false;
      this.validation.reset();
    },
  },
};
</script>

<style scoped>
.message {
  color: red;
  font-size: 12px;
  margin-left: 5px;
}
</style>
