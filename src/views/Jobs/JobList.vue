<template>
  <div class="pcoded-content">
    <PageHeader
      title="Jobs"
      path="/alljobs"
      description="All jobs"
    ></PageHeader>
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="row">
              <div class="col-md-12 d-flex justify-content-around">
                <!-- <button
                  class="btn btn-sm btn-primary"
                  data-toggle="modal"
                  data-target="#newJobModal"
                  @click="newJobModal"
                >New Job</button> -->
                <router-link
                  :to="{ name: 'job-request' }"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#newJobModal"
                  @click="newJobModal"
                >
                  Job Request
                </router-link>
                <router-link
                  :to="{ name: 'new-job' }"
                  class="btn btn-primary ml-4 pl-4 pr-4"
                  data-toggle="modal"
                  data-target="#newJobModal"
                  @click="newJobModal"
                >
                  New Job
                </router-link>
                <button
                  class="btn btn-primary ml-4 pl-4 pr-4"
                  data-toggle="modal"
                  data-target="#newJobModal"
                  @click="newJobModal"
                >
                  Call Center Job
                </button>
                <button
                  class="btn btn-primary ml-4 pl-4 pr-4"
                  data-toggle="modal"
                  data-target="#newJobModal"
                  @click="newJobModal"
                >
                  Customer Job
                </button>
                <button
                  class="btn btn-primary ml-4 pl-4 pr-4"
                  data-toggle="modal"
                  data-target="#newJobModal"
                  @click="newJobModal"
                >
                  Created Job
                </button>
              </div>
              <router-view></router-view>
            </div>
          </div>
          <div class="md-overlay"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import jobCreation from "@/views/Jobs/CreateJobs";
import jobView from "@/views/Jobs/jobView";
import DataTable from "vue-materialize-datatable";
export default {
  name: "Jobs",
  components: {
    PageHeader,
    jobCreation,
    jobView,
    datatable: DataTable,
  },
  data() {
    return {
      jobs: [],
      job: {},
      serverParams: {
        page: 1,
        records: 10,
        keyword: "",
        sort: {
          field: "",
          type: "asc",
        },
      },
      columns: [
        { label: "Job No", field: "job_no" },
        { label: "Customer Name", field: "customer.customer_name" },
        { label: "Employee", field: "employee.name" },
        { label: "System", field: "system_id" },
        { label: "Due Date", field: "due_date" },
        { label: "Job Description", field: "job_description" },
        { label: "Prority", field: "job_priority.name" },
        { field: "actions", label: "Action", tdClass: "vgt-center-align" },
      ],
      view: false, //to separate view and edit components
      isLoading: true,
    };
  },

  watch: {},
  created() {
    this.getJobs();
  },

  mounted() {},
  methods: {
    getJobs() {
      this.$store.dispatch("getJobs", this.serverParams);
    },
    setUpUpdate(job) {
      this.view = false;
      this.$store.dispatch("setJob", job);
      setTimeout(() => {
        this.$refs.jobCreation.setValue(job);
      });
    },
    viewJob(job) {
      this.view = true;
      this.$store.dispatch("setJob", job);
      setTimeout(() => {
        this.$refs.jobViewPage.getJob(job);
        // $("#newJobModal").modal("toggle");
      });
    },
    newJobModal() {
      this.view = false;
      this.$store.dispatch("setJob", null);
      this.$refs.jobCreation.setValue(null);
    },
    closeModal() {
      document.getElementById("closeNewJob").click();
    },
    onPageChange(page) {
      this.serverParams = {
        records: page.currentPerPage,
        page: page.currentPage,
        keyword: this.keyword,
        sort: this.serverParams.sort,
      };
      this.getJobs();
    },
    onPerPageChange(perPage) {
      this.serverParams = {
        records: perPage.currentPerPage,
        page: 1,
        keyword: this.keyword,
        sort: this.serverParams.sort,
      };
      this.getJobs();
    },
    onSearchJobs(search) {
      this.keyword = search.searchTerm;
      this.serverParams = {
        page: 1,
        records: this.serverParams.records,
        keyword: search.searchTerm,
        sort: this.serverParams.sort,
      };
      this.getJobs();
    },
    onColumnFilter(filter) {
      console.log(filter);
    },
    onSortChange(sort) {
      this.serverParams = {
        page: this.serverParams.page,
        records: this.serverParams.records,
        keyword: this.serverParams.keyword,
        sort: sort[0],
      };
      this.getJobs();
    },
  },
};
</script>

<style scoped>
.pt-10 {
  padding-top: 10px;
}
.btn-table-icon {
  padding-right: 10px;
  color: #4c4c4c;
}
.btn-update:hover {
  color: #f0ad4e;
  cursor: pointer;
}
.btn-view:hover {
  color: #0dc6ff;
  cursor: pointer;
}
.modal-header {
  background-color: rgb(33 54 56);
  color: white;
}
.close {
  color: white;
}
.table-container {
  overflow: auto;
  white-space: nowrap;
}
</style>

<style >
.vue-good-mat-row {
  color: #6b6b6b !important;
  font-size: 0.8rem;
  line-height: inherit;
  cursor: pointer;
}
.vue-good-mat-row:hover {
  background-color: rgb(230, 230, 230) !important;
}
.vgt-table thead th {
  color: #4a4a4a;
  vertical-align: bottom;
  border-bottom: 1px solid #dcdfe6;
  padding-right: 1.5em;
  background: linear-gradient(#ffffff, #ffffff);
  font-size: 12px;
}
</style>