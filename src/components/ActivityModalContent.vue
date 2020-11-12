<template>
  <div>
    <div class="modal-content mb-5">
      <div class="ml-4 mt-4 d-flex justify-content-between align-items-start">
        <div class="d-flex flex-column">
          <h4 class="modal-title">
            <i
              class="fas fa-angle-double-right mr-3"
              style="font-size: 20px"
              aria-hidden="true"
            ></i>
            {{ selected_task.job_description }}
          </h4>
          <h5 class="modal-title mt-2">
            <i
              class="fa fa-window-maximize mr-3"
              style="font-size: 17px"
              aria-hidden="true"
            ></i>
            {{ selected_task.task_title }} (Task no -
            {{ selected_task.task_no }})
          </h5>
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
              ></i
              >Task Description
            </h6>
            <p style="margin-left: 33px; font-size: 13px">
              {{ selected_task.task_description }}
            </p>
          </div>
          <!-- Activity Main Section -->

          <div class="ml-4 mt-4" v-if="selected_task.fresh_task != 1">
            <h6>
              <i
                class="fa fa-align-left mr-3"
                style="font-size: 17px"
                aria-hidden="true"
              ></i
              >Activities
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
                  style="margin-left: 13px; font-size: 15px"
                  @keyup.enter="saveComment(selected_task.task_id)"
                  v-model="comment"
                  type="text"
                  class="form-control"
                  placeholder="Write a comment..."
                />
              </div>
            </div>

            <!-- Activity Section -->
            <perfect-scrollbar class="mb-4">
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
                      style="
                        margin: 0 0 0 10px;
                        padding: 6px 12px 8px 13px;
                        width: 100%;
                      "
                      :class="getTaskColor(activity.comment_type)"
                    >
                      <p style="font-size: 14px">
                        <span
                          style="
                            font-weight: bold;
                            margin-left: 3px;
                            font-size: 16px;
                          "
                        >
                          {{
                            $store.getters.user.id == activity.user_id
                              ? "You"
                              : activity.name | firstNameOnly
                          }}
                        </span>
                        {{ activity.comment }}
                        <i
                          v-if="activity.comment_type == 3"
                          class="fas fa-bug ml-2"
                        ></i>
                        <i
                          v-if="activity.comment_type == 4"
                          class="feather icon-check ml-2"
                          style="font-size: 17px"
                        ></i>
                      </p>
                      <div
                        style="
                          margin-left: 3px;
                          margin-top: -15px;
                          font-size: 13px;
                        "
                      >
                        <span
                          style="font-weight: 500"
                          :class="getTaskColor2(activity.comment_type)"
                          >{{ activity.created_at | formattedDate }}</span
                        >
                        <span
                          style="margin-left: 10px"
                          :class="getTaskColor3(activity.comment_type)"
                          >{{ activity.created_at | fromNow }}</span
                        >
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
                      style="
                        margin: 0 0 -5px 10px;
                        padding: 5px 12px 5px 0px;
                        width: 100%;
                      "
                    >
                      <p style="font-size: 14px">
                        <span
                          style="
                            font-weight: bold;
                            margin-left: 13px;
                            font-size: 15px;
                          "
                        >
                          {{
                            $store.getters.user.id == activity.user_id
                              ? "You"
                              : activity.name | firstNameOnly
                          }}
                        </span>
                        moved this task from
                        {{ activity.prev_section }} to
                        {{ activity.section_name }}
                      </p>
                      <div
                        class="text-muted"
                        style="
                          margin-left: 13px;
                          margin-top: -15px;
                          font-size: 13px;
                        "
                      >
                        <span style="font-weight: 500" class="text-dark">
                          {{ activity.startTime | formattedDate }}
                        </span>
                        <span style="margin-left: 10px" class="text-primary">
                          {{ activity.startTime | fromNow }}
                        </span>
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
              ></i
              >Activities
            </h6>
            <p class="text-muted text-center mt-5">No activities found</p>
          </div>
        </div>
        <div class="col-md-4">
          <p style="font-size: 13px; font-weight: bold">ADD TO CARD</p>

          <div class="task-card-button bg-primary">
            <i
              class="fas fa-tags mr-3"
              style="font-size: 15px"
              aria-hidden="true"
            ></i
            >Labels
          </div>
          <div class="task-card-button bg-info">
            <i
              class="fas fa-paperclip mr-3"
              style="font-size: 15px"
              aria-hidden="true"
            ></i
            >Attachment
          </div>

          <!--Accordion wrapper-->
          <div
            class="accordion mt-4 mb-5 md-accordion"
            style="width: 220px"
            id="accordionExMain"
            role="tablist"
            aria-multiselectable="true"
          >
            <div style="margin-top: 20px; margin-bottom: 0px">
              <!-- Card header -->
              <div role="tab" id="headingOne1">
                <h2>
                  <button
                    data-toggle="collapse"
                    data-parent="#accordionExMain"
                    class="btn btn-block btn-secondary text-left pl-3"
                    href="#collapseMain3"
                    aria-expanded="true"
                    aria-controls="collapseOne1"
                  >
                    <h6 class="mb-0" style="font-size: 13px">
                      <i
                        class="far fa-user mr-3"
                        style="font-size: 15px"
                        aria-hidden="true"
                      ></i
                      >Members
                      <i class="fas fa-angle-down rotate-icon float-right"></i>
                    </h6>
                  </button>
                </h2>
              </div>

              <!-- Card body -->
              <div
                id="collapseMain3"
                class="collapse"
                role="tabpanel"
                aria-labelledby="headingOne1"
                data-parent="#accordionExMain"
              >
                <div class="card-body" style="font-weight: 500">
                  <div style="line-height: 1">
                    <h6>
                      <i
                        class="far fa-check-circle mr-2"
                        style="font-size: 16px"
                      ></i
                      >Approved by
                    </h6>
                    <p
                      v-show="!isQcChangeActive"
                      style="
                        margin-left: 24px;
                        font-size: 14px;
                        font-weight: 700;
                      "
                      class="text-primary"
                    >
                      {{ selected_task.authorized_by }}
                    </p>
                  </div>
                  <div class="mt-4" style="line-height: 1">
                    <h6>
                      <i class="far fa-user mr-2" style="font-size: 16px"></i>QC
                      Employee
                    </h6>
                    <p
                      v-show="!isQcChangeActive"
                      style="
                        margin-left: 24px;
                        font-size: 14px;
                        font-weight: 700;
                        cursor: pointer;
                      "
                      class="text-primary"
                      @click="changeQcEmployee"
                    >
                      {{ selected_task.qc_name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Accordion card -->
            <!-- <div class="card" style="margin-top: 20px;"> -->
            <div style="margin-top: 10px; margin-bottom: 40px">
              <!-- Card header -->
              <div role="tab" id="headingOne1">
                <h2>
                  <button
                    data-toggle="collapse"
                    data-parent="#accordionExMain"
                    class="btn btn-block btn-warning text-left pl-3"
                    href="#collapseMain1"
                    aria-expanded="true"
                    aria-controls="collapseOne1"
                  >
                    <h6 class="mb-0" style="font-size: 13px">
                      <i
                        class="far fa-clipboard mr-1"
                        style="font-size: 15px"
                        aria-hidden="true"
                      ></i>
                      Task Details
                      <i class="fas fa-angle-down rotate-icon float-right"></i>
                    </h6>
                  </button>
                </h2>
              </div>

              <!-- Card body -->
              <div
                id="collapseMain1"
                class="collapse"
                role="tabpanel"
                aria-labelledby="headingOne1"
                data-parent="#accordionExMain"
              >
                <div class="card-body" style="font-weight: 500">
                  <div style="line-height: 1">
                    <h6 style="cursor: pointer" @click="showDueDateChangeField">
                      <i
                        class="far fa-clock mr-2"
                        style="font-size: 16px"
                        aria-hidden="true"
                      ></i
                      >Due Date
                    </h6>
                    <p
                      style="
                        margin-left: 24px;
                        font-size: 14px;
                        font-weight: 700;
                      "
                      class="text-primary"
                    >
                      {{ selected_task.due_date | formattedDate4 }}
                    </p>
                  </div>
                  <div class="form-group row" v-if="isDueDateChange">
                    <div class="col-sm-12">
                      <div class="d-flex align-items-center">
                        <v-date-picker
                          style="z-index: 200"
                          v-model="admin_due_date"
                          :popover="{ visibility: 'click' }"
                          :min-date="new Date()"
                        />
                        <div
                          style="cursor: pointer"
                          @click="updateTaskDueDate(selected_task)"
                        >
                          <i class="fas fa-sync ml-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4" style="line-height: 1">
                    <h6>
                      <i
                        class="feather icon-calendar"
                        style="font-size: 16px"
                      ></i>
                      Plan Date
                    </h6>

                    <p
                      style="
                        margin-left: 24px;
                        font-size: 14px;
                        font-weight: 700;
                      "
                      class="text-primary"
                    >
                      <span v-if="selected_task.plan_date">
                        {{ selected_task.plan_date | formattedDate4 }}
                      </span>
                      <span v-else>N/A</span>
                    </p>
                  </div>
                  <div class="mt-4" style="line-height: 1">
                    <h6
                      style="cursor: pointer"
                      @click="toggleEstimateTimeChange"
                    >
                      <i class="far fa-clock mr-2" style="font-size: 16px"></i
                      >Estimated Time
                    </h6>
                    <p
                      style="
                        margin-left: 24px;
                        font-size: 14px;
                        font-weight: 700;
                      "
                      class="text-primary"
                    >
                      {{ estimatedTime(selected_task.estimated_time) }}
                    </p>
                    <input
                      v-show="estimateTimeChange"
                      style="margin-left: 13px; font-size: 15px"
                      @keyup.enter="saveNewEstimateTime"
                      v-model="newEstimateTime"
                      type="number"
                      class="form-control"
                      placeholder="New Estimate Time.."
                    />
                  </div>
                  <div
                    class="mt-4"
                    style="line-height: 1"
                    v-if="selected_task.current_section != 1"
                  >
                    <h6>
                      <i
                        class="fas fa-stopwatch mr-2"
                        style="font-size: 16px"
                      ></i
                      >Spent Time
                    </h6>
                    <p
                      style="
                        margin-left: 24px;
                        font-size: 14px;
                        font-weight: 700;
                      "
                      class="text-primary"
                    >
                      <!-- {{ estimatedTime(selected_task.estimated_time) }} -->
                      <span
                        class="text-primary"
                        :class="
                          checkIfTaskEstimatedTimeHasExceeded(
                            selected_task.estimated_time,
                            selected_task.spent
                          )
                        "
                        >{{ setSpentTime(selected_task.spent) }}</span
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="card" style="margin-top: -30px"> -->
            <div style="margin-top: -30px">
              <!-- Card header -->
              <div role="tab" id="headingOne1">
                <h2>
                  <button
                    data-toggle="collapse"
                    data-parent="#accordionExMain"
                    class="btn btn-block btn-success text-left pl-3"
                    href="#collapseMain2"
                    aria-expanded="true"
                    aria-controls="collapseOne1"
                  >
                    <h6 class="mb-0" style="font-size: 13px">
                      <i
                        class="fa fa-briefcase mr-1"
                        style="font-size: 15px"
                      ></i>
                      Job Details
                      <i class="fas fa-angle-down rotate-icon float-right"></i>
                    </h6>
                  </button>
                </h2>
              </div>

              <!-- Card body -->
              <div
                id="collapseMain2"
                class="collapse"
                role="tabpanel"
                aria-labelledby="headingOne1"
                data-parent="#accordionExMain"
              >
                <div class="card-body" style="font-weight: 500">
                  <div class="mt-1" style="line-height: 1">
                    <h6>
                      <i
                        class="fas fa-desktop mr-2 text-muted"
                        style="font-size: 16px"
                      ></i
                      >Job No
                    </h6>
                    <p
                      style="
                        margin-left: 24px;
                        font-size: 14px;
                        font-weight: 700;
                      "
                      class="text-primary"
                    >
                      {{ selected_task.job_no }}
                    </p>
                  </div>
                  <div class="mt-1" style="line-height: 1">
                    <h6>
                      <i class="far fa-user mr-2" style="font-size: 16px"></i
                      >Customer
                    </h6>
                    <p
                      style="
                        margin-left: 24px;
                        font-size: 14px;
                        font-weight: 700;
                      "
                      class="text-primary"
                    >
                      {{ selected_task.customer_name }}
                    </p>
                  </div>
                  <div class="mt-2" style="line-height: 1">
                    <h6>
                      <i class="far fa-user mr-2" style="font-size: 16px"></i
                      >Contact Person
                    </h6>
                    <p
                      style="
                        margin-left: 24px;
                        font-size: 14px;
                        font-weight: 700;
                      "
                      class="text-primary"
                    >
                      {{ selected_task.contact_person }}
                    </p>
                  </div>
                  <div class="mt-4" style="line-height: 1">
                    <h6>
                      <i
                        class="fas fa-phone mr-2"
                        style="font-size: 16px; opacity: 0.7"
                        aria-hidden="true"
                      ></i
                      >Contact Number
                    </h6>
                    <p
                      style="
                        margin-left: 24px;
                        font-size: 14px;
                        font-weight: 700;
                      "
                      class="text-primary"
                    >
                      {{ selected_task.contact_number }}
                    </p>
                  </div>
                  <div class="mt-4 mb-5" style="line-height: 1">
                    <h6>
                      <i
                        class="far fa-bell mr-2"
                        style="font-size: 16px"
                        aria-hidden="true"
                      ></i
                      >Due Date
                    </h6>
                    <p
                      style="
                        text-decoration: underline;
                        font-size: 13px;
                        cursor: pointer;
                      "
                      class="text-primary float-right"
                      @click="showDueDateHistoryModal"
                    >
                      History
                    </p>
                    <p
                      style="
                        margin-left: 24px;
                        font-size: 14px;
                        font-weight: 700;
                      "
                      class="text-primary"
                    >
                      {{ selected_task.job_due_date | formattedDate4 }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Accordion wrapper -->
        </div>
      </div>
    </div>
    <!-- job due date change history -->
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <job-due-date-history
          :history="selected_task.history"
        ></job-due-date-history>
      </div>
    </div>
    <!-- End of job due date change history -->
    <div
      class="modal fade"
      id="qcchangemodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <qc-change-modal
          :taskId="selected_task.task_id"
          :jobId="selected_task.job_id"
          @changeQcName="changeQcName"
        ></qc-change-modal>
      </div>
    </div>
    <div
      id="estimateTimeReasonModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style="box-shadow: 0px 0px 10px 2px #6b6e6c">
          <div class="modal-body">
            <p class="mb-2">Give me a good reason to proceed this action</p>
            <div class="form-group">
              <textarea
                class="form-control"
                rows="3"
                v-model="estimateTimeChangeReason"
              ></textarea>
            </div>
            <div class="float-right">
              <button
                class="btn btn-success btn-sm"
                @click="saveEstimateTimeChange"
              >
                Submit
              </button>
              <button class="btn btn-defult btn-sm" @click="closeModal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comment: "",
      newEstimateTime: "",
      estimateTimeChangeReason: "",
      isDueDateChange: false,
      estimateTimeChange: false,
      admin_due_date: new Date(),
      isQcChangeActive: false,
      selected_employee: "",
      users: [],
    };
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
  },
  // created() {
  //   this.$store.dispatch("load_users").then((res) => {
  //     this.users = res;
  //   });
  // },
  props: ["selected_task"],
  methods: {
    getTaskColor(type) {
      if (type == 3) return "bg-warning-custom text-white";
      if (type == 4) return "bg-success text-white";
      if (type == 6) return "bg-primary text-white"; // 6 - meeting
      if (type == 7) return "bg-info text-white"; // 7 - lunch
      if (type == 8) return "bg-dark text-white"; // 8 - hold
      if (type == 9) return "bg-danger text-white"; // 9 - dayoff
      if (type == 10) return "help text-white"; // 10 - help
      if (type == 11) return "leave text-dark"; // 11 - leave
      if (type == 12) return "time_changed text-white"; // 11 - time_changed
      if (type == 13) return "reassign text-white"; // 11 - reassign
      return "bg-warning text-white";
    },

    getTaskColor2(type) {
      if (type == 3) return "text-white";
      if (type == 4) return "text-white";
      if (type == 6) return "text-white"; // 6 - meeting
      if (type == 7) return "text-white"; // 7 - lunch
      if (type == 8) return "text-white"; // 8 - hold
      if (type == 9) return "text-white"; // 9 - dayoff
      if (type == 10) return "text-white"; // 9 - help
      if (type == 11) return "text-white"; // 9 - leave
      if (type == 12) return "text-white"; // 9 - time_changed
      if (type == 13) return "text-white"; // 9 - reassign
      return "bg-warning text-white";
    },
    getTaskColor3(type) {
      if (type == 3) return "text-white";
      if (type == 4) return "text-white";
      if (type == 6) return "text-white"; // 6 - meeting
      if (type == 7) return "text-white"; // 7 - lunch
      if (type == 8) return "text-white"; // 8 - hold
      if (type == 9) return "text-white"; // 9 - dayoff
      if (type == 10) return "text-white"; // 9 - help
      if (type == 11) return "text-white"; // 9 - leave
      if (type == 12) return "text-white"; // 9 - time_changed
      if (type == 13) return "text-white"; // 9 - reassign
      return "bg-warning text-white";
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
    // save comments for activities

    saveComment(task_id) {
      this.$store
        .dispatch("save_comments", {
          task_id,
          comment: this.comment,
        })
        .then((res) => {
          this.selected_task.activities.unshift(res);
          this.comment = "";
        })
        .catch((err) => console.log(err.response));
    },

    closeModal() {
      $("#estimateTimeReasonModal").modal("hide");
      this.newEstimateTime = "";
      this.estimateTimeChangeReason = "";
      this.estimateTimeChange = false;
    },

    toggleEstimateTimeChange() {
      if (
        this.isAdmin ||
        this.isSuperAdmin ||
        this.isDirector ||
        this.isTeamLeader
      ) {
        this.newEstimateTime = "";
        this.estimateTimeChange = !this.estimateTimeChange;
      }
    },

    saveNewEstimateTime() {
      $("#estimateTimeReasonModal").modal({
        backdrop: "static",
        keyboard: false,
      });
    },

    saveEstimateTimeChange() {
      if (this.estimateTimeChangeReason.length == 5) {
        return;
      }
      this.$store
        .dispatch("change_estimate_time", {
          task_id: this.selected_task.task_id,
          last_activity_id: this.selected_task.activities[0].activity_id
            ? this.selected_task.activities[0].activity_id
            : this.selected_task.activities[0].id,
          estimate_time: this.newEstimateTime,
          reason: this.estimateTimeChangeReason,
          reasonWithTime: `${this.estimatedTime(
            this.selected_task.estimated_time
          )} to ${this.estimatedTime(this.newEstimateTime)} (${
            this.estimateTimeChangeReason
          })`,
        })
        .then((res) => {
          $("#estimateTimeReasonModal").modal("hide");
          this.selected_task.activities.unshift(res.comment);
          this.selected_task.estimated_time = this.newEstimateTime;
          this.newEstimateTime = "";
          this.estimateTimeChangeReason = "";
          this.estimateTimeChange = false;
        })
        .catch((err) => {
          $("#estimateTimeReasonModal").modal("hide");
          this.newEstimateTime = "";
          this.estimateTimeChangeReason = "";
          this.estimateTimeChange = false;
        });
    },

    setSpentTime(spent) {
      if (!spent) return;
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

    checkIfTaskEstimatedTimeHasExceeded(estimatedUnits, spentTime) {
      if (!spentTime) return;
      estimatedUnits = ((estimatedUnits * 100) / 25) * 15;
      let days = parseInt(spentTime.days);
      let hours = parseInt(spentTime.hours);
      let minutes = parseInt(spentTime.minutes);
      if (days != "00") minutes += days * 24 * 60;
      if (hours != "00") minutes += hours * 60;
      if (Math.sign(estimatedUnits - minutes) == -1) {
        // return "pt-1 pb-1 pl-2 pr-2 rounded bg-danger text-white";
        return "text-danger";
      } else {
        // return "pt-1 pb-1 pl-2 pr-2 rounded bg-success text-white";
        return "text-success";
      }
    },

    showDueDateChangeField(task) {
      this.admin_due_date = new Date();
      this.isDueDateChange = !this.isDueDateChange;
    },

    changeQcName(qc_employee) {
      this.selected_task.qc_name = qc_employee;
    },

    updateTaskDueDate(task) {
      const loader = this.$loading.show();
      this.$store
        .dispatch("change_task_due_date", {
          task_user_id: task.task_user_id,
          new_due_date: this.admin_due_date,
        })
        .then((res) => {
          // const changedTask = this.tasksData.find(el => el.task_user_id == task.task_user_id)
          // const index = this.tasksData.findIndex(el => el.task_user_id == task.task_user_id);
          // changedTask.duedate = moment(this.admin_due_date).format("DD/MM/YYYY");
          // changedTask.due_date = moment(this.admin_due_date).format("DD/MM/YYYY");

          // this.tasksData.splice(index, 1, changedTask);
          this.isDueDateChange = false;
          this.selected_task.due_date = this.admin_due_date;
          swal("Success!", "Due date changed", "success", {
            timer: 3000,
          });
          loader.hide();
        })
        .catch((err) => {
          swal("Error!", `${err.response.data.message}`, "error", {
            timer: 3000,
          });
          loader.hide();
        });
    },

    showDueDateHistoryModal() {
      $("#exampleModalCenter").modal("show");
    },

    changeQcEmployee() {
      $("#qcchangemodal").modal("show");
    },
  },
};
</script>

<style>
.task-card-button {
  background-color: rgba(201, 200, 200, 0.5);
  border: 1px none solid;
  width: 220px;
  padding: 5px 10px;
  margin: 5px 0px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}
.btn-custom {
  height: 38px;
  padding: 7px 20px 25px 20px;
  margin-right: 10px;
  margin-top: -15px;
}
.bg-warning-custom {
  background-color: #f58442;
}
.bg-danger-custom {
  background-color: #ee3d31;
}
.ps {
  height: 380px;
}
.ps-2 {
  height: 550px;
}
.ps-3 {
  height: 320;
}
.qc_task {
  background-color: rgba(184, 218, 247, 0.308);
  margin: 0 0 0 10px;
}
.help {
  background-color: rgba(131, 66, 235, 0.575);
  margin: 0 0 0 10px;
}
.leave {
  background-color: rgba(238, 79, 166, 0.308);
  margin: 0 0 0 10px;
}
.time_changed {
  background-color: rgba(9, 173, 160, 0.973);
  margin: 0 0 0 10px;
}
.reassign {
  background-color: rgba(158, 11, 202, 0.973);
  margin: 0 0 0 10px;
}
</style>
