<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';

import { RouterLink } from 'vue-router';

import { ref } from "vue";

const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");


</script>

<template>
    <div class="card">
        <Card>
            <template #title> Sign Up </template>
                <template #content>
                    <div class="card flex justify-content-center">
                        <span class="p-float-label">
                            <InputText id="username" v-model="username" />
                            <label for="username">Username</label>
                        </span>
                    </div>
                    <div class="card flex justify-content-center">
                        <span class="p-float-label">
                            <InputText id="email" v-model="email" />
                            <label for="email">E-Mail</label>
                        </span>
                    </div>
                    <div class="card flex justify-content-center">
                        <span class="p-float-label">
                            <Password v-model="password" :feedback="false" />
                            <label for="password">password</label>
                        </span>
                    </div>
                    <div class="card flex justify-content-center mb-3">
                        <router-link to="/admin">
                            <p>Already have an account <Button label="Sign In" link /></p>
                        </router-link>
                    </div>
                    <div class="card flex justify-content-center">
                        <Button type="submit" label="Sign Up" />
                    </div>
             </template>
        </Card>
    </div>
</template>

