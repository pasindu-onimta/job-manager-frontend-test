<template>
  <div class="pcoded-content">
    <PageHeader
      title="Dashboard"
      path="/jobs"
      description="All Details"
    ></PageHeader>
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">job authorization</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import PageHeader from "@/components/PageHeader";
import { mapActions } from "vuex";
export default {
  name: "JobAuthorization",
  components: {
    PageHeader,
  },
  data() {
    return {};
  },
  computed: {},

  methods: {},

  created() {
    // const loader = this.$loading.show();
    // this.$store
    //   .dispatch("ongoing_jobs", { user: 0, division: this.division_id })
    //   .then((res) => {
    //     this.ongoings = res;
    //     this.content_loaded = true;
    //     this.divisions_loaded = true;
    //     // loader.hide();
    //   })
    //   .catch((err) => {
    //     // loader.hide();
    //   });
  },
};
</script>
