
import http from '@/service/http'
import findIndex from 'lodash/findIndex'

const saveCategory = async (context, obj) => {
  const { verb, category } = obj
  const response = await http[verb]('/categoria', category)

  if (response != null) {
    category.id = response.data.category.id
    update(context, { ...category })
    return Promise.resolve()
  }
}

const fetchCategory = async (context, id) => {
  const response = await http.get(`/categoria/${id}`)
  if (response != null) {
    return Promise.resolve(response.data.category)
  }
}

const fetch = async ({ commit }) => {
  const response = await http.get('/categoria')
  if (response != null) {
    const categories = response.data
    commit('SET_LIST', categories)
  }
}

const update = ({ commit, state }, obj) => {
  const index = findIndex(state.list, { id: obj.id })
  const payload = { category: obj, index }
  commit('SET_ONE', payload)
}

const remove = ({ commit, state }, obj) => {
  return new Promise(async (resolve) => {
    const { id } = obj
    const response = await http.delete(`/categoria/${id}`)
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
  fetchCategory,
  saveCategory,
  update,
  remove
}
