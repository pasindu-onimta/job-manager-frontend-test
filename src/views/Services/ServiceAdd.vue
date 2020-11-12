<template>
  <div class="pcoded-content">
    <PageHeader
      title="Jobs"
      path="/alljobs"
      description="Service Details Add"
    ></PageHeader>
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">Service Details Add</div>
                  <div class="card-body">
                    <div class="row mb-5">
                      <div class="col-sm-4">
                        <v-select
                          label="customer_name"
                          v-model="selected_customer"
                          :options="customers"
                          :reduce="(customers) => customers.id"
                          placeholder="Select a customer.."
                          @input="loadBranches"
                        ></v-select>
                        <div class="message">
                          {{ validation.firstError("selected_customer") }}
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <v-select
                          label="branch_name"
                          v-model="selected_branch"
                          :options="branches"
                          :reduce="(branches) => branches.id"
                          placeholder="Select a branch.."
                          @input="loadAgreements"
                        ></v-select>
                        <div class="message">
                          {{ validation.firstError("selected_branch") }}
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <v-select
                          label="agreement_number"
                          v-model="selected_agreement"
                          :options="agreements"
                          :reduce="(agreements) => agreements.agreement_number"
                          placeholder="Select an agreement.."
                        ></v-select>
                        <div class="message">
                          {{ validation.firstError("selected_agreement") }}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group row" id="empid">
                        <label class="col-sm-2 col-form-label"
                          >Service Date</label
                        >
                        <div class="col-sm-10">
                          <v-date-picker
                            style="z-index: 200"
                            v-model="service_date"
                            :popover="{ visibility: 'click' }"
                          />
                        </div>
                      </div>
                      <div class="form-group row" id="empid">
                        <label class="col-sm-2 col-form-label"
                          >Job Card No</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="text"
                            v-model="job_card_no"
                            required
                            class="form-control"
                            placeholder="Job Card No"
                          />
                          <div class="message">
                            {{ validation.firstError("job_card_no") }}
                          </div>
                        </div>
                      </div>
                      <div class="form-group row" id="empid">
                        <label class="col-sm-2 col-form-label">Pos Count</label>
                        <div class="col-sm-10">
                          <input
                            type="number"
                            v-model="pos_count"
                            required
                            class="form-control"
                            placeholder="Serviced Pos Count"
                          />
                          <div class="message">
                            {{ validation.firstError("pos_count") }}
                          </div>
                        </div>
                      </div>
                      <div class="form-group row" id="empid">
                        <label class="col-sm-2 col-form-label"
                          >Server Count</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="text"
                            v-model="server_count"
                            required
                            class="form-control"
                            placeholder="Serviced Server Count"
                          />
                          <div class="message">
                            {{ validation.firstError("server_count") }}
                          </div>
                        </div>
                      </div>
                      <div class="form-group row" id="empid">
                        <label class="col-sm-2 col-form-label"
                          >Terminal Count</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="text"
                            v-model="terminal_count"
                            required
                            class="form-control"
                            placeholder="Serviced Terminal Count"
                          />
                          <div class="message">
                            {{ validation.firstError("terminal_count") }}
                          </div>
                        </div>
                      </div>
                      <div class="form-group row" id="empid">
                        <label class="col-sm-2 col-form-label">Employees</label>
                        <div class="col-sm-10">
                          <multiselect
                            v-model="employees"
                            :options="users"
                            :multiple="true"
                            :close-on-select="true"
                            :clear-on-select="false"
                            :preserve-search="true"
                            track-by="id"
                            :preselect-first="true"
                            placeholder="Employees"
                            label="name"
                          ></multiselect>
                          <div class="message">
                            {{ validation.firstError("employees") }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="p-4 float-right">
                      <button
                        class="btn btn-success"
                        @click="saveServiceDetails"
                      >
                        Save
                      </button>
                      <button class="btn btn-default ml-2" @click="clearForm">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">Service Details Add</div>
                  <div class="card-body">
                    <div class="col-md-12">
                      <div class="mb-3 d-flex align-items-center">
                        <div class="col-sm-4">
                          <v-date-picker
                            mode="range"
                            v-model="range"
                            :popover="{ visibility: 'click' }"
                          />
                        </div>
                        <button class="btn btn-primary">Load</button>
                      </div>
                      <vue-good-table
                        ref="my-table"
                        :columns="columns"
                        :rows="getServiceDetails"
                        styleClass="vgt-table bordered condensed"
                        :search-options="{
                          enabled: true,
                        }"
                        :pagination-options="{
                          enabled: true,
                          mode: 'records',
                          perPage: 15,
                          position: 'bottom',
                          perPageDropdown: [5, 10, 15, 50, 100],
                          dropdownAllowAll: false,
                          setCurrentPage: 1,
                          nextLabel: 'next',
                          prevLabel: 'prev',
                          rowsPerPageLabel: 'Rows per page',
                          ofLabel: 'of',
                          pageLabel: 'page', // for 'pages' mode
                          allLabel: 'All',
                        }"
                      >
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'action'">
                            <button
                              class="btn btn-info btn-sm"
                              @click="loadActivities(props.row)"
                            >
                              view
                            </button>
                          </span>
                          <span v-else>
                            {{ props.formattedRow[props.column.field] }}
                          </span>
                        </template>
                      </vue-good-table>
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
import DataTable from "vue-materialize-datatable";
export default {
  name: "Service-Add",
  components: {
    PageHeader,
  },
  data() {
    return {
      users: [],
      customers: [],
      branches: [],
      agreements: [],
      data: [],
      employees: null,
      selected_customer: "",
      selected_branch: "",
      selected_agreement: "",
      job_card_no: "",
      pos_count: "",
      server_count: "",
      terminal_count: "",
      service_date: new Date(),
      columns: [
        {
          label: "Customer",
          field: "customer_name",
        },
        {
          label: "Branch",
          field: "branch_name",
        },
        {
          label: "Agreement No",
          field: "agreement_number",
        },
        {
          label: "Job Card No",
          field: "job_card_no",
        },
        {
          label: "Employee",
          field: "name",
        },
        {
          label: "Pos",
          field: "pos_count",
        },
        {
          label: "Servers",
          field: "server_count",
        },
        {
          label: "Terminal",
          field: "terminal_count",
        },
        {
          label: "Service Date",
          field: "service_date",
        },
        {
          label: "Added Date",
          field: "created_at",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      range: {
        start: new Date(), // Jan 16th, 2018
        end: new Date(), // Jan 19th, 2018
      },
    };
  },

  computed: {
    getServiceDetails() {
      return this.$store.getters.getServiceDetails;
    },
  },

  validators: {
    selected_customer: function (value) {
      return Validator.value(value).required("Please select a customer");
    },
    selected_branch: function (value) {
      return Validator.value(value).required("Please select a branch");
    },
    selected_agreement: function (value) {
      return Validator.value(value).required("Please select an agreement");
    },
    job_card_no: function (value) {
      return Validator.value(value).required("This field is required");
    },
    pos_count: function (value) {
      return Validator.value(value).required("This field is required");
    },
    server_count: function (value) {
      return Validator.value(value).required("This field is required");
    },
    terminal_count: function (value) {
      return Validator.value(value).required("This field is required");
    },
    employees: function (value) {
      return Validator.value(value).required(
        "Please select atleast one employee"
      );
    },
  },

  created() {
    this.$store.dispatch("load_customers").then((res) => {
      this.customers = res;
    });
    this.$store.dispatch("load_users").then((res) => {
      this.users = res;
    });
    this.$store.dispatch("loadServiceDetails", this.range).then((res) => {
      // this.data = res;
    });
  },

  mounted() {},
  methods: {
    loadBranches() {
      this.$store
        .dispatch("loadSelectedCustomer", this.selected_customer)
        .then((res) => {
          this.branches = res.branches;
        });
    },

    loadAgreements() {
      this.$store
        .dispatch("loadSelectedBranchAgreements", this.selected_branch)
        .then((res) => {
          console.log(res);
          this.agreements = res;
        });
    },

    saveServiceDetails() {
      this.$validate().then((success) => {
        if (success) {
          const loader = this.$loading.show();
          this.$store
            .dispatch("storeServiceData", {
              employees: this.employees,
              selected_customer: this.selected_customer,
              selected_branch: this.selected_branch,
              selected_agreement: this.selected_agreement,
              job_card_no: this.job_card_no,
              pos_count: this.pos_count,
              server_count: this.server_count,
              terminal_count: this.terminal_count,
              service_date: this.service_date,
            })
            .then((res) => {
              this.clearForm();
              loader.hide();
            });
        }
      });
    },

    clearForm() {
      this.employees = null;
      this.selected_customer = "";
      this.selected_branch = "";
      this.selected_agreement = "";
      this.job_card_no = "";
      this.pos_count = "";
      this.server_count = "";
      this.terminal_count = "";
      this.service_date = new Date();
      this.validation.reset();
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.message {
  color: red;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 3px;
}
</style>

