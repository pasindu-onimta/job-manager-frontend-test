<template>
  <div class="pcoded-content">
    <PageHeader title="Plan" path description="Emplyee Calender"></PageHeader>
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label>Employee</label>
                  <v-select
                    label="name"
                    v-model="emp"
                    :options="employees"
                    :reduce="(employees) => employees"
                    placeholder="Select an employee.."
                    v-on:input="employeeSelected($event)"
                  ></v-select>
                </div>
                <div id="scroll-bar">
                  <div
                    class="col-md-12 col-md-offset-12 col-sm-12 col-sm-offset-12 acordian-scroll"
                    id="external-events"
                  >
                    <div class="fancy-collapse-panel">
                      <div
                        class="panel-group"
                        id="accordion"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        <div
                          class="panel panel-default"
                          v-for="job in jobs"
                          :key="job.pivot.id"
                          style="cursor: pointer"
                        >
                          <div class="panel-heading" role="tab" id="headingOne">
                            <h4 class="panel-title">
                              <a
                                class="bg-primary"
                                data-toggle="collapse"
                                data-parent="#accordion"
                                :data-target="'#' + job.pivot.id"
                                aria-expanded="true"
                                aria-controls="job.pivot.id"
                              >
                                {{ job.job_no }}
                                {{
                                  job.customer_name
                                    ? "-" + job.customer_name
                                    : ""
                                }}
                                <br />
                                <small
                                  >{{ job.job_description.slice(0, 50) }}
                                  {{
                                    job.job_description.length > 50 ? "..." : ""
                                  }}</small
                                >
                              </a>
                            </h4>
                          </div>
                          <div
                            :id="job.pivot.id"
                            class="panel-collapse collapse in"
                            role="tabpanel"
                            :aria-labelledby="job.pivot.id"
                            data-parent="#external-events"
                          >
                            <div
                              class="fc-event"
                              v-bind:class="{ 'qc-task': task.qc_id == 0 }"
                              :data-color="
                                task.qc_id == 0 ? '#ff7513' : '#3795d8'
                              "
                              v-for="task in job.tasks"
                              :key="task.id"
                              :data-event="task"
                              @mousedown="taskClick(task)"
                            >
                              {{
                                task.task_no +
                                " - " +
                                task.task_name +
                                " (" +
                                task.Time02 +
                                " Hrs)"
                              }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <FullCalendar
                  ref="fullCalendar"
                  id="cal"
                  :options="calendarOptions"
                />
                <div class="row">
                  <div class="col-md-12">
                    <!-- <button class="btn btn-sm btn-success" v-on:click="toggleDay()">Toggle shit</button> -->
                    <div class="form-check" style="margin-top: 10px">
                      <input
                        type="checkbox"
                        v-model="calendarOptions.dayMaxEvents"
                        class="form-check-input"
                        id="exampleCheck1"
                      />
                      <label class="form-check-label" for="exampleCheck1"
                        >Collaps Daily Events</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="md-overlay"></div>
        </div>
      </div>
    </div>

    <!-- Activity Modal -->
    <div
      class="modal fade"
      id="createActivity"
      tabindex="-1"
      role="dialog"
      aria-labelledby="activityPlanLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <CreateActivity ref="createActivity"></CreateActivity>
        </div>
      </div>
    </div>
    <!-- /Activity Modal -->

    <!-- Task Detail Modal Start -->
    <div class="modal fade" id="taskHistory" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <activity-modal-content
          :selected_task="selected_task"
        ></activity-modal-content>
      </div>
    </div>
    <!-- Task Detail Modal End -->
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import FullCalendar, {
  elementClosest,
  renderMicroColGroup,
} from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import TaskHistory from "./TaskHistory";
import CreateActivity from "./CreateActivityPlan";
import moment from "moment";
export default {
  name: "Plan",
  components: {
    PageHeader,
    FullCalendar,
    TaskHistory,
    CreateActivity,
  },
  data() {
    return {
      calendarOptions: {
        themeSystem: "bootstrap",
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        hiddenDays: [0],
        businessHours: [
          { daysOfWeek: [1, 2, 3, 4, 5], startTime: "08:30", endTime: "17:30" },
          { daysOfWeek: [6], startTime: "08:30", endTime: "13:30" },
        ],
        selectOverlap: false,
        // slotMinTime: "00:00:00",
        // maxTime: "11:59:00",
        eventOverlap: function (stillEvent, movingEvent) {
          // console.log(1, stillEvent.allDay, stillEvent);
          // console.log(2, movingEvent.allDay, movingEvent);
          return !stillEvent._def.extendedProps.otherTask;
        },
        viewDidMount: function (view, element) {
          $.each($(".fc-daygrid-day "), function (key, val) {
            var dateYMD = $(this).attr("data-date");
            // console.log($($(this)[0].childNodes[0]));
            // console.log(this);
            // console.log($(this).find("fc-daygrid-day-frame"));
            // $(this).append(`<div class="fc-dailytotal" id='dailytotal-" + dateYMD + "'></div>`);
            // $(this)[0].childNodes[0].append(`<div class="fc-dailytotal" id='dailytotal-" + dateYMD + "'></div>`);
            // $(this).find("fc-daygrid-day-frame").append(<div class="fc-dailytotal" id='dailytotal-${dateYMD}'></div>);
            //  $(this).prepend(`<div class="fc-dailytotal" id='dailytotal-${dateYMD}'></div>`);
            $(this).find(".fc-daygrid-day-top").append(`
            <span style="
                    width: 100%;
                    margin-left: 5px;
                    color: #0066a2;
                    font-size: 15px;
                    font-weight: bolder;" class="fc-dailytotal" id='dailytotal-${dateYMD}'></span>`);
          });
        },
        eventContent: function (event, element, view) {
          $(".fc-dailytotal").text(null); //Clear total sum
        },
        eventDidMount: function (event, element, view) {
          // console.log(2, "dateYMD", event, event.event.end, event.event.start);
          var currentday = moment(event.event.start).format("YYYY-MM-DD");
          var start = moment(event.event.start);
          var end = moment(event.event.end);
          var duration = moment.duration(end.diff(start));

          if (duration > 0) {
            var prev =
              $("#dailytotal-" + currentday)
                .text()
                .slice(0, -2) || 0; //slice to remove ' H';
            console.log(prev, duration.asHours());
            $("#dailytotal-" + currentday).text(
              `${
                +parseFloat(prev).toFixed(2) + +duration.asHours().toFixed(2)
              } H`
            );
          }
        },
        dateClick: this.handleDateClick,
        select: this.handleDateClick,
        eventClick: this.handleEventClick,
        eventResize: this.handleEventChange,
        eventDragStart: this.internalDragStart,
        eventDrop: this.handleEventChange,
        eventReceive: this.handleEventChange,
        initialView: "dayGridMonth",
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        droppable: true,
        events: [],
      },
      employees: [],
      emp: {},
      jobs: [],
      selectedTask: null,
      selected_task: {},
    };
  },

  watch: {},
  created() {
    this.$store.dispatch("load_users").then((employees) => {
      this.employees = employees;
    });
    setTimeout(() => {
      if (this.$route.query.emp) {
        this.emp.id = this.$route.query.emp;
      } else {
        this.emp.id = this.$store.getters.user.employee_id;
      }
      this.employeeSelected({ id: this.emp.id });
      this.emp = this.employees.filter(
        (element) => element.id == this.emp.id
      )[0];
    });
    setTimeout(() => {
      this.draggable();
    }, 1000);
  },

  mounted() {},
  methods: {
    draggable() {
      var containerEl = document.getElementById("external-events");
      if (containerEl) {
        new Draggable(containerEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            // console.log(eventEl.dataset.color);
            return {
              title: eventEl.innerText,
              color: eventEl.dataset.color,
            };
          },
        });
      }
    },
    setExternalTask(task) {},

    getTasks(userId) {
      const today = new Date();
      this.$store.dispatch("get_users_tasks", userId).then((res) => {
        // console.log(res);
        this.calendarOptions.events = res.tasks.map((element) => {
          return {
            id: element.pivot.id,
            title: `
                ${element.task_no} ${element.task_name}
                 <
                     ${Math.floor(element.Time02)} Hours and 
                     ${Math.round(
                       (element.Time02 - Math.floor(element.Time02)) * 60
                     )} Minutes
                 >`,
            start: element.pivot.all_day
              ? moment(String(element.pivot.plan_date)).format("YYYY-MM-DD")
              : moment(String(element.pivot.plan_date)).format(
                  "YYYY-MM-DD HH:mm"
                ),
            end: element.pivot.all_day
              ? moment(String(element.pivot.end_date)).format("YYYY-MM-DD")
              : moment(String(element.pivot.end_date)).format(
                  "YYYY-MM-DD HH:mm"
                ),
            color: element.pivot.qc_id != 0 ? "#3795d8" : "#ff7513",
            extendedProps: {
              id: element.pivot.id,
              time: element.Time02,
              task: { ...element },
              otherTask: false,
            },
          };
        });
        res.activityPlan = res.activityPlan.map((plan) => {
          return {
            ...plan,
            extendedProps: {
              id: plan.id,
              otherTask: true,
            },
          };
        });
        this.calendarOptions.events.push(...res.activityPlan);
      });
    },

    employeeSelected(employee) {
      $(".fc-dailytotal").text(null);
      this.getTasks(employee.id);
      if (this.$route.query.emp != employee.id) {
        this.$router.replace({
          path: "employee_plan",
          query: { emp: employee.id },
        });
      }

      this.getJobs(employee.id);
    },

    taskClick(task) {
      this.selectedTask = task;
    },

    getJobs(empId) {
      this.$store.dispatch("getJobsWIthTasks", empId).then(
        (jobs) => {
          this.jobs = jobs.filter((job) => job.tasks.length > 0);
          // console.log(this.jobs);
        },
        (error) => {
          swal("Oops!", `${error}`, "error", {
            timer: 2000,
          });
        }
      );
    },

    handleDateClick(arg) {
      // console.log(arg);
      let today = new Date();
      let date;
      if (arg.allDay) {
        date = arg.start ? arg.start : arg.date;
      } else {
        date = arg.start;
      }
      if (today.setHours(0, 0, 0, 0) > date.setHours(0, 0, 0, 0)) {
        //check if past Date
        swal(
          "",
          `You can't Plan Previous Dates`,
          // `You can't go back and change the beginning, but you can start where you are and change the ending. - C. S. Lewis -`,
          "error",
          {
            timer: 3500,
          }
        );
        return;
      }
      // console.log(arg);
      $("#createActivity").modal();
      this.$refs.createActivity.setTimeRange(arg);
    },

    handleEventClick(arg) {
      this.selectedTask = {
        id: parseInt(arg.event._def.publicId),
      };
      // console.log(arg);
      if (arg.event._def.extendedProps.otherTask) {
        $("#createActivity").modal();
        // console.log(arg);
        this.$refs.createActivity.setValues(arg.event);
        return;
      }
      // $("#taskHistory").modal();
      // this.$refs.taskHistory.setValues(arg.event.extendedProps);

      this.selected_task = {};
      this.$store
        .dispatch("single_task", arg.event.extendedProps.task.id)
        .then((res) => {
          this.selected_task = res.details;
          this.selected_task.activities = res.activitiesWithComments;
          this.selected_task.task_title =
            res.activitiesWithComments.length != 0
              ? res.activitiesWithComments[0].task_title
              : task.task_name;
          $("#taskHistory").modal("show");
        })
        .catch((err) => console.log(err.response));
    },

    loadTaskDetails(task) {
      this.selected_task = {};
      this.$store
        .dispatch("single_task", task.id)
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

    handleEventChange(arg) {
      // console.log(arg);
      let event = arg.event;
      let today = new Date();
      let plan_date = _.clone(event._instance.range.start);

      if (event._def.extendedProps.otherTask) {
        //if event is a activityPlan
        arg.revert();
        return;
      }
      // if (today.setDate(today.getDate()) > plan_date.setDate(plan_date.getDate())) {
      if (today.setHours(0, 0, 0, 0) > plan_date.setHours(0, 0, 0, 0)) {
        //check if past Date
        arg.revert();
        swal(
          "",
          `You can't Plan the Previous Days...`,
          //  `You can't go back and change the beginning, but you can start where you are and change the ending. - C. S. Lewis -`,
          "error",
          {
            timer: 3500,
          }
        );
        return;
      }

      let req = {
        id: event._def.extendedProps.id || this.selectedTask.id,
        user_id: this.$route.query.emp,
        task_id: parseInt(event._def.publicId),
        plan_date: moment(String(event._instance.range.start))
          .subtract({ hours: 5, minutes: 30 })
          .format("YYYY-MM-DD HH:mm"), //substract to prevent bcz calender get start time as 5:30 AM
        end_date: moment(String(event._instance.range.end))
          .subtract({ hours: 5, minutes: 30 })
          .format("YYYY-MM-DD HH:mm"),
        all_day: event._def.allDay,
        time: event._def.extendedProps.time || this.selectedTask.Time02,
      };
      this.$store.dispatch("change_task_dates", req).then(
        (res) => {
          let start, end;
          start = new Date(
            moment(String(res.data.task.plan_date)).format("YYYY-MM-DD HH:mm")
          );
          end = new Date(
            moment(String(res.data.task.end_date.date)).format(
              "YYYY-MM-DD HH:mm"
            )
          );
          event.setProp(
            "title",
            ` ${event.title}
                 <
                     ${Math.floor(req.time)} Hours and 
                     ${Math.round(
                       (req.time - Math.floor(req.time)) * 60
                     )} Minutes
                 >`
          );
          event.setDates(start, end, {
            allDay: false,
          });
          event.setExtendedProp("id", req.id);
          event.setExtendedProp("time", req.time);
          if (this.selectedTask.job_id) {
            this.jobs = this.jobs.filter((job) => {
              job.tasks = job.tasks.filter(
                (task) => task.id != this.selectedTask.id
              );
              return job.tasks.length > 0;
            });
          }
        },
        (error) => {
          arg.revert();
          swal("Oops!", `${error}`, "error", {
            timer: 2000,
          });
        }
      );
    },

    internalDragStart(arg) {
      this.selectedTask = {
        id: parseInt(arg.event._def.publicId),
      };
    },

    addActivity(activity) {
      this.calendarOptions.events.push({
        ...activity,
        extendedProps: {
          id: activity.id,
          otherTask: true,
        },
      });
      swal("", `Your plan Updated `, "success", {
        timer: 3500,
      });
      $("#createActivity").modal("toggle");
    },
    toggleDay() {
      this.calendarOptions.dayMaxEvents = !this.calendarOptions.dayMaxEvents;
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 0px;
}

.card-header {
  padding: 0;
  border-bottom: 0;
  padding: 0;
  border-bottom: 1px solid #e0e0e0;
  background: #ffffff;
}
.card .card-header h5:after {
  background-color: #ffffff;
}
.job-title {
  color: #5f5f5f;
  text-decoration: none !important;
  font-size: 14px !important;
}
.acordian-scroll {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  overflow-x: hidden;
}

#external-events .fc-event {
  background: #3795d8;
  color: #fff;
  margin-left: 18px;
  font-size: 14px;
}

#external-events .qc-task {
  background: #ff7513 !important;
  color: #fff;
}

#external-events h4 {
  font-size: 16px;
  margin-top: 0;
  padding-top: 0;
}

/* Scroll Bar */

#external-events::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  background: rgba(0, 255, 13, 0);
}

#external-events::-webkit-scrollbar-track {
  border-radius: 1px;
  background: rgba(14, 14, 14, 0.274);
}

#external-events::-webkit-scrollbar-thumb {
  border-radius: 1px;
  background-color: rgb(44, 44, 44);
}

/* FANCY COLLAPSE PANEL STYLES */
.fancy-collapse-panel .panel-default > .panel-heading {
  padding: 0;
}
.fancy-collapse-panel .panel-heading a {
  padding: 12px 35px 12px 15px;
  display: inline-block;
  width: 100%;
  /* background-color: #006c7d; */
  color: #ffffff;
  position: relative;
  text-decoration: none;
}
.fancy-collapse-panel .panel-heading a:after {
  /* font-family: "FontAwesome"; */
  /* content: "\f147"; */
  position: absolute;
  right: 20px;
  font-size: 20px;
  font-weight: 400;
  top: 50%;
  line-height: 1;
  margin-top: -10px;
}

/* .fancy-collapse-panel .panel-heading a.collapsed:after {
  content: "\f196";
} */
</style>