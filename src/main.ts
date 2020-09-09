import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@pathscale/bulma-pull-2981-css-var-only/css/bulma.css'
import '@pathscale/bulma-extensions-css-var/css/bulma-extensions-css-var.css'

createApp(App).use(router).mount('#app')
