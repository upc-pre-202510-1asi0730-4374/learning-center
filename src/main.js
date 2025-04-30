import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/Aura';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import {Button, Card} from "primevue";

import i18n from "@/i18n.js";

import router from "./router/index.js";


// Default App Instance
const app = createApp(App);

// PrimeVue
app.use(PrimeVue, { theme: { preset: Aura }, ripple: true })
    .component('pv-button', Button)
    .component('pv-card', Card);
    /** add components **/

// Vue Router
app.use(router);

// Vue i18n
app.use(i18n);

// Mount App
app.mount('#app');
