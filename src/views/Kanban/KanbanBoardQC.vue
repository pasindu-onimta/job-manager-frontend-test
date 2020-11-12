<template>
  <div class="pcoded-content">
    <PageHeader
      :title="'QC Job No - ' + $route.query.job_no"
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

            <div class="bit top right" data-position="top right"></div>
            <div class="d-flex" style="overflow: auto; height: 75vh">
              <div
                class="col-md-3 col-sm-6"
                v-for="section in sectionsArr"
                :key="section.id"
              >
                <div class="card text-black" style="background-color: #ebecf0">
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
                    <draggable
                      class="list-group kanban-column"
                      :list="section.tasks"
                      group="tasks"
                      :animation="200"
                      :move="checkMove"
                    >
                      <div
                        class="card text-dark mt-0 cursor-move"
                        v-for="element in section.tasks"
                        :key="element.id"
                        :class="{ 'card-info': element.locked }"
                        style="margin-bottom: 10px"
                        @dragend="dragging(element, section.id)"
                        @click="loadTaskDetails(element)"
                      >
                        <div
                          class="card-block"
                          :sectionId="section.id"
                          :class="{ 'text-white': element.locked }"
                          style="border-radius: 20px"
                        >
                          <div class="d-flex justify-content-between">
                            <h6>{{ element.job_no }}</h6>
                            <h6>{{ element.task_no }}</h6>
                          </div>
                          <p style="font-size: 13px">
                            {{ element.task_name }}
                          </p>
                        </div>
                      </div>
                    </draggable>
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
import draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "KanbanBoard",
  components: {
    PageHeader,
    draggable,
  },
  data() {
    return {
      newTask: "",
      plan_date: new Date(),
      sectionsArr: [],
      sectionsArr_copy: [],
      tasks: [],
      dragged_task_id: "",
      current_section_id: "",
      last_moved_section_id: "",

      first_section_list: [],
      second_section_list: [],
      selected_task: {},
      comment: "",
      search: "",
    };
  },
  computed: {
    ...mapGetters(["sections"]),
    filteredTasks: function () {
      console.log("asasasas");
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
      "save_comments",
      "change_ongoing_task",
      "change_ongoing_qc_task",
      "setPlanDate",
    ]),
    checkMove(evt) {
      // this.current_section_id = evt.draggedContext.element.current_status;
      // this.dragged_task_id = evt.draggedContext.element.id;
      // return evt.draggedContext.element.locked ? false : true;
      if (evt.draggedContext.element.task_plan_date != null) {
        return true;
      }
      return false;
    },
    dragging(task, group) {
      this.current_section_id = group;
      this.dragged_task_id = task.id;
      // const sectionsArr_copy = this.sectionsArr;
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
          if (xx[0] == 7 || xx[0] == 8) {
            swal({
              title: "Are you sure?",
              text:
                "Once you move this task into these sections, this job will automatically marked as finished. Do you want to proceed?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willMove) => {
              if (willMove) {
                if (xx[0] == 7) {
                  swal("What would be need to fix ?", {
                    content: "input",
                  }).then((value) => {
                    if (value != null) {
                      this.change_ongoing_qc_task({
                        task: task.id,
                        newSection: xx[0],
                        previousSection: group,
                        qc_message: value,
                      }).then((res) => {
                        swal("Success! Ongoing task changed!", {
                          icon: "success",
                        });
                        this.processTasks();
                      });
                    } else {
                      this.processTasks();
                    }
                  });
                } else if (xx[0] == 8) {
                  this.change_ongoing_qc_task({
                    task: task.id,
                    newSection: xx[0],
                    previousSection: group,
                    qc_message: "Task Passed",
                  }).then((res) => {
                    swal("Success! Ongoing task changed!", {
                      icon: "success",
                    });
                    this.processTasks();
                  });
                }
              } else {
                this.processTasks();
              }
            });
          } else {
            this.activities({
              task: task.id,
              newSection: xx[0],
              previousSection: group,
              taskUserId: task.task_user_id,
            })
              .then((_) => {
                swal("Good job!", "Task moved successfully", "success", {
                  timer: 2000,
                });
                this.first_section_list = this.second_section_list;
                this.$forceUpdate();
              })
              .catch((err) => {
                if (err.response.data.status == 1) {
                  // swal(
                  //   "Error!",
                  //   "You have another task in another job on ongoing section",
                  //   "error",
                  //   {
                  //     timer: 2000
                  //   }
                  // );
                  // this.processTasks();
                  swal({
                    title: "Are you sure?",
                    text:
                      "There is a task already on ongoing. Do you want to move that task to hold?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then((willMove) => {
                    if (willMove) {
                      this.change_ongoing_task({
                        task: task.id,
                        newSection: xx[0],
                        previousSection: group,
                      }).then((res) => {
                        swal("Success! Ongoing task changed!", {
                          icon: "success",
                        });
                      });
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
                } else {
                  swal(
                    "Error!",
                    "You already have a task on ongoing section !",
                    "error",
                    { timer: 2000 }
                  );
                  this.processTasks();
                }
                // this.sectionsArr = [];
                // this.second_section_list = [];
                // Vue.set(this.sectionsArr, this.sectionsArr_copy);
                // this.sectionsArr = sectionsArr_copy[1];
                // this.$forceUpdate();
              });
          }
        }
      }, 200);
    },

    // load individual task details

    loadTaskDetails(task) {
      this.selected_task = {};
      this.single_task({ task: task.id, mode: "qc" })
        .then((res) => {
          this.selected_task = res.details;
          this.selected_task.activities = res.activitiesWithComments;
          this.selected_task.task_title =
            res.activitiesWithComments.length != 0
              ? res.activitiesWithComments[0].task_title
              : task.task_name;
          $("#large-Modal5").modal("show");
        })
        .catch((err) => console.log(err.response));
    },

    // save comments for activities

    saveComment(task_id) {
      this.save_comments({ task_id, comment: this.comment })
        .then((res) => {
          this.selected_task.activities.unshift(res);
          this.comment = "";
        })
        .catch((err) => console.log(err.response));
    },

    // save task plan date

    addPlanDate(task) {
      this.setPlanDate({
        task_user_id: task.task_user_id,
        plan_date: this.plan_date,
      })
        .then((res) => {
          swal("Good job!", "Task plan date added", "success", {
            timer: 2000,
          });
        })
        .catch((err) => {
          swal("Error!", `${err.response.data.message}`, "error", {
            timer: 3000,
          });
        });
    },

    // change task card collor according to qc status

    getTaskColor(type) {
      if (type == 3) return "bg-warning-custom text-white";
      if (type == 4) return "bg-success text-white";
      return "bg-default text-dark";
    },

    getTaskColor2(type) {
      if (type == 3) return "text-white";
      if (type == 4) return "text-white";
      return "text-dark";
    },
    getTaskColor3(type) {
      if (type == 3) return "text-white";
      if (type == 4) return "text-white";
      return "text-dark";
    },

    processTasks() {
      this.sectionsArr = [];
      this.load_sections(2).then((res) => {
        res.forEach((element) => {
          element.tasks = [];
        });
        this.sectionsArr = res;

        this.load_tasks({
          job_id: this.$route.query.id,
          job_user_id: this.$route.query.job_user_id,
          job_type: 2,
        }).then((res) => {
          if (res.length == 0) {
            this.$router.push({ name: "QC" });
          }
          this.sectionsArr.forEach((sec) => {
            res.forEach((el) => {
              // if (el.current_status == sec.id) {
              //######## old #########
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
    this.load_sections(2).then((res) => {
      res.forEach((element) => {
        element.tasks = [];
      });
      this.sectionsArr = res;

      this.load_tasks({
        job_id: this.$route.query.id,
        job_user_id: this.$route.query.job_user_id,
        job_type: 2,
      }).then((res) => {
        this.sectionsArr.forEach((sec) => {
          res.forEach((el) => {
            // if (el.current_status == sec.id) {
            //######## old #########
            if (el.current_section == sec.id) {
              sec.tasks.push(el);
            }
          });
        });

        let arr = [];
        this.sectionsArr.forEach((el) => {
          arr.push({ section: el.id, length: el.tasks.length });
        });

        this.$store.dispatch("notifications").then((res) => {
          console.log("notification hari");
        });
        this.first_section_list = arr;
      });
    });
  },
};
</script>

<style>
/* light stylings for the kanban columns */
.kanban-column {
  min-height: 10px;
  max-height: 65vh;
  overflow: auto;
}

.kanban-column::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE and Edge */
.kanban-column {
  -ms-overflow-style: none;
}
</style>
