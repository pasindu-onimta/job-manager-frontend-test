<template>
  <div class="pcoded-content">
    <PageHeader title="QC" path="/jobs" description="All Pending QC Jobs"></PageHeader>
    <div class="d-flex justify-content-end">
      <div class="col-sm-12 col-xl-3 m-b-30 m-r-20">
        <form>
          <input
            type="text"
            class="form-control form-control-round"
            v-model="search"
            placeholder="Search.."
          />
        </form>
      </div>
    </div>
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="row">
              <div class="col-md-6 col-lg-3" v-for="job in filteredJobs" :key="job.id">
                <router-link :to="singleJob(job.id, job.job_no, job)">
                  <div class="card text-white z-depth-left-5" :class="checkPriority(job.priority)">
                    <div class="card-header">Job - {{ job.job_no }}</div>
                    <div class="card-body">
                      <h5 class="card-title">{{ job.job }}</h5>
                      <p class="card-text">{{ job.job_description }}</p>
                    </div>
                  </div>
                </router-link>
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
// import { mapActions, mapGetters } from "vuex";
export default {
  name: "Jobs",
  components: {
    PageHeader
  },
  data() {
    return {
      jobs: [],
      search: ""
    };
  },
  computed: {
    // ...mapGetters({ getjobs: "jobs/getjobs" })
    filteredJobs: function() {
      if (this.jobs.filter) {
        return this.jobs.filter(job => {
          return job.job_no.match(this.search.toUpperCase());
        });
      }
    }
  },

  methods: {
    checkPriority(priority) {
      return "bg-dark";
      let card_class = "";
      switch (parseInt(priority)) {
        case 1:
          card_class = "bg-danger";
          break;
        case 2:
          card_class = "bg-primary";
          break;
        case 3:
          card_class = "bg-success";
          break;
        case 4:
          card_class = "bg-inverse";
          break;

        default:
          card_class = "bg-secondary";
          break;
      }
      return card_class;
    },
    singleJob(id, no, job) {
      // return `/job/${id}/no/${no}`;
      return `/qc?id=${id}&job_no=${no}&job_user_id=${job.job_user.id}`;
    }
  },

  created() {
    this.$store.dispatch("jobsQC").then(res => {
      console.log(res);
      this.jobs = res;
    });
  },

  mounted() {}
};
</script>

