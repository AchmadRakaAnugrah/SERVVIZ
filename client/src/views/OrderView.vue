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
        <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <form @submit.prevent="submitOrder">
        <div class="mb-3">
          <label for="jenisPelayanan" class="form-label">Jenis Pelayanan</label>
          <select id="jenisPelayanan" class="form-select" v-model="jenisPelayanan">
            <option value="1">Teknisi Pick-Up Barang</option>
            <option value="2">Customer Drop-Off Barang</option>
          </select>
        </div>

        <div v-if="jenisPelayanan === '1'" class="mb-3">
          <label for="alamatPenjemputan" class="form-label">Alamat Penjemputan</label>
          <input type="text" id="alamatPenjemputan" class="form-control" v-model="alamatPenjemputan" />
        </div>

        <div v-else class="mb-3">
          <label for="pilihanTempat" class="form-label">Pilihan Tempat SERVVIZ anda</label>
          <select id="pilihanTempat" class="form-select" v-model="pilihanTempat">
            <!-- Add options for the dropdown -->
          </select>
        </div>

        <div class="mb-3">
          <label for="jenisBarang" class="form-label">Jenis Barang</label>
          <select id="jenisBarang" class="form-select" v-model="jenisBarang">
            <!-- Add options for the dropdown -->
          </select>
        </div>

        <div class="mb-3">
          <label for="merkBarang" class="form-label">Merk Barang</label>
          <select id="merkBarang" class="form-select" v-model="merkBarang">
            <!-- Add options for the dropdown -->
          </select>
        </div>

        <div class="mb-3">
          <label for="jenisMasalah" class="form-label">Jenis Masalah</label>
          <select id="jenisMasalah" class="form-select" v-model="jenisMasalah">
            <!-- Add options for the dropdown -->
          </select>
        </div>

        <div class="mb-3">
          <label for="deskripsiMasalah" class="form-label">Deskripsi Masalah</label>
          <textarea id="deskripsiMasalah" class="form-control" v-model="deskripsiMasalah"></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
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
      title: 'Order',
      jenisPelayanan: '1',
      alamatPenjemputan: '',
      pilihanTempat: '',
      jenisBarang: '',
      merkBarang: '',
      jenisMasalah: '',
      deskripsiMasalah: '',
    };
  },
  methods: {
    submitOrder() {
      // Perform order submission logic
      console.log('Submitting order...');
      console.log('Jenis Pelayanan:', this.jenisPelayanan);
      console.log('Alamat Penjemputan:', this.alamatPenjemputan);
      console.log('Pilihan Tempat SERVVIZ anda:', this.pilihanTempat);
      console.log('Jenis Barang:', this.jenisBarang);
      console.log('Merk Barang:', this.merkBarang);
      console.log('Jenis Masalah:', this.jenisMasalah);
      console.log('Deskripsi Masalah:', this.deskripsiMasalah);

      // Reset form fields
      this.jenisPelayanan = '1';
      this.alamatPenjemputan = '';
      this.pilihanTempat = '';
      this.jenisBarang = '';
      this.merkBarang = '';
      this.jenisMasalah = '';
      this.deskripsiMasalah = '';
    },
  },
});
</script>

<style scoped>
.card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-label {
  font-weight: bold;
}

.form-control {
  margin-bottom: 10px;
}

.btn-primary {
  margin-top: 10px;
}
.container {
  margin-top: 30px;
  margin-bottom: 30px;
}


</style>




