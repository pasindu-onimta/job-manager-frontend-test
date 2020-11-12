<template>
  <div class="container mt-3">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Job Requests</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <button class="btn btn-danger" @click="loadNewJob">New Job</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loadNewJob() {
      this.$router.push({ name: "new-job", query: { job_no: "S20-0245" } });
    },
  },
};
</script>

<style>
</style>