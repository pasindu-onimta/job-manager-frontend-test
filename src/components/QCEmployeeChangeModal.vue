<template>
  <div class="modal-content" style="box-shadow: 0px 0px 10px 2px #6b6e6c">
    <div
      class="ml-4 mt-2 mb-2 d-flex justify-content-between align-items-center"
    >
      <div class="d-flex flex-column">
        <h5 class="modal-title">
          <i
            class="fa fa-user mr-2"
            style="font-size: 20px"
            aria-hidden="true"
          ></i>
          Change QC Employee
        </h5>
      </div>
      <button
        type="button"
        class="close mr-3"
        @click="closeDueDateHistoryModal"
        aria-label="Close"
      >
        <span aria-hidden="true" style="font-size: 27px">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-md-12">
          <v-select
            v-show="true"
            label="name"
            v-model="selected_employee"
            :options="users"
            :reduce="(users) => users.id"
            placeholder="Select an employee.."
          ></v-select>
          <div class="mt-3">
            <button class="btn btn-primary btn-block" @click="updateQcEmployee">
              Update
            </button>
            <button
              class="btn btn-default btn-block"
              @click="closeDueDateHistoryModal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["taskId", "jobId"],
  data() {
    return {
      users: [],
      selected_employee: "",
    };
  },
  methods: {
    closeDueDateHistoryModal() {
      $("#qcchangemodal").modal("hide");
    },

    updateQcEmployee() {
      const loader = this.$loading.show();
      this.$store
        .dispatch("updateQcEmployee", {
          task_id: this.taskId,
          job_id: this.jobId,
          employee_id: this.selected_employee,
        })
        .then(() => {
          loader.hide();
          this.closeDueDateHistoryModal();
          const qc_employee = this.users.find(
            (el) => el.id == this.selected_employee
          ).name;
          this.$emit("changeQcName", qc_employee);
        })
        .catch((err) => {
          loader.hide();
          this.closeDueDateHistoryModal();
        });
    },
  },
  created() {
    this.$store.dispatch("load_users").then((res) => {
      this.users = res;
    });
  },
};
</script>

<style>
</style>