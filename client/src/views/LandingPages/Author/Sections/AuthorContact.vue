<script setup>
import { onMounted } from "vue";
//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialProgress from "@/components/MaterialProgress.vue";

// image
import bgContact from "@/assets/img/examples/blog2.jpg";

// tooltip
import setTooltip from "@/assets/js/tooltip";

// store
import { useAppStore } from "@/stores";
const store = useAppStore();

onMounted(() => {
  setTooltip(store.bootstrap);
});
</script>
<template>
  <section class="py-lg-5">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card box-shadow-xl overflow-hidden mb-5">
            <div class="row">
              <div
                class="col-lg-5 position-relative bg-cover px-0"
                :style="{ backgroundImage: `url(${bgContact})` }"
                loading="lazy"
              >
                <div
                  class="z-index-2 text-center d-flex h-100 w-100 d-flex m-auto justify-content-center"
                >
                  <div class="mask bg-gradient-dark opacity-8"></div>
                  <div
                    class="p-5 ps-sm-8 position-relative text-start my-auto z-index-2"
                  >
                    <h3 class="text-white">Contact Us</h3>
                    <p class="text-white opacity-8 mb-4">
                      Feel free to contact us if you're having any difficulties.
                    </p>
                    <div class="d-flex p-2 text-white">
                      <div>
                        <i class="fas fa-phone text-sm"></i>
                      </div>
                      <div class="ps-3">
                        <span class="text-sm opacity-8">(+40) 772 100 200</span>
                      </div>
                    </div>
                    <div class="d-flex p-2 text-white">
                      <div>
                        <i class="fas fa-envelope text-sm"></i>
                      </div>
                      <div class="ps-3">
                        <span class="text-sm opacity-8"
                          >hello@creative-tim.com</span
                        >
                      </div>
                    </div>
                    <div class="d-flex p-2 text-white">
                      <div>
                        <i class="fas fa-map-marker-alt text-sm"></i>
                      </div>
                      <div class="ps-3">
                        <span class="text-sm opacity-8"
                          >Dyonisie Wolf Bucharest, RO 010458</span
                        >
                      </div>
                    </div>
                    <div class="mt-4">
                      <MaterialButton
                        color="none"
                        size="lg"
                        class="btn-icon-only btn-link text-white mb-0"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        data-original-title="Log in with Facebook"
                      >
                        <i class="fab fa-facebook"></i>
                      </MaterialButton>
                      <MaterialButton
                        color="none"
                        size="lg"
                        class="btn-icon-only btn-link text-white mb-0"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        data-original-title="Log in with Twitter"
                      >
                        <i class="fab fa-twitter"></i>
                      </MaterialButton>
                      <MaterialButton
                        color="none"
                        size="lg"
                        class="btn-icon-only btn-link text-white mb-0"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        data-original-title="Log in with Dribbble"
                      >
                        <i class="fab fa-dribbble"></i>
                      </MaterialButton>
                      <MaterialButton
                        color="none"
                        size="lg"
                        class="btn-icon-only btn-link text-white mb-0"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        data-original-title="Log in with Instagram"
                      >
                        <i class="fab fa-instagram"></i>
                      </MaterialButton>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-7">
                <form class="p-3" id="contact-form" method="post">

    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-6 mx-auto">
          <MaterialProgress class="mb-3" color="dark" :value="50" />
        </div>
      </div>
    </div>

    <div class="card-header px-4 py-sm-5 py-3">
      <h2>{{ kodeUnik }}</h2>
    </div>
    <div class="card-body pt-1">
      <div class="row">
        <div class="col-md-12 pe-2 mb-3">
          <div class="form-group mb-4">
            <label for="namaPemesan" class="form-label">Name</label>
            <input
              id="namaPemesan"
              class="form-control"
              type="text"
              :value="namaPemesan"
              readonly
            />
          </div>
        </div>
        <div class="col-md-12 pe-2 mb-3">
          <div class="form-group mb-4">
            <label for="jenisMasalah" class="form-label">Service Type</label>
            <input
              id="jenisMasalah"
              class="form-control"
              type="text"
              :value="jenisMasalah"
              readonly
            />
          </div>
        </div>
        <div class="col-md-12 pe-2 mb-3">
          <div class="form-group mb-4">
            <label for="status" class="form-label">Status</label>
            <input
              id="status"
              class="form-control"
              type="text"
              :value="status"
              readonly
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 text-end ms-auto">
          <button
            class="btn btn-success mb-0"
            type="submit"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      kodeUnik: '',
      namaPemesan: '',
      jenisMasalah: '',
      status: '',
    };
  },
  mounted() {
    // Fetch the data from the database using JavaScript
    // Replace the following lines with your actual data-fetching logic
    this.kodeUnik = 'Kode Unik';
    this.namaPemesan = 'Nama Pemesan';
    this.jenisMasalah = 'Jenis Masalah';
    this.status = 'Status';
  },
};
</script>