<template>
  <!-- <section class="login-block p-4" style="background-color: transparent"> -->
  <section
    class=""
    style="
      margin: -80px;
      padding-top: 100px;
      height: 120vh;
      background-size: cover;
      background-position: center;
    "
    :style="loadImage()"
  >
    <div class="col-sm-12 col-md-6 col-lg-4" style="margin: 80px auto;">
      <div class="row">
        <div class="col-sm-12">
          <form
            @submit.prevent="submit"
            class="md-float-material form-material"
          >
            <div class="auth-box card">
              <div class="card-block">
                <div class="row m-b-20">
                  <div class="col-md-12">
                    <h3 class="text-center txt-info" style="font-weight: bold;">
                      Sign In
                    </h3>
                  </div>
                </div>
                <FloatingLabel
                  style="font-weight: 550;"
                  :config="{ label: 'User Name' }"
                >
                  <input
                    type="text"
                    name="user-name"
                    v-model="form.email"
                    class="form-control custom-input"
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  style="font-weight: 550;"
                  :config="{ label: 'Password' }"
                >
                  <input
                    type="password"
                    name="password"
                    v-model="form.password"
                    class="form-control custom-input"
                    required
                  />
                </FloatingLabel>
                <!-- <div class="form-group form-info">
                  <label class="label">Username</label>
                  <input
                    type="text"
                    name="user-name"
                    v-model="form.email"
                    class="form-control"
                    required
                    placeholder="Enter your e-mail or username"
                  />
                </div>
                <div class="form-group form-info">
                  <label class="label">Password</label>
                  <input
                    type="password"
                    name="password"
                    v-model="form.password"
                    class="form-control"
                    required
                    placeholder="Enter your password"
                  />
                  <span class="form-bar"></span>
                </div> -->
                <div class="row mt-5 text-left">
                  <div class="col-12">
                    <div class="checkbox-fade fade-in-info">
                      <label>
                        <input type="checkbox" value />
                        <span class="cr">
                          <i
                            class="cr-icon icofont icofont-ui-check txt-info"
                          ></i>
                        </span>
                        <span class="text-inverse">Remember me</span>
                      </label>
                    </div>
                    <div class="forgot-phone text-right float-right">
                      <p class="text-right f-w-600">
                        Forgot Password?
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <button
                      type="submit"
                      class="btn btn-info btn-md btn-block waves-effect text-center m-b-20"
                    >
                      LOGIN
                    </button>
                  </div>
                </div>
                <p class="text-inverse text-left">
                  Don't have an account? Contact system admin
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FloatingLabel from 'vue-simple-floating-labels'
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  components: {
    FloatingLabel
  },
  methods: {
    ...mapActions(["login"]),
    submit() {
      this.login(this.form)
        .then(() => {
          // this.$router.push({ name: "dashboardLayout" });
          window.location.href = process.env.VUE_APP_MAIN;
        })
        .catch((err) => {
          console.log("auth failed" + err);
          this.$toast.error({
              title:'Unauthenticated',
              message:'Invalid username or password',
              timeOut: 3500,
              showDuration: 300
          })
          // swal("Failed", `Invalid username or password`, "error", {
          //   timer: 2000,
          // });
        });
    },
    loadImage(image) {
      return `background-image: url(${process.env.VUE_APP_LARAVEL_APP_ASSETS_PATH})`
    },
  },
};
</script>

<style>
/* input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    box-shadow: 0 0 0 30px white inset !important;
} */
</style>