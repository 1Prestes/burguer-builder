import { put } from 'redux-saga'

import * as actionTypes from '../store/actions/actionTypes'

function * logout () {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expirationDate')
  yield localStorage.removeItem('userId')
  yield put({
    type: actionTypes.AUTH_LOGOUT
  })
}
