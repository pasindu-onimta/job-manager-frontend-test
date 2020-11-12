<template>
  <div class="pcoded-content">
    <PageHeader title="Jobs" path="/jobs" description="New Jobs"></PageHeader>

    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <button type="button" class="btn btn-primary">Button</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      columns: [
        "name",
        "nickname",
        "email",
        "birthdate",
        "gender",
        "__actions",
      ],
      itemActions: [
        {
          name: "view-item",
          label: "",
          icon: "zoom icon",
          class: "ui teal button",
        },
        {
          name: "edit-item",
          label: "",
          icon: "edit icon",
          class: "ui orange button",
        },
        {
          name: "delete-item",
          label: "",
          icon: "delete icon",
          class: "ui red button",
        },
      ],
    };
  },
  methods: {
    viewProfile: function (id) {
      console.log("view profile with id:", id);
    },
  },
};
</script>

<style>
</style>
