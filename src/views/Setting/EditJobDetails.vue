<template>
  <div class="pcoded-content">
    <PageHeader
      title="All Job Details"
      path="/edit-job-details"
      description="Job Details"
    ></PageHeader>

    <div class="d-flex justify-content-end">
      <div class="col-sm-12 col-xl-5 m-b-30 m-r-20">
        <all-job-dropdown @job-select="jobSelect"></all-job-dropdown>
      </div>
    </div>

    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <!-- Task Detail Modal Start -->

            <div
              class="modal fade"
              id="large-Modal5"
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
            <div
              class="modal fade"
              id="job_due_date_change_modal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div
                    class="ml-4 mt-3 d-flex justify-content-between align-items-start"
                  >
                    <div class="d-flex flex-column">
                      <h5 class="modal-title">
                        <i
                          class="fas fa-angle-double-right mr-1"
                          style="font-size: 20px"
                          aria-hidden="true"
                        ></i>
                        Change job due date
                      </h5>
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

                  <div class="modal-body">
                    <div class="form-group">
                      <label class="form-label" for="textAreaExample"
                        >Due Date</label
                      >
                      <v-date-picker
                        v-model="value"
                        :masks="masks"
                        ref="picker"
                      />
                    </div>
                    <div
                      class="form-group"
                      :class="{
                        error: validation.hasError('reason'),
                      }"
                    >
                      <label class="form-label" for="textAreaExample"
                        >Reason *</label
                      >
                      <textarea
                        class="form-control"
                        id="textAreaExample"
                        v-model="reason"
                        rows="4"
                      ></textarea>
                      <div class="message">
                        {{ validation.firstError("reason") }}
                      </div>
                    </div>
                  </div>
                  <div class="m-3">
                    <button
                      type="button"
                      class="btn btn-secondary mr-1 float-right"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary mr-1 float-right"
                      @click="updateJobDueDate"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header">
                <h5>Job Details</h5>
                <button
                  :disabled="!isJobSelected"
                  type="button"
                  class="btn btn-danger btn-sm float-right"
                  @click="showJobDueDateChangeingModal"
                >
                  Change job due date
                </button>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="job_no">Job No</label>
                      <input
                        id="job_no"
                        class="form-control"
                        type="text"
                        disabled
                        :value="job.job_no"
                        placeholder="Job No goes here.."
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="job_no">Customer Name</label>
                      <input
                        id="job_no"
                        class="form-control"
                        type="text"
                        disabled
                        :value="job.customer_name"
                        placeholder="Customer name goes here.."
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="job_no">Customer ID</label>
                      <input
                        id="job_no"
                        class="form-control"
                        type="text"
                        disabled
                        :value="job.customer_id"
                        placeholder="Customer ID goes here.."
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group">
                      <div class="form-group">
                        <label for="">Description</label>
                        <textarea
                          class="form-control"
                          name=""
                          id=""
                          rows="4"
                          :value="job.job_description"
                          disabled
                          placeholder="Job description goes here.."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="d-flex flex-column">
                      <div class="form-group">
                        <label for="job_no">Arrive Date</label>
                        <input
                          id="job_no"
                          class="form-control"
                          type="text"
                          disabled
                          :value="job.created_at | formattedDate6"
                          placeholder="Job No goes here.."
                        />
                      </div>
                      <div class="form-group" style="margin-top: -10px">
                        <label for="job_no">Due Date</label>
                        <input
                          id="job_no"
                          class="form-control"
                          type="text"
                          disabled
                          :value="job.due_date"
                          placeholder="Job No goes here.."
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="job_no">Contact Person</label>
                      <input
                        id="job_no"
                        class="form-control"
                        type="text"
                        disabled
                        :value="job.contact_person"
                        placeholder="Customer name goes here.."
                      />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="job_no">Contact Number</label>
                      <input
                        id="job_no"
                        class="form-control"
                        type="text"
                        disabled
                        :value="job.contact_number"
                        placeholder="Customer ID goes here.."
                      />
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="d-flex align-items-center">
                      <div class="form-group">
                        <label for="job_no">Total Allocated</label>
                        <input
                          id="job_no"
                          class="form-control text-center"
                          type="text"
                          disabled
                          :value="total_allocated_time"
                          placeholder="Total Allocated Time"
                        />
                      </div>
                      <div class="form-group ml-2">
                        <label for="job_no">Total Spent</label>
                        <input
                          id="job_no"
                          class="form-control text-center"
                          type="text"
                          disabled
                          :value="total_spent_time"
                          placeholder="Total Spent Time"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-block">
                <div class="d-flex justify-content-end mb-2">
                  <button
                    class="btn btn-primary"
                    @click="loadReport"
                    :disabled="!checkDataAvailable"
                  >
                    <i class="fas fa-download mr-2"></i>Download
                  </button>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <vue-good-table
                      ref="my-table"
                      :columns="columns"
                      :rows="data"
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
                            @click="loadActivities(props.row)"
                          >
                            view
                          </button>
                        </span>
                        <span
                          v-if="props.column.field == 'task_description'"
                          style="max-width: 50px"
                        >
                          <span style="max-width: 50px"
                            >{{ props.row.task_description.slice(0, 30) }}
                            {{
                              props.row.task_description.length > 30
                                ? "..."
                                : ""
                            }}</span
                          >
                        </span>
                        <span v-else>
                          {{ props.formattedRow[props.column.field] }}
                        </span>
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

    <div class="md-overlay"></div>
  </div>
</template>

<script>
import moment from "moment";
import PageHeader from "@/components/PageHeader";
import { mapActions, mapGetters } from "vuex";
import { Locale } from "v-calendar";
const locale = new Locale();
const mask = "YYYY-MM-DD";

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      new_due_date: "2020-01-01",
      old_due_date: "",
      masks: {
        input: mask,
      },
      job: {
        job_no: "",
        customer_name: "",
        customer_id: "",
        due_date: "",
        contact_person: "",
        contact_number: "",
      },
      reason: "",
      isJobSelected: false,
      columns: [
        {
          label: "No",
          field: "no",
        },
        {
          label: "Task No",
          field: "task_no",
        },
        {
          label: "Description",
          field: "task_description",
          // hidden: true,
        },
        {
          label: "Developer",
          field: "developer",
        },
        {
          label: "QC",
          field: "qc",
        },
        {
          label: "Status",
          field: "section_name",
        },
        {
          label: "Allocated Time",
          field: "allocated_time",
        },
        {
          label: "Spent Time",
          field: "times",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      data: [],
      selected_task: {},
      total_spent_time: "",
      total_allocated_time: "",
      checkDataAvailable: false,
    };
  },
  computed: {
    value: {
      get() {
        return this.new_due_date ? locale.parse(this.new_due_date, mask) : null;
      },
      set(val) {
        this.new_due_date = val ? locale.format(val, mask) : "";
      },
    },
  },
  // watch: {
  //   new_due_date(val) {
  //     console.log('new_due_date is now ', val);
  //   }
  // },
  validators: {
    reason: function (value) {
      return Validator.value(value).required(
        "You need to give a reason to proceed this action"
      );
    },
  },
  methods: {
    showJobDueDateChangeingModal() {
      this.clearInputs();
      $("#job_due_date_change_modal").modal("show");
    },

    updateJobDueDate() {
      this.$validate().then((success) => {
        if (success) {
          if (this.new_due_date === this.old_due_date) {
            swal("This job is already on selected due date", {
              icon: "error",
            });
            return;
          }
          this.$store
            .dispatch("changeJobDueDate", {
              job_id: this.job.id,
              due_date: this.new_due_date,
              reason: this.reason,
            })
            .then((res) => {
              this.job.due_date = this.new_due_date;
              swal("Due date has been updated successfully", {
                icon: "success",
                timer: 2000,
              });
              $("#job_due_date_change_modal").modal("hide");
            })
            .catch((err) => {
              swal(err.response.data.message, {
                icon: "error",
                timer: 3000,
              });
            });
        }
      });
    },

    jobSelect(selected_job) {
      this.data = [];
      let aaa = [];
      this.$store.dispatch("selectedJob", selected_job).then((res) => {
        this.job = res;
        this.new_due_date = res.due_date;
        this.old_due_date = res.due_date;
        this.isJobSelected = true;
      });
      const loader = this.$loading.show();
      this.$store.dispatch("loadJobDetails", selected_job).then((res) => {
        this.total_spent_time = this.setSpentTime(res.total_spent_time);
        this.total_allocated_time = this.estimatedTime(
          res.global_allocated_time
        );
        res.tasks.forEach((el, index) => {
          aaa.push({
            no: ++index,
            task_id: el.id,
            allocated_time: this.estimatedTime(el.Time02),
            task_no: el.task_no,
            section_name: el.current_status,
            task_description: el.task_description,
            developer: el.users.length > 0 ? el.users[0].name : "N/A",
            qc: el.users.length > 1 ? el.users.slice(-1)[0].name : "N/A",
            // created_at: moment(el.created_at).format("MM/DD h:mm A"),
            // updated_at: moment(el.updated_at).format("MM/DD h:mm A"),
            times: this.setSpentTime(el.total_duration),
          });
        });
        this.data = aaa;
        this.checkDataAvailable = true;
        loader.hide();
      });
    },

    estimatedTime(unit) {
      unit = ((unit * 100) / 25) * 15;

      return (
        String(Math.floor(unit / 60)).padStart(2, "0") +
        " hrs " +
        String(unit % 60).padStart(2, "0") +
        " min"
      );
    },

    setSpentTime(spent) {
      if (!spent) return "N/A";
      let days = parseInt(spent.days) * 24;
      let hours = parseInt(spent.hours);
      let minutes = parseInt(spent.minutes);

      if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = Math.floor(minutes % 60);
      }

      let spent_final;
      spent_final = `${hours + days} hrs ${minutes} mins`;

      return spent_final;
    },

    loadActivities(data) {
      const loader = this.$loading.show();
      this.selected_task = {};
      this.$store
        .dispatch("single_task", data.task_id)
        .then((res) => {
          this.selected_task = res.details;
          this.selected_task.activities = res.activitiesWithComments;
          this.selected_task.task_title =
            res.activitiesWithComments.length != 0
              ? res.activitiesWithComments[0].task_title
              : task.task_name;
          loader.hide();
          $("#large-Modal5").modal("show");
        })
        .catch((err) => loader.hide());
    },

    loadReport() {
      const loader = this.$loading.show();
      setTimeout(() => {
        let dataArray = this.data.map((el, index) => {
          return [
            el.task_no,
            el.task_description,
            el.developer != "N/A" ? el.developer.split(" ")[0] : "N/A",
            el.qc != "N/A" ? el.qc.split(" ")[0] : "N/A",
            el.section_name,
            el.allocated_time,
            el.times,
          ];
        });
        const doc = new jsPDF();

        doc.setFontSize(15);
        doc.text(80, 10, "Job Report - (" + this.job.job_no + ")");
        doc.setFontSize(10);
        doc.text(165, 5, " " + moment().format("DD/MM/YYYY h:mm:ss a"));
        doc.setFontSize(11);
        doc.text(15, 25, "Customer       : " + this.job.customer_name);
        doc.text(
          15,
          30,
          "Arrive Date     : " +
            moment(this.job.created_at).format("DD-MM-YYYY")
        );
        doc.text(15, 35, "Authorized By : N/A");
        doc.text(15, 40, "No of Tasks    : " + ++this.data.length);
        doc.text(
          15,
          45,
          "Description     : " +
            this.job.job_description
              .split(/((?:\w+ ){8})/g)
              .filter(Boolean)
              .join("\n")
        );

        doc.text(
          140,
          25,
          "Due Date           : " +
            moment(this.job.due_date).format("DD-MM-YYYY")
        );
        doc.text(140, 30, "Allocated Time   : " + this.total_allocated_time);
        doc.text(140, 35, "Spent Time        : " + this.total_spent_time);
        doc.autoTable({
          theme: "grid",
          margin: { top: 60 },
          didDrawPage: function (data) {
            // Reseting top margin. The change will be reflected only after print the first page.
            data.settings.margin.top = 10;
          },
          columnStyles: {
            0: { columnWidth: 13 },
            2: { columnWidth: 22 },
            3: { columnWidth: 22 },
            5: { columnWidth: 25 },
            6: { columnWidth: 25 },
          },
          head: [
            [
              "TNo",
              "Description",
              "Developer",
              "QC",
              "Status",
              "Alloc Time",
              "Spent Time",
            ],
          ],
          body: dataArray,
        });
        doc.setProperties({
          title: "Job Details Report",
        });
        window.open(doc.output("bloburl"));
      }, 500);
      loader.hide();
    },

    clearInputs() {
      this.reason = "";
      this.validation.reset();
    },
  },
};
</script>

<style scoped>
.message {
  color: red;
  font-size: 14px;
  margin-left: 5px;
  margin-top: 5px;
}
</style>
