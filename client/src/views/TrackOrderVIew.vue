<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import DefaultNavbar from '../components/Navbar.vue';
import DefaultFooter from '../components/Footer.vue';
</script>

<template>
  <div>
    <DefaultNavbar />

    <div class="container" style="height: 50vh; width: auto;">
      <h1 class="text-center">{{ pageTitle }}</h1>
    
    <div class="progress mt-4">
      <div class="progress-bar" role="progressbar" :style="{ width: progressPercentage + '%' }">
        {{ progressPercentage }}%
      </div>
    </div>
    
    <div class="card mt-4">
      <div class="card-body">
        <h5 class="card-title">Order Details</h5>
        
        <div class="card-text">
          <div class="row">
            <div class="col-md-6">
              <p><strong>Order Status:</strong> {{ orderStatus }}</p>
              <p><strong>Username Pemesan:</strong> {{ username }}</p>
              <p><strong>Nomor Pesanan:</strong> {{ orderNumber }}</p>
              <p><strong>Tipe Pesanan:</strong> {{ orderType }}</p>
              <p><strong>Tanggal Pemesanan:</strong> {{ orderDate }}</p>
              <p><strong>Total Harga:</strong> {{ totalPrice }}</p>
            </div>
            <div class="col-md-6">
              <!-- Additional details or components can be added here -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <p class="mt-4 text-center">If you have any trouble, please contact us.</p>
    </div>

  <DefaultFooter/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      pageTitle: 'Track Order Progress',
      progressPercentage: 50,
      orderStatus: 'In Progress',
      username: 'John Doe',
      orderNumber: '123456',
      orderType: 'Express',
      orderDate: '2023-05-21',
      totalPrice: '$99.99'
    };
  },
});
</script>

<style scoped>
.container {
  margin-top: 50px;
  margin-bottom: 50px;
}
.container {
  margin-top: 50px;
}
.progress {
  height: 20px;
}
</style>



