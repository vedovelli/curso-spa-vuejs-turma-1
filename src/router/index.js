import Vue from 'vue'
import Router from 'vue-router'
import localforage from 'localforage'

import auth from '@app/auth/routes'
import users from '@app/users/routes'
import dashboard from '@app/dashboard/routes'
import categories from '@app/categories/routes'

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

router.beforeEach(async (to, from, next) => {
  const token = await localforage.getItem('token')

  if (to.name !== 'auth.index' && token === null) {
    next({ name: 'auth.index' })
    return
  }
  next()
})

export default router
