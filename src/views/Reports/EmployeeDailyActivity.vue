<template>
  <div class="pcoded-content">
    <PageHeader
      title="Jobs"
      path="/jobs"
      description="All Pending Jobs"
    ></PageHeader>
    <!-- Filters Start -->
    <div class="ml-2 row">
      <div
        class="col-md-4"
        v-show="
          isAdmin || isSuperAdmin || isDirector || isTeamLeader || isCoordinator
        "
      >
        <div class="form-group">
          <label class="ml-3">Department</label>
          <div class="col-sm-12">
            <v-select
              label="full_name"
              v-model="selected_division"
              :options="divisions"
              :reduce="(divisions) => divisions.id"
              placeholder="Select a department.."
              @input="loadUsers"
            ></v-select>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="ml-3">Employee</label>
          <div class="col-sm-12">
            <v-select
              label="name"
              v-model="selected_employee"
              :options="users"
              :reduce="(users) => users.id"
              placeholder="Select an employee.."
            ></v-select>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="col-sm-5">Date</label>
          <div class="col-sm-12">
            <v-date-picker
              mode="range"
              v-model="range"
              :popover="{ visibility: 'click' }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end align-items-center mr-4">
      <div class="mb-2">
        <button class="btn btn-info btn-sm" @click="loadReport">
          <i class="fas fa-list"></i>Load Report
        </button>
      </div>
      <div class="mb-2 ml-2">
        <button class="btn btn-dark btn-sm" @click="loadReport2">
          <i class="fas fa-download"></i> Download Progress Report
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex justify-content-end"></div>
      </div>
    </div>
    <!-- Filters End -->
    <!-- cards start -->
    <div class="row ml-2 mr-2">
      <div class="col-xl-3 col-md-6">
        <div class="card card-red st-cir-card text-white">
          <div class="card-block">
            <div class="row align-items-center">
              <div class="col text-center">
                <h3 class="f-w-700 m-b-5">{{ ongoingSpent }}</h3>
                <h6 class="m-b-0">Worked</h6>
              </div>
            </div>
            <span class="st-bt-lbl" style="opacity: 0.1">Worked</span>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="card card-blue st-cir-card text-white">
          <div class="card-block">
            <div class="row align-items-center">
              <div class="col text-center">
                <h3 class="f-w-700 m-b-5">{{ meetingSpent }}</h3>
                <h6 class="m-b-0">Meetings</h6>
              </div>
            </div>
            <span class="st-bt-lbl" style="opacity: 0.1">Meetings</span>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="card card-green st-cir-card text-white">
          <div class="card-block">
            <div class="row align-items-center">
              <div class="col text-center">
                <h3 class="f-w-700 m-b-5">{{ lunchSpent }}</h3>
                <h6 class="m-b-0">Lunch</h6>
              </div>
            </div>
            <span class="st-bt-lbl" style="opacity: 0.1">Lunch</span>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="card card-yellow st-cir-card text-white">
          <div class="card-block">
            <div class="row align-items-center">
              <div class="col text-center">
                <h3 class="f-w-700 m-b-5">{{ holdSpent }}</h3>
                <h6 class="m-b-0">Others</h6>
              </div>
            </div>
            <span class="st-bt-lbl" style="opacity: 0.1">Others</span>
          </div>
        </div>
      </div>
    </div>
    <!-- cards end -->
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
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div
                    class="card-header d-flex justify-content-between align-items-center"
                  >
                    <h5>Employee Daily Activity</h5>
                    <button
                      class="btn"
                      @click="uploadWorksheet"
                      v-show="canUploadToWorksheet"
                    >
                      Upload To Worksheet
                    </button>
                    <div v-show="isReportLoaded">
                      <download-excel
                        class="btn excel text-white btn-sm mr-1"
                        :data="data"
                        :fields="json_fields"
                        worksheet="My Worksheet"
                        :name="Date.now() + '.xls'"
                      >
                        <i class="fas fa-file-excel"></i> Download Excel
                      </download-excel>
                      <button
                        class="btn pdf text-white btn-sm"
                        @click="loadReport3"
                      >
                        <i class="fas fa-file-pdf"></i> Download Pdf
                      </button>
                    </div>
                  </div>
                  <div class="card-block">
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
                              <!-- <span style="max-width: 50px">{{
                                props.row.task_description
                              }}</span> -->
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
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "vue-materialize-datatable";
import PageHeader from "@/components/PageHeader";
import moment from "moment";
import { mapActions } from "vuex";
export default {
  name: "Jobs",
  components: {
    PageHeader,
    datatable: DataTable,
  },
  computed: {
    isAdmin() {
      return this.$store.getters.user && this.$store.getters.isAdmin;
    },
    isSuperAdmin() {
      return this.$store.getters.user && this.$store.getters.isSuperAdmin;
    },
    isDirector() {
      return this.$store.getters.user && this.$store.getters.isDirector;
    },
    isTeamLeader() {
      return this.$store.getters.user && this.$store.getters.isTeamLeader;
    },
    isCoordinator() {
      return this.$store.getters.user && this.$store.getters.isCoordinator;
    },
    divisions() {
      return this.$store.getters.divisions;
    },
  },
  data() {
    return {
      json_fields: {
        "Job No": "job_no",
        Customer: "customer_name",
        "Task No": "task_no",
        "Task Description": "task_description",
        "Started At": "created_at",
        "Last Updated": "updated_at",
        "Spent Time": "times",
        // "Status": {
        //   field: "phone.landline",
        //   callback: (value) => {
        //     return `Landline Phone - ${value}`;
        //   },
        // },
      },
      tableRows1: [],
      tableColumns1: [
        {
          label: "Employee Name",
          field: "employee_name",
          numeric: false,
          html: false,
        },
        {
          label: "Worked",
          field: "Worked",
          numeric: false,
          html: false,
        },
        {
          label: "Meeting",
          field: "Meeting",
          numeric: false,
          html: false,
        },
        {
          label: "Lunch",
          field: "Lunch",
          numeric: false,
          html: false,
        },
        {
          label: "Other",
          field: "Other",
          numeric: false,
          html: false,
        },
      ],
      columns: [
        {
          label: "Job No",
          field: "job_no",
        },
        {
          label: "User Id",
          field: "user_id",
          hidden: true,
        },
        {
          label: "Task Id",
          field: "task_id",
          hidden: true,
        },
        {
          label: "Customer",
          field: "customer_name",
        },
        {
          label: "Task No",
          field: "task_no",
        },
        // {
        //   label: "Status",
        //   field: "section_name",
        // },
        {
          label: "Task Description",
          field: "task_description",
        },
        {
          label: "Started At",
          field: "created_at",
        },
        {
          label: "Last Updated",
          field: "updated_at",
        },
        {
          label: "Spent Time",
          field: "times",
        },
        // {
        //   label: "Comment",
        //   field: "comment",
        // },
        {
          label: "Action",
          field: "action",
        },
      ],
      data: [],
      search: "",
      selected_task: {},
      selected_job: {},

      isJobSelect: false,
      users: [],
      selected_employee: "",
      selected_division: 0,
      range: {
        start: new Date(), // Jan 16th, 2018
        end: new Date(), // Jan 19th, 2018
      },
      ongoingSpent: "0 hrs 0 mins",
      meetingSpent: "0 hrs 0 mins",
      lunchSpent: "0 hrs 0 mins",
      holdSpent: "0 hrs 0 mins",
      canUploadToWorksheet: false,
      isReportLoaded: false,
    };
  },

  // watch: {
  //   data(newVal, oldVal) {
  //     this.$refs.historyTable.refresh();
  //   }
  // },

  created() {
    const loader = this.$loading.show();
    const data = [];
    this.$store
      .dispatch("load_users_division", this.selected_division)
      .then((res) => {
        this.users = res;
        loader.hide();
      })
      .catch((err) => loader.hide());
  },

  mounted() {},

  methods: {
    ...mapActions(["single_task", "single_task_today"]),

    uploadWorksheet() {
      const loader = this.$loading.show();
      this.$store
        .dispatch("uploadToWorksheet", {
          data: this.data,
          post_date: moment(this.range.start).format("DD/MM/YYYY"),
        })
        .then((res) => {
          this.canUploadToWorksheet = false;
          loader.hide();
        })
        .catch((err) => loader.hide());
    },

    loadUsers() {
      this.selected_employee = "";
      const loader = this.$loading.show();
      const data = [];
      this.$store
        .dispatch("load_users_division", this.selected_division)
        .then((res) => {
          this.users = res;
          loader.hide();
        })
        .catch((err) => loader.hide());
    },

    loadReport() {
      this.ongoingSpent = "0 hrs 0 mins";
      this.meetingSpent = "0 hrs 0 mins";
      this.lunchSpent = "0 hrs 0 mins";
      this.holdSpent = "0 hrs 0 mins";
      const loader = this.$loading.show();
      let aaa = [];
      this.$store
        .dispatch("employeeDailyActivityReport", {
          user_id: this.selected_employee,
          range: this.range,
        })
        .then((res) => {
          res.report.forEach((el) => {
            aaa.push({
              job_no: el.job_no,
              task_id: el.task_id,
              user_id: el.user_id,
              customer_name: el.customer_name,
              task_no: el.task_no,
              section_name: el.section_name,
              task_description: el.task_description,
              created_at: moment(el.created_at).format("MM/DD h:mm A"),
              updated_at: moment(el.updated_at).format("MM/DD h:mm A"),
              time_in: moment(el.created_at).format("h:mm A"),
              time_out: moment(el.updated_at).format("h:mm A"),
              times: this.setSpentTime(null, el.total_duration),
              division: el.division,
              employee_code: el.emp_code,
              employee_name: el.name,
              customer_id: el.customer_id,
              customer_name: el.customer_name,
              system: el.system,
            });
          });
          this.data = aaa;

          res.all_spents.forEach((el) => {
            this.setSpentTime(el.type, el.spent);
          });
          if (
            moment(this.range.start).isSame(moment(this.range.end), "date") &&
            this.$store.getters.getUser.id == this.selected_employee
          ) {
            this.$store
              .dispatch("isEmployeeDayEnd", { date: moment(this.range.start) })
              .then((res) => {
                if (res) {
                  this.canUploadToWorksheet = true;
                } else {
                  this.canUploadToWorksheet = false;
                }
              });
          } else {
            this.canUploadToWorksheet = false;
          }
          loader.hide();
          this.isReportLoaded = true;
        })
        .catch((err) => {
          loader.hide();
          this.isReportLoaded = false;
          this.data = [];
        });
    },
    loadReport2() {
      const loader = this.$loading.show();
      this.$store
        .dispatch("allEmployeeDailyActivityReport", {
          range: this.range,
          division: this.selected_division,
        })
        .then((res) => {
          this.tableRows1 = res;
          setTimeout(() => {
            let dataArray = this.tableRows1.map((el, index) => {
              return [
                // ++index,
                el.employee_name,
                el.Worked,
                el.Meeting,
                el.Lunch,
                el.Other,
              ];
            });
            const doc = new jsPDF();

            doc.setFontSize(15);
            doc.text(75, 13, "All Employee Progress Report");
            doc.setFontSize(10);
            doc.text(165, 5, " " + moment().format("DD/MM/YYYY h:mm:ss a"));
            doc.setFontSize(11);
            doc.text(14, 30, " Selected Date - " + this.loadDateRange());
            doc.text(14, 36, " Department - " + this.getSelectedDivision());
            doc.autoTable({
              theme: "grid",
              margin: { top: 40 },
              head: [["Employee Name", "Worked", "Meeting", "Lunch", "Other"]],
              body: dataArray,
            });
            doc.setProperties({
              title: "All Employee Progress Report",
            });
            window.open(doc.output("bloburl"));
            // doc.output('dataurlnewwindow');
            // doc.save(
            //   `All Employee Progress Report - ${moment().format(
            //     "DD-MM-YYYY h:mm:ss a"
            //   )}`
            // );
          }, 0);
          loader.hide();
        })
        .catch((err) => {
          loader.hide();
          this.tableRows1 = [];
        });
    },
    loadReport3() {
      let dataArray = this.data.map((el) => {
        return [
          el.job_no,
          el.customer_name,
          el.task_no,
          el.task_description,
          el.created_at,
          el.updated_at,
          el.times,
        ];
      });
      const doc = new jsPDF();

      doc.setFontSize(15);
      doc.text(55, 10, this.reportTitle());
      doc.setFontSize(13);
      doc.text(140, 25, " " + moment().format("DD/MM/YYYY h:mm:ss a"));
      doc.text(14, 25, "Date - " + this.loadDateRange());
      doc.setFontSize(10);
      doc.text(14, 35, "Worked - " + this.ongoingSpent);
      doc.text(60, 35, "Meeting - " + this.meetingSpent);
      doc.text(105, 35, "Lunch - " + this.lunchSpent);
      doc.text(150, 35, "Others - " + this.holdSpent);
      doc.autoTable({
        theme: "grid",
        margin: { top: 40 },
        headStyles: { fillColor: "red" },
        head: [
          [
            "Job No",
            "Customer",
            "Task No",
            "Task Description",
            "Started At",
            "Last Updated",
            "Spent Time",
          ],
        ],
        body: dataArray,
      });
      doc.setProperties({
        title: "Employee Activity Report",
      });
      window.open(doc.output("bloburl"));
      // doc.output('dataurlnewwindow');
      // doc.save(
      //   `All Employee Progress Report - ${moment().format(
      //     "DD-MM-YYYY h:mm:ss a"
      //   )}`
      // );
    },

    reportTitle() {
      return `Employee Activity Report - ${this.data[0].employee_name}`;
    },

    loadDateRange() {
      // moment().format("DD-MM-YYYY h:mm:ss a")
      if (moment(this.range.start).isSame(moment(this.range.end))) {
        return (
          moment(this.range.start).format("DD/MM/YYYY") +
          ` (${moment(this.range.start).format("dddd")})`
        );
      } else {
        return (
          moment(this.range.start).format("DD/MM/YYYY") +
          " to " +
          moment(this.range.end).format("DD/MM/YYYY")
        );
      }
    },

    getSelectedDivision() {
      let [division] = this.divisions.filter(
        (el) => el.id == this.selected_division
      );
      if (division == undefined) return "All";
      return division.full_name;
    },

    setSpentTime(type, spent) {
      let days = parseInt(spent.days) * 24;
      let hours = parseInt(spent.hours);
      let minutes = parseInt(spent.minutes);

      if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = Math.floor(minutes % 60);
      }

      let spent_final;
      spent_final = `${hours + days} hrs ${minutes} mins`;

      if (!type) return spent_final;

      switch (type) {
        case 1:
          this.ongoingSpent = spent_final;
          break;
        case 6:
          this.meetingSpent = spent_final;
          break;
        case 7:
          this.lunchSpent = spent_final;
          break;
        case 8:
          this.holdSpent = spent_final;
          break;
      }
    },

    checkIfDueDateHasExceeded(
      dueDate,
      estimatedUnits,
      spentTime,
      status,
      finished_at
    ) {
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
            return "bg-success text-white";
          }
          return "text-inverse";
        }
      }
    },

    taskRowClass(dataItem, index) {
      return this.checkIfDueDateHasExceeded(
        dataItem.duedate,
        dataItem.mo_time,
        dataItem.spent,
        dataItem.status,
        dataItem.finished_at
      );
    },

    jobRowClass(dataItem, index) {
      if (dataItem.ongoing) {
        return "bg-success";
      }
      // return "bg-primary";
    },

    loadActivities(data) {
      const loader = this.$loading.show();
      this.selected_task = {};
      console.log("data", data);
      this.single_task(data.task_id)
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
.tableWidth {
  max-width: 10px;
}
.excel {
  background-color: #1d6f42;
}
.pdf {
  background-color: #ff0000;
}
</style>
