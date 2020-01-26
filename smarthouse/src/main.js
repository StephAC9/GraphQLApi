import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

new Vue({
        el: '#app',
        store,
        vuetify,
        router,
        render: h => h(App),
        /* 
                created() {
                    this.$vuetify.theme.dark = true
                }, */
    })
    //.$mount('#app')