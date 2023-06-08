<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';

import { ref } from "vue";

const username = ref<string>("");
const password = ref<string>("");
const items = ref<string[]>([]);

const search = (event: { query: string }) => {
  items.username = [...Array(10).keys()].map((item) => event.query + "-" + item);
  items.password = [...Array(10).keys()].map((item) => event.query + "-" + item);
};
</script>

<template>
    <!-- <card>
        <template #title> Simple Card 
            <template #content> -->
                <div class="card flex justify-content-center">
                    <span class="p-float-label">
                        <InputText id="username" v-model="username" />
                        <label for="username">Username</label>
                    </span>
                </div>
                <div class="card flex justify-content-center">
                    <span class="p-float-label">
                        <Password v-model="password" :feedback="false" />
                        <label for="password">password</label>
                    </span>
                </div>
                <div class="card flex justify-content-center">
                    <p>Create an account <Button label="Sign Up" link /></p>
                </div>
                <div class="card flex justify-content-center">
                    <Button label="Sign In" />
                </div>
            <!-- </template>
        </template>
    </card> -->
</template>

