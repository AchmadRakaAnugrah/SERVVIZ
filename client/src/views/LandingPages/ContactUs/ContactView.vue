<script setup>
import { onMounted } from "vue";

//example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/DefaultFooter.vue";

//image
import image from "@/assets/img/k1.jpg";

//material components
// import MaterialInput from "@/components/MaterialInput.vue";
// import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
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
  <!-- <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4"> -->
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5"
            >
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent"
              >
                <!-- <div
                  class="bg-gradient-success shadow-success border-radius-lg p-3"
                > -->
                  
                <!-- </div> -->
              </div>

              <div class="card-body">
                <h1 class="mt-5">Order</h1>
                <br>
                <p class="pb-3">Fill out this form to make an order.</p>
                <form
                  id="contact-form"
                  method="post"
                  autocomplete="off"
                  @submit.prevent="submitForm"
                >
                  <div class="card-body p-0 my-3">
                    <div class="row">
                      <div class="col-md-6">
                        <!-- <div class="input-group-static mb-4">
                          <label for="fullName">Full Name</label>
                          <input
                            type="text"
                            id="fullName"
                            placeholder="Full Name"
                            v-model="fullName"
                          />
                        </div> -->
                        <!-- <MaterialInput
                      class="input-group-static mb-4"
                      type="text"
                      label="Full Name"
                      placeholder="Full Name"
                      v-model="fullName"
                    /> -->
                        <!-- </div> -->
                        <!-- <div class="col-md-6 ps-md-2">
                    <MaterialInput
                      class="input-group-static mb-4"
                      type="email"
                      label="Email"
                      placeholder="example@example.com"
                      v-model="email"
                    /> -->
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label class="mb-1">Service Type</label>
                        <select class="form-select mb-4" v-model="serviceType">
                          <option value="">Select Service Type</option>
                          <option value="Drop off">Drop off</option>
                          <option value="Pick Up">Pick Up</option>
                        </select>
                      </div>

                      <div class="col-md-6 ps-md-2">
                        <div class="form-group mb-4">
                          <template v-if="serviceType === 'Drop off'">
                            <label for="store" class="form-label"
                              >Pick Drop Off Store</label
                            >
                            <select
                              id="store"
                              class="form-select"
                              v-model="store"
                            >
                              <option value="">SERVVIZ Gunung Pati</option>
                              <!-- Add your options for Pilih Toko here -->
                            </select>
                          </template>
                          <template v-else-if="serviceType === 'Pick Up'">
                            <label for="pickupAddress" class="form-label"
                              >Your Address</label
                            >
                            <input
                              id="pickupAddress"
                              class="form-control"
                              type="text"
                              placeholder="Your Address"
                              v-model="pickupAddress"
                            />
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label class="mb-1">Device</label>
                        <select class="form-select mb-4" v-model="device">
                          <option value="">Select Device</option>
                          <option value="Mobile">Mobile</option>
                          <option value="Tablet">Tablet</option>
                          <option value="Laptop">Laptop</option>
                        </select>
                      </div>
                      <div class="col-md-6 ps-md-2">
                        <label class="mb-1">Device Brand</label>
                        <select class="form-select mb-4" v-model="deviceBrand">
                          <option value="">Select Device Brand</option>
                          <option value="Apple">Apple</option>
                          <option value="Samsung">Samsung</option>
                          <option value="HP">HP</option>
                          <option value="Dell">Dell</option>
                          <option value="Lenovo">Lenovo</option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label class="mb-1">Problem Type</label>
                        <select class="form-select mb-4" v-model="problemType">
                          <option value="">Select Problem Type</option>
                          <option value="Software">Software</option>
                          <option value="Hardware">Hardware</option>
                          <option value="Battery">Battery</option>
                          <option value="Screen">Screen</option>
                          <option value="Network">Network</option>
                        </select>
                      </div>

                      <div class="row">
                        <div class="input-group-static mb-4">
                          <label for="problemDescription"
                            >Problem Description</label
                          >
                          <textarea
                            id="problemDescription"
                            class="form-control"
                            rows="6"
                            placeholder="Describe the problem in detail"
                            v-model="problemDescription"
                          ></textarea>
                        </div>
                      </div>

                      <!-- <div class="col-md-6 ps-md-2">
                    <div class="col-md-6">
                      <label class="mb-1">Problem Image</label>
                      <input type="file" ref="fileInput" @change="handleFileUpload" />
                    </div>
                  </div> -->

                      <!-- <div class="row">
                    <MaterialTextArea
                      id="problemDescription"
                      class="input-group-static mb-4"
                      :rows="6"
                      placeholder="Describe the problem in detail"
                      v-model="problemDescription"
                    >
                      </MaterialTextArea>
                  </div>
                  <div class="col-md-6 ps-md-2">
                    <div class="col-md-6">
                      <label class="mb-1">Problem Image</label>
                      <input type="file" ref="fileInput" @change="handleFileUpload" />
                   </div>
                  </div> -->
                    </div>

                    <div class="row mt-6">
                      <div class="col-md-12 text-center">
                        <MaterialButton
                          variant="gradient"
                          color="black"
                          class="btn btn-dark"
                        >
                          <!-- @click="submitForm" -->
                          Order
                        </MaterialButton>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div>
      </div>
    </div> -->
    </section>
  <!-- </div> -->
  <DefaultFooter />
</template>

<script>
// import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store.js";

export default {
  data() {
    return {
      // fullName: "",
      serviceType: "",
      pickupAddress: "",
      device: "",
      deviceBrand: "",
      problemType: "",
      problemDescription: "",
      // file: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    submitForm() {
      const authStore = useAuthStore();
      const username = authStore.username;
      const bearerToken = authStore.bearerToken;
      console.log(authStore.username);

      // Create an object with the form data
      const formData = {
        // fullName: this.fullName,
        service_type: this.serviceType,
        // store: this.store,
        pickup_address: this.pickupAddress,
        device: this.device,
        device_brand: this.deviceBrand,
        problem_type: this.problemType,
        problem_desc: this.problemDescription,
      };

      // Make an API request to submit the form data to the server
      // Replace the URL with your actual API endpoint
      axios
        .post(`http://localhost:5000/api/orders/${username}`, formData, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        .then((response) => {
          // Handle the response from the server
          console.log(response.data);
          const orderID = response.data.order;
          alert(`Order ID: ${orderID}`);
          // Reset the form fields
          this.resetForm();
          // Display success message or perform any other actions
        })
        .catch((error) => {
          // Handle any errors that occur during the API request
          console.error(error);
          // Display error message or perform any other error handling
        });
    },
    resetForm() {
      // Reset form fields to their initial values
      this.serviceType = "";
      // this.store = "";
      this.pickupAddress = "";
      this.device = "";
      this.deviceBrand = "";
      this.problemType = "";
      this.problemDescription = "";
      // this.file = null;
      // Reset the file input element
      // if (this.$refs.fileInput) {
      //   this.$refs.fileInput.value = "";
      // }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
