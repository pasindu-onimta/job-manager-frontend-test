<template>
  <div>
    <div class="loader-bg">
      <div class="loader-bar"></div>
    </div>
    <div id="pcoded" class="pcoded">
      <div class="pcoded-overlay-box"></div>
      <div class="pcoded-container navbar-wrapper">
        <!-- navbar -->
        <Navbar></Navbar>
        <div class="pcoded-main-container">
          <div class="pcoded-wrapper">
            <!-- side bar -->
            <Sidebar></Sidebar>
            <router-view></router-view>
            <div id="styleSelector"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import PageHeader from "@/components/PageHeader.vue";
export default {
  components: {
    Navbar,
    Sidebar,
    PageHeader
  }
};
</script>

<style>
</style>