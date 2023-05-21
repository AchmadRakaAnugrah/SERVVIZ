<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import DefaultNavbar from '../components/Navbar.vue';
import DefaultFooter from '../components/Footer.vue';
</script>

<template>
  <div>
    <DefaultNavbar />

    <div class="container" style="height: auto; width: auto;">
        <h1>Contact Us</h1>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea class="form-control" id="message" v-model="message" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>

  <DefaultFooter/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      name: '',
      email: '',
      message: ''
    };
  },
  methods: {
    submitForm() {
      // Perform form submission logic
      console.log('Name:', this.name);
      console.log('Email:', this.email);
      console.log('Message:', this.message);

      // Reset form fields
      this.name = '';
      this.email = '';
      this.message = '';
    }
  }
});
</script>

<style scoped>
.container {
  height: auto;
  width: auto;
}

.form-group {
  margin-bottom: 20px;
}

.text-center {
  text-align: center;
}

.mt-5 {
  margin-top: 3rem;
}

.container {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>




