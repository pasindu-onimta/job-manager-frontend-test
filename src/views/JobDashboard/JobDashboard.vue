<script>
import Bar from "./charts/Bar.vue";
import BarHoriontal from "./charts/Bar_.vue";
import Pie from "./charts/_Pie.vue";
import moment from "moment";
// var moment = require('moment');
export default {
  name: "jobDashboard",
  components: {
    Bar,
    BarHoriontal,
    Pie,
  },
  data() {
    return {
      divisions: [],
      division: null,
      divisionsColor: ["#3948abcc", "#2979ffcc", "#1de9b6cc", "#f4511e", "#ff9100cc", "#f57c00"],
      datacollection: null,
      summary: {},
      index: 0,
      range: {},
    };
  },
  created() {
    this.$store.dispatch("get_divisions").then((divisions) => {
      this.divisions = divisions;
      this.division = this.divisions[0];
      this.divisions.push({
        id: -1,
        name: "Overoll",
      });
      this.getJobSummary();
    });
    this.fillData();
  },
  mounted() {},
  methods: {
    fillData() {
      this.datacollection = {
        labels: [""],
        datasets: [
          {
            label: "Received Jobs",
            backgroundColor: "#00c853",
            data: [100],
          },
          {
            label: "Finished Jobs",
            backgroundColor: "#2962ff",
            data: [50],
          },
        ],
      };
      this.datacollection2 = {
        labels: [],
        datasets: [
          {
            label: "Paid",
            backgroundColor: "#64958f",
            data: [100],
          },
          {
            label: "Not Paid",
            backgroundColor: "#065c6f",
            data: [50],
          },
          {
            label: "AMC",
            backgroundColor: "#ffbb91",
            data: [50],
          },
          {
            label: "All",
            backgroundColor: "#1aa6b7",
            data: [500],
          },
        ],
      };
      this.datacollection3 = {
        labels: [],
        datasets: [
          {
            label: "Paid",
            backgroundColor: "#64958f",
            data: [100],
          },
          {
            label: "Not Paid",
            backgroundColor: "#065c6f",
            data: [50],
          },
          {
            label: "AMC",
            backgroundColor: "#ffbb91",
            data: [50],
          },
          {
            label: "All",
            backgroundColor: "#1aa6b7",
            data: [500],
          },
        ],
      };
      this.datacollection4 = {
        labels: ["Paid", "Not Paid", "AMC"],
        datasets: [
          {
            backgroundColor: ["#6595d5", "#ffbb91", "#ffccb91"],
            data: [100, 500, 600],
          },
        ],
      };
    },
    getJobSummary() {
      console.log(this.division);
      if (!this.division) {
        return;
      }
      let req = {
        division: this.division.id,
        start: this.range?.start || moment().year(new Date().getFullYear()).month(0).date(1).format("YYYY-MM-DD"), //start with the year start
        end: this.range?.end || new Date(),
      };
      this.$store.dispatch("get_dash_jobs_summary", req).then((res) => {
        console.log(res);
        // this.datacollection = res["jobs"];
        this.summary = res;
      });
    },
    divisionSelected(division, index) {
      this.index = index;
      this.division = division;
      this.getJobSummary();
    },
    dateSelect() {
      this.getJobSummary();
    },
  },
};
</script>

<template>
  <div class="pcoded-content">
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="row division-cards">
              <div v-on:click="divisionSelected(division, index)" class="col-md-2" v-for="(division, index) in divisions" :style="{ 'background-color': divisionsColor[index] }" :key="division.id">{{ division.name }}</div>
              <!-- <div class="col-md-2" :style="{ 'background-color': '#ffea00' }">Overall</div> -->
            </div>

            <div class="row mt-20">
              <div class="col-md-4">
                <v-date-picker mode="range" v-model="range" :popover="{ placement: $screens({ default: 'bottom', md: 'right-start' }) }" :input-props="{ placeholder: 'Select Date Rage', readonly: true }" @input="dateSelect" />
              </div>
            </div>

            <div class="row chart-wrapper">
              <div class="col-md-3" v-if="summary['jobs']">
                <div class="mat-card" :style="{ 'border-bottom-color': divisionsColor[index] }">
                  <Bar :chart-data="summary['jobs']"></Bar>
                </div>
              </div>

              <div class="col-md-3" v-if="datacollection2">
                <div class="mat-card" :style="{ 'border-bottom-color': divisionsColor[index] }">
                  <Bar :chart-data="datacollection2"></Bar>
                </div>
              </div>

              <div class="col-md-3" v-if="datacollection4">
                <div class="mat-card" :style="{ 'border-bottom-color': divisionsColor[index] }">
                  <Pie :chart-data="datacollection4"></Pie>
                </div>
              </div>

              <div class="col-md-3" v-if="datacollection3">
                <div class="mat-card" :style="{ 'border-bottom-color': divisionsColor[index] }">
                  <BarHoriontal :chart-data="datacollection3"></BarHoriontal>
                </div>
              </div>

              <div class="col-md-6">
                <div class="mat-card" :style="{ 'border-bottom-color': divisionsColor[index] }">
                  <div class="row justify-content-md-center card-top-bar" v-if="summary['unfinishedJobs']">
                    <div class="col-md-3 d-flex justify-content-center">
                      <span>
                        <small>Not Tasked</small>
                        <h5>{{ summary["unfinishedJobs"].notTasked }}</h5>
                      </span>
                      <span>
                        <small>Tasked</small>
                        <h5>{{ summary["unfinishedJobs"].tasked }}</h5>
                      </span>
                    </div>
                    <div class="col-md-3 d-flex justify-content-center">
                      <span>
                        <small>Not Assigned</small>
                        <h5>{{ summary["unfinishedJobs"].notAssigned }}</h5>
                      </span>
                      <span>
                        <small>Assigned</small>
                        <h5>{{ summary["unfinishedJobs"].assigned }}</h5>
                      </span>
                    </div>
                    <div class="col-md-3 d-flex justify-content-center">
                      <span>
                        <small>Not Planned</small>
                        <h5>{{ summary["unfinishedJobs"].notPlanned }}</h5>
                      </span>
                      <span>
                        <small>Planned</small>
                        <h5>{{ summary["unfinishedJobs"].planned }}</h5>
                      </span>
                    </div>
                    <div class="col-md-3 d-flex justify-content-center">
                      <span>
                        <small>Not Picked</small>
                        <h5>{{ summary["unfinishedJobs"].notPicked }}</h5>
                      </span>
                      <span>
                        <small>Picked</small>
                        <h5>{{ summary["unfinishedJobs"].picked }}</h5>
                      </span>
                    </div>
                  </div>

                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Plan Date</th>
                        <th scope="col">Estimated Date</th>
                        <th scope="col">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="summary['notExceeded']" class="notExceeded">
                        <th scope="row">Not Exceeded</th>
                        <td>{{ summary["notExceeded"].plan }}</td>
                        <td>{{ summary["notExceeded"].estimate }}</td>
                        <td>{{ summary["notExceeded"].due }}</td>
                      </tr>
                      <tr v-if="summary['close']" class="closeToExeed">
                        <th scope="row">Close to Exceed</th>
                        <td>{{ summary["close"].plan }}</td>
                        <td>{{ summary["close"].estimate }}</td>
                        <td>{{ summary["close"].due }}</td>
                      </tr>
                      <tr v-if="summary['exceeded']" class="exceeded">
                        <th scope="row">Exceeded</th>
                        <td>{{ summary["exceeded"].plan }}</td>
                        <td>{{ summary["exceeded"].estimate }}</td>
                        <td>{{ summary["exceeded"].due }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="col-md-6" v-if="datacollection3">
                <div class="mat-card" :style="{ 'border-bottom-color': divisionsColor[index] }">
                  <Bar :chart-data="datacollection3"></Bar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mt-20 {
  margin-top: 20px;
}
.division-cards {
  display: flex;
  flex-wrap: nowrap;
}

.division-cards .col-md-2 {
  background-color: rgb(255 83 112);
  color: #ffff;
  text-align: center;
  line-height: 24px;
  padding: 10px 0;
  font-size: 20px;
  margin: 0 5px 0 0;
  cursor: pointer;
}

.chart-wrapper {
  margin-top: 20px;
}

.chart-wrapper .col-md-3,
.col-md-6 {
  padding: 5px;
  margin-top: 10px;
}

.mat-card {
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 10px;
  border-bottom: 3px solid;
  /* color: #3948abcc, #2979ffcc", "#1de9b6cc", "#c6ff00cc", "#ff9100cc; */
}

.card-top-bar {
  margin-bottom: 20px;
  margin-left: 3px;
}
.card-top-bar .col-md-3 {
  display: flex;
}

.card-top-bar .col-md-3:not(:last-child) {
  border-right: 1px solid #6a6a6a5c;
}
.card-top-bar .col-md-3 span {
  padding-right: 7px;
}

.card-top-bar small {
  font-size: 10px;
}
.table td {
  text-align: center;
}

.notExceeded td {
  color: #00c853;
}
.closeToExeed td {
  color: #ffc400;
}
.exceeded td {
  color: #d32f2f;
}
</style>
