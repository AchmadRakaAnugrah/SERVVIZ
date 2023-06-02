<script setup>
import { onMounted } from "vue";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";


//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <DefaultNavbar transparent darktext />
  <Header>
    <div class="page-header align-items-start min-vh-100" :style="{
      backgroundImage:
        'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)'
    }" loading="lazy">
      <span class="mask bg-gradient-dark opacity-6"></span>x
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                  <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                    Sign up
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" @submit="login" class="text-start">
                  <div class="input-group-outline my-3">
                    <label for="email" class="form-label">Email</label>
                    <input id="email" type="email" class="form-control" v-model="email" required>
                  </div>
                  <div class="input-group-outline my-3">
                    <label for="name" class="form-label">Nama</label>
                    <input id="name" type="text" class="form-control" v-model="name" required>
                  </div>
                  <div class="input-group-outline my-3">
                    <label for="username" class="form-label">Username</label>
                    <input id="username" type="text" class="form-control" v-model="username" required>
                  </div>
                  <div class="input-group-outline my-3">
                    <label for="phone" class="form-label">Nomor HP</label>
                    <input id="phone" type="tel" class="form-control" v-model="phone" required>
                  </div>
                  <div class="input-group-outline mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" type="password" class="form-control" v-model="password" required>
                  </div>
                  <div class="input-group-outline mb-3">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <input id="confirmPassword" type="password" class="form-control" v-model="confirmPassword" required>
                  </div>
                  <div class="text-center">
                    <button class="my-4 mb-2 btn btn-success btn-gradient" style="width: 100%;">Sign up</button>
                  </div>
                  <p class="mt-4 text-sm text-center">
                    Already have an account?
                    <a href="#" class="text-success text-gradient font-weight-bold">Sign in</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer position-absolute bottom-2 py-2 w-100">
        <div class="container">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-12 col-md-6 my-auto">
              <div class="copyright text-center text-sm text-white text-lg-start">
                © {{ new Date().getFullYear() }}, made with
                <i class="fa fa-heart" aria-hidden="true"></i> by
                <a href="https://www.creative-tim.com" class="font-weight-bold text-white" target="_blank">Kelompok 6</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </Header>
</template>

<style>
.form-control {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.form-control:focus,
.form-control:valid {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* or */
  /* border: 2px solid rgba(0, 0, 0, 0.2); */
}
</style>

<script>
import axios from 'axios';
import { useAuthStore } from '@/store.js';

export default {
  data() {
    return {
      email: '',
      name: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async login(event) {
      event.preventDefault(); // Prevent form submission
      if (this.password !== this.confirmPassword) {
        // Password and confirm password do not match
        // You can display an error message or take any other appropriate action here.
        alert("Pastikan password dan confirm password sama");
      }
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          email: this.email,
          name: this.name,
          username: this.username,
          phone: this.phone,
          password: this.password,
        });

        const { token } = response.data;

        const store = useAuthStore();
        // Save the bearer token to the Pinia store
        console.log(token);
        store.setBearerToken(token);

        // Redirect to the root route
        this.$router.push('/pages/landing-pages/basic');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Handle unauthorized error
          alert('Cek kembali format email atau nomor HP anda');
        } else if (error.response && error.response.status === 409) {
          // Handle unauthorized error
          alert('Username tidak tersedia, gunakan username lain');
        } else {
          console.log("Unknown error");
        }
      }
    }
  },
};
</script>