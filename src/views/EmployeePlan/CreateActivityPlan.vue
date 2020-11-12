<template>
  <div>
    <div
      class="modal-header"
      v-bind:style="{ 'background-color': selectedTitle.color,color: '#fff' }"
    >
      <h5 class="modal-title" id="exampleModalLabel">Activity</h5>
      <button
        style="color:#fff"
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label for="exampleFormControlSelect1">Activity</label>
        <select class="form-control form-control-sm" v-model="selectedTitle" :disabled="view">
          <option v-for="title in titles" :key="title.id" :value="title">{{title.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="activity.description"
          :disabled="view"
        ></textarea>
      </div>
    </div>
    <div class="modal-footer justify-content-between">
      <button
        v-if="view"
        type="button"
        class="btn btn-danger btn-sm"
        v-on:click="deleteEvent"
      >Delete</button>
      <button
        v-else
        type="button"
        class="btn btn-primary btn-sm"
        v-on:click="saveActivity"
      >Add Activity</button>
      <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { elementClosest } from "@fullcalendar/vue";

export default {
    name: "activityPlanCreate",
    data() {
        return {
            titles: [
                { name: "Meeting", color: "#00FA9A" },
                { name: "Leave", color: "#DC143C" },
                { name: "Personal", color: "#008B8B" },
            ],
            activity: {
                title: "",
                description: "",
                start: "",
                end: "",
                color: "",
                user_id: "",
            },
            selectedTitle: {},
            view: false,
            event: null,
        };
    },
    created() {
        this.selectedTitle = this.titles[0];
    },
    methods: {
        saveActivity() {
            this.activity.title = this.selectedTitle.name;
            this.activity.color = this.selectedTitle.color;
            this.activity.user_id = this.$route.query.emp;
            console.log(this.activity);
            this.$store.dispatch("save_activity_plan", this.activity).then((res) => {
                console.log(res);
                this.$parent.addActivity(res);
            });
        },
        setTimeRange(event) {
            this.view = false;
            let start, end;
            console.log(event);
            if (event.allDay) {
                start = event.start ? event.start : event.date;
                end = event.end ? event.end : start;
                end = moment(String(end)).add(24, "h").format("YYYY-MM-DD HH:mm");
            } else {
                start = event.start;
                end = event.end;
            }
            this.activity.start = start;
            this.activity.end = end;
            console.log(this.activity);
        },
        setValues(activity) {
            console.log(activity);
            this.event = activity;
            this.view = true;
            this.selectedTitle = this.titles.filter((element) => element.name == activity.title)[0];
            this.activity.description = activity._def.extendedProps.description;
        },
        deleteEvent() {
            let today = new Date();
            console.log("today", today);
            let date = _.clone(this.event._instance.range.start);
            // if (date.setDate(date.getDate()) < today.setDate(today.getDate())) {
            if (today.setHours(0, 0, 0, 0) > date.setHours(0, 0, 0, 0)) {
                //check if past Date
                swal(
                    "",
                    `You can't go back and change the beginning, but you can start where you are and change the ending. - C. S. Lewis -`,
                    "error",
                    {
                        timer: 3500,
                    }
                );
                return;
            }

            this.$store.dispatch("delete_activity_plan", this.event._def.extendedProps.id).then((res) => {
                swal("", `Your plan Updated `, "success", {
                    timer: 3500,
                });
                this.event.remove();
                $("#createActivity").modal("toggle");
            });
        },
    },
};
</script>

<style lang="stylus" scoped></style>