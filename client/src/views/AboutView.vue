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
      <header class="text-center">
      <img src="path/to/header-image.jpg" alt="Header Image" class="img-fluid" />
      <h1 class="mt-4">About Us</h1>
    </header>

    <div class="container mt-5">
      <p>Welcome to our company! We are a leading provider of innovative solutions in the technology industry. Our mission is to deliver exceptional products and services to our clients.</p>

      <div class="row mt-5">
        <div class="col-md-4 mb-4" v-for="(image, index) in collageImages" :key="index">
          <img :src="image.src" :alt="image.alt" class="img-fluid" />
        </div>
      </div>
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
      collageImages: [
        { src: 'path/to/image1.jpg', alt: 'Image 1' },
        { src: 'path/to/image2.jpg', alt: 'Image 2' },
        { src: 'path/to/image3.jpg', alt: 'Image 3' },
        // Add more images as needed
      ],
    };
  },
});
</script>

<style scoped>
header {
  margin-bottom: 40px;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

p {
  margin-bottom: 20px;
}
</style>




