  <template>
  <div class="pcoded-content">
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="row">
              <div class="col-md-12">asdadad asd as dsa sad sad </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// import FullCalendar from "@fullcalendar/vue";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
// import moment from "moment";
export default {
  name: "calalalal",
  components: {
    // FullCalendar,
  },
  data() {
    return {
      // calendarOptions: {
      //   plugins: [dayGridPlugin, interactionPlugin],
      //   initialView: "dayGridMonth",
      //   select: this.handleDateSelect,
      //   eventClick: this.handleEventClick,
      //   initialView: "dayGridMonth",
      //   editable: true,
      //   selectable: true,
      //   selectMirror: true,
      //   dayMaxEvents: true,
      //   weekends: true,
      //   events: [
      //     { title: "event 1", date: "2020-08-10" },
      //     { title: "event 2", date: "2020-08-10" },
      //     { title: "event 2", date: "2020-08-10" },
      //     { title: "event 2", date: "2020-08-10" },
      //     { title: "event 2", date: "2020-08-10" },
      //     { title: "event 2", date: "2020-08-10" },
      //     { title: "event 2", date: "2020-08-10" },
      //     { title: "event 2", date: "2020-08-10" },
      //     { title: "event 2", date: "2020-08-10" },
      //     { title: "event 2", date: "2020-08-10" },
      //   ],
      // },
      // tasks: [
      //   { id: 1, title: "event 1", date: "2020-08-10" },
      //   { id: 2, title: "event 2", date: "2020-08-10" },
      // ],
    };
  },

  watch: {},
  created() {
    // this.draggable();
  },

  mounted() {
    // this.draggable();
  },
  methods: {
    // handleDateClick: function (arg) {
    //   alert("date click! " + arg.dateStr);
    // },
    // handleEventClick(clickInfo) {
    //   console.log(clickInfo);
    //   // clickInfo.event.remove();
    // },
    // handleDateSelect(selectInfo) {
    //   let title = prompt("Please enter a new title for your event");
    //   let calendarApi = selectInfo.view.calendar;

    //   calendarApi.unselect(); // clear date selection

    //   if (title) {
    //     calendarApi.addEvent({
    //       id: Math.random(),
    //       title,
    //       start: selectInfo.startStr,
    //       end: selectInfo.endStr,
    //       allDay: selectInfo.allDay,
    //     });
    //   }
    // },
    // draggable() {
    //   var containerEl = document.getElementById("external-events");
    //   new Draggable(containerEl, {
    //     itemSelector: ".fc-event",
    //     eventData: function (eventEl) {
    //       return {
    //         title: eventEl.innerText,
    //       };
    //     },
    //   });
    // },
  },
};
</script>

<style scoped>
</style>


              <!-- <div class="col-md-3">
                <div id="external-events">
                  <h4>Draggable Events</h4>
                  <div
                    class="fc-event"
                    v-for="task in tasks"
                    :key="task.id"
                    :data-event="task.id"
                  >{{task.title}}</div>

                  <p>
                    <input type="checkbox" id="drop-remove" />
                    <label for="drop-remove">remove after drop</label>
                  </p>
                </div>
              </div>
              <div class="col-md-9">
                <FullCalendar :options="calendarOptions" />
              </div> -->