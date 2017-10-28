
import http from '@/service/http'
import findIndex from 'lodash/findIndex'

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
  update,
  remove
}
