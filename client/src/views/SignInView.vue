<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-auto">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Sign In</h5>
            <form @submit.prevent="signIn">
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signIn() {
      // Perform sign-in logic
      console.log('Email:', this.email);
      console.log('Password:', this.password);

      // Reset form fields
      this.email = '';
      this.password = '';
    }
  }
});
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-group {
  margin-bottom: 20px;
}
.card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>