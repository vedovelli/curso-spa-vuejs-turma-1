
import axios from 'axios'
import localforage from 'localforage'
import router from '@/router'
import store from '@/store'
import { bus } from '@/plugins/event-bus'

const http = axios.create({
  baseURL: process.env.API_URL
})

const setSearching = (state) => {
  store.dispatch('setSearching', { isSearching: state })
}

const intercepRequest = async (config) => {
  setSearching(true)
  const token = await localforage.getItem('token')
  config.headers.common['x-access-token'] = token
  return config
}

const intercepRequestError = (error) => {
  setSearching(false)
  Promise.reject(error)
}

const intercepResponse = (response) => {
  setSearching(false)
  return response
}

const intercepResponseError = (error) => {
  let message = error.message

  if (error.response != null) {
    /**
    * Token expirado ou inválido
    */
    if (error.response.status === 403) {
      localforage.removeItem('token').then(() => {
        router.push({ name: 'auth.index', query: { expired: true } })
      })
    }

    message = error.response.data.error
  }

  bus.$emit('display-alert', {
    type: 'error',
    message
  })

  setSearching(false)

  Promise.reject(error)
}

http.interceptors.request.use(intercepRequest, intercepRequestError)
http.interceptors.response.use(intercepResponse, intercepResponseError)

export default http
