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
                <label for="username">Username</label>
                <input type="username" class="form-control" id="username" v-model="username" required>
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
import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/store';

export default defineComponent({
  data() {
    return {
      username: '',
      password: '',
      authenticated: false,
    };
  },
  methods: {
    async signIn() {
      try {
        const response = await axios.post('/api/login', {
          username: this.username,
          password: this.password,
        });

        const token = response.data.token;
        const authStore = useAuthStore();
        authStore.setToken(token);

        
        this.$router.push('/');
      }
      catch (error) {
        if ((error as any).response && (error as any).response.status === 401) {
          console.log(error)
        } else {
          // Handle other types of errors
          // ...
        }
      }
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