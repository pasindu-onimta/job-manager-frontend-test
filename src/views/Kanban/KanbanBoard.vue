<template>
  <div class="pcoded-content">
    <PageHeader
      :title="'Job No - ' + $route.query.job_no + ' (' + customer_name + ')'"
      path="/jobs"
      description
    ></PageHeader>
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <!-- Task Detail Modal Start -->

            <div
              class="modal fade"
              id="large-Modal"
              tabindex="-1"
              role="dialog"
            >
              <div class="modal-dialog modal-lg" role="document">
                <activity-modal-content
                  :selected_task="selected_task"
                ></activity-modal-content>
              </div>
            </div>

            <!-- Task Authorization Modal -->

            <div
              class="modal fade"
              id="authorizationModel"
              tabindex="-1"
              role="dialog"
            >
              <div
                class="modal-dialog modal-md modal-dialog-centered"
                role="document"
              >
                <div class="modal-content">
                  <div class="mb-5">
                    <div
                      class="ml-4 mr-3 mt-3 d-flex justify-content-between align-items-start"
                    >
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <h4 class="modal-title">
                          <i class="fas fa-exclamation-triangle mr-2"></i>
                          Need Task Authorization
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
                    <div class="modal-body">
                      <div class="form-group">
                        <label class="ml-3">Send request to</label>
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
                      <div class="float-right mt-2">
                        <button
                          class="btn btn-info btn-md mr-1"
                          @click="sendApproveRequest"
                        >
                          <i class="fas fa-paper-plane mr-2"></i> Send
                        </button>
                        <button
                          class="btn btn-default btn-md"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Task Authorization Modal End -->

            <!-- Task Detail Modal End -->

            <div class="bit top right" data-position="top right"></div>
            <perfect-scrollbar class="ps-2">
              <div class="d-flex">
                <div
                  class="col-md-3 col-sm-6"
                  v-for="section in sectionsArr"
                  :key="section.id"
                >
                  <div
                    class="card text-black"
                    style="background-color: #ebecf0"
                  >
                    <div class="card-block">
                      <h6>{{ section.section_name }}</h6>
                      <div class="m-b-10">
                        <form>
                          <input
                            type="text"
                            style="
                              height: 30px;
                              width: 100%;
                              border-radius: 5px;
                              border: none;
                            "
                            class="form-control form-control-round"
                            v-model="search"
                            placeholder="Search.."
                          />
                        </form>
                      </div>
                      <vue-scroll :ops="ops">
                        <div class="section-custom" style="max-height: 400px">
                          <draggable
                            class="list-group"
                            :list="section.tasks"
                            group="tasks"
                            :animation="200"
                            :move="checkMove"
                          >
                            <div
                              class="card mt-0 cursor-move"
                              v-for="element in section.tasks"
                              :key="element.id"
                              :class="taskCardColor(element)"
                              style="margin-bottom: 10px"
                              @dragend="dragging(element, section.id)"
                              @click="loadTaskDetails(element)"
                            >
                              <div
                                class="card-block"
                                :sectionId="section.id"
                                :class="{ 'text-white': element.on_qc_process }"
                                style="border-radius: 20px"
                              >
                                <div class="d-flex justify-content-between">
                                  <!-- <h6>{{ element.task_title }}</h6> -->
                                  <h6>{{ element.task_no }}</h6>
                                </div>
                                <p style="font-size: 13px">
                                  {{ element.task_name }}
                                </p>
                                <!-- <div class="d-flex justify-content-end">
                                <label class="label label-danger pb-2">Bugs</label>
                                </div>-->
                              </div>
                            </div>
                          </draggable>
                        </div>
                      </vue-scroll>
                    </div>
                  </div>
                </div>
              </div>
            </perfect-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase";
import PageHeader from "@/components/PageHeader";
import draggable from "vuedraggable";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "KanbanBoard",
  components: {
    PageHeader,
    draggable,
  },
  data() {
    return {
      ops: {
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: "#c1c1c1",
          opacity: 1,
          specifyBorderRadius: false,
          minSize: 0,
          size: "6px",
          disable: false,
        },
      },
      newTask: "",
      plan_date: new Date(),
      sectionsArr: [],
      sectionsArr_copy: [],
      tasks: [],
      dragged_task_id: "",
      dragged_task_user_id: "",
      dragged_task_job_id: "",
      current_section_id: "",
      last_moved_section_id: "",
      users: [],
      first_section_list: [],
      second_section_list: [],
      selected_task: {},
      comment: "",
      search: "",
      customer_name: "",
      selected_employee: "",
    };
  },
  computed: {
    ...mapGetters(["sections"]),
    filteredTasks: function () {
      // if (this.jobs.filter) {
      //   return this.jobs.filter(job => {
      //     return job.job_no.match(this.search);
      //   });
      // }
    },
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
  validators: {
    selected_employee: function (value) {
      return Validator.value(value).required("Please select an employee");
    },
  },
  // watch: {
  //   "backLog.tasks": function(val, old) {
  //     console.log("backLog changed" + val);
  //   },
  // },
  methods: {
    ...mapActions([
      "load_sections",
      "load_tasks",
      "activities",
      "single_task",
      "change_ongoing_task",
      "setPlanDate",
    ]),

    sendApproveRequest() {
      this.$validate().then((success) => {
        if (success) {
          const loader = this.$loading.show();
          this.$store
            .dispatch("sendApproveRequestToAdmin", {
              task_user_id: this.dragged_task_user_id,
              job_id: this.dragged_task_job_id,
              request_to: this.selected_employee,
              request_by: this.$store.getters.user.id,
            })
            .then(() => {
              loader.hide();
              $("#authorizationModel").modal("hide");
              swal("Good job!", "Request send successfully", "success", {
                timer: 2000,
              });
            });
        }
      });
    },

    taskCardColor(element) {
      // if (element.task_plan_date == null) {
      let currentDate = new Date();
      let dueDate = moment(element.task_due_date).add(1, "days");
      dueDate = new Date(dueDate);
      let result = currentDate.getTime() > dueDate.getTime();
      if (!element.hasAuthorized) {
        return "bg-info text-white";
      }
      if (result) {
        return "bg-danger text-white";
      }
      // }
      // return '';
    },

    checkMove(evt) {
      // this.current_section_id = evt.draggedContext.element.current_status;
      // this.dragged_task_id = evt.draggedContext.element.id;
      if (evt.draggedContext.element.task_plan_date != null) {
        return true;
      }
      return false;
      // return evt.draggedContext.element.on_qc_process ? false : true;
    },
    dragging(task, group) {
      this.current_section_id = group;
      this.dragged_task_id = task.id;
      this.dragged_task_user_id = task.task_user_id;
      this.dragged_task_job_id = task.job_id;
      // this.sectionsArr_copy = [...this.sectionsArr];
      setTimeout(() => {
        let arr = [];
        this.sectionsArr.forEach((el) => {
          arr.push({ section: el.id, length: el.tasks.length });
        });
        this.second_section_list = arr;
        let sse;
        const xx = this.second_section_list
          .filter((el, index) => {
            sse = el;
            const fse = this.first_section_list[index];
            if (fse.length != sse.length) {
              return sse.section;
            }
          })
          .map((el) => el.section)
          .filter((el) => el != group);

        if (xx[0] !== undefined) {
          const loader = this.$loading.show();
          this.activities({
            task: task.id,
            newSection: xx[0],
            previousSection: group,
            taskUserId: task.task_user_id,
          })
            .then((res) => {
              //FIXME:remove isBugged color
              if (res.isQcTaskAssignd) {
                // add record to firebase firestore
                db.collection("tasks")
                  // .doc("emp" + res.assigned_emp)
                  .doc("qc_tasks")
                  .set({
                    notification_id: 2,
                    status: 1,
                    user_id: res.user_id,
                    timestamp: new Date(),
                  })
                  .then(function (docRef) {
                    swal("Good job!", "Task moved successfully", "success", {
                      timer: 2000,
                    });
                  });
              } else {
                swal("Good job!", "Task moved successfully", "success", {
                  timer: 2000,
                });
              }
              this.first_section_list = this.second_section_list;
              this.$forceUpdate();
              loader.hide();
            })
            .catch((err) => {
              loader.hide();
              if (err.response.data.status == 1) {
                swal({
                  title: "Are you sure?",
                  text:
                    "There is a task already on ongoing. Do you want to move that task to hold?",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willMove) => {
                  if (willMove) {
                    const loader2 = this.$loading.show();
                    this.change_ongoing_task({
                      task: task.id,
                      newSection: xx[0],
                      previousSection: group,
                    }).then((res) => {
                      swal("Success! Ongoing task changed!", {
                        icon: "success",
                      });
                    });
                    loader2.hide();
                  } else {
                    this.processTasks();
                  }
                });
              } else if (err.response.data.status == 3) {
                swal(
                  "Error!",
                  "This task is currently doing by someone",
                  "error",
                  {
                    timer: 2000,
                  }
                );
                this.processTasks();
              } else if (err.response.data.status == 4) {
                swal("Error!", "Invalid Section", "error", {
                  timer: 2000,
                });
                this.processTasks();
              } else if (err.response.data.status == 8) {
                $("#authorizationModel").modal("show");
                this.processTasks();
              } else {
                swal("Error!", `${err.response.data.message}`, "error", {
                  timer: 2000,
                });
                this.processTasks();
              }
            });
        }
      }, 200);
    },

    // load individual task details

    loadTaskDetails(task) {
      this.selected_task = {};
      this.single_task(task.id)
        .then((res) => {
          this.selected_task = res.details;
          this.selected_task.activities = res.activitiesWithComments;
          this.selected_task.task_title =
            res.activitiesWithComments.length != 0
              ? res.activitiesWithComments[0].task_title
              : task.task_name;
          $("#large-Modal").modal("show");
        })
        .catch((err) => console.log(err.response));
    },

    // save task plan date

    // addPlanDate(task) {
    //   this.setPlanDate({
    //     task_user_id: task.task_user_id,
    //     plan_date: this.plan_date
    //   })
    //     .then(res => {
    //       swal("Good job!", "Task plan date added", "success", {
    //         timer: 2000
    //       });
    //     let changedTask;
    //     this.sectionsArr.forEach(sec => {
    //       changedTask = sec.tasks.find(el => el.id == task.id)
    //       if (changedTask) {
    //         const index = sec.tasks.findIndex(el => el.id == task.id)
    //         changedTask.task_plan_date = this.plan_date;
    //         sec.tasks.splice(index, 1, changedTask);
    //       }
    //     });

    //     })
    //     .catch(err => {
    //       swal("Error!", `${err.response.data.message}`, "error", {
    //         timer: 3000
    //       });
    //     });
    // },

    processTasks() {
      this.sectionsArr = [];
      this.load_sections(1).then((res) => {
        res.forEach((element) => {
          element.tasks = [];
        });
        this.sectionsArr = res;

        this.load_tasks({
          job_id: this.$route.query.id,
          job_user_id: this.$route.query.job_user_id,
          job_type: 1,
        }).then((res) => {
          this.sectionsArr.forEach((sec) => {
            res.forEach((el) => {
              if (el.current_section == sec.id) {
                sec.tasks.push(el);
              }
            });
          });

          let arr = [];
          this.sectionsArr.forEach((el) => {
            arr.push({ section: el.id, length: el.tasks.length });
          });
          this.first_section_list = arr;
        });
      });

      // this.$forceUpdate();
    },
  },

  mounted() {
    // this.processTasks();
  },

  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    this.processTasks();
    this.$store.dispatch("notifications");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");
    next();
  },

  created() {
    const loader = this.$loading.show();
    this.load_sections(1).then((res) => {
      res.forEach((element) => {
        element.tasks = [];
      });
      this.sectionsArr = res;

      this.load_tasks({
        job_id: this.$route.query.id,
        job_user_id: this.$route.query.job_user_id,
        job_type: 1,
      }).then((res) => {
        this.customer_name = res[0].customer_name;
        this.sectionsArr.forEach((sec) => {
          res.forEach((el) => {
            if (el.current_section == sec.id) {
              sec.tasks.push(el);
            }
          });
        });

        let arr = [];
        this.sectionsArr.forEach((el) => {
          arr.push({ section: el.id, length: el.tasks.length });
        });

        this.$store.dispatch("notifications").then((res) => {});
        this.first_section_list = arr;
        loader.hide();
      });
    });
    this.$store.dispatch("load_users").then((res) => {
      this.users = res;
    });
  },
};
</script>

<style>
.message {
  color: red;
  font-size: 12px;
  margin-left: 5px;
}
/*
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
  background-color: rgba(131, 66, 235, 0.308);
  margin: 0 0 0 10px;
}
.leave {
  background-color: rgba(238, 79, 166, 0.308);
  margin: 0 0 0 10px;
}
 */
</style>
