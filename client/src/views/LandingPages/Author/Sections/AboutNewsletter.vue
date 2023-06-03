<script setup>
import { onMounted } from "vue";
//Vue Material Kit 2 components
// import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <section class="my-5 pt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-auto my-5">
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
                color="success"
                class="mb-0 h-100 position-relative z-index-2"
                @click="fetchOrder"
                >Lacak</MaterialButton
              >
            </div>
          </div>
          <div v-if="isFetching">Loading...</div>
          <div v-else-if="isSuccess">
            <div>ID: {{ order.id }}</div>
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
            <div>Admin: {{ order.admin_username }}</div>
          </div>
          <div v-else-if="isError">{{ errorMessage }}</div>
        </div>

        <div class="col-md-6 m-auto my-0">
          <div class="position-relative">
            <img
              class="max-width-50 w-100 position-relative z-index-2"
              src="@/assets/img/k3.jpg"
              alt="image"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
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
};
</script>
