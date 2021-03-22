import Vue from 'vue'
import VueRouter from 'vue-router'
import '@/common/base.css'
import store from '@/store/superInput'
import SuperInput from '@/components/superInput/Index.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', name: '', component: SuperInput, meta: { title: '源码资本' } }
  ]
})

const render = async () => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<router-view/>'
  })
}

render()
