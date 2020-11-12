<template>
  <div class="pcoded-content">
    <PageHeader
      title="Dashboard"
      path="/jobs"
      :loading="divisions_loaded"
      :dashboard="true"
      description="All Details"
    >
    </PageHeader>
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <!-- Task Detail Modal Start -->

            <div
              class="modal fade"
              id="large-Modal2"
              tabindex="-1"
              role="dialog"
            >
              <div class="modal-dialog modal-lg" role="document">
                <activity-modal-content
                  :selected_task="selected_task"
                ></activity-modal-content>
              </div>
            </div>

            <!-- <div class="row" v-if="$store.getters.ongoings.length == 0"> -->
            <div class="row" v-if="$store.getters.ongoings.length == 0">
              <div
                class="col-xl-4 col-md-6"
                v-for="(value, index) in itemData"
                :key="index"
              >
                <div class="card analytic-card card-white">
                  <div class="card-body">
                    <div class="row align-items-center m-b-5">
                      <div class="d-flex align-items-center">
                        <PuSkeleton
                          circle
                          class="mr-2 ml-2 mb-2"
                          height="50px"
                          width="50px"
                        ></PuSkeleton>
                        <PuSkeleton class="mb-3" width="200px" height="20px" />
                      </div>
                    </div>
                    <div class="text-left">
                      <div class="d-flex justify-content-between">
                        <PuSkeleton class="mb-1" width="300px" height="200px" />
                      </div>
                      <!-- <div class="d-flex justify-content-between">
                        <PuSkeleton class="mb-1" width="120px" height="20px" />
                        <PuSkeleton class="mb-1" width="80px" height="20px" />
                      </div>
                      <div class="d-flex justify-content-between">
                        <PuSkeleton class="mb-1" width="100px" height="20px" />
                        <PuSkeleton class="mb-1" width="40px" height="20px" />
                      </div> -->
                      <div class="d-flex justify-content-between">
                        <PuSkeleton class="mb-1" width="135px" height="20px" />
                        <PuSkeleton class="mb-1" width="40px" height="20px" />
                      </div>
                      <div class="d-flex justify-content-between">
                        <PuSkeleton class="mb-1" width="295px" height="25px" />
                      </div>
                      <div class="d-flex justify-content-between">
                        <PuSkeleton class="mb-1" width="85px" height="20px" />
                        <PuSkeleton class="mb-1" width="40px" height="20px" />
                      </div>
                      <hr />
                      <!-- due date and total spent time -->
                      <div class="d-flex justify-content-between">
                        <PuSkeleton class="mb-1" width="120px" height="20px" />
                        <PuSkeleton class="mb-1" width="90px" height="20px" />
                      </div>
                      <div class="d-flex justify-content-between">
                        <PuSkeleton class="mb-1" width="295px" height="25px" />
                      </div>
                      <div class="d-flex justify-content-between">
                        <PuSkeleton class="mb-1" width="200px" height="20px" />
                        <PuSkeleton class="mb-1" width="70px" height="20px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Task Detail Modal End -->

            <!-- <h4 class="mb-5">Team Mr.Tharindu</h4> -->
            <!-- <carousel
              :autoplay="true"
              :autoplayHoverPause="true"
              :perPage="3"
              :scrollPerPage="true"
              :autoplayTimeout="5000"
            > -->

            <div class="row">
              <!-- show ongong job details card -->
              <!-- <slide class="col-xl-4 col-md-6" v-for="ongoing in ongoings" :key="ongoing.id"> -->
              <div
                class="col-xl-4 col-md-6"
                v-for="ongoing in ongoings_store"
                :key="ongoing.id"
              >
                <div
                  class="card analytic-card card-white"
                  :class="addClass(ongoing)"
                >
                  <div class="card-body">
                    <div class="row align-items-center m-b-5">
                      <div class="d-flex align-items-center">
                        <img
                          :src="setProfileImageMain(ongoing.image)"
                          style="width: 40px; height: 40px"
                          class="img-radius mr-2 ml-2 mb-2"
                          alt="User-Profile-Image"
                        />
                        <div class="d-flex justify-content-between">
                          <router-link :to="allJobsSummaryPage(ongoing)">
                            <h5 class="text-inverse" style="cursor: pointer">
                              {{ ongoing.name }}
                            </h5>
                          </router-link>
                          <i
                            v-if="
                              ongoing.ongoing.task &&
                              ongoing.ongoing.task.id != 0
                            "
                            class="feather icon-external-link ml-2"
                            style="font-size: 22px; cursor: pointer"
                            @click="loadTaskDetails(ongoing)"
                          ></i>
                          <div></div>
                        </div>
                      </div>
                    </div>
                    <div class="text-left">
                      <div class="d-flex justify-content-between">
                        <h6 class="m-b-5">
                          <i class="feather icon-clipboard mr-2"></i> Ongoing
                          Job
                        </h6>
                        <h6
                          class="m-b-5 rounded text-white"
                          :class="holdTypeClass(ongoing.holdAction.type)"
                          style="padding: 2px 8px"
                          v-if="ongoing.holdAction"
                        >
                          {{ ongoing.holdAction.type | holdType }}
                        </h6>
                        <h6 v-else class="m-b-5">
                          {{
                            ongoing.ongoing_job.length != 0 &&
                            ongoing.ongoing_job
                              ? ongoing.ongoing_job.job_no
                              : "N/A"
                          }}
                        </h6>
                      </div>
                      <div class="d-flex justify-content-between flex-wrap">
                        <h6 class="m-b-5">
                          <i class="feather icon-user mr-2"></i> Customer
                        </h6>
                        <h6
                          v-if="
                            !ongoing.holdAction &&
                            ongoing.ongoing_job.length != 0 &&
                            ongoing.ongoing_job.customer_name != ''
                          "
                          class="m-b-5"
                        >
                          {{ ongoing.ongoing_job.customer_name }}
                        </h6>
                        <h6 v-else class="m-b-5">N/A</h6>
                      </div>
                      <div class="d-flex justify-content-between">
                        <h6 class="m-b-5">
                          <i class="feather icon-check-square mr-2"></i>Ongoing
                          Task
                        </h6>
                        <h6 class="m-b-5">
                          {{
                            ongoing.ongoing.length != 0 && !ongoing.isHolding
                              ? ongoing.ongoing.task.task_no
                              : "N/A"
                          }}
                        </h6>
                      </div>
                      <div
                        class="d-flex justify-content-between"
                        :class="
                          checkIfDueDateHasExceeded(
                            !ongoing.holdAction && ongoing.ongoing.length != 0
                              ? ongoing.task_user.due_date
                              : null
                          )
                        "
                      >
                        <h6 class="m-b-5">
                          <i class="feather icon-bell mr-2"></i>Due Date
                        </h6>
                        <h6
                          v-if="
                            !ongoing.holdAction &&
                            ongoing.task_user.length != 0 &&
                            ongoing.task_user
                          "
                          class="m-b-5"
                        >
                          {{ ongoing.task_user.due_date | formattedDate2 }}
                        </h6>
                        <h6 v-else class="m-b-5">N/A</h6>
                      </div>
                      <div class="d-flex justify-content-between">
                        <h6 class="m-b-5">
                          <i class="feather icon-clock mr-2"></i>Plan Date
                        </h6>
                        <h6
                          v-if="!ongoing.holdAction && ongoing.task_user"
                          class="m-b-5"
                        >
                          {{ ongoing.task_user.assign_date | formattedDate2 }}
                        </h6>
                        <h6 v-else class="m-b-5">N/A</h6>
                      </div>
                      <hr />
                      <!-- due date and total spent time -->
                      <div class="d-flex justify-content-between">
                        <h6 class="m-b-5">Last started At</h6>
                        <h6
                          v-if="
                            ongoing.ongoing.length == 0 && ongoing.holdAction
                          "
                          class="m-b-5"
                        >
                          {{ ongoing.holdAction.created_at | formattedDate }}
                        </h6>
                        <h6 v-if="ongoing.ongoing.length != 0" class="m-b-5">
                          {{ ongoing.ongoing.created_at | formattedDate }}
                        </h6>
                        <h6
                          v-if="
                            ongoing.ongoing.length == 0 && !ongoing.holdAction
                          "
                          class="m-b-5"
                        >
                          N/A
                        </h6>
                      </div>
                      <div class="d-flex justify-content-between">
                        <h6 class="m-b-5">Time Estimated</h6>
                        <h6
                          v-if="
                            !ongoing.holdAction &&
                            ongoing.task_user.length != 0 &&
                            ongoing.task_user
                          "
                          class="m-b-5"
                        >
                          <span>{{
                            estimatedTime(
                              ongoing.ongoing.length != 0 &&
                                ongoing.ongoing.task &&
                                ongoing.ongoing.task.Time02
                            )
                          }}</span>
                        </h6>
                        <h6 v-else class="m-b-5">N/A</h6>
                      </div>
                      <div
                        v-if="ongoing.spent.length != 0"
                        class="d-flex justify-content-between"
                        :class="
                          ongoing.ongoing.length != 0
                            ? checkIfTaskEstimatedTimeHasExceeded(
                                ongoing.ongoing.length != 0 &&
                                  ongoing.ongoing.task &&
                                  ongoing.ongoing.task.Time02,
                                ongoing.spent,
                                ongoing.isHolding
                              )
                            : null
                        "
                      >
                        <h6 class="m-b-5">Time Spent</h6>
                        <!-- <h6 v-if="ongoing.task_user" class="m-b-5">
                            <span v-if="ongoing.spent.days != 0">{{ ongoing.spent.days }} days</span>
                            {{ ongoing.spent.hours }} hrs {{ ongoing.spent.minutes }} min
                          </h6> -->
                        <h6 v-if="ongoing.task_user" class="m-b-5">
                          {{ setSpentTime(ongoing.spent) }}
                        </h6>
                        <h6 v-else class="m-b-5">N/A</h6>
                      </div>

                      <hr />
                      <!-- future tasks -->
                      <div>
                        <p class="text-purple" style="margin-bottom: 5px">
                          Future Tasks
                        </p>
                        <div
                          class="d-flex justify-content-between"
                          style="font-weight: 600"
                        >
                          <p>Job No</p>
                          <p>Task No</p>
                          <p class="mr-3">Due date</p>
                        </div>
                        <perfect-scrollbar class="ps2">
                          <div style="max-height: 80px">
                            <div
                              v-if="
                                ongoing.pending_tasks != undefined &&
                                ongoing.pending_tasks.length != 0
                              "
                            >
                              <div
                                v-for="ptasks in ongoing.pending_tasks"
                                :key="ptasks.id"
                              >
                                <div
                                  class="d-flex text-dark justify-content-between bg-default rounded pt-1 pl-1 pr-1"
                                >
                                  <h6 class="m-b-5">{{ ptasks.job_no }}</h6>
                                  <h6 class="m-b-5">{{ ptasks.task_no }}</h6>
                                  <h6 class="m-b-5">
                                    {{ ptasks.due_date | formattedDate2 }}
                                  </h6>
                                </div>
                                <div
                                  class="d-flex justify-content-between"
                                  style="font-weight: bold"
                                >
                                  <span class="ml-1"
                                    >{{ ptasks.Time01 }} (op)</span
                                  >
                                  <span>{{ ptasks.Time02 }} (mo)</span>
                                  <span class="mr-1"
                                    >{{ ptasks.Time03 }} (pe)</span
                                  >
                                </div>
                              </div>
                            </div>
                            <div v-else class="text-center text-muted">
                              <p>No pending tasks available</p>
                            </div>
                          </div>
                        </perfect-scrollbar>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- </slide> -->
              <!-- end of show ongong job details card -->
            </div>
            <!-- </carousel> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import PageHeader from "@/components/PageHeader";
import { mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    PageHeader,
  },
  data() {
    return {
      ongoings: [],
      divisions: [],
      selected_task: {},
      comment: "",
      content_loaded: false,
      divisions_loaded: false,
      itemData: [1, 2, 3, 4, 5, 6, 7, 8],
      division_id: 0,
    };
  },
  computed: {
    ongoings_store() {
      return this.$store.getters.ongoings;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  filters: {
    holdType: function (value) {
      switch (value) {
        case 6:
          return "Meeting";
          break;
        case 7:
          return "Lunch";
          break;
        case 8:
          return "Hold";
          break;
        case 9:
          return "Day Off";
          break;
        case 10:
          return "Help";
          break;
        case 11:
          return "Leave";
          break;
        default:
          break;
      }
    },
  },
  methods: {
    ...mapActions(["single_task", "save_comments", "previous_tasks"]),

    // loadEmployeeCards() {
    //   this.$store
    //     .dispatch("ongoing_jobs", { user: 0, division: this.division_id })
    //     .then((res) => {
    //       this.ongoings = res;
    //       this.content_loaded = true;
    //     });
    // },

    addClass(ongoing) {
      if (ongoing.ongoing.length != 0) return "card-white text-dark";
      if (ongoing.holdAction) return "card-white text-dark";
      else return "card-default text-dark";
    },

    setSpentTime(spent) {
      let days = parseInt(spent.days) * 24;
      let hours = parseInt(spent.hours);
      let minutes = parseInt(spent.minutes);

      if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = Math.floor(minutes % 60);
      }

      return `${hours + days} hrs ${minutes} mins`;
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
    checkIfTaskEstimatedTimeHasExceeded(estimatedUnits, spentTime, isHolding) {
      if (!spentTime === undefined) return "";
      estimatedUnits = ((estimatedUnits * 100) / 25) * 15;
      let days = parseInt(spentTime.days);
      let hours = parseInt(spentTime.hours);
      let minutes = parseInt(spentTime.minutes);
      if (days != "00") minutes += days * 24 * 60;
      if (hours != "00") minutes += hours * 60;
      if (Math.sign(estimatedUnits - minutes) == -1) {
        if (!isHolding) return "pt-1 pl-1 pr-1 rounded bg-danger text-white";
      } else {
        if (!isHolding) return "pt-1 pl-1 pr-1 rounded bg-success text-white";
      }
    },

    checkIfDueDateHasExceeded(dueDate) {
      if (!dueDate) return "";
      let currentDate = new Date();
      dueDate = moment(dueDate).add(1, "days");
      dueDate = new Date(dueDate);
      let result = currentDate.getTime() > dueDate.getTime();
      if (result) {
        return "pt-1 pl-1 pr-1 rounded bg-danger";
      }
      return "pt-1 pl-1 pr-1 rounded bg-success";
    },

    holdTypeClass(type) {
      if (type == 6) return "bg-primary text-white"; // 6 - meeting
      if (type == 7) return "bg-info text-white"; // 7 - lunch
      if (type == 8) return "bg-inverse text-white"; // 8 - hold
      if (type == 9) return "bg-danger text-white"; // 9 - dayoff
      if (type == 10) return "help text-dark"; // 10 - help
      if (type == 11) return "leave text-dark"; // 11 - leave
    },

    loadTaskDetails(ongoing) {
      this.selected_task = {};
      let obj = {
        task_id: ongoing.ongoing.task.task_id,
        user_id: ongoing.ongoing.task.user_id,
      };
      const loader = this.$loading.show();
      this.single_task(ongoing.ongoing.task.id)
        .then((res) => {
          this.selected_task = res.details;
          this.selected_task.activities = res.activitiesWithComments;
          this.selected_task.task_title =
            res.activitiesWithComments.length != 0
              ? res.activitiesWithComments[0].task_title
              : task.task_name;
          loader.hide();
          $("#large-Modal2").modal("show");
        })
        .catch((err) => loader.hide());
    },

    allJobsSummaryPage(ongoing) {
      return `/summary?id=${ongoing.id}`;
    },

    // save comments for activities

    saveComment(task_id) {
      this.save_comments({ task_id, comment: this.comment })
        .then((res) => {
          this.selected_task.activities.unshift(res);
          this.comment = "";
          // add record to firebase firestore
          // db.collection("tasks")
          //   // .doc("emp" + res.assigned_emp)
          //   .doc("comments")
          //   .set({
          //     notification_id: 1,
          //     user_id: res.assigned_emp,
          //     status: 1,
          //     timestamp: new Date()
          //   })
          //   .then(function(docRef) {
          //     self.fetchAllJObsWithTasks().then(res => {
          //       loader.hide();
          //       swal("Good job!", `Task assigned successfully`, "success", {
          //         timer: 2000
          //       });
          //       self.jobsWithTasks = res;
          //     });
          //   })
        })
        .catch((err) => console.log(err.response));
    },

    // change task card collor according to qc status

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

    setProfileImageMain(image) {
      if (image) return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH + image}`;
      return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH}default.png`;
    },
  },

  created() {
    // const loader = this.$loading.show();
    this.$store
      .dispatch("ongoing_jobs", { user: 0, division: this.division_id })
      .then((res) => {
        this.ongoings = res;
        this.content_loaded = true;
        this.divisions_loaded = true;
        // loader.hide();
      })
      .catch((err) => {
        // loader.hide();
      });
    // this.$store.dispatch("get_divisions").then((res) => {
    //   this.divisions = res;
    // });
  },
};
</script>

<style scoped>
.ps2 {
  height: 80px;
}
.truncate {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
