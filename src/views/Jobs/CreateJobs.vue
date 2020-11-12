<template id="job-form">
  <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label>Customer</label>
        <v-select
          label="customer_name"
          v-model="job.customer_id"
          :options="customers"
          :reduce="customers => customers.id"
          placeholder="Select a customer.."
          v-on:input="customerSelected"
        ></v-select>
        <div class="message">{{ validation.firstError('job.customer_id') }}</div>
      </div>
      <div class="form-group">
        <label>Location</label>
        <v-select
          label="name"
          v-model="job.location_id"
          :options="locations"
          :reduce="locations => locations.id"
          placeholder="Select a location.."
        ></v-select>
        <div class="message">{{ validation.firstError('job.location_id') }}</div>
      </div>
      <div class="form-group">
        <label>System</label>
        <v-select
          label="name"
          v-model="job.system_id"
          :options="systems"
          :reduce="systems => systems.id"
          placeholder="Select a system.."
        ></v-select>
        <div class="message">{{ validation.firstError('job.system_id') }}</div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="col-md-6">
        <table class="table table-borderless">
          <caption>Job Priority</caption>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Urgent</th>
              <th scope="col">Not Urgent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Essential</th>
              <th class="text-center">
                <!-- Essential Urgent-->
                <input
                  v-model="job.priority"
                  class="form-check-input"
                  type="radio"
                  name="jobPriority"
                  id="jobPriority"
                  value="1"
                />
              </th>
              <th class="text-center">
                <!-- Essential None-Urgent-->
                <input
                  v-model="job.priority"
                  class="form-check-input"
                  type="radio"
                  name="jobPriority"
                  id="jobPriority"
                  value="3"
                />
              </th>
            </tr>
            <tr>
              <th scope="row">Not Essential</th>
              <!-- none Essential Urgent-->
              <th class="text-center">
                <input
                  v-model="job.priority"
                  class="form-check-input"
                  type="radio"
                  name="jobPriority"
                  id="jobPriority"
                  value="2"
                />
              </th>
              <th class="text-center">
                <!-- none Essential None-Urgent-->
                <input
                  v-model="job.priority"
                  class="form-check-input"
                  type="radio"
                  name="jobPriority"
                  id="jobPriority"
                  value="4"
                />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label>Division</label>
            <v-select
              label="name"
              v-model="job.division_id"
              :options="divisions"
              :reduce="divisions => divisions.id"
              placeholder="Select a division..."
              v-on:input="divisionSelected($event,'')"
            ></v-select>
            <div class="message">{{ validation.firstError('job.division_id') }}</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label>Employee</label>
            <v-select
              label="name"
              v-model="job.employee_id"
              :options="employees_all"
              :reduce="employees => employees.id"
              placeholder="Select a employee.."
            ></v-select>
            <div class="message">{{ validation.firstError('job.employee_id') }}</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label>Requested Employee</label>
            <v-select
              label="name"
              v-model="job.requestedEmployee_id"
              :options="employees_all"
              :reduce="employees_all => employees_all.id"
              placeholder="Select a requested employee.."
            ></v-select>
            <div class="message">{{ validation.firstError('job.requestedEmployee_id') }}</div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Due Date</label>
            <v-date-picker
              style="z-index: 200;height: 33px;"
              v-model="job.due_date"
              :popover="{ visibility: 'click' }"
              :min-date="new Date()"
              :input-props="{placeholder: 'Please due date...',   readonly: true }"
              :masks="{ L: 'DD/MM/YYYY' }"
            />
            <div class="message">{{ validation.firstError('job.due_date') }}</div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Job Coordinator</label>
            <v-select
              label="name"
              v-model="job.jobCoordinator_id"
              :options="employees_all"
              :reduce="employees_all => employees_all.id"
              placeholder="Select the job coordinator.."
            ></v-select>
            <div class="message">{{ validation.firstError('job.jobCoordinator_id') }}</div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Job Description</label>
            <textarea
              class="form-control"
              v-model="job.job_description"
              rows="3"
              value="sss"
              placeholder="Additional details about the job..."
            ></textarea>
            <div class="message">{{ validation.firstError('job.job_description') }}</div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Remarks</label>
            <textarea
              class="form-control"
              v-model="job.remarks"
              rows="3"
              placeholder="Enter a remark about the job..."
            ></textarea>
            <!-- <div class="message">{{ validation.firstError('selected_employee') }}</div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <button
        v-if="!isUpdate"
        class="btn btn-primary btn-sm float-right"
        @click="createJob()"
      >Create Job</button>
      <button v-else class="btn btn-warning btn-sm float-right" @click="updateJob()">Update Job</button>
    </div>
  </div>

  <!-- <div class="pcoded-content">
    <PageHeader title="Create New Job" path="/jobCreation" description="Creating new job"></PageHeader>
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">

          </div>
          <div class="md-overlay"></div>
        </div>
      </div>
    </div>
  </div>-->
</template>

<script>
import PageHeader from "@/components/PageHeader";

export default {
    name: "Jobs",
    components: {
        PageHeader,
    },
    data() {
        return {
            customers: [],
            locations: [],
            employees: [],
            isUpdate: false,
            employees_all: [],
            systems: [
                { id: 1, name: "Onimta Job manger" },
                { id: 2, name: "Web Based Inventory" },
            ],
            divisions: [],
            job: {},
            emptyJob: {
                job_no: "",
                customer_id: "",
                location_id: "",
                system_id: "",
                division_id: "",
                employee_id: "",
                requestedEmployee_id: "",
                due_date: "",
                jobCoordinator_id: "",
                job_description: "",
                priority: "1",
            },
        };
    },

    watch: {},

    created() {
        // this.job = Object.assign({}, this.emptyJob);
        this.job = { ...this.emptyJob };

        this.$store.dispatch("load_customers").then((customers) => {
            this.customers = customers;
            console.log(customers);
        });
        this.$store.dispatch("load_users").then((employees) => {
            this.employees_all = employees;
        });
        this.$store.dispatch("get_divisions").then((divisions) => {
            this.divisions = divisions;
        });
    },

    mounted() {},
    validators: {
        "job.customer_id": (value) => {
            return Validator.value(value).required("Please select a customer");
        },
        "job.location_id": (value) => {
            return Validator.value(value).required("Please select a location");
        },
        "job.system_id": (value) => {
            return Validator.value(value).required("Please select a system");
        },
        "job.division_id": (value) => {
            return Validator.value(value).required("Please select a division");
        },
        "job.employee_id": (value) => {
            return Validator.value(value).required("Please select an employee");
        },
        "job.requestedEmployee_id": (value) => {
            return Validator.value(value).required("Please select a requested employee");
        },
        "job.due_date": (value) => {
            return Validator.value(value).required("Please select a due date");
        },
        "job.job_description": (value) => {
            return Validator.value(value).required("Please provide desvription for this job");
        },
    },
    template: "#job-form",
    methods: {
        customerSelected(customer) {
            //get details of customer.
            //here need to get branches allocated to the seleced customer.
            this.locations = [
                { id: 1, name: "Battaramulla" },
                { id: 2, name: "Nugegoda" },
            ];
        },
        divisionSelected(division, employee) {
            //get Employees assigned to the selected division; divison_id, employee-> employee_id if setting values else null
            this.$store.dispatch("load_users_division", division).then((employees) => {
                this.employees = employees;
            });
            setTimeout(() => {
                this.job.employee_id = employee;
            }, 5000);
        },
        createJob() {
            this.$validate().then((success) => {
                if (success) {
                    this.$store.dispatch("createJob", this.job).then(
                        (job) => {
                            console.log(job);
                            this.$parent.closeModal();
                            swal("Good job!", `Job Created successfully`, "success", {
                                timer: 1000,
                            });
                        },
                        (errro) => {
                            swal("Oops!", `Job Creation Faild`, "error", {
                                timer: 2000,
                            });
                        }
                    );
                }
            });
        },
        setValue(job) {
            //set values to the form
            //getLocation
            console.log(55555555555555, job);
            this.locations = [
                { id: 1, name: "Battaramulla" },
                { id: 2, name: "Nugegoda" },
            ];
            if (job) {
                this.job = { ...job };
                this.job.due_date = new Date(this.job.due_date);
                this.divisionSelected(job.division_id, job.employee_id);
                this.isUpdate = true;
            } else {
                this.job = { ...this.emptyJob };
                this.isUpdate = false;
            }
        },
        updateJob() {
            this.$store.dispatch("updateJob", this.job).then((job) => {
                this.$parent.closeModal();
                swal("Good job!", `Job Updated successfully`, "success", {
                    timer: 1000,
                });
            });
        },
    },
};
</script>

<style scoped>
caption {
    caption-side: top;
}
.message {
    color: red;
    font-size: 12px;
    margin-left: 5px;
}
.datetime-picker input[data-v-a46a390c] {
    height: 38px;
}
</style>
