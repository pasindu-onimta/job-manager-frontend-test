<template>
  <ul
    class="show-notification notification-view dropdown-menu"
    data-dropdown-in="fadeIn"
    data-dropdown-out="fadeOut"
  >
    <!-- 
      <li>
        <h6>Notifications</h6>
        <label class="label label-danger">New</label>
      </li>
    -->
    <li class="text-muted" v-if="notifications && notifications.length == 0">No notifications found</li>
    <!-- <perfect-scrollbar v-else :watchOptions="true"> -->
    <li
    class="mr-1"
      style="line-height: 10px; padding: 10px 15px"
      v-for="notification in notifications"
      :key="notification.id"
      :class="{'bg-secondary-custom': notification.status}"
      @click="singleJob(notification.job_id, notification.job.job_no, notification.job_user_id, notification.notification_type)"
    >
      <div class="media">
        <img
          class="img-radius"
          :src="setProfileImage(notification)"
          alt="Generic placeholder image"
        />
        <!-- <img class="img-radius" src="jpg/avatar-4.jpg" alt="Generic placeholder image" /> -->
        <div class="media-body">
          <div class="d-flex justify-content-between">
            <h5 class="notification-user">{{ notification.assigend_by.name }}</h5>
            <h5 class="notification-user">{{ notification.job.job_no }}</h5>
          </div>
          <p class="notification-msg">{{ notification.title }}</p>
          <span class="notification-time">{{ notification.created_at | fromNow }}</span>
        </div>
      </div>
    </li>
    <!-- </perfect-scrollbar> -->
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      notifications_all: []
    };
  },
  computed: {
    ...mapGetters(["notifications"])
  },
  created() {
    this.$store.dispatch("notifications").then(res => {
      this.notifications_all = res;
    });
  },
  methods: {
    singleJob(id, no, job_user_id, type) {
      if (type == 1) {
        this.$router.replace({
          path: `/job?id=${id}&job_no=${no}&job_user_id=${job_user_id}`
        });
      } else if(type == 2) {
        this.$router.replace({
          path: `/qc?id=${id}&job_no=${no}&job_user_id=${job_user_id}`
        });
      }
    },
    setProfileImage(notification) {
      if (notification && notification.emp_details)
        return (
          `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH + notification.emp_details.image}`
        );
      return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH}default.png`;
    }
  }
};
</script>

<style scoped>
.bg-secondary-custom {
  background-color: rgba(46, 46, 46, 0.116);
}
</style>