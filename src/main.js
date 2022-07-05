/// Credit for Auth: https://www.learmoreseekmore.com/2020/12/vue3-jwt-auth-accesstoken.html
import { createApp } from 'vue'
import store from './store'
import http  from './http'
import App from './App.vue'
import getRoutes from './appRouter'

require('@/assets/main.scss')
require('@/assets/tailwind.scss')

// const app
getRoutes()

window.addEventListener('routesReady', ( event ) => {
    const app = createApp(App)
    app.use(event.detail)
        .use(store)
        .use(http)
        .mount('#app')
})
