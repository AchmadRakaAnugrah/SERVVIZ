<script setup>
import { onMounted } from "vue";
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <section class="my-5 pt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-auto my-5">
          <h4>Lacak pesanan anda</h4>
          <p class="mb-4">
            Lacak progress pesanan yang telah anda buat.
          </p>
          <div class="row">
            <div class="col-8">
              <MaterialInput
                class="input-group-outline"
                id="kodeunik"
                :label="{ text: 'Nomor Pesanan...', class: 'form-label' }"
                type="kodeunik"
              />
            </div>
            <div class="col-4 ps-0">
              <MaterialButton
                variant="gradient"
                color="success"
                class="mb-0 h-100 position-relative z-index-2"
                >Lacak</MaterialButton
              >
            </div>
          </div>
        </div>

        <div class="col-md-6 m-auto my-0">
          <div class="position-relative">
            <img
              class="max-width-50 w-100 position-relative z-index-2"
              src="@/assets/img/macbook.png"
              alt="image"
            />
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>
