
import axios from 'axios'
import localforage from 'localforage'
import { bus } from '@/plugins/event-bus'

const http = axios.create({
  baseURL: process.env.API_URL
})

const intercepRequest = async (config) => {
  const token = await localforage.getItem('token')
  config.headers.common['x-access-token'] = token
  return config
}

const intercepRequestError = (error) => {
  Promise.reject(error)
}

const intercepResponse = (response) => response

const intercepResponseError = (error) => {
  let message = error.message

  if (error.response != null) {
    message = error.response.data.error
  }

  bus.$emit('display-alert', {
    type: 'error',
    message
  })

  Promise.reject(error)
}

http.interceptors.request.use(intercepRequest, intercepRequestError)
http.interceptors.response.use(intercepResponse, intercepResponseError)

export default http
