<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import DefaultNavbar from '../components/Navbar.vue';
import DefaultFooter from '../components/Footer.vue';
</script>

<template>
    <div class="container mt-5">
      <h2 class="mb-4">Sign In</h2>
      <form @submit.prevent="signIn">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Sign In</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      signIn() {
        // Perform sign-in logic
        console.log('Signing in...');
        console.log('Email:', this.email);
        console.log('Password:', this.password);
  
        // Reset form fields
        this.email = '';
        this.password = '';
      },
    },
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
  }
  </style>





