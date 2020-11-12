<template>
  <div class="pcoded-content">
    <PageHeader
      title="Jobs"
      path="/jobs"
      description="All Pending Jobs"
    ></PageHeader>
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
              <div
                class="col-md-6 col-lg-3"
                v-for="job in filteredJobs"
                :key="job.id"
              >
                <router-link :to="singleJob(job.id, job.job_no, job)">
                  <div
                    class="card text-white mb-3"
                    style="max-width: 18rem;"
                    :class="checkPriority(job)"
                  >
                    <div class="card-header">
                      Job - {{ job.job_no }}
                      {{ job.customer_name ? `(${job.customer_name})` : '' }}
                    </div>
                    <div class="card-body">
                      <p class="card-text">
                        {{ job.job_description }}
                      </p>
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
import PageHeader from '@/components/PageHeader';
// import { mapActions, mapGetters } from "vuex";
export default {
  name: 'Jobs',
  components: {
    PageHeader
  },
  data() {
    return {
      jobs: [],
      search: ''
    };
  },
  computed: {
    // ...mapGetters({ getjobs: "jobs/getjobs" })
    filteredJobs: function() {
      if (this.jobs.filter) {
        return this.jobs.filter((job) => {
          return job.job_no.match(this.search.toUpperCase());
        });
      }
    }
  },

  methods: {
    checkPriority(job) {
      let card_class = '';
      if (job.isActive) card_class = 'active-custom';
      switch (parseInt(job.priority)) {
        case 1:
          card_class += ' bg-danger';
          break;
        case 2:
          card_class += ' bg-primary';
          break;
        case 3:
          card_class += ' bg-success';
          break;
        case 4:
          card_class += ' bg-info';
          break;
        case 5:
          card_class += ' bg-secondary';
          break;

        default:
          card_class += ' bg-success';
          break;
      }
      return card_class;
    },
    singleJob(id, no, job) {
      return `/job?id=${id}&job_no=${no}&job_user_id=${job.job_user.id}`;
    }
  },

  created() {
    const loader = this.$loading.show();
    this.$store.dispatch('jobs').then((res) => {
      this.jobs = res;
      loader.hide();
    });
  },

  mounted() {}
};
</script>

<style scoped>
.active-custom {
  box-shadow: 10px 10px 10px rgba(12, 11, 11, 0.432);
  animation-name: activeJob;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-delay: 0s;
  animation-direction: alternate;
  animation-timing-function: linear;
}

@keyframes activeJob {
  0% {
    background-color: rgb(218, 204, 8);
    color: rgb(56, 56, 53);
    transform: scale(1);
    box-shadow: 5px 5px 5px rgba(12, 11, 11, 0.432);
  }
  50% {
    background-color: rgb(219, 123, 13);
    color: rgb(56, 56, 53);
    transform: scale(1.1);
    box-shadow: 10px 10px 15px rgba(12, 11, 11, 0.432);
  }
  100% {
    background-color: rgb(226, 41, 8);
    color: rgb(56, 56, 53);
    transform: scale(1);
    box-shadow: 5px 5px 5px rgba(12, 11, 11, 0.432);
  }
}
</style>
