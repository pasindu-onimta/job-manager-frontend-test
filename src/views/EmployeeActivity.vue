<template>
  <div class="pcoded-content">
    <PageHeader title="Jobs" path="/jobs" description="All Pending Jobs"></PageHeader>
    <div class="d-flex justify-content-end">
      <div class="col-sm-12 col-xl-3 m-b-30 m-r-20">
        <form>
          <input
            type="text"
            class="form-control form-control-round"
            v-model="search"
            placeholder="Search.."
          />
        </form>
      </div>
    </div>
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <button class="btn btn-info mb-3" @click="loadActivitiesToday()">Load employee history</button>
            <!-- Task Detail Modal Start -->

            <div class="modal fade" id="large-Modal3" tabindex="-1" role="dialog">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="mb-5">
                    <div class="ml-4 mt-4 d-flex justify-content-between align-items-start">
                      <div class="d-flex flex-column">
                        <h4 class="modal-title">
                          <i
                            class="fa fa-window-maximize mr-3"
                            style="font-size: 17px"
                            aria-hidden="true"
                          ></i>
                          {{ selected_task.task_name }}
                        </h4>
                        <!-- p
                          style="margin-left: 35px; font-size: 13px"
                          class="text-muted"
                        >in list {{ selected_task.current_status | sectionName }}</p>-->
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
                    <div class="row">
                      <div class="col-md-8">
                        <div class="ml-4 mt-3">
                          <h6>
                            <i
                              class="fa fa-align-left mr-3"
                              style="font-size: 17px"
                              aria-hidden="true"
                            ></i>Description
                          </h6>
                          <p
                            style="margin-left: 33px; font-size: 13px"
                          >{{ selected_task.task_description }}</p>
                        </div>
                        <!-- Activity Main Section -->

                        <div class="ml-4 mt-4" v-if="selected_task.status != 'Not Started'">
                          <h6>
                            <i
                              class="fa fa-align-left mr-3"
                              style="font-size: 17px"
                              aria-hidden="true"
                            ></i>Activities
                          </h6>

                          <!-- Add comment Section -->

                          <div class="form-group mt-3">
                            <div class="d-flex" v-if="!selected_task.locked">
                              <img
                                :src="setProfileImage2($store.getters.user)"
                                style="margin-left: 13px; width: 35px; height: 35px"
                                class="img-radius"
                                alt="User-Profile-Image"
                              />
                              <input
                                style="margin-left: 13px; font-size: 13px"
                                @keyup.enter="saveComment(selected_task.id)"
                                v-model="comment"
                                type="text"
                                class="form-control"
                                placeholder="Write a comment..."
                              />
                            </div>
                          </div>

                          <!-- Activity Section -->
                          <perfect-scrollbar>
                            <div>
                              <div
                                class="d-flex mt-3"
                                v-for="activity in selected_task.activities"
                                :key="activity.id"
                              >
                                <!-- Comments Section -->
                                <div
                                  v-if="!activity.section_name"
                                  class="d-flex align-items-center"
                                >
                                  <img
                                    :src="setProfileImage(activity)"
                                    style="margin-left: 13px; width: 40px; height: 40px"
                                    class="img-radius"
                                    alt="User-Profile-Image"
                                  />
                                  <div
                                    class="d-flex flex-column align-items-start card card-body"
                                    style=" margin: 0 0 0 10px; padding: 6px 12px 8px 0px; width: 100%"
                                    :class="getTaskColor(activity.comment_type)"
                                  >
                                    <p style="font-size: 13px">
                                      <span
                                        style="font-weight: bold; margin-left: 13px; font-size: 14px"
                                      >{{ $store.getters.user.id == activity.user_id ? 'You' : activity.name | firstNameOnly }}</span>
                                      {{ activity.comment}}
                                      <i
                                        v-if="activity.comment_type == 3"
                                        class="fas fa-bug ml-2"
                                      ></i>
                                      <i
                                        v-if="activity.comment_type == 4"
                                        class="feather icon-check ml-2"
                                        style="font-size: 16px"
                                      ></i>
                                    </p>
                                    <div
                                      style="margin-left: 13px; margin-top: -15px; font-size: 11px"
                                    >
                                      <span
                                        style="font-weight: 600"
                                        :class="getTaskColor2(activity.comment_type)"
                                      >{{activity.created_at | formattedDate }}</span>
                                      <span
                                        style="margin-left: 10px"
                                        :class="getTaskColor3(activity.comment_type)"
                                      >{{ activity.created_at | fromNow }}</span>
                                    </div>
                                  </div>
                                </div>
                                <!-- Section Activity -->
                                <div v-else class="d-flex align-items-center">
                                  <img
                                    :src="setProfileImage(activity)"
                                    style="margin-left: 13px; width: 35px; height: 35px"
                                    class="img-radius"
                                    alt="User-Profile-Image"
                                  />
                                  <div
                                    class="d-flex flex-column align-items-start"
                                    :class="getTaskColorActivity(activity)"
                                    style=" margin: 0 0 -5px 10px; padding: 5px 12px 5px 0px; width: 100%"
                                  >
                                    <p style="font-size: 13px;">
                                      <span
                                        style="font-weight: bold; margin-left: 13px; font-size: 14px"
                                      >{{ $store.getters.user.id == activity.user_id ? 'You' : activity.name | firstNameOnly }}</span>
                                      moved this task from {{ activity.prev_section}} to {{ activity.section_name }}
                                    </p>
                                    <div
                                      class="text-muted"
                                      style="margin-left: 13px; margin-top: -15px; font-size: 11px"
                                    >
                                      <span
                                        style="font-weight: 600"
                                        class="text-dark"
                                      >{{activity.startTime | formattedDate }}</span>
                                      <span
                                        style="margin-left: 10px"
                                        class="text-primary"
                                      >{{ activity.startTime | fromNow }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </perfect-scrollbar>
                        </div>
                        <div class="ml-4 mt-4" v-else>
                          <h6>
                            <i
                              class="fa fa-align-left mr-3"
                              style="font-size: 17px"
                              aria-hidden="true"
                            ></i>Activities
                          </h6>
                          <p class="text-muted text-center mt-5">No activities found</p>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <p style="font-size: 13px; font-weight: bold">ADD TO CARD</p>
                        <div class="task-card-button">
                          <i class="far fa-user mr-3" style="font-size: 15px" aria-hidden="true"></i>Members
                        </div>
                        <div class="task-card-button">
                          <i class="fas fa-tags mr-3" style="font-size: 15px" aria-hidden="true"></i>Labels
                        </div>
                        <div class="task-card-button">
                          <i
                            class="fas fa-paperclip mr-3"
                            style="font-size: 15px"
                            aria-hidden="true"
                          ></i>Attachment
                        </div>
                        <div class="mt-5" style="line-height: 0.5">
                          <h6>
                            <i class="far fa-clock mr-2" style="font-size: 16px" aria-hidden="true"></i>Due Date
                          </h6>
                          <p
                            style="margin-left: 24px; font-size: 14px; font-weight: 700"
                            class="text-primary"
                          >{{ selected_task.due_date | formattedDate4 }}</p>
                        </div>
                        <div class="mt-4" style="line-height: 0.5">
                          <h6>
                            <i class="feather icon-calendar" style="font-size: 16px"></i>
                            Plan Date
                          </h6>
                          <div class="form-group row" v-if="selected_task.current_status == '1'">
                            <div class="col-sm-12">
                              <div class="d-flex">
                                <v-date-picker
                                  style="z-index: 200"
                                  v-model="plan_date"
                                  :popover="{ visibility: 'click' }"
                                />
                                <button
                                  class="btn btn-info btn-custom"
                                  @click="addPlanDate(selected_task)"
                                >save</button>
                              </div>
                            </div>
                          </div>
                          <p
                            v-else
                            style="margin-left: 24px; font-size: 14px; font-weight: 700"
                            class="text-primary"
                          >{{ selected_task.plan_date | formattedDate4 }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-default waves-effect"
                      data-dismiss="modal"
                    >Close</button>
                    <button
                      type="button"
                      class="btn btn-primary waves-effect waves-light"
                    >Save changes</button>
                  </div>-->
                </div>
              </div>
            </div>

            <!-- Task Detail Modal End -->
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Job Details</h5>
                  </div>
                  <div class="card-block">
                    <vuetable
                      ref="vuetable"
                      :api-mode="false"
                      :fields="jobsfields"
                      :per-page="perPage"
                      :data-manager="dataManager"
                      :row-class="jobRowClass"
                    >
                      <div slot="actions" slot-scope="props">
                        <button
                          class="btn btn-sm btn-info"
                          @click="onActionClicked('view-item', props.rowData)"
                        >view</button>
                      </div>
                    </vuetable>
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
                    <span style="font-weight: bold" class="mr-3">Job No</span> -
                    <span class="ml-3">{{selected_job.jobno}}</span>
                  </div>
                  <div class="mt-2">
                    <span style="font-weight: bold" class="mr-3">Customer ID</span> -
                    <span class="ml-3">{{selected_job.customer_id}}</span>
                  </div>
                  <div class="mt-2">
                    <span style="font-weight: bold" class="mr-3">Customer</span> -
                    <span class="ml-3">{{selected_job.customer}}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span style="font-weight: bold" class="mr-3">System</span> -
                    <span class="ml-3">{{selected_job.system}}</span>
                  </div>
                  <div class="mt-2">
                    <span style="font-weight: bold" class="mr-3">Due Date</span> -
                    <span class="ml-3">{{selected_job.due_date}}</span>
                  </div>
                </div>
              </div>
              <div class="ml-4 mb-4" v-if="isJobSelect">
                <span style="font-weight: bold" class="mr-3">Description</span> -
                <span class="ml-3">{{selected_job.job_description}}</span>
              </div>
              <div class="col-md-12" v-if="isJobSelect">
                <div class="card">
                  <div class="card-header d-flex justify-content-between align-items-center">
                    <h5>Tasks Details</h5>
                  </div>
                  <div class="card-block">
                    <vuetable
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
                    </vuetable>
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
import JobsDetailRow from "@/components/JobsDetailRow";
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import moment from "moment";
import _ from "lodash";
import { mapActions } from "vuex";
export default {
  name: "Jobs",
  components: {
    PageHeader,
    JobsDetailRow,
    Vuetable,
    VuetablePagination
  },
  data() {
    return {
      jobsfields: [
        { name: "jobno", title: "Job No" },
        { name: "customer", title: "Customer" },
        { name: "duedate", title: "Due Date" },
        { name: "plandate", title: "Plan Date" },
        { name: "no_of_tasks", title: "NT" },
        { name: "finished_tasks", title: "FT" },
        // { name: "qc_tasks", title: "QT" },
        { name: "remains_tasks", title: "RT" },
        { name: "status", title: "Status" },
        { name: "started_at", title: "Started At" },
        // { name: "ended_at", title: "Ended At" },
        { name: "actions", title: "Action" }
      ],
      tasksfields: [
        { name: "taskno", title: "Task No" },
        { name: "duedate", title: "Due Date" },
        { name: "plandate", title: "Plan Date" },
        { name: "op_time", title: "OP" },
        { name: "mo_time", title: "MO" },
        { name: "pe_time", title: "PE" },
        { name: "time_spent", title: "Spent Time" },
        { name: "status", title: "Status" },
        { name: "started_at", title: "Started At" },
        { name: "ended_at", title: "Ended At" },
        { name: "actions", title: "Action" }
      ],
      perPage: 50,
      data: [],
      tasksData: [],
      search: "",
      selected_task: {},
      selected_job: {},
      comment: "",
      isJobSelect: false
    };
  },

  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    },
    tasksData(newVal, oldVal) {
      this.$refs.tasks.refresh();
    }
  },

  created() {
    const loader = this.$loading.show();
    const data = [];
    this.$store
      .dispatch("employee_activity", { id: this.$route.query.id })
      .then(res => {
        loader.hide();
      })
      .catch(err => loader.hide());
  },

  mounted() {},

  methods: {
    ...mapActions(["single_task", "save_comments", "single_task_today"]),
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
      if (this.data.length < 1) return;

      let local = this.data;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      );
      console.log("pagination:", pagination);
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      };
    },
    dataManager2(sortOrder, pagination) {
      if (this.tasksData.length < 1) return;

      let local = this.tasksData;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      pagination = this.$refs.tasks.makePagination(local.length, this.perPage);
      console.log("pagination:", pagination);
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      };
    },
    onActionClicked(action, data) {
      const loader = this.$loading.show();
      this.isJobSelect = true;
      this.selected_job = {
        customer: data.customer,
        job_description: data.job_description,
        customer_id: data.customer_id,
        jobno: data.jobno,
        system: data.system,
        due_date: data.due_date
      };
      console.log("ggggggggggggggggggggggggg", data);
      const tasks = [];
      this.$store
        .dispatch("employee_summary_tasks", { job_user_id: data.job_user_id })
        .then(res => {
          res.forEach(el => {
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
              duedate: moment(el.due_date).format("MM/DD/YYYY"),
              plandate: moment(el.plan_date).format("MM/DD/YYYY"),
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
              spent: el.spent
            });
          });
          this.tasksData = tasks;
          console.log("sss", this.tasksData);
          $([document.documentElement, document.body]).animate(
            {
              scrollTop: $("#task_details").offset().top - 100
            },
            1000
          );
          loader.hide();
        })
        .catch(err => loader.hide());
    },

    loadActivities(action, data) {
      const loader = this.$loading.show();
      this.selected_task = {};
      this.single_task(data)
        .then(res => {
          this.selected_task = data;
          this.selected_task.activities = res;
          // this.selected_task.due_date = ongoing.task_user.due_date;
          // this.selected_task.plan_date = ongoing.task_user.plan_date;
          loader.hide();
          $("#large-Modal3").modal("show");
        })
        .catch(err => loader.hide());
    },

    loadActivitiesToday() {
      const loader = this.$loading.show();
      this.selected_task = {};
      this.single_task_today()
        .then(res => {
          this.selected_task = {};
          this.selected_task.activities = res;
          // this.selected_task.due_date = ongoing.task_user.due_date;
          // this.selected_task.plan_date = ongoing.task_user.plan_date;
          loader.hide();
          $("#large-Modal3").modal("show");
        })
        .catch(err => loader.hide());
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
        return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH +
          user.employee.image}`;
      return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH}default.png`;
    }
  }
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
</style>
