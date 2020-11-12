<template>
  <div class="page-header card">
    <div class="row align-items-end">
      <div class="col-lg-8">
        <div class="page-header-title">
          <i class="feather icon-home bg-c-blue"></i>
          <div class="d-inline">
            <h5>{{ title }}</h5>
            <span>{{ description }}</span>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div v-if="dashboard">
          <div class="d-flex justify-content-end" v-if="!loading">
            <div class="col-sm-12">
              <div class="d-flex justify-content-between">
                <PuSkeleton width="315px" height="35px" />
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end" v-else>
            <div class="col-sm-12">
              <v-select
                label="full_name"
                v-model="division_id"
                :options="divisions"
                :reduce="(divisions) => divisions.id"
                placeholder="Select a division"
                @input="loadEmployeeCards"
              ></v-select>
            </div>
          </div>
        </div>
        <div class="page-header-breadcrumb" v-else>
          <ul class="breadcrumb breadcrumb-title">
            <li class="breadcrumb-item">
              <router-link to="/">
                <i class="feather icon-home"></i>
              </router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link :to="path">{{ title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["title", "path", "description", "loading", "dashboard"],
  data() {
    return {
      division_id: "",
      divisions: [],
    };
  },

  methods: {
    loadEmployeeCards() {
      this.$store
        .dispatch("ongoing_jobs", { user: 0, division: this.division_id })
        .then((res) => {
          this.ongoings = res;
          this.content_loaded = true;
        });
    },
  },

  created() {
    this.$store.dispatch("get_divisions").then((res) => {
      this.divisions = res;
    });
  },
};
</script>

<style>
</style>