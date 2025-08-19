import { createApp } from 'vue'
import $ from 'jquery'
import App from './App.vue'
import VueImageZoomer from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"

window.$ = $;
const app = createApp(App)
app.use(VueImageZoomer);

app.mount('#app')