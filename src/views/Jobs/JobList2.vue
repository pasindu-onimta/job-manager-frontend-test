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
                <button
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#newJobModal"
                  @click="newJobModal"
                >
                  Job Request
                </button>
                <button
                  class="btn btn-primary ml-4 pl-4 pr-4"
                  data-toggle="modal"
                  data-target="#newJobModal"
                  @click="newJobModal"
                >
                  New Job
                </button>
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
              <div class="col-md-12 pt-10" id="scroll-bar">
                <vue-good-table
                  ref="my-table"
                  :columns="columns"
                  :rows="$store.getters.jobs"
                  :totalRows="$store.getters.jobCount"
                  :isLoading.sync="isLoading"
                  :fixed-header="false"
                  mode="remote"
                  @on-page-change="onPageChange"
                  @on-per-page-change="onPerPageChange"
                  @on-search="onSearchJobs"
                  @on-column-filter="onColumnFilter"
                  @on-sort-change="onSortChange"
                  :sort-options="{
                    enabled: true,
                  }"
                  :pagination-options="{
                    enabled: true,
                    mode: 'records',
                    perPage: serverParams.records,
                    position: 'bottom',
                    perPageDropdown: [10, 50, 100, 200, 300],
                    dropdownAllowAll: false,
                    setCurrentPage: 1,
                    nextLabel: 'next',
                    prevLabel: 'prev',
                    rowsPerPageLabel: 'Rows per page',
                    ofLabel: 'of',
                    pageLabel: 'page', // for 'pages' mode
                    allLabel: 'All',
                  }"
                  max-height="390px"
                  styleClass="vgt-table striped condensed"
                  :row-style-class="'vue-good-mat-row'"
                  :search-options="{
                    enabled: true,
                  }"
                  compactMode
                >
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'actions'">
                      <i
                        class="fas fa-edit btn-table-icon btn-update"
                        data-toggle="modal"
                        data-target="#newJobModal"
                        @click="setUpUpdate(props.row)"
                      ></i>
                      <i
                        class="fa fa-eye btn-table-icon btn-view"
                        aria-hidden="true"
                        data-toggle="modal"
                        data-target="#newJobModal"
                        @click="viewJob(props.row)"
                      ></i>
                    </span>
                    <span v-else>{{
                      props.formattedRow[props.column.field]
                    }}</span>
                  </template>
                </vue-good-table>

                <!-- <datatable class="table-container"
                  :title="'News'"
                  :columns="columns"
                  :rows="$store.getters.jobs"
                  :perPage="[100, 10, 25, 50]"
                >
                  <th slot="thead-tr">Actions</th>
                  <template slot="tbody-tr" scope="props">
                    <td>
                      <button
                        class="btn red darken-2 waves-effect waves-light compact-btn"
                        @click="(e) => deleteItem(props.row, e)"
                      >
                        <i class="material-icons white-text">delete</i>
                      </button>
                    </td>
                  </template>
                </datatable>-->
              </div>
            </div>

            <!-- Modal -->
            <div
              class="modal fade"
              id="newJobModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog"
                v-bind:class="{ 'modal-lg': !view }"
                role="document"
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      {{
                        $store.getters.job
                          ? `Job Details ${$store.getters.job.job_no} `
                          : `New Job`
                      }}
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      id="closeNewJob"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-md-12" id="job-list">
                        <jobCreation
                          v-if="!view"
                          ref="jobCreation"
                        ></jobCreation>
                        <jobView v-if="view" ref="jobViewPage"></jobView>
                      </div>
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