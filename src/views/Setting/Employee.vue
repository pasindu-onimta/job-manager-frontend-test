<template>
  <div class="pcoded-content">
    <PageHeader
      title="Employee"
      path="/employee"
      description="Employee Details"
    ></PageHeader>
    <div class="d-flex justify-content-end">
      <div class="col-sm-12 col-xl-3 m-b-30 m-r-20">
        <form>
          <input
            type="text"
            v-model="search"
            class="form-control form-control-round"
            placeholder="Search.."
          />
        </form>
      </div>
    </div>

    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="card">
              <div class="card-header">
                <button
                  type="button"
                  class="btn waves-effect waves-light btn-info btn-round"
                  data-modal="modal-10"
                  @click="showModal"
                >
                  Add New Employee
                </button>
                <div class="card-header-right">
                  <button class="btn btn-info mr-3" @click="syncData">
                    Customer Sync
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="page-body">
            <div class="card">
              <div class="card-header">
                <h5>Employee List</h5>
                <span>
                  use class
                  <code>table</code> inside table element
                </span>
                <div class="card-header-right">
                  <ul class="list-unstyled card-option">
                    <li class="first-opt">
                      <i class="feather icon-chevron-left open-card-option"></i>
                    </li>
                    <li>
                      <i class="feather icon-maximize full-card"></i>
                    </li>
                    <li>
                      <i class="feather icon-minus minimize-card"></i>
                    </li>
                    <li>
                      <i class="feather icon-refresh-cw reload-card"></i>
                    </li>
                    <li>
                      <i class="feather icon-trash close-card"></i>
                    </li>
                    <li>
                      <i class="feather icon-chevron-left open-card-option"></i>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card-block table-border-style">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>

                        <th>Name</th>
                        <th>Designation</th>
                        <th>Mobile</th>
                        <th>Image</th>
                        <th>*</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="emplists in emplist" :key="emplists.id">
                        <th scope="row">{{ emplists.Code }}</th>
                        <td>
                          {{ emplists.FirstName }} {{ emplists.LastName }}
                        </td>
                        <td>{{ emplists.Position }}</td>
                        <td>{{ emplists.Mobile }}</td>

                        <td class="list-icons-img">
                          <img
                            v-bind:src="loadUserImage(emplists.image)"
                            class="img-fluid p-absolute d-block text-center rounded-circle"
                            width="50px"
                            height="50px"
                          />
                        </td>
                        <td>
                          <button
                            class="btn waves-effect waves-light btn-success btn-icon"
                            :id="emplists.id"
                            @click="viewProfile(emplists.id)"
                          >
                            <i class="icofont icofont-check-circled ml-1"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Popup employee -->
    <div
      class="md-modal md-effect-10"
      id="modal-10"
      :class="{ 'md-show': openmodal }"
    >
      <div class="md-content">
        <h3>{{ this.title }}</h3>

        <div class="card">
          <div class="card-block">
            <form>
              <div
                class="form-group row"
                id="empid"
                :class="{ empid: EmpShow }"
              >
                <label class="col-sm-3 col-form-label">Id</label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    required
                    class="form-control"
                    placeholder="You can't change me"
                    v-model="empdata.id"
                    readonly
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Code</label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    required
                    class="form-control form-control-normal fill"
                    placeholder="Employee Code"
                    v-model="empdata.code"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">First Name</label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    required
                    class="form-control form-control-normal fill"
                    placeholder="Emloyee First Name"
                    v-model="empdata.fname"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Last Name</label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    required
                    class="form-control form-control-normal fill"
                    placeholder="Emloyee Last Name"
                    v-model="empdata.lname"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    required
                    class="form-control form-control-normal fill"
                    placeholder="Emloyee Email"
                    v-model="empdata.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">T.P</label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    required
                    class="form-control form-control-normal"
                    placeholder="Mobile"
                    v-model="empdata.mobile"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Department</label>
                <div class="col-sm-9">
                  <select
                    v-model="selected"
                    class="form-control"
                    @change="getposi($event)"
                  >
                    <option value>Select One Value Only</option>
                    <option
                      v-for="departments in department"
                      :key="departments.id"
                      :value="departments.id"
                      >{{ departments.Department }}</option
                    >
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Position</label>
                <div class="col-sm-9">
                  <select v-model="empdata.pos_id" class="form-control">
                    <option value>Select One Value Only</option>
                    <option
                      v-for="positions in position"
                      :key="positions.id"
                      :value="positions.id"
                      >{{ positions.position }}</option
                    >
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Image</label>
                <div class="col-sm-9">
                  <input
                    type="file"
                    class="form-control"
                    @change="getimage($event)"
                  />
                </div>
              </div>

              <div class="float-right">
                <button
                  type="button"
                  class="btn btn-primary waves-effect md-close mr-2"
                  @click="closeModel"
                >
                  Close
                </button>

                <button
                  type="button"
                  class="btn btn-success waves-effect md-close"
                  @click="submitForm"
                >
                  {{ this.brntitle }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay"></div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    PageHeader
  },
  data() {
    return {
      search: '',
      selected: '',
      openmodal: false,
      title: '',
      edited: false,
      EmpShow: '',
      brntitle: '',

      empdata: {
        code: '',
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        pos_id: '',
        image: '',
        id: 0
      }
      // editEmploye: {

      // }
    };
  },
  computed: {
    ...mapGetters([
      'department',
      'position',
      'employee',
      'emplist',
      'editEmploye'
    ])
    // filteredJobs: function() {
    //     if (this.jobs.filter) {
    //       return this.jobs.filter(job => {
    //         return job.job_no.match(this.search.toUpperCase());
    //       });
    //     }
    //   }
  },

  methods: {
    ...mapActions([
      'getdepartment',
      'getposition',
      'addemployee',
      'getListemp',
      'getEditemployee'
    ]),

    syncData() {
      const loader = this.$loading.show();
      this.$store
        .dispatch('customersSync')
        .then((res_1) => {
          loader.hide();
          swal('Sync Successfull', {
            icon: 'success'
          });
        })
        .catch((err) => {
          loader.hide();
        });
    },

    loadUserImage(image) {
      return `${process.env.VUE_APP_LARAVEL_APP_IMAGE_PATH + image}`;
    },

    showModal() {
      this.title = 'Add Employee';
      this.EmpShow = 'none';
      this.brntitle = 'Save';
      this.getdepartment();
      this.edited = false;
      this.openmodal = true;
    },
    closeModel() {
      this.Modelclearfun();
      this.edited = false;
      this.openmodal = false;
    },
    getposi(e) {
      // if (e.target.options.selectedIndex > -1) {
      //  console.log(e.target.value);
      this.getposition(e.target.value);
      // }
    },
    submitForm() {
      if (this.edited) {
        this.showAlert();
      } else {
        this.addemployee(this.empdata).then((res) => {
          this.closeModel();
          this.Modelclearfun();
          this.getListemp();
        });
      }
    },

    viewProfile(id) {
      this.getdepartment();
      this.title = 'Edit Employee';
      this.brntitle = 'Update';
      this.EmpShow = '';

      this.empdata.id = id;
      this.getEditemployee(this.empdata.id).then((res) => {
        console.log('employeeeeeeee', res[0].Code);
        this.empdata.code = res[0].Code;
        this.empdata.fname = res[0].FirstName;
        this.empdata.lname = res[0].LastName;
        this.selected = res[0].Dep_id;
        this.empdata.mobile = res[0].Mobile;
        this.openmodal = true;
        this.getposition(res[0].Dep_id).then((res) => {
          console.log('tttttt', res.Position);
          this.empdata.pos_id = res.Position[0].id;

          this.edited = true;
        });
      });
    },

    getimage(e) {
      var filereader = new FileReader();

      filereader.readAsDataURL(e.target.files[0]);
      filereader.onload = (e) => {
        this.empdata.image = e.target.result;
      };
      console.log(this.empdata);
    },

    Modelclearfun() {
      (this.empdata.code = ''),
        (this.empdata.fname = ''),
        (this.empdata.lname = ''),
        (this.empdata.mobile = ''),
        (this.empdata.pos_id = ''),
        (this.empdata.image = ''),
        (this.empdata.id = 0);
      this.selected = '';
    },

    showAlert() {
      // Use sweetalert2

      // const Toast = Swal.mixin({
      //   toast: true,
      //   position: "top-end",
      //   showConfirmButton: false,
      //   timer: 3000,
      //   timerProgressBar: true,
      //   onOpen: toast => {
      //     toast.addEventListener("mouseenter", Swal.stopTimer);
      //     toast.addEventListener("mouseleave", Swal.resumeTimer);
      //   }
      // });

      // Toast.fire({
      //   icon: "success",
      //   title: "Signed in successfully"
      // });

      this.$swal('Employee Saved!!!');
    }
  },

  created() {
    this.getListemp();
    console.log(this.emplist);
  }
};
</script>

<style scoped>
.empid {
  display: none;
}
</style>
