<template>
  <div class="mb-5" v-if="selected_task.id">
    <!-- show task details if no Job -->
    <div class="ml-4 mt-4 d-flex justify-content-between align-items-start" v-if="!job">
      <div class="d-flex flex-column">
        <h4 class="modal-title">
          <i class="fa fa-window-maximize mr-3" style="font-size: 17px" aria-hidden="true"></i>
          {{ selected_task.task_title || selected_task.task_name }} 
        </h4>
        <p
          style="margin-left: 35px; font-size: 13px"
          class="text-muted"
        >in list {{ selected_task.current_status | sectionName }} </p>
      </div>
      <button type="button" class="close mr-3" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true" style="font-size: 27px">&times;</span>
      </button>
    </div>
    <div class="ml-4 mt-4 d-flex justify-content-between align-items-start" v-if="job">
      <div class="d-flex flex-column">
        <h4 class="modal-title">
          <i class="fa fa-window-maximize mr-3" style="font-size: 17px" aria-hidden="true"></i>
          {{ job.job_no }} - {{job.system}}
        </h4>
        <p
          style="margin-left: 35px; font-size: 13px"
          class="text-muted"
        >{{job.job_description}} <br> {{job.customer_name}} ({{job.customer_id}}) </p>
      </div>
      <button type="button" class="close mr-3" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true" style="font-size: 27px">&times;</span>
      </button>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="ml-4 mt-3">
          <h6>
            <i class="fa fa-align-left mr-3" style="font-size: 17px" aria-hidden="true"></i>Description
          </h6>
          <p style="margin-left: 33px; font-size: 13px">{{selected_task.task_no}}. {{ selected_task.task_description }}</p>
        </div>
        <!-- Activity Main Section -->

        <div class="ml-4 mt-4" v-if="selected_task.current_status != '1'">
          <h6>
            <i class="fa fa-align-left mr-3" style="font-size: 17px" aria-hidden="true"></i>Activities
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
                <div v-if="!activity.section_name" class="d-flex align-items-center">
                  <img
                    :src="setProfileImage(activity)"
                    style="margin-left: 13px; width: 35px; height: 35px"
                    class="img-radius"
                    alt="User-Profile-Image"
                  />
                  <div
                    class="d-flex flex-column align-items-start card card-body"
                    style=" margin: 0 0 0 10px; padding: 6px 12px 8px 0px; width: 100%"
                    :class="getTaskColor(activity.comment_type)"
                  >
                    <p style="font-size: 13px; margin-left: 13px;">
                      <span
                        style="font-weight: bold; font-size: 14px"
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
                    <div style="margin-left: 13px; margin-top: -15px; font-size: 11px">
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
            <i class="fa fa-align-left mr-3" style="font-size: 17px" aria-hidden="true"></i>Activities
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
          <i class="fas fa-paperclip mr-3" style="font-size: 15px" aria-hidden="true"></i>Attachment
        </div>
        <div class="mt-5" style="line-height: 0.5">
          <h6>
            <i class="far fa-clock mr-2" style="font-size: 16px" aria-hidden="true"></i>Due Date
          </h6>
          <p
            style="margin-left: 24px; font-size: 14px; font-weight: 700"
            class="text-primary"
          >{{ selected_task.task_due_date | formattedDate4 }}</p>
        </div>
        <div class="mt-4" style="line-height: 0.5">
          <h6>
            <i class="feather icon-calendar" style="font-size: 16px"></i>
            Plan Date
          </h6>
          <p
            style="margin-left: 24px; font-size: 14px; font-weight: 700"
            class="text-primary"
          >{{ selected_task.task_plan_date | formattedDate4 }}</p>
          <!-- <div v-if="selected_task.current_status == '1'" class="pr-5">
            <div class="form-group row">
              <div class="col-sm-12">
                <div class="d-flex">
                  <v-date-picker
                    style="z-index: 200"
                    v-model="plan_date"
                    :popover="{ visibility: 'click' }"
                    :min-date="new Date()"
                  />
                </div>
              </div>
            </div>
            <button
              class="btn btn-success btn-custom w-100"
              @click="addPlanDate(selected_task)"
            >save</button>
          </div>
          <p
            v-else
            style="margin-left: 24px; font-size: 14px; font-weight: 700"
            class="text-primary"
          >{{ selected_task.task_plan_date | formattedDate4 }}</p>-->
        </div>
        <div class="mt-4" style="line-height: 0.5">
          <h6>
            <i class="far fa-user mr-2" style="font-size: 16px"></i>Contact Person
          </h6>
          <p
            style="margin-left: 24px; font-size: 14px; font-weight: 700"
            class="text-primary"
          >{{ selected_task.contact_person }}</p>
        </div>
        <div class="mt-4" style="line-height: 0.5">
          <h6>
            <i class="fas fa-phone mr-2" style="font-size: 16px; opacity: 0.7" aria-hidden="true"></i>Contact Number
          </h6>
          <p
            style="margin-left: 24px; font-size: 14px; font-weight: 700"
            class="text-primary"
          >{{ selected_task.contact_number }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "taskHistory",
    data() {
        return {
            selected_task: {
                activities: [],
            },
            comment: "",
            job: {},
        };
    },
    filters: {
        sectionName: function (value) {
            switch (value) {
                case 1:
                    return "Back Log";
                    break;
                case 2:
                    return "Picked";
                    break;
                case 3:
                    return "Ongoing";
                    break;
                case 4:
                    return "Hold";
                    break;
                case 5:
                    return "QC";
                    break;
                case 6:
                    return "Finished";
                    break;
                default:
                    break;
            }
        },
    },
    methods: {
        setValues(task) {
            console.log(task);
            this.selected_task = {
                ...task.task,
                task_plan_date: task.task.pivot.plan_date,
                task_due_date: task.task.pivot.due_date,
            };
            this.loadTaskDetails(task);
            this.getJobDetails(task.task.job_id);
        },
        getJobDetails(job_id) {
            this.$store.dispatch("getJobById", job_id).then((job) => {
              console.log(job);
                this.job = job || null;
                this.selected_task.contact_person = job.contact_person
                this.selected_task.contact_number = job.contact_number
            });
        },
        loadTaskDetails(task) {
            let req = {
                task_id: task.task.pivot.task_id,
                user_id: task.task.pivot.user_id,
            };
            this.$store.dispatch("single_task", req).then((res) => {
                // console.log(res);
                this.selected_task.activities = res;
                console.log(this.selected_task);
            });
        },
        saveComment(task_id) {
            this.$store
                .dispatch("save_comments", { task_id, comment: this.comment })
                .then((res) => {
                    this.selected_task.activities.unshift(res);
                    this.comment = "";
                })
                .catch((err) => console.log(err.response));
        },

        // change task card collor according to qc status

        getTaskColor(type) {
            if (type == 3) return "bg-warning-custom text-white";
            if (type == 4) return "bg-success text-white";
            if (type == 6) return "bg-primary text-white"; // 6 - meeting
            if (type == 7) return "bg-info text-white"; // 7 - lunch
            if (type == 8) return "bg-dark text-white"; // 8 - hold
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
            if (activity) return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH + activity.image}`;
            return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH}default.png`;
        },
        setProfileImage2(user) {
            if (user && user.employee) return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH + user.employee.image}`;
            return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH}default.png`;
        },
    },
};
</script>

<style scoped>
</style>