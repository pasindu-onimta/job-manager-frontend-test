<template>
  <v-select
    label="job_no"
    v-model="selected_job"
    :options="jobs"
    :reduce="(jobs) => jobs.id"
    placeholder="Select a job"
    @input="loadJobCo"
  >
    <template
      slot="option"
      slot-scope="option"
      class="d-flex justify-contnet-between"
    >
      <span style="font-weight: bold;">{{ option.job_no }}</span>
      - {{ option.customer_name }}
    </template>
  </v-select>
</template>

<script>
export default {
  data() {
    return {
      selected_job: '',
      jobs: []
    };
  },

  methods: {
    loadJobCo() {
      this.$emit('job-select', this.selected_job);
    }
  },

  created() {
    this.$store.dispatch('jobsForAdmin').then((res) => {
      this.jobs = res;
    });
  }
};
</script>

<style></style>
