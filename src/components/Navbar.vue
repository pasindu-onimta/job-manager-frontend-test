<template>
  <nav class="navbar header-navbar pcoded-header">
    <div class="navbar-wrapper">
      <div class="navbar-logo">
        <router-link :to="{ name: 'Dashboard' }" style="line-height: 0.5">
          <h3>ONIMTA</h3>
          <p>
            JOB MANAGER
            <span style="font-size: 10px" class="text-muted">v2.0.1</span>
          </p>
        </router-link>
        <a class="mobile-menu" id="mobile-collapse" href="#!">
          <i class="feather icon-menu icon-toggle-right"></i>
        </a>
        <a class="mobile-options waves-effect waves-light">
          <i class="feather icon-more-horizontal"></i>
        </a>
      </div>
      <div class="navbar-container container-fluid">
        <ul class="nav-left">
          <li class="header-search">
            <div class="main-search morphsearch-search">
              <div class="input-group">
                <span class="input-group-prepend search-close">
                  <i class="feather icon-x input-group-text"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Keyword"
                />
                <span class="input-group-append search-btn">
                  <i class="feather icon-search input-group-text"></i>
                </span>
              </div>
            </div>
          </li>
          <li>
            <a
              href="#!"
              onclick="if (!window.__cfRLUnblockHandlers) return false; javascript:toggleFullScreen()"
              class="waves-effect waves-light"
              data-cf-modified-d2d1d6e2f87cbebdf4013b26-
            >
              <i class="full-screen feather icon-maximize"></i>
            </a>
          </li>
        </ul>
        <ul class="nav-right">
          <li class="header-notification">
            <div class="dropdown-primary dropdown">
              <div class="dropdown-toggle" data-toggle="dropdown">
                <i class="feather icon-bell"></i>
                <span
                  class="badge bg-c-red"
                  v-show="$store.getters.notifications_count != 0"
                  >{{ $store.getters.notifications_count }}</span
                >
              </div>
              <Notifications></Notifications>
            </div>
          </li>
          <li class="header-notification">
            <div class="dropdown-primary dropdown">
              <div
                class="displayChatbox dropdown-toggle"
                data-toggle="dropdown"
              >
                <i class="feather icon-message-square"></i>
                <span class="badge bg-c-green">3</span>
              </div>
            </div>
          </li>
          <li class="user-profile header-notification">
            <div class="dropdown-primary dropdown">
              <div class="dropdown-toggle" data-toggle="dropdown">
                <img
                  :src="setProfileImage($store.getters.user)"
                  class="img-radius"
                  alt="User-Profile-Image"
                />
                <span>{{ user ? user.name : "Onimta" }}</span>
                <i class="feather icon-chevron-down"></i>
              </div>
              <ul
                class="show-notification profile-notification dropdown-menu pb-0"
                data-dropdown-in="fadeIn"
                data-dropdown-out="fadeOut"
                style="width: 300px"
              >
                <!-- <li>
                  <a href="#!">
                    <i class="feather icon-settings"></i> Settings
                  </a>
                </li> -->
                <li>
                  <a href="#"> <i class="feather icon-user"></i> Profile </a>
                </li>
                <!-- <li>
                  <a href="email-inbox.html">
                    <i class="feather icon-mail"></i> My Messages
                  </a>
                </li>
                <li>
                  <a href="auth-lock-screen.html">
                    <i class="feather icon-lock"></i> Lock Screen
                  </a>
                </li>-->
                <li>
                  <a
                    href="auth-sign-in-social.html"
                    @click.prevent="signoutAction"
                  >
                    <i class="fas fa-power-off"></i> Logout
                  </a>
                </li>
                <li style="border-top: 1px #eee solid">
                  <a
                    href="auth-sign-in-social.html"
                    @click.prevent="changeTask(1)"
                  >
                    <i class="far fa-comments"></i> Meeting
                  </a>
                </li>
                <li>
                  <a
                    href="auth-sign-in-social.html"
                    @click.prevent="changeTask(2)"
                  >
                    <i class="fas fa-utensils"></i> Lunch
                  </a>
                </li>
                <li>
                  <a
                    href="auth-sign-in-social.html"
                    @click.prevent="changeTask(3)"
                  >
                    <i class="far fa-pause-circle"></i> Hold
                  </a>
                </li>
                <li style="border-top: 1px #eee solid">
                  <a
                    href="auth-sign-in-social.html"
                    @click.prevent="changeTask(4)"
                  >
                    <i class="fas fa-home"></i> Day Off
                  </a>
                </li>
                <li>
                  <a
                    href="auth-sign-in-social.html"
                    @click.prevent="changeTask(5)"
                  >
                    <i class="far fa-handshake"></i> Help
                  </a>
                </li>
                <li>
                  <a
                    href="auth-sign-in-social.html"
                    @click.prevent="changeTask(6)"
                  >
                    <i class="fas fa-fighter-jet"></i> Leave
                  </a>
                </li>
                <li>
                  <a
                    href="auth-sign-in-social.html"
                    @click.prevent="addQuickJob"
                  >
                    <i class="far fa-check-circle"></i> Internal Works/ Quick
                    Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="auth-sign-in-social.html"
                    @click.prevent="restoreLastOngoingTask()"
                  >
                    <i class="far fa-window-restore"></i> Restore
                  </a>
                </li>
                <li
                  class="bg-danger"
                  v-show="
                    isAdmin || isSuperAdmin || isDirector || isCoordinator
                  "
                >
                  <a
                    href="#"
                    class="text-white"
                    @click.prevent="showEmployeeLeaveManageModal()"
                  >
                    <i class="fas fa-bomb"></i>Manage Employee Leave
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Notifications from "./Notifications";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { Notifications },
  computed: {
    ...mapGetters(["user"]),
    isAdmin() {
      return this.$store.getters.user && this.$store.getters.isAdmin;
    },
    isSuperAdmin() {
      return this.$store.getters.user && this.$store.getters.isSuperAdmin;
    },
    isDirector() {
      return this.$store.getters.user && this.$store.getters.isDirector;
    },
    isTeamLeader() {
      return this.$store.getters.user && this.$store.getters.isTeamLeader;
    },
    isCoordinator() {
      return this.$store.getters.user && this.$store.getters.isTeamLeader;
    },
  },
  methods: {
    ...mapActions(["signout", "changeTaskFromHome", "restoreOngoingTask"]),
    signoutAction() {
      this.signout().then(() => {
        this.$router.replace({ name: "login" });
      });
    },
    changeTask(type) {
      swal({
        title: "Are you sure?",
        text: "Do you want to put currently ongoing tast to hold?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willMove) => {
        if (willMove) {
          if (type == 1 || type == 3 || type == 5 || type == 6) {
            swal("Please add a remark for this action", {
              content: "input",
            }).then((value) => {
              if (value != null) {
                this.sendRequest(type, value);
              }
            });
          } else {
            this.sendRequest(type, null);
          }
        }
      });
    },
    sendRequest(type, comment) {
      this.changeTaskFromHome({ type, comment })
        .then((res) => {
          swal("Success! Ongoing task changed!", {
            icon: "success",
          });
          if (type == 4 || type == 6) {
            this.signoutAction();
          } else {
            const path = "/";
            if (this.$route.path !== path)
              this.$router.replace({ name: "Dashboard" });
            // window.location.href = process.env.VUE_APP_MAIN;
          }
        })
        .catch((err) => {
          if (err.response.status == 400) {
            swal(`Error! ${err.response.data.message}`, {
              icon: "error",
            });
          }
        });
    },
    restoreLastOngoingTask() {
      this.restoreOngoingTask()
        .then((res) => {
          swal("Success! Ongoing task restored!", {
            icon: "success",
          });
          const path = "/";
          if (this.$route.path !== path)
            this.$router.replace({ name: "Dashboard" });

          // window.location.href = process.env.VUE_APP_MAIN;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            swal(`Error! ${err.response.data.message}`, {
              icon: "error",
            });
          }
        });
    },
    setProfileImage(user) {
      if (user && user.employee)
        return `${
          process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH + user.employee.image
        }`;
      return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH}default.png`;
    },

    addQuickJob() {
      $("#subTaskAddModal").modal("show");
    },

    showEmployeeLeaveManageModal() {
      $("#leaveAddModal").modal("show");
    },
  },
};
</script>
