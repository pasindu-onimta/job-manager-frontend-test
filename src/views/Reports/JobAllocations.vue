<template>
  <div class="pcoded-content">
    <PageHeader title="Jobs" path="/jobs" description="New Jobs"></PageHeader>

    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="row ml-2">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-sm-12">Date Range</label>
                  <div class="col-sm-10">
                    <v-date-picker
                      mode="range"
                      v-model="range"
                      :popover="{ visibility: 'click' }"
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label class="ml-3">Department</label>
                  <div class="col-sm-12">
                    <v-select
                      label="department"
                      v-model="selected_department"
                      :options="departments"
                      :reduce="(departments) => departments.id"
                      placeholder="Select a department.."
                    ></v-select>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label class="ml-3">Filter 1</label>
                  <div class="col-sm-12">
                    <v-select
                      label="option"
                      v-model="selected_filter_1"
                      :options="filter_1"
                      :reduce="(filter_1) => filter_1.id"
                      placeholder="Select an option.."
                      @input="changeTableHeader"
                    ></v-select>
                  </div>
                </div>
              </div>

              <!-- <div class="col-md-4">
                    <div class="form-group">
                      <label class="ml-3">Filter 2</label>
                      <div class="col-sm-12">
                        <v-select
                          label="option"
                          v-model="selected_filter_2"
                          :options="filter_2"
                          :reduce="(filter_2) => filter_2.id"
                          placeholder="Select an option.."
                        ></v-select>
                      </div>
                    </div>
                  </div> -->
              <div class="mb-2 col-md-4 ml-3" style="margin-left: 0px">
                <button class="btn btn-primary btn-sm" @click="loadReport">
                  Load Report
                </button>
                <button class="btn btn-warning ml-2 btn-sm" @click="loadReport">
                  Clear
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div
                    class="card-header d-flex justify-content-between align-items-center"
                  >
                    <h5>Job Details</h5>
                    <button
                      class="btn btn-dark btn-sm"
                      @click="printReport"
                      :disabled="data.length == 0"
                    >
                      <i class="fas fa-download"></i> Download Report
                    </button>
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
                          @on-row-click="onRowClick"
                        >
                          <template slot="table-row" slot-scope="props">
                            <span
                              v-if="props.column.field == 'job_description'"
                            >
                              <div
                                style="
                                  width: 250px;
                                  white-space: nowrap;
                                  overflow: hidden !important;
                                  text-overflow: ellipsis;
                                "
                              >
                                {{ props.row.job_description_original }}
                              </div>
                            </span>
                          </template>

                          <!-- <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'action'">
                              <button
                                class="btn btn-info btn-sm"
                                style="margin-top: -15px; margin-bottom: -15px;"
                                @click="loadActivities(props.row)"
                              >view</button>
                            </span>
                            <span v-else>{{props.formattedRow[props.column.field]}}</span>
                          </template>-->
                        </vue-good-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12" id="task_details">
                <div class="card">
                  <div class="card-header">
                    <h5>Task Details</h5>
                  </div>
                  <div class="card-block">
                    <div class="row">
                      <div class="col-md-12">
                        <vue-good-table
                          ref="my-table"
                          :columns="tasks_columns"
                          :rows="tasks_data"
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
                            <span v-if="props.column.field == 'task_name'">
                              <div
                                style="
                                  width: 400px;
                                  white-space: nowrap;
                                  overflow: hidden !important;
                                  text-overflow: ellipsis;
                                "
                              >
                                {{ props.row.task_name_original }}
                              </div>
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
import PageHeader from "@/components/PageHeader";
import moment from "moment";
import { mapActions } from "vuex";
export default {
  name: "Jobs",
  components: {
    PageHeader,
  },
  data() {
    return {
      columns: [
        {
          label: "Job ID",
          field: "job_id",
          hidden: true,
        },
        {
          label: "Job No",
          field: "job_no",
        },
        {
          label: "Job Description",
          field: "job_description_original",
          hidden: true,
        },
        {
          label: "Job Description",
          field: "job_description",
          width: "250px",
          //   hidden: true
        },
        {
          label: "Customer Name",
          field: "customer_name",
        },
        {
          label: "Customer ID",
          field: "customer_id",
        },
        {
          label: "System",
          field: "system",
        },
        {
          label: "Employee Name",
          field: "name",
        },
        {
          label: "Due Date",
          field: "due_date",
        },
        {
          label: "NOT",
          field: "no_of_tasks",
        },
      ],
      tasks_columns: [
        {
          label: "Task No",
          field: "task_no",
        },
        {
          label: "Task Name",
          field: "task_name_original",
          hidden: true,
        },
        {
          label: "Task Description",
          field: "task_name",
          width: "250px",
          //   hidden: true
        },
        {
          label: "OP",
          field: "time_01",
        },
        {
          label: "MO",
          field: "time_02",
        },
        {
          label: "PE",
          field: "time_03",
        },
      ],
      data: [],
      tasks_data: [],
      search: "",
      isJobSelect: false,
      range: {
        start: new Date(), // Jan 16th, 2018
        end: new Date(), // Jan 19th, 2018
      },
      departments: [
        { id: 0, department: "All" },
        { id: 1, department: "Software" },
        { id: 2, department: "Technical" },
        { id: 3, department: "Customer Support" },
      ],
      filter_1: [
        { id: 1, option: "All" },
        { id: 2, option: "Assigned" },
        { id: 3, option: "Not-Assigned" },
      ],
      filter_2: [
        { id: 0, option: "All" },
        { id: 1, option: "Tasked" },
        { id: 2, option: "Not-Tasked" },
      ],
      selected_employee: 1,
      selected_department: 0,
      selected_filter_1: 1,
      selected_filter_2: 0,
    };
  },

  // watch: {
  //   data(newVal, oldVal) {
  //     this.$refs.historyTable.refresh();
  //   }
  // },

  created() {
    // const loader = this.$loading.show();
    // loader.hide();
  },

  mounted() {},

  methods: {
    ...mapActions(["single_task", "save_comments", "single_task_today"]),

    loadReport() {
      const loader = this.$loading.show();
      let aaa = [];
      this.$store
        .dispatch("jobAllocationReport", {
          range: this.range,
          department: this.selected_department,
          filter_1: this.selected_filter_1,
          filter_2: this.selected_filter_2,
        })
        .then((res) => {
          res.forEach((el) => {
            aaa.push({
              job_id: el.id,
              job_no: el.job_no,
              job_description_original: el.job_description,
              customer_name: el.customer_name,
              customer_id: el.customer_id,
              system: el.system,
              name: el.name,
              due_date: el.due_date,
              no_of_tasks: el.task_count,
            });
          });
          this.data = aaa;
          loader.hide();
        })
        .catch((err) => {
          loader.hide();
          this.data = [];
        });
    },

    printReport() {
      setTimeout(() => {
        let dataArray;
        if (this.selected_filter_1 != 3) {
          dataArray = this.data.map((el) => {
            return [
              el.job_no,
              {
                content: el.job_description_original,
                styles: { cellWidth: 80 },
              },
              el.customer_name
                ? {
                    content: el.customer_name,
                    styles: { cellWidth: 40, halign: "left" },
                  }
                : { content: "N/A", styles: { halign: "center" } },
              el.customer_id
                ? {
                    content: el.customer_id,
                    styles: { cellWidth: 25, halign: "left" },
                  }
                : { content: "N/A", styles: { halign: "center" } },
              el.system
                ? {
                    content: el.system,
                    styles: { cellWidth: 30, halign: "left" },
                  }
                : { content: "N/A", styles: { halign: "center" } },
              el.name
                ? {
                    content: el.name,
                    styles: { cellWidth: 40, halign: "center" },
                  }
                : "",
              el.due_date,
              { content: el.no_of_tasks, styles: { halign: "center" } },
            ];
          });
        } else {
          dataArray = this.data.map((el) => {
            return [
              el.job_no,
              {
                content: el.job_description_original,
                styles: { cellWidth: 80 },
              },
              el.customer_name
                ? {
                    content: el.customer_name,
                    styles: { cellWidth: 40, halign: "left" },
                  }
                : { content: "N/A", styles: { halign: "center" } },
              el.customer_id
                ? {
                    content: el.customer_id,
                    styles: { cellWidth: 25, halign: "left" },
                  }
                : { content: "N/A", styles: { halign: "center" } },
              el.system
                ? {
                    content: el.system,
                    styles: { cellWidth: 30, halign: "left" },
                  }
                : { content: "N/A", styles: { halign: "center" } },
              el.due_date,
              { content: el.no_of_tasks, styles: { halign: "center" } },
            ];
          });
        }

        // const doc = new jsPDF('l', 'mm', [500, 300]);
        const doc = new jsPDF("l");
        doc.setFontSize(15);
        doc.text(15, 15, this.loadDateRange());
        this.loadSubHadings(doc);
        doc.autoTable({
          theme: "grid",
          margin: { top: 40, bottom: 20 },
          didDrawPage: function (data) {
            // Reseting top margin. The change will be reflected only after print the first page.
            data.settings.margin.top = 10;
          },
          headStyles: { fillColor: "orange" },
          bodyStyles: { overflow: "linebreak" },
          head: [
            this.selected_filter_1 != 3
              ? [
                  "Job No",
                  "Job Description",
                  "Customer Name",
                  "Customer ID",
                  "System",
                  "Employee Name",
                  "Due Date",
                  "NOT",
                ]
              : [
                  "Job No",
                  "Job Description",
                  "Customer Name",
                  "Customer ID",
                  "System",
                  "Due Date",
                  "NOT",
                ],
          ],
          body: dataArray,
        });
        doc.setFontSize(12);
        var pageCount = doc.internal.getNumberOfPages();
        for (let i = 0; i < pageCount; i++) {
          doc.setPage(i);
          doc.text(
            145,
            205,
            doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount
          );
        }
        doc.save(`Job Allocation Report - ${moment().format("DD-MM-YYYY")}`);
      }, 500);
    },

    loadDateRange() {
      if (moment(this.range.start).isSame(moment(this.range.end))) {
        return (
          "Job Allocation Report - (" +
          moment(this.range.start).format("DD-MM-YYYY") +
          ")"
        );
      } else {
        return (
          "Job Allocation Report - (" +
          moment(this.range.start).format("DD-MM-YYYY") +
          " to " +
          moment(this.range.end).format("DD-MM-YYYY") +
          ")"
        );
      }
    },

    loadSubHadings(doc) {
      doc.setFontSize(12);
      doc.text(
        15,
        23,
        "Filter - " +
          this.filter_1.find((el) => el.id == this.selected_filter_1).option
      );
      doc.text(
        15,
        29,
        "Department - " +
          this.departments.find((el) => el.id == this.selected_department)
            .department
      );
    },

    changeTableHeader() {
      if (this.selected_filter_1 != 3) {
        if (this.columns[7].field != "name") {
          this.columns.splice(7, 0, {
            label: "Employee Name",
            field: "name",
          });
        }
      } else {
        this.columns.splice(7, 1);
      }
    },

    onRowClick(params) {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("#task_details").offset().top - 0,
        },
        1000
      );
      const loader = this.$loading.show();
      let aaa = [];
      this.$store
        .dispatch("tasksForJobAllocationReport", {
          job_id: params.row.job_id,
        })
        .then((res) => {
          res.forEach((el) => {
            aaa.push({
              task_no: el.task_no,
              task_name_original: el.task_name,
              time_01: el.Time01,
              time_02: el.Time02,
              time_03: el.Time03,
            });
          });
          this.tasks_data = aaa;
          loader.hide();
        })
        .catch((err) => {
          loader.hide();
          this.tasks_data = [];
        });
    },

    loadActivities(data) {
      //   const loader = this.$loading.show();
      //   this.selected_task = {};
      //   this.single_task(data)
      //     .then(res => {
      //       this.selected_task = data;
      //       this.selected_task.activities = res;
      //       this.selected_task.task_title =
      //         res.length != 0 ? res[0].task_title : ongoing.task.task_description;
      //       this.selected_task.due_date = data.due_date;
      //       this.selected_task.plan_date = data.plan_date;
      //       this.selected_task.task_title = data.task_title;
      //       loader.hide();
      //       $("#large-Modal5").modal("show");
      //     })
      //     .catch(err => loader.hide());
    },
  },
};
</script>

<style scoped>
.custom-column {
  width: 250px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
</style>
