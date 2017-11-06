
const index = () => import('./')

export default [
  {
    path: '/usuarios',
    name: 'users.index',
    component: index,
    meta: { requiresAuth: true }
  }
]
