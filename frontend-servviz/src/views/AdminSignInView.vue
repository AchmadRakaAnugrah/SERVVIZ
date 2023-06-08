<script setup lang="ts">
import InputText from 'primevue/inputtext';

import { ref } from "vue";

const value = ref<string>("");
const items = ref<string[]>([]);

const search = (event: { query: string }) => {
  items.value = [...Array(10).keys()].map((item) => event.query + "-" + item);
};
</script>

<template>
    <div class="card flex justify-content-center">
        <span class="p-float-label">
            <InputText id="username" v-model="value" />
            <label for="username">Username</label>
        </span>
    </div>
    
</template>