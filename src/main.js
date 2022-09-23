import { createApp } from 'vue'
import VueApexCharts from "vue3-apexcharts"
import VueUniversalModal from 'vue-universal-modal'
import 'vue3-carousel/dist/carousel.css'
import 'vue-universal-modal/dist/index.css'

import './style.css'
import App from './App.vue'


createApp(App)
    .use(VueApexCharts)
    .use(VueUniversalModal, { teleportTarget: '#modals' })
    .mount('#app')
