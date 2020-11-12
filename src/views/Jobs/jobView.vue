<template>
  <div class="row">
    <div class="col-md-12 detail-wrap">
      <span>Customer</span>
      <span class="float-right detail">
        {{$store.getters.job.customer.customer_name}}
        <br />
        <small class="float-right">({{$store.getters.job.location_id}})</small>
      </span>
    </div>
    <div class="col-md-12 detail-wrap">
      <span>System</span>
      <span class="float-right detail">{{$store.getters.job.system_id}}</span>
    </div>
    <div class="col-md-12 detail-wrap">
      <span>Employee</span>
      <span class="float-right detail">
        {{$store.getters.job.employee.name}}
        <br />
        <small class="float-right">({{$store.getters.job.division.name}})</small>
      </span>
    </div>
    <div class="col-md-12 detail-wrap">
      <span>Division</span>
      <span class="float-right detail">{{$store.getters.job.division.name}}</span>
    </div>
    <div class="col-md-12 detail-wrap">
      <span>Requested Employee</span>
      <span class="float-right detail">{{$store.getters.job.requested_employee.name}}</span>
    </div>
    <div class="col-md-12 detail-wrap">
      <span>Job Coordinator</span>
      <span class="float-right detail">{{$store.getters.job.job_coordinator.name}}</span>
    </div>
    <div class="col-md-12 detail-wrap">
      <span>Due Date</span>
      <span class="float-right detail">{{$store.getters.job.due_date | date}}</span>
    </div>
    <div class="col-md-12 detail-wrap">
      <span>Priority</span>
      <span class="float-right detail">{{$store.getters.job.job_priority.name}}</span>
    </div>
    <div class="col-md-12 detail-wrap">
      <span>Job Description</span>
      <span class="float-right detail">{{$store.getters.job.job_description}}</span>
    </div>
    <div class="col-md-12 detail-wrap">
      <span>Remarks</span>
      <span class="float-right detail">{{$store.getters.job.remarks}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Jobs",
  components: {},
  data() {
    return {
      job: {},
    };
  },

  watch: {},

  created() {},

  mounted() {},
  validators: {},
  methods: {
    getJob(job) {
      this.job = job;
    },
  },
};
</script>

<style scoped>
.pt-10 {
  padding-top: 10px;
}
.detail-wrap {
  border-bottom: 1px solid rgb(239 239 239);
  padding: 10px 10px 10px 10px;
  font-weight: 400;
}
.detail-wrap .detail {
  font-size: 1.1rem;
  font-weight: 600;
}
</style>
