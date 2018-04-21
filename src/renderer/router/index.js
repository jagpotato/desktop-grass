import Vue from 'vue'
import Router from 'vue-router'
import Grass from '@/components/Grass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'grass',
      component: Grass
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
