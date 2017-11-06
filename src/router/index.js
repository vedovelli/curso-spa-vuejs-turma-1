import Vue from 'vue'
import Router from 'vue-router'
import localforage from 'localforage'

import { bus } from '@/plugins/event-bus'

import auth from '@app/auth/routes'
import users from '@app/users/routes'
import dashboard from '@app/dashboard/routes'
import categories from '@app/categories/routes'
import store from '@/store'

const routes = [
  ...auth,
  ...users,
  ...dashboard,
  ...categories
]

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

const checkAuth = async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
  } else {
    const token = await localforage.getItem('token')
    store.dispatch('setToken', { token })

    if (token === null) {
      next({ name: 'auth.index' })
    }
  }
}

const clearAlerts = () => {
  bus.$emit('clear-alerts')
}

router.beforeEach((to, from, next) => {
  clearAlerts()
  checkAuth(to, from, next)
  next()
})

export default router
