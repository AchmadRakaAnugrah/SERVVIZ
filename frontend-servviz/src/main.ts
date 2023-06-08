//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primevue/resources/primevue.min.css";


import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';


import router from './router'

//User
import UserApp from './UserApp.vue'

const userapp = createApp(UserApp)

userapp.use(createPinia())
userapp.use(router)
userapp.use(PrimeVue)

userapp.mount('#app')

//Admin
import AdminApp from './AdminApp.vue'

const adminapp = createApp(AdminApp)

adminapp.use(createPinia())
adminapp.use(router)
adminapp.use(PrimeVue)

adminapp.mount('#app')

