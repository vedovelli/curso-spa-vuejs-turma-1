
const index = () => import('./')
const form = () => import('./form')

export default [
  {
    path: '/categorias',
    name: 'categories.index',
    component: index,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'form/:id?',
        name: 'categories.form',
        component: form,
        meta: { requiresAuth: true }
      }
    ]
  }
]
