<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Toggle button -->
      <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>

      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Navbar brand -->
        <a class="navbar-brand mt-2 mt-lg-0" href="#">
          <img src="../../public/deviantart.png" height="30" alt="MDB Logo" loading="lazy" />
        </a>
        <!-- Left links -->

      </div>
      <!-- Collapsible wrapper -->

      <!-- Right elements -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/">
            <a class="nav-link">Home</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/OrderView.vue">
            <a class="nav-link">Order</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/AboutView.vue">
            <a class="nav-link">About</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/ContactView.vue">
            <a class="nav-link">Contact</a>
          </router-link>
        </li>
      </ul>
      <!-- Left links -->
      <div class="d-flex align-items-center">
        <router-link to="/SignInView.vue">
          <button type="button" class="btn btn-primary me-3" v-if="!isAuthenticated">
            Sign In
          </button>
        </router-link>
      </div>
      <!-- Right elements -->
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store';
  import 'bootstrap/dist/css/bootstrap.css';
  import { RouterLink } from 'vue-router';

  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
</script>