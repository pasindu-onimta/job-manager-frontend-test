<template>
  <nav class="pcoded-navbar">
    <div class="nav-list">
      <div class="pcoded-inner-navbar main-menu">
        <div class="pcoded-navigation-label"></div>
        <ul class="pcoded-item pcoded-left-item">
          <li class v-show="isSuperAdmin">
            <router-link to="/super-admin" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="fas fa-star"></i>
              </span>
              <span class="pcoded-mtext">Super Admin</span>
            </router-link>
          </li>
          <li
            class
            v-show="
              $store.getters.user && $store.getters.user.user_type_id != 6
            "
          >
            <router-link to="/" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-home"></i>
              </span>
              <span class="pcoded-mtext">Dashboard</span>
            </router-link>
          </li>
          <li class>
            <router-link to="/task-assign" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-clipboard"></i>
              </span>
              <span class="pcoded-mtext">Task Assigning</span>
            </router-link>
          </li>
          <li class>
            <router-link to="/task-edit" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-check-square"></i>
              </span>
              <span class="pcoded-mtext">Assigned Tasks</span>
            </router-link>
          </li>
          <li
            class
            v-show="isAdmin || isSuperAdmin || isDirector || isTeamLeader"
          >
            <router-link
              to="/job-authorization"
              class="waves-effect waves-dark"
            >
              <span class="pcoded-micon">
                <i class="far fa-check-circle mr-2" style="font-size: 16px"></i>
              </span>
              <span class="pcoded-mtext">Job Authorization</span>
            </router-link>
          </li>
          <ul class="pcoded-item pcoded-left-item">
            <li class="pcoded-hasmenu">
              <a href="javascript:void(0)" class="waves-effect waves-dark">
                <span class="pcoded-micon">
                  <i class="feather icon-activity"></i>
                </span>
                <span class="pcoded-mtext">My Jobs</span>
              </a>
              <ul class="pcoded-submenu">
                <li class>
                  <router-link to="/jobs" class="waves-effect waves-dark">
                    <span class="pcoded-micon">
                      <i class="feather icon-home"></i>
                    </span>
                    <span class="pcoded-mtext">Tasks</span>
                  </router-link>
                </li>
                <li class>
                  <router-link to="/qcs" class="waves-effect waves-dark">
                    <span class="pcoded-micon">
                      <i class="feather icon-activity"></i>
                    </span>
                    <span class="pcoded-mtext">QC Tasks</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>

          <li class>
            <router-link to="/allJobs" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-check-circle"></i>
              </span>
              <span class="pcoded-mtext">Jobs</span>
            </router-link>
          </li>
          <li class>
            <router-link to="/employee_plan" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-bookmark"></i>
              </span>
              <span class="pcoded-mtext">Calender</span>
            </router-link>
          </li>
          <li class>
            <router-link to="/job-dashboard" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-bookmark"></i>
              </span>
              <span class="pcoded-mtext">Job-Dashboard</span>
            </router-link>
          </li>
        </ul>

        <!-- 
          <ul class="pcoded-item pcoded-left-item">
          <li class="pcoded-hasmenu">
            <a href="javascript:void(0)" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-clipboard"></i>
              </span>
              <span class="pcoded-mtext">Form</span>
            </a>
            <ul class="pcoded-submenu">
              <li class>
                <a href="form-elements-component.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Components</span>
                </a>
              </li>
              <li class>
                <a href="form-elements-add-on.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Add-On</span>
                </a>
              </li>
              <li class>
                <a href="form-elements-advance.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Advance</span>
                </a>
              </li>
              <li class>
                <a href="form-validation.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Validation</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        -->

        <ul
          class="pcoded-item pcoded-left-item"
          v-show="isAdmin || isSuperAdmin || isDirector || isTeamLeader"
        >
          <li class="pcoded-hasmenu">
            <a href="javascript:void(0)" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-settings"></i>
              </span>
              <span class="pcoded-mtext">Setting</span>
            </a>
            <ul class="pcoded-submenu">
              <li class>
                <router-link to="/employee" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Employee</span>
                </router-link>
              </li>
              <li class>
                <router-link
                  to="/edit-job-details"
                  class="waves-effect waves-dark"
                >
                  <span class="pcoded-mtext">Job Details</span>
                </router-link>
              </li>
              <li class>
                <router-link to="/customer" class="waves-effect waves-dark">
                  <span class="pcoded-micon">
                    <i class="feather icon-user"></i>
                  </span>
                  <span class="pcoded-mtext">Customer Registration</span>
                </router-link>
              </li>
              <li
                class
                v-show="isAdmin || isSuperAdmin || isDirector || isTeamLeader"
              >
                <router-link
                  to="/job-authorization"
                  class="waves-effect waves-dark"
                >
                  <span class="pcoded-micon">
                    <i class="feather icon-user"></i>
                  </span>
                  <span class="pcoded-mtext">Job Authorization</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul
          class="pcoded-item pcoded-left-item"
          v-show="isAdmin || isSuperAdmin || isDirector || isTeamLeader"
        >
          <li class="pcoded-hasmenu">
            <a href="javascript:void(0)" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="fas fa-server"></i>
              </span>
              <span class="pcoded-mtext">Service</span>
            </a>
            <ul class="pcoded-submenu">
              <li class>
                <router-link to="/service-add" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Service Detials Add</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="pcoded-item pcoded-left-item">
          <li class="pcoded-hasmenu">
            <a href="javascript:void(0)" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="far fa-clipboard"></i>
              </span>
              <span class="pcoded-mtext">Reports</span>
            </a>
            <ul class="pcoded-submenu">
              <li class>
                <router-link
                  to="/emp_daily_activity"
                  class="waves-effect waves-dark"
                >
                  <span class="pcoded-mtext">Employee Daily Activity</span>
                </router-link>
              </li>
              <li
                class
                v-show="isAdmin || isSuperAdmin || isDirector || isTeamLeader"
              >
                <router-link
                  to="/daily_job_allocations"
                  class="waves-effect waves-dark"
                >
                  <span class="pcoded-mtext">Daily Job Allocations</span>
                </router-link>
              </li>
              <!-- <li class v-show="isAdmin || isSuperAdmin">
                <router-link to="/job_details" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Job Details</span>
                </router-link>
              </li> -->
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
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
  },
};
</script>

<style></style>
