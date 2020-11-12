<template>
  <div class="modal-content" style="box-shadow: 0px 0px 10px 2px #6b6e6c">
    <div class="ml-4 mt-2 mb-5 d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column">
        <h5 class="modal-title">
          <i class="fa fa-history mr-2" style="font-size: 20px;" aria-hidden="true"></i>
          Job Due Date History
        </h5>
      </div>
      <button type="button" class="close mr-3" @click="closeDueDateHistoryModal" aria-label="Close">
        <span aria-hidden="true" style="font-size: 27px;">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-md-12" v-if="history && history.length != 0">
          <!--Accordion wrapper-->
          <div
            class="accordion md-accordion"
            id="accordionEx"
            role="tablist"
            aria-multiselectable="true"
          >
            <!-- Accordion card -->
            <div class="card" style="margin-top: -20px;" v-for="h in history" :key="h.id">
              <!-- Card header -->
              <div role="tab" id="headingOne1">
                <button
                  data-toggle="collapse"
                  data-parent="#accordionEx"
                  class="btn btn-block btn-success text-left pl-3"
                  :href="'#collapse'+h.id"
                  aria-expanded="true"
                  aria-controls="collapseOne1"
                >
                  <h6 class="mb-0">
                    {{ h.due_date | formattedDate2 }}
                    <i class="fas fa-angle-down rotate-icon float-right"></i>
                  </h6>
                </button>
              </div>

              <!-- Card body -->
              <div
                :id="'collapse'+h.id"
                class="collapse"
                role="tabpanel"
                aria-labelledby="headingOne1"
                data-parent="#accordionEx"
              >
                <div class="card-body" style="font-weight:500">
                  <div class="d-flex flex-column">
                    <h6 class="text-primary">
                      Changed by - MR. {{ h.name }} 
                      <span
                        style="font-size: 13px"
                        class="text-dark"
                      >({{ h.created_at | formattedDate }})</span>
                    </h6>
                    <div class="d-flex">
                      <h6 class="text-primary" style="width:100px">Reason -</h6>
                      <p>{{ h.reason }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            


          </div>
          <!-- Accordion wrapper -->
        </div>
        <div v-else>
          <p class="text-center mb-5 text-muted">No history found!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["history"],

  methods: {
    closeDueDateHistoryModal() {
      $("#exampleModalCenter").modal("hide");
    },
  },
};
</script>

<style>
</style>