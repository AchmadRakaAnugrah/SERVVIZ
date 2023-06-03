<script setup>
import { onMounted } from "vue";
import { useAppStore } from "@/stores";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialProgress from "@/components/MaterialProgress.vue";
// example components
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
import Header from "../../../examples/Header.vue";

// sections
import DefaultFooter from "../../../examples/footers/DefaultFooter.vue";
import setTooltip from "@/assets/js/tooltip";

// image
import image from "@/assets/img/k1.jpg";
import bgContact from "@/assets/img/k4.jpg";

//material input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});

//store
const store = useAppStore();

onMounted(() => {
  setTooltip(store.bootstrap);
});
</script>
<template>
  <DefaultNavbar transparent />
  <Header>
    <div
      class="page-header min-height-150"
      :style="{ backgroundImage: `url(${image})` }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-8"></span>
    </div>
  </Header>

  <div
    class="card card-body mx-auto mt-n6 mb-4"
    style="max-width: 1000px; height: 270px"
  >
    <section class="my-5 pt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h4>Track your order</h4>
            <p class="mb-4">Track how much progress your order were made.</p>
            <div class="row">
              <div class="col-8">
                <v-text-field
                  class="input-group-outline"
                  id="kodeunik"
                  type="text"
                  v-model="kodeunik"
                  label="Input kode"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </div>
              <div class="col-4 ps-0">
                <MaterialButton
                  variant="gradient"
                  color="black"
                  class="btn btn-dark"
                  @click="fetchOrder"
                  >Track</MaterialButton
                >
              </div>
            </div>
            <div v-if="isFetching">Loading...</div>
            <div v-else-if="isSuccess">
              <!-- <div>ID: {{ order.id }}</div>
              <div>Username: {{ order.user_username }}</div>
              <div>Service Type: {{ order.service_type }}</div>
              <div>Pickup Address: {{ order.pickup_address }}</div>
              <div>Device: {{ order.device }}</div>
              <div>Device Brand: {{ order.device_brand }}</div>
              <div>Problem Type: {{ order.problem_type }}</div>
              <div>Problem Description: {{ order.problem_desc }}</div>
              <div>Order time: {{ formatDateTime(order.datetime) }}</div>
              <div>
                Order Status: <b>{{ order.order_status }}</b>
              </div>
              <div>Admin: {{ order.admin_username }}</div> -->
            </div>
            <div v-else-if="isError">{{ errorMessage }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <section class="py-lg-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7">
          <div class="card box-shadow-xl overflow-hidden mb-5">
            <div class="row">
              <div class="col">
                <form class="p-3" id="contact-form" method="post">
                  <div class="container">
                    <div class="row justify-content-between py-2">
                      <div class="col-lg-6 mx-auto">
                        <MaterialProgress
                          class="mb-3"
                          color="dark"
                          :value="50"
                        />
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
                          <label class="form-label">Name</label>
                          <input
                            id="namaPemesan"
                            class="form-control"
                            type="text"
                            :value="isSuccess ? order.name : 'Nama Pemesan'"
                            @input="
                              isSuccess
                                ? (order.name = $event.target.value)
                                : () => {}
                            "
                            readonly
                          />
                        </div>
                      </div>
                      <div class="col-md-12 pe-2 mb-3">
                        <div class="form-group mb-4">
                          <label class="form-label">Service Type</label>
                          <input
                            id="service"
                            class="form-control"
                            type="text"
                            :value="
                              isSuccess ? order.service_type : 'Service Type'
                            "
                            @input="
                              isSuccess
                                ? (order.service_type = $event.target.value)
                                : () => {}
                            "
                            readonly
                          />
                        </div>
                      </div>
                      <div class="col-md-12 pe-2 mb-3">
                        <div class="form-group mb-4">
                          <label class="form-label">Status</label>
                          <input
                            id="status"
                            class="form-control"
                            type="text"
                            :value="isSuccess ? order.order_status : 'Status'"
                            @input="
                              isSuccess
                                ? (order.order_status = $event.target.value)
                                : () => {}
                            "
                            readonly
                          />
                        </div>
                      </div>
                    </div>
                    <!-- <div class="row">
                      <div class="col-md-6 text-end ms-auto">
                        <button class="btn btn-dark" type="submit">
                          Send Message
                        </button>
                      </div>
                    </div> -->
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <DefaultFooter />
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store.js";

export default {
  data() {
    return {
      isFetching: false,
      isSuccess: false,
      isError: false,
      errorMessage: null,
      orderDetails: null,
      kodeunik: "",
      kodeUnik: "",
      namaPemesan: "",
      jenisMasalah: "",
      status: "",
    };
  },
  methods: {
    fetchOrder() {
      const authStore = useAuthStore();
      const username = authStore.username;
      // const bearerToken = authStore.bearerToken;
      console.log(authStore.username);
      this.isFetching = true;
      axios
        .get(`http://localhost:5000/api/orders/${username}/${this.kodeunik}`)
        .then((response) => {
          this.isFetching = false;
          this.isSuccess = true;
          this.order = response.data;
        })
        .catch((error) => {
          this.isFetching = false;
          if (error.response && error.response.status === 404) {
            this.isError = true;
            this.isSuccess = false;
            this.errorMessage = "Order not found";
          } else {
            this.isError = true;
            this.errorMessage = "An error occurred";
            console.error(error);
          }
        });
    },
    formatDateTime(datetime) {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "Asia/Jakarta",
      };
      const formatter = new Intl.DateTimeFormat("id-ID", options);
      const formattedDateTime = formatter.format(new Date(datetime));
      return formattedDateTime.replace("pukul", "");
    },
  },
  mounted() {
    // Fetch the data from the database using JavaScript
    // Replace the following lines with your actual data-fetching logic
    // this.kodeUnik = "Kode Unik";
    // this.namaPemesan = "Nama Pemesan";
    // this.jenisMasalah = "Jenis Masalah";
    // this.status = "Status";
  },
};
</script>
