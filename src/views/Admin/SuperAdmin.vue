<template>
  <div class="pcoded-content">
    <PageHeader
      title="Super Admin"
      path="/alljobs"
      description="Super Admin Is Here"
    ></PageHeader>
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">Employee Activity Log</div>
                  <div class="card-body">
                    <div class="row mb-5">
                      <div class="col-sm-4">
                        <v-select
                          label="customer_name"
                          v-model="selected_customer"
                          :options="customers"
                          :reduce="(customers) => customers.id"
                          placeholder="Select a customer.."
                        ></v-select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <ol>
                          <li v-for="log in getLog" :key="log.id">
                            {{ log.log_name }} - {{ log.created_at }} -
                            {{ log.name }} - {{ log.description }} -
                            {{ log.properties }}
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">Features Management</div>
                  <div class="card-body">
                    <div class="col-md-12">
                      <div class="mb-3 d-flex align-items-center">
                        <div class="row">
                          <div
                            class="col-sm-12"
                            style="margin-bottom: -18px"
                            v-for="feature in getFeatures"
                            :key="feature.id"
                          >
                            <div class="card">
                              <div
                                class="card-body d-flex align-items-center justify-content-between"
                              >
                                {{ feature.feature }}
                                <vs-switch v-model="feature.status" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      class="btn btn-success float-right"
                      @click="changeFeatureStatus"
                    >
                      Update
                    </button>
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
      features: [],
      selected_customer: "",
      selected_branch: "",
      selected_agreement: "",
    };
  },

  computed: {
    getLog() {
      return this.$store.getters.getLog;
    },
    getFeatures() {
      return this.$store.getters.getFeatures;
    },
  },

  created() {
    this.$store.dispatch("getAllLogDetails").then((res) => {
      //   this.customers = res;
    });
    this.$store.dispatch("load_users").then((res) => {
      this.users = res;
    });
    this.loadAllFeatures();
  },

  mounted() {},
  methods: {
    loadAllFeatures() {
      this.$store.dispatch("getAllFeatures").then((res) => {
        this.features = res;
      });
    },

    changeFeatureStatus() {
      const loader = this.$loading.show();
      this.$store
        .dispatch("changeFeatureStatus", this.features)
        .then((res) => {
          this.loadAllFeatures();
          loader.hide();
          swal("Good job!", `Feature updated successfully`, "success", {
            timer: 2000,
          });
        })
        .catch((err) => {
          loader.hide();
        });
    },
  },
};
</script>

