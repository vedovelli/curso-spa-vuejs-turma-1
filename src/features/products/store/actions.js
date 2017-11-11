
import http from '@/service/http'
import findIndex from 'lodash/findIndex'

const save = async (context, obj) => {
  const { verb, product } = obj
  const response = await http[verb]('/produto', product)

  if (response != null) {
    product.id = response.data.product.id
    update(context, { ...product })
    return Promise.resolve()
  }
}

const fetchOne = async (context, id) => {
  const response = await http.get(`/produto/${id}`)
  if (response != null) {
    return Promise.resolve(response.data.product)
  }
}

const fetch = async ({ commit }) => {
  const response = await http.get('/produto')
  if (response != null) {
    const products = response.data
    commit('SET_LIST', { products: products.products.slice(0, 10) })
  }
}

const update = ({ commit, state }, obj) => {
  const index = findIndex(state.list, { id: obj.id })
  const payload = { product: obj, index }
  commit('SET_ONE', payload)
}

const remove = ({ commit, state }, obj) => {
  return new Promise(async (resolve) => {
    const { id } = obj
    const response = await http.delete(`/produto/${id}`)
    const { message } = response.data
    const index = findIndex(state.list, { id })

    if (index > -1) {
      commit('REMOVE_ONE', { index })
    }

    resolve(message)
  })
}

export default {
  fetch,
  fetchOne,
  save,
  update,
  remove
}
