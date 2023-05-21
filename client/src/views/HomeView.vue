<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import { RouterLink } from 'vue-router';

import DefaultNavbar from '../components/Navbar.vue';
import DefaultFooter from '../components/Footer.vue';
</script>

<template>
  <div>
    <DefaultNavbar />

    <header>
      <img src="path/to/header-image.jpg" alt="Header Image" class="img-fluid" />
    </header>

  <div class="container" style="height: auto; width: auto;">
    <div class="row">
        <div class="col-md-6">
          <h1 class="text-center">SERVVIZ</h1>
          <p class="text-center">Reliable Solutions for Your Digital World.</p>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Track your Order Progress</h5>
              <form @submit.prevent="submitForm">
                <div class="form-group">
                  <label for="orderNumber">Masukkan nomor pesanan anda:</label>
                  <input type="text" class="form-control" id="orderNumber" v-model="orderNumber" required>
                </div>
            
                  <router-link to="/TrackOrderView.vue">
                    <button type="submit" class="btn btn-primary">Track</button>     
                  </router-link>
     
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-5">
        <h2 class="text-center">Our Services</h2>
        <div class="row mt-4">
          <div class="col-md-4" v-for="(service, index) in services" :key="index">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ service.title }}</h5>
                <p class="card-text">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-5 bg-secondary">
        <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut mauris eget ex aliquam laoreet. Sed auctor tortor sit amet neque hendrerit, eget egestas neque ullamcorper.</p>
        <router-link to="/OrderView.vue">
          <button class="btn btn-primary btn-lg d-block mx-auto mt-4">Order Now</button>
        </router-link>  
      </div>
    </div>



  <DefaultFooter/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      orderNumber: '',
      services: [
        { title: 'Service 1', description: 'Description of Service 1' },
        { title: 'Service 2', description: 'Description of Service 2' },
        { title: 'Service 3', description: 'Description of Service 3' },
        // Add more services as needed
      ],
    };
  },
  methods: {
    submitForm() {
      // Perform order tracking logic
      console.log('Order Number:', this.orderNumber);

      // Reset form field
      this.orderNumber = '';
    },
  },
});
</script>



<style scoped>
header {
  margin-bottom: 20px;
}

h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

h2 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  font-size: 1.1rem;
}
.form-group {
  margin-bottom: 20px;
}

.container {
  margin-top: 100px;
  margin-bottom: 100px;
}

.bg-secondary {
  background-color: #f7f7f7;
  padding: 40px;
}

.card {
    width: 100%;
  max-width: 500px;
  padding: 20px;
}

.btn-lg {
  font-size: 1.25rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1.5rem;
}

.mt-5 {
  margin-top: 3rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.d-block {
  display: block;
}

@media (min-width: 768px) {
  .container {
    max-width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 970px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1170px;
  }
}
</style>




