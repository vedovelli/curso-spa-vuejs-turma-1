
import index from './'

export default [
  {
    path: '/auth/login',
    name: 'auth.index',
    component: index,
    meta: { requiresAuth: false }
  }
]
