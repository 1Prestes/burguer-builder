import { delay, put } from 'redux-saga/effects'

import * as actions from '../actions'

export function * logoutSaga () {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expirationDate')
  yield localStorage.removeItem('userId')
  yield put(actions.logoutSucceed())
}

export function * checkAuthTimeoutSaga (action) {
  yield delay(action.expirationOnTime * 1000)
  yield put(actions.logout())
}
