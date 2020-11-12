<template>
  <div class="pcoded-content">
    <PageHeader
      title="Customer Registration"
      path="/customer"
      description="Customer Registration"
    ></PageHeader>

    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="row">
              <div
                class="modal fade"
                id="branch_modal"
                tabindex="-1"
                role="dialog"
              >
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                    <div class="mb-5">
                      <div
                        class="ml-4 mt-4 d-flex justify-content-between align-items-start"
                      >
                        <div class="d-flex flex-column">
                          <h4 class="modal-title">
                            <i
                              class="fa fa-window-maximize mr-3"
                              style="font-size: 17px"
                              aria-hidden="true"
                            ></i>
                            Add Branches
                          </h4>
                          <!-- p
                          style="margin-left: 35px; font-size: 13px"
                          class="text-muted"
                        >in list {{ selected_task.current_status | sectionName }}</p>-->
                        </div>
                        <button
                          type="button"
                          class="close mr-3"
                          aria-label="Close"
                          @click="clearBranchDetails"
                        >
                          <span aria-hidden="true" style="font-size: 27px"
                            >&times;</span
                          >
                        </button>
                      </div>
                      <div class="row p-4">
                        <div class="form-group row" id="empid">
                          <label class="col-sm-3 col-form-label"
                            >Agreement Number</label
                          >
                          <div class="col-sm-5">
                            <input
                              type="text"
                              v-model="agreement_number"
                              required
                              class="form-control"
                              placeholder="Agreement Number"
                            />
                          </div>
                          <div class="col-md-4">
                            <Checkbox
                              id="mycheck1"
                              v-model="warranty_period"
                              color="#f50057"
                              >In Warranty Period</Checkbox
                            >
                          </div>
                        </div>
                        <div class="form-group row" id="empid">
                          <label class="col-sm-3 col-form-label"
                            >Agreement Type</label
                          >
                          <div class="col-sm-9">
                            <v-select
                              label="name"
                              v-model="agreement_type"
                              :options="types"
                              :reduce="(types) => types.id"
                              placeholder="Agreement Type"
                            ></v-select>
                          </div>
                        </div>

                        <div class="form-group row" id="empid">
                          <label class="col-sm-3 col-form-label"
                            >Valid From</label
                          >
                          <div class="col-sm-9">
                            <v-date-picker
                              style="z-index: 200"
                              v-model="value1"
                              :popover="{ visibility: 'click' }"
                            />
                          </div>
                        </div>

                        <div class="form-group row" id="empid">
                          <label class="col-sm-3 col-form-label"
                            >Valid To</label
                          >
                          <div class="col-sm-9">
                            <v-date-picker
                              style="z-index: 200"
                              v-model="value2"
                              :popover="{ visibility: 'click' }"
                            />
                          </div>
                        </div>

                        <div class="form-group row" id="empid">
                          <label class="col-sm-3 col-form-label"
                            >Branch name</label
                          >
                          <div class="col-sm-9">
                            <input
                              type="text"
                              v-model="branch_name"
                              required
                              class="form-control"
                              placeholder="Branch name"
                            />
                          </div>
                        </div>

                        <div class="form-group row" id="empid">
                          <label class="col-sm-3 col-form-label"
                            >Contact person</label
                          >
                          <div class="col-sm-9">
                            <input
                              type="text"
                              v-model="branch_contact_person"
                              required
                              class="form-control"
                              placeholder="Branch contact person"
                            />
                          </div>
                        </div>

                        <div class="form-group row" id="empid">
                          <label class="col-sm-3 col-form-label"
                            >Mobile no</label
                          >
                          <div class="col-sm-9">
                            <input
                              type="text"
                              v-model="branch_mobile_no"
                              required
                              class="form-control"
                              placeholder="Branch mobile no"
                            />
                          </div>
                        </div>

                        <div class="form-group row" id="empid">
                          <label class="col-sm-3 col-form-label"
                            >Phone no</label
                          >
                          <div class="col-sm-9">
                            <input
                              type="text"
                              v-model="branch_phone_no"
                              required
                              class="form-control"
                              placeholder="Branch Phone no"
                            />
                          </div>
                        </div>

                        <div class="form-group row" id="empid">
                          <label class="col-sm-3 col-form-label">Address</label>
                          <div class="col-sm-9">
                            <input
                              type="text"
                              v-model="branch_address"
                              required
                              class="form-control"
                              placeholder="Branch Address"
                            />
                          </div>
                        </div>

                        <div class="form-group row" id="empid">
                          <label class="col-sm-3 col-form-label">email</label>
                          <div class="col-sm-9">
                            <input
                              type="text"
                              v-model="branch_email"
                              required
                              class="form-control"
                              placeholder="Branch email"
                            />
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="pos">Pos</label>
                              <input
                                id="pos"
                                class="form-control"
                                type="number"
                                name="pos"
                                Placeholder="Count"
                                v-model="pos_count"
                              />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="pos">Servers</label>
                              <input
                                id="pos"
                                class="form-control"
                                type="number"
                                name="pos"
                                Placeholder="Count"
                                v-model="server_count"
                              />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="pos">Terminal</label>
                              <input
                                id="pos"
                                class="form-control"
                                type="number"
                                name="pos"
                                Placeholder="Count"
                                v-model="terminal_count"
                              />
                            </div>
                          </div>
                        </div>

                        <div
                          class="form-group row mt-3"
                          style="margin-bottom: -50px"
                          id="empid"
                        >
                          <div class="col-sm-12" v-if="!editMode">
                            <button
                              class="btn btn-secondary btn-block"
                              align="left"
                              @click="addBranch"
                            >
                              Add
                            </button>
                          </div>
                          <div class="col-sm-12" v-else>
                            <button
                              class="btn btn-success btn-block"
                              @click="updateBranch"
                            >
                              Update
                            </button>
                            <button
                              class="btn btn-primary btn-block"
                              @click="clearBranchDetails"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mb-5">
                <div class="col-sm-5">
                  <v-select
                    label="customer_name"
                    v-model="selected_customer"
                    :options="customers"
                    :reduce="(customers) => customers.id"
                    placeholder="Select a customer.."
                    @input="loadCustomerDetails"
                  ></v-select>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group row" id="empid">
                  <label class="col-sm-3 col-form-label">Customer Name</label>
                  <div class="col-sm-9">
                    <input
                      id="cname"
                      class="form-control"
                      type="text"
                      v-model="CustomerData.customer_name"
                      placeholder="Customer Name"
                    />
                  </div>
                </div>

                <div class="form-group row" id="empid">
                  <label class="col-sm-3 col-form-label">Owner</label>
                  <div class="col-sm-9">
                    <input
                      id="cname"
                      class="form-control"
                      type="text"
                      v-model="CustomerData.owner"
                      placeholder="Owner Name"
                    />
                  </div>
                </div>

                <div class="form-group row" id="empid">
                  <label class="col-sm-3 col-form-label"
                    >Customer Address</label
                  >
                  <div class="col-sm-9">
                    <textarea
                      id="cname"
                      class="form-control"
                      type="text"
                      v-model="CustomerData.address"
                      placeholder="Customer Address"
                      cols="30"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div class="form-group row" id="empid">
                  <label class="col-sm-3 col-form-label">Contact person</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      v-model="CustomerData.contact_person"
                      required
                      class="form-control"
                      placeholder="Contact person"
                    />
                  </div>
                </div>

                <div class="form-group row" id="empid">
                  <label class="col-sm-3 col-form-label">Mobile No</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      v-model="CustomerData.mobile_no"
                      required
                      class="form-control"
                      placeholder="Mobile no"
                    />
                  </div>
                </div>

                <div class="form-group row" id="empid">
                  <label class="col-sm-3 col-form-label">Official email</label>
                  <div class="col-sm-9">
                    <input
                      type="email"
                      v-model="CustomerData.email"
                      required
                      class="form-control"
                      placeholder="Official email"
                    />
                  </div>
                </div>

                <div class="form-group row" id="empid">
                  <label class="col-sm-3 col-form-label">Site</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      v-model="CustomerData.website"
                      required
                      class="form-control"
                      placeholder="Official site"
                    />
                  </div>
                </div>

                <div class="form-group row" id="empid">
                  <label class="col-sm-3 col-form-label"
                    >Software coordinator</label
                  >
                  <div class="col-sm-9">
                    <v-select
                      label="name"
                      v-model="CustomerData.software_coordinator"
                      :options="users"
                      :reduce="(users) => users.id"
                      placeholder="Software coordinator"
                    ></v-select>
                  </div>
                </div>

                <div class="form-group row" id="empid">
                  <label class="col-sm-3 col-form-label"
                    >Marketing coordinator</label
                  >
                  <div class="col-sm-9">
                    <v-select
                      label="name"
                      v-model="CustomerData.marketing_coordinator"
                      :options="users"
                      :reduce="(users) => users.id"
                      placeholder="Marketing coordinator"
                    ></v-select>
                  </div>
                </div>

                <div class="form-group row" id="empid">
                  <label class="col-sm-3 col-form-label"
                    >Account coordinator</label
                  >
                  <div class="col-sm-9">
                    <v-select
                      label="name"
                      v-model="CustomerData.account_coordinator"
                      :options="users"
                      :reduce="(users) => users.id"
                      placeholder="Account coordinator"
                    ></v-select>
                  </div>
                </div>

                <button
                  class="btn btn-info mb-4 float-right"
                  @click="showBranchModal"
                >
                  Add New Branch
                </button>
              </div>

              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Customer Branches</h5>
                  </div>
                  <div class="card-body">
                    <div class="col-md-12">
                      <vue-good-table
                        ref="my-table"
                        :columns="columns"
                        :rows="CustomerData.branches"
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
                              class="btn btn-warning btn-sm"
                              @click="loadDataToTable(props.row)"
                            >
                              Edit
                            </button>
                            <button
                              class="btn btn-danger btn-sm ml-2"
                              @click="deleteDataFromTable(props.row)"
                            >
                              Delete
                            </button>
                          </span>
                          <span v-else>
                            {{ props.formattedRow[props.column.field] }}
                          </span>
                        </template>
                      </vue-good-table>
                    </div>
                    <div class="mt-2 float-right">
                      <button
                        class="btn btn-danger"
                        @click="storeNewCustomer"
                        v-if="!customerEditMode"
                      >
                        Save
                      </button>
                      <button
                        class="btn btn-success"
                        @click="storeNewCustomer"
                        v-else
                      >
                        Update
                      </button>
                      <button
                        class="btn btn-primary ml-2"
                        @click="resetMainForm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { Locale } from "v-calendar";
const locale = new Locale();
const mask = "YYYY-MM-DD";
var moment = require("moment");
import axios from "axios";
import { relativeTimeThreshold } from "moment";
import Checkbox from "vue-material-checkbox";
export default {
  components: {
    PageHeader,
    DatePicker,
    Checkbox,
  },
  computed: {
    value1: {
      get() {
        return this.valid_to ? locale.parse(this.valid_to, mask) : new Date();
      },
      set(val) {
        this.valid_to = val ? locale.format(val, mask) : "";
      },
    },
    value2: {
      get() {
        return this.valid_from
          ? locale.parse(this.valid_from, mask)
          : new Date();
      },
      set(val) {
        this.valid_from = val ? locale.format(val, mask) : "";
      },
    },
  },
  data() {
    return {
      data: [],
      users: [],
      customers: [],
      types: [
        { id: 1, name: "Hardware" },
        { id: 2, name: "Software" },
        { id: 3, name: "Hardware and Software" },
      ],
      CustomerData: {
        customer_code: "",
        customer_name: "",
        address: "",
        owner: "",
        contact_person: "",
        mobile_no: "",
        email: "",
        website: "",
        branches: [],
        software_coordinator: "",
        marketing_coordinator: "",
        account_coordinator: "",
        sub_task_selected_branches: "",
      },
      agreement_number: "",
      warranty_period: false,
      agreement_type: "",
      branch_name: "",
      branch_contact_person: "",
      branch_mobile_no: "",
      branch_phone_no: "",
      branch_address: "",
      branch_email: "",
      pos_count: "",
      server_count: "",
      terminal_count: "",
      valid_from: moment().format("YYYY-MM-DD"),
      valid_to: moment().format("YYYY-MM-DD"),
      columns: [
        {
          label: "Branch Name",
          field: "branch_name",
        },
        {
          label: "Agreement No",
          field: "agreement_number",
        },
        {
          label: "Contact Person",
          field: "branch_contact_person",
        },
        {
          label: "Mobile No",
          field: "branch_mobile_no",
        },
        {
          label: "Pos",
          field: "pos_count",
          tdClass: "text-center",
        },
        {
          label: "Servers",
          field: "server_count",
          tdClass: "text-center",
        },
        {
          label: "Terminal",
          field: "terminal_count",
          tdClass: "text-center",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      editMode: false,
      customerEditMode: false,
      selected_customer: "",
    };
  },
  methods: {
    loadCustomerDetails() {
      this.customerEditMode = true;
      this.$store
        .dispatch("loadSelectedCustomer", this.selected_customer)
        .then((res) => {
          this.CustomerData = res;
        });
      this.valid_to = moment().format("YYYY-MM-DD");
      this.valid_from = moment().format("YYYY-MM-DD");
    },

    resetMainForm() {
      this.selected_customer = "";
      this.customerEditMode = false;
      this.CustomerData = {
        customer_code: "",
        customer_name: "",
        address: "",
        owner: "",
        contact_person: "",
        mobile_no: "",
        email: "",
        website: "",
        branches: [],
        software_coordinator: "",
        marketing_coordinator: "",
        account_coordinator: "",
        sub_task_selected_branches: "",
      };
    },

    loadDataToTable(data) {
      this.editMode = true;
      this.agreement_number = data.agreement_number;
      this.branch_code = data.branch_code;
      this.warranty_period = data.warranty_period;
      this.agreement_type = data.agreement_type;
      this.branch_name = data.branch_name;
      this.branch_contact_person = data.branch_contact_person;
      this.branch_mobile_no = data.branch_mobile_no;
      this.branch_phone_no = data.branch_phone_no;
      this.branch_address = data.branch_address;
      this.branch_email = data.branch_email;
      this.pos_count = data.pos_count;
      this.server_count = data.server_count;
      this.terminal_count = data.terminal_count;
      this.valid_from = data.valid_from;
      this.valid_to = data.valid_to;
      $("#branch_modal").modal({ backdrop: "static", keyboard: false });
    },
    deleteDataFromTable(data) {
      const index = this.CustomerData.branches.findIndex(
        (el) => el.agreement_number == data.agreement_number
      );
      this.CustomerData.branches.splice(index, 1);
    },

    showBranchModal() {
      this.valid_to = moment().format("YYYY-MM-DD");
      this.valid_from = moment().format("YYYY-MM-DD");
      $("#branch_modal").modal({ backdrop: "static", keyboard: false });
    },
    addBranch() {
      this.CustomerData.branches.push({
        agreement_number: this.agreement_number,
        warranty_period: this.warranty_period,
        agreement_type: this.agreement_type,
        branch_name: this.branch_name,
        branch_code: null,
        branch_contact_person: this.branch_contact_person,
        branch_mobile_no: this.branch_mobile_no,
        branch_phone_no: this.branch_phone_no,
        branch_address: this.branch_address,
        branch_email: this.branch_email,
        pos_count: this.pos_count,
        server_count: this.server_count,
        terminal_count: this.terminal_count,
        valid_from: this.valid_from,
        valid_to: this.valid_to,
      });
      this.clearBranchDetails();
    },
    updateBranch() {
      const index = this.CustomerData.branches.findIndex(
        (el) => el.branch_code == this.branch_code
      );
      this.CustomerData.branches.splice(index, 1, {
        agreement_number: this.agreement_number,
        warranty_period: this.warranty_period,
        agreement_type: this.agreement_type,
        branch_name: this.branch_name,
        branch_code: this.branch_code,
        branch_contact_person: this.branch_contact_person,
        branch_mobile_no: this.branch_mobile_no,
        branch_phone_no: this.branch_phone_no,
        branch_address: this.branch_address,
        branch_email: this.branch_email,
        pos_count: this.pos_count,
        server_count: this.server_count,
        terminal_count: this.terminal_count,
        valid_from: this.valid_from,
        valid_to: this.valid_to,
      });

      this.clearBranchDetails();
    },

    storeNewCustomer() {
      if (this.CustomerData.branches.length == 0) {
        swal("Error!", "Please add atleast one branch to proceed", "error", {
          timer: 3000,
        });
        return;
      }

      this.CustomerData.branch_code = null;

      const loader = this.$loading.show();
      this.$store
        .dispatch("storeNewCustomer", this.CustomerData)
        .then((res) => {
          loader.hide();
          this.resetMainForm();
          swal("Success!", "Customer saved successfully!", "success", {
            timer: 3000,
          });
        })
        .catch((err) => {
          loader.hide();
        });
    },

    clearBranchDetails() {
      this.agreement_number = "";
      this.agreement_type = "";
      this.warranty_period = false;
      this.branch_name = "";
      this.branch_contact_person = "";
      this.branch_mobile_no = "";
      this.branch_phone_no = "";
      this.branch_address = "";
      this.branch_email = "";
      this.pos_count = "";
      this.server_count = "";
      this.terminal_count = "";
      this.valid_from = "";
      this.valid_to = "";
      this.editMode = false;
      $("#branch_modal").modal("hide");
    },
  },
  created() {
    this.$store.dispatch("load_users").then((res) => {
      this.users = res;
    });
    this.$store.dispatch("load_customers").then((res) => {
      this.customers = res;
    });
  },
  mounted() {},
};
</script>

<style scoped>
</style>
