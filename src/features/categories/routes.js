
import index from './'
import form from './form'

export default [
  {
    path: '/categorias',
    name: 'categories.index',
    component: index,
    children: [
      {
        path: 'form/:id?',
        name: 'categories.form',
        component: form
      }
    ]
  }
]
