<template>
  <div class="pcoded-content">
    <PageHeader
      title="Dashboard"
      path="/jobs"
      description="All Details"
    ></PageHeader>
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
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Pending Approvals</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <vue-good-table
                      ref="my-table"
                      :columns="columns"
                      :rows="pending_approvals"
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
                          <button
                            class="btn btn-success btn-sm ml-1"
                            @click="approveTask(props.row)"
                          >
                            Approve
                          </button>
                          <button
                            class="btn btn-danger btn-sm ml-1"
                            @click="loadActivities(props.row)"
                          >
                            Reject
                          </button>
                        </span>
                        <span
                          v-if="props.column.field == 'task_description'"
                          style="max-width: 50px"
                        >
                          <span style="max-width: 50px"
                            >{{ props.row.task_description.slice(0, 55) }}
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
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
export default {
  name: "JobAuthorization",
  components: {
    PageHeader,
  },
  data() {
    return {
      data: [],
      selected_task: {},
      columns: [
        {
          label: "No",
          field: "no",
        },
        {
          label: "task_id",
          field: "task_id",
          hidden: true,
        },
        {
          label: "task_user_id",
          field: "task_user_id",
          hidden: true,
        },
        {
          label: "job_user_id",
          field: "job_user_id",
          hidden: true,
        },
        {
          label: "Task No",
          field: "task_no",
        },
        {
          label: "Job No",
          field: "job_no",
        },
        {
          label: "Task Description",
          field: "task_description",
        },
        {
          label: "Allocated Time",
          field: "Time02",
        },
        {
          label: "Action",
          field: "action",
          width: "100px",
        },
      ],
    };
  },
  computed: {
    pending_approvals() {
      return this.$store.getters.pending_approvals;
    },
  },

  methods: {
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

    estimatedTime(unit) {
      unit = ((unit * 100) / 25) * 15;
      return (
        String(Math.floor(unit / 60)).padStart(2, "0") +
        " hrs " +
        String(unit % 60).padStart(2, "0") +
        " min"
      );
    },

    approveTask(rowdata) {
      let allTasks = false;
      swal({
        title: "Are you sure?",
        text: "Do you want to approve all tasks for this job?",
        icon: "warning",
        buttons: {
          cancel: "Cancel",
          catch: {
            text: "Yes! approve all",
            value: "catch",
          },
          defeat: {
            text: "No! this task only",
            value: "defeat",
          },
        },
      }).then((value) => {
        switch (value) {
          case "defeat":
            allTasks = false;
            this.sendApprove(rowdata, allTasks);
            break;

          case "catch":
            allTasks = true;
            this.sendApprove(rowdata, allTasks);
            break;
        }
      });
    },

    sendApprove(rowdata, allTasks) {
      const loader = this.$loading.show();
      this.$store
        .dispatch("approveTask", {
          task_user_id: rowdata.task_user_id,
          job_user_id: rowdata.job_user_id,
          allTasks: allTasks,
        })
        .then(() => {
          loader.hide();
          swal("Success!", "Tasks has been approved", "success");
        })
        .catch((err) => {
          loader.hide();
        });
    },
  },

  created() {
    const loader = this.$loading.show();
    const data = [];
    this.$store
      .dispatch("pendingApprovals")
      .then((res) => {
        // res.forEach((el, index) => {
        //   data.push({
        //     no: ++index,
        //     task_no: el.task_no,
        //     task_id: el.task_id,
        //     task_user_id: el.task_user_id,
        //     job_no: el.job_no,
        //     task_description: el.task_description,
        //     Time02: this.estimatedTime(el.Time02),
        //   });
        // });
        // this.data = data;
        loader.hide();
      })
      .catch((err) => {
        loader.hide();
      });
  },
};
</script>
