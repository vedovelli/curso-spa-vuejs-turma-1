
import Vue from 'vue'

const SET_LIST = (state, obj) => {
  state.list = obj.products
}

const SET_ONE = (state, obj) => {
  const { index, product } = obj
  if (index > -1) {
    Vue.set(state.list, index, product)
  } else {
    state.list.unshift(product)
  }
}

const REMOVE_ONE = (state, obj) => {
  state.list.splice(obj.index, 1)
}

export default {
  SET_LIST,
  SET_ONE,
  REMOVE_ONE
}
