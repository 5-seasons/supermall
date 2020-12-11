import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHECK_TOGGLE,
  ALL_NOT_SELECT,
  SELECT_ALL
} from './mutation-types'

export default {
  [ADD_TO_CART](state, payload) {
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  },
  [ADD_COUNTER](state,payload) {
    payload.count ++
  },
  [CHECK_TOGGLE](staee, payload) {
    payload.checked = !payload.checked 
  },
  [ALL_NOT_SELECT](state) {
    state.cartList.forEach(item => {
      item.checked = false
    })
  },
  [SELECT_ALL](state) {
    state.cartList.forEach(item => {
      item.checked = true
    })
  }
}