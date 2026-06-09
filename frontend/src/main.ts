import './polyfills/global'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as directives from 'vuetify/directives'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { theme } from './plugins/theme'


const vuetify = createVuetify({
  components,
  directives,
  theme
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
