
const index = () => import('./')
const form = () => import('./form')

export default [
  {
    path: '/produto',
    name: 'products.index',
    component: index,
    children: [
      {
        path: 'form/:id?',
        name: 'products.form',
        component: form
      }
    ]
  }
]
