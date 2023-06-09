import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/css/index.postcss';
import router from './router';
import notifications from '@kyvg/vue3-notification';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(notifications);

app.mount('#app');
